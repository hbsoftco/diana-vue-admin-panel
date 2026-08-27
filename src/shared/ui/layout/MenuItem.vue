<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useId, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink, useRoute } from 'vue-router'

import type { MenuItem, MenuNavigationItem } from '@/shared/types/models'
import type { DiPopoverPlacement } from '@/shared/ui/base/popover'

import { useDirection } from '@/shared/composables/use-direction'
import { isMenuLabel } from '@/shared/types/models'
import DiIcon from '@/shared/ui/base/DiIcon.vue'
import { DiPopover } from '@/shared/ui/base/popover'

type Props = {
  item: MenuItem
  level?: number
  expandedMenus: Set<string>
  isCollapsed?: boolean
  flyoutEnabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  level: 1,
  isCollapsed: false,
  flyoutEnabled: false,
})

const emit = defineEmits<{
  toggle: [id: string]
  navigate: []
}>()

const route = useRoute()
const { t } = useI18n()
const { isRtl } = useDirection()
const submenuId = `menu-item-${useId().split(':').join('')}`
const isFlyoutOpen = ref(false)
const focusFlyoutOnOpen = ref(false)

// Flyout descendants intentionally share one inline accordion instead of opening cascading
// flyouts. This keeps every level inside the first flyout until a cascading design is specified.
const flyoutExpandedMenus = ref<Set<string>>(new Set())
let flyoutCloseTimer: ReturnType<typeof setTimeout> | undefined

/**
 * Recursively check if a menu item or any of its children has the active route
 */
function hasActiveChild(item: MenuItem): boolean {
  if (isMenuLabel(item))
    return false

  if (item.route === route.path)
    return true
  if (item.children)
    return item.children.some(child => hasActiveChild(child))
  return false
}

const navigationItem = computed<MenuNavigationItem | null>(() =>
  isMenuLabel(props.item) ? null : props.item,
)
const isExpanded = () => props.expandedMenus.has(props.item.id)
function hasActiveRoute() {
  return navigationItem.value?.children ? hasActiveChild(navigationItem.value) : false
}
const isActive = () => navigationItem.value?.route === route.path || hasActiveRoute()
const usesFlyout = computed(
  () =>
    props.flyoutEnabled
    && props.isCollapsed
    && props.level === 1
    && Boolean(navigationItem.value?.children?.length),
)

// Dynamic classes based on level
function getLevelClasses() {
  return {
    parent:
      'flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-start text-menu-prime transition-colors hover:bg-(--color-bg-hover) motion-reduce:transition-none',
    link: 'flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-(--color-bg-hover) transition-colors motion-reduce:transition-none',
    icon: props.level === 1 ? 'text-lg' : props.level === 2 ? 'text-sm' : 'text-xs',
    text: props.level === 1 ? 'text-[0.85rem]' : props.level === 2 ? 'text-[0.78rem]' : 'text-xs',
  }
}

const classes = getLevelClasses()

// Tooltip content for collapsed state
const displayLabel = computed(() => t(props.item.label))
const directionIcon = computed(() => (isRtl.value ? 'chevronLeft' : 'chevronRight'))
const flyoutPlacement = computed<DiPopoverPlacement>(() =>
  isRtl.value ? 'left-start' : 'right-start',
)

// Return DiIcon name based on active route
const getIconName = () => (navigationItem.value?.route === route.path ? 'circle' : 'circleOutline')

function clearFlyoutCloseTimer() {
  if (flyoutCloseTimer === undefined)
    return

  clearTimeout(flyoutCloseTimer)
  flyoutCloseTimer = undefined
}

function openFlyout() {
  clearFlyoutCloseTimer()
  if (usesFlyout.value)
    isFlyoutOpen.value = true
}

function closeFlyout() {
  clearFlyoutCloseTimer()
  isFlyoutOpen.value = false
}

function scheduleFlyoutClose() {
  clearFlyoutCloseTimer()
  flyoutCloseTimer = setTimeout(closeFlyout, 150)
}

function handleFlyoutTriggerKeydown(event: KeyboardEvent) {
  if (!isFlyoutOpen.value && (event.key === 'Enter' || event.key === ' '))
    focusFlyoutOnOpen.value = true
}

function toggleFlyoutMenu(id: string) {
  const nextExpandedMenus = new Set(flyoutExpandedMenus.value)
  if (nextExpandedMenus.has(id))
    nextExpandedMenus.delete(id)
  else nextExpandedMenus.add(id)
  flyoutExpandedMenus.value = nextExpandedMenus
}

function handleNavigate() {
  closeFlyout()
  emit('navigate')
}

watch(usesFlyout, (enabled) => {
  if (!enabled)
    closeFlyout()
})

watch(
  () => route.path,
  () => closeFlyout(),
)

watch(isFlyoutOpen, (isOpen) => {
  if (!isOpen) {
    clearFlyoutCloseTimer()
    focusFlyoutOnOpen.value = false
    flyoutExpandedMenus.value = new Set()
  }
})

onBeforeUnmount(clearFlyoutCloseTimer)
</script>

