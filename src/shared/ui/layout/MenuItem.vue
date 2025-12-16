<script setup lang="ts">
import IconCircle from '~icons/material-symbols/circle'
import IconCircleOutline from '~icons/material-symbols/circle-outline'
import IconMdiChevronRight from '~icons/mdi/chevron-right'
import { RouterLink, useRoute } from 'vue-router'

import type { MenuItem } from '@/shared/types/models'

type Props = {
  item: MenuItem
  level?: number
  expandedMenus: Set<string>
}

const props = withDefaults(defineProps<Props>(), {
  level: 1,
})

const emit = defineEmits<{
  toggle: [id: string]
}>()

const route = useRoute()

/**
 * Recursively check if a menu item or any of its children has the active route
 */
function hasActiveChild(item: MenuItem): boolean {
  if (item.route === route.path) {
    return true
  }

  if (item.children) {
    return item.children.some(child => hasActiveChild(child))
  }

  return false
}

const isExpanded = () => props.expandedMenus.has(props.item.id)
const hasActiveRoute = () => (props.item.children ? hasActiveChild(props.item) : false)
const getIcon = () => (props.item.route === route.path ? IconCircle : IconCircleOutline)

function isActive() {
  return props.item.route === route.path || hasActiveRoute()
}

// Dynamic classes based on level
function getLevelClasses() {
  const baseClasses = {
    parent:
      'flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer hover:bg-(--color-bg-hover) transition-colors text-menu-prime',
    link: 'flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-(--color-bg-hover) transition-colors',
    icon: props.level === 1 ? 'text-lg' : props.level === 2 ? 'text-[.4rem]' : 'text-[.4rem]',
    text: props.level === 1 ? 'text-[.85rem]' : props.level === 2 ? 'text-[.78rem]' : 'text-xs',
  }
  return baseClasses
}

const classes = getLevelClasses()
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
        },
      ]"
      @click="emit('toggle', item.id)"
    >
      <div class="flex items-center gap-3">
        <component :is="item.icon" class="text-lg" :class="{ 'text-white': hasActiveRoute() }" />
        <span :class="classes.text">{{ $t(item.label) }}</span>
      </div>
      <IconMdiChevronRight
        class="text-[13.6px] transition-transform"
        :class="{ 'rotate-90': isExpanded(), 'text-white': hasActiveRoute() }"
      />
    </div>

    <!-- Item without children -->
    <RouterLink
      v-else-if="item.route"
      :to="item.route"
      :class="[
        classes.link,
        level === 1 ? '' : 'text-menu-prime',
        { 'font-semibold': route.path === item.route },
      ]"
      :active-class="level === 1 ? 'text-menu-prime' : 'text-white'"
    >
      <component :is="getIcon()" :class="classes.icon" />
      <span :class="classes.text">{{ item.label }}</span>
    </RouterLink>

    <!-- Recursive children -->
    <Transition name="collapse">
      <ul
        v-if="item.children && isExpanded()"
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
          @toggle="emit('toggle', $event)"
        />
      </ul>
    </Transition>
  </li>
</template>

<style scoped>
.collapse-enter-active {
  transition: all 0.3s ease-out;
  overflow: hidden;
}

.collapse-leave-active {
  transition: all 0.2s ease-in;
  overflow: hidden;
}

.collapse-enter-from,
.collapse-leave-to {
  max-height: 0;
  opacity: 0;
}

.collapse-enter-to,
.collapse-leave-from {
  max-height: 500px;
  opacity: 1;
}
</style>
