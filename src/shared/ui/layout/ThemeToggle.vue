<script setup lang="ts">
import { useLocalStorage, usePreferredDark } from '@vueuse/core'
import { watch } from 'vue'

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
  <button
    class="btn btn-circle p-2"
    :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
    @click="toggleTheme"
  >
    <i-tabler-sun v-if="isDark" class="text-xl" />
    <i-tabler-moon v-else class="text-xl" />
  </button>
</template>
