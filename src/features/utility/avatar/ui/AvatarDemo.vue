<script setup lang="ts">
import type { AvatarSize, AvatarVariant, DiAvatarGroupItem } from '@/shared/ui/base/avatar'

import { DiAvatar, DiAvatarGroup } from '@/shared/ui/base/avatar'
import DiIcon from '@/shared/ui/base/DiIcon.vue'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

const avatarSizes: AvatarSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
const avatarUrls = [
  'https://i.pravatar.cc/160?img=1',
  'https://i.pravatar.cc/160?img=5',
  'https://i.pravatar.cc/160?img=9',
  'https://i.pravatar.cc/160?img=12',
  'https://i.pravatar.cc/160?img=16',
  'https://i.pravatar.cc/160?img=32',
]
const badgeVariants: AvatarVariant[] = [
  'primary',
  'secondary',
  'warning',
  'info',
  'success',
  'error',
]
const badgeValues = [2, 5, 1, 7, 3, 9]
const initials: Array<{
  label: string
  name: string
  size: AvatarSize
  variant: AvatarVariant
}> = [
  { label: 'XS', name: 'Extra small avatar', size: 'xs', variant: 'primary' },
  { label: 'SM', name: 'Small avatar', size: 'sm', variant: 'secondary' },
  { label: 'MD', name: 'Medium avatar', size: 'md', variant: 'warning' },
  { label: 'LG', name: 'Large avatar', size: 'lg', variant: 'error' },
  { label: 'XL', name: 'Extra large avatar', size: 'xl', variant: 'success' },
  { label: 'XXL', name: 'Double extra large avatar', size: '2xl', variant: 'info' },
]
const groupAvatars: DiAvatarGroupItem[] = avatarUrls.map((src, index) => ({
  id: index,
  src,
  alt: `Team member ${index + 1}`,
}))

const avatarsCode = `<div class="flex items-center gap-3">
  <DiAvatar src="https://i.pravatar.cc/160?img=1" alt="Square avatar" shape="square" />
  <DiAvatar src="https://i.pravatar.cc/160?img=5" alt="Rounded avatar" shape="rounded" />
  <DiAvatar src="https://i.pravatar.cc/160?img=9" alt="Circular avatar" />
</div>`

const sizesCode = `<div class="flex items-end gap-2">
  <DiAvatar src="https://i.pravatar.cc/160?img=1" alt="Extra small avatar" size="xs" shape="rounded" />
  <DiAvatar src="https://i.pravatar.cc/160?img=5" alt="Small avatar" size="sm" shape="rounded" />
  <DiAvatar src="https://i.pravatar.cc/160?img=9" alt="Medium avatar" size="md" shape="rounded" />
  <DiAvatar src="https://i.pravatar.cc/160?img=12" alt="Large avatar" size="lg" shape="rounded" />
  <DiAvatar src="https://i.pravatar.cc/160?img=16" alt="Extra large avatar" size="xl" shape="rounded" />
  <DiAvatar src="https://i.pravatar.cc/160?img=32" alt="Double extra large avatar" size="2xl" shape="rounded" />
</div>`

const iconsCode = `<div class="flex items-end gap-2">
  <DiAvatar
    v-for="(size, index) in avatarSizes"
    :key="size"
    :src="avatarUrls[index]"
    :alt="\`Profile action avatar \${index + 1}\`"
    :size="size"
    shape="circle"
    :badge-variant="badgeVariants[index]"
  >
    <template #badge="{ iconSize }">
      <DiIcon name="camera" :size="iconSize" />
    </template>
  </DiAvatar>
</div>`

const onlineCode = `<div class="flex items-end gap-2">
  <DiAvatar
    v-for="(size, index) in avatarSizes"
    :key="size"
    :src="avatarUrls[index]"
    :alt="\`Online user \${index + 1}\`"
    :size="size"
    shape="circle"
    status="online"
  />
</div>`

const offlineCode = `<div class="flex items-end gap-2">
  <DiAvatar
    v-for="(size, index) in avatarSizes"
    :key="size"
    :src="avatarUrls[index]"
    :alt="\`Offline user \${index + 1}\`"
    :size="size"
    shape="circle"
    status="offline"
  />
</div>`

const badgesCode = `<div class="flex items-end gap-2">
  <DiAvatar
    v-for="(size, index) in avatarSizes"
    :key="size"
    :src="avatarUrls[index]"
    :alt="\`Unread messages avatar \${index + 1}\`"
    :size="size"
    shape="circle"
    :badge-variant="badgeVariants[index]"
  >
    <template #badge>
      {{ badgeValues[index] }}
    </template>
  </DiAvatar>
</div>`

