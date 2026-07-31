import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h } from 'vue'

import DiAlert from '@/shared/ui/base/DiAlert.vue'

describe('DiAlert', () => {
  it('renders semantic variant and layout classes', () => {
    const wrapper = mount(DiAlert, {
      props: {
        variant: 'primary',
        layout: 'vertical',
        soft: true,
        rounded: true,
      },
      slots: {
        default: 'Account settings were updated.',
      },
    })

    expect(wrapper.attributes('role')).toBe('alert')
    expect(wrapper.classes()).toContain('alert')
    expect(wrapper.classes()).toContain('alert-vertical')
    expect(wrapper.classes()).toContain('alert-soft')
    expect(wrapper.classes()).toContain('rounded-full')
    expect(wrapper.classes()).toContain('[--alert-color:var(--color-primary)]')
  })

  it('emits the model update and close event from the accessible close button', async () => {
    const wrapper = mount(DiAlert, {
      props: {
        closable: true,
        closeLabel: 'Dismiss notification',
      },
    })

    await wrapper.get('button[aria-label="Dismiss notification"]').trigger('click')

    expect(wrapper.emitted('update:modelValue')).toEqual([[false]])
    expect(wrapper.emitted('close')).toEqual([[]])
    expect(wrapper.get('button').element.parentElement?.classList).toContain('end-4')
  })

  it('exposes a close action to the custom close slot', async () => {
    const wrapper = mount(DiAlert, {
      props: {
        closable: true,
      },
      slots: {
        close: ({ close }: { close: () => void }) =>
          h('button', { class: 'custom-close', onClick: close }, 'Dismiss'),
      },
    })

    await wrapper.get('.custom-close').trigger('click')

    expect(wrapper.emitted('update:modelValue')).toEqual([[false]])
  })

  it('reacts when its model is shown again', async () => {
    const wrapper = mount(DiAlert, {
      props: {
        modelValue: false,
      },
    })

    expect(wrapper.find('[role="alert"]').exists()).toBe(false)

    await wrapper.setProps({ modelValue: true })

    expect(wrapper.find('[role="alert"]').exists()).toBe(true)
  })
})
