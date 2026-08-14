import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'

import { testI18n } from '@/shared/ui/base/__tests__/setup'

import AccordionDemo from '../accordion/ui/AccordionDemo.vue'
import NavbarDemo from '../navbar/ui/NavbarDemo.vue'

describe('advanced UI showcase localization', () => {
  it('updates showcase and placeholder copy when the locale changes', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/dashboards/crm', component: { template: '<div />' } },
        { path: '/ui-elements/buttons', component: { template: '<div />' } },
      ],
    })
    await router.push('/dashboards/crm')
    await router.isReady()
    const navbar = mount(NavbarDemo, { global: { plugins: [router] } })

    expect(navbar.text()).toContain('Grouped sidebar menu')
    expect(navbar.text()).toContain('Main')

    testI18n.global.locale.value = 'fa'
    await nextTick()

    expect(navbar.text()).toContain('منوی کناری گروه‌بندی‌شده')
    expect(navbar.text()).toContain('اصلی')
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
