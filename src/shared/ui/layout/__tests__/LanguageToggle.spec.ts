import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'

import { testI18n } from '../../base/__tests__/setup'
import LanguageToggle from '../LanguageToggle.vue'

async function openPanel(wrapper: ReturnType<typeof mount>) {
  await wrapper.get('[data-di-dropdown-trigger]').trigger('click')
  await nextTick()
  await nextTick()
}

function optionButtons() {
  return Array.from(document.body.querySelectorAll<HTMLElement>('[role="menu"] [role="menuitem"]'))
}

describe('languageToggle', () => {
  beforeEach(() => {
    localStorage.removeItem('language')
    document.documentElement.lang = 'en'
    document.documentElement.dir = 'ltr'
  })

  afterEach(() => {
    document.body.innerHTML = ''
    testI18n.global.locale.value = 'en'
  })

  it('shows German and switches the application to the German LTR locale', async () => {
    const wrapper = mount(LanguageToggle, { attachTo: document.body })

    await openPanel(wrapper)

    const germanOption = optionButtons().find(option => option.textContent?.includes('Deutsch'))
    expect(germanOption).toBeDefined()

    germanOption!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await nextTick()

    expect(testI18n.global.locale.value).toBe('de')
    expect(document.documentElement.lang).toBe('de')
    expect(document.documentElement.dir).toBe('ltr')
    expect(wrapper.get('[data-di-dropdown-trigger]').attributes('aria-label')).toBe(
      'Sprache auswählen',
    )
    expect(wrapper.text()).toContain('🇩🇪')
    wrapper.unmount()
  })

  it('tags the Persian and Arabic entries with a script lang so they keep the Persian font', async () => {
    const wrapper = mount(LanguageToggle, { attachTo: document.body })

    await openPanel(wrapper)

    const labelFor = (text: string) =>
      optionButtons()
        .flatMap(button => Array.from(button.querySelectorAll<HTMLElement>('.language-name')))
        .find(node => node.textContent === text)

    expect(labelFor('فارسی')?.getAttribute('lang')).toBe('fa')
    expect(labelFor('العربية')?.getAttribute('lang')).toBe('ar')
    expect(labelFor('English')?.getAttribute('lang')).toBe('en')
    wrapper.unmount()
  })
})
