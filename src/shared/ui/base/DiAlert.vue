<script setup lang="ts">
import { computed, ref } from 'vue'

import type { AlertVariant } from '@/shared/types/models'

/* =======================
   Types
======================= */
type Layout = 'horizontal' | 'vertical'

type Props = {
  variant?: AlertVariant
  layout?: Layout

  outline?: boolean
  dash?: boolean
  soft?: boolean

  closable?: boolean
  modelValue?: boolean
  showIcon?: boolean

  title?: string
  description?: string

  customClass?: string
}

/* =======================
   Defaults
======================= */
const props = withDefaults(defineProps<Props>(), {
  layout: 'horizontal',
  outline: false,
  dash: false,
  soft: false,
  closable: false,
  modelValue: true,
  icon: false,
})

/* =======================
   Emits
======================= */
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'close': []
}>()

/* =======================
   Slots
======================= */
const slots = defineSlots<{
  default?: () => any
  icon?: () => any
  actions?: () => any
}>()

/* =======================
   State
======================= */
const isVisible = ref(props.modelValue)

/* =======================
   Static class maps
======================= */
const VARIANT_CLASSES: Record<AlertVariant, string> = {
  info: 'alert-info',
  success: 'alert-success',
  warning: 'alert-warning',
  error: 'alert-error',
}

const LAYOUT_CLASSES: Record<Layout, string> = {
  horizontal: 'alert-horizontal',
  vertical: 'alert-vertical',
}

/* =======================
   Computed properties
======================= */
const alertClasses = computed(() => [
  'alert',

  props.variant && VARIANT_CLASSES[props.variant],
  LAYOUT_CLASSES[props.layout],

  props.outline && 'alert-outline',
  props.dash && 'alert-dash',
  props.soft && 'alert-soft',

  props.customClass,
])

const shouldShowIcon = computed(() => {
  return props.variant && props.showIcon && !slots.icon
})

/* =======================
   Methods
======================= */
function handleClose() {
  isVisible.value = false
  emit('update:modelValue', false)
  emit('close')
}
</script>

<template>
  <div v-if="isVisible" role="alert" :class="alertClasses">
    <!-- Default Icons based on variant -->
    <i-heroicons-information-circle
      v-if="shouldShowIcon && variant === 'info'"
      class="h-6 w-6 shrink-0"
    />
    <i-heroicons-check-circle
      v-if="shouldShowIcon && variant === 'success'"
      class="h-6 w-6 shrink-0"
    />
    <i-heroicons-exclamation-triangle
      v-if="shouldShowIcon && variant === 'warning'"
      class="h-6 w-6 shrink-0"
    />
    <i-heroicons-x-circle v-if="shouldShowIcon && variant === 'error'" class="h-6 w-6 shrink-0" />

    <!-- Icon Slot (custom icon) -->
    <slot name="icon" />

    <!-- Content -->
    <div v-if="title || description" class="flex-1">
      <h3 v-if="title" class="font-bold">
        {{ title }}
      </h3>
      <div v-if="description" class="text-xs">
        {{ description }}
      </div>
      <slot />
    </div>
    <span v-else class="flex-1">
      <slot />
    </span>

    <!-- Actions Slot -->
    <div v-if="slots.actions">
      <slot name="actions" />
    </div>

    <!-- Close Button -->
    <span v-if="closable" class="cursor-pointer" circle @click="handleClose">
      <i-material-symbols-light-close class="text-xl" />
    </span>
  </div>
</template>