<template>
  <li
    v-if="item.type === 'label'"
    data-menu-label
    class="text-start"
    :class="[
      isCollapsed && level === 1
        ? 'mx-3 my-3 border-t border-(--color-menu-border)'
        : 'mb-1 mt-5 px-3 text-[0.65rem] font-semibold tracking-[0.12em] text-menu-prime uppercase first:mt-1',
    ]"
  >
    <span v-if="!isCollapsed || level > 1">{{ displayLabel }}</span>
  </li>

  <li v-else-if="navigationItem">
    <!-- Collapsed desktop parent with a hover-capable pointer -->
    <DiPopover
      v-if="navigationItem.children && usesFlyout"
      v-model:open="isFlyoutOpen"
      trigger-tag="button"
      :aria-label="displayLabel"
      :placement="flyoutPlacement"
      :focus-on-open="focusFlyoutOnOpen"
      :show-arrow="false"
      content-class="overflow-hidden border-(--color-menu-border) bg-(--color-menu-bg)! text-menu-prime shadow-lg motion-safe:duration-200"
      body-class="flex min-h-0 flex-1 flex-col p-0"
      @keydown.capture="handleFlyoutTriggerKeydown"
    >
      <template #trigger>
        <span
          data-menu-flyout-trigger
          :class="[
            classes.parent,
            {
              'bg-(--color-bg-hover)': isFlyoutOpen,
              'font-semibold text-white': isActive(),
              'justify-center': isCollapsed && level === 1,
            },
          ]"
          :title="displayLabel"
          @mouseenter="openFlyout"
          @mouseleave="scheduleFlyoutClose"
        >
          <span class="flex items-center justify-center gap-3">
            <DiIcon
              :name="navigationItem.icon || getIconName()"
              size="lg"
              :color="hasActiveRoute() ? 'white' : 'default'"
            />
          </span>
        </span>
      </template>

      <div
        data-menu-flyout-content
        class="flex min-h-0 min-w-52 flex-1 flex-col p-2"
        @mouseenter="openFlyout"
        @mouseleave="scheduleFlyoutClose"
      >
        <p class="shrink-0 px-3 pb-2 pt-1 text-sm font-semibold">
          {{ displayLabel }}
        </p>
        <ul
          data-menu-flyout-list
          class="sidebar-scrollbar min-h-0 flex-1 space-y-1 overflow-y-auto"
        >
          <MenuItem
            v-for="child in navigationItem.children"
            :key="child.id"
            :item="child"
            :level="level + 1"
            :expanded-menus="flyoutExpandedMenus"
            @toggle="toggleFlyoutMenu"
            @navigate="handleNavigate"
          />
        </ul>
      </div>
    </DiPopover>

    <!-- Inline parent with children -->
    <button
      v-else-if="navigationItem.children"
      type="button"
      :class="[
        classes.parent,
        {
          'bg-(--color-bg-hover)': isExpanded(),
          'font-semibold text-white': isActive(),
          'justify-center': isCollapsed && level === 1,
        },
      ]"
      :title="isCollapsed && level === 1 ? displayLabel : ''"
      :aria-expanded="isExpanded()"
      :aria-controls="submenuId"
      @click="emit('toggle', item.id)"
    >
      <span
        class="flex items-center gap-3"
        :class="{ 'justify-center': isCollapsed && level === 1 }"
      >
        <DiIcon
          :name="navigationItem.icon || getIconName()"
          size="lg"
          :color="hasActiveRoute() ? 'white' : 'default'"
        />
        <span v-if="!isCollapsed || level > 1" :class="classes.text">{{ displayLabel }}</span>
      </span>

      <DiIcon
        v-if="!isCollapsed || level > 1"
        :name="directionIcon"
        :rotate="isExpanded() ? 90 : 0"
        :color="hasActiveRoute() ? 'white' : 'default'"
        size="0.85rem"
      />
    </button>

    <!-- Item without children -->
    <RouterLink
      v-else-if="navigationItem.route"
      :to="navigationItem.route"
      :class="[
        classes.link,
        level === 1 ? '' : 'text-menu-prime',
        {
          'font-semibold': route.path === navigationItem.route,
          'justify-center': isCollapsed && level === 1,
        },
      ]"
      :active-class="level === 1 ? 'text-menu-prime' : 'text-white'"
      :title="isCollapsed && level === 1 ? displayLabel : ''"
      @click="handleNavigate"
    >
      <DiIcon :name="getIconName()" size="5px" :color="isActive() ? 'white' : 'default'" />
      <span v-if="!isCollapsed || level > 1" :class="classes.text">{{ displayLabel }}</span>
    </RouterLink>

    <!-- Visible placeholder for a navigation destination that has not been implemented yet -->
    <span
      v-else-if="navigationItem.disabled"
      class="cursor-not-allowed opacity-50"
      :class="[classes.link, { 'justify-center': isCollapsed && level === 1 }]"
      :title="isCollapsed && level === 1 ? displayLabel : ''"
      aria-disabled="true"
    >
      <DiIcon :name="navigationItem.icon || 'circleOutline'" size="lg" />
      <span v-if="!isCollapsed || level > 1" :class="classes.text">{{ displayLabel }}</span>
    </span>

    <!-- Recursive inline children, including the no-hover collapsed fallback -->
    <Transition
      name="collapse"
      enter-active-class="collapse-enter-active motion-reduce:transition-none"
      leave-active-class="collapse-leave-active motion-reduce:transition-none"
    >
      <ul
        v-if="navigationItem.children && !usesFlyout && isExpanded()"
        :id="submenuId"
        class="ms-4 mt-1 space-y-1 overflow-hidden border-s-2 border-(--color-menu-border) ps-2"
      >
        <MenuItem
          v-for="child in navigationItem.children"
          :key="child.id"
          :item="child"
          :level="level + 1"
          :expanded-menus="expandedMenus"
          :is-collapsed="isCollapsed"
          @toggle="emit('toggle', $event)"
          @navigate="handleNavigate"
        />
      </ul>
    </Transition>
  </li>
</template>
