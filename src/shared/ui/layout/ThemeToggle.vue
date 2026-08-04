<script setup lang="ts">
import { useLocalStorage, usePreferredDark } from '@vueuse/core'
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import DiButton from '@/shared/ui/base/DiButton.vue'
import DiIcon from '@/shared/ui/base/DiIcon.vue'

const preferredDark = usePreferredDark()
const isDark = useLocalStorage('theme', preferredDark.value)
const { t } = useI18n()
const toggleLabel = computed(() =>
  isDark.value ? t('layout.theme.switchToLight') : t('layout.theme.switchToDark'),
)

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
    :aria-label="toggleLabel"
    :title="toggleLabel"
    @click="toggleTheme"
  >
    <DiIcon :name="!isDark ? 'moon' : 'sun'" size="sm" />
  </DiButton>
</template>
