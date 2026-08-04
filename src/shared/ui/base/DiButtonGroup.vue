<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useDirection } from '@/shared/composables/use-direction'

type ButtonGroupOrientation = 'horizontal' | 'vertical'
type ButtonGroupRole = 'group' | 'toolbar'

type Props = {
  orientation?: ButtonGroupOrientation
  attached?: boolean
  rounded?: boolean
  role?: ButtonGroupRole
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  orientation: 'horizontal',
  attached: true,
  rounded: false,
  role: 'group',
})

defineSlots<{
  default?: () => unknown
}>()

const { isRtl } = useDirection()
const { t } = useI18n()
const group = ref<HTMLElement>()
const resolvedAriaLabel = computed(() => props.ariaLabel ?? t('components.buttonGroup.label'))

const groupClasses = computed(() => [
  'di-button-group inline-flex',
  props.orientation === 'horizontal' ? 'flex-row' : 'flex-col items-stretch',
  props.attached ? 'di-button-group-attached' : 'gap-2',
  props.rounded && 'di-button-group-rounded',
])

function enabledControls() {
  if (!group.value)
    return []

  return Array.from(group.value.children).filter((element): element is HTMLElement => {
    if (!(element instanceof HTMLElement))
      return false

    const isControl = element.matches('button, a, input')
    const isDisabled
      = element.matches(':disabled')
        || element.getAttribute('aria-disabled') === 'true'
        || element.classList.contains('btn-disabled')

    return isControl && !isDisabled
  })
}

function focusRelativeControl(direction: 1 | -1) {
  const controls = enabledControls()
  if (!controls.length)
    return

  const activeIndex = controls.findIndex(control => control === document.activeElement)
  const nextIndex
    = activeIndex < 0 ? 0 : (activeIndex + direction + controls.length) % controls.length

  controls[nextIndex]?.focus()
}

function onKeydown(event: KeyboardEvent) {
  if (props.role !== 'toolbar')
    return

  const isHorizontal = props.orientation === 'horizontal'
  const previousKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp'
  const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown'

  if (event.key === previousKey || event.key === nextKey) {
    event.preventDefault()
    const visualDirection = event.key === nextKey ? 1 : -1
    const direction = isHorizontal && isRtl.value ? -visualDirection : visualDirection
    focusRelativeControl(direction as 1 | -1)
    return
  }

  const controls = enabledControls()

  if (event.key === 'Home') {
    event.preventDefault()
    controls[0]?.focus()
  }
  else if (event.key === 'End') {
    event.preventDefault()
    controls[controls.length - 1]?.focus()
  }
}
</script>

<template>
  <div
    ref="group"
    :class="groupClasses"
    :role="role"
    :aria-label="resolvedAriaLabel"
    :aria-orientation="role === 'toolbar' ? orientation : undefined"
    @keydown="onKeydown"
  >
    <slot />
  </div>
</template>

<style scoped>
.di-button-group-attached:deep(> .btn) {
  position: relative;
  border-radius: 0;
}

.di-button-group-attached:deep(> .btn:hover),
.di-button-group-attached:deep(> .btn:focus-visible) {
  z-index: 1;
}

.di-button-group-attached.flex-row:deep(> .btn:not(:first-child)) {
  margin-inline-start: -1px;
}

.di-button-group-attached.flex-col:deep(> .btn:not(:first-child)) {
  margin-top: -1px;
}

.di-button-group-attached.flex-row:deep(> .btn:first-child) {
  border-start-start-radius: var(--radius-field);
  border-end-start-radius: var(--radius-field);
}

.di-button-group-attached.flex-row:deep(> .btn:last-child) {
  border-start-end-radius: var(--radius-field);
  border-end-end-radius: var(--radius-field);
}

.di-button-group-attached.flex-col:deep(> .btn:first-child) {
  border-start-start-radius: var(--radius-field);
  border-start-end-radius: var(--radius-field);
}

.di-button-group-attached.flex-col:deep(> .btn:last-child) {
  border-end-start-radius: var(--radius-field);
  border-end-end-radius: var(--radius-field);
}

.di-button-group-rounded.flex-row:deep(> .btn:first-child) {
  border-start-start-radius: calc(infinity * 1px);
  border-end-start-radius: calc(infinity * 1px);
}

.di-button-group-rounded.flex-row:deep(> .btn:last-child) {
  border-start-end-radius: calc(infinity * 1px);
  border-end-end-radius: calc(infinity * 1px);
}

.di-button-group-rounded.flex-col:deep(> .btn:first-child) {
  border-start-start-radius: calc(infinity * 1px);
  border-start-end-radius: calc(infinity * 1px);
}

.di-button-group-rounded.flex-col:deep(> .btn:last-child) {
  border-end-start-radius: calc(infinity * 1px);
  border-end-end-radius: calc(infinity * 1px);
}
</style>
