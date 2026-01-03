<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'

import type { IconName } from '@/shared/icons/registry'

import { useDirection } from '@/shared/composables/use-direction'
import DiIcon from '@/shared/ui/base/DiIcon.vue'

/* =======================
   Defaults
======================= */
const props = withDefaults(defineProps<Props>(), {
  separator: 'chevronDoubleRight',
  separatorColor: 'text-base-content/10',
  variant: 'primary',
  showHome: false,
  homeIcon: 'homeOutlineRounded',
  customClass: '',
})

const { t } = useI18n()

const { isRtl } = useDirection()
/* =======================
   Types
======================= */
export type BreadcrumbItem = {
  label: string
  to?: string
  icon?: IconName
  active?: boolean
}

export type BreadcrumbVariant
  = | 'primary'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'

type Props = {
  items: BreadcrumbItem[]
  separator?: IconName
  separatorColor?: string
  variant?: BreadcrumbVariant
  showHome?: boolean
  homeIcon?: IconName
  customClass?: string
}

/* =======================
   Variant Colors
======================= */
const VARIANT_COLORS = {
  primary: {
    inactive: 'text-primary',
    active: 'text-primary',
  },
  secondary: {
    inactive: 'text-secondary',
    active: 'text-secondary',
  },
  accent: {
    inactive: 'text-accent',
    active: 'text-accent',
  },
  info: {
    inactive: 'text-info',
    active: 'text-info',
  },
  success: {
    inactive: 'text-success',
    active: 'text-success',
  },
  warning: {
    inactive: 'text-warning',
    active: 'text-warning',
  },
  error: {
    inactive: 'text-error',
    active: 'text-error',
  },
}

/* =======================
   Computed
======================= */
const breadcrumbItems = computed(() => {
  if (props.showHome && props.items.length > 0 && props.items[0]?.label !== 'Home') {
    return [
      { label: t('features.ui-elements.breadcrumb.home'), icon: props.homeIcon, to: '/' },
      ...props.items,
    ]
  }
  return props.items
})

const isIconSeparator = computed(() => {
  return props.separator && props.separator.length > 0 && !props.separator.includes('/')
})

const colors = computed(() => VARIANT_COLORS[props.variant])

function getItemColor(item: BreadcrumbItem, index: number) {
  return item.active || index === breadcrumbItems.value.length - 1
    ? colors.value.active
    : colors.value.inactive
}

function isLastItem(index: number) {
  return index === breadcrumbItems.value.length - 1
}
</script>

<template>
  <nav aria-label="Breadcrumb" :class="[customClass]">
    <ol class="flex items-center space-x-2">
      <template v-for="(item, index) in breadcrumbItems" :key="index">
        <!-- Breadcrumb Item -->
        <li class="flex items-center">
          <!-- Link Item -->
          <RouterLink
            v-if="item.to && !isLastItem(index)"
            :to="item.to"
            class="inline-flex items-center gap-1.5 text-di-sm font-medium transition-colors no-underline"
            :class="getItemColor(item, index)"
          >
            <DiIcon
              v-if="item.icon"
              :name="item.icon"
              size="text-di-sm"
              :color="getItemColor(item, index)"
            />
            <span>{{ item.label }}</span>
          </RouterLink>

          <!-- Current/Active Item (no link) -->
          <span
            v-else
            class="inline-flex items-center gap-1.5 text-di-sm font-medium"
            :class="getItemColor(item, index)"
            :aria-current="item.active || isLastItem(index) ? 'page' : undefined"
          >
            <span class="text-base-content font-semibold">{{ item.label }}</span>
          </span>
        </li>

        <!-- Separator -->
        <li v-if="index < breadcrumbItems.length - 1" class="flex items-center" aria-hidden="true">
          <DiIcon
            v-if="isIconSeparator"
            :rotate="isRtl ? 180 : 0"
            size="xs"
            :name="separator as IconName"
            :custom-class="separatorColor"
          />
          <span v-else class="text-sm" :class="separatorColor">
            {{ separator }}
          </span>
        </li>
      </template>
    </ol>
  </nav>
</template>
