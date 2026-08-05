import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'

import { testI18n } from '@/shared/ui/base/__tests__/setup'

import InputsDemo from '../form-elements/inputs/ui/InputsDemo.vue'
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
