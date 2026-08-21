import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import DiRadioGroup from '../radio/DiRadioGroup.vue'

const options = [
  { label: 'Email', value: 'email' },
  { label: 'SMS', value: 'sms', disabled: true },
]

describe('diRadioGroup', () => {
  it('renders fieldset and legend semantics with a generated shared name', () => {
    const wrapper = mount(DiRadioGroup, { props: { legend: 'Notification channel', options } })
    const inputs = wrapper.findAll('input')

    expect(wrapper.get('fieldset').attributes('aria-labelledby')).toBe(
      wrapper.get('legend').attributes('id'),
    )
    expect(inputs[0]?.attributes('name')).toBe(inputs[1]?.attributes('name'))
    expect(inputs[1]?.attributes('disabled')).toBeDefined()
  })

  it('supports a real aria-label without a visible legend', () => {
    const wrapper = mount(DiRadioGroup, { props: { ariaLabel: 'Delivery speed', options } })
    expect(wrapper.find('legend').exists()).toBe(false)
    expect(wrapper.get('fieldset').attributes('aria-label')).toBe('Delivery speed')
  })

  it('updates its model and supports horizontal layout', async () => {
    const wrapper = mount(DiRadioGroup, {
      props: { modelValue: null, options, orientation: 'horizontal' },
    })
    await wrapper.findAll('input')[0]?.setValue(true)

    expect(wrapper.emitted('update:modelValue')).toEqual([['email']])
    expect(wrapper.get('.flex').classes()).toEqual(
      expect.arrayContaining(['flex-row', 'items-center']),
    )
  })

  it('keeps native radio keyboard behavior available', async () => {
    const wrapper = mount(DiRadioGroup, {
      props: { options, name: 'channel' },
      attachTo: document.body,
    })
    const input = wrapper.findAll<HTMLInputElement>('input')[0]

    input?.element.focus()
    await input?.trigger('keydown', { key: ' ' })
    await input?.trigger('keydown', { key: 'ArrowDown' })
    expect(input?.attributes('type')).toBe('radio')
  })

  it('propagates the xs size to every option', () => {
    const wrapper = mount(DiRadioGroup, { props: { options, size: 'xs' } })
    expect(wrapper.findAll('input').every(input => input.classes().includes('radio-xs'))).toBe(
      true,
    )
  })
})
