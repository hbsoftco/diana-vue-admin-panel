import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent } from 'vue'

import DiInput from '../input/DiInput.vue'

describe('diInput', () => {
  it('renders a neutral DaisyUI input with md defaults', () => {
    const wrapper = mount(DiInput, { props: { placeholder: 'Your name' } })
    const control = wrapper.get('.input')
    const input = wrapper.get('input')

    expect(control.classes()).toEqual(
      expect.arrayContaining(['input', 'input-md', 'border-base-300']),
    )
    expect(control.classes()).not.toContain('input-primary')
    expect(input.attributes()).toMatchObject({ type: 'text', placeholder: 'Your name' })
  })

  it('updates text and numeric models using native value semantics', async () => {
    const text = mount(DiInput, { props: { modelValue: '' } })
    await text.get('input').setValue('Diana')
    expect(text.emitted('update:modelValue')).toEqual([['Diana']])

    const number = mount(DiInput, { props: { modelValue: null, type: 'number' } })
    await number.get('input').setValue('42')
    expect(number.emitted('update:modelValue')).toEqual([[42]])
    await number.get('input').setValue('')
    const numberUpdates = number.emitted('update:modelValue')
    expect(numberUpdates?.[numberUpdates.length - 1]).toEqual([null])
  })

  it('associates labels, descriptions, and forwarded native attributes', () => {
    const wrapper = mount(DiInput, {
      props: {
        id: 'account-email',
        label: 'Email address',
        helperText: 'We will not share your email.',
        required: true,
      },
      attrs: {
        'autocomplete': 'email',
        'name': 'email',
        'aria-describedby': 'external-description',
      },
    })
    const input = wrapper.get('input')

    expect(wrapper.get('label').attributes('for')).toBe('account-email')
    expect(input.attributes()).toMatchObject({
      'id': 'account-email',
      'name': 'email',
      'autocomplete': 'email',
      'required': '',
      'aria-describedby': 'external-description account-email-message',
    })
  })

  it('keeps validation independent from semantic variants', () => {
    const error = mount(DiInput, {
      props: { error: 'Required field', success: 'Looks good', variant: 'secondary' },
    })
    const control = error.get('.input')

    expect(control.classes()).toContain('input-error')
    expect(control.classes()).not.toContain('input-secondary')
    expect(error.get('input').attributes('aria-invalid')).toBe('true')
    expect(error.get('[role="alert"]').text()).toBe('Required field')

    const success = mount(DiInput, {
      props: { success: 'Available', variant: 'error' },
    })
    expect(success.get('.input').classes()).toContain('input-success')
    expect(success.text()).toContain('Available')
  })

  it('supports sizes, prefix and suffix slots, and loading state', () => {
    const wrapper = mount(DiInput, {
      props: { loading: true, size: 'lg', variant: 'info' },
      slots: {
        prefix: '<svg data-test="prefix" />',
        suffix: '<button type="button" data-test="suffix">Action</button>',
      },
    })

    expect(wrapper.get('.input').classes()).toEqual(
      expect.arrayContaining(['input-lg', '[&_svg]:size-5']),
    )
    expect(wrapper.find('[data-test="prefix"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="suffix"]').exists()).toBe(true)
    expect(wrapper.get('.loading').classes()).toEqual(
      expect.arrayContaining(['loading-sm', 'text-info']),
    )
    expect(wrapper.get('input').attributes('aria-busy')).toBe('true')
  })

  it('preserves native disabled and readonly behavior', async () => {
    const disabled = mount(DiInput, { props: { disabled: true, modelValue: 'Locked' } })
    expect(disabled.get('input').attributes('disabled')).toBeDefined()
    await disabled.get('input').setValue('Changed')
    expect(disabled.emitted('update:modelValue')).toBeUndefined()

    const readonly = mount(DiInput, { props: { readonly: true, modelValue: 'Read only' } })
    expect(readonly.get('input').attributes('readonly')).toBeDefined()
    await readonly.get('input').setValue('Changed')
    expect(readonly.emitted('update:modelValue')).toBeUndefined()
  })

  it('generates isolated ids for multiple instances', () => {
    const Harness = defineComponent({
      components: { DiInput },
      template: `
        <div>
          <DiInput label="First" helper-text="First help" />
          <DiInput label="Second" helper-text="Second help" />
        </div>
      `,
    })
    const wrapper = mount(Harness)
    const inputs = wrapper.findAll('input')
    const labels = wrapper.findAll('label')

    expect(inputs[0]!.attributes('id')).not.toBe(inputs[1]!.attributes('id'))
    expect(labels[0]!.attributes('for')).toBe(inputs[0]!.attributes('id'))
  })
})
