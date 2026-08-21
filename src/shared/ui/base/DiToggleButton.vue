<script setup lang="ts" generic="T extends string | number | boolean = string | number | boolean">
import { computed, useAttrs, useId } from 'vue'

import type { BtnVariant, Size } from '@/shared/types/models'

type ToggleButtonType = 'checkbox' | 'radio'
type ToggleButtonSize = Extract<Size, 'xs' | 'sm' | 'md' | 'lg'>

type BaseProps = {
  id?: string
  name?: string
  label?: string
  disabled?: boolean
  size?: ToggleButtonSize
  variant?: BtnVariant
  outline?: boolean
  required?: boolean
}

type Props = BaseProps
  & (
    | { type?: Extract<ToggleButtonType, 'checkbox'>, modelValue?: boolean, value?: never }
    | { type: Extract<ToggleButtonType, 'radio'>, modelValue?: T | null, value: T }
  )

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  size: 'md',
  variant: 'primary',
  outline: false,
  required: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean | T]
  'change': [value: boolean | T, event: Event]
}>()

defineSlots<{
  'default'?: () => unknown
  'icon-start'?: () => unknown
  'icon-end'?: () => unknown
}>()

const attrs = useAttrs()
const generatedId = useId().split(':').join('')
const controlId = computed(() => props.id || `di-toggle-button-${generatedId}`)
const resolvedType = computed<ToggleButtonType>(() => props.type || 'checkbox')

const SIZE_CLASSES: Record<ToggleButtonSize, string> = {
  xs: 'btn-xs',
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
}

const VARIANT_CLASSES: Record<BtnVariant, string> = {
  neutral: 'btn-neutral',
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
  info: 'btn-info',
  success: 'btn-success',
  warning: 'btn-warning',
  error: 'btn-error',
  ghost: 'btn-ghost',
  link: 'btn-link',
  gradient: 'btn-link',
}

const isChecked = computed(() =>
  resolvedType.value === 'checkbox'
    ? props.modelValue === true
    : Object.is(props.modelValue, props.value),
)
const labelClasses = computed(() => [
  'btn peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2',
  'peer-checked:btn-active',
  SIZE_CLASSES[props.size],
  VARIANT_CLASSES[props.variant],
  props.outline && 'btn-outline',
  props.disabled && 'btn-disabled cursor-not-allowed',
])

function onChange(event: Event) {
  const input = event.target as HTMLInputElement
  const nextValue = resolvedType.value === 'checkbox' ? input.checked : props.value

  if (nextValue === undefined)
    return

  emit('update:modelValue', nextValue)
  emit('change', nextValue, event)
}
</script>

<template>
  <input
    :id="controlId"
    v-bind="attrs"
    :type="resolvedType"
    :name="name"
    :value="value"
    :checked="isChecked"
    :disabled="disabled"
    :required="required"
    class="peer sr-only"
    @change="onChange"
  >
  <label :for="controlId" :class="labelClasses">
    <slot name="icon-start" />
    <slot>{{ label }}</slot>
    <slot name="icon-end" />
  </label>
</template>
