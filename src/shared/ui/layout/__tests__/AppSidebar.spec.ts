import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, nextTick } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'

import { useSidebar } from '@/shared/utils/use-sidebar'

import AppHeader from '../AppHeader.vue'
import AppSidebar from '../AppSidebar.vue'

function createMediaQueryList(query: string, matches: boolean): MediaQueryList {
  return {
    matches,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(() => true),
  }
}

const SidebarHarness = defineComponent({
  components: { AppHeader, AppSidebar },
  setup() {
    const { closeMobileSidebar, expandDesktopSidebar } = useSidebar()
    closeMobileSidebar()
    expandDesktopSidebar()
  },
  template: `
    <AppSidebar>
      <AppHeader />
      <main>Page content</main>
    </AppSidebar>
  `,
})

afterEach(() => {
  vi.unstubAllGlobals()
  document.body.innerHTML = ''
})

describe('appSidebar mobile drawer', () => {
  it('starts closed, opens from the header, and closes on navigation or Escape', async () => {
    const mediaQueries = new Map([
      ['(min-width: 1024px)', createMediaQueryList('(min-width: 1024px)', false)],
      [
        '(hover: hover) and (pointer: fine)',
        createMediaQueryList('(hover: hover) and (pointer: fine)', false),
      ],
    ])

    vi.stubGlobal(
      'matchMedia',
      vi.fn((query: string) => {
        const mediaQuery = mediaQueries.get(query)
        if (!mediaQuery)
          throw new Error(`Unexpected media query: ${query}`)
        return mediaQuery
      }),
    )

    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/dashboards/crm', component: { template: '<div />' } },
        { path: '/:pathMatch(.*)*', component: { template: '<div />' } },
      ],
    })
    await router.push('/dashboards/crm')
    await router.isReady()

    const wrapper = mount(SidebarHarness, {
      attachTo: document.body,
      global: {
        plugins: [router],
        stubs: {
          DiIcon: true,
          FullscreenToggle: true,
          LanguageToggle: true,
          Notifications: true,
          ThemeToggle: true,
          UserProfile: true,
        },
      },
    })
    await nextTick()

    const drawerToggle = wrapper.get<HTMLInputElement>('input.drawer-toggle')
    const headerToggle = wrapper.get<HTMLElement>('[data-sidebar-toggle]')

    expect(drawerToggle.element.checked).toBe(false)
    expect(headerToggle.attributes('aria-expanded')).toBe('false')

    headerToggle.element.focus()
    await headerToggle.trigger('click')
    await nextTick()

    expect(drawerToggle.element.checked).toBe(true)
    expect(headerToggle.attributes('aria-expanded')).toBe('true')

    await wrapper.get('a[href="/dashboards/crm"]').trigger('click')
    await nextTick()
    await nextTick()

    expect(drawerToggle.element.checked).toBe(false)
    expect(document.activeElement).toBe(headerToggle.element)

    await headerToggle.trigger('click')
    await nextTick()
    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }),
    )
    await nextTick()
    await nextTick()

    expect(drawerToggle.element.checked).toBe(false)
    expect(document.activeElement).toBe(headerToggle.element)
    wrapper.unmount()
  })
})
