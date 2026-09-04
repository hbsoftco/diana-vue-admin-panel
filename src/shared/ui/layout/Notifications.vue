<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import DiDropdown from '@/shared/ui/base/DiDropdown.vue'

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
const notificationsLabel = computed(() => t('layout.notifications.label'))

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
  <DiDropdown
    class="btn btn-ghost btn-circle btn-sm relative"
    group="header"
    placement="bottom-end"
    role="dialog"
    panel-class="w-80"
    :aria-label="notificationsLabel"
    :title="notificationsLabel"
  >
    <template #trigger>
      <i-iconoir-bell-notification class="text-sm" />
      <span
        v-if="unreadCount > 0"
        class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] text-error-content"
      >
        {{ unreadCount > 9 ? '9+' : unreadCount }}
      </span>
    </template>

    <template #default>
      <div class="border-b border-base-300 p-4">
        <h3 class="font-semibold">
          {{ t('layout.notifications.title') }}
        </h3>
      </div>

      <div class="max-h-96 overflow-y-auto">
        <button
          v-for="notification in notifications"
          :key="notification.id"
          type="button"
          data-di-dropdown-no-close
          class="block w-full border-b border-base-300 p-4 text-start transition-colors hover:bg-base-200 focus:bg-base-200 focus:outline-none"
          :class="{ 'bg-base-200/50': notification.unread }"
          @click="markAsRead(notification.id)"
        >
          <div class="flex items-start justify-between gap-2">
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-medium">
                {{ t(notification.titleKey) }}
              </p>
              <p class="mt-1 text-xs text-base-content/60">
                {{ t(notification.descriptionKey, notification.descriptionParams) }}
              </p>
              <p class="mt-1 text-xs text-base-content/40">
                {{ formatRelativeTime(notification.time) }}
              </p>
            </div>
            <span
              v-if="notification.unread"
              class="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary"
            />
          </div>
        </button>
      </div>

      <div class="border-t border-base-300 p-3 text-center">
        <button type="button" class="btn btn-ghost btn-sm w-full">
          {{ t('layout.notifications.viewAll') }}
        </button>
      </div>
    </template>
  </DiDropdown>
</template>
