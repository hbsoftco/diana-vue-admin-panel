import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, nextTick, ref } from 'vue'

import DiDropdown from '../DiDropdown.vue'

const MENU_SLOT = `
  <button type="button" role="menuitem">Dashboard</button>
  <button type="button" role="menuitem">Profile</button>
  <button type="button" role="menuitem">Settings</button>
`

function mountDropdown(props: Record<string, unknown> = {}, slots: Record<string, string> = {}) {
  return mount(DiDropdown, {
    attachTo: document.body,
    props: { ariaLabel: 'Account actions', ...props },
    slots: {
      trigger: '<span>Account</span>',
      default: MENU_SLOT,
      ...slots,
    },
  })
}

function panel() {
  return document.body.querySelector<HTMLElement>('[role="menu"], [role="listbox"], [role="dialog"]')
}

async function settle() {
  await nextTick()
  await nextTick()
}

afterEach(() => {
  document.body.innerHTML = ''
  vi.restoreAllMocks()
})

describe('diDropdown', () => {
  it('renders a button trigger with popup a11y state and no panel until opened', () => {
    const wrapper = mountDropdown()
    const trigger = wrapper.get('[data-di-dropdown-trigger]')

    expect(trigger.element.tagName).toBe('BUTTON')
    expect(trigger.attributes('type')).toBe('button')
    expect(trigger.attributes('aria-haspopup')).toBe('menu')
    expect(trigger.attributes('aria-label')).toBe('Account actions')
    expect(trigger.attributes('aria-expanded')).toBe('false')
    expect(trigger.attributes('aria-controls')).toBeUndefined()
    expect(panel()).toBeNull()
    wrapper.unmount()
  })

  it('opens on trigger click, teleports the panel and wires aria-controls', async () => {
    const wrapper = mountDropdown()
    const trigger = wrapper.get('[data-di-dropdown-trigger]')

    await trigger.trigger('click')
    await settle()

    expect(trigger.attributes('aria-expanded')).toBe('true')
    const el = panel()
    expect(el).not.toBeNull()
    expect(el?.getAttribute('role')).toBe('menu')
    expect(el?.id).toBe(trigger.attributes('aria-controls'))
    expect(el?.getAttribute('aria-label')).toBe('Account actions')
    wrapper.unmount()
  })

  it('forwards class and title to the trigger element', () => {
    const wrapper = mountDropdown({}, {})
    const wrapperWithAttrs = mount(DiDropdown, {
      attachTo: document.body,
      attrs: { 'class': 'btn btn-ghost', 'title': 'Open', 'data-testid': 'x' },
      props: { ariaLabel: 'Menu' },
      slots: { trigger: 'Account', default: MENU_SLOT },
    })
    const trigger = wrapperWithAttrs.get('[data-di-dropdown-trigger]')
    expect(trigger.classes()).toContain('btn')
    expect(trigger.classes()).toContain('btn-ghost')
    expect(trigger.attributes('title')).toBe('Open')
    expect(trigger.attributes('data-testid')).toBe('x')
    wrapper.unmount()
    wrapperWithAttrs.unmount()
  })

  it('supports two-way v-model:open and emits lifecycle events once per transition', async () => {
    const Harness = defineComponent({
      components: { DiDropdown },
      setup() {
        const open = ref(false)
        const events = ref<string[]>([])
        return { open, events }
      },
      template: `
        <DiDropdown
          v-model:open="open"
          aria-label="Menu"
          @open="events.push('open')"
          @close="events.push('close:' + $event)"
        >
          <template #trigger><span>Account</span></template>
          <button type="button" role="menuitem">One</button>
        </DiDropdown>
      `,
    })

    const wrapper = mount(Harness, { attachTo: document.body })
    const trigger = wrapper.get('[data-di-dropdown-trigger]')

    await trigger.trigger('click')
    await settle()
    expect((wrapper.vm as unknown as { open: boolean }).open).toBe(true)

    await trigger.trigger('click')
    await settle()
    expect((wrapper.vm as unknown as { open: boolean }).open).toBe(false)
    expect((wrapper.vm as unknown as { events: string[] }).events).toEqual([
      'open',
      'close:trigger',
    ])
    wrapper.unmount()
  })

  it('closes on Escape and returns focus to the trigger', async () => {
    const wrapper = mountDropdown()
    const trigger = wrapper.get<HTMLElement>('[data-di-dropdown-trigger]')
    trigger.element.focus()

    await trigger.trigger('click')
    await settle()

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await settle()

    expect(wrapper.get('[data-di-dropdown-trigger]').attributes('aria-expanded')).toBe('false')
    expect(document.activeElement).toBe(trigger.element)
    wrapper.unmount()
  })

  it('closes on an outside pointer interaction', async () => {
    const wrapper = mountDropdown()
    await wrapper.get('[data-di-dropdown-trigger]').trigger('click')
    await settle()
    expect(panel()).not.toBeNull()

    document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }))
    await settle()

    expect(wrapper.get('[data-di-dropdown-trigger]').attributes('aria-expanded')).toBe('false')
    wrapper.unmount()
  })

  it('closes after an item click by default but stays open when disabled', async () => {
    const closing = mountDropdown()
    await closing.get('[data-di-dropdown-trigger]').trigger('click')
    await settle()
    await panel()!.querySelector('button')!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await settle()
    expect(closing.get('[data-di-dropdown-trigger]').attributes('aria-expanded')).toBe('false')
    closing.unmount()

    const staying = mountDropdown({ closeOnContentClick: false })
    await staying.get('[data-di-dropdown-trigger]').trigger('click')
    await settle()
    panel()!.querySelector('button')!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await settle()
    expect(staying.get('[data-di-dropdown-trigger]').attributes('aria-expanded')).toBe('true')
    staying.unmount()
  })

  it('opens and moves roving focus with the arrow keys, Home and End', async () => {
    const wrapper = mountDropdown()
    const trigger = wrapper.get('[data-di-dropdown-trigger]')

    await trigger.trigger('keydown', { key: 'ArrowDown' })
    await settle()

    const items = Array.from(panel()!.querySelectorAll<HTMLElement>('[role="menuitem"]'))
    expect(document.activeElement).toBe(items[0])

    panel()!.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }))
    expect(document.activeElement).toBe(items[1])

    panel()!.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }))
    expect(document.activeElement).toBe(items[0])

    panel()!.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }))
    expect(document.activeElement).toBe(items[items.length - 1])

    panel()!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }))
    expect(document.activeElement).toBe(items[0])
    wrapper.unmount()
  })

  it('does not open while disabled', async () => {
    const wrapper = mountDropdown({ disabled: true })
    const trigger = wrapper.get('[data-di-dropdown-trigger]')

    expect(trigger.attributes('disabled')).toBeDefined()
    await trigger.trigger('click')
    await trigger.trigger('keydown', { key: 'ArrowDown' })
    await settle()

    expect(panel()).toBeNull()
    expect(wrapper.emitted('open')).toBeUndefined()
    wrapper.unmount()
  })

  it('keeps at most one dropdown in an exclusive group open', async () => {
    const Harness = defineComponent({
      components: { DiDropdown },
      template: `
        <div>
          <DiDropdown group="header" aria-label="A">
            <template #trigger><span>A</span></template>
            <button type="button" role="menuitem" data-menu="a">A item</button>
          </DiDropdown>
          <DiDropdown group="header" aria-label="B">
            <template #trigger><span>B</span></template>
            <button type="button" role="menuitem" data-menu="b">B item</button>
          </DiDropdown>
        </div>
      `,
    })
    const wrapper = mount(Harness, { attachTo: document.body })
    const triggers = wrapper.findAll('[data-di-dropdown-trigger]')
    const triggerA = triggers[0]!
    const triggerB = triggers[1]!

    await triggerA.trigger('click')
    await settle()
    expect(document.body.querySelector('[data-menu="a"]')).not.toBeNull()

    await triggerB.trigger('click')
    await settle()
    expect(document.body.querySelector('[data-menu="b"]')).not.toBeNull()
    expect(document.body.querySelector('[data-menu="a"]')).toBeNull()
    expect(triggerA.attributes('aria-expanded')).toBe('false')
    wrapper.unmount()
  })

  it('flips to the opposite side when the preferred placement overflows the viewport', async () => {
    const wrapper = mountDropdown({ placement: 'bottom-start' })
    await wrapper.get('[data-di-dropdown-trigger]').trigger('click')
    await settle()

    const trigger = wrapper.get<HTMLElement>('[data-di-dropdown-trigger]')
    trigger.element.getBoundingClientRect = () =>
      ({ top: 720, bottom: 760, left: 40, right: 160, width: 120, height: 40 }) as DOMRect
    const el = panel()!
    el.getBoundingClientRect = () =>
      ({ top: 0, bottom: 260, left: 0, right: 200, width: 200, height: 260 }) as DOMRect

    window.dispatchEvent(new Event('resize'))
    await settle()

    expect(el.dataset.placement).toBe('top-start')
    expect(el.classList).toContain('origin-bottom-left')
    wrapper.unmount()
  })

  it('uses semantic surface tokens for the panel', async () => {
    const wrapper = mountDropdown()
    await wrapper.get('[data-di-dropdown-trigger]').trigger('click')
    await settle()

    const el = panel()!
    expect(el.classList).toContain('bg-base-100')
    expect(el.classList).toContain('border-base-300')
    expect(el.classList).toContain('text-base-content')
    wrapper.unmount()
  })

  it('removes global listeners when unmounted while open', async () => {
    const removeSpy = vi.spyOn(document, 'removeEventListener')
    const wrapper = mountDropdown()
    await wrapper.get('[data-di-dropdown-trigger]').trigger('click')
    await settle()

    wrapper.unmount()

    expect(removeSpy).toHaveBeenCalledWith('pointerdown', expect.any(Function))
    expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function))
  })
})
