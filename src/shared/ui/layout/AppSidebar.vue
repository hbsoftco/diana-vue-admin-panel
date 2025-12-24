<script setup lang="ts">
import IconMaterialSymbolsHomeOutlineRounded from '~icons/material-symbols/home-outline-rounded'
import IconMdiTokenElement from '~icons/oui/token-element'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import type { MenuItem as MenuItemType } from '@/shared/types/models'

import { useSidebar } from '@/shared/utils/use-sidebar'

import MenuItem from './MenuItem.vue'

const { isSidebarCollapsed } = useSidebar()

const menuItems = ref<MenuItemType[]>([
  {
    id: 'dashboards',
    label: 'menu.dashboards',
    icon: IconMaterialSymbolsHomeOutlineRounded,
    children: [
      { id: 'crm', label: 'CRM', route: '/dashboards/crm' },
      { id: 'ecommerce', label: 'Ecommerce', route: '/dashboards/ecommerce' },
      { id: 'analytics', label: 'Analytics', route: '/dashboards/analytics' },
      { id: 'courses', label: 'Courses', route: '/dashboards/courses' },
      { id: 'crypto', label: 'Crypto', route: '/dashboards/crypto' },
      { id: 'hrm', label: 'HRM', route: '/dashboards/hrm' },
      { id: 'jobs', label: 'Jobs', route: '/dashboards/jobs' },
      { id: 'nft', label: 'NFT', route: '/dashboards/nft' },
      { id: 'personal', label: 'Personal', route: '/dashboards/personal' },
      { id: 'projects', label: 'Projects', route: '/dashboards/projects' },
      { id: 'sales', label: 'Sales', route: '/dashboards/sales' },
      { id: 'stocks', label: 'Stocks', route: '/dashboards/stocks' },
    ],
  },
  {
    id: 'ui-elements',
    label: 'UI Elements',
    icon: IconMdiTokenElement,
    children: [
      { id: 'alerts', label: 'Alerts', route: '/ui-elements/alerts' },
      { id: 'badge', label: 'Badge', route: '/ui-elements/badge' },
      { id: 'breadcrumb', label: 'Breadcrumb', route: '/ui-elements/breadcrumb' },
      { id: 'buttons', label: 'Buttons', route: '/ui-elements/buttons' },
      { id: 'button-group', label: 'Button Group', route: '/ui-elements/button-group' },
      { id: 'cards', label: 'Cards', route: '/ui-elements/cards' },
      { id: 'dropdowns', label: 'Dropdowns', route: '/ui-elements/dropdowns' },
      { id: 'images-figures', label: 'Images & Figures', route: '/ui-elements/images-figures' },
      {
        id: 'links-interactions',
        label: 'Links & Interactions',
        route: '/ui-elements/links-interactions',
      },
      { id: 'list-group', label: 'List Group', route: '/ui-elements/list-group' },
      { id: 'navs-tabs', label: 'Navs & Tabs', route: '/ui-elements/navs-tabs' },
      { id: 'object-fit', label: 'Object Fit', route: '/ui-elements/object-fit' },
      { id: 'pagination', label: 'Pagination', route: '/ui-elements/pagination' },
      { id: 'popovers', label: 'Popovers', route: '/ui-elements/popovers' },
      { id: 'progress', label: 'Progress', route: '/ui-elements/progress' },
      { id: 'spinners', label: 'Spinners', route: '/ui-elements/spinners' },
      { id: 'toasts', label: 'Toasts', route: '/ui-elements/toasts' },
      { id: 'tooltips', label: 'Tooltips', route: '/ui-elements/tooltips' },
      { id: 'typography', label: 'Typography', route: '/ui-elements/typography' },
    ],
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: IconMdiTokenElement,
    children: [
      { id: 'all-projects', label: 'All Projects', route: '/projects' },
      { id: 'active', label: 'Active', route: '/projects/active' },
      {
        id: 'archived',
        label: 'Archived',
        icon: IconMdiTokenElement,
        children: [
          { id: 'archived-2023', label: '2023', route: '/projects/archived/2023' },
          { id: 'archived-2024', label: '2024', route: '/projects/archived/2024' },
        ],
      },
    ],
  },
])

const route = useRoute()
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
  const parentIds = findParentMenuIds(menuItems.value, route.path)
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
  >
    <!-- Logo -->
    <div class="h-16 flex items-center px-4 border-b border-(--color-menu-border)">
      <RouterLink to="/" class="overflow-hidden">
        <img
          v-if="!isSidebarCollapsed"
          src="@/assets/images/logo.png"
          alt="Diana Logo"
          class="h-8 w-auto transition-all duration-300 ltr:ml-6 rtl:mr-6"
        >
        <img
          v-else
          src="@/assets/images/logo-mini.png"
          alt="Diana Logo"
          class="h-8 w-auto transition-all duration-300"
        >
      </RouterLink>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto py-4 sidebar-scrollbar ltr:font-montserrat rtl:font-dana">
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