const initialsCode = `<div class="flex items-end gap-2">
  <DiAvatar
    v-for="item in initials"
    :key="item.size"
    :name="item.name"
    :initials="item.label"
    :size="item.size"
    :variant="item.variant"
    shape="rounded"
  />
</div>`

const stackedCode = `<DiAvatarGroup :avatars="groupAvatars" :max="5" shape="square" />`
const roundedStackedCode = `<DiAvatarGroup :avatars="groupAvatars" :max="5" shape="circle" />`
</script>

<template>
  <div class="grid grid-cols-1 items-start gap-4 lg:grid-cols-2 xl:grid-cols-3">
    <PreviewCodeCard
      :title="$t('features.utility.avatar.basic')"
      accent-color="#14b8a6"
      :code="avatarsCode"
      language="html"
    >
      <div class="flex items-center justify-center gap-3 py-4">
        <DiAvatar src="https://i.pravatar.cc/160?img=1" alt="Square avatar" shape="square" />
        <DiAvatar src="https://i.pravatar.cc/160?img=5" alt="Rounded avatar" shape="rounded" />
        <DiAvatar src="https://i.pravatar.cc/160?img=9" alt="Circular avatar" />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.utility.avatar.sizes')"
      accent-color="#14b8a6"
      :code="sizesCode"
      language="html"
    >
      <div class="flex flex-wrap items-end justify-center gap-2 py-4">
        <DiAvatar
          v-for="(size, index) in avatarSizes"
          :key="size"
          :src="avatarUrls[index]"
          :alt="`${size} avatar`"
          :size="size"
          shape="rounded"
        />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.utility.avatar.icon')"
      accent-color="#14b8a6"
      :code="iconsCode"
      language="vue"
    >
      <div class="flex flex-wrap items-end justify-center gap-2 py-4">
        <DiAvatar
          v-for="(size, index) in avatarSizes"
          :key="size"
          :src="avatarUrls[index]"
          :alt="`Profile action avatar ${index + 1}`"
          :size="size"
          :badge-variant="badgeVariants[index]"
        >
          <template #badge="{ iconSize }">
            <DiIcon name="camera" :size="iconSize" />
          </template>
        </DiAvatar>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.utility.avatar.online')"
      accent-color="#14b8a6"
      :code="onlineCode"
      language="vue"
    >
      <div class="flex flex-wrap items-end justify-center gap-2 py-4">
        <DiAvatar
          v-for="(size, index) in avatarSizes"
          :key="size"
          :src="avatarUrls[index]"
          :alt="`Online user ${index + 1}`"
          :size="size"
          status="online"
        />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.utility.avatar.offline')"
      accent-color="#14b8a6"
      :code="offlineCode"
      language="vue"
    >
      <div class="flex flex-wrap items-end justify-center gap-2 py-4">
        <DiAvatar
          v-for="(size, index) in avatarSizes"
          :key="size"
          :src="avatarUrls[index]"
          :alt="`Offline user ${index + 1}`"
          :size="size"
          status="offline"
        />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.utility.avatar.badges')"
      accent-color="#14b8a6"
      :code="badgesCode"
      language="vue"
    >
      <div class="flex flex-wrap items-end justify-center gap-2 py-4">
        <DiAvatar
          v-for="(size, index) in avatarSizes"
          :key="size"
          :src="avatarUrls[index]"
          :alt="`Unread messages avatar ${index + 1}`"
          :size="size"
          :badge-variant="badgeVariants[index]"
        >
          <template #badge>
            {{ badgeValues[index] }}
          </template>
        </DiAvatar>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.utility.avatar.initials')"
      accent-color="#14b8a6"
      :code="initialsCode"
      language="vue"
    >
      <div class="flex flex-wrap items-end justify-center gap-2 py-4">
        <DiAvatar
          v-for="item in initials"
          :key="item.size"
          :name="item.name"
          :initials="item.label"
          :size="item.size"
          :variant="item.variant"
          shape="rounded"
        />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.utility.avatar.stacked')"
      accent-color="#14b8a6"
      :code="stackedCode"
      language="html"
    >
      <div class="flex justify-center py-5">
        <DiAvatarGroup :avatars="groupAvatars" :max="5" shape="square" />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.utility.avatar.roundedStacked')"
      accent-color="#14b8a6"
      :code="roundedStackedCode"
      language="html"
    >
      <div class="flex justify-center py-5">
        <DiAvatarGroup :avatars="groupAvatars" :max="5" shape="circle" />
      </div>
    </PreviewCodeCard>
  </div>
</template>
