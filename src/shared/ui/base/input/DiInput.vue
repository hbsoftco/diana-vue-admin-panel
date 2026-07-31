<script setup lang="ts">
import type { StyleValue } from 'vue'

import { computed, useAttrs, useId } from 'vue'

import type { DiInputSize, DiInputType, DiInputValue, DiInputVariant } from './types'

import DiLoading from '../DiLoading.vue'
import { INPUT_SIZE_CLASSES } from './sizes'
import { INPUT_VARIANT_CLASSES } from './variants'

type Props = {
  id?: string
  type?: DiInputType
  size?: DiInputSize
  variant?: DiInputVariant
  label?: string
  helperText?: string
  error?: string
  success?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  loading?: boolean
  required?: boolean
}

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  size: 'md',
  variant: 'primary',
  disabled: false,
  readonly: false,
  loading: false,
  required: false,
})

defineSlots<{
  prefix?: () => unknown
  suffix?: () => unknown
}>()

const model = defineModel<DiInputValue>({ default: '' })
const attrs = useAttrs()
const generatedId = useId().split(':').join('')

const controlId = computed(() => props.id || `di-input-${generatedId}`)
const messageId = computed(() => `${controlId.value}-message`)
const sizeClasses = computed(() => INPUT_SIZE_CLASSES[props.size])
const validationState = computed<'error' | 'success' | null>(() => {
  if (props.error)
    return 'error'
  if (props.success)
    return 'success'
  return null
})
const message = computed(() => props.error || props.success || props.helperText)
const describedBy = computed(() => {
  const ids = [attrs['aria-describedby'], message.value ? messageId.value : undefined]
  return ids.filter(Boolean).join(' ') || undefined
})

const rootClasses = computed(() => ['w-full', attrs.class])
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
const controlClasses = computed(() => [
  'input w-full max-w-none bg-base-100 border-base-300 focus-within:border-base-content/30 focus-within:outline-none focus-within:ring-2',
  sizeClasses.value.control,
  sizeClasses.value.icon,
  validationState.value === 'error'
    ? 'input-error focus-within:ring-error/25'
    : validationState.value === 'success'
      ? 'input-success focus-within:ring-success/25'
      : INPUT_VARIANT_CLASSES[props.variant],
])
const nativeInputClasses = computed(() => [
  'min-w-0 grow bg-transparent outline-none placeholder:text-base-content/40 disabled:cursor-not-allowed',
  sizeClasses.value.content,
])
const messageClasses = computed(() => [
  'mt-1.5 block text-xs',
  validationState.value === 'error'
    ? 'text-error'
    : validationState.value === 'success'
      ? 'text-success'
      : 'text-base-content/60',
])
const ariaInvalid = computed(() => {
  if (props.error)
    return 'true'

  const externalValue = attrs['aria-invalid']
  if (externalValue === true || externalValue === 'true')
    return 'true'
  if (externalValue === false || externalValue === 'false')
    return 'false'
  if (externalValue === 'grammar' || externalValue === 'spelling')
    return externalValue
  return undefined
})

function onInput(event: Event) {
  const input = event.target as HTMLInputElement

  if (props.disabled || props.readonly) {
    input.value = String(model.value ?? '')
    return
  }

  if (props.type === 'number') {
    model.value
      = input.value === '' || Number.isNaN(input.valueAsNumber) ? null : input.valueAsNumber
    return
  }

  model.value = input.value
}
</script>

<template>
  <div :class="rootClasses" :style="rootStyle">
    <label v-if="label" :for="controlId" class="mb-1.5 block text-sm font-medium text-base-content">
      {{ label }}
      <span v-if="required" class="text-error" aria-hidden="true">*</span>
    </label>

    <div :class="controlClasses">
      <span v-if="$slots.prefix" class="shrink-0 text-base-content/55">
        <slot name="prefix" />
      </span>

      <input
        :id="controlId"
        v-bind="inputAttrs"
        :type="type"
        :value="model ?? ''"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :class="nativeInputClasses"
        :aria-describedby="describedBy"
        :aria-invalid="ariaInvalid"
        :aria-busy="loading || undefined"
        @input="onInput"
      >

      <span v-if="$slots.suffix" class="shrink-0 text-base-content/55">
        <slot name="suffix" />
      </span>
      <DiLoading
        v-if="loading"
        class="shrink-0"
        :size="sizeClasses.loading"
        :color="variant"
        aria-hidden="true"
      />
    </div>

    <span
      v-if="message"
      :id="messageId"
      :class="messageClasses"
      :role="validationState === 'error' ? 'alert' : undefined"
    >
      {{ message }}
    </span>
  </div>
</template>
