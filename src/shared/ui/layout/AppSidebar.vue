<script setup lang="ts">
import { ref } from 'vue'

import type { MenuItem } from '@/shared/types/models'

const menuItems = ref<MenuItem[]>([
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '📊',
    route: '/dashboard',
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: '📁',
    children: [
      { id: 'all-projects', label: 'All Projects', icon: '📋', route: '/projects' },
      { id: 'active', label: 'Active', icon: '✅', route: '/projects/active' },
      { id: 'archived', label: 'Archived', icon: '📦', route: '/projects/archived' },
    ],
  },
  {
    id: 'team',
    label: 'Team',
    icon: '👥',
    children: [
      { id: 'members', label: 'Members', icon: '👤', route: '/team/members' },
      { id: 'departments', label: 'Departments', icon: '🏢', route: '/team/departments' },
      { id: 'roles', label: 'Roles', icon: '🎭', route: '/team/roles' },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: '📈',
    route: '/analytics',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: '⚙️',
    children: [
      { id: 'general', label: 'General', icon: '🔧', route: '/settings/general' },
      { id: 'security', label: 'Security', icon: '🔒', route: '/settings/security' },
      { id: 'notifications', label: 'Notifications', icon: '🔔', route: '/settings/notifications' },
    ],
  },
  {
    id: 'settings2',
    label: 'Settings',
    icon: '⚙️',
    children: [
      { id: 'general', label: 'General', icon: '🔧', route: '/settings/general' },
      { id: 'security', label: 'Security', icon: '🔒', route: '/settings/security' },
      { id: 'notifications', label: 'Notifications', icon: '🔔', route: '/settings/notifications' },
    ],
  },
  {
    id: 'settings3',
    label: 'Settings',
    icon: '⚙️',
    children: [
      { id: 'general', label: 'General', icon: '🔧', route: '/settings/general' },
      { id: 'security', label: 'Security', icon: '🔒', route: '/settings/security' },
      { id: 'notifications', label: 'Notifications', icon: '🔔', route: '/settings/notifications' },
    ],
  },
])

const expandedMenus = ref<Set<string>>(new Set())

function toggleMenu(id: string) {
  if (expandedMenus.value.has(id)) {
    expandedMenus.value.delete(id)
  }
  else {
    expandedMenus.value.add(id)
  }
}

const isExpanded = (id: string) => expandedMenus.value.has(id)
</script>

<template>
  <aside class="w-64 bg-base-100 border-r border-base-300 flex flex-col">
    <!-- Logo/Brand -->
    <div class="h-16 flex items-center px-4 border-b border-base-300">
      <div class="flex items-center gap-2">
        <div
          class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-content font-bold"
        >
          A
        </div>
        <span class="font-semibold text-lg">AppName</span>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto py-4">
      <ul class="space-y-1 px-2">
        <li v-for="item in menuItems" :key="item.id">
          <!-- Parent menu item -->
          <div
            v-if="item.children"
            class="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-base-200 transition-colors"
            :class="{ 'bg-base-200': isExpanded(item.id) }"
            @click="toggleMenu(item.id)"
          >
            <div class="flex items-center gap-3">
              <span class="text-lg">{{ item.icon }}</span>
              <span class="text-sm font-medium">{{ item.label }}</span>
            </div>
            <span
              class="text-xs transition-transform"
              :class="{ 'rotate-90': isExpanded(item.id) }"
            >
              ▶
            </span>
          </div>

          <!-- Single menu item (no children) -->
          <RouterLink
            v-else-if="item.route"
            :to="item.route"
            class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-200 transition-colors"
            active-class="bg-primary text-primary-content"
          >
            <span class="text-lg">{{ item.icon }}</span>
            <span class="text-sm font-medium">{{ item.label }}</span>
          </RouterLink>

          <!-- Nested menu items -->
          <ul
            v-if="item.children && isExpanded(item.id)"
            class="mt-1 ml-4 space-y-1 border-l-2 border-base-300 pl-2"
          >
            <li v-for="child in item.children" :key="child.id">
              <RouterLink
                v-if="child.route"
                :to="child.route"
                class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-200 transition-colors text-sm"
                active-class="bg-primary text-primary-content"
              >
                <span>{{ child.icon }}</span>
                <span>{{ child.label }}</span>
              </RouterLink>
            </li>
          </ul>
        </li>
      </ul>
    </nav>

    <!-- User Profile -->
    <div class="border-t border-base-300 p-4">
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-secondary-content font-semibold"
        >
          JD
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium truncate">
            John Doe
          </p>
          <p class="text-xs text-base-content/60 truncate">
            john@example.com
          </p>
        </div>
      </div>
    </div>
  </aside>
</template>
