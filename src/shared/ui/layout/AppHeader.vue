<script setup lang="ts">
import FullscreenToggle from '@shared/ui/layout/FullscreenToggle.vue'
import LanguageToggle from '@shared/ui/layout/LanguageToggle.vue'
import ThemeToggle from '@shared/ui/layout/ThemeToggle.vue'
import { ref } from 'vue'

import Notifications from '@/shared/ui/layout/Notifications.vue'

// User menu
const showUserMenu = ref(false)

function toggleUserMenu() {
  showUserMenu.value = !showUserMenu.value
}

// Close all dropdowns
function closeAllDropdowns() {
  showUserMenu.value = false
}
</script>

<template>
  <header
    class="h-16 border-b border-(--color-border-header) bg-content-background sticky top-0 z-10"
  >
    <div class="h-full flex items-center justify-between px-6 gap-4">
      <button class="cursor-pointer">
        <i-hugeicons-menu-02 class="text-xl" />
      </button>

      <!-- Right: Actions -->
      <div class="flex items-center gap-2">
        <!-- Theme Toggle -->
        <ThemeToggle />

        <!-- Notifications -->
        <Notifications />

        <!-- Fullscreen Toggle -->
        <FullscreenToggle />

        <!-- Language Toggle -->
        <LanguageToggle />

        <!-- User Menu -->
        <div class="relative">
          <button
            class="flex items-center gap-2 hover:bg-base-200 rounded-lg p-1 transition-colors"
            @click="toggleUserMenu"
          >
            <div
              class="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-secondary-content font-semibold text-sm"
            >
              JD
            </div>
            <span class="hidden lg:block text-sm font-medium">John Doe</span>
            <span class="text-xs">▼</span>
          </button>

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
      </div>
    </div>

    <!-- Click outside to close dropdowns -->
    <div v-if="showUserMenu" class="fixed inset-0 z-40" @click="closeAllDropdowns" />
  </header>
</template>
