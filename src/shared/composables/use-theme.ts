import { useLocalStorage, usePreferredDark } from '@vueuse/core'
import { watch } from 'vue'

const preferredDark = usePreferredDark()

const isDark = useLocalStorage<boolean>('theme', preferredDark.value)

watch(
  isDark,
  (val) => {
    document.documentElement.dataset.theme
      = val ? 'diana-dark' : 'diana-light'
  },
  { immediate: true },
)

function toggleTheme() {
  isDark.value = !isDark.value
}

export function useTheme() {
  return {
    isDark,
    toggleTheme,
  }
}
