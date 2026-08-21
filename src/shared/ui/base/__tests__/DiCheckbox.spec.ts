import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import DiCheckbox from '../checkbox/DiCheckbox.vue'

describe('diCheckbox', () => {
  it('uses md primary defaults and associates its label', () => {
    const wrapper = mount(DiCheckbox, { props: { id: 'terms', label: 'Accept terms' } })
    const input = wrapper.get('input')

    expect(input.classes()).toEqual(
      expect.arrayContaining(['checkbox', 'checkbox-md', 'checkbox-primary']),
    )
    expect(wrapper.get('label').attributes('for')).toBe('terms')
  })

  it('updates v-model and emits the native change event', async () => {
    const wrapper = mount(DiCheckbox, { props: { modelValue: false } })
    await wrapper.get('input').setValue(true)

    expect(wrapper.emitted('update:modelValue')).toEqual([[true]])
    expect(wrapper.emitted('change')?.[0]?.[0]).toBe(true)
    expect(wrapper.emitted('change')?.[0]?.[1]).toBeInstanceOf(Event)
  })

  it('synchronizes indeterminate state', async () => {
    const wrapper = mount(DiCheckbox, { props: { indeterminate: true } })
    const input = wrapper.get<HTMLInputElement>('input')

    expect(input.element.indeterminate).toBe(true)
    await wrapper.setProps({ indeterminate: false })
    expect(input.element.indeterminate).toBe(false)
  })

  it('preserves disabled checked state and blocks changes', async () => {
    const wrapper = mount(DiCheckbox, { props: { modelValue: true, disabled: true } })
    const input = wrapper.get<HTMLInputElement>('input')

    expect(input.element.checked).toBe(true)
    expect(input.attributes('disabled')).toBeDefined()
    await input.setValue(false)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('applies finite size and variant classes without physical direction classes', () => {
    const wrapper = mount(DiCheckbox, {
      props: { size: 'lg', variant: 'secondary', label: 'Option' },
    })
    const classes = wrapper.html()

    expect(wrapper.get('input').classes()).toEqual(
      expect.arrayContaining(['checkbox-lg', 'checkbox-secondary']),
    )
    expect(classes).not.toMatch(/\b(?:left|right|ml|mr)-/)
  })

  it('supports the DaisyUI xs size', () => {
    const wrapper = mount(DiCheckbox, { props: { size: 'xs', label: 'Extra small' } })
    expect(wrapper.get('input').classes()).toContain('checkbox-xs')
  })

  it('supports an accessible icon toggle with checked and disabled states', async () => {
    const wrapper = mount(DiCheckbox, {
      props: { appearance: 'icon', label: 'Favorite', variant: 'warning' },
      slots: {
        'icon': '<span data-test="off">off</span>',
        'checked-icon': '<span data-test="on">on</span>',
      },
    })
    const input = wrapper.get<HTMLInputElement>('input')

    expect(input.classes()).toEqual(expect.arrayContaining(['peer', 'sr-only']))
    expect(wrapper.get('label').text()).toContain('Favorite')
    expect(wrapper.get('label').classes()).toContain('peer-checked:text-warning')
    await input.setValue(true)
    expect(wrapper.emitted('update:modelValue')).toEqual([[true]])
    expect(wrapper.find('[data-test="off"]').exists()).toBe(false)
    expect(wrapper.find('[data-test="on"]').exists()).toBe(true)

    await wrapper.setProps({ disabled: true, modelValue: true })
    expect(input.attributes('disabled')).toBeDefined()
    expect(input.element.checked).toBe(true)
  })
})
