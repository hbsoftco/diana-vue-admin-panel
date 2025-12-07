<script setup lang="ts">
import LanguageToggle from '@shared/ui/layout/LanguageToggle.vue'
import ThemeToggle from '@shared/ui/layout/ThemeToggle.vue'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Get page title from route meta or generate from path
const pageTitle = computed(() => {
  if (route.meta.title) {
    return route.meta.title as string
  }

  // Generate title from route path
  const segments = route.path.split('/').filter(Boolean)
  if (segments.length === 0)
    return 'Dashboard'

  return segments[segments.length - 1]
    ?.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
})

// Search functionality
const searchQuery = ref('')
const isSearchFocused = ref(false)

function handleSearch() {
  if (searchQuery.value.trim()) {
    console.log('Searching for:', searchQuery.value)
    // Implement your search logic here
  }
}

// Notifications
const notifications = ref([
  {
    id: 1,
    title: 'New message',
    description: 'You have a new message from John',
    time: '5 min ago',
    unread: true,
  },
  {
    id: 2,
    title: 'Task completed',
    description: 'Project X has been completed',
    time: '1 hour ago',
    unread: true,
  },
  {
    id: 3,
    title: 'Meeting reminder',
    description: 'Team meeting in 30 minutes',
    time: '2 hours ago',
    unread: false,
  },
])

const unreadCount = computed(() => notifications.value.filter(n => n.unread).length)
const showNotifications = ref(false)

function toggleNotifications() {
  showNotifications.value = !showNotifications.value
}

function markAsRead(id: number) {
  const notification = notifications.value.find(n => n.id === id)
  if (notification) {
    notification.unread = false
  }
}

// User menu
const showUserMenu = ref(false)

function toggleUserMenu() {
  showUserMenu.value = !showUserMenu.value
}

// Close all dropdowns
function closeAllDropdowns() {
  showNotifications.value = false
  showUserMenu.value = false
}
</script>

<template>
  <header class="h-16 border-b border-base-300 bg-base-100 sticky top-0 z-10">
    <div class="h-full flex items-center justify-between px-6 gap-4">
      <!-- Left: Page Title & Search -->
      <div class="flex items-center gap-4 flex-1 min-w-0">
        <h1 class="text-xl font-semibold truncate">
          {{ pageTitle }}
        </h1>

        <!-- Search Bar -->
        <div class="relative max-w-md w-full hidden md:block">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="input input-sm input-bordered w-full pl-10 pr-4"
            :class="{ 'input-primary': isSearchFocused }"
            @focus="isSearchFocused = true"
            @blur="isSearchFocused = false"
            @keyup.enter="handleSearch"
          >
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50"> 🔍 </span>
        </div>
      </div>

      <!-- Right: Actions -->
      <div class="flex items-center gap-2">
        <!-- Search Button (Mobile) -->
        <button class="btn btn-ghost btn-sm btn-circle md:hidden">
          🔍
        </button>

        <!-- Theme Toggle -->
        <ThemeToggle />

        <!-- Language Toggle -->
        <LanguageToggle />

        <!-- Notifications -->
        <div class="relative">
          <button class="btn btn-ghost btn-sm btn-circle relative" @click="toggleNotifications">
            🔔
            <span
              v-if="unreadCount > 0"
              class="absolute top-1 right-1 w-4 h-4 bg-error rounded-full text-xs text-error-content flex items-center justify-center font-bold"
            >
              {{ unreadCount > 9 ? '9+' : unreadCount }}
            </span>
          </button>

          <!-- Notifications Dropdown -->
          <div
            v-if="showNotifications"
            class="absolute right-0 mt-2 w-80 bg-base-100 border border-base-300 rounded-lg shadow-lg z-50"
            @click.stop
          >
            <div class="p-4 border-b border-base-300">
              <h3 class="font-semibold">
                Notifications
              </h3>
            </div>
            <div class="max-h-96 overflow-y-auto">
              <div
                v-for="notification in notifications"
                :key="notification.id"
                class="p-4 border-b border-base-300 hover:bg-base-200 cursor-pointer transition-colors"
                :class="{ 'bg-base-200/50': notification.unread }"
                @click="markAsRead(notification.id)"
              >
                <div class="flex justify-between items-start gap-2">
                  <div class="flex-1 min-w-0">
                    <p class="font-medium text-sm truncate">
                      {{ notification.title }}
                    </p>
                    <p class="text-xs text-base-content/60 mt-1">
                      {{ notification.description }}
                    </p>
                    <p class="text-xs text-base-content/40 mt-1">
                      {{ notification.time }}
                    </p>
                  </div>
                  <span
                    v-if="notification.unread"
                    class="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1"
                  />
                </div>
              </div>
            </div>
            <div class="p-3 text-center border-t border-base-300">
              <button class="btn btn-ghost btn-sm w-full">
                View all notifications
              </button>
            </div>
          </div>
        </div>

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
    <div
      v-if="showNotifications || showUserMenu"
      class="fixed inset-0 z-40"
      @click="closeAllDropdowns"
    />
  </header>
</template>
