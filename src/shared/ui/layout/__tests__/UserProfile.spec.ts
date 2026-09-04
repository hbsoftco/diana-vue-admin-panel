import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'

import { testI18n } from '../../base/__tests__/setup'
import UserProfile from '../UserProfile.vue'

function openPanel(wrapper: ReturnType<typeof mount>) {
  return wrapper.get('[role="button"]').trigger('mousedown')
}

describe('userProfile', () => {
  it('shows the avatar, name and role on the trigger with popup a11y attributes', async () => {
    const wrapper = mount(UserProfile)
    const trigger = wrapper.get('[role="button"]')

    expect(trigger.attributes('aria-haspopup')).toBe('menu')
    expect(trigger.attributes('aria-expanded')).toBe('false')
    expect(wrapper.get('img').attributes('alt')).toBe('Avatar for John Doe')
    expect(wrapper.text()).toContain('John Doe')
    expect(wrapper.text()).toContain('Administrator')

    await openPanel(wrapper)

    expect(trigger.attributes('aria-expanded')).toBe('true')
  })

  it('repeats the name and role in the panel header and lists the existing items with icons', async () => {
    const wrapper = mount(UserProfile)
    await openPanel(wrapper)

    // Panel header repeats the identity block (2nd avatar image + name + role).
    expect(wrapper.findAll('img')).toHaveLength(2)

    const rows = wrapper.findAll('ul li button')
    const labels = rows.map(row => row.text().trim())

    // Same labels, same order as the existing menu (Messages keeps its "3" badge).
    expect(labels).toEqual([
      'Dashboard',
      'Profile',
      'Messages3',
      'Settings',
      'Help',
      'Logout',
    ])
    // Divider stays before the final Logout row.
    expect(wrapper.findAll('ul .divider').length).toBeGreaterThanOrEqual(2)
    // Each row renders an icon; the first row uses a core (sync) icon.
    expect(rows[0]?.find('svg').exists()).toBe(true)
  })

  it('closes on Escape', async () => {
    const wrapper = mount(UserProfile)
    await openPanel(wrapper)
    expect(wrapper.find('ul li button').exists()).toBe(true)

    await wrapper.get('.dropdown').trigger('keydown', { key: 'Escape' })

    expect(wrapper.get('[role="button"]').attributes('aria-expanded')).toBe('false')
    expect(wrapper.find('ul li button').exists()).toBe(false)
  })

  it('localizes the role and item labels with the active locale', async () => {
    const wrapper = mount(UserProfile)

    testI18n.global.locale.value = 'fa'
    await nextTick()
    await openPanel(wrapper)

    expect(wrapper.text()).toContain('مدیر')
    expect(wrapper.findAll('ul li button').map(row => row.text().trim())).toContain('خروج')
  })
})
