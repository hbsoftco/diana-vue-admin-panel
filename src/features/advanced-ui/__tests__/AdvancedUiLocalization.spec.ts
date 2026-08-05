import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'

import { testI18n } from '@/shared/ui/base/__tests__/setup'

import AccordionDemo from '../accordion/ui/AccordionDemo.vue'
import NavbarDemo from '../navbar/ui/NavbarDemo.vue'

describe('advanced UI showcase localization', () => {
  it('updates showcase and placeholder copy when the locale changes', async () => {
    const navbar = mount(NavbarDemo)

    expect(navbar.text()).toContain('Navbar component demo is coming soon')

    testI18n.global.locale.value = 'fa'
    await nextTick()

    expect(navbar.text()).toContain('نمایش مؤلفه نوار ناوبری')
  })

  it('updates accordion data and open-item labels when the locale changes', async () => {
    testI18n.global.locale.value = 'en'
    const accordion = mount(AccordionDemo)

    expect(accordion.text()).toContain('Account settings')
    expect(accordion.text()).toContain('Open items: Account settings, Shipping and delivery')

    testI18n.global.locale.value = 'fa'
    await nextTick()

    expect(accordion.text()).toContain('تنظیمات حساب')
    expect(accordion.text()).toContain('آیتم‌های باز: تنظیمات حساب, ارسال و تحویل')
  })
})
