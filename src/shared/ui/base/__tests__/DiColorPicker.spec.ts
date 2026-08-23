import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { DiColorPicker } from '../color-picker'

describe('diColorPicker', () => {
  it('renders the default value with an associated label', () => {
    const wrapper = mount(DiColorPicker, { props: { label: 'Brand color' } })
    const textInput = wrapper.get('input[type="text"]')

    expect((textInput.element as HTMLInputElement).value).toBe('#000000')
    expect(wrapper.get('label').attributes('for')).toBe(textInput.attributes('id'))
    expect((wrapper.get('input[type="color"]').element as HTMLInputElement).value).toBe('#000000')
  })

  it('updates the model from the native picker and emits a committed change', async () => {
    const wrapper = mount(DiColorPicker, { props: { modelValue: '#000000' } })
    const picker = wrapper.get('input[type="color"]')

    await picker.setValue('#336699')

    expect(wrapper.emitted('update:modelValue')).toContainEqual(['#336699'])
    expect(wrapper.emitted('change')).toContainEqual(['#336699'])
  })

  it('normalizes valid HEX text and restores invalid drafts on blur', async () => {
    const wrapper = mount(DiColorPicker, { props: { modelValue: '#112233' } })
    const input = wrapper.get('input[type="text"]')

    await input.setValue('abcdef')
    await input.trigger('blur')
    expect(wrapper.emitted('change')).toContainEqual(['#ABCDEF'])

    await input.setValue('#nope')
    expect(input.attributes('aria-invalid')).toBe('true')
    await input.trigger('blur')
    expect((input.element as HTMLInputElement).value).toBe('#ABCDEF')
  })

  it('reflects external model updates', async () => {
    const wrapper = mount(DiColorPicker, { props: { modelValue: '#123456' } })
    await wrapper.setProps({ modelValue: '#FEDCBA' })
    expect((wrapper.get('input[type="text"]').element as HTMLInputElement).value).toBe('#FEDCBA')
  })

  it('blocks disabled and readonly changes', async () => {
    for (const state of [{ disabled: true }, { readonly: true }]) {
      const wrapper = mount(DiColorPicker, { props: { modelValue: '#123456', ...state } })
      await wrapper.get('input[type="text"]').setValue('#ABCDEF')
      await wrapper.get('input[type="color"]').trigger('change')
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      expect(wrapper.emitted('change')).toBeUndefined()
    }
  })

  it('supports compact and sized presentation', () => {
    const wrapper = mount(DiColorPicker, { props: { size: 'lg', variant: 'compact' } })
    expect(wrapper.get('.h-12').classes()).toEqual(expect.arrayContaining(['w-fit', 'gap-1.5']))
    expect(wrapper.get('input[type="text"]').classes()).toContain('text-base')
  })
})
