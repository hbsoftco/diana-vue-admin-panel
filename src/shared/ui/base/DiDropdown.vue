<script setup lang="ts">
import type { CSSProperties } from 'vue'

import { nextTick, onBeforeUnmount, onMounted, ref, useId, watch } from 'vue'

import { useDirection } from '@/shared/composables/use-direction'
import { useDropdownGroup } from '@/shared/composables/use-dropdown-group'

/* ----------------------------------
 * Types
 * ---------------------------------- */
type DiDropdownSide = 'top' | 'bottom' | 'left' | 'right'
type DiDropdownAlign = 'start' | 'center' | 'end'

export type DiDropdownPlacement
  = | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end'

export type DiDropdownRole = 'menu' | 'listbox' | 'dialog'

export type DiDropdownCloseReason
  = | 'trigger'
    | 'outside'
    | 'escape'
    | 'focus-out'
    | 'content'
    | 'group'
    | 'programmatic'

type Props = {
  /** Preferred placement of the panel relative to the trigger. Auto-flips on the primary axis when it would overflow the viewport. */
  placement?: DiDropdownPlacement
  /** Gap in pixels between the trigger and the panel. */
  offset?: number
  /** Element rendered for the trigger. `button` is a real button; `span` becomes a `role="button"` for non-button content. */
  triggerTag?: 'button' | 'span'
  /** Semantic role of the panel and the items it navigates with the arrow keys. */
  role?: DiDropdownRole
  /** Accessible name for the panel. */
  ariaLabel?: string
  disabled?: boolean
  /** Name of an exclusive group; opening this dropdown closes other open dropdowns sharing the name. */
  group?: string
  /** Close when a click lands on an interactive element inside the panel. */
  closeOnContentClick?: boolean
  closeOnOutsideClick?: boolean
  closeOnEscape?: boolean
  /** Move focus into the panel (first item for menu/listbox, the panel for dialog) when it opens. */
  autoFocus?: boolean
  /** Force the panel to be at least as wide as the trigger. */
  matchTriggerWidth?: boolean
  /** Utility classes for the teleported panel (sizing lives here since it cannot fall through). */
  panelClass?: string
}

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<Props>(), {
  placement: 'bottom-start',
  offset: 8,
  triggerTag: 'button',
  role: 'menu',
  disabled: false,
  closeOnContentClick: true,
  closeOnOutsideClick: true,
  closeOnEscape: true,
  autoFocus: true,
  matchTriggerWidth: false,
})

const emit = defineEmits<{
  open: []
  close: [reason: DiDropdownCloseReason]
}>()

defineSlots<{
  trigger: (props: { open: boolean, disabled: boolean, toggle: () => void }) => unknown
  default: (props: { open: boolean, close: () => void }) => unknown
}>()

/* ----------------------------------
 * Model, emits, slots
 * ---------------------------------- */
const open = defineModel<boolean>('open', { default: false })

/* ----------------------------------
 * Constants
 * ---------------------------------- */
const VIEWPORT_PADDING = 8

const FOCUSABLE_SELECTOR
  = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

const HASPOPUP: Record<DiDropdownRole, 'menu' | 'listbox' | 'dialog'> = {
  menu: 'menu',
  listbox: 'listbox',
  dialog: 'dialog',
}

const OPPOSITE_SIDE: Record<DiDropdownSide, DiDropdownSide> = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
}

const ORIGIN_CLASSES: Record<DiDropdownPlacement, string> = {
  'top': 'origin-bottom',
  'top-start': 'origin-bottom-left',
  'top-end': 'origin-bottom-right',
  'bottom': 'origin-top',
  'bottom-start': 'origin-top-left',
  'bottom-end': 'origin-top-right',
  'left': 'origin-right',
  'left-start': 'origin-top-right',
  'left-end': 'origin-bottom-right',
  'right': 'origin-left',
  'right-start': 'origin-top-left',
  'right-end': 'origin-bottom-left',
}

const RESTORE_FOCUS_REASONS = new Set<DiDropdownCloseReason>(['trigger', 'escape', 'content'])

const PANEL_BASE_CLASS
  = 'di-dropdown-panel fixed z-50 m-0 flex min-w-48 max-w-[calc(100vw-1rem)] flex-col overflow-auto overscroll-contain rounded-box border border-base-300 bg-base-100 text-base-content shadow-lg outline-none'

/* ----------------------------------
 * State
 * ---------------------------------- */
const { isRtl } = useDirection()

const panelId = `di-dropdown-${useId().replace(/:/g, '')}`
const triggerRef = ref<HTMLElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)
const effectivePlacement = ref<DiDropdownPlacement>(props.placement)
const panelStyle = ref<CSSProperties>({
  position: 'fixed',
  top: '-9999px',
  left: '-9999px',
  visibility: 'hidden',
})

