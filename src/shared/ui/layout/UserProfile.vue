<script setup lang="ts">
import { ref } from 'vue'

import DiButton from '@/shared/ui/base/DiButton.vue'
import DiDropdown from '@/shared/ui/base/DiDropdown.vue'

const selected = ref(null)

const menuOptions = [
  { label: 'Dashboard', value: 'dashboard' },
  { label: 'Profile', value: 'profile' },
  { label: 'Messages', value: 'messages', badge: '3' },
  { divider: true },
  { label: 'Settings', value: 'settings' },
  { label: 'Help', value: 'help' },
  { divider: true },
  { label: 'Logout', value: 'logout' },
]
</script>

<template>
  <div class="relative">
    <DiDropdown
      v-model="selected"
      :options="menuOptions"
      header="User Menu"
      footer="Version 1.0.0"
      :show-header-divider="true"
      :show-footer-divider="true"
      width="w-64"
      size="md"
      position="bottom"
      align="end"
      border="border border-solid border-content"
    >
      <template #trigger>
        <DiButton variant="ghost" class="px-2" rounded>
          <div>
            <i-solar:user-bold class="text-lg" />
          </div>
          <span class="hidden lg:block text-di-sm font-semibold">{{ $t('author') }}</span>
          <i-hugeicons:arrow-down-01 />
        </DiButton>
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
          <span>{{ option.label }}</span>
          <span v-if="option.badge" class="badge badge-sm ltr:ml-auto rtl:mr-auto">
            {{ option.badge }}
          </span>
        </button>
      </template>

      <template #footer>
        <div class="px-3 py-1 text-xs text-center opacity-60">
          Last login: 2 hours ago
        </div>
      </template>
    </DiDropdown>
  </div>
</template>
