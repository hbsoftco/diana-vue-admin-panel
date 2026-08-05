import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'

import DiButtonGroup from '../DiButtonGroup.vue'
import { testI18n } from './setup'

enableAutoUnmount(afterEach)

function mountGroup(props: Record<string, unknown> = {}, locale: 'en' | 'ar' = 'en') {
  testI18n.global.locale.value = locale

  return mount(DiButtonGroup, {
    props,
    slots: {
      default: `
        <button class="btn">One</button>
        <button class="btn" disabled>Two</button>
        <button class="btn">Three</button>
      `,
    },
    attachTo: document.body,
  })
}

describe('diButtonGroup', () => {
  it('renders an attached horizontal group by default', () => {
    const wrapper = mountGroup()

    expect(wrapper.attributes('role')).toBe('group')
    expect(wrapper.attributes('aria-label')).toBe('Button group')
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['di-button-group', 'di-button-group-attached', 'flex-row']),
    )
  })

  it('supports vertical, spaced, and rounded layouts', () => {
    const wrapper = mountGroup({ orientation: 'vertical', attached: false, rounded: true })

    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(['flex-col', 'gap-2', 'di-button-group-rounded']),
    )
    expect(wrapper.classes()).not.toContain('di-button-group-attached')
  })

  it('exposes toolbar semantics', () => {
    const wrapper = mountGroup({ role: 'toolbar', orientation: 'vertical', ariaLabel: 'Editor' })

    expect(wrapper.attributes('role')).toBe('toolbar')
    expect(wrapper.attributes('aria-label')).toBe('Editor')
    expect(wrapper.attributes('aria-orientation')).toBe('vertical')
  })

  it('moves focus with toolbar arrow keys and skips disabled controls', async () => {
    const wrapper = mountGroup({ role: 'toolbar' })
    const buttons = wrapper.findAll('button')

    buttons[0]?.element.focus()
    await wrapper.trigger('keydown', { key: 'ArrowRight' })
    expect(document.activeElement).toBe(buttons[2]?.element)

    await wrapper.trigger('keydown', { key: 'Home' })
    expect(document.activeElement).toBe(buttons[0]?.element)
  })

  it('reverses horizontal arrow movement in RTL', async () => {
    const wrapper = mountGroup({ role: 'toolbar' }, 'ar')
    const buttons = wrapper.findAll('button')

    buttons[0]?.element.focus()
    await wrapper.trigger('keydown', { key: 'ArrowRight' })
    expect(document.activeElement).toBe(buttons[2]?.element)
  })
})
