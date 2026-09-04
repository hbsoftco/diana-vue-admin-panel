import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'

import { testI18n } from '../../base/__tests__/setup'
import UserProfile from '../UserProfile.vue'

async function openPanel(wrapper: ReturnType<typeof mount>) {
  await wrapper.get('[data-di-dropdown-trigger]').trigger('click')
  await nextTick()
  await nextTick()
}

function panelItems() {
  return Array.from(document.body.querySelectorAll<HTMLElement>('[role="menu"] [role="menuitem"]'))
}

afterEach(() => {
  document.body.innerHTML = ''
  testI18n.global.locale.value = 'en'
})

describe('userProfile', () => {
  it('shows the avatar, name and role on the trigger with popup a11y attributes', async () => {
    const wrapper = mount(UserProfile, { attachTo: document.body })
    const trigger = wrapper.get('[data-di-dropdown-trigger]')

    expect(trigger.attributes('aria-haspopup')).toBe('menu')
    expect(trigger.attributes('aria-expanded')).toBe('false')
    expect(wrapper.get('img').attributes('alt')).toBe('Avatar for John Doe')
    expect(wrapper.text()).toContain('John Doe')
    expect(wrapper.text()).toContain('Administrator')

    await openPanel(wrapper)

    expect(trigger.attributes('aria-expanded')).toBe('true')
    wrapper.unmount()
  })

  it('repeats the name and role in the panel header and lists the existing items with icons', async () => {
    const wrapper = mount(UserProfile, { attachTo: document.body })
    await openPanel(wrapper)

    const menu = document.body.querySelector('[role="menu"]')!
    expect(menu.textContent).toContain('John Doe')
    expect(menu.textContent).toContain('Administrator')
    // Header repeats the identity avatar in the teleported panel.
    expect(menu.querySelector('img')).not.toBeNull()

    const labels = panelItems().map(row => row.textContent?.replace(/\s+/g, ''))
    expect(labels).toEqual([
      'Dashboard',
      'Profile',
      'Messages3',
      'Settings',
      'Help',
      'Logout',
    ])

    // Dividers keep their original positions (after Messages and after Help).
    expect(menu.querySelectorAll('[role="separator"]').length).toBeGreaterThanOrEqual(3)
    expect(panelItems()[0]?.querySelector('svg')).not.toBeNull()
    wrapper.unmount()
  })

  it('closes on Escape', async () => {
    const wrapper = mount(UserProfile, { attachTo: document.body })
    await openPanel(wrapper)
    expect(document.body.querySelector('[role="menu"]')).not.toBeNull()

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await nextTick()
    await nextTick()

    expect(wrapper.get('[data-di-dropdown-trigger]').attributes('aria-expanded')).toBe('false')
    wrapper.unmount()
  })

  it('localizes the role and item labels with the active locale', async () => {
    const wrapper = mount(UserProfile, { attachTo: document.body })

    testI18n.global.locale.value = 'fa'
    await nextTick()
    await openPanel(wrapper)

    const menu = document.body.querySelector('[role="menu"]')!
    expect(menu.textContent).toContain('مدیر')
    expect(panelItems().map(row => row.textContent?.trim())).toContain('خروج')
    wrapper.unmount()
  })
})
