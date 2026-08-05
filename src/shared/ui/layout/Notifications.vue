<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import DiButton from '@/shared/ui/base/DiButton.vue'

type RelativeTime = {
  count: number
  unit: 'minute' | 'hour'
}

type NotificationTitleKey
  = | 'layout.notifications.items.newMessage.title'
    | 'layout.notifications.items.taskCompleted.title'
    | 'layout.notifications.items.meetingReminder.title'

type NotificationDescriptionKey
  = | 'layout.notifications.items.newMessage.description'
    | 'layout.notifications.items.taskCompleted.description'
    | 'layout.notifications.items.meetingReminder.description'

type Notification = {
  id: number
  titleKey: NotificationTitleKey
  descriptionKey: NotificationDescriptionKey
  descriptionParams: Record<string, string>
  time: RelativeTime
  unread: boolean
}

const { t } = useI18n()

const notifications = ref<Notification[]>([
  {
    id: 1,
    titleKey: 'layout.notifications.items.newMessage.title',
    descriptionKey: 'layout.notifications.items.newMessage.description',
    descriptionParams: { sender: 'John' },
    time: { count: 5, unit: 'minute' },
    unread: true,
  },
  {
    id: 2,
    titleKey: 'layout.notifications.items.taskCompleted.title',
    descriptionKey: 'layout.notifications.items.taskCompleted.description',
    descriptionParams: { project: 'Project X' },
    time: { count: 1, unit: 'hour' },
    unread: true,
  },
  {
    id: 3,
    titleKey: 'layout.notifications.items.meetingReminder.title',
    descriptionKey: 'layout.notifications.items.meetingReminder.description',
    descriptionParams: { count: '30' },
    time: { count: 2, unit: 'hour' },
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

function formatRelativeTime(time: RelativeTime) {
  if (time.unit === 'minute') {
    return t(
      time.count === 1 ? 'layout.relativeTime.minuteAgo' : 'layout.relativeTime.minutesAgo',
      { count: time.count },
    )
  }

  return t(time.count === 1 ? 'layout.relativeTime.hourAgo' : 'layout.relativeTime.hoursAgo', {
    count: time.count,
  })
}
</script>

<template>
  <div class="relative">
    <DiButton
      size="sm"
      variant="ghost"
      circle
      :aria-label="t('layout.notifications.label')"
      :title="t('layout.notifications.label')"
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
          {{ t('layout.notifications.title') }}
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
                {{ t(notification.titleKey) }}
              </p>
              <p class="text-xs text-base-content/60 mt-1">
                {{ t(notification.descriptionKey, notification.descriptionParams) }}
              </p>
              <p class="text-xs text-base-content/40 mt-1">
                {{ formatRelativeTime(notification.time) }}
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
          {{ t('layout.notifications.viewAll') }}
        </button>
      </div>
    </div>
  </div>
</template>
