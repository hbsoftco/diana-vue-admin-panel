<script setup lang="ts">
import { computed } from 'vue'

import type { Size, Variant } from '@/shared/types/models'

type Props = {
  value?: number
  max?: number
  variant?: Variant
  size?: Size
}

const props = withDefaults(defineProps<Props>(), {
  max: 100,
  variant: 'neutral',
  size: 'md',
})

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

const SIZE_CLASSES: Record<Size, string> = {
  xs: 'h-1',
  sm: 'h-1.5',
  md: 'h-2',
  lg: 'h-3',
  xl: 'h-4',
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

const progressClasses = computed(() => [
  'progress',
  VARIANT_CLASSES[props.variant],
  SIZE_CLASSES[props.size],
])
</script>

<template>
  <progress :class="progressClasses" :value="normalizedValue" :max="normalizedMax" />
</template>
