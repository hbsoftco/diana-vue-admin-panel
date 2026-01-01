<script setup lang="ts">
import FullscreenToggle from '@shared/ui/layout/FullscreenToggle.vue'
import LanguageToggle from '@shared/ui/layout/LanguageToggle.vue'
import ThemeToggle from '@shared/ui/layout/ThemeToggle.vue'
import UserProfile from '@shared/ui/layout/UserProfile.vue'

import { useDirection } from '@/shared/composables/use-direction'
import DiIcon from '@/shared/ui/base/DiIcon.vue'
import Notifications from '@/shared/ui/layout/Notifications.vue'
import { useSidebar } from '@/shared/utils/use-sidebar'

const { toggleSidebar, isSidebarCollapsed } = useSidebar()

const { isRtl } = useDirection()
</script>

<template>
  <header class="h-16 border-b border-content bg-content-background sticky top-0 z-10">
    <div class="h-full flex items-center justify-between px-6 gap-4">
      <button class="cursor-pointer relative w-6 h-6" @click="toggleSidebar">
        <Transition name="icon-fade" mode="out-in">
          <DiIcon v-if="!isSidebarCollapsed" name="menu" size="xl" :rotate="isRtl ? 180 : 0" />
          <DiIcon v-else key="close" name="close" size="xl" />
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
