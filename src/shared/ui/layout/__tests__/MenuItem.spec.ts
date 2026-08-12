import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'

import type { MenuItem as MenuItemType } from '@/shared/types/models'

import { testI18n } from '../../base/__tests__/setup'
import MenuItem from '../MenuItem.vue'

const parentItem = {
  id: 'dashboards',
  label: 'menu.dashboard',
  icon: 'homeOutlineRounded' as const,
  children: [{ id: 'crm', label: 'menu.crm', route: '/dashboards/crm' }],
}

const deepParentItem: MenuItemType = {
  id: 'deep-parent',
  label: 'menu.dashboard',
  icon: 'homeOutlineRounded',
  children: [
    {
      id: 'nested-parent',
      label: 'menu.dashboard',
      children: [
        {
          id: 'deep-nested-parent',
          label: 'menu.dashboard',
          children: Array.from({ length: 20 }, (_, index) => ({
            id: `nested-child-${index}`,
            label: 'menu.crm',
            route: '/dashboards/crm',
          })),
        },
      ],
    },
  ],
}

type MountMenuItemProps = {
  expandedMenus?: Set<string>
  flyoutEnabled?: boolean
  isCollapsed?: boolean
  item?: MenuItemType
}

async function mountMenuItem(props: MountMenuItemProps = {}) {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/dashboards/crm', component: { template: '<div />' } }],
  })

  await router.push('/dashboards/crm')
  await router.isReady()

  return mount(MenuItem, {
    props: {
      item: props.item ?? parentItem,
      expandedMenus: props.expandedMenus ?? new Set<string>(),
      flyoutEnabled: props.flyoutEnabled,
      isCollapsed: props.isCollapsed,
    },
    attachTo: document.body,
    global: {
      plugins: [router],
    },
  })
}

afterEach(() => {
  vi.useRealTimers()
  document.body.innerHTML = ''
})

describe('menuItem direction indicator', () => {
  it('uses the right chevron in LTR and the left chevron in RTL', async () => {
    const wrapper = await mountMenuItem()
    const icons = () => wrapper.findAllComponents({ name: 'DiIcon' })
    const directionIcon = () => icons()[icons().length - 1]

    expect(directionIcon()?.props('name')).toBe('chevronRight')

    testI18n.global.locale.value = 'fa'
    await nextTick()

    expect(directionIcon()?.props('name')).toBe('chevronLeft')
    wrapper.unmount()
  })
})

