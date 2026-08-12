<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, useId, watch } from 'vue'
import { useI18n } from 'vue-i18n'

/* =======================
   Types
======================= */

type Position = 'start' | 'end'
type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

type Props = {
  modelValue: boolean
  position?: Position

  // Responsive: at which breakpoint the drawer stays permanently open
  openAt?: Breakpoint | false

  closeOnOverlay?: boolean
  overlay?: boolean

  label?: string
  closeOverlayLabel?: string

  sideClass?: string
  contentClass?: string
  customClass?: string
}

/* =======================
   Props / Emits
======================= */

const props = withDefaults(defineProps<Props>(), {
  position: 'start',
  openAt: false,
  closeOnOverlay: true,
  overlay: true,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

defineSlots<{
  trigger?: (props: {
    open: boolean
    toggle: () => void
    toggleId: string
    sideId: string
  }) => unknown
  content?: () => unknown
  side?: (props: { close: () => void }) => unknown
}>()

const { t } = useI18n()
const resolvedLabel = computed(() => props.label ?? t('components.drawer.toggle'))
const resolvedCloseOverlayLabel = computed(
  () => props.closeOverlayLabel ?? t('components.drawer.closeOverlay'),
)

/* =======================
   State control
======================= */

const isOpen = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})

const generatedId = useId().split(':').join('')
const toggleId = `di-drawer-${generatedId}-toggle`
const sideId = `di-drawer-${generatedId}-side`
const sideElement = ref<HTMLElement | null>(null)
let previouslyFocusedElement: HTMLElement | null = null
let focusManagementActive = false

/* =======================
   Classes
======================= */

const RESPONSIVE_OPEN_CLASSES: Record<Breakpoint, string> = {
  'sm': 'sm:drawer-open',
  'md': 'md:drawer-open',
  'lg': 'lg:drawer-open',
  'xl': 'xl:drawer-open',
  '2xl': '2xl:drawer-open',
}

const drawerClasses = computed(() => [
  'drawer',
  props.position === 'end' && 'drawer-end',
  props.openAt && RESPONSIVE_OPEN_CLASSES[props.openAt],
  props.customClass,
])

/* =======================
   Actions
======================= */

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

function getFocusableElements() {
  if (!sideElement.value)
    return []

  return Array.from(sideElement.value.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    element => !element.closest('[hidden], [inert], [aria-hidden="true"]'),
  )
}

function focusDrawerSide() {
  const focusTarget = getFocusableElements()[0] ?? sideElement.value
  focusTarget?.focus({ preventScroll: true })
}

function restorePreviousFocus(defer = true) {
  const focusTarget = previouslyFocusedElement
  previouslyFocusedElement = null

  if (!focusTarget)
    return

  const restore = () => {
    if (focusTarget.isConnected && (!defer || !props.modelValue))
      focusTarget.focus({ preventScroll: true })
  }

  if (defer)
    nextTick(restore)
  else restore()
}

function handleDocumentKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault()
    closeDrawer()
    return
  }

  if (event.key !== 'Tab')
    return

  const focusableElements = getFocusableElements()
  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]
  const activeElement = document.activeElement

  if (!firstElement || !lastElement) {
    event.preventDefault()
    sideElement.value?.focus({ preventScroll: true })
  }
  else if (!sideElement.value?.contains(activeElement)) {
    event.preventDefault()
    const focusTarget = event.shiftKey ? lastElement : firstElement
    focusTarget.focus({ preventScroll: true })
  }
  else if (event.shiftKey && activeElement === firstElement) {
    event.preventDefault()
    lastElement.focus({ preventScroll: true })
  }
  else if (!event.shiftKey && activeElement === lastElement) {
    event.preventDefault()
    firstElement.focus({ preventScroll: true })
  }
}

async function activateFocusManagement() {
  if (focusManagementActive || typeof document === 'undefined')
    return

  const activeElement = document.activeElement
  previouslyFocusedElement
    = activeElement instanceof HTMLElement
      && activeElement !== document.body
      && !sideElement.value?.contains(activeElement)
      ? activeElement
      : null

  focusManagementActive = true
  document.addEventListener('keydown', handleDocumentKeydown)

  await nextTick()
  if (props.modelValue && focusManagementActive)
    focusDrawerSide()
}

function deactivateFocusManagement(restoreFocus = true) {
  if (typeof document !== 'undefined')
    document.removeEventListener('keydown', handleDocumentKeydown)

  focusManagementActive = false
  if (restoreFocus)
    restorePreviousFocus()
  else previouslyFocusedElement = null
}

function closeDrawer() {
  isOpen.value = false
}

function handleOverlayClick() {
  if (props.closeOnOverlay)
    closeDrawer()
}

function toggleDrawer() {
  isOpen.value = !isOpen.value
}

watch(
  () => props.modelValue,
  (open) => {
    if (open)
      activateFocusManagement()
    else deactivateFocusManagement()
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  if (typeof document !== 'undefined')
    document.removeEventListener('keydown', handleDocumentKeydown)

  focusManagementActive = false
  restorePreviousFocus(false)
})
</script>

<template>
  <div :class="drawerClasses">
    <!-- TOGGLE -->
    <input
      :id="toggleId"
      v-model="isOpen"
      type="checkbox"
      class="drawer-toggle"
      role="button"
      :aria-label="resolvedLabel"
      aria-haspopup="dialog"
      :aria-expanded="isOpen"
      :aria-controls="sideId"
    >

    <!-- CONTENT -->
    <div class="drawer-content" :class="contentClass">
      <!-- Trigger slot: use drawer-button class on your label/button -->
      <slot
        name="trigger"
        :open="isOpen"
        :toggle="toggleDrawer"
        :toggle-id="toggleId"
        :side-id="sideId"
      />
      <slot name="content" />
    </div>

    <!-- SIDEBAR -->
    <div
      :id="sideId"
      ref="sideElement"
      class="drawer-side motion-reduce:transition-none"
      :class="sideClass"
      :role="isOpen ? 'dialog' : undefined"
      :tabindex="isOpen ? -1 : undefined"
      :aria-label="isOpen ? resolvedLabel : undefined"
      :aria-modal="isOpen || undefined"
    >
      <label
        v-if="overlay"
        class="drawer-overlay"
        :aria-label="resolvedCloseOverlayLabel"
        @click="handleOverlayClick"
      />
      <slot name="side" :close="closeDrawer" />
    </div>
  </div>
</template>
