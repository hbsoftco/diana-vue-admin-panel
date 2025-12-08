<script setup lang="ts">
import IconCircle from '~icons/material-symbols/circle'
import IconCircleOutline from '~icons/material-symbols/circle-outline'
import IconMaterialSymbolsHomeOutlineRounded from '~icons/material-symbols/home-outline-rounded'
import IconMdiChevronRight from '~icons/mdi/chevron-right'
import IconMdiFolderMultiple from '~icons/mdi/folder-multiple'
import IconMdiPackageVariant from '~icons/mdi/package-variant'
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import type { MenuItem } from '@/shared/types/models'

const route = useRoute()

const menuItems = ref<MenuItem[]>([
  {
    id: 'dashboards',
    label: 'menu.dashboards',
    icon: IconMaterialSymbolsHomeOutlineRounded,
    children: [
      { id: 'crm', label: 'CRM', route: '/dashboards/crm' },
      { id: 'ecommerce', label: 'Ecommerce', route: '/dashboards/ecommerce' },
    ],
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: IconMdiFolderMultiple,
    children: [
      { id: 'all-projects', label: 'All Projects', route: '/projects' },
      { id: 'active', label: 'Active', route: '/projects/active' },
      {
        id: 'archived',
        label: 'Archived',
        icon: IconMdiPackageVariant,
        children: [
          { id: 'archived-2023', label: '2023', route: '/projects/archived/2023' },
          { id: 'archived-2024', label: '2024', route: '/projects/archived/2024' },
        ],
      },
    ],
  },
])

const expandedMenus = ref<Set<string>>(new Set())

function toggleMenu(id: string) {
  if (expandedMenus.value.has(id))
    expandedMenus.value.delete(id)
  else expandedMenus.value.add(id)
}

const isExpanded = (id: string) => expandedMenus.value.has(id)

function getIcon(item: MenuItem) {
  if (item.route && item.route === route.path)
    return IconCircle
  return IconCircleOutline
}
</script>

<template>
  <aside class="w-64 bg-menu-bg border-r rtl:border-l border-base-300 flex flex-col">
    <!-- Logo -->
    <div class="h-16 flex items-center px-4 border-b border-base-300">
      <div class="flex items-center gap-2">
        <div
          class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-content font-bold"
        >
          D
        </div>
        <span class="font-semibold text-lg">Diana</span>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto py-4">
      <ul class="space-y-1 px-2">
        <li v-for="item in menuItems" :key="item.id">
          <!-- Parent with children -->
          <div
            v-if="item.children"
            class="flex items-center justify-between font-medium px-3 py-2.5 rounded-lg cursor-pointer hover:bg-[#27272a] transition-colors text-menu-prime"
            :class="{ 'bg-[#27272a] font-bold': isExpanded(item.id) }"
            @click="toggleMenu(item.id)"
          >
            <div class="flex items-center gap-3">
              <component :is="item.icon" class="text-lg" />
              <span class="text-[.85rem] font-medium">{{ $t(item.label) }}</span>
            </div>
            <IconMdiChevronRight
              class="text-[13.6px] transition-transform"
              :class="{ 'rotate-90': isExpanded(item.id) }"
            />
          </div>

          <!-- Parent without children -->
          <RouterLink
            v-else-if="item.route"
            :to="item.route"
            class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-200 transition-colors text-menu-prime"
            active-class="bg-primary text-primary-content"
          >
            <component :is="getIcon(item)" class="text-lg" />
            <span class="text-[.85rem] font-medium">{{ $t(item.label) }}</span>
          </RouterLink>

          <!-- Level 2 -->
          <ul
            v-if="item.children && isExpanded(item.id)"
            class="mt-1 ltr:ml-4 rtl:mr-4 space-y-1 ltr:border-l-2 rtl:border-r-2 border-base-300 ltr:pl-2 rtl:pr-2"
          >
            <li v-for="child in item.children" :key="child.id">
              <!-- Level 2 parent -->
              <div
                v-if="child.children"
                class="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-[#27272a] transition-colors text-sm"
                :class="{ 'bg-[#27272a]': isExpanded(child.id) }"
                @click="toggleMenu(child.id)"
              >
                <div class="flex items-center gap-3">
                  <component :is="child.icon" class="text-sm" />
                  <span class="text-[.85rem]">{{ child.label }}</span>
                </div>
                <IconMdiChevronRight
                  class="text-xs transition-transform"
                  :class="{ 'rotate-90': isExpanded(child.id) }"
                />
              </div>

              <!-- Level 2 child without children -->
              <RouterLink
                v-else-if="child.route"
                :to="child.route"
                class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-200 transition-colors text-sm"
                active-class="text-white"
              >
                <component :is="getIcon(child)" class="text-[.4rem]" />
                <span class="text-[.78rem]">{{ child.label }}</span>
              </RouterLink>

              <!-- Level 3 -->
              <ul
                v-if="child.children && isExpanded(child.id)"
                class="mt-1 ml-4 space-y-1 border-l-2 border-base-300 pl-2"
              >
                <li v-for="grandchild in child.children" :key="grandchild.id">
                  <RouterLink
                    v-if="grandchild.route"
                    :to="grandchild.route"
                    class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-base-200 transition-colors text-xs"
                    active-class="text-white"
                  >
                    <component :is="getIcon(grandchild)" class="text-[.4rem]" />
                    <span>{{ grandchild.label }}</span>
                  </RouterLink>
                </li>
              </ul>
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
