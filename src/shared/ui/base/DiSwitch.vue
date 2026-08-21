<script setup lang="ts">
import type { StyleValue } from 'vue'

import { computed, onMounted, ref, useAttrs, useId, watch } from 'vue'

import type { Size, Variant } from '@/shared/types/models'

type LabelPosition = 'start' | 'end'
type SwitchAppearance = 'default' | 'minimal' | 'labeled'

type Props = {
  variant?: Variant
  size?: Size
  disabled?: boolean
  readOnly?: boolean
  invalid?: boolean
  indeterminate?: boolean
  label?: string
  labelPosition?: LabelPosition
  appearance?: SwitchAppearance
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
  appearance: 'default',
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
const hasVisibleLabel = computed(() => hasLabel.value && props.appearance !== 'minimal')
const hasIcons = computed(() => Boolean(slots['unchecked-icon']) && Boolean(slots['checked-icon']))
const isUnavailable = computed(() => props.disabled || props.readOnly)

const wrapperClasses = computed(() => [
  'inline-flex items-center gap-2',
  props.appearance === 'labeled' && 'di-switch-labeled',
  isUnavailable.value ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
])
const labelClasses = computed(() => [
  'label-text select-none cursor-inherit',
  props.labelPosition === 'end' ? 'order-2' : 'order-1',
])
const controlClasses = computed(() => (props.labelPosition === 'end' ? 'order-1' : 'order-2'))

const toggleClasses = computed(() => [
  'toggle',
  VARIANT_CLASSES[props.variant],
  SIZE_CLASSES[props.size],
  props.appearance === 'minimal' && 'di-switch-minimal rounded-full',
  props.appearance === 'labeled' && 'di-switch-labeled-control',
])

const accessibleLabel = computed<string | undefined>(() => {
  if (
    props.appearance === 'minimal'
    && props.label
    && attrs['aria-label'] === undefined
    && attrs['aria-labelledby'] === undefined
  ) {
    return props.label
  }

  return typeof attrs['aria-label'] === 'string' ? attrs['aria-label'] : undefined
})

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
  <span v-if="hasVisibleLabel || hasIcons" :class="wrapperClasses">
    <label v-if="hasVisibleLabel" :for="controlId" :class="labelClasses">
      <slot>{{ label }}</slot>
    </label>

    <label v-if="hasIcons" :class="[iconToggleClasses, controlClasses]" :style="iconToggleStyle">
      <input
        :id="controlId"
        ref="input"
        v-bind="iconInputAttrs"
        type="checkbox"
        role="switch"
        :checked="model"
        :disabled="disabled"
        :aria-invalid="invalid || undefined"
        :aria-readonly="readOnly || undefined"
        :aria-label="accessibleLabel"
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
      role="switch"
      :class="[toggleClasses, controlClasses]"
      :checked="model"
      :disabled="disabled"
      :aria-invalid="invalid || undefined"
      :aria-readonly="readOnly || undefined"
      :aria-label="accessibleLabel"
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
    role="switch"
    :class="toggleClasses"
    :checked="model"
    :disabled="disabled"
    :aria-invalid="invalid || undefined"
    :aria-readonly="readOnly || undefined"
    :aria-label="accessibleLabel"
    @click="onClick"
    @change="onChange"
  >
</template>

<style scoped>
.di-switch-minimal {
  aspect-ratio: 1;
  width: var(--size);
  border-radius: 9999px;
  padding: calc(var(--toggle-p) * 1.25);
  grid-template-columns: 1fr;
  transition:
    color 0.2s,
    background-color 0.2s,
    box-shadow 0.2s;
}

.di-switch-minimal::before {
  grid-column: 1;
  border-radius: 9999px;
  transition:
    background-color 0.2s,
    scale 0.2s;
}

.di-switch-minimal:checked {
  grid-template-columns: 1fr;
  box-shadow: 0 0 0 0.2rem color-mix(in oklab, currentColor 18%, transparent);
}

.di-switch-minimal:checked::before {
  grid-column: 1;
  scale: 0.45;
  background-color: var(--color-base-100);
}

@media (prefers-reduced-motion: reduce) {
  .di-switch-minimal,
  .di-switch-minimal::before {
    transition: none;
  }
}
</style>
