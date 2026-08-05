import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'

import { testI18n } from '@/shared/ui/base/__tests__/setup'

import NavbarDemo from '../navbar/ui/NavbarDemo.vue'

describe('advanced UI showcase localization', () => {
  it('updates showcase and placeholder copy when the locale changes', async () => {
    const navbar = mount(NavbarDemo)

    expect(navbar.text()).toContain('Navbar component demo is coming soon')

    testI18n.global.locale.value = 'fa'
    await nextTick()

    expect(navbar.text()).toContain('نمایش مؤلفه نوار ناوبری')
  })
})
