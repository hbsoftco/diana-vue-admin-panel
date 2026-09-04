<script setup lang="ts">
import userAvatarUrl from '@assets/images/user.png'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import DiAvatar from '@/shared/ui/base/avatar/DiAvatar.vue'
import DiButton from '@/shared/ui/base/DiButton.vue'
import DiDropdown from '@/shared/ui/base/DiDropdown.vue'
import DiIcon from '@/shared/ui/base/DiIcon.vue'

const selected = ref(null)
const { t } = useI18n()

const user = {
  name: 'John Doe',
}

const userRole = computed(() => t('layout.userMenu.role'))

// Existing user-menu items — labels, values, order and dividers are unchanged.
// Only per-row icons were added so each row can render icon + label like the reference.
const menuOptions = computed(() => [
  { label: t('layout.userMenu.dashboard'), value: 'dashboard', icon: 'homeOutlineRounded' },
  { label: t('layout.userMenu.profile'), value: 'profile', icon: 'userOutlineRounded' },
  { label: t('layout.userMenu.messages'), value: 'messages', icon: 'mail', badge: '3' },
  { divider: true },
  { label: t('layout.userMenu.settings'), value: 'settings', icon: 'settingsOutlineRounded' },
  { label: t('layout.userMenu.help'), value: 'help', icon: 'questionMarkCircle' },
  { divider: true },
  { label: t('layout.userMenu.logout'), value: 'logout', icon: 'logout' },
])

const userMenuLabel = computed(() => t('layout.userMenu.label'))
const userAvatarAlt = computed(() => t('layout.userMenu.avatarAlt', { name: user.name }))
const lastLogin = computed(() =>
  t('layout.userMenu.lastLogin', {
    time: t('layout.relativeTime.hoursAgo', { count: 2 }),
  }),
)
</script>

<template>
  <div class="relative">
    <DiDropdown
      v-model="selected"
      :options="menuOptions"
      :show-header-divider="true"
      :show-footer-divider="true"
      width="w-64"
      size="md"
      position="bottom"
      align="end"
      shadow="shadow-lg"
      border="border border-solid border-content"
    >
      <!-- Trigger: avatar + name + role, toggles the panel on click / Enter / Space -->
      <template #trigger="{ open }">
        <DiButton
          variant="ghost"
          rounded
          class="px-2"
          :aria-label="userMenuLabel"
          :title="userMenuLabel"
        >
          <DiAvatar :src="userAvatarUrl" :alt="userAvatarAlt" size="sm" shape="circle" />
          <span class="hidden text-start leading-tight lg:flex lg:flex-col">
            <span class="text-di-sm font-semibold">{{ user.name }}</span>
            <span class="text-xs text-base-content/60">{{ userRole }}</span>
          </span>
          <DiIcon
            name="arrowDown"
            size="sm"
            class="hidden transition-transform lg:block"
            :rotate="open ? 180 : 0"
          />
        </DiButton>
      </template>

      <!-- Panel header: repeats avatar + name + role -->
      <template #header>
        <div class="flex items-center gap-3 px-3 py-2">
          <DiAvatar :src="userAvatarUrl" :alt="userAvatarAlt" size="md" shape="circle" />
          <div class="min-w-0">
            <div class="truncate text-di-sm font-semibold text-base-content">
              {{ user.name }}
            </div>
            <div class="truncate text-xs text-base-content/60">
              {{ userRole }}
            </div>
          </div>
        </div>
      </template>

      <!-- Rows: icon + label, hover handled by the daisyUI menu (theme-aware) -->
      <template #option="{ option, select, selected: isSelected }">
        <button
          class="flex w-full items-center gap-3"
          :class="[
            { 'bg-base-200 font-medium': isSelected },
            option.value === 'logout' ? 'text-error' : 'text-base-content',
          ]"
          @click="select"
        >
          <DiIcon :name="option.icon" size="md" class="shrink-0" />
          <span>{{ option.label }}</span>
          <span v-if="option.badge" class="badge badge-primary badge-sm ltr:ml-auto rtl:mr-auto">
            {{ option.badge }}
          </span>
        </button>
      </template>

      <template #footer>
        <div class="px-3 py-1 text-xs text-center opacity-60">
          {{ lastLogin }}
        </div>
      </template>
    </DiDropdown>
  </div>
</template>
