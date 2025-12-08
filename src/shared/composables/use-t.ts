import { useI18n } from 'vue-i18n'

export function useT(key: string, params?: Record<string, string>): string {
  try {
    const { t } = useI18n()
    return t(key, params || {})
  }
  catch (error) {
    return `[translation error: ${String(error)}]`
  }
}
