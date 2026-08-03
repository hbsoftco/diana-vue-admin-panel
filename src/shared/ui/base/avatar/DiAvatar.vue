<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import type { IconName } from '@/shared/icons/registry'

import DiIcon from '@/shared/ui/base/DiIcon.vue'

import type {
  AvatarBadgePosition,
  AvatarShape,
  AvatarSize,
  AvatarStatus,
  AvatarVariant,
} from './types'

import { AVATAR_SIZE_CLASSES } from './sizes'

type Props = {
  src?: string
  alt?: string
  name?: string
  initials?: string
  icon?: IconName
  size?: AvatarSize
  shape?: AvatarShape
  variant?: AvatarVariant
  fallback?: boolean
  status?: AvatarStatus
  badgePosition?: AvatarBadgePosition
  badgeVariant?: AvatarVariant
  decorative?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  alt: '',
  name: '',
  initials: '',
  size: 'md',
  shape: 'circle',
  variant: 'primary',
  fallback: true,
  badgePosition: 'top-end',
  badgeVariant: 'primary',
  decorative: false,
})

const emit = defineEmits<{
  error: [event: Event]
  load: [event: Event]
}>()

defineSlots<{
  badge?: (props: { iconSize: string, size: AvatarSize }) => unknown
}>()

const imageFailed = ref(false)

const SHAPE_CLASSES: Record<AvatarShape, string> = {
  circle: 'rounded-full',
  rounded: 'rounded-lg',
  square: 'rounded-none',
}

const VARIANT_CLASSES: Record<AvatarVariant, string> = {
  primary: 'bg-primary text-primary-content',
  secondary: 'bg-secondary text-secondary-content',
  accent: 'bg-accent text-accent-content',
  info: 'bg-info text-info-content',
  success: 'bg-success text-success-content',
  warning: 'bg-warning text-warning-content',
  error: 'bg-error text-error-content',
}

const STATUS_CLASSES: Record<AvatarStatus, string> = {
  online: 'bg-success',
  offline: 'bg-base-content/40',
  busy: 'bg-error',
  away: 'bg-warning',
}

const sizeClasses = computed(() => AVATAR_SIZE_CLASSES[props.size])
const showImage = computed(() => Boolean(props.src && !imageFailed.value))
const derivedInitials = computed(() => {
  if (props.initials.trim())
    return props.initials.trim().toUpperCase()

  const parts = props.name.trim().split(/\s+/).filter(Boolean)
  if (!parts.length)
    return ''
  const first = parts[0]?.charAt(0) ?? ''
  const last = parts.length > 1 ? (parts[parts.length - 1]?.charAt(0) ?? '') : ''
  return `${first}${last}`.toUpperCase()
})
const showInitials = computed(
  () => !showImage.value && props.fallback && Boolean(derivedInitials.value),
)
const showConfiguredIcon = computed(() => !showImage.value && !showInitials.value && props.icon)
const accessibleLabel = computed(() => props.alt || props.name || 'Avatar')
const contentClasses = computed(() => [
  'inline-flex items-center justify-center overflow-hidden font-semibold select-none',
  sizeClasses.value.container,
  sizeClasses.value.text,
  SHAPE_CLASSES[props.shape],
  VARIANT_CLASSES[props.variant],
])
const statusClasses = computed(() => [
  'absolute end-0 bottom-0 translate-y-1/4 rounded-full border-base-100 ltr:translate-x-1/4 rtl:-translate-x-1/4',
  sizeClasses.value.status,
  props.status && STATUS_CLASSES[props.status],
])
const BADGE_POSITION_CLASSES: Record<AvatarBadgePosition, string> = {
  'top-start': '-top-1 -start-1',
  'top-end': '',
  'bottom-start': '-bottom-1 -start-1',
  'bottom-end': '-bottom-1 -end-1',
}
const badgeClasses = computed(() => [
  'absolute z-10 inline-flex aspect-square shrink-0 items-center justify-center overflow-hidden rounded-full border-base-100 p-0 font-semibold leading-none shadow-sm [&_.di-icon]:block',
  sizeClasses.value.badge,
  sizeClasses.value.badgeText,
  VARIANT_CLASSES[props.badgeVariant],
  props.badgePosition === 'top-end'
    ? sizeClasses.value.badgeOffset
    : BADGE_POSITION_CLASSES[props.badgePosition],
])

function onImageError(event: Event) {
  imageFailed.value = true
  emit('error', event)
}

function onImageLoad(event: Event) {
  emit('load', event)
}

watch(
  () => props.src,
  () => {
    imageFailed.value = false
  },
)
</script>

<template>
  <span
    class="avatar relative inline-flex shrink-0"
    :role="decorative || showImage ? undefined : 'img'"
    :aria-label="decorative || showImage ? undefined : accessibleLabel"
    :aria-hidden="decorative || undefined"
  >
    <span :class="contentClasses">
      <img
        v-if="showImage"
        :src="src"
        :alt="decorative ? '' : alt || name"
        class="size-full object-cover"
        @error="onImageError"
        @load="onImageLoad"
      >

      <span v-else-if="showInitials" aria-hidden="true">
        {{ derivedInitials }}
      </span>

      <DiIcon
        v-else-if="showConfiguredIcon"
        :name="icon!"
        :size="sizeClasses.icon"
        aria-hidden="true"
      />

      <DiIcon v-else name="userOutlineRounded" :size="sizeClasses.icon" aria-hidden="true" />
    </span>

    <span
      v-if="status"
      :class="statusClasses"
      role="status"
      :aria-label="status"
      data-avatar-status
    />

    <span v-if="$slots.badge" :class="badgeClasses" data-avatar-badge>
      <slot name="badge" :icon-size="sizeClasses.badgeIconSize" :size="size" />
    </span>
  </span>
</template>
