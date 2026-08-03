<script setup lang="ts">
import { computed } from 'vue'

import type { AvatarShape, AvatarSize, DiAvatarGroupItem } from './types'

import DiAvatar from './DiAvatar.vue'
import { AVATAR_SIZE_CLASSES } from './sizes'

type Props = {
  avatars: DiAvatarGroupItem[]
  max?: number
  size?: AvatarSize
  shape?: AvatarShape
}

const props = withDefaults(defineProps<Props>(), {
  max: Number.POSITIVE_INFINITY,
  size: 'md',
  shape: 'circle',
})

const visibleAvatars = computed(() => props.avatars.slice(0, Math.max(0, props.max)))
const hiddenCount = computed(() => Math.max(0, props.avatars.length - visibleAvatars.value.length))
const sizeClasses = computed(() => AVATAR_SIZE_CLASSES[props.size])
const counterClasses = computed(() => [
  'inline-flex items-center justify-center border-2 border-base-100 bg-neutral font-semibold text-neutral-content',
  sizeClasses.value.container,
  sizeClasses.value.text,
  props.shape === 'circle'
    ? 'rounded-full'
    : props.shape === 'rounded'
      ? 'rounded-lg'
      : 'rounded-none',
])
</script>

<template>
  <div class="avatar-group flex items-center" role="group" aria-label="Avatar group">
    <DiAvatar
      v-for="(avatar, index) in visibleAvatars"
      :key="avatar.id ?? index"
      v-bind="avatar"
      :size="size"
      :shape="avatar.shape ?? shape"
      class="first:ms-0"
      :class="sizeClasses.groupOverlap"
    />

    <span
      v-if="hiddenCount"
      class="avatar relative inline-flex shrink-0 first:ms-0"
      :class="sizeClasses.groupOverlap"
      role="img"
      :aria-label="`${hiddenCount} more avatars`"
    >
      <span :class="counterClasses">+{{ hiddenCount }}</span>
    </span>
  </div>
</template>
