<script setup lang="ts">
import { computed } from 'vue'

/* =======================
   Types
======================= */
type Variant = 'spinner' | 'dots' | 'ring' | 'ball' | 'bars' | 'infinity'

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type Color
  = | 'primary'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'neutral'

type Props = {
  variant?: Variant
  size?: Size
  color?: Color
  customClass?: string
}

/* =======================
   Defaults
======================= */
const props = withDefaults(defineProps<Props>(), {
  variant: 'spinner',
  size: 'md',
})

/* =======================
   Static class maps
======================= */
const VARIANT_CLASSES: Record<Variant, string> = {
  spinner: 'loading-spinner',
  dots: 'loading-dots',
  ring: 'loading-ring',
  ball: 'loading-ball',
  bars: 'loading-bars',
  infinity: 'loading-infinity',
}

const SIZE_CLASSES: Record<Size, string> = {
  xs: 'loading-xs',
  sm: 'loading-sm',
  md: 'loading-md',
  lg: 'loading-lg',
  xl: 'loading-xl',
}

const COLOR_CLASSES: Record<Color, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  info: 'text-info',
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-error',
  neutral: 'text-neutral',
}

/* =======================
   Computed classes
======================= */
const loadingClasses = computed(() => [
  'loading',
  VARIANT_CLASSES[props.variant],
  SIZE_CLASSES[props.size],
  props.color && COLOR_CLASSES[props.color],
  props.customClass,
])
</script>

<template>
  <span :class="loadingClasses" />
</template>

<style scoped>
/* Optional: Add any custom styling here if needed */
</style>
