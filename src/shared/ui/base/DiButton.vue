<script setup lang="ts">
import { computed } from 'vue'

import type { BadgeVariant, BtnVariant, Size } from '@/shared/types/models'

import DiBadge from '@/shared/ui/base/DiBadge.vue'
import DiLoading from '@/shared/ui/base/DiLoading.vue'

/* =======================
   Types
======================= */

type LoadingVariant = 'spinner' | 'dots' | 'ring' | 'ball' | 'bars' | 'infinity'

type SocialProvider
  = | 'email'
    | 'github'
    | 'google'
    | 'facebook'
    | 'x'
    | 'kakao'
    | 'apple'
    | 'amazon'
    | 'microsoft'
    | 'line'
    | 'slack'
    | 'linkedin'
    | 'vk'
    | 'wechat'
    | 'metamask'

type BadgePosition = 'left' | 'right'

type Props = {
  variant?: BtnVariant
  size?: Size
  social?: SocialProvider

  active?: boolean
  disabled?: boolean
  loading?: boolean
  loadingDisabled?: boolean
  loadingVariant?: LoadingVariant

  outline?: boolean
  dash?: boolean
  soft?: boolean
  wide?: boolean
  block?: boolean
  circle?: boolean
  square?: boolean
  glass?: boolean
  rounded?: boolean
  gradient?: boolean

  tag?: 'button' | 'a' | 'input'
  nativeType?: 'button' | 'submit' | 'reset' | 'radio' | 'checkbox'

  // Badge props
  badgeValue?: string | number
  badgePosition?: BadgePosition
  badgeVariant?: BadgeVariant
  badgeSize?: Size
  badgePill?: boolean
  badgeOutline?: boolean
  badgeDash?: boolean
  badgeSoft?: boolean

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
  loadingDisabled: true,
  loadingVariant: 'spinner',
  outline: false,
  dash: false,
  soft: false,
  wide: false,
  block: false,
  circle: false,
  square: false,
  glass: false,
  rounded: false,
  gradient: false,
  badgePosition: 'right',
  badgeVariant: 'primary',
  badgeSize: 'xs',
  badgePill: false,
  badgeOutline: false,
  badgeDash: false,
  badgeSoft: false,
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
const SOCIAL_CLASSES: Record<SocialProvider, string> = {
  email: 'bg-white !text-black border-white',
  github: 'bg-black !text-white border-black',
  google: 'bg-white !text-black border-white',
  facebook: 'bg-[#1A77F2] !text-white border-[#1A77F2]',
  x: 'bg-black !text-white border-black',
  kakao: 'bg-[#FEE502] !text-[#181600] border-[#FEE502]',
  apple: 'bg-black !text-white border-black',
  amazon: 'bg-[#FF9900] !text-black border-[#FF9900]',
  microsoft: 'bg-[#2F2F2F] !text-white border-[#2F2F2F]',
  line: 'bg-[#03C755] !text-white border-[#03C755]',
  slack: 'bg-[#622069] !text-white border-[#622069]',
  linkedin: 'bg-[#0967C2] !text-white border-[#0967C2]',
  vk: 'bg-[#47698F] !text-white border-[#47698F]',
  wechat: 'bg-[#5EBB2B] !text-white border-[#5EBB2B]',
  metamask: 'bg-white !text-black border-white',
}

const VARIANT_CLASSES: Record<BtnVariant, string> = {
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
  gradient: 'btn-link',
}

const SIZE_CLASSES: Record<Size, string> = {
  xs: 'btn-xs',
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg',
  xl: 'btn-xl',
}

// Map button sizes to loading sizes
const LOADING_SIZE_MAP: Record<Size, Size> = {
  xs: 'xs',
  sm: 'xs',
  md: 'sm',
  lg: 'md',
  xl: 'lg',
}

/* =======================
   Computed properties
======================= */
const isDisabled = computed(() => {
  if (props.disabled)
    return true
  if (props.loading && props.loadingDisabled)
    return true
  return false
})

const socialClass = computed(() => (props.social ? SOCIAL_CLASSES[props.social] : ''))

const buttonClasses = computed(() => [
  'btn',

  VARIANT_CLASSES[props.variant],
  SIZE_CLASSES[props.size],

  props.active && 'btn-active',
  isDisabled.value && 'btn-disabled',

  props.outline && 'btn-outline',
  props.dash && 'btn-dash',
  props.soft && 'btn-soft',
  props.wide && 'btn-wide',
  props.block && 'btn-block',
  props.circle && 'btn-circle',
  props.square && 'btn-square',
  props.glass && 'glass',
  props.rounded && 'rounded-full',
  props.gradient && 'btn-gradient',

  socialClass.value,

  props.customClass,
])

const loadingSize = computed(() => LOADING_SIZE_MAP[props.size])

const hasBadge = computed(
  () => props.badgeValue !== undefined && props.badgeValue !== null && props.badgeValue !== '',
)

const showLeftBadge = computed(() => hasBadge.value && props.badgePosition === 'left')

const showRightBadge = computed(() => hasBadge.value && props.badgePosition === 'right')

/* =======================
   Methods
======================= */
function handleClick(event: MouseEvent) {
  if (isDisabled.value)
    return

  emit('click', event)
}
</script>

<template>
  <component
    :is="tag"
    :type="nativeType"
    :disabled="isDisabled"
    :class="buttonClasses"
    @click="handleClick"
  >
    <DiLoading v-if="loading" :variant="loadingVariant" :size="loadingSize" />

    <DiBadge
      v-if="showLeftBadge"
      :variant="badgeVariant"
      :size="badgeSize"
      :pill="badgePill"
      :outline="badgeOutline"
      :dash="badgeDash"
      :soft="badgeSoft"
      custom-class="px-1.5"
    >
      {{ badgeValue }}
    </DiBadge>

    <slot name="icon-left" />
    <slot />
    <slot name="icon-right" />

    <DiBadge
      v-if="showRightBadge"
      :variant="badgeVariant"
      :size="badgeSize"
      :pill="badgePill"
      :outline="badgeOutline"
      :dash="badgeDash"
      :soft="badgeSoft"
      custom-class="px-1.5"
    >
      {{ badgeValue }}
    </DiBadge>
  </component>
</template>
