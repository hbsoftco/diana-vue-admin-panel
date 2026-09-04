<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import DiDropdown from '@/shared/ui/base/DiDropdown.vue'

const { locale, t } = useI18n()

const languages = [
  { code: 'en', label: 'English', dir: 'ltr', flag: '🇺🇸' },
  { code: 'fa', label: 'فارسی', dir: 'rtl', flag: '🇮🇷' },
  { code: 'he', label: 'עברית', dir: 'rtl', flag: '🇮🇱' },
  { code: 'es', label: 'Español', dir: 'ltr', flag: '🇪🇸' },
  { code: 'ar', label: 'العربية', dir: 'rtl', flag: '🇸🇦' },
  { code: 'fr', label: 'Français', dir: 'ltr', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', dir: 'ltr', flag: '🇩🇪' },
]

const currentLang = useLocalStorage<string>('language', 'en')
const languageToggleLabel = computed(() => t('layout.language.select'))
const currentFlag = computed(() => languages.find(l => l.code === currentLang.value)?.flag)

function selectLanguage(code: string) {
  currentLang.value = code
}

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
  <DiDropdown
    class="btn btn-ghost btn-circle btn-sm"
    group="header"
    placement="bottom"
    role="menu"
    panel-class="w-44 p-1"
    :aria-label="languageToggleLabel"
    :title="languageToggleLabel"
  >
    <template #trigger>
      <span class="text-lg">{{ currentFlag }}</span>
    </template>

    <template #default>
      <button
        v-for="language in languages"
        :key="language.code"
        type="button"
        role="menuitem"
        class="flex w-full items-center gap-2 rounded-field px-2 py-1.5 hover:bg-base-200 focus:bg-base-200 focus:outline-none"
        :class="{ 'bg-base-200': language.code === currentLang }"
        :aria-current="language.code === currentLang ? 'true' : undefined"
        @click="selectLanguage(language.code)"
      >
        <span class="emoji-flag">{{ language.flag }}</span>
        <span class="language-name" :lang="language.code">{{ language.label }}</span>
        <span v-if="language.code === currentLang" class="ltr:ml-auto rtl:mr-auto">✓</span>
      </button>
    </template>
  </DiDropdown>
</template>

<style scoped>
/*
 * Force the Persian/Arabic entries to render in the project's Persian font
 * ('Dana', matching html:lang(fa|ar) body in assets/css/style.css) even when
 * the active panel locale is something else. Other entries are untouched.
 */
.language-name[lang='fa'],
.language-name[lang='ar'] {
  font-family: 'Dana', sans-serif;
}
</style>
