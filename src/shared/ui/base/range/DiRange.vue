<script setup lang="ts">
import type { StyleValue } from 'vue'

import { computed, useAttrs, useId } from 'vue'

import type {
  DiRangeOrientation,
  DiRangeSize,
  DiRangeThumbShape,
  DiRangeTick,
  DiRangeVariant,
} from './types'

import { RANGE_SIZE_CLASSES } from './sizes'
import { RANGE_VARIANT_CLASSES } from './variants'

type Props = {
  id?: string
  min?: number
  max?: number
  step?: number
  size?: DiRangeSize
  variant?: DiRangeVariant
  disabled?: boolean
  readonly?: boolean
  label?: string
  helperText?: string
  error?: string
  success?: string
  showValue?: boolean
  showTicks?: boolean
  showTooltip?: boolean
  ticks?: DiRangeTick[]
  ticksClickable?: boolean
  thumbShape?: DiRangeThumbShape
  formatValue?: (value: number) => string
  orientation?: DiRangeOrientation
}

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 100,
  step: 1,
  size: 'md',
  variant: 'primary',
  disabled: false,
  readonly: false,
  showValue: false,
  showTicks: false,
  showTooltip: false,
  ticksClickable: false,
  thumbShape: 'rounded',
  orientation: 'horizontal',
})

const model = defineModel<number>({ default: 0 })
const attrs = useAttrs()
const generatedId = useId().split(':').join('')

const RANGE_KEYS = new Set([
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'Home',
  'End',
  'PageUp',
  'PageDown',
])

const controlId = computed(() => props.id || `di-range-${generatedId}`)
const messageId = computed(() => `${controlId.value}-message`)
const sizeClasses = computed(() => RANGE_SIZE_CLASSES[props.size])
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

const rootClasses = computed(() => [
  props.orientation === 'vertical' ? 'w-auto' : 'w-full',
  attrs.class,
])
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
const rangeClasses = computed(() => [
  'range w-full max-w-none [--range-bg:var(--color-base-300)] transition-opacity',
  props.thumbShape === 'square' && 'di-range--square',
  props.orientation === 'vertical' && 'di-range--vertical',
  sizeClasses.value.control,
  RANGE_VARIANT_CLASSES[props.variant],
  props.readonly && 'cursor-default opacity-70',
])
const labelClasses = computed(() => [
  'flex items-center gap-3 font-medium text-base-content',
  props.label ? 'justify-between' : 'justify-end',
  sizeClasses.value.label,
])
const valueClasses = computed(() => [
  'badge badge-ghost shrink-0 tabular-nums',
  sizeClasses.value.value,
])
const messageClasses = computed(() => [
  'block',
  sizeClasses.value.message,
  validationState.value === 'error'
    ? 'text-error'
    : validationState.value === 'success'
      ? 'text-success'
      : 'text-base-content/60',
])

const displayValue = computed(() => props.formatValue?.(model.value) ?? String(model.value))
const valuePosition = computed(() => {
  if (props.max <= props.min)
    return 0

  return Math.min(100, Math.max(0, ((model.value - props.min) / (props.max - props.min)) * 100))
})
const tooltipStyle = computed(() =>
  props.orientation === 'vertical'
    ? { bottom: `${valuePosition.value}%`, insetInlineStart: '100%' }
    : { insetInlineStart: `${valuePosition.value}%` },
)
const tickValues = computed<DiRangeTick[]>(() => {
  if (props.ticks?.length) {
    return [...props.ticks]
      .filter(tick => tick.value >= props.min && tick.value <= props.max)
      .sort((a, b) => a.value - b.value)
  }

  if (!props.showTicks || props.max <= props.min)
    return []

  const intervalCount = props.step > 0 ? Math.floor((props.max - props.min) / props.step) : 0
  const tickCount = intervalCount > 0 && intervalCount <= 10 ? intervalCount + 1 : 5

  return Array.from({ length: tickCount }, (_, index) => {
    const ratio = tickCount === 1 ? 0 : index / (tickCount - 1)
    const value = Number((props.min + (props.max - props.min) * ratio).toFixed(6))
    return { value, label: String(value) }
  })
})

function selectTick(value: number) {
  if (!props.ticksClickable || props.disabled || props.readonly)
    return

  model.value = value
}

function onInput(event: Event) {
  const input = event.target as HTMLInputElement

  if (props.disabled || props.readonly) {
    input.value = String(model.value)
    return
  }

  model.value = input.valueAsNumber
}

function onKeydown(event: KeyboardEvent) {
  if (props.readonly && RANGE_KEYS.has(event.key))
    event.preventDefault()
}
</script>

<template>
  <div :class="rootClasses" :style="rootStyle">
    <div v-if="label || showValue" :class="labelClasses">
      <label v-if="label" :for="controlId">{{ label }}</label>
      <output v-if="showValue" :for="controlId" :class="valueClasses" aria-live="polite">
        {{ displayValue }}
      </output>
    </div>

    <div class="relative" :class="orientation === 'vertical' && 'inline-flex h-40'">
      <div
        v-if="showTooltip"
        class="pointer-events-none absolute z-10"
        :class="
          orientation === 'vertical' ? 'ms-1 translate-y-1/2' : 'bottom-full mb-1 -translate-x-1/2'
        "
        :style="tooltipStyle"
        aria-hidden="true"
      >
        <span class="badge badge-neutral badge-sm tabular-nums">{{ displayValue }}</span>
      </div>

      <input
        :id="controlId"
        v-bind="inputAttrs"
        type="range"
        :value="model"
        :min="min"
        :max="max"
        :step="step"
        :disabled="disabled"
        :class="rangeClasses"
        :aria-readonly="readonly || undefined"
        :aria-orientation="orientation"
        :aria-describedby="describedBy"
        :aria-invalid="ariaInvalid"
        @input="onInput"
        @keydown="onKeydown"
      >
    </div>

    <div
      v-if="tickValues.length && orientation === 'horizontal'"
      class="flex justify-between px-2 text-base-content/50 tabular-nums"
      :class="sizeClasses.ticks"
      :aria-hidden="ticksClickable ? undefined : 'true'"
    >
      <button
        v-for="tick in tickValues"
        :key="tick.value"
        type="button"
        class="flex flex-col items-center gap-0.5"
        :class="
          ticksClickable && !disabled && !readonly
            ? 'cursor-pointer hover:text-primary'
            : 'pointer-events-none'
        "
        :disabled="disabled"
        :tabindex="ticksClickable && !readonly ? 0 : -1"
        :aria-label="ticksClickable ? `Set value to ${tick.label ?? tick.value}` : undefined"
        @click="selectTick(tick.value)"
      >
        <span class="h-1.5 w-px bg-base-content/30" />
        <span>{{ tick.label ?? tick.value }}</span>
      </button>
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

<style scoped>
.di-range--square {
  --radius-selector: 0rem;
}

.di-range--vertical {
  direction: rtl;
  width: var(--range-thumb-size);
  height: 100%;
  writing-mode: vertical-lr;
}
</style>
