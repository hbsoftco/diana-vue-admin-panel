import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { coreIconRegistry, lazyIconRegistry } from '@/shared/icons/registry'
import DiIcon from '@/shared/ui/base/DiIcon.vue'

describe('diIcon', () => {
  it('keeps core and lazy icon names unique', () => {
    const coreIconNames = Object.keys(coreIconRegistry)
    const lazyIconNames = Object.keys(lazyIconRegistry)

    expect(coreIconNames).toHaveLength(32)
    expect(lazyIconNames).toHaveLength(29)
    expect(coreIconNames.filter(name => lazyIconNames.includes(name))).toEqual([])
  })

  it('renders a core icon synchronously', () => {
    const wrapper = mount(DiIcon, {
      props: { name: 'menu' },
    })

    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('keeps lazy icons as loadable Vue components', async () => {
    const iconModule = await lazyIconRegistry.calendarDays()

    expect(iconModule.default).toBeDefined()
  })
})
