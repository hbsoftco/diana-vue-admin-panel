import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'

import DiToast from '@/shared/ui/base/DiToast.vue'

afterEach(() => {
  vi.useRealTimers()
  document.querySelectorAll('[data-di-toast-host]').forEach((element) => element.remove())
})

describe('DiToast', () => {
  it('stacks instances in one shared placement host', async () => {
    const first = mount(DiToast, { props: { message: 'First toast' } })
    const second = mount(DiToast, { props: { message: 'Second toast' } })

    await Promise.all([first.vm.$nextTick(), second.vm.$nextTick()])

    const hosts = document.querySelectorAll('[data-di-toast-host="bottom-end"]')
    expect(hosts).toHaveLength(1)
    expect(hosts[0]?.textContent).toContain('First toast')
    expect(hosts[0]?.textContent).toContain('Second toast')

    first.unmount()
    expect(document.querySelector('[data-di-toast-host="bottom-end"]')).not.toBeNull()

    second.unmount()
    expect(document.querySelector('[data-di-toast-host="bottom-end"]')).toBeNull()
  })

  it('supports physical placement and semantic appearance', async () => {
    const wrapper = mount(DiToast, {
      props: {
        horizontal: 'left',
        vertical: 'top',
        appearance: 'outline',
        variant: 'success',
        message: 'Placed toast',
      },
    })

    await wrapper.vm.$nextTick()

    const host = document.querySelector('[data-di-toast-host="top-left"]')
    const alert = host?.querySelector('[role="status"]')
    expect(host?.classList).toContain('di-toast-left')
    expect(host?.classList).toContain('toast-top')
    expect(alert?.classList).toContain('alert-outline')

    wrapper.unmount()
  })

  it('activates from the keyboard and optionally closes', async () => {
    const wrapper = mount(DiToast, {
      props: {
        clickable: true,
        closeOnClick: true,
        message: 'Clickable toast',
      },
    })

    await wrapper.vm.$nextTick()
    const alert = document.querySelector('[data-di-toast-host="bottom-end"] [role="button"]')
    alert?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('activate')).toHaveLength(1)
    expect(wrapper.emitted('close')).toEqual([['click']])
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]])

    wrapper.unmount()
  })

  it('dismisses after its duration', async () => {
    vi.useFakeTimers()
    const wrapper = mount(DiToast, {
      props: {
        duration: 1000,
        message: 'Timed toast',
      },
    })

    await vi.advanceTimersByTimeAsync(1000)

    expect(wrapper.emitted('close')).toEqual([['timeout']])
    expect(wrapper.emitted('update:modelValue')).toEqual([[false]])

    wrapper.unmount()
  })
})
