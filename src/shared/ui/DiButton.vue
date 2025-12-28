<script setup lang="ts">
import { computed } from 'vue'

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
    | 'link'

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type Props = {
  variant?: Variant
  size?: Size

  active?: boolean
  disabled?: boolean
  loading?: boolean

  outline?: boolean
  dash?: boolean
  soft?: boolean
  wide?: boolean
  block?: boolean
  circle?: boolean
  square?: boolean
  glass?: boolean
  rounded?: boolean

  tag?: 'button' | 'a' | 'input'
  nativeType?: 'button' | 'submit' | 'reset'

  customClass?: string
}

/* =======================
   Defaults
======================= */
const props = withDefaults(defineProps<Props>(), {
  variant: 'neutral',
  size: 'md',
  tag: 'button',
  nativeType: 'button',
  active: false,
  disabled: false,
  loading: false,
  outline: false,
  dash: false,
  soft: false,
  wide: false,
  block: false,
  circle: false,
  square: false,
  glass: false,
  rounded: false,
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
  neutral: 'btn-neutral',
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
  info: 'btn-info',
  success: 'btn-success',
  warning: 'btn-warning',
  error: 'btn-error',
  ghost: 'btn-ghost',
  link: 'btn-link',
}

const SIZE_CLASSES: Record<Size, string> = {
  xs: 'btn-xs',
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg',
  xl: 'btn-xl',
}

/* =======================
   Computed classes
======================= */
const buttonClasses = computed(() => [
  'btn',

  VARIANT_CLASSES[props.variant],
  SIZE_CLASSES[props.size],

  props.active && 'btn-active',
  props.disabled && 'btn-disabled',

  props.outline && 'btn-outline',
  props.dash && 'btn-dash',
  props.soft && 'btn-soft',
  props.wide && 'btn-wide',
  props.block && 'btn-block',
  props.circle && 'btn-circle',
  props.square && 'btn-square',
  props.glass && 'glass',
  props.rounded && 'rounded-full',

  props.customClass,
])

/* =======================
   Methods
======================= */
function handleClick(event: MouseEvent) {
  if (props.disabled || props.loading)
    return

  emit('click', event)
}
</script>

<template>
  <component
    :is="tag"
    :type="nativeType"
    :disabled="disabled || loading"
    :class="buttonClasses"
    @click="handleClick"
  >
    <span v-if="loading" class="loading loading-spinner" />
    <slot name="icon-left" />
    <slot />
    <slot name="icon-right" />
  </component>
</template>
