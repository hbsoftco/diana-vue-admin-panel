<script setup lang="ts">
import { ref } from 'vue'

import Button from '@/shared/ui/Button.vue'
import Dropdown from '@/shared/ui/Dropdown.vue'

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
  <div class="relative">
    <Dropdown
      v-model="selected"
      :options="menuOptions"
      header="User Menu"
      footer="Version 1.0.0"
      :show-header-divider="true"
      :show-footer-divider="true"
      width="w-64"
      position="bottom"
      align="end"
      border="border border-solid border-content"
    >
      <template #trigger>
        <Button variant="ghost" class="px-2" rounded>
          <div>
            <i-solar:user-bold class="text-lg" />
          </div>
          <span class="hidden lg:block text-sm font-medium">John Doe</span>
          <i-hugeicons:arrow-down-01 class="text-md" />
        </Button>
      </template>

      <template #header>
        <div class="flex items-center gap-3 px-3 py-2">
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
        <div class="px-3 py-1 text-xs text-center opacity-60">
          Last login: 2 hours ago
        </div>
      </template>
    </Dropdown>
  </div>
</template>
