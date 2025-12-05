import ar from '@shared/locales/ar.json'
import en from '@shared/locales/en.json'
import es from '@shared/locales/es.json'
import fa from '@shared/locales/fa.json'
import fr from '@shared/locales/fr.json'
import he from '@shared/locales/he.json'
import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en, fa, ar, he, fr, es },
})
