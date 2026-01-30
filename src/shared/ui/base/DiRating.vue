<script setup lang="ts">
import { computed, ref } from 'vue'

import { useDirection } from '@/shared/composables/use-direction'

/* =======================
   Types
======================= */
type RatingSize = 'xs' | 'sm' | 'md' | 'lg'

type RatingVariant
  = | 'default'
    | 'warning'
    | 'info'
    | 'success'
    | 'error'
    | 'accent'
    | 'primary'
    | 'secondary'

type MaskType = 'star' | 'heart' | 'star-2' | 'circle' | 'square'
type RatingSpacing = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type Props = {
  max?: number
  size?: RatingSize
  variant?: RatingVariant

  half?: boolean
  hidden?: boolean
  disabled?: boolean
  readOnly?: boolean

  mask?: MaskType
  spacing?: RatingSpacing

  customClass?: string
  name?: string
}

/* =======================
   Props
======================= */
const props = withDefaults(defineProps<Props>(), {
  max: 5,
  size: 'md',
  variant: 'warning',
  half: false,
  hidden: false,
  disabled: false,
  readOnly: false,
  mask: 'star',
})

/* =======================
   Emits (non v-model)
======================= */
const emit = defineEmits<{
  change: [value: number]
  hover: [value: number | null]
}>()

/* =======================
   v-model
======================= */
const model = defineModel<number>({ default: 0 })

/* =======================
   State
======================= */
const { isRtl } = useDirection()
const hoverValue = ref<number | null>(null)

/* =======================
   Static class maps
======================= */
const SIZE_CLASSES: Record<RatingSize, string> = {
  xs: 'rating-xs',
  sm: 'rating-sm',
  md: 'rating-md',
  lg: 'rating-lg',
}

const VARIANT_CLASSES: Record<RatingVariant, string> = {
  default: '',
  warning: 'text-warning',
  info: 'text-info',
  success: 'text-success',
  error: 'text-error',
  accent: 'text-accent',
  primary: 'text-primary',
  secondary: 'text-secondary',
}

const MASK_CLASSES: Record<MaskType, string> = {
  'star': 'mask-star-2',
  'heart': 'mask-heart',
  'star-2': 'mask-star',
  'circle': 'mask-circle',
  'square': 'mask-square',
}

const SPACING_CLASSES: Record<RatingSpacing, { ml: string, mr: string }> = {
  xs: { ml: 'ml-[1px]', mr: 'mr-[1px]' },
  sm: { ml: 'ml-0.5', mr: 'mr-0.5' },
  md: { ml: 'ml-1', mr: 'mr-1' },
  lg: { ml: 'ml-2', mr: 'mr-2' },
  xl: { ml: 'ml-4', mr: 'mr-4' },
}

/* =======================
   Computed
======================= */
const spacingClasses = computed(() => {
  if (!props.spacing)
    return { ml: '', mr: '' }
  return SPACING_CLASSES[props.spacing] ?? { ml: '', mr: '' }
})

const ratingClasses = computed(() => [
  'rating',
  SIZE_CLASSES[props.size],
  props.half && 'rating-half',
  props.customClass,
])

const itemClasses = computed(() => [
  'mask',
  MASK_CLASSES[props.mask],
  'bg-current',
  !props.disabled && !props.readOnly ? 'cursor-pointer' : 'cursor-default',
])

const colorClass = computed(() => VARIANT_CLASSES[props.variant])

const items = computed(() => {
  const result: number[] = []

  if (props.half) {
    for (let i = 1; i <= props.max; i++) {
      result.push(i - 0.5, i)
    }
  }
  else {
    for (let i = 1; i <= props.max; i++) {
      result.push(i)
    }
  }

  return result
})

const displayValue = computed(() => (hoverValue.value !== null ? hoverValue.value : model.value))

/* =======================
   Methods
======================= */
function handleClick(value: number) {
  if (props.disabled || props.readOnly)
    return
  model.value = value
  emit('change', value)
}

function handleMouseEnter(value: number) {
  if (props.disabled || props.readOnly)
    return
  hoverValue.value = value
  emit('hover', value)
}

function handleMouseLeave() {
  if (props.disabled || props.readOnly)
    return
  hoverValue.value = null
  emit('hover', null)
}

function isChecked(value: number) {
  return displayValue.value === value
}

function getInputId(value: number) {
  return props.name ? `${props.name}-${value}` : `rating-${value}`
}
</script>

<template>
  <div :class="ratingClasses">
    <!-- reset -->
    <input
      v-if="!hidden"
      type="radio"
      class="rating-hidden"
      :name="name"
      :checked="displayValue === 0"
      :disabled="disabled"
      @click="handleClick(0)"
    >

    <!-- Rating items -->
    <input
      v-for="item in items"
      :id="getInputId(item)"
      :key="item"
      type="radio"
      :name="name"
      :class="[
        itemClasses,
        colorClass,
        item % 1 !== 0 && 'mask-half-1',
        item % 1 === 0 && props.half && 'mask-half-2',
        item % 1 === 0 && (isRtl ? spacingClasses.ml : spacingClasses.mr),
        item % 1 !== 0 && props.half && (isRtl ? spacingClasses.mr : spacingClasses.ml),
        readOnly && 'pointer-events-none',
      ]"
      :checked="isChecked(item)"
      :disabled="disabled"
      :aria-label="`Rating ${item} out of ${max}`"
      @click="handleClick(item)"
      @mouseenter="handleMouseEnter(item)"
      @mouseleave="handleMouseLeave"
    >
  </div>
</template>

<style scoped>
.rating input:disabled {
  opacity: 0.5;
}
</style>
