<script setup lang="ts">
import { computed, useId } from 'vue'

import type { Size, Variant } from '@/shared/types/models'

defineOptions({
  inheritAttrs: false,
})

/* =======================
   Props
======================= */
const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  labelPosition: 'start',
})

/* =======================
   Emits (non v-model)
======================= */
const emit = defineEmits<{
  change: [value: boolean]
}>()

/* =======================
   Slots
======================= */
const slots = defineSlots<{
  default?: () => unknown
}>()

/* =======================
   Types
======================= */
type LabelPosition = 'start' | 'end'

type Props = {
  variant?: Variant
  size?: Size
  disabled?: boolean
  label?: string
  labelPosition?: LabelPosition
}

/* =======================
   v-model
======================= */
const model = defineModel<boolean>({ default: false })

/* =======================
   Static class maps
======================= */
const SIZE_CLASSES: Record<Size, string> = {
  xs: 'toggle-xs',
  sm: 'toggle-sm',
  md: '',
  lg: 'toggle-lg',
  xl: 'toggle-xl',
}

const VARIANT_CLASSES: Record<Variant, string> = {
  neutral: 'toggle-neutral',
  primary: 'toggle-primary',
  secondary: 'toggle-secondary',
  accent: 'toggle-accent',
  info: 'toggle-info',
  success: 'toggle-success',
  warning: 'toggle-warning',
  error: 'toggle-error',
}

/* =======================
   State
======================= */
const inputId = useId()

/* =======================
   Computed
======================= */
const hasLabel = computed(() => Boolean(props.label) || Boolean(slots.default))

const toggleClasses = computed(() => [
  'toggle',
  VARIANT_CLASSES[props.variant],
  SIZE_CLASSES[props.size],
])

/* =======================
   Methods
======================= */
function onChange(event: Event) {
  const next = (event.target as HTMLInputElement).checked
  model.value = next
  emit('change', next)
}
</script>

<template>
  <label
    v-if="hasLabel"
    :for="inputId"
    class="label inline-flex cursor-pointer items-center gap-2"
    :class="[
      { 'flex-row-reverse': labelPosition === 'end' },
      disabled && 'cursor-not-allowed opacity-60',
    ]"
  >
    <span class="label-text select-none">
      <slot>{{ label }}</slot>
    </span>

    <input
      :id="inputId"
      type="checkbox"
      :class="toggleClasses"
      :checked="model"
      :disabled="disabled"
      v-bind="$attrs"
      @change="onChange"
    >
  </label>

  <input
    v-else
    :id="inputId"
    type="checkbox"
    :class="toggleClasses"
    :checked="model"
    :disabled="disabled"
    v-bind="$attrs"
    @change="onChange"
  >
</template>
