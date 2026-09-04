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

  it('tags the Persian and Arabic entries with a script lang so they keep the Persian font', async () => {
    const wrapper = mount(LanguageToggle)

    await wrapper.get('[role="button"]').trigger('mousedown')

    const labelFor = (text: string) =>
      wrapper.findAll('ul button .language-name').find(node => node.text() === text)

    expect(labelFor('فارسی')?.attributes('lang')).toBe('fa')
    expect(labelFor('العربية')?.attributes('lang')).toBe('ar')
    // Other entries are tagged with their own locale, never the Persian-script lang.
    expect(labelFor('English')?.attributes('lang')).toBe('en')
  })
})