let pendingCloseReason: DiDropdownCloseReason = 'programmatic'
let resizeObserver: ResizeObserver | null = null
let typeaheadBuffer = ''
let typeaheadTimer: ReturnType<typeof setTimeout> | null = null

const { closeSiblings } = useDropdownGroup(
  () => props.group,
  () => close('group'),
)

/* ----------------------------------
 * Open / close
 * ---------------------------------- */
function openDropdown() {
  if (props.disabled)
    return
  open.value = true
}

function close(reason: DiDropdownCloseReason = 'programmatic') {
  if (!open.value)
    return
  pendingCloseReason = reason
  open.value = false
}

function toggle() {
  if (props.disabled)
    return
  if (open.value)
    close('trigger')
  else openDropdown()
}

/* ----------------------------------
 * Focus helpers
 * ---------------------------------- */
function focusTrigger() {
  triggerRef.value?.focus({ preventScroll: true })
}

function getItems(): HTMLElement[] {
  if (!panelRef.value)
    return []

  const explicit = panelRef.value.querySelectorAll<HTMLElement>('[role="menuitem"],[role="option"]')
  const nodes = explicit.length
    ? Array.from(explicit)
    : Array.from(panelRef.value.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))

  return nodes.filter(
    el => !el.hasAttribute('disabled') && el.getAttribute('aria-disabled') !== 'true',
  )
}

function focusItem(index: number) {
  const items = getItems()
  if (!items.length) {
    panelRef.value?.focus({ preventScroll: true })
    return
  }
  const resolved = index < 0 ? items.length + index : index
  const clamped = Math.max(0, Math.min(items.length - 1, resolved))
  items[clamped]?.focus({ preventScroll: true })
}

function moveFocus(direction: 1 | -1) {
  const items = getItems()
  if (!items.length)
    return

  const active = document.activeElement as HTMLElement | null
  const currentIndex = active ? items.indexOf(active) : -1
  const nextIndex
    = currentIndex === -1
      ? direction === 1
        ? 0
        : items.length - 1
      : (currentIndex + direction + items.length) % items.length

  items[nextIndex]?.focus({ preventScroll: true })
}

function focusInitial() {
  if (props.role === 'dialog') {
    panelRef.value?.focus({ preventScroll: true })
    return
  }
  const [first] = getItems()
  ;(first ?? panelRef.value)?.focus({ preventScroll: true })
}

function typeahead(char: string) {
  typeaheadBuffer += char.toLowerCase()
  if (typeaheadTimer)
    clearTimeout(typeaheadTimer)
  typeaheadTimer = setTimeout(() => {
    typeaheadBuffer = ''
  }, 500)

  const match = getItems().find(el =>
    (el.textContent ?? '').trim().toLowerCase().startsWith(typeaheadBuffer),
  )
  match?.focus({ preventScroll: true })
}

/* ----------------------------------
 * Positioning
 * ---------------------------------- */
function placementParts(placement: DiDropdownPlacement) {
  const [side, align = 'center'] = placement.split('-') as [DiDropdownSide, DiDropdownAlign]
  return { side, align }
}

function withSide(placement: DiDropdownPlacement, side: DiDropdownSide): DiDropdownPlacement {
  const { align } = placementParts(placement)
  return (align === 'center' ? side : `${side}-${align}`) as DiDropdownPlacement
}

function coordinatesFor(placement: DiDropdownPlacement, trigger: DOMRect, panel: DOMRect) {
  const { side } = placementParts(placement)
  let { align } = placementParts(placement)

  // `start` / `end` are logical along the inline axis for top/bottom placements.
  if ((side === 'top' || side === 'bottom') && isRtl.value && align !== 'center')
    align = align === 'start' ? 'end' : 'start'

  let top = 0
  let left = 0

  if (side === 'top')
    top = trigger.top - panel.height - props.offset
  else if (side === 'bottom')
    top = trigger.bottom + props.offset
  else if (side === 'left')
    left = trigger.left - panel.width - props.offset
  else left = trigger.right + props.offset

  if (side === 'top' || side === 'bottom') {
    if (align === 'start')
      left = trigger.left
    else if (align === 'end')
      left = trigger.right - panel.width
    else left = trigger.left + (trigger.width - panel.width) / 2
  }
  else {
    if (align === 'start')
      top = trigger.top
    else if (align === 'end')
      top = trigger.bottom - panel.height
    else top = trigger.top + (trigger.height - panel.height) / 2
  }

  return { top, left }
}

