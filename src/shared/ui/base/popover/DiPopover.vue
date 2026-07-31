<script setup lang="ts">
import type { CSSProperties } from 'vue'

import { computed, nextTick, onBeforeUnmount, ref, useId, useSlots, watch } from 'vue'

import type { DiPopoverPlacement, DiPopoverSize, DiPopoverWidth } from './types'

type Props = {
  title?: string
  placement?: DiPopoverPlacement
  size?: DiPopoverSize
  width?: DiPopoverWidth
  offset?: number
  disabled?: boolean
  closeOnClickOutside?: boolean
  closeOnEscape?: boolean
  persistent?: boolean
  showArrow?: boolean
}

type CloseReason = 'trigger' | 'outside' | 'escape' | 'programmatic'

const props = withDefaults(defineProps<Props>(), {
  placement: 'bottom',
  size: 'md',
  width: 'auto',
  offset: 8,
  disabled: false,
  closeOnClickOutside: true,
  closeOnEscape: true,
  persistent: false,
  showArrow: true,
})

const emit = defineEmits<{
  opened: []
  closed: [reason: CloseReason]
}>()

defineSlots<{
  trigger: (props: { open: boolean, disabled: boolean, toggle: () => void }) => unknown
  default: (props: { open: boolean, close: () => void }) => unknown
  header?: (props: { close: () => void }) => unknown
  footer?: (props: { close: () => void }) => unknown
}>()

const open = defineModel<boolean>('open', { default: false })

const slots = useSlots()
const generatedId = useId().split(':').join('')
const contentId = `di-popover-${generatedId}`
const headerId = `${contentId}-header`
const triggerElement = ref<HTMLElement | null>(null)
const contentElement = ref<HTMLElement | null>(null)
const effectivePlacement = ref<DiPopoverPlacement>(props.placement)
const contentStyle = ref<CSSProperties>({ visibility: 'hidden' })
const arrowStyle = ref<CSSProperties>({})

const SIZE_CLASSES: Record<DiPopoverSize, string> = {
  sm: 'text-xs leading-4',
  md: 'text-sm leading-5',
  lg: 'text-base leading-6',
}

const HEADER_CLASSES: Record<DiPopoverSize, string> = {
  sm: 'px-3 py-1.5 text-sm leading-5',
  md: 'px-4 py-2 text-[0.9375rem] leading-5',
  lg: 'px-5 py-2.5 text-base leading-6',
}

const BODY_PADDING_CLASSES: Record<DiPopoverSize, string> = {
  sm: 'px-3 py-2.5',
  md: 'px-4 py-3.5',
  lg: 'px-5 py-4',
}

const FOOTER_PADDING_CLASSES: Record<DiPopoverSize, string> = {
  sm: 'px-3 py-2',
  md: 'px-4 py-2.5',
  lg: 'px-5 py-3',
}

const WIDTH_CLASSES: Record<DiPopoverWidth, string> = {
  auto: 'w-max min-w-44 max-w-[276px]',
  trigger: 'max-w-[calc(100vw-1rem)]',
  full: 'max-w-[calc(100vw-1rem)]',
}

const PLACEMENT_CLASSES: Record<DiPopoverPlacement, string> = {
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

const OPPOSITE_SIDE = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
} as const

const ARROW_CLASSES: Record<DiPopoverPlacement, string> = {
  'top': 'di-popover__arrow--top',
  'top-start': 'di-popover__arrow--top',
  'top-end': 'di-popover__arrow--top',
  'bottom': 'di-popover__arrow--bottom',
  'bottom-start': 'di-popover__arrow--bottom',
  'bottom-end': 'di-popover__arrow--bottom',
  'left': 'di-popover__arrow--left',
  'left-start': 'di-popover__arrow--left',
  'left-end': 'di-popover__arrow--left',
  'right': 'di-popover__arrow--right',
  'right-start': 'di-popover__arrow--right',
  'right-end': 'di-popover__arrow--right',
}

const hasHeader = computed(() => Boolean(props.title || slots.header))

const contentClasses = computed(() => [
  'di-popover card fixed z-50 rounded-lg border border-base-300 bg-base-100 text-base-content shadow-md',
  'motion-safe:transition-opacity motion-safe:duration-150',
  SIZE_CLASSES[props.size],
  WIDTH_CLASSES[props.width],
  PLACEMENT_CLASSES[effectivePlacement.value],
])

const headerClasses = computed(() => HEADER_CLASSES[props.size])
const bodyPaddingClasses = computed(() => BODY_PADDING_CLASSES[props.size])
const footerPaddingClasses = computed(() => FOOTER_PADDING_CLASSES[props.size])
const arrowClasses = computed(() => ['di-popover__arrow', ARROW_CLASSES[effectivePlacement.value]])

function placementParts(placement: DiPopoverPlacement) {
  const [side, alignment = 'center'] = placement.split('-') as [
    'top' | 'bottom' | 'left' | 'right',
    'start' | 'end' | 'center',
  ]
  return { side, alignment }
}

