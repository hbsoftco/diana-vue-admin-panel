<script setup lang="ts">
import { computed } from 'vue'

type Props = {
  // Button variants
  variant?:
    | 'neutral'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'ghost'
    | 'link'

  // Button sizes
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  // Button states
  active?: boolean
  disabled?: boolean
  loading?: boolean

  // Button styles
  outline?: boolean
  dash?: boolean
  soft?: boolean
  wide?: boolean
  block?: boolean
  circle?: boolean
  square?: boolean
  glass?: boolean
  rounded?: boolean

  // HTML attributes
  tag?: 'button' | 'a' | 'input'
  nativeType?: 'button' | 'submit' | 'reset'

  // Custom classes
  customClass?: string
}

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

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClasses = computed(() => {
  const classes = ['btn']

  // Variant classes
  if (props.variant && props.variant !== 'neutral') {
    classes.push(`btn-${props.variant}`)
  }

  // Size classes
  if (props.size !== 'md') {
    classes.push(`btn-${props.size}`)
  }

  // State classes
  if (props.active)
    classes.push('btn-active')
  if (props.disabled)
    classes.push('btn-disabled')

  // Style classes
  if (props.outline)
    classes.push('btn-outline')
  if (props.dash)
    classes.push('btn-dash')
  if (props.soft)
    classes.push('btn-soft')
  if (props.wide)
    classes.push('btn-wide')
  if (props.block)
    classes.push('btn-block')
  if (props.circle)
    classes.push('btn-circle')
  if (props.square)
    classes.push('btn-square')
  if (props.glass)
    classes.push('glass')
  if (props.rounded)
    classes.push('rounded-full')

  // Custom classes
  if (props.customClass)
    classes.push(props.customClass)

  return classes.join(' ')
})

function handleClick(event: MouseEvent) {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
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

<style scoped>
/* Additional custom styles if needed */
</style>
