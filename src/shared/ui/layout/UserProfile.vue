<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import DiButton from '@/shared/ui/base/DiButton.vue'
import DiDropdown from '@/shared/ui/base/DiDropdown.vue'
import DiIcon from '@/shared/ui/base/DiIcon.vue'

const selected = ref(null)
const { t } = useI18n()

const user = {
  name: 'John Doe',
  email: 'john@example.com',
}

const menuOptions = computed(() => [
  { label: t('layout.userMenu.dashboard'), value: 'dashboard' },
  { label: t('layout.userMenu.profile'), value: 'profile' },
  { label: t('layout.userMenu.messages'), value: 'messages', badge: '3' },
  { divider: true },
  { label: t('layout.userMenu.settings'), value: 'settings' },
  { label: t('layout.userMenu.help'), value: 'help' },
  { divider: true },
  { label: t('layout.userMenu.logout'), value: 'logout' },
])

const userMenuLabel = computed(() => t('layout.userMenu.label'))
const userAvatarAlt = computed(() => t('layout.userMenu.avatarAlt', { name: user.name }))
const lastLogin = computed(() =>
  t('layout.userMenu.lastLogin', {
    time: t('layout.relativeTime.hoursAgo', { count: 2 }),
  }),
)
</script>

<template>
  <div class="relative">
    <DiDropdown
      v-model="selected"
      :options="menuOptions"
      :show-header-divider="true"
      :show-footer-divider="true"
      width="w-64"
      size="md"
      position="bottom"
      align="end"
      border="border border-solid border-content"
    >
      <template #trigger>
        <DiButton
          variant="ghost"
          class="px-2"
          rounded
          :aria-label="userMenuLabel"
          :title="userMenuLabel"
        >
          <div>
            <DiIcon name="user" size="md" />
          </div>
          <span class="hidden lg:block text-di-sm font-semibold">{{ user.name }}</span>
          <DiIcon name="arrowDown" size="sm" />
        </DiButton>
      </template>

      <template #header>
        <div class="flex items-center gap-3 px-3 py-2">
          <div class="avatar">
            <div class="w-10 rounded-full">
              <img src="@assets/images/user.png" :alt="userAvatarAlt">
            </div>
          </div>
          <div>
            <div class="font-semibold">
              {{ user.name }}
            </div>
            <div class="text-xs opacity-70">
              {{ user.email }}
            </div>
          </div>
        </div>
      </template>

      <template #option="{ option, select, selected: isSelected }">
        <button
          class="flex items-center gap-3 w-full"
          :class="{ 'bg-base-200': isSelected }"
          @click="select"
        >
          <span>{{ option.label }}</span>
          <span v-if="option.badge" class="badge badge-sm ltr:ml-auto rtl:mr-auto">
            {{ option.badge }}
          </span>
        </button>
      </template>

      <template #footer>
        <div class="px-3 py-1 text-xs text-center opacity-60">
          {{ lastLogin }}
        </div>
      </template>
    </DiDropdown>
  </div>
</template>
