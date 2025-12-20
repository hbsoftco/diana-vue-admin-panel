<script setup lang="ts">
import { ref } from 'vue'

import Button from '@/shared/ui/Button.vue'

// User menu
const showUserMenu = ref(false)
</script>

<template>
  <div class="relative">
    <Button variant="ghost" class="px-2" rounded>
      <div>
        <i-solar:user-bold class="text-lg" />
      </div>
      <span class="hidden lg:block text-sm font-medium">John Doe</span>
      <i-hugeicons:arrow-down-01 class="text-md" />
    </Button>

    <!-- User Dropdown Menu -->
    <div
      v-if="showUserMenu"
      class="absolute right-0 mt-2 w-56 bg-base-100 border border-base-300 rounded-lg shadow-lg z-50"
      @click.stop
    >
      <div class="p-3 border-b border-base-300">
        <p class="font-medium text-sm">
          John Doe
        </p>
        <p class="text-xs text-base-content/60">
          john@example.com
        </p>
      </div>
      <ul class="py-2">
        <li>
          <RouterLink
            to="/profile"
            class="flex items-center gap-3 px-4 py-2 hover:bg-base-200 transition-colors text-sm"
            @click="showUserMenu = false"
          >
            <span>👤</span>
            <span>Profile</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/settings"
            class="flex items-center gap-3 px-4 py-2 hover:bg-base-200 transition-colors text-sm"
            @click="showUserMenu = false"
          >
            <span>⚙️</span>
            <span>Settings</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/help"
            class="flex items-center gap-3 px-4 py-2 hover:bg-base-200 transition-colors text-sm"
            @click="showUserMenu = false"
          >
            <span>❓</span>
            <span>Help & Support</span>
          </RouterLink>
        </li>
      </ul>
      <div class="border-t border-base-300 p-2">
        <button
          class="flex items-center gap-3 px-4 py-2 hover:bg-base-200 transition-colors text-sm w-full text-left text-error"
        >
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  </div>
</template>
