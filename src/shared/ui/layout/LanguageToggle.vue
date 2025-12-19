<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

import Button from '@/shared/ui/Button.vue'
import Dropdown from '@/shared/ui/Dropdown.vue'

const { locale } = useI18n()

const languages = [
  { code: 'en', label: 'English', dir: 'ltr', flag: '🇺🇸' },
  { code: 'fa', label: 'فارسی', dir: 'rtl', flag: '🇮🇷' },
  { code: 'he', label: 'עברית', dir: 'rtl', flag: '🇮🇱' },
  { code: 'es', label: 'Español', dir: 'ltr', flag: '🇪🇸' },
  { code: 'ar', label: 'العربية', dir: 'rtl', flag: '🇸🇦' },
  { code: 'fr', label: 'Français', dir: 'ltr', flag: '🇫🇷' },
]

const currentLang = useLocalStorage<string>('language', 'en')

watch(
  currentLang,
  (lang) => {
    locale.value = lang

    const found = languages.find(l => l.code === lang)
    document.documentElement.dir = found?.dir || 'ltr'
    document.documentElement.lang = lang
  },
  { immediate: true },
)
</script>

<template>
  <Dropdown
    v-model="currentLang"
    :options="languages"
    size="md"
    label-key="label"
    value-key="code"
    position="bottom"
    align="center"
    close-on-click
    width="w-38"
  >
    <!-- Trigger -->
    <template #trigger>
      <Button size="sm" variant="ghost" circle>
        <span class="text-lg">
          {{ languages.find((l) => l.code === currentLang)?.flag }}
        </span>
      </Button>
    </template>

    <!-- Option -->
    <template #option="{ option, select, selected }">
      <button
        class="flex w-full items-center gap-2 px-2 py-1"
        :class="{ 'bg-base-200': selected }"
        @click="select"
      >
        <span class="emoji-flag">{{ option.flag }}</span>
        <span>{{ option.label }}</span>
        <span v-if="selected" class="rtl:mr-auto ltr:ml-auto">✓</span>
      </button>
    </template>
  </Dropdown>
</template>
