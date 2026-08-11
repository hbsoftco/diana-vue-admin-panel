<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import type { MenuItem as MenuItemType } from '@/shared/types/models'

import { menuItems } from '@/shared/config/menu'
import { useSidebar } from '@/shared/utils/use-sidebar'

import MenuItem from './MenuItem.vue'

const { isSidebarCollapsed } = useSidebar()

const route = useRoute()
const { t } = useI18n()
const expandedMenus = ref<Set<string>>(new Set())

/**
 * Recursively find all parent menu IDs that contain the given route
 */
function findParentMenuIds(
  items: MenuItemType[],
  targetRoute: string,
  parentIds: string[] = [],
): string[] | null {
  for (const item of items) {
    // If this item has the target route, return all parent IDs
    if (item.route === targetRoute) {
      return parentIds
    }

    // If this item has children, search recursively
    if (item.children) {
      const found = findParentMenuIds(item.children, targetRoute, [...parentIds, item.id])
      if (found !== null) {
        return found
      }
    }
  }

  return null
}

/**
 * Initialize expanded menus based on current route
 */
function initializeExpandedMenus() {
  const parentIds = findParentMenuIds(menuItems, route.path)
  expandedMenus.value = new Set(parentIds || [])
}

function toggleMenu(id: string) {
  expandedMenus.value.has(id) ? expandedMenus.value.delete(id) : expandedMenus.value.add(id)
}

// Initialize on mount and watch route changes
onMounted(() => {
  initializeExpandedMenus()
})

watch(
  () => route.path,
  () => {
    initializeExpandedMenus()
  },
)
</script>

<template>
  <aside
    class="bg-(--color-menu-bg) border-r rtl:border-l border-(--color-menu-border) flex flex-col transition-all duration-300 ease-in-out"
    :class="[isSidebarCollapsed ? 'w-20' : 'w-64']"
    :aria-label="t('layout.sidebar.label')"
  >
    <!-- Logo -->
    <div class="h-16 flex items-center px-4 border-b border-(--color-menu-border)">
      <RouterLink to="/" class="overflow-hidden">
        <img
          v-if="!isSidebarCollapsed"
          src="@/assets/images/logo.svg"
          :alt="t('layout.sidebar.logoAlt')"
          class="h-8 w-auto transition-all duration-300 ltr:ml-6 rtl:mr-6"
        >
        <img
          v-else
          src="@/assets/images/logo-mini.svg"
          :alt="t('layout.sidebar.logoAlt')"
          class="h-8 w-auto transition-all duration-300"
        >
      </RouterLink>
    </div>

    <!-- Navigation -->
    <nav
      class="flex-1 overflow-y-auto py-4 sidebar-scrollbar ltr:font-montserrat rtl:font-dana"
      :aria-label="t('layout.sidebar.navigation')"
    >
      <ul class="space-y-1 px-2">
        <MenuItem
          v-for="item in menuItems"
          :key="item.id"
          :item="item"
          :expanded-menus="expandedMenus"
          :is-collapsed="isSidebarCollapsed"
          @toggle="toggleMenu"
        />
      </ul>
    </nav>
  </aside>
</template>
