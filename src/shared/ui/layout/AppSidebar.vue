<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import type { MenuItem as MenuItemType } from '@/shared/types/models'

import { menuItems } from '@/shared/config/menu'
import DiDrawer from '@/shared/ui/base/DiDrawer.vue'
import { useSidebar } from '@/shared/utils/use-sidebar'

import MenuItem from './MenuItem.vue'

const { canHover, closeMobileSidebar, isDesktop, isDesktopSidebarCollapsed, isMobileSidebarOpen }
  = useSidebar()

const route = useRoute()
const { t } = useI18n()
const expandedMenus = ref<Set<string>>(new Set())
const collapsedInlineMenus = ref<Set<string>>(new Set())

const isDesktopCollapsed = computed(() => isDesktop.value && isDesktopSidebarCollapsed.value)
const flyoutEnabled = computed(() => isDesktopCollapsed.value && canHover.value)
const usesCollapsedInlineMenus = computed(() => isDesktopCollapsed.value && !canHover.value)
const visibleExpandedMenus = computed(() =>
  usesCollapsedInlineMenus.value ? collapsedInlineMenus.value : expandedMenus.value,
)

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

function toggleId(target: Set<string>, id: string) {
  const next = new Set(target)
  next.has(id) ? next.delete(id) : next.add(id)
  return next
}

function toggleMenu(id: string) {
  if (usesCollapsedInlineMenus.value)
    collapsedInlineMenus.value = toggleId(collapsedInlineMenus.value, id)
  else expandedMenus.value = toggleId(expandedMenus.value, id)
}

function handleNavigate() {
  closeMobileSidebar()
}

watch(
  () => route.path,
  () => {
    initializeExpandedMenus()
    collapsedInlineMenus.value = new Set()
    closeMobileSidebar()
  },
  { immediate: true },
)

watch(usesCollapsedInlineMenus, (isActive) => {
  if (!isActive)
    collapsedInlineMenus.value = new Set()
})
</script>

<template>
  <DiDrawer
    v-model="isMobileSidebarOpen"
    position="start"
    open-at="lg"
    :label="t('layout.sidebar.label')"
    :close-overlay-label="t('layout.sidebar.closeMobile')"
    content-class="min-w-0"
    custom-class="h-screen bg-(--color-bg-background)"
  >
    <template #content>
      <slot />
    </template>

    <template #side>
      <aside
        class="flex h-full shrink-0 flex-col border-e border-(--color-menu-border) bg-(--color-menu-bg) transition-[width] duration-300 ease-in-out motion-reduce:transition-none"
        :class="isDesktopCollapsed ? 'w-20' : 'w-64'"
        :aria-label="t('layout.sidebar.label')"
      >
        <div class="flex h-16 items-center border-b border-(--color-menu-border) px-4">
          <RouterLink to="/" class="overflow-hidden" @click="handleNavigate">
            <img
              v-if="!isDesktopCollapsed"
              src="@/assets/images/logo.svg"
              :alt="t('layout.sidebar.logoAlt')"
              class="ms-6 h-8 w-auto transition-all duration-300 motion-reduce:transition-none"
            >
            <img
              v-else
              src="@/assets/images/logo-mini.svg"
              :alt="t('layout.sidebar.logoAlt')"
              class="h-8 w-auto transition-all duration-300 motion-reduce:transition-none"
            >
          </RouterLink>
        </div>

        <nav
          class="sidebar-scrollbar flex-1 overflow-y-auto py-4 ltr:font-montserrat rtl:font-dana"
          :aria-label="t('layout.sidebar.navigation')"
        >
          <ul class="space-y-1 px-2">
            <MenuItem
              v-for="item in menuItems"
              :key="item.id"
              :item="item"
              :expanded-menus="visibleExpandedMenus"
              :is-collapsed="isDesktopCollapsed"
              :flyout-enabled="flyoutEnabled"
              @toggle="toggleMenu"
              @navigate="handleNavigate"
            />
          </ul>
        </nav>
      </aside>
    </template>
  </DiDrawer>
</template>
