import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'

import { testI18n } from '../../base/__tests__/setup'
import LanguageToggle from '../LanguageToggle.vue'

describe('languageToggle', () => {
  beforeEach(() => {
    localStorage.removeItem('language')
    document.documentElement.lang = 'en'
    document.documentElement.dir = 'ltr'
  })

  it('shows German and switches the application to the German LTR locale', async () => {
    const wrapper = mount(LanguageToggle)

    await wrapper.get('[role="button"]').trigger('mousedown')

    const germanOption = wrapper
      .findAll('ul button')
      .find(option => option.text().includes('Deutsch'))

    expect(germanOption).toBeDefined()

    await germanOption!.trigger('click')
    await nextTick()

    expect(testI18n.global.locale.value).toBe('de')
    expect(document.documentElement.lang).toBe('de')
    expect(document.documentElement.dir).toBe('ltr')
    expect(wrapper.get('button[aria-label]').attributes('aria-label')).toBe('Sprache auswählen')
    expect(wrapper.text()).toContain('🇩🇪')
  })
})
