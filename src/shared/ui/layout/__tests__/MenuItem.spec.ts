import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'

import { testI18n } from '../../base/__tests__/setup'
import MenuItem from '../MenuItem.vue'

const parentItem = {
  id: 'dashboards',
  label: 'menu.dashboard',
  icon: 'homeOutlineRounded' as const,
  children: [{ id: 'crm', label: 'menu.crm', route: '/dashboards/crm' }],
}

async function mountMenuItem() {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/dashboards/crm', component: { template: '<div />' } }],
  })

  await router.push('/dashboards/crm')
  await router.isReady()

  return mount(MenuItem, {
    props: {
      item: parentItem,
      expandedMenus: new Set<string>(),
    },
    global: {
      plugins: [router],
    },
  })
}

describe('menuItem direction indicator', () => {
  it('uses the right chevron in LTR and the left chevron in RTL', async () => {
    const wrapper = await mountMenuItem()
    const icons = () => wrapper.findAllComponents({ name: 'DiIcon' })
    const directionIcon = () => icons()[icons().length - 1]

    expect(directionIcon()?.props('name')).toBe('chevronRight')

    testI18n.global.locale.value = 'fa'
    await nextTick()

    expect(directionIcon()?.props('name')).toBe('chevronLeft')
  })
})
