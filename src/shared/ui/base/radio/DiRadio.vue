<script setup lang="ts" generic="T extends DiRadioValue = DiRadioValue">
import type { StyleValue } from 'vue'

import { computed, useAttrs, useId } from 'vue'

import type { DiRadioLabelPosition, DiRadioSize, DiRadioValue, DiRadioVariant } from './types'

import { RADIO_SIZE_CLASSES } from './sizes'
import { RADIO_VARIANT_CLASSES } from './variants'

type Props = {
  value: T
  id?: string
  name?: string
  label?: string
  labelPosition?: DiRadioLabelPosition
  disabled?: boolean
  required?: boolean
  invalid?: boolean
  size?: DiRadioSize
  variant?: DiRadioVariant
  helperText?: string
  error?: string
}

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<Props>(), {
  labelPosition: 'end',
  disabled: false,
  required: false,
  invalid: false,
  size: 'md',
  variant: 'primary',
})

const emit = defineEmits<{
  change: [value: T, event: Event]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const slots = defineSlots<{
  label?: () => unknown
  helper?: () => unknown
  error?: () => unknown
}>()

const model = defineModel<T | null>({ default: null })
const attrs = useAttrs()
const generatedId = useId().split(':').join('')

const controlId = computed(() => props.id || `di-radio-${generatedId}`)
const helperId = computed(() => `${controlId.value}-helper`)
const errorId = computed(() => `${controlId.value}-error`)
const hasLabel = computed(() => Boolean(props.label || slots.label))
const hasHelper = computed(() => Boolean(props.helperText || slots.helper))
const hasError = computed(() => Boolean(props.error || slots.error))
const isChecked = computed(() => Object.is(model.value, props.value))
const describedBy = computed(() => {
  const ids = [
    attrs['aria-describedby'],
    hasHelper.value ? helperId.value : undefined,
    hasError.value ? errorId.value : undefined,
  ]
  return ids.filter(Boolean).join(' ') || undefined
})
const rootClasses = computed(() => ['inline-flex flex-col gap-1.5', props.disabled && 'opacity-60'])
const rootStyle = computed(() => attrs.style as StyleValue)
const inputAttrs = computed(() => {
  const {
    class: _class,
    style: _style,
    'aria-describedby': _ariaDescribedBy,
    'aria-invalid': _ariaInvalid,
    ...nativeAttrs
  } = attrs
  return nativeAttrs
})
const contentClasses = computed(() => [
  'inline-flex items-center gap-2',
  props.labelPosition === 'start' && 'flex-row-reverse',
])
const inputClasses = computed(() => [
  'radio shrink-0',
  RADIO_SIZE_CLASSES[props.size],
  hasError.value || props.invalid ? 'radio-error' : RADIO_VARIANT_CLASSES[props.variant],
  attrs.class,
])
const labelClasses = computed(() => [
  'min-w-0 select-none text-start text-sm font-medium text-base-content',
  props.disabled ? 'cursor-not-allowed' : 'cursor-pointer',
])

function onChange(event: Event) {
  const target = event.target as HTMLInputElement
  if (!target.checked)
    return

  model.value = props.value
  emit('change', props.value, event)
}
</script>

<template>
  <span :class="rootClasses" :style="rootStyle">
    <span :class="contentClasses">
      <input
        :id="controlId"
        v-bind="inputAttrs"
        type="radio"
        :name="name"
        :value="value"
        :checked="isChecked"
        :disabled="disabled"
        :required="required"
        :class="inputClasses"
        :aria-describedby="describedBy"
        :aria-invalid="hasError || invalid || undefined"
        @blur="emit('blur', $event)"
        @change="onChange"
        @focus="emit('focus', $event)"
      >

      <label v-if="hasLabel" :for="controlId" :class="labelClasses">
        <slot name="label">{{ label }}</slot>
        <span v-if="required" class="text-error" aria-hidden="true">*</span>
      </label>
    </span>

    <span v-if="hasHelper" :id="helperId" class="text-xs text-base-content/60">
      <slot name="helper">{{ helperText }}</slot>
    </span>
    <span v-if="hasError" :id="errorId" class="text-xs text-error" role="alert">
      <slot name="error">{{ error }}</slot>
    </span>
  </span>
</template>
