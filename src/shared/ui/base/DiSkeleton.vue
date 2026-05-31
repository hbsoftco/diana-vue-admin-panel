<script setup lang="ts">
import { computed } from 'vue'

/* =======================
   Types
======================= */
type Shape = 'rectangle' | 'circle' | 'text'
type SkeletonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string
type SkeletonColor
  = | 'default'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'neutral'
    | string

type Props = {
  shape?: Shape
  size?: SkeletonSize
  color?: SkeletonColor
  width?: string
  height?: string
  rounded?: string
  text?: boolean
  customClass?: string
}

/* =======================
   Defaults
======================= */
const props = withDefaults(defineProps<Props>(), {
  shape: 'rectangle',
  size: '',
  color: 'default',
  width: '',
  height: '',
  rounded: '',
  text: false,
  customClass: '',
})

/* =======================
   Static class maps
======================= */
const SHAPE_CLASSES: Record<Shape, string> = {
  rectangle: '',
  circle: 'rounded-full',
  text: '',
}

const SIZE_CLASSES: Record<string, { width: string, height: string }> = {
  xs: { width: 'w-6', height: 'h-6' },
  sm: { width: 'w-10', height: 'h-10' },
  md: { width: 'w-16', height: 'h-16' },
  lg: { width: 'w-24', height: 'h-24' },
  xl: { width: 'w-32', height: 'h-32' },
}

const COLOR_CLASSES: Record<string, string> = {
  default: '',
  primary: 'bg-primary/25',
  secondary: 'bg-secondary/25',
  accent: 'bg-accent/25',
  info: 'bg-info/25',
  success: 'bg-success/25',
  warning: 'bg-warning/25',
  error: 'bg-error/25',
  neutral: 'bg-neutral/25',
}

const PREDEFINED_SIZES = ['xs', 'sm', 'md', 'lg', 'xl']

/* =======================
   Computed properties
======================= */
const isPredefinedSize = computed(() => !!props.size && PREDEFINED_SIZES.includes(props.size))

const isCustomSize = computed(() => !!props.size && !PREDEFINED_SIZES.includes(props.size))

const classes = computed(() => {
  const sizeClasses
    = isPredefinedSize.value && !props.width && !props.height
      ? [SIZE_CLASSES[props.size]?.width, SIZE_CLASSES[props.size]?.height]
      : []

  return [
    'skeleton',
    props.text ? 'skeleton-text' : '',
    SHAPE_CLASSES[props.shape],
    COLOR_CLASSES[props.color] ?? '',
    props.rounded && props.shape !== 'circle' ? props.rounded : '',
    ...sizeClasses,
    props.customClass,
  ]
})

const style = computed(() => {
  if (props.width || props.height) {
    return {
      ...(props.width ? { width: props.width } : {}),
      ...(props.height ? { height: props.height } : {}),
    }
  }

  if (isCustomSize.value) {
    return { width: props.size, height: props.size }
  }

  return {}
})
</script>

<template>
  <div v-if="!props.text" :class="classes" :style="style">
    <slot />
  </div>
  <span v-else :class="classes" :style="style">
    <slot />
  </span>
</template>
