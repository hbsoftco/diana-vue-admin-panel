import { config } from '@vue/test-utils'
import { beforeEach } from 'vitest'
import { createI18n } from 'vue-i18n'

import ar from '@/shared/locales/ar'
import en from '@/shared/locales/en'
import es from '@/shared/locales/es'
import fa from '@/shared/locales/fa'
import fr from '@/shared/locales/fr'
import he from '@/shared/locales/he'

export const testI18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en, fa, ar, he, fr, es },
})

config.global.plugins = [testI18n]

beforeEach(() => {
  testI18n.global.locale.value = 'en'
})
