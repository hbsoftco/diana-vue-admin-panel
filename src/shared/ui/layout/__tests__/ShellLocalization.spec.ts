import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'

import { testI18n } from '../../base/__tests__/setup'
import FullscreenToggle from '../FullscreenToggle.vue'
import Notifications from '../Notifications.vue'
import ThemeToggle from '../ThemeToggle.vue'

describe('application shell localization', () => {
  it('updates shell labels and notification content when the locale changes', async () => {
    const notifications = mount(Notifications)
    const themeToggle = mount(ThemeToggle)
    const fullscreenToggle = mount(FullscreenToggle)

    await notifications.get('button').trigger('click')

    expect(notifications.text()).toContain('New message')
    expect(notifications.text()).toContain('5 minutes ago')
    expect(themeToggle.get('button').attributes('aria-label')).toBe('Switch to dark theme')
    expect(fullscreenToggle.get('button').attributes('aria-label')).toBe('Enter fullscreen')

    testI18n.global.locale.value = 'fa'
    await nextTick()

    expect(notifications.text()).toContain('پیام جدید')
    expect(notifications.text()).toContain('5 دقیقه پیش')
    expect(themeToggle.get('button').attributes('aria-label')).toBe('تغییر به پوسته تاریک')
    expect(fullscreenToggle.get('button').attributes('aria-label')).toBe('ورود به تمام‌صفحه')
  })
})
