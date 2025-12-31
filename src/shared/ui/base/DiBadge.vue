<script setup lang="ts">
import { computed } from 'vue'

import type { Size } from '@/shared/types/models'

/* =======================
   Types
======================= */
type Variant
  = | 'neutral'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'ghost'

type Props = {
  variant?: Variant
  size?: Size

  outline?: boolean
  dash?: boolean
  soft?: boolean

  pill?: boolean

  tag?: 'span' | 'div'
  customClass?: string
}

/* =======================
   Defaults
======================= */
const props = withDefaults(defineProps<Props>(), {
  variant: 'neutral',
  size: 'md',
  tag: 'span',
  outline: false,
  dash: false,
  soft: false,
  pill: false,
})

/* =======================
   Emits
======================= */
const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

/* =======================
   Static class maps
======================= */
const VARIANT_CLASSES: Record<Variant, string> = {
  neutral: 'badge-neutral',
  primary: 'badge-primary',
  secondary: 'badge-secondary',
  accent: 'badge-accent',
  info: 'badge-info',
  success: 'badge-success',
  warning: 'badge-warning',
  error: 'badge-error',
  ghost: 'badge-ghost',
}

const SIZE_CLASSES: Record<Size, string> = {
  xs: 'badge-xs',
  sm: 'badge-sm',
  md: 'badge-md',
  lg: 'badge-lg',
  xl: 'badge-xl',
}

/* =======================
   Computed classes
======================= */
const badgeClasses = computed(() => [
  'badge',

  VARIANT_CLASSES[props.variant],
  SIZE_CLASSES[props.size],

  props.outline && 'badge-outline',
  props.dash && 'badge-dash',
  props.soft && 'badge-soft',

  props.pill && 'rounded-full',

  props.customClass,
])

/* =======================
   Methods
======================= */
function handleClick(event: MouseEvent) {
  emit('click', event)
}
</script>

<template>
  <component :is="tag" :class="badgeClasses" @click="handleClick">
    <slot name="icon-left" />
    <slot />
    <slot name="icon-right" />
  </component>
</template>

<style scoped>
/* Optional: Add any custom styling here if needed */
</style>
