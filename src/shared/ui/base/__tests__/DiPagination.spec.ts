import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import DiPagination from '../DiPagination.vue'
import { testI18n } from './setup'

function mountPagination(props: Record<string, unknown> = {}, locale: 'en' | 'ar' = 'en') {
  testI18n.global.locale.value = locale

  return mount(DiPagination, {
    props: { totalPages: 10, ...props },
  })
}

describe('diPagination', () => {
  it('preserves the joined layout and updates the model', async () => {
    const wrapper = mountPagination({ totalPages: 3 })

    expect(wrapper.get('.join').classes()).toContain('join-horizontal')
    await wrapper.findAll('button')[2]?.trigger('click')

    expect(wrapper.emitted('update:modelValue')).toEqual([[2]])
    expect(wrapper.emitted('change')).toEqual([[2]])
  })

  it('renders compact page windows with ellipses', () => {
    const wrapper = mountPagination({ totalPages: 21, siblingCount: 2, boundaryCount: 1 })

    expect(wrapper.text()).toContain('…')
    expect(wrapper.text()).toContain('21')
    expect(wrapper.findAll('[aria-current="page"]')).toHaveLength(1)
  })

  it('supports spaced, circular, and underlined active styles', () => {
    const circular = mountPagination({ layout: 'spaced', activeStyle: 'circle' })
    const underlined = mountPagination({ layout: 'spaced', activeStyle: 'underline' })

    expect(circular.get('nav > div').classes()).toEqual(expect.arrayContaining(['flex', 'gap-1']))
    expect(circular.get('[aria-current="page"]').classes()).toContain('btn-circle')
    expect(underlined.get('[aria-current="page"]').classes()).toEqual(
      expect.arrayContaining(['border-b-2', 'text-primary', 'rounded-none']),
    )
    expect(underlined.get('[aria-current="page"]').classes()).not.toContain('btn-active')
  })

  it('blocks changes while disabled', async () => {
    const wrapper = mountPagination({ totalPages: 3, disabled: true })

    await wrapper.findAll('button')[2]?.trigger('click')
    expect(wrapper.emitted('change')).toBeUndefined()
    expect(
      wrapper.findAll('button').every(button => button.attributes('disabled') !== undefined),
    ).toBe(true)
  })

  it('reverses navigation symbols for RTL locales', () => {
    const ltr = mountPagination({ totalPages: 3 }, 'en')
    const rtl = mountPagination({ totalPages: 3 }, 'ar')

    expect(ltr.findAll('button')[0]?.text()).toBe('‹')
    expect(rtl.findAll('button')[0]?.text()).toBe('›')
  })
})
