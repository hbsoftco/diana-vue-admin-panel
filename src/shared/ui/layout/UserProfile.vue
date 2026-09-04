<script setup lang="ts">
import userAvatarUrl from '@assets/images/user.png'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import type { IconName } from '@/shared/icons/registry'

import DiAvatar from '@/shared/ui/base/avatar/DiAvatar.vue'
import DiDropdown from '@/shared/ui/base/DiDropdown.vue'
import DiIcon from '@/shared/ui/base/DiIcon.vue'

type UserMenuItem = {
  label: string
  value: string
  icon: IconName
  badge?: string
  danger?: boolean
}

const { t } = useI18n()

const user = {
  name: 'John Doe',
}

const userRole = computed(() => t('layout.userMenu.role'))

// Existing user-menu items — labels, values, order and dividers are unchanged.
const menuItems = computed<UserMenuItem[]>(() => [
  { label: t('layout.userMenu.dashboard'), value: 'dashboard', icon: 'homeOutlineRounded' },
  { label: t('layout.userMenu.profile'), value: 'profile', icon: 'userOutlineRounded' },
  { label: t('layout.userMenu.messages'), value: 'messages', icon: 'mail', badge: '3' },
  { label: t('layout.userMenu.settings'), value: 'settings', icon: 'settingsOutlineRounded' },
  { label: t('layout.userMenu.help'), value: 'help', icon: 'questionMarkCircle' },
  { label: t('layout.userMenu.logout'), value: 'logout', icon: 'logout', danger: true },
])

// Dividers keep their original positions: after `messages` and after `help`.
const dividerAfter = new Set(['messages', 'help'])

const userMenuLabel = computed(() => t('layout.userMenu.label'))
const userAvatarAlt = computed(() => t('layout.userMenu.avatarAlt', { name: user.name }))
const lastLogin = computed(() =>
  t('layout.userMenu.lastLogin', {
    time: t('layout.relativeTime.hoursAgo', { count: 2 }),
  }),
)

function onSelect(_value: string) {
  // Wiring to real navigation/actions happens where this shell is embedded.
}
</script>

<template>
  <DiDropdown
    class="btn btn-ghost h-auto min-h-0 gap-2 px-2 py-1.5"
    group="header"
    placement="bottom-end"
    role="menu"
    panel-class="w-64 p-1"
    :aria-label="userMenuLabel"
    :title="userMenuLabel"
  >
    <!-- Trigger: avatar + name + role + caret -->
    <template #trigger="{ open }">
      <DiAvatar :src="userAvatarUrl" :alt="userAvatarAlt" size="sm" shape="circle" />
      <span class="hidden text-start leading-tight lg:flex lg:flex-col">
        <span class="text-di-sm font-semibold">{{ user.name }}</span>
        <span class="text-xs text-base-content/60">{{ userRole }}</span>
      </span>
      <DiIcon
        name="arrowDown"
        size="sm"
        class="hidden transition-transform lg:block"
        :rotate="open ? 180 : 0"
      />
    </template>

    <!-- Panel: identity header, menu rows, footer -->
    <template #default>
      <div role="presentation" class="flex items-center gap-3 px-3 py-2">
        <DiAvatar :src="userAvatarUrl" :alt="userAvatarAlt" size="md" shape="circle" />
        <div class="min-w-0">
          <div class="truncate text-di-sm font-semibold text-base-content">
            {{ user.name }}
          </div>
          <div class="truncate text-xs text-base-content/60">
            {{ userRole }}
          </div>
        </div>
      </div>

      <div role="separator" class="my-1 h-px bg-base-300" />

      <template v-for="item in menuItems" :key="item.value">
        <button
          type="button"
          role="menuitem"
          class="flex w-full items-center gap-3 rounded-field px-3 py-2 text-di-sm hover:bg-base-200 focus:bg-base-200 focus:outline-none"
          :class="item.danger ? 'text-error' : 'text-base-content'"
          @click="onSelect(item.value)"
        >
          <DiIcon :name="item.icon" size="md" class="shrink-0" />
          <span>{{ item.label }}</span>
          <span v-if="item.badge" class="badge badge-primary badge-sm ltr:ml-auto rtl:mr-auto">
            {{ item.badge }}
          </span>
        </button>
        <div v-if="dividerAfter.has(item.value)" role="separator" class="my-1 h-px bg-base-300" />
      </template>

      <div role="presentation" class="px-3 py-1 text-center text-xs opacity-60">
        {{ lastLogin }}
      </div>
    </template>
  </DiDropdown>
</template>
