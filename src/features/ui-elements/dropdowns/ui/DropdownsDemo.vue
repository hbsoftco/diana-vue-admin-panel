<script setup lang="ts">
import { ref } from 'vue'

import DiDropdown from '@/shared/ui/base/DiDropdown.vue'

const selected = ref(null)

const menuOptions = [
  { label: 'Dashboard', value: 'dashboard', icon: 'i-mdi-view-dashboard' },
  { label: 'Profile', value: 'profile', icon: 'i-mdi-account' },
  { label: 'Messages', value: 'messages', icon: 'i-mdi-message', badge: '3' },
  { divider: true },
  { label: 'Settings', value: 'settings', icon: 'i-mdi-cog' },
  { label: 'Help', value: 'help', icon: 'i-mdi-help-circle' },
  { divider: true },
  { label: 'Logout', value: 'logout', icon: 'i-mdi-logout' },
]
</script>

<template>
  <DiDropdown
    v-model="selected"
    :options="menuOptions"
    header="User Menu"
    footer="Version 1.0.0"
    :show-header-divider="true"
    :show-footer-divider="true"
    width="w-64"
    position="bottom"
    align="start"
  >
    <template #trigger>
      <button class="btn btn-ghost btn-circle">
        <i-mdi-dots-vertical class="text-xl" />
      </button>
    </template>

    <template #header>
      <div class="flex items-center gap-3 px-4 py-3">
        <div class="avatar">
          <div class="w-10 rounded-full">
            <img src="@assets/images/user.png" alt="User">
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

    <template #option="{ option, select, selected }">
      <button
        class="flex items-center gap-3 w-full"
        :class="{ 'bg-base-200': selected }"
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
        Last login: 2 hours ago
      </div>
    </template>
  </DiDropdown>
</template>
