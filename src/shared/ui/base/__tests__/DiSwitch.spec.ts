import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import DiSwitch from '../DiSwitch.vue'

describe('diSwitch', () => {
  it('renders a native checkbox with default classes', () => {
    const wrapper = mount(DiSwitch)
    const input = wrapper.get('input')

    expect(input.attributes('type')).toBe('checkbox')
    expect(input.classes()).toEqual(expect.arrayContaining(['toggle', 'toggle-primary', 'toggle-md']))
    expect(input.element.checked).toBe(false)
  })

  it('updates its model and emits change once per transition', async () => {
    const wrapper = mount(DiSwitch, {
      props: {
        'modelValue': false,
        'onUpdate:modelValue': value => wrapper.setProps({ modelValue: value }),
      },
    })

    await wrapper.get('input').setValue(true)

    expect(wrapper.emitted('update:modelValue')).toEqual([[true]])
    expect(wrapper.emitted('change')).toEqual([[true]])
    expect(wrapper.get('input').element.checked).toBe(true)
  })

  it('associates its label and forwards a caller-provided id', () => {
    const wrapper = mount(DiSwitch, {
      props: { label: 'Email notifications' },
      attrs: { id: 'email-notifications', name: 'notifications', required: true },
    })

    expect(wrapper.get('label').attributes('for')).toBe('email-notifications')
    expect(wrapper.get('input').attributes()).toMatchObject({
      id: 'email-notifications',
      name: 'notifications',
      required: '',
    })
  })

  it('prevents disabled and read-only state changes', async () => {
    const disabled = mount(DiSwitch, { props: { disabled: true } })
    const readOnly = mount(DiSwitch, { props: { readOnly: true } })

    expect(disabled.get('input').attributes('disabled')).toBeDefined()
    await disabled.get('input').setValue(true)
    expect(disabled.emitted('update:modelValue')).toBeUndefined()

    await readOnly.get('input').trigger('click')
    expect(readOnly.get('input').element.checked).toBe(false)
    expect(readOnly.get('input').attributes('aria-readonly')).toBe('true')
    expect(readOnly.emitted('update:modelValue')).toBeUndefined()
  })

  it('reflects invalid and indeterminate states', async () => {
    const wrapper = mount(DiSwitch, { props: { invalid: true, indeterminate: true } })
    const input = wrapper.get('input')

    expect(input.attributes('aria-invalid')).toBe('true')
    expect(input.element.indeterminate).toBe(true)

    await wrapper.setProps({ indeterminate: false })
    expect(input.element.indeterminate).toBe(false)
  })

  it('renders icon slots using the DaisyUI icon-toggle structure', () => {
    const wrapper = mount(DiSwitch, {
      attrs: { class: 'text-base-content', name: 'feature' },
      slots: {
        'unchecked-icon': '<svg data-test="unchecked" />',
        'checked-icon': '<svg data-test="checked" />',
      },
    })

    const toggle = wrapper.get('label.toggle')
    expect(toggle.classes()).toContain('text-base-content')
    expect(toggle.find('input[type="checkbox"]').exists()).toBe(true)
    expect(toggle.get('input').attributes('name')).toBe('feature')
    expect(toggle.find('[data-test="unchecked"]').exists()).toBe(true)
    expect(toggle.find('[data-test="checked"]').exists()).toBe(true)
  })
})
