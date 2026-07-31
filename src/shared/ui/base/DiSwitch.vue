<script setup lang="ts">
import type { StyleValue } from 'vue'

import { computed, onMounted, ref, useAttrs, useId, watch } from 'vue'

import type { Size, Variant } from '@/shared/types/models'

type LabelPosition = 'start' | 'end'

type Props = {
  variant?: Variant
  size?: Size
  disabled?: boolean
  readOnly?: boolean
  invalid?: boolean
  indeterminate?: boolean
  label?: string
  labelPosition?: LabelPosition
}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  readOnly: false,
  invalid: false,
  indeterminate: false,
  labelPosition: 'start',
})

const emit = defineEmits<{
  change: [value: boolean]
}>()

const slots = defineSlots<{
  'default'?: () => unknown
  'unchecked-icon'?: () => unknown
  'checked-icon'?: () => unknown
}>()

const model = defineModel<boolean>({ default: false })

const SIZE_CLASSES: Record<Size, string> = {
  xs: 'toggle-xs',
  sm: 'toggle-sm',
  md: 'toggle-md',
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

const attrs = useAttrs()
const generatedId = useId()
const input = ref<HTMLInputElement>()

const controlId = computed(() => (typeof attrs.id === 'string' ? attrs.id : generatedId))
const hasLabel = computed(() => Boolean(props.label) || Boolean(slots.default))
const hasIcons = computed(() => Boolean(slots['unchecked-icon']) && Boolean(slots['checked-icon']))
const isUnavailable = computed(() => props.disabled || props.readOnly)

const wrapperClasses = computed(() => [
  'inline-flex items-center gap-2',
  props.labelPosition === 'end' && 'flex-row-reverse',
  isUnavailable.value ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
])

const toggleClasses = computed(() => [
  'toggle',
  VARIANT_CLASSES[props.variant],
  SIZE_CLASSES[props.size],
])

const iconToggleClasses = computed(() => [toggleClasses.value, attrs.class])
const iconToggleStyle = computed(() => attrs.style as StyleValue)
const iconInputAttrs = computed(() => {
  const { class: _class, style: _style, ...inputAttrs } = attrs
  return inputAttrs
})

function syncIndeterminate() {
  if (input.value)
    input.value.indeterminate = props.indeterminate
}

function onClick(event: MouseEvent) {
  if (props.readOnly)
    event.preventDefault()
}

function onChange(event: Event) {
  const target = event.target as HTMLInputElement

  if (props.readOnly) {
    target.checked = model.value
    return
  }

  model.value = target.checked
  emit('change', target.checked)
}

watch(() => props.indeterminate, syncIndeterminate)
onMounted(syncIndeterminate)
</script>

<template>
  <span v-if="hasLabel || hasIcons" :class="wrapperClasses">
    <label v-if="hasLabel" :for="controlId" class="label-text select-none cursor-inherit">
      <slot>{{ label }}</slot>
    </label>

    <label v-if="hasIcons" :class="iconToggleClasses" :style="iconToggleStyle">
      <input
        :id="controlId"
        ref="input"
        v-bind="iconInputAttrs"
        type="checkbox"
        :checked="model"
        :disabled="disabled"
        :aria-invalid="invalid || undefined"
        :aria-readonly="readOnly || undefined"
        @click="onClick"
        @change="onChange"
      >
      <slot name="unchecked-icon" />
      <slot name="checked-icon" />
    </label>

    <input
      v-else
      :id="controlId"
      ref="input"
      v-bind="$attrs"
      type="checkbox"
      :class="toggleClasses"
      :checked="model"
      :disabled="disabled"
      :aria-invalid="invalid || undefined"
      :aria-readonly="readOnly || undefined"
      @click="onClick"
      @change="onChange"
    >
  </span>

  <input
    v-else
    :id="controlId"
    ref="input"
    v-bind="$attrs"
    type="checkbox"
    :class="toggleClasses"
    :checked="model"
    :disabled="disabled"
    :aria-invalid="invalid || undefined"
    :aria-readonly="readOnly || undefined"
    @click="onClick"
    @change="onChange"
  >
</template>
