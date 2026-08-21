<script setup lang="ts">
import type { StyleValue } from 'vue'

import { computed, onMounted, ref, useAttrs, useId, watch } from 'vue'

import type { DiCheckboxLabelPosition, DiCheckboxSize, DiCheckboxVariant } from './types'

import { CHECKBOX_SIZE_CLASSES } from './sizes'
import { CHECKBOX_VARIANT_CLASSES } from './variants'

type Props = {
  id?: string
  label?: string
  labelPosition?: DiCheckboxLabelPosition
  disabled?: boolean
  required?: boolean
  invalid?: boolean
  indeterminate?: boolean
  size?: DiCheckboxSize
  variant?: DiCheckboxVariant
  name?: string
  value?: string | number
  helperText?: string
  error?: string
  appearance?: 'default' | 'icon'
}

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<Props>(), {
  labelPosition: 'end',
  disabled: false,
  required: false,
  invalid: false,
  indeterminate: false,
  size: 'md',
  variant: 'primary',
  appearance: 'default',
})

const emit = defineEmits<{
  change: [checked: boolean, event: Event]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const slots = defineSlots<{
  'label'?: () => unknown
  'helper'?: () => unknown
  'error'?: () => unknown
  'icon'?: (props: { checked: boolean, disabled: boolean }) => unknown
  'checked-icon'?: (props: { checked: boolean, disabled: boolean }) => unknown
}>()

const model = defineModel<boolean>({ default: false })
const attrs = useAttrs()
const generatedId = useId().split(':').join('')
const input = ref<HTMLInputElement | null>(null)

const controlId = computed(() => props.id || `di-checkbox-${generatedId}`)
const helperId = computed(() => `${controlId.value}-helper`)
const errorId = computed(() => `${controlId.value}-error`)
const hasLabel = computed(() => Boolean(props.label || slots.label))
const hasHelper = computed(() => Boolean(props.helperText || slots.helper))
const hasError = computed(() => Boolean(props.error || slots.error))
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
  'checkbox shrink-0',
  CHECKBOX_SIZE_CLASSES[props.size],
  hasError.value || props.invalid ? 'checkbox-error' : CHECKBOX_VARIANT_CLASSES[props.variant],
  attrs.class,
])
const labelClasses = computed(() => [
  'min-w-0 select-none text-start text-sm font-medium text-base-content',
  props.disabled ? 'cursor-not-allowed' : 'cursor-pointer',
])
const ICON_VARIANT_CLASSES: Record<DiCheckboxVariant, string> = {
  neutral: 'peer-checked:text-neutral peer-checked:bg-neutral/10',
  primary: 'peer-checked:text-primary peer-checked:bg-primary/10',
  secondary: 'peer-checked:text-secondary peer-checked:bg-secondary/10',
  accent: 'peer-checked:text-accent peer-checked:bg-accent/10',
  info: 'peer-checked:text-info peer-checked:bg-info/10',
  success: 'peer-checked:text-success peer-checked:bg-success/10',
  warning: 'peer-checked:text-warning peer-checked:bg-warning/10',
  error: 'peer-checked:text-error peer-checked:bg-error/10',
}
const iconLabelClasses = computed(() => [
  'inline-grid size-9 place-items-center rounded-full text-base-content/45 transition-colors',
  ICON_VARIANT_CLASSES[props.variant],
  'peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2',
  props.disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer hover:bg-base-200',
])

function syncIndeterminate() {
  if (input.value)
    input.value.indeterminate = props.indeterminate
}

function onChange(event: Event) {
  const target = event.target as HTMLInputElement
  model.value = target.checked
  emit('change', target.checked, event)
}

watch(() => props.indeterminate, syncIndeterminate)
onMounted(syncIndeterminate)
</script>

<template>
  <span v-if="appearance === 'icon'" :class="rootClasses" :style="rootStyle">
    <span class="inline-flex items-center gap-2">
      <input
        :id="controlId"
        ref="input"
        v-bind="inputAttrs"
        type="checkbox"
        :name="name"
        :value="value"
        :checked="model"
        :disabled="disabled"
        :required="required"
        class="peer sr-only"
        :aria-describedby="describedBy"
        :aria-invalid="hasError || invalid || undefined"
        @blur="emit('blur', $event)"
        @change="onChange"
        @focus="emit('focus', $event)"
      >
      <label :for="controlId" :class="iconLabelClasses">
        <span v-if="!model">
          <slot name="icon" :checked="model" :disabled="disabled" />
        </span>
        <span v-else class="inline-flex">
          <slot name="checked-icon" :checked="model" :disabled="disabled">
            <slot name="icon" :checked="model" :disabled="disabled" />
          </slot>
        </span>
        <span v-if="label" class="sr-only">{{ label }}</span>
      </label>
    </span>
  </span>

  <span v-else :class="rootClasses" :style="rootStyle">
    <span :class="contentClasses">
      <input
        :id="controlId"
        ref="input"
        v-bind="inputAttrs"
        type="checkbox"
        :name="name"
        :value="value"
        :checked="model"
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