function withSide(placement: DiPopoverPlacement, side: 'top' | 'bottom' | 'left' | 'right') {
  const { alignment } = placementParts(placement)
  return `${side}${alignment === 'center' ? '' : `-${alignment}`}` as DiPopoverPlacement
}

function coordinates(placement: DiPopoverPlacement, triggerRect: DOMRect, contentRect: DOMRect) {
  const { side, alignment } = placementParts(placement)
  let top = 0
  let left = 0

  if (side === 'top')
    top = triggerRect.top - contentRect.height - props.offset
  else if (side === 'bottom')
    top = triggerRect.bottom + props.offset
  else if (side === 'left')
    left = triggerRect.left - contentRect.width - props.offset
  else left = triggerRect.right + props.offset

  if (side === 'top' || side === 'bottom') {
    if (alignment === 'start')
      left = triggerRect.left
    else if (alignment === 'end')
      left = triggerRect.right - contentRect.width
    else left = triggerRect.left + (triggerRect.width - contentRect.width) / 2
  }
  else {
    if (alignment === 'start')
      top = triggerRect.top
    else if (alignment === 'end')
      top = triggerRect.bottom - contentRect.height
    else top = triggerRect.top + (triggerRect.height - contentRect.height) / 2
  }

  return { top, left }
}

function overflowsPrimaryAxis(
  placement: DiPopoverPlacement,
  point: { top: number, left: number },
  contentRect: DOMRect,
) {
  const viewportPadding = 8
  const { side } = placementParts(placement)

  if (side === 'top')
    return point.top < viewportPadding
  if (side === 'bottom')
    return point.top + contentRect.height > window.innerHeight - viewportPadding
  if (side === 'left')
    return point.left < viewportPadding
  return point.left + contentRect.width > window.innerWidth - viewportPadding
}

function updatePosition() {
  if (!open.value || !triggerElement.value || !contentElement.value)
    return

  const triggerRect = triggerElement.value.getBoundingClientRect()
  const contentRect = contentElement.value.getBoundingClientRect()
  let placement = props.placement
  let point = coordinates(placement, triggerRect, contentRect)

  if (overflowsPrimaryAxis(placement, point, contentRect)) {
    const { side } = placementParts(placement)
    const flipped = withSide(placement, OPPOSITE_SIDE[side])
    const flippedPoint = coordinates(flipped, triggerRect, contentRect)
    if (!overflowsPrimaryAxis(flipped, flippedPoint, contentRect)) {
      placement = flipped
      point = flippedPoint
    }
  }

  const viewportPadding = 8
  const maxLeft = Math.max(viewportPadding, window.innerWidth - contentRect.width - viewportPadding)
  const maxTop = Math.max(
    viewportPadding,
    window.innerHeight - contentRect.height - viewportPadding,
  )
  const width
    = props.width === 'trigger'
      ? `${triggerRect.width}px`
      : props.width === 'full'
        ? `${Math.max(0, window.innerWidth - viewportPadding * 2)}px`
        : undefined

  const finalTop = Math.min(Math.max(point.top, viewportPadding), maxTop)
  const finalLeft = Math.min(Math.max(point.left, viewportPadding), maxLeft)
  const arrowBoundary = 16
  const { side } = placementParts(placement)

  if (side === 'top' || side === 'bottom') {
    const arrowLeft = triggerRect.left + triggerRect.width / 2 - finalLeft
    arrowStyle.value = {
      left: `${Math.min(Math.max(arrowLeft, arrowBoundary), contentRect.width - arrowBoundary)}px`,
    }
  }
  else {
    const arrowTop = triggerRect.top + triggerRect.height / 2 - finalTop
    arrowStyle.value = {
      top: `${Math.min(Math.max(arrowTop, arrowBoundary), contentRect.height - arrowBoundary)}px`,
    }
  }

  effectivePlacement.value = placement
  contentStyle.value = {
    top: `${finalTop}px`,
    left: `${finalLeft}px`,
    width,
  }
}

function focusContent() {
  const focusable = contentElement.value?.querySelector<HTMLElement>(
    'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
  )
  const focusTarget = focusable ?? contentElement.value
  focusTarget?.focus({ preventScroll: true })
}

function show() {
  if (props.disabled || open.value)
    return
  open.value = true
}

function close(reason: CloseReason = 'programmatic', restoreFocus = false) {
  if (!open.value)
    return
  open.value = false
  emit('closed', reason)
  if (restoreFocus)
    nextTick(() => triggerElement.value?.focus({ preventScroll: true }))
}

function toggle() {
  if (props.disabled)
    return
  if (open.value)
    close('trigger', true)
  else show()
}

function onTriggerKeydown(event: KeyboardEvent) {
  if (event.target !== event.currentTarget)
    return

  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    toggle()
  }
  else if (event.key === 'Escape' && open.value && props.closeOnEscape && !props.persistent) {
    event.preventDefault()
    close('escape', true)
  }
}

function onDocumentPointerDown(event: PointerEvent) {
  if (!props.closeOnClickOutside || props.persistent)
    return
  const target = event.target as Node
  if (!triggerElement.value?.contains(target) && !contentElement.value?.contains(target))
    close('outside')
}

function onDocumentKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && props.closeOnEscape && !props.persistent) {
    event.preventDefault()
    close('escape', true)
  }
}

