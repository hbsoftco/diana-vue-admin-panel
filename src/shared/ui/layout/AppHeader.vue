<script setup lang="ts">
import FullscreenToggle from '@shared/ui/layout/FullscreenToggle.vue'
import LanguageToggle from '@shared/ui/layout/LanguageToggle.vue'
import ThemeToggle from '@shared/ui/layout/ThemeToggle.vue'
import UserProfile from '@shared/ui/layout/UserProfile.vue'

import Notifications from '@/shared/ui/layout/Notifications.vue'
import { useSidebar } from '@/shared/utils/use-sidebar'

const { toggleSidebar, isSidebarCollapsed } = useSidebar()
</script>

<template>
  <header class="h-16 border-b border-content bg-content-background sticky top-0 z-10">
    <div class="h-full flex items-center justify-between px-6 gap-4">
      <button class="cursor-pointer relative w-6 h-6" @click="toggleSidebar">
        <Transition name="icon-fade" mode="out-in">
          <i-hugeicons-menu-02
            v-if="!isSidebarCollapsed"
            key="menu"
            class="text-xl rtl:rotate-180 absolute inset-0"
          />
          <i-mingcute:close-line v-else key="close" class="text-xl absolute inset-0" />
        </Transition>
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

        <!-- User Profile -->
        <UserProfile />
      </div>
    </div>
  </header>
</template>
