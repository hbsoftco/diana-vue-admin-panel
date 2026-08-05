<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import DiDropdown from '@/shared/ui/base/DiDropdown.vue'

const selected = ref(null)
const { t } = useI18n()

const menuOptions = computed(() => [
  {
    label: t('features.uiElements.dropdowns.dashboard'),
    value: 'dashboard',
    icon: 'i-mdi-view-dashboard',
  },
  { label: t('features.uiElements.dropdowns.profile'), value: 'profile', icon: 'i-mdi-account' },
  {
    label: t('features.uiElements.dropdowns.messages'),
    value: 'messages',
    icon: 'i-mdi-message',
    badge: '3',
  },
  { divider: true },
  { label: t('features.uiElements.dropdowns.settings'), value: 'settings', icon: 'i-mdi-cog' },
  { label: t('features.uiElements.dropdowns.help'), value: 'help', icon: 'i-mdi-help-circle' },
  { divider: true },
  { label: t('features.uiElements.dropdowns.logout'), value: 'logout', icon: 'i-mdi-logout' },
])
</script>

<template>
  <DiDropdown
    v-model="selected"
    :options="menuOptions"
    :header="$t('features.uiElements.dropdowns.userMenu')"
    footer="Version 1.0.0"
    :show-header-divider="true"
    :show-footer-divider="true"
    width="w-64"
    position="bottom"
    align="start"
  >
    <template #trigger>
      <button
        class="btn btn-ghost btn-circle"
        :aria-label="$t('features.uiElements.dropdowns.openMenu')"
      >
        <i-mdi-dots-vertical class="text-xl" />
      </button>
    </template>

    <template #header>
      <div class="flex items-center gap-3 px-4 py-3">
        <div class="avatar">
          <div class="w-10 rounded-full">
            <img
              src="@assets/images/user.png"
              :alt="$t('features.uiElements.dropdowns.userAvatar')"
            >
          </div>
        </div>
        <div>
          <div class="font-semibold">
            John Doe
          </div>
          <div class="text-xs opacity-70">
            john@example.com
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
        <component :is="option.icon" class="text-lg" />
        <span>{{ option.label }}</span>
        <span v-if="option.badge" class="badge badge-sm ml-auto">
          {{ option.badge }}
        </span>
      </button>
    </template>

    <template #footer>
      <div class="px-4 py-2 text-xs text-center opacity-60">
        {{ $t('features.uiElements.dropdowns.lastLogin') }}
      </div>
    </template>
  </DiDropdown>
</template>