describe('menuItem collapsed flyout', () => {
  it('overrides the popover surface with the sidebar background token', async () => {
    const wrapper = await mountMenuItem({ flyoutEnabled: true, isCollapsed: true })

    await wrapper.get('[data-menu-flyout-trigger]').trigger('mouseenter')
    await nextTick()

    const dialog = document.body.querySelector('[role="dialog"]')
    expect(dialog?.classList).toContain('bg-(--color-menu-bg)!')
    expect(dialog?.classList).toContain('bg-base-100')
    wrapper.unmount()
  })

  it('keeps the flyout open across the hover gap and closes after the leave delay', async () => {
    vi.useFakeTimers()
    const wrapper = await mountMenuItem({ flyoutEnabled: true, isCollapsed: true })
    const trigger = wrapper.get('[data-di-popover-trigger]')
    const triggerContent = wrapper.get('[data-menu-flyout-trigger]')

    expect(trigger.element.tagName).toBe('BUTTON')
    expect(trigger.attributes('aria-expanded')).toBe('false')

    await triggerContent.trigger('mouseenter')
    await nextTick()

    const flyoutContent = document.body.querySelector<HTMLElement>('[data-menu-flyout-content]')
    expect(flyoutContent).not.toBeNull()
    expect(trigger.attributes('aria-expanded')).toBe('true')
    expect(trigger.attributes('aria-controls')).toBe(flyoutContent?.closest('[role="dialog"]')?.id)

    await triggerContent.trigger('mouseleave')
    vi.advanceTimersByTime(100)
    flyoutContent?.dispatchEvent(new MouseEvent('mouseenter'))
    vi.advanceTimersByTime(100)
    await nextTick()

    expect(document.body.querySelector('[data-menu-flyout-content]')).not.toBeNull()

    flyoutContent?.dispatchEvent(new MouseEvent('mouseleave'))
    vi.advanceTimersByTime(149)
    await nextTick()
    expect(document.body.querySelector('[data-menu-flyout-content]')).not.toBeNull()

    vi.advanceTimersByTime(1)
    await nextTick()
    expect(document.body.querySelector('[data-menu-flyout-content]')).toBeNull()
    wrapper.unmount()
  })

  it('uses the inline click fallback when hover flyouts are disabled', async () => {
    const wrapper = await mountMenuItem({
      expandedMenus: new Set(['dashboards']),
      flyoutEnabled: false,
      isCollapsed: true,
    })
    const trigger = wrapper.get('button')
    const submenu = wrapper.get('ul')

    expect(trigger.attributes('aria-expanded')).toBe('true')
    expect(trigger.attributes('aria-controls')).toBe(submenu.attributes('id'))

    await trigger.trigger('mouseenter')
    await trigger.trigger('click')

    expect(document.body.querySelector('[role="dialog"]')).toBeNull()
    expect(wrapper.emitted('toggle')).toEqual([['dashboards']])
    wrapper.unmount()
  })

  it('delegates Escape and outside-pointer closing to the popover', async () => {
    const wrapper = await mountMenuItem({ flyoutEnabled: true, isCollapsed: true })
    const trigger = wrapper.get<HTMLElement>('[data-di-popover-trigger]')
    const triggerContent = wrapper.get('[data-menu-flyout-trigger]')

    await triggerContent.trigger('mouseenter')
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await nextTick()

    expect(document.body.querySelector('[data-menu-flyout-content]')).toBeNull()
    expect(document.activeElement).toBe(trigger.element)

    await triggerContent.trigger('mouseenter')
    await nextTick()
    document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }))
    await nextTick()

    expect(document.body.querySelector('[data-menu-flyout-content]')).toBeNull()
    wrapper.unmount()
  })

  it('opens from the keyboard and moves focus into the flyout', async () => {
    const wrapper = await mountMenuItem({ flyoutEnabled: true, isCollapsed: true })
    const trigger = wrapper.get<HTMLElement>('[data-di-popover-trigger]')
    trigger.element.focus()

    await trigger.trigger('keydown', { key: 'Enter' })
    await nextTick()
    await trigger.trigger('click')
    await nextTick()

    const routeLink = document.body.querySelector<HTMLAnchorElement>(
      '[data-menu-flyout-content] a[href="/dashboards/crm"]',
    )
    expect(document.activeElement).toBe(routeLink)
    wrapper.unmount()
  })

  it('scrolls a deeply expanded list without breaking hover, Escape, or outside close', async () => {
    vi.useFakeTimers()
    const wrapper = await mountMenuItem({
      flyoutEnabled: true,
      isCollapsed: true,
      item: deepParentItem,
    })
    const triggerContent = wrapper.get('[data-menu-flyout-trigger]')

    await triggerContent.trigger('mouseenter')
    await nextTick()

    const flyoutContent = document.body.querySelector<HTMLElement>('[data-menu-flyout-content]')
    const nestedTrigger = flyoutContent?.querySelector<HTMLButtonElement>('button')
    nestedTrigger?.click()
    await nextTick()
    const deepNestedTrigger = flyoutContent?.querySelectorAll<HTMLButtonElement>('button')[1]
    deepNestedTrigger?.click()
    await nextTick()

    const scrollArea = document.body.querySelector<HTMLElement>('[data-menu-flyout-list]')
    expect(scrollArea?.classList).toContain('sidebar-scrollbar')
    expect(scrollArea?.classList).toContain('overflow-y-auto')
    expect(scrollArea?.querySelectorAll('a')).toHaveLength(20)

    await triggerContent.trigger('mouseleave')
    flyoutContent?.dispatchEvent(new MouseEvent('mouseenter'))
    scrollArea?.dispatchEvent(new Event('scroll'))
    vi.advanceTimersByTime(150)
    await nextTick()

    expect(document.body.querySelector('[data-menu-flyout-content]')).not.toBeNull()

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    await nextTick()
    expect(document.body.querySelector('[data-menu-flyout-content]')).toBeNull()

    await triggerContent.trigger('mouseenter')
    await nextTick()
    document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }))
    await nextTick()
    expect(document.body.querySelector('[data-menu-flyout-content]')).toBeNull()
    wrapper.unmount()
  })

  it('closes and emits navigate when a flyout route is selected', async () => {
    const wrapper = await mountMenuItem({ flyoutEnabled: true, isCollapsed: true })

    await wrapper.get('[data-menu-flyout-trigger]').trigger('mouseenter')
    await nextTick()

    const routeLink = document.body.querySelector<HTMLAnchorElement>(
      '[data-menu-flyout-content] a[href="/dashboards/crm"]',
    )
    expect(routeLink).not.toBeNull()

    routeLink?.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }))
    await nextTick()

    expect(document.body.querySelector('[data-menu-flyout-content]')).toBeNull()
    expect(wrapper.emitted('navigate')).toHaveLength(1)
    wrapper.unmount()
  })
})
