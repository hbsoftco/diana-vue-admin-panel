import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const rtlLanguages = new Set(['fa', 'he', 'ar'])

export function useDirection() {
  const { locale } = useI18n()

  const isRtl = computed(() => rtlLanguages.has(locale.value))

  return { isRtl }
}