function overflowsPrimaryAxis(
  placement: DiDropdownPlacement,
  point: { top: number, left: number },
  panel: DOMRect,
) {
  const { side } = placementParts(placement)
  if (side === 'top')
    return point.top < VIEWPORT_PADDING
  if (side === 'bottom')
    return point.top + panel.height > window.innerHeight - VIEWPORT_PADDING
  if (side === 'left')
    return point.left < VIEWPORT_PADDING
  return point.left + panel.width > window.innerWidth - VIEWPORT_PADDING
}

function updatePosition() {
  if (!open.value || !triggerRef.value || !panelRef.value)
    return

  const triggerRect = triggerRef.value.getBoundingClientRect()
  const panelRect = panelRef.value.getBoundingClientRect()

  let placement = props.placement
  let point = coordinatesFor(placement, triggerRect, panelRect)

  if (overflowsPrimaryAxis(placement, point, panelRect)) {
    const flipped = withSide(placement, OPPOSITE_SIDE[placementParts(placement).side])
    const flippedPoint = coordinatesFor(flipped, triggerRect, panelRect)
    if (!overflowsPrimaryAxis(flipped, flippedPoint, panelRect)) {
      placement = flipped
      point = flippedPoint
    }
  }

  const maxLeft = Math.max(VIEWPORT_PADDING, window.innerWidth - panelRect.width - VIEWPORT_PADDING)
  const maxTop = Math.max(
    VIEWPORT_PADDING,
    window.innerHeight - panelRect.height - VIEWPORT_PADDING,
  )

  const finalTop = Math.min(Math.max(point.top, VIEWPORT_PADDING), maxTop)
  const finalLeft = Math.min(Math.max(point.left, VIEWPORT_PADDING), maxLeft)
  const availableHeight = Math.max(0, window.innerHeight - finalTop - VIEWPORT_PADDING)

  effectivePlacement.value = placement
  panelStyle.value = {
    position: 'fixed',
    top: `${Math.round(finalTop)}px`,
    left: `${Math.round(finalLeft)}px`,
    maxHeight: `${Math.round(availableHeight)}px`,
    visibility: 'visible',
    ...(props.matchTriggerWidth ? { minWidth: `${Math.round(triggerRect.width)}px` } : {}),
  }
}

/* ----------------------------------
 * Global listeners
 * ---------------------------------- */
function onDocumentPointerdown(event: PointerEvent) {
  if (!props.closeOnOutsideClick)
    return
  const target = event.target as Node
  if (!triggerRef.value?.contains(target) && !panelRef.value?.contains(target))
    close('outside')
}

function onDocumentKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.closeOnEscape) {
    event.preventDefault()
    close('escape')
  }
}

function addGlobalListeners() {
  document.addEventListener('pointerdown', onDocumentPointerdown)
  document.addEventListener('keydown', onDocumentKeydown)
  window.addEventListener('resize', updatePosition)
  window.addEventListener('scroll', updatePosition, true)

  nextTick(() => {
    if (panelRef.value && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => updatePosition())
      resizeObserver.observe(panelRef.value)
    }
  })
}

function removeGlobalListeners() {
  document.removeEventListener('pointerdown', onDocumentPointerdown)
  document.removeEventListener('keydown', onDocumentKeydown)
  window.removeEventListener('resize', updatePosition)
  window.removeEventListener('scroll', updatePosition, true)
  resizeObserver?.disconnect()
  resizeObserver = null
}

/* ----------------------------------
 * Event handlers
 * ---------------------------------- */
function onTriggerClick() {
  toggle()
}

function onTriggerKeydown(event: KeyboardEvent) {
  if (props.disabled)
    return

  if (props.triggerTag === 'span' && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault()
    toggle()
    return
  }

  const isMenuLike = props.role === 'menu' || props.role === 'listbox'
  if (isMenuLike && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
    event.preventDefault()
    const index = event.key === 'ArrowDown' ? 0 : -1
    if (open.value) {
      focusItem(index)
    }
    else {
      openDropdown()
      nextTick(() => {
        updatePosition()
        focusItem(index)
      })
    }
  }
}

function onPanelKeydown(event: KeyboardEvent) {
  switch (event.key) {
    case 'Escape':
      if (props.closeOnEscape) {
        event.preventDefault()
        event.stopPropagation()
        close('escape')
      }
      break
    case 'ArrowDown':
      event.preventDefault()
      moveFocus(1)
      break
    case 'ArrowUp':
      event.preventDefault()
      moveFocus(-1)
      break
    case 'Home':
      event.preventDefault()
      focusItem(0)
      break
    case 'End':
      event.preventDefault()
      focusItem(-1)
      break
    case 'Tab':
      // Let focus move naturally; `focusout` closes once it leaves the panel.
      break
    default:
      if (
        props.role === 'menu'
        && event.key.length === 1
        && !event.metaKey
        && !event.ctrlKey
        && !event.altKey
      ) {
        typeahead(event.key)
      }
  }
}

