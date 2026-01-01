<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

import type { MenuItem } from '@/shared/types/models'

import DiIcon from '@/shared/ui/base/DiIcon.vue'

type Props = {
  item: MenuItem
  level?: number
  expandedMenus: Set<string>
  isCollapsed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  level: 1,
  isCollapsed: false,
})

const emit = defineEmits<{
  toggle: [id: string]
}>()

const route = useRoute()

/**
 * Recursively check if a menu item or any of its children has the active route
 */
function hasActiveChild(item: MenuItem): boolean {
  if (item.route === route.path)
    return true
  if (item.children)
    return item.children.some(child => hasActiveChild(child))
  return false
}

const isExpanded = () => props.expandedMenus.has(props.item.id)
const hasActiveRoute = () => (props.item.children ? hasActiveChild(props.item) : false)
const isActive = () => props.item.route === route.path || hasActiveRoute()

// Dynamic classes based on level
function getLevelClasses() {
  return {
    parent:
      'flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer hover:bg-(--color-bg-hover) transition-colors text-menu-prime',
    link: 'flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-(--color-bg-hover) transition-colors',
    icon: props.level === 1 ? 'text-lg' : props.level === 2 ? 'text-sm' : 'text-xs',
    text: props.level === 1 ? 'text-[0.85rem]' : props.level === 2 ? 'text-[0.78rem]' : 'text-xs',
  }
}

const classes = getLevelClasses()

// Tooltip content for collapsed state
const tooltipContent = computed(() =>
  props.item.label.startsWith('menu.') ? props.item.label : props.item.label,
)

// Show children only when not collapsed or when it's a nested item
const shouldShowChildren = computed(() => !props.isCollapsed || props.level > 1)

// Return DiIcon name based on active route
const getIconName = () => (props.item.route === route.path ? 'circle' : 'circleOutline')
</script>

<template>
  <li>
    <!-- Parent with children -->
    <div
      v-if="item.children"
      :class="[
        classes.parent,
        {
          'bg-(--color-bg-hover)': isExpanded(),
          'font-semibold text-white': isActive(),
          'justify-center': isCollapsed && level === 1,
        },
      ]"
      :title="isCollapsed && level === 1 ? $t(tooltipContent) : ''"
      @click="emit('toggle', item.id)"
    >
      <div
        class="flex items-center gap-3"
        :class="{ 'justify-center': isCollapsed && level === 1 }"
      >
        <DiIcon
          :name="item.icon || getIconName()"
          size="lg"
          :color="hasActiveRoute() ? 'white' : 'default'"
        />
        <span v-if="!isCollapsed || level > 1" :class="classes.text">{{ $t(item.label) }}</span>
      </div>

      <DiIcon
        v-if="!isCollapsed || level > 1"
        name="chevronRight"
        :rotate="isExpanded() ? 90 : 0"
        :color="hasActiveRoute() ? 'white' : 'default'"
        size="0.85rem"
      />
    </div>

    <!-- Item without children -->
    <RouterLink
      v-else-if="item.route"
      :to="item.route"
      :class="[
        classes.link,
        level === 1 ? '' : 'text-menu-prime',
        {
          'font-semibold': route.path === item.route,
          'justify-center': isCollapsed && level === 1,
        },
      ]"
      :active-class="level === 1 ? 'text-menu-prime' : 'text-white'"
      :title="isCollapsed && level === 1 ? item.label : ''"
    >
      <DiIcon :name="getIconName()" size="5px" :color="isActive() ? 'white' : 'default'" />
      <span v-if="!isCollapsed || level > 1" :class="classes.text">{{ item.label }}</span>
    </RouterLink>

    <!-- Recursive children -->
    <Transition name="collapse">
      <ul
        v-if="item.children && isExpanded() && shouldShowChildren"
        class="mt-1 space-y-1 border-(--color-menu-border) overflow-hidden"
        :class="[
          level === 1
            ? 'ltr:ml-4 rtl:mr-4 ltr:border-l-2 rtl:border-r-2 ltr:pl-2 rtl:pr-2'
            : 'ml-4 border-l-2 pl-2',
        ]"
      >
        <MenuItem
          v-for="child in item.children"
          :key="child.id"
          :item="child"
          :level="level + 1"
          :expanded-menus="expandedMenus"
          :is-collapsed="isCollapsed"
          @toggle="emit('toggle', $event)"
        />
      </ul>
    </Transition>
  </li>
</template>
