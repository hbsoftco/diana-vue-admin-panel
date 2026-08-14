<script setup lang="ts">
import type { MenuItem as MenuItemType } from '@/shared/types/models'

import MenuItem from '@/shared/ui/layout/MenuItem.vue'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

const groupedMenu: MenuItemType[] = [
  { type: 'label', id: 'demo-main', label: 'menu.groups.main' },
  {
    id: 'demo-dashboards',
    label: 'menu.dashboard',
    icon: 'homeOutlineRounded',
    children: [{ id: 'demo-crm', label: 'menu.crm', route: '/dashboards/crm' }],
  },
  { type: 'label', id: 'demo-components', label: 'menu.groups.components' },
  {
    id: 'demo-ui',
    label: 'menu.uiElements',
    icon: 'componentDropdown',
    children: [{ id: 'demo-buttons', label: 'menu.buttons', route: '/ui-elements/buttons' }],
  },
]

const expandedMenus = new Set(['demo-dashboards', 'demo-ui'])

const groupedMenuCode = `<script setup lang="ts">
import type { MenuItem } from '@/shared/types/models'

const items: MenuItem[] = [
  { type: 'label', id: 'main-label', label: 'menu.groups.main' },
  {
    id: 'dashboards',
    label: 'menu.dashboard',
    icon: 'homeOutlineRounded',
    children: [{ id: 'crm', label: 'menu.crm', route: '/dashboards/crm' }],
  },
]
<\/script>

<template>
  <ul>
    <MenuItem
      v-for="item in items"
      :key="item.id"
      :item="item"
      :expanded-menus="new Set(['dashboards'])"
    />
  </ul>
</template>`
</script>

<template>
  <div class="grid gap-6 xl:grid-cols-2">
    <PreviewCodeCard :title="$t('features.advancedUi.navbar.groupedMenu')" :code="groupedMenuCode">
      <nav
        class="mx-auto w-full max-w-72 rounded-lg bg-(--color-menu-bg) p-3 ltr:font-montserrat rtl:font-dana"
        :aria-label="$t('features.advancedUi.navbar.groupedMenu')"
      >
        <ul class="space-y-1">
          <MenuItem
            v-for="item in groupedMenu"
            :key="item.id"
            :item="item"
            :expanded-menus="expandedMenus"
          />
        </ul>
      </nav>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.advancedUi.navbar.collapsedMenu')"
      :show-code-button="false"
    >
      <nav
        class="mx-auto w-20 rounded-lg bg-(--color-menu-bg) p-2 ltr:font-montserrat rtl:font-dana"
        :aria-label="$t('features.advancedUi.navbar.collapsedMenu')"
      >
        <ul class="space-y-1">
          <MenuItem
            v-for="item in groupedMenu"
            :key="item.id"
            :item="item"
            :expanded-menus="new Set()"
            is-collapsed
          />
        </ul>
      </nav>
    </PreviewCodeCard>
  </div>
</template>
