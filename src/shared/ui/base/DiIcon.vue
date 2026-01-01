<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'

import type { IconName } from '@/shared/icons/registry'
import type { BadgeVariant, Size } from '@/shared/types/models'

import { iconRegistry } from '@/shared/icons/registry'
import DiBadge from '@/shared/ui/base/DiBadge.vue'

/* =======================
   Types
======================= */
type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string
type IconColor = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'muted' | string

type Props = {
  name: IconName
  size?: IconSize
  color?: IconColor
  rotate?: number
  flip?: boolean
  customClass?: string
  spin?: boolean
  pulse?: boolean
  title?: string
  badge?: number | boolean | string
  badgeVariant?: BadgeVariant
  badgeSize?: Size
  badgeOutline?: boolean
  badgeDash?: boolean
  badgeSoft?: boolean
  badgePill?: boolean
}

/* =======================
   Defaults
======================= */
const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'default',
  rotate: 0,
  flip: false,
  customClass: '',
  spin: false,
  pulse: false,
  title: '',
  badge: false,
  badgeVariant: 'primary',
  badgeSize: 'xs',
  badgeOutline: false,
  badgeDash: false,
  badgeSoft: false,
  badgePill: false,
})

/* =======================
   Dynamic Icon Component
======================= */
const IconComponent = computed(() => defineAsyncComponent(iconRegistry[props.name]))

/* =======================
   Static class maps
======================= */
const SIZE_CLASSES: Record<string, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
}

const COLOR_CLASSES: Record<string, string> = {
  default: 'text-current',
  muted: 'text-gray-400',
  primary: 'text-primary',
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-error',
}

/* =======================
   Computed properties
======================= */
const classes = computed(() => {
  return [
    'di-icon',
    SIZE_CLASSES[props.size as string] ?? '',
    COLOR_CLASSES[props.color as string] ?? '',
    props.spin ? 'animate-spin' : '',
    props.pulse ? 'animate-pulse' : '',
    props.customClass,
  ]
})

const style = computed(() => {
  const transforms: string[] = []

  if (props.rotate)
    transforms.push(`rotate(${props.rotate}deg)`)
  if (props.flip)
    transforms.push('scaleX(-1)')

  const predefinedSizes = ['xs', 'sm', 'md', 'lg', 'xl']
  const predefinedColors = ['default', 'muted', 'primary', 'success', 'warning', 'error']

  const isCustomSize = typeof props.size === 'string' && !predefinedSizes.includes(props.size)
  const isCustomColor = typeof props.color === 'string' && !predefinedColors.includes(props.color)

  return {
    transform: transforms.join(' '),
    ...(isCustomSize ? { fontSize: props.size } : {}),
    ...(isCustomColor ? { color: props.color } : {}),
  }
})

// Fallback size classes for predefined sizes
const fallbackSizeClass = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'w-4 h-4'
    case 'sm':
      return 'w-5 h-5'
    case 'md':
      return 'w-6 h-6'
    case 'lg':
      return 'w-7 h-7'
    case 'xl':
      return 'w-8 h-8'
    default:
      return ''
  }
})

// Custom style for non-predefined sizes (e.g., '24px')
const fallbackCustomStyle = computed(() => {
  if (typeof props.size === 'string' && !['xs', 'sm', 'md', 'lg', 'xl'].includes(props.size)) {
    return { width: props.size, height: props.size }
  }
  return {}
})
</script>

<template>
  <div class="relative inline-block" :title="props.title">
    <!-- Suspense for async icon loading -->
    <Suspense>
      <!-- Loaded icon -->
      <template #default>
        <component :is="IconComponent" :class="classes" :style="style" aria-hidden="true">
          <slot />
        </component>
      </template>

      <!-- Fallback placeholder while loading -->
      <template #fallback>
        <div
          class="inline-block bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
          :class="fallbackSizeClass"
          :style="fallbackCustomStyle"
        />
      </template>
    </Suspense>

    <!-- Badge -->
    <DiBadge
      v-if="props.badge"
      :variant="props.badgeVariant"
      :size="props.badgeSize"
      :outline="props.badgeOutline"
      :dash="props.badgeDash"
      :soft="props.badgeSoft"
      :pill="props.badgePill"
      class="absolute -top-2 ltr:left-4 rtl:right-4 px-1 min-w-4 min-h-4 text-[0.625rem] sm:text-[0.75rem]"
    >
      {{ props.badge }}
    </DiBadge>
  </div>
</template>
