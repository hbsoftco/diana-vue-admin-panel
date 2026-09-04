import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'

import { testI18n } from '@/shared/ui/base/__tests__/setup'

import DiLogoLoading from '../DiLogoLoading.vue'

describe('diLogoLoading', () => {
  it('renders the Diana logo, default text, and loading indicator', () => {
    const wrapper = mount(DiLogoLoading)

    expect(wrapper.get('[role="status"]').attributes()).toMatchObject({
      'aria-busy': 'true',
      'aria-live': 'polite',
    })
    expect(wrapper.get('svg.di-logo').attributes('viewBox')).toBe('0 0 357 216')
    expect(wrapper.text()).toContain('Loading')
    expect(wrapper.find('.di-logo-loading__indicator').exists()).toBe(true)
  })

  it('translates the default text when the locale changes', async () => {
    const wrapper = mount(DiLogoLoading)

    testI18n.global.locale.value = 'fa'
    await nextTick()

    expect(wrapper.text()).toContain('در حال بارگذاری')
  })

  it('renders custom text and the selected logo size', () => {
    const wrapper = mount(DiLogoLoading, {
      props: { text: 'Loading your content...', size: 'lg' },
    })

    expect(wrapper.text()).toContain('Loading your content...')
    expect(wrapper.get('svg.di-logo').classes()).toContain('w-32')
  })

  it('hides the indicator when requested', () => {
    const wrapper = mount(DiLogoLoading, { props: { showIndicator: false } })

    expect(wrapper.find('.di-logo-loading__indicator').exists()).toBe(false)
  })
})
