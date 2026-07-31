import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import DiRange from '../range/DiRange.vue'

describe('diRange', () => {
  it('renders a native DaisyUI range with Diana defaults', () => {
    const wrapper = mount(DiRange)
    const input = wrapper.get('input')

    expect(input.attributes()).toMatchObject({
      type: 'range',
      min: '0',
      max: '100',
      step: '1',
    })
    expect(input.classes()).toEqual(expect.arrayContaining(['range', 'range-md', 'range-primary']))
    expect(input.classes()).toContain('[--range-bg:var(--color-base-300)]')
  })

  it('updates its numeric model from native input', async () => {
    const wrapper = mount(DiRange, { props: { modelValue: 25 } })

    await wrapper.get('input').setValue('64')

    expect(wrapper.emitted('update:modelValue')).toEqual([[64]])
  })

  it('forwards limits, step, native attributes, and caller ids', () => {
    const wrapper = mount(DiRange, {
      props: { id: 'volume', min: -10, max: 10, step: 0.5, label: 'Volume' },
      attrs: { 'name': 'volume', 'aria-label': 'Volume level' },
    })
    const input = wrapper.get('input')

    expect(input.attributes()).toMatchObject({
      'id': 'volume',
      'min': '-10',
      'max': '10',
      'step': '0.5',
      'name': 'volume',
      'aria-label': 'Volume level',
    })
    expect(wrapper.get('label').attributes('for')).toBe('volume')
  })

  it('keeps validation messages independent from semantic variants', () => {
    const wrapper = mount(DiRange, {
      props: { error: 'Choose a lower value.', success: 'Valid', variant: 'secondary' },
    })
    const input = wrapper.get('input')

    expect(input.classes()).toContain('range-secondary')
    expect(input.classes()).not.toContain('range-error')
    expect(input.attributes('aria-invalid')).toBe('true')
    expect(wrapper.get('[role="alert"]').text()).toBe('Choose a lower value.')
  })

  it('supports size, value, helper text, and tick displays', () => {
    const wrapper = mount(DiRange, {
      props: {
        helperText: 'Choose a rating.',
        max: 4,
        modelValue: 2,
        showTicks: true,
        showValue: true,
        size: 'lg',
        step: 1,
      },
    })

    expect(wrapper.get('input').classes()).toContain('range-lg')
    expect(wrapper.get('output').text()).toBe('2')
    expect(wrapper.findAll('[aria-hidden="true"] > button')).toHaveLength(5)
    expect(wrapper.get('input').attributes('aria-describedby')).toContain('-message')
    expect(wrapper.text()).toContain('Choose a rating.')
  })

  it('supports formatted tooltips, square thumbs, and interactive ticks', async () => {
    const wrapper = mount(DiRange, {
      props: {
        formatValue: value => `${value}%`,
        modelValue: 25,
        showTooltip: true,
        thumbShape: 'square',
        ticks: [
          { value: 0, label: 'Low' },
          { value: 50, label: 'Medium' },
          { value: 100, label: 'High' },
        ],
        ticksClickable: true,
      },
    })

    expect(wrapper.get('input').classes()).toContain('di-range--square')
    expect(wrapper.text()).toContain('25%')
    expect(wrapper.findAll('button')).toHaveLength(3)

    await wrapper.findAll('button')[1]?.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toContainEqual([50])
  })

  it('supports DaisyUI vertical orientation', () => {
    const wrapper = mount(DiRange, { props: { orientation: 'vertical' } })

    expect(wrapper.get('input').classes()).toContain('di-range--vertical')
    expect(wrapper.get('input').attributes('aria-orientation')).toBe('vertical')
  })

  it('preserves native keyboard behavior while enforcing readonly', () => {
    const editable = mount(DiRange)
    const editableEvent = new KeyboardEvent('keydown', {
      key: 'ArrowRight',
      bubbles: true,
      cancelable: true,
    })
    editable.get('input').element.dispatchEvent(editableEvent)
    expect(editableEvent.defaultPrevented).toBe(false)

    const readonly = mount(DiRange, { props: { modelValue: 40, readonly: true } })
    const readonlyEvent = new KeyboardEvent('keydown', {
      key: 'End',
      bubbles: true,
      cancelable: true,
    })
    readonly.get('input').element.dispatchEvent(readonlyEvent)
    expect(readonlyEvent.defaultPrevented).toBe(true)
    expect(readonly.get('input').attributes('aria-readonly')).toBe('true')
  })

  it('blocks disabled and readonly model updates', async () => {
    const disabled = mount(DiRange, { props: { disabled: true, modelValue: 30 } })
    expect(disabled.get('input').attributes('disabled')).toBeDefined()
    await disabled.get('input').setValue('50')
    expect(disabled.emitted('update:modelValue')).toBeUndefined()

    const readonly = mount(DiRange, { props: { readonly: true, modelValue: 30 } })
    await readonly.get('input').setValue('50')
    expect(readonly.emitted('update:modelValue')).toBeUndefined()
    expect(readonly.get('input').element.value).toBe('30')
  })
})
