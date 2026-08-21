import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, nextTick, ref } from 'vue'

import DiButtonGroup from '../DiButtonGroup.vue'
import DiToggleButton from '../DiToggleButton.vue'

describe('diToggleButton', () => {
  it('renders a focusable native checkbox with an associated button label', () => {
    const wrapper = mount(DiToggleButton, {
      props: { id: 'bold', label: 'Bold' },
      attrs: { 'aria-describedby': 'bold-help', 'data-control': 'bold' },
    })
    const input = wrapper.get<HTMLInputElement>('input')

    expect(input.attributes('type')).toBe('checkbox')
    expect(input.classes()).toEqual(expect.arrayContaining(['peer', 'sr-only']))
    expect(wrapper.get('label').attributes('for')).toBe('bold')
    expect(input.attributes()).toMatchObject({
      'aria-describedby': 'bold-help',
      'data-control': 'bold',
    })
    expect(wrapper.get('label').classes()).toEqual(
      expect.arrayContaining(['btn', 'btn-md', 'btn-primary']),
    )
  })

  it('updates a checkbox model through native keyboard activation', async () => {
    const wrapper = mount(DiToggleButton, { props: { modelValue: false, label: 'Bold' } })
    const input = wrapper.get('input')

    await input.trigger('keydown', { key: ' ' })
    await input.setValue(true)
    expect(wrapper.emitted('update:modelValue')).toEqual([[true]])
  })

  it('updates a radio model to its value', async () => {
    const wrapper = mount(DiToggleButton, {
      props: { type: 'radio', modelValue: null, value: 'daily', name: 'frequency', label: 'Daily' },
    })
    await wrapper.get('input').setValue(true)
    expect(wrapper.emitted('update:modelValue')).toEqual([['daily']])
  })

  it('uses native disabled state and logical-only classes', async () => {
    const wrapper = mount(DiToggleButton, {
      props: { disabled: true, modelValue: true, label: 'Locked' },
    })
    const input = wrapper.get<HTMLInputElement>('input')

    expect(input.attributes('disabled')).toBeDefined()
    expect(input.element.checked).toBe(true)
    await input.setValue(false)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.html()).not.toMatch(/\b(?:left|right|ml|mr)-/)
  })

  it('supports the DaisyUI xs size while preserving the native input', () => {
    const wrapper = mount(DiToggleButton, { props: { size: 'xs', label: 'Extra small' } })
    expect(wrapper.get('label').classes()).toContain('btn-xs')
    expect(wrapper.get('input').classes()).toEqual(expect.arrayContaining(['peer', 'sr-only']))
  })

  it('reflects programmatic checkbox model changes in the native checked state', async () => {
    const wrapper = mount(DiToggleButton, { props: { modelValue: false, label: 'Pinned' } })
    const input = wrapper.get<HTMLInputElement>('input')

    expect(input.element.checked).toBe(false)
    await wrapper.setProps({ modelValue: true })
    expect(input.element.checked).toBe(true)
    expect(wrapper.get('label').classes()).toContain('peer-checked:btn-active')
  })

  it('keeps keyboard focus visible through the peer selector', () => {
    const wrapper = mount(DiToggleButton, { props: { label: 'Keyboard option' } })
    expect(wrapper.get('label').classes()).toEqual(
      expect.arrayContaining([
        'peer-focus-visible:outline-2',
        'peer-focus-visible:outline-offset-2',
      ]),
    )
  })

  it('composes native radio siblings inside an attached DiButtonGroup', async () => {
    const Harness = defineComponent({
      components: { DiButtonGroup, DiToggleButton },
      setup() {
        const selected = ref<string | null>('list')
        return { selected }
      },
      template: `
        <DiButtonGroup aria-label="View mode">
          <DiToggleButton v-model="selected" type="radio" name="view" value="list" label="List" />
          <DiToggleButton v-model="selected" type="radio" name="view" value="grid" label="Grid" />
          <DiToggleButton v-model="selected" type="radio" name="view" value="board" label="Board" disabled />
        </DiButtonGroup>
      `,
    })
    const wrapper = mount(Harness, { attachTo: document.body })
    const inputs = wrapper.findAll<HTMLInputElement>('input')
    const labels = wrapper.findAll('label.btn')

    expect(inputs.map(input => input.attributes('name'))).toEqual(['view', 'view', 'view'])
    expect(inputs[0]?.element.checked).toBe(true)
    expect(inputs[2]?.attributes('disabled')).toBeDefined()
    expect(wrapper.get('.di-button-group').classes()).toContain('di-button-group-attached')
    expect(labels).toHaveLength(3)

    await inputs[1]?.setValue(true)
    await nextTick()
    expect(inputs[0]?.element.checked).toBe(false)
    expect(inputs[1]?.element.checked).toBe(true)
  })
})
