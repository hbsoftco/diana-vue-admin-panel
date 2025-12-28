<script setup lang="ts">
import { computed, ref } from 'vue'

import DiButton from '@/shared/ui/base/DiButton.vue'

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
</script>

<template>
  <div class="relative">
    <DiButton
      size="sm"
      variant="ghost"
      circle
      aria-label="Notifications"
      class="relative"
      @click="toggleNotifications"
    >
      <i-iconoir-bell-notification class="text-sm" />
      <span
        v-if="unreadCount > 0"
        class="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full text-[10px] text-error-content flex items-center justify-center"
      >
        {{ unreadCount > 9 ? '9+' : unreadCount }}
      </span>
    </DiButton>

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
              class="w-2 h-2 bg-primary rounded-full shrink-0 mt-1"
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
</template>
