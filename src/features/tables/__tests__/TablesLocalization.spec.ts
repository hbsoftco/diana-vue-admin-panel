import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'

import type { MenuItem, MenuNavigationItem } from '@/shared/types/models'

import { menuItems } from '@/shared/config/menu'
import { testI18n } from '@/shared/ui/base/__tests__/setup'

import DataTablesPage from '../data-tables/DataTablesPage.vue'
import GridJsTablesPage from '../grid-js-tables/GridJsTablesPage.vue'
import TablesDemo from '../tables/ui/TablesDemo.vue'

const previewCodeCardStub = {
  props: ['title'],
  template: '<section><h2>{{ title }}</h2><slot /></section>',
}

function findById(items: MenuItem[], id: string): MenuNavigationItem | undefined {
  for (const item of items) {
    if (item.id === id && item.type !== 'label')
      return item
    if ('children' in item && item.children) {
      const match = findById(item.children, id)
      if (match)
        return match
    }
  }
  return undefined
}

describe('tables & charts sidebar section', () => {
  it('adds a non-clickable "Tables & Charts" group label', () => {
    const label = menuItems.find(item => item.type === 'label' && item.id === 'tables-charts-label')

    expect(label).toBeDefined()
    expect(label?.label).toBe('menu.groups.tablesCharts')
  })

  it('nests Tables, Grid JS Tables, and Data Tables under an expandable "Tables" item', () => {
    const tables = findById(menuItems, 'tables')

    expect(tables).toBeDefined()
    expect(tables?.icon).toBe('table')
    expect(tables?.route).toBeUndefined()
    expect(tables?.children?.map(child => child.type !== 'label' && child.route)).toEqual([
      '/tables/tables',
      '/tables/grid-js-tables',
      '/tables/data-tables',
    ])
  })

  it('gives each child a distinct, non-generic icon', () => {
    const tablesChild = findById(menuItems, 'tables-tables')
    const gridJs = findById(menuItems, 'tables-grid-js-tables')
    const dataTables = findById(menuItems, 'tables-data-tables')

    expect(tablesChild?.icon).toBe('table')
    expect(gridJs?.icon).toBe('layoutGrid')
    expect(dataTables?.icon).toBe('tableOptions')
  })
})

describe('tables showcase page', () => {
  it('renders every section and localizes them at runtime', async () => {
    const wrapper = mount(TablesDemo, {
      global: { stubs: { PreviewCodeCard: previewCodeCardStub } },
    })

    expect(wrapper.text()).toContain('Basic Tables')
    expect(wrapper.text()).toContain('Always Responsive')
    expect(wrapper.text()).toContain('Nested Table')
    // Every table is wrapped in the responsive overflow wrapper.
    expect(wrapper.findAll('table').length).toBeGreaterThan(0)
    expect(wrapper.findAll('.overflow-x-auto').length).toBeGreaterThan(0)

    testI18n.global.locale.value = 'fa'
    await nextTick()

    expect(wrapper.text()).toContain('جدول‌های پایه')
  })
})

describe('grid js tables and data tables stubs', () => {
  it('render a coming-soon placeholder rather than real content', () => {
    const gridJs = mount(GridJsTablesPage)
    const dataTables = mount(DataTablesPage)

    expect(gridJs.text()).toContain('Grid JS Tables')
    expect(gridJs.text()).toContain('coming soon')
    expect(dataTables.text()).toContain('Data Tables')
    expect(dataTables.text()).toContain('coming soon')
  })
})