function addGlobalListeners() {
  document.addEventListener('pointerdown', onDocumentPointerDown)
  document.addEventListener('keydown', onDocumentKeydown)
  window.addEventListener('resize', updatePosition)
  window.addEventListener('scroll', updatePosition, true)
}

function removeGlobalListeners() {
  document.removeEventListener('pointerdown', onDocumentPointerDown)
  document.removeEventListener('keydown', onDocumentKeydown)
  window.removeEventListener('resize', updatePosition)
  window.removeEventListener('scroll', updatePosition, true)
}

watch(
  open,
  async (isOpen) => {
    removeGlobalListeners()
    if (!isOpen)
      return

    addGlobalListeners()
    await nextTick()
    updatePosition()
    focusContent()
    emit('opened')
  },
  { immediate: true },
)

watch(
  () => [props.placement, props.offset, props.width, props.size],
  () => nextTick(updatePosition),
)

watch(
  () => props.disabled,
  isDisabled => isDisabled && close('programmatic'),
)

onBeforeUnmount(removeGlobalListeners)
</script>

<template>
  <span class="inline-flex" :class="width === 'full' && 'w-full'">
    <span
      ref="triggerElement"
      data-di-popover-trigger
      class="inline-flex"
      :class="width === 'full' && 'w-full'"
      role="button"
      :tabindex="disabled ? -1 : 0"
      aria-haspopup="dialog"
      :aria-expanded="open"
      :aria-controls="open ? contentId : undefined"
      :aria-disabled="disabled || undefined"
      @click="toggle"
      @keydown="onTriggerKeydown"
    >
      <slot name="trigger" :open="open" :disabled="disabled" :toggle="toggle" />
    </span>

    <Teleport to="body">
      <div
        v-if="open"
        :id="contentId"
        ref="contentElement"
        role="dialog"
        tabindex="-1"
        :aria-labelledby="hasHeader ? headerId : undefined"
        :data-placement="effectivePlacement"
        :class="contentClasses"
        :style="contentStyle"
        @pointerdown.stop
      >
        <span v-if="showArrow" aria-hidden="true" :class="arrowClasses" :style="arrowStyle" />

        <div class="relative z-10 overflow-hidden rounded-[calc(0.5rem-1px)]">
          <header
            v-if="hasHeader"
            :id="headerId"
            class="border-b border-base-300 bg-base-200/40 font-semibold"
            :class="headerClasses"
          >
            <slot name="header" :close="() => close()">
              {{ title }}
            </slot>
          </header>

          <div :class="bodyPaddingClasses">
            <slot :open="open" :close="() => close()" />
          </div>

          <footer
            v-if="slots.footer"
            class="border-t border-base-300 bg-base-200/20"
            :class="footerPaddingClasses"
          >
            <slot name="footer" :close="() => close()" />
          </footer>
        </div>
      </div>
    </Teleport>
  </span>
</template>

<style scoped>
.di-popover__arrow {
  position: absolute;
  z-index: 1;
}

.di-popover__arrow::before,
.di-popover__arrow::after {
  position: absolute;
  width: 0;
  height: 0;
  content: '';
}

.di-popover__arrow--top {
  width: 1rem;
  height: 0.5rem;
  top: 100%;
  transform: translateX(-50%);
}

.di-popover__arrow--top::before,
.di-popover__arrow--top::after {
  border-right: 0.5rem solid transparent;
  border-left: 0.5rem solid transparent;
  border-top: 0.5rem solid var(--color-base-300);
}

.di-popover__arrow--top::after {
  top: -1px;
  border-top-color: var(--color-base-100);
}

.di-popover__arrow--bottom {
  width: 1rem;
  height: 0.5rem;
  top: 0;
  transform: translate(-50%, -100%);
}

.di-popover__arrow--bottom::before,
.di-popover__arrow--bottom::after {
  border-right: 0.5rem solid transparent;
  border-bottom: 0.5rem solid var(--color-base-300);
  border-left: 0.5rem solid transparent;
}

.di-popover__arrow--bottom::after {
  top: 1px;
  border-bottom-color: var(--color-base-100);
}

.di-popover__arrow--left {
  width: 0.5rem;
  height: 1rem;
  left: 100%;
  transform: translateY(-50%);
}

.di-popover__arrow--left::before,
.di-popover__arrow--left::after {
  border-top: 0.5rem solid transparent;
  border-bottom: 0.5rem solid transparent;
  border-left: 0.5rem solid var(--color-base-300);
}

.di-popover__arrow--left::after {
  left: -1px;
  border-left-color: var(--color-base-100);
}

.di-popover__arrow--right {
  width: 0.5rem;
  height: 1rem;
  left: 0;
  transform: translate(-100%, -50%);
}

.di-popover__arrow--right::before,
.di-popover__arrow--right::after {
  border-top: 0.5rem solid transparent;
  border-right: 0.5rem solid var(--color-base-300);
  border-bottom: 0.5rem solid transparent;
}

.di-popover__arrow--right::after {
  left: 1px;
  border-right-color: var(--color-base-100);
}
</style>
