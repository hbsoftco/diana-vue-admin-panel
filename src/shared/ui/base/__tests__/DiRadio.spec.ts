import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import DiRadio from '../radio/DiRadio.vue'

describe('diRadio', () => {
  it('associates its label and applies size and variant classes', () => {
    const wrapper = mount(DiRadio, {
      props: { id: 'plan-pro', value: 'pro', label: 'Pro', size: 'sm', variant: 'success' },
    })

    expect(wrapper.get('label').attributes('for')).toBe('plan-pro')
    expect(wrapper.get('input').classes()).toEqual(
      expect.arrayContaining(['radio-sm', 'radio-success']),
    )
  })

  it('selects its value through v-model', async () => {
    const wrapper = mount(DiRadio, { props: { modelValue: null, value: 'pro', name: 'plan' } })
    await wrapper.get('input').setValue(true)

    expect(wrapper.emitted('update:modelValue')).toEqual([['pro']])
    expect(wrapper.emitted('change')?.[0]?.[0]).toBe('pro')
  })

  it('preserves native disabled checked state', async () => {
    const wrapper = mount(DiRadio, {
      props: { modelValue: 2, value: 2, disabled: true, name: 'number' },
    })
    const input = wrapper.get<HTMLInputElement>('input')

    expect(input.element.checked).toBe(true)
    await input.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('uses logical-only layout classes', () => {
    const wrapper = mount(DiRadio, {
      props: { value: true, label: 'Enabled', labelPosition: 'start' },
    })
    expect(wrapper.html()).not.toMatch(/\b(?:left|right|ml|mr)-/)
  })

  it('supports the DaisyUI xs size', () => {
    const wrapper = mount(DiRadio, {
      props: { value: 'xs', size: 'xs', label: 'Extra small' },
    })
    expect(wrapper.get('input').classes()).toContain('radio-xs')
  })
})
