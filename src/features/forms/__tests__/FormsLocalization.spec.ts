import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'

import { testI18n } from '@/shared/ui/base/__tests__/setup'
import DiOtpInput from '@/shared/ui/base/otp-input/DiOtpInput.vue'

import InputsDemo from '../form-elements/inputs/ui/InputsDemo.vue'
import OtpInputDemo from '../form-elements/otp-input/ui/OtpInputDemo.vue'
import SelectDemo from '../select/ui/SelectDemo.vue'

const previewCodeCardStub = {
  props: ['title'],
  template: '<section><h2>{{ title }}</h2><slot /></section>',
}

describe('forms showcase localization', () => {
  it('updates labels, placeholders, actions, and fixture descriptions at runtime', async () => {
    const inputs = mount(InputsDemo, {
      global: { stubs: { PreviewCodeCard: previewCodeCardStub } },
    })
    const select = mount(SelectDemo, {
      global: { stubs: { PreviewCodeCard: previewCodeCardStub } },
    })

    expect(inputs.text()).toContain('Basic Inputs')
    expect(inputs.get('input').attributes('placeholder')).toBe('Enter your name')
    expect(select.text()).toContain('Basic Select')
    expect(select.text()).toContain('Enable')

    testI18n.global.locale.value = 'fa'
    await nextTick()

    expect(inputs.text()).toContain('ورودی‌های پایه')
    expect(inputs.get('input').attributes('placeholder')).toBe('نام خود را وارد کنید')
    expect(select.text()).toContain('انتخاب پایه')
    expect(select.text()).toContain('فعال کردن')
  })
})

describe('otp input showcase', () => {
  it('renders every section and reflects the live value as it is typed', async () => {
    const wrapper = mount(OtpInputDemo, {
      global: { stubs: { PreviewCodeCard: previewCodeCardStub } },
    })

    expect(wrapper.text()).toContain('Basic Usage')
    expect(wrapper.text()).toContain('Sizes')
    expect(wrapper.text()).toContain('Lengths')
    expect(wrapper.text()).toContain('Disabled & Error')
    expect(wrapper.text()).toContain('Live Demo')
    expect(wrapper.text()).toContain('Waiting for input…')

    const otpInputs = wrapper.findAllComponents(DiOtpInput)
    const liveBoxes = otpInputs[otpInputs.length - 1]!.findAll('input')
    for (const box of liveBoxes) await box.setValue('1')

    expect(wrapper.text()).toContain('You entered: 111111')
  })

  it('updates section labels when the locale changes', async () => {
    const wrapper = mount(OtpInputDemo, {
      global: { stubs: { PreviewCodeCard: previewCodeCardStub } },
    })

    testI18n.global.locale.value = 'fa'
    await nextTick()

    expect(wrapper.text()).toContain('استفاده پایه')
    expect(wrapper.text()).toContain('نمایش زنده')
    expect(wrapper.text()).toContain('در انتظار ورود…')
  })
})
