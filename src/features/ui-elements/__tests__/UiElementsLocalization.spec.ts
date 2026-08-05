import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { nextTick } from 'vue'

import { testI18n } from '@/shared/ui/base/__tests__/setup'

import IconsDemo from '../icons/ui/IconsDemo.vue'

describe('icons showcase localization', () => {
  it('updates icon showcase titles and badge content when the locale changes', async () => {
    testI18n.global.locale.value = 'en'
    const icons = mount(IconsDemo)

    expect(icons.text()).toContain('Icon Sizes')
    expect(icons.text()).toContain('Hot')

    testI18n.global.locale.value = 'fa'
    await nextTick()

    expect(icons.text()).toContain('اندازه‌های آیکون')
    expect(icons.text()).toContain('داغ')
  })
})
