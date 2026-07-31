<script setup lang="ts">
import { computed, useSlots } from 'vue'

import type { Size, Variant } from '@/shared/types/models'

type ProgressOrientation = 'horizontal' | 'vertical'
type ProgressPattern = 'solid' | 'striped' | 'dotted'
type ProgressLabelPosition = 'center' | 'end'

type Props = {
  value?: number
  max?: number
  variant?: Variant
  size?: Size
  orientation?: ProgressOrientation
  pattern?: ProgressPattern
  animated?: boolean
  showValue?: boolean
  labelPosition?: ProgressLabelPosition
  markers?: number[]
}

const props = withDefaults(defineProps<Props>(), {
  max: 100,
  variant: 'neutral',
  size: 'md',
  orientation: 'horizontal',
  pattern: 'solid',
  animated: false,
  showValue: false,
  labelPosition: 'center',
  markers: () => [],
})

defineSlots<{
  'value-label'?: (props: { value: number, max: number, percentage: number }) => unknown
}>()

const slots = useSlots()

const VARIANT_CLASSES: Record<Variant, string> = {
  neutral: 'progress-neutral',
  primary: 'progress-primary',
  secondary: 'progress-secondary',
  accent: 'progress-accent',
  info: 'progress-info',
  success: 'progress-success',
  warning: 'progress-warning',
  error: 'progress-error',
}

const FILL_CLASSES: Record<Variant, string> = {
  neutral: 'bg-neutral',
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  accent: 'bg-accent',
  info: 'bg-info',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
}

const TEXT_CLASSES: Record<Variant, string> = {
  neutral: 'text-neutral',
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  info: 'text-info',
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-error',
}

const SIZE_CLASSES: Record<Size, string> = {
  xs: 'h-1',
  sm: 'h-1.5',
  md: 'h-2',
  lg: 'h-3',
  xl: 'h-4',
}

const VERTICAL_SIZE_CLASSES: Record<Size, string> = {
  xs: 'w-1',
  sm: 'w-1.5',
  md: 'w-2',
  lg: 'w-3',
  xl: 'w-4',
}

const normalizedMax = computed(() =>
  Number.isFinite(props.max) && props.max > 0 ? props.max : 100,
)

const normalizedValue = computed(() => {
  if (props.value === undefined)
    return undefined

  if (!Number.isFinite(props.value))
    return 0

  return Math.min(Math.max(props.value, 0), normalizedMax.value)
})

const percentage = computed(() =>
  normalizedValue.value === undefined ? 0 : (normalizedValue.value / normalizedMax.value) * 100,
)

const normalizedMarkers = computed(() =>
  props.markers
    .filter(Number.isFinite)
    .map(value => Math.min(Math.max(value, 0), normalizedMax.value)),
)

const usesEnhancedLayout = computed(
  () =>
    props.orientation === 'vertical'
    || props.pattern !== 'solid'
    || props.animated
    || props.showValue
    || props.markers.length > 0
    || Boolean(slots['value-label']),
)

const progressClasses = computed(() => [
  'progress',
  VARIANT_CLASSES[props.variant],
  SIZE_CLASSES[props.size],
])

const trackClasses = computed(() => [
  'di-progress-track relative overflow-visible rounded-full bg-base-200',
  props.pattern === 'dotted' && [
    'di-progress-dotted',
    TEXT_CLASSES[props.variant],
    props.animated && 'di-progress-animated motion-reduce:animate-none',
  ],
  props.orientation === 'vertical'
    ? [VERTICAL_SIZE_CLASSES[props.size], 'h-full']
    : [SIZE_CLASSES[props.size], 'w-full'],
])

const fillClasses = computed(() => [
  'di-progress-fill absolute rounded-full transition-[width,height] duration-300 motion-reduce:transition-none',
  FILL_CLASSES[props.variant],
  props.pattern === 'striped' && 'di-progress-striped',
  props.pattern === 'striped'
  && props.animated
  && 'di-progress-animated motion-reduce:animate-none',
  props.orientation === 'vertical' ? 'inset-x-0 bottom-0' : 'inset-y-0 start-0',
])

const fillStyle = computed(() =>
  props.orientation === 'vertical'
    ? { height: `${percentage.value}%` }
    : { width: `${percentage.value}%` },
)

const ariaValueNow = computed(() => normalizedValue.value ?? undefined)
const displayValue = computed(() => Math.round(percentage.value))

function markerStyle(marker: number) {
  const position = `${(marker / normalizedMax.value) * 100}%`
  return props.orientation === 'vertical' ? { bottom: position } : { insetInlineStart: position }
}
</script>

<template>
  <progress v-if="!usesEnhancedLayout" :class="progressClasses" :value="normalizedValue" :max="normalizedMax" />

  <div v-else class="di-progress relative" :class="orientation === 'vertical' ? 'h-32' : 'w-full'" role="progressbar"
    :aria-valuemin="0" :aria-valuemax="normalizedMax" :aria-valuenow="ariaValueNow">
    <div :class="trackClasses">
      <div :class="fillClasses" :style="fillStyle" />

      <span v-for="(marker, index) in normalizedMarkers" :key="`${marker}-${index}`"
        class="di-progress-marker absolute z-10 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full rtl:translate-x-1/2"
        :class="[FILL_CLASSES[variant], orientation === 'vertical' ? 'start-1/2' : 'top-1/2']"
        :style="markerStyle(marker)" aria-hidden="true" />

      <span v-if="showValue || $slots['value-label']"
        class="di-progress-label absolute z-20 whitespace-nowrap text-xs font-semibold text-base-content" :class="[
          labelPosition === 'center'
          && 'start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2',
          labelPosition === 'end'
          && orientation === 'horizontal'
          && 'top-1/2 -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2',
          labelPosition === 'end'
          && orientation === 'vertical'
          && 'start-1/2 -translate-x-1/2 translate-y-1/2 rtl:translate-x-1/2',
        ]" :style="labelPosition === 'end' ? markerStyle(normalizedValue ?? 0) : undefined">
        <slot name="value-label" :value="normalizedValue ?? 0" :max="normalizedMax" :percentage="percentage">
          {{ displayValue }}%
        </slot>
      </span>
    </div>
  </div>
</template>

<style scoped>
.di-progress-striped {
  background-image: repeating-linear-gradient(135deg,
      rgb(255 255 255 / 0.3) 0,
      rgb(255 255 255 / 0.3) 0.45rem,
      transparent 0.45rem,
      transparent 0.9rem);
}

.di-progress-dotted {
  background-color: color-mix(in oklab, currentColor 15%, transparent);
  background-image: radial-gradient(circle, currentColor 1px, transparent 1.5px);
  background-size: 0.45rem 0.45rem;
}

.di-progress-animated {
  animation: di-progress-pattern 1s linear infinite;
}

@keyframes di-progress-pattern {
  to {
    background-position: 1.8rem 0;
  }
}
</style>