function onPanelFocusout(event: FocusEvent) {
  const next = event.relatedTarget as Node | null
  if (!next)
    return
  if (panelRef.value?.contains(next) || triggerRef.value?.contains(next))
    return
  close('focus-out')
}

function onPanelClick(event: MouseEvent) {
  if (!props.closeOnContentClick)
    return

  const target = event.target as HTMLElement
  if (target.closest('[data-di-dropdown-no-close]'))
    return
  if (target.closest('a[href],button,[role="menuitem"],[role="option"],[data-di-dropdown-close]')) {
    close('content')
  }
}

/* ----------------------------------
 * Reactions
 * ---------------------------------- */
watch(open, (isOpen) => {
  if (isOpen) {
    closeSiblings()
    addGlobalListeners()
    emit('open')
    nextTick(() => {
      updatePosition()
      if (props.autoFocus)
        focusInitial()
    })
  }
  else {
    removeGlobalListeners()
    emit('close', pendingCloseReason)
    if (RESTORE_FOCUS_REASONS.has(pendingCloseReason))
      nextTick(focusTrigger)
    pendingCloseReason = 'programmatic'
  }
})

function onPanelAfterLeave() {
  // Reset once the panel is gone so the next open starts hidden until positioned.
  panelStyle.value = { position: 'fixed', top: '-9999px', left: '-9999px', visibility: 'hidden' }
}

watch(
  () => props.disabled,
  (disabled) => {
    if (disabled && open.value)
      close('programmatic')
  },
)

watch(
  () => [props.placement, props.offset, props.matchTriggerWidth],
  () => {
    if (open.value)
      nextTick(updatePosition)
  },
)

onMounted(() => {
  if (open.value) {
    addGlobalListeners()
    nextTick(() => {
      updatePosition()
      if (props.autoFocus)
        focusInitial()
    })
  }
})

onBeforeUnmount(() => {
  removeGlobalListeners()
  if (typeaheadTimer)
    clearTimeout(typeaheadTimer)
})

defineExpose({
  open: openDropdown,
  close: () => close('programmatic'),
  toggle,
})
</script>

<template>
  <component
    :is="triggerTag"
    ref="triggerRef"
    v-bind="$attrs"
    data-di-dropdown-trigger
    :type="triggerTag === 'button' ? 'button' : undefined"
    :disabled="triggerTag === 'button' ? disabled || undefined : undefined"
    :role="triggerTag === 'span' ? 'button' : undefined"
    :tabindex="triggerTag === 'span' ? (disabled ? -1 : 0) : undefined"
    :aria-label="ariaLabel"
    :aria-haspopup="HASPOPUP[role]"
    :aria-expanded="open"
    :aria-controls="open ? panelId : undefined"
    :aria-disabled="triggerTag === 'span' && disabled ? 'true' : undefined"
    @click="onTriggerClick"
    @keydown="onTriggerKeydown"
  >
    <slot name="trigger" :open="open" :disabled="disabled" :toggle="toggle" />
  </component>

  <Teleport to="body">
    <Transition name="di-dropdown" @after-leave="onPanelAfterLeave">
      <div
        v-if="open"
        :id="panelId"
        ref="panelRef"
        :role="role"
        :aria-label="ariaLabel"
        tabindex="-1"
        :data-placement="effectivePlacement"
        :class="[PANEL_BASE_CLASS, ORIGIN_CLASSES[effectivePlacement], panelClass]"
        :style="panelStyle"
        @keydown="onPanelKeydown"
        @focusout="onPanelFocusout"
        @click="onPanelClick"
        @pointerdown.stop
      >
        <slot :open="open" :close="() => close('programmatic')" />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.di-dropdown-enter-active {
  transition:
    opacity 0.16s ease,
    transform 0.16s cubic-bezier(0.16, 1, 0.3, 1);
}

.di-dropdown-leave-active {
  transition:
    opacity 0.12s ease,
    transform 0.12s ease;
}

.di-dropdown-enter-from,
.di-dropdown-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

@media (prefers-reduced-motion: reduce) {
  .di-dropdown-enter-active,
  .di-dropdown-leave-active {
    transition-duration: 1ms;
  }

  .di-dropdown-enter-from,
  .di-dropdown-leave-to {
    transform: none;
  }
}
</style>
