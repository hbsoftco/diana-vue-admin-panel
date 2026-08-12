import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, nextTick } from 'vue'

import { useSidebar } from '@/shared/utils/use-sidebar'

type MutableMediaQuery = {
  mediaQueryList: MediaQueryList
  addEventListener: ReturnType<typeof vi.fn>
  removeEventListener: ReturnType<typeof vi.fn>
  setMatches: (matches: boolean) => void
}

function createMutableMediaQuery(query: string, initialMatches: boolean): MutableMediaQuery {
  let matches = initialMatches
  const listeners = new Set<EventListenerOrEventListenerObject>()

  const addEventListener = vi.fn((_event: string, listener: EventListenerOrEventListenerObject) => {
    listeners.add(listener)
  })
  const removeEventListener = vi.fn(
    (_event: string, listener: EventListenerOrEventListenerObject) => {
      listeners.delete(listener)
    },
  )

  const notifyListeners = () => {
    const event = { matches, media: query } as MediaQueryListEvent

    listeners.forEach((listener) => {
      if (typeof listener === 'function') {
        listener(event)
        return
      }

      listener.handleEvent(event)
    })
  }

  const mediaQueryList = {
    get matches() {
      return matches
    },
    media: query,
    onchange: null,
    addEventListener,
    removeEventListener,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(() => true),
  } as unknown as MediaQueryList

  return {
    mediaQueryList,
    addEventListener,
    removeEventListener,
    setMatches(nextMatches) {
      matches = nextMatches
      notifyListeners()
    },
  }
}

const SidebarStateHarness = defineComponent({
  setup() {
    return useSidebar()
  },
  template: `
    <button data-toggle @click="toggleSidebar">Toggle</button>
    <button data-expand-desktop @click="expandDesktopSidebar">Expand desktop</button>
    <span data-desktop>{{ isDesktop }}</span>
    <span data-hover>{{ canHover }}</span>
    <span data-desktop-collapsed>{{ isDesktopSidebarCollapsed }}</span>
    <span data-mobile-open>{{ isMobileSidebarOpen }}</span>
  `,
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('sidebar responsive state', () => {
  it('keeps desktop preference separate, closes mobile state at lg, and cleans up listeners', async () => {
    const desktopQuery = createMutableMediaQuery('(min-width: 1024px)', false)
    const hoverQuery = createMutableMediaQuery('(hover: hover) and (pointer: fine)', false)

    vi.stubGlobal(
      'matchMedia',
      vi.fn((query: string) => {
        if (query === desktopQuery.mediaQueryList.media) {
          return desktopQuery.mediaQueryList
        }
        if (query === hoverQuery.mediaQueryList.media) {
          return hoverQuery.mediaQueryList
        }

        throw new Error(`Unexpected media query: ${query}`)
      }),
    )

    const wrapper = mount(SidebarStateHarness)
    await nextTick()

    expect(wrapper.get('[data-desktop]').text()).toBe('false')
    expect(wrapper.get('[data-hover]').text()).toBe('false')
    expect(wrapper.get('[data-desktop-collapsed]').text()).toBe('false')
    expect(wrapper.get('[data-mobile-open]').text()).toBe('false')

    await wrapper.get('[data-toggle]').trigger('click')
    expect(wrapper.get('[data-mobile-open]').text()).toBe('true')
    expect(wrapper.get('[data-desktop-collapsed]').text()).toBe('false')

    desktopQuery.setMatches(true)
    hoverQuery.setMatches(true)
    await nextTick()

    expect(wrapper.get('[data-desktop]').text()).toBe('true')
    expect(wrapper.get('[data-hover]').text()).toBe('true')
    expect(wrapper.get('[data-mobile-open]').text()).toBe('false')

    await wrapper.get('[data-toggle]').trigger('click')
    expect(wrapper.get('[data-desktop-collapsed]').text()).toBe('true')

    desktopQuery.setMatches(false)
    await nextTick()

    expect(wrapper.get('[data-desktop-collapsed]').text()).toBe('true')
    expect(wrapper.get('[data-mobile-open]').text()).toBe('false')

    await wrapper.get('[data-expand-desktop]').trigger('click')
    wrapper.unmount()

    expect(desktopQuery.addEventListener).toHaveBeenCalledWith('change', expect.any(Function))
    expect(hoverQuery.addEventListener).toHaveBeenCalledWith('change', expect.any(Function))
    expect(desktopQuery.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function))
    expect(hoverQuery.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function))
  })
})
