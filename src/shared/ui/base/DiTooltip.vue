<script setup lang="ts">
import { computed } from 'vue'

import type { Variant } from '@/shared/types/models'

/* =======================
   Types
======================= */
type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'

type Props = {
  text: string
  position?: TooltipPosition
  variant?: Variant

  open?: boolean

  tag?: 'span' | 'div' | 'button'
  customClass?: string
}

/* =======================
   Defaults
======================= */
const props = withDefaults(defineProps<Props>(), {
  position: 'top',
  variant: 'neutral',
  tag: 'span',
  open: false,
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
const POSITION_CLASSES: Record<TooltipPosition, string> = {
  top: 'tooltip-top',
  bottom: 'tooltip-bottom',
  left: 'tooltip-left',
  right: 'tooltip-right',
}

const VARIANT_CLASSES: Record<Variant, string> = {
  neutral: '',
  primary: 'tooltip-primary',
  secondary: 'tooltip-secondary',
  accent: 'tooltip-accent',
  info: 'tooltip-info',
  success: 'tooltip-success',
  warning: 'tooltip-warning',
  error: 'tooltip-error',
}

/* =======================
   Computed classes
======================= */
const tooltipClasses = computed(() => [
  'tooltip',

  POSITION_CLASSES[props.position],
  VARIANT_CLASSES[props.variant],

  props.open && 'tooltip-open',

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
  <component :is="tag" :class="tooltipClasses" :data-tip="text" @click="handleClick">
    <slot />
  </component>
</template>

<style scoped>
/* Optional: Add any custom styling here if needed */
</style>
