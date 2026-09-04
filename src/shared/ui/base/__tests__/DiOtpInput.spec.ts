import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import DiOtpInput from '../otp-input/DiOtpInput.vue'

function paste(text: string) {
  return {
    clipboardData: { getData: () => text },
  }
}

function lastEmitted(events: unknown[][] | undefined) {
  return events?.[events.length - 1]
}

describe('diOtpInput', () => {
  it('renders `length` numeric boxes inside an ltr, labelled fieldset', () => {
    const wrapper = mount(DiOtpInput, { props: { length: 4, ariaLabel: 'Verification code' } })
    const inputs = wrapper.findAll('input')

    expect(inputs).toHaveLength(4)
    expect(wrapper.get('fieldset').attributes('dir')).toBe('ltr')
    expect(wrapper.get('fieldset').attributes('aria-label')).toBe('Verification code')
    for (const input of inputs) {
      expect(input.attributes('inputmode')).toBe('numeric')
      expect(input.attributes('maxlength')).toBe('1')
    }
    expect(inputs[0]?.attributes('aria-label')).toBe('Digit 1 of 4')
    expect(inputs[3]?.attributes('aria-label')).toBe('Digit 4 of 4')
  })

  it('scales boxes with size, matching DiInput tokens', () => {
    const wrapper = mount(DiOtpInput, { props: { length: 2, size: 'lg' } })
    expect(wrapper.get('input').classes()).toEqual(
      expect.arrayContaining(['input-lg', 'text-base']),
    )
  })

  it('auto-advances on typing and emits the joined model value', async () => {
    const wrapper = mount(DiOtpInput, { props: { length: 3, modelValue: '' }, attachTo: document.body })
    const inputs = wrapper.findAll<HTMLInputElement>('input')

    await inputs[0]!.setValue('1')
    expect(lastEmitted(wrapper.emitted('update:modelValue'))).toEqual(['1'])
    expect(document.activeElement).toBe(inputs[1]!.element)

    await inputs[1]!.setValue('2')
    expect(lastEmitted(wrapper.emitted('update:modelValue'))).toEqual(['12'])
    expect(document.activeElement).toBe(inputs[2]!.element)
  })

  it('replaces an already-filled box and still advances', async () => {
    const wrapper = mount(DiOtpInput, { props: { length: 2, modelValue: '12' }, attachTo: document.body })
    const inputs = wrapper.findAll<HTMLInputElement>('input')

    await inputs[0]!.setValue('9')
    expect(lastEmitted(wrapper.emitted('update:modelValue'))).toEqual(['92'])
    expect(document.activeElement).toBe(inputs[1]!.element)
  })

  it('emits `complete` exactly once when the last box fills', async () => {
    const wrapper = mount(DiOtpInput, { props: { length: 2, modelValue: '' } })
    const inputs = wrapper.findAll<HTMLInputElement>('input')

    await inputs[0]!.setValue('1')
    expect(wrapper.emitted('complete')).toBeUndefined()

    await inputs[1]!.setValue('2')
    expect(wrapper.emitted('complete')).toEqual([['12']])

    // Editing a box while already full must not re-fire `complete`.
    await inputs[0]!.setValue('9')
    expect(wrapper.emitted('complete')).toEqual([['12']])
  })

  it('ignores characters outside the numeric character set', async () => {
    const wrapper = mount(DiOtpInput, { props: { length: 2, modelValue: '' } })
    const input = wrapper.findAll<HTMLInputElement>('input')[0]!

    await input.setValue('a')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(input.element.value).toBe('')
  })

  it('accepts letters and digits in alphanumeric mode', async () => {
    const wrapper = mount(DiOtpInput, { props: { length: 2, inputType: 'alphanumeric', modelValue: '' } })
    const input = wrapper.findAll<HTMLInputElement>('input')[0]!

    await input.setValue('a')
    expect(lastEmitted(wrapper.emitted('update:modelValue'))).toEqual(['a'])
  })

  it('moves to and clears the previous box on backspace from an empty box', async () => {
    const wrapper = mount(DiOtpInput, { props: { length: 3, modelValue: '12' }, attachTo: document.body })
    const inputs = wrapper.findAll<HTMLInputElement>('input')

    inputs[2]!.element.focus()
    await inputs[2]!.trigger('keydown', { key: 'Backspace' })

    expect(lastEmitted(wrapper.emitted('update:modelValue'))).toEqual(['1'])
    expect(document.activeElement).toBe(inputs[1]!.element)
  })

  it('clears a filled box on backspace without moving focus', async () => {
    const wrapper = mount(DiOtpInput, { props: { length: 3, modelValue: '123' }, attachTo: document.body })
    const inputs = wrapper.findAll<HTMLInputElement>('input')

    inputs[1]!.element.focus()
    await inputs[1]!.setValue('')

    expect(lastEmitted(wrapper.emitted('update:modelValue'))).toEqual(['13'])
    expect(document.activeElement).toBe(inputs[1]!.element)
  })

  it('navigates boxes with ArrowLeft/ArrowRight without changing values', async () => {
    const wrapper = mount(DiOtpInput, { props: { length: 3, modelValue: '123' }, attachTo: document.body })
    const inputs = wrapper.findAll<HTMLInputElement>('input')

    inputs[1]!.element.focus()
    await inputs[1]!.trigger('keydown', { key: 'ArrowRight' })
    expect(document.activeElement).toBe(inputs[2]!.element)

    await inputs[2]!.trigger('keydown', { key: 'ArrowLeft' })
    expect(document.activeElement).toBe(inputs[1]!.element)

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('distributes a pasted code across boxes and focuses the last filled one', async () => {
    const wrapper = mount(DiOtpInput, { props: { length: 4, modelValue: '' }, attachTo: document.body })
    const inputs = wrapper.findAll<HTMLInputElement>('input')

    await inputs[0]!.trigger('paste', paste('12ab34'))

    expect(lastEmitted(wrapper.emitted('update:modelValue'))).toEqual(['1234'])
    expect(wrapper.emitted('complete')).toEqual([['1234']])
    expect(document.activeElement).toBe(inputs[3]!.element)
  })

  it('starts pasted digits from the focused box, not always the first', async () => {
    const wrapper = mount(DiOtpInput, { props: { length: 4, modelValue: '' } })
    const inputs = wrapper.findAll<HTMLInputElement>('input')

    await inputs[1]!.trigger('paste', paste('56'))

    expect(lastEmitted(wrapper.emitted('update:modelValue'))).toEqual(['56'])
  })

  it('blocks all interaction while disabled', async () => {
    const wrapper = mount(DiOtpInput, { props: { length: 2, modelValue: '', disabled: true } })
    const input = wrapper.findAll<HTMLInputElement>('input')[0]!

    expect(input.attributes('disabled')).toBeDefined()
    await input.trigger('paste', paste('12'))
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('blocks all interaction while readonly', async () => {
    const wrapper = mount(DiOtpInput, { props: { length: 2, modelValue: '', readonly: true } })
    const input = wrapper.findAll<HTMLInputElement>('input')[0]!

    expect(input.attributes('readonly')).toBeDefined()
    await input.trigger('paste', paste('12'))
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('shows the error state and links the message via aria-describedby', () => {
    const wrapper = mount(DiOtpInput, { props: { length: 2, error: 'Invalid code' } })
    const fieldset = wrapper.get('fieldset')
    const message = wrapper.get('[role="alert"]')

    expect(wrapper.get('input').classes()).toContain('input-error')
    expect(fieldset.attributes('aria-invalid')).toBe('true')
    expect(fieldset.attributes('aria-describedby')).toBe(message.attributes('id'))
    expect(message.text()).toBe('Invalid code')
  })

  it('auto-focuses the first box on mount when requested', () => {
    const wrapper = mount(DiOtpInput, { props: { length: 3, autoFocus: true }, attachTo: document.body })
    expect(document.activeElement).toBe(wrapper.findAll('input')[0]!.element)
  })

  it('resyncs boxes when the model is reset externally', async () => {
    const wrapper = mount(DiOtpInput, { props: { length: 3, modelValue: '123' } })
    await wrapper.setProps({ modelValue: '' })
    const inputs = wrapper.findAll<HTMLInputElement>('input')

    expect(inputs.every(input => input.element.value === '')).toBe(true)
  })
})
