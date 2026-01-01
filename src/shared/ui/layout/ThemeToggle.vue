<script setup lang="ts">
import { useLocalStorage, usePreferredDark } from '@vueuse/core'
import { watch } from 'vue'

import DiButton from '@/shared/ui/base/DiButton.vue'
import DiIcon from '@/shared/ui/base/DiIcon.vue'

const preferredDark = usePreferredDark()
const isDark = useLocalStorage('theme', preferredDark.value)

watch(
  isDark,
  (val) => {
    document.documentElement.dataset.theme = val ? 'diana-dark' : 'diana-light'
  },
  { immediate: true },
)

function toggleTheme() {
  isDark.value = !isDark.value
}
</script>

<template>
  <DiButton
    size="sm"
    variant="ghost"
    circle
    :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
    @click="toggleTheme"
  >
    <DiIcon :name="!isDark ? 'moon' : 'sun'" size="sm" />
  </DiButton>
</template>
