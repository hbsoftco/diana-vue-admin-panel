<script setup lang="ts" generic="T extends DiRadioValue = DiRadioValue">
import { computed, useId } from 'vue'

import type {
  DiRadioOption,
  DiRadioOrientation,
  DiRadioSize,
  DiRadioValue,
  DiRadioVariant,
} from './types'

import DiRadio from './DiRadio.vue'

type Props = {
  options?: DiRadioOption<T>[]
  name?: string
  legend?: string
  ariaLabel?: string
  orientation?: DiRadioOrientation
  disabled?: boolean
  required?: boolean
  invalid?: boolean
  size?: DiRadioSize
  variant?: DiRadioVariant
  helperText?: string
  error?: string
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  orientation: 'vertical',
  disabled: false,
  required: false,
  invalid: false,
  size: 'md',
  variant: 'primary',
})

const emit = defineEmits<{
  change: [value: T, event: Event]
}>()

const slots = defineSlots<{
  legend?: () => unknown
  default?: () => unknown
  option?: (props: { option: DiRadioOption<T>, checked: boolean, disabled: boolean }) => unknown
  helper?: () => unknown
  error?: () => unknown
}>()

const model = defineModel<T | null>({ default: null })
const generatedId = useId().split(':').join('')
const resolvedName = computed(() => props.name || `di-radio-group-${generatedId}`)
const legendId = computed(() => `${resolvedName.value}-legend`)
const helperId = computed(() => `${resolvedName.value}-helper`)
const errorId = computed(() => `${resolvedName.value}-error`)
const hasLegend = computed(() => Boolean(props.legend || slots.legend))
const hasHelper = computed(() => Boolean(props.helperText || slots.helper))
const hasError = computed(() => Boolean(props.error || slots.error))
const describedBy = computed(() => {
  const ids = [
    hasHelper.value ? helperId.value : undefined,
    hasError.value ? errorId.value : undefined,
  ]
  return ids.filter(Boolean).join(' ') || undefined
})
const optionsClasses = computed(() => [
  'flex flex-wrap gap-3',
  props.orientation === 'vertical' ? 'flex-col items-start' : 'flex-row items-center',
])

function onChange(value: T, event: Event) {
  model.value = value
  emit('change', value, event)
}
</script>

<template>
  <fieldset
    class="min-w-0"
    :disabled="disabled"
    :aria-label="!hasLegend ? ariaLabel : undefined"
    :aria-labelledby="hasLegend ? legendId : undefined"
    :aria-describedby="describedBy"
    :aria-invalid="hasError || invalid || undefined"
  >
    <legend v-if="hasLegend" :id="legendId" class="mb-2 text-sm font-semibold text-base-content">
      <slot name="legend">
        {{ legend }}
      </slot>
      <span v-if="required" class="text-error" aria-hidden="true">*</span>
    </legend>

    <div :class="optionsClasses">
      <slot>
        <DiRadio
          v-for="option in options"
          :key="String(option.value)"
          :model-value="model"
          :value="option.value"
          :name="resolvedName"
          :label="option.label"
          :helper-text="option.helperText"
          :disabled="disabled || option.disabled"
          :required="required"
          :invalid="invalid || hasError"
          :size="size"
          :variant="variant"
          @change="onChange"
        >
          <template v-if="$slots.option" #label>
            <slot
              name="option"
              :option="option"
              :checked="Object.is(model, option.value)"
              :disabled="disabled || Boolean(option.disabled)"
            />
          </template>
        </DiRadio>
      </slot>
    </div>

    <p v-if="hasHelper" :id="helperId" class="mt-2 text-xs text-base-content/60">
      <slot name="helper">
        {{ helperText }}
      </slot>
    </p>
    <p v-if="hasError" :id="errorId" class="mt-2 text-xs text-error" role="alert">
      <slot name="error">
        {{ error }}
      </slot>
    </p>
  </fieldset>
</template>
