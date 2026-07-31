import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent, nextTick, reactive, ref } from 'vue'

import DiSelect from '../select/DiSelect.vue'

const options = [
  { label: 'Texas', value: 'texas' },
  { label: 'California', value: 'california' },
  { label: 'Virginia', value: 'virginia', disabled: true },
]

const sequenceOptions = [
  { label: 'One', value: 'one' },
  { label: 'Two', value: 'two' },
  { label: 'Three', value: 'three' },
  { label: 'Four', value: 'four' },
]

afterEach(() => {
  document.body.innerHTML = ''
})

describe('diSelect', () => {
  it('renders accessible combobox and listbox semantics', async () => {
    const wrapper = mount(DiSelect, {
      attachTo: document.body,
      props: { options, modelValue: null },
    })

    const combobox = wrapper.get('[role="combobox"]')
    expect(combobox.attributes('aria-expanded')).toBe('false')

    await combobox.trigger('keydown', { key: 'ArrowDown' })

    expect(combobox.attributes('aria-expanded')).toBe('true')
    expect(wrapper.find('[role="listbox"]').exists()).toBe(true)
    expect(wrapper.findAll('[role="option"]')).toHaveLength(3)
    wrapper.unmount()
  })

  it('updates a single model and closes after selection', async () => {
    const wrapper = mount(DiSelect, {
      attachTo: document.body,
      props: { options, modelValue: null },
    })

    await wrapper.get('[role="combobox"]').trigger('keydown', { key: 'ArrowDown' })
    await wrapper.findAll('[role="option"]')[1]!.trigger('click')

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['california'])
    expect(wrapper.get('[role="combobox"]').attributes('aria-expanded')).toBe('false')
    wrapper.unmount()
  })

  it('supports multiple selection and backspace removal', async () => {
    const wrapper = mount(DiSelect, {
      attachTo: document.body,
      props: { options, modelValue: ['texas'], multiple: true },
    })

    const combobox = wrapper.get('[role="combobox"]')
    await combobox.trigger('keydown', { key: 'Backspace' })

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([[]])
    wrapper.unmount()
  })

  it('navigates and selects options with the keyboard', async () => {
    const wrapper = mount(DiSelect, {
      attachTo: document.body,
      props: { options, modelValue: null },
    })

    const combobox = wrapper.get('[role="combobox"]')
    await combobox.trigger('keydown', { key: 'ArrowDown' })
    await combobox.trigger('keydown', { key: 'Enter' })

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['texas'])
    wrapper.unmount()
  })

  it('blocks disabled options and disabled controls', async () => {
    const optionWrapper = mount(DiSelect, {
      attachTo: document.body,
      props: { options, modelValue: null },
    })
    await optionWrapper.get('[role="combobox"]').trigger('keydown', { key: 'ArrowDown' })
    await optionWrapper.findAll('[role="option"]')[2]!.trigger('click')
    expect(optionWrapper.emitted('update:modelValue')).toBeUndefined()
    optionWrapper.unmount()

    const disabledWrapper = mount(DiSelect, {
      attachTo: document.body,
      props: { options, modelValue: null, disabled: true },
    })
    expect(disabledWrapper.get('[role="combobox"]').attributes('disabled')).toBeDefined()
    await disabledWrapper.get('[role="combobox"]').trigger('focus')
    expect(disabledWrapper.find('[role="listbox"]').exists()).toBe(false)
    disabledWrapper.unmount()
  })

  it('enforces the maximum selection count', async () => {
    const wrapper = mount(DiSelect, {
      attachTo: document.body,
      props: { options, modelValue: ['texas'], multiple: true, maxSelections: 1 },
    })

    await wrapper.get('[role="combobox"]').trigger('keydown', { key: 'ArrowDown' })
    await wrapper.findAll('[role="option"]')[1]!.trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    expect(wrapper.emitted('maxReached')?.[0]).toEqual([1])
    expect(wrapper.findAll('[role="option"]')[1]!.attributes('aria-disabled')).toBeUndefined()
    wrapper.unmount()
  })

  it('filters searchable options and renders the empty state', async () => {
    const wrapper = mount(DiSelect, {
      attachTo: document.body,
      props: { options, modelValue: null, emptyText: 'Nothing matched' },
    })

    const combobox = wrapper.get('input[role="combobox"]')
    await combobox.setValue('unknown')

    expect(wrapper.get('[role="status"]').text()).toBe('Nothing matched')
    wrapper.unmount()
  })

  it('keeps the control neutral while applying variants to selection states', async () => {
    const singleWrapper = mount(DiSelect, {
      attachTo: document.body,
      props: { options, modelValue: 'texas', variant: 'success' },
    })

    expect(singleWrapper.get('[role="combobox"]').element.parentElement?.className).toContain(
      'border-base-300',
    )
    expect(singleWrapper.get('[role="combobox"]').element.parentElement?.className).not.toContain(
      'border-success',
    )
    await singleWrapper.get('[role="combobox"]').trigger('keydown', { key: 'ArrowDown' })
    expect(singleWrapper.findAll('[role="option"]')[0]!.classes()).toContain('text-success')
    expect(singleWrapper.get('[role="combobox"]').element.parentElement?.className).toContain(
      'ring-base-content/10',
    )
    singleWrapper.unmount()

    const multipleWrapper = mount(DiSelect, {
      attachTo: document.body,
      props: { options, modelValue: ['texas'], multiple: true, variant: 'secondary' },
    })
    expect(
      multipleWrapper.get('[role="combobox"]').element.previousElementSibling?.className,
    ).toContain('text-secondary')
    multipleWrapper.unmount()
  })

  it('keeps validation independent from the selection variant', () => {
    const wrapper = mount(DiSelect, {
      props: {
        options,
        modelValue: ['texas'],
        multiple: true,
        variant: 'success',
        invalid: true,
      },
    })

    expect(wrapper.get('[role="combobox"]').element.parentElement?.className).toContain(
      'border-error',
    )
    expect(wrapper.html()).toContain('text-success')
    expect(wrapper.html()).not.toContain('text-error')
  })

  it('uses md by default and propagates size through compound parts', async () => {
    const defaultWrapper = mount(DiSelect, {
      props: { options, modelValue: null },
    })
    expect(defaultWrapper.get('[role="combobox"]').element.parentElement?.className).toContain(
      'min-h-10',
    )

    const largeWrapper = mount(DiSelect, {
      attachTo: document.body,
      props: {
        options,
        modelValue: ['texas'],
        multiple: true,
        clearable: true,
        size: 'lg',
      },
    })
    const trigger = largeWrapper.get('[role="combobox"]').element.parentElement
    expect(trigger?.className).toContain('min-h-12')
    expect(largeWrapper.html()).toContain('py-1')
    expect(largeWrapper.get('button[aria-label="Clear selection"]').classes()).toContain('min-h-7')

    await largeWrapper.get('[role="combobox"]').trigger('keydown', { key: 'ArrowDown' })
    expect(largeWrapper.findAll('[role="option"]')[0]!.classes()).toContain('min-h-11')
    largeWrapper.unmount()
  })

  it('keeps every option selectable across multiple add, toggle, and tag removal updates', async () => {
    const Harness = defineComponent({
      components: { DiSelect },
      setup() {
        const selected = ref<string[]>(['one'])
        return { options: sequenceOptions, selected }
      },
      template: '<DiSelect v-model="selected" :options="options" multiple />',
    })
    const wrapper = mount(Harness, { attachTo: document.body })
    const combobox = wrapper.get('[role="combobox"]')

    await combobox.trigger('keydown', { key: 'ArrowDown' })
    await wrapper.findAll('[role="option"]')[1]!.trigger('click')
    await nextTick()
    expect(wrapper.find('button[aria-label="Remove Two"]').exists()).toBe(true)

    await wrapper.findAll('[role="option"]')[2]!.trigger('click')
    await nextTick()
    expect(wrapper.find('button[aria-label="Remove Three"]').exists()).toBe(true)

    await wrapper.get('button[aria-label="Remove One"]').trigger('click')
    await nextTick()
    expect(wrapper.find('button[aria-label="Remove One"]').exists()).toBe(false)

    await wrapper.findAll('[role="option"]')[3]!.trigger('click')
    await nextTick()
    expect(wrapper.find('button[aria-label="Remove Four"]').exists()).toBe(true)
    expect(wrapper.findAll('button[aria-label^="Remove "]')).toHaveLength(3)
    wrapper.unmount()
  })

  it('isolates selection state and generated ids between sibling instances', async () => {
    const Harness = defineComponent({
      components: { DiSelect },
      setup() {
        const examples = reactive([
          { id: 'primary', value: ['one'] },
          { id: 'success', value: ['one'] },
        ])
        return { examples, options: sequenceOptions }
      },
      template: `
        <div
          v-for="example in examples"
          :key="example.id"
          :data-test="example.id"
        >
          <DiSelect v-model="example.value" :options="options" multiple />
        </div>
      `,
    })
    const wrapper = mount(Harness, { attachTo: document.body })
    const primary = wrapper.get('[data-test="primary"]')
    const success = wrapper.get('[data-test="success"]')

    const controlsIds = wrapper
      .findAll('[role="combobox"]')
      .map(combobox => combobox.attributes('aria-controls'))
    expect(new Set(controlsIds).size).toBe(2)

    await primary.get('[role="combobox"]').trigger('keydown', { key: 'ArrowDown' })
    await primary.findAll('[role="option"]')[1]!.trigger('click')
    await nextTick()
    expect(primary.find('button[aria-label="Remove Two"]').exists()).toBe(true)
    expect(success.find('button[aria-label="Remove Two"]').exists()).toBe(false)

    await success.get('[role="combobox"]').trigger('keydown', { key: 'ArrowDown' })
    await success.findAll('[role="option"]')[2]!.trigger('click')
    await nextTick()
    expect(success.find('button[aria-label="Remove Three"]').exists()).toBe(true)
    expect(primary.find('button[aria-label="Remove Three"]').exists()).toBe(false)

    await primary.get('button[aria-label="Remove One"]').trigger('click')
    await nextTick()
    expect(primary.find('button[aria-label="Remove One"]').exists()).toBe(false)
    expect(success.find('button[aria-label="Remove One"]').exists()).toBe(true)
    wrapper.unmount()
  })

  it('releases the max selection constraint after a tag is removed', async () => {
    const Harness = defineComponent({
      components: { DiSelect },
      setup() {
        const selected = ref<string[]>(['one', 'two'])
        return { options: sequenceOptions, selected }
      },
      template: '<DiSelect v-model="selected" :options="options" multiple :max-selections="2" />',
    })
    const wrapper = mount(Harness, { attachTo: document.body })
    const combobox = wrapper.get('[role="combobox"]')

    await combobox.trigger('keydown', { key: 'ArrowDown' })
    expect(wrapper.findAll('[role="option"]')[2]!.attributes('aria-disabled')).toBeUndefined()
    await wrapper.findAll('[role="option"]')[2]!.trigger('click')
    await nextTick()
    expect(wrapper.find('button[aria-label="Remove Three"]').exists()).toBe(false)

    await wrapper.get('button[aria-label="Remove One"]').trigger('click')
    await wrapper.findAll('[role="option"]')[2]!.trigger('click')
    await nextTick()
    expect(wrapper.find('button[aria-label="Remove Three"]').exists()).toBe(true)
    wrapper.unmount()
  })

  it('keeps custom tag slots reactive while selections change', async () => {
    const Harness = defineComponent({
      components: { DiSelect },
      setup() {
        const selected = ref<string[]>(['one'])
        return { options: sequenceOptions, selected }
      },
      template: `
        <DiSelect v-model="selected" :options="options" multiple>
          <template #tag="{ option }">
            <strong data-test="custom-tag">{{ option.label }}</strong>
          </template>
        </DiSelect>
      `,
    })
    const wrapper = mount(Harness, { attachTo: document.body })

    await wrapper.get('[role="combobox"]').trigger('keydown', { key: 'ArrowDown' })
    await wrapper.findAll('[role="option"]')[1]!.trigger('click')
    await nextTick()

    expect(wrapper.findAll('[data-test="custom-tag"]').map(tag => tag.text())).toEqual([
      'One',
      'Two',
    ])
    wrapper.unmount()
  })
})
