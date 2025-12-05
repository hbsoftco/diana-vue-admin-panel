<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const languages = [
  { code: 'en', label: 'English', dir: 'ltr' },
  { code: 'es', label: 'Español', dir: 'ltr' },
  { code: 'fa', label: 'فارسی', dir: 'rtl' },
  { code: 'ar', label: 'العربية', dir: 'rtl' },
  { code: 'he', label: 'עברית', dir: 'rtl' },
  { code: 'fr', label: 'Français', dir: 'ltr' },
]

const savedLang = useLocalStorage('language', 'en')

const currentLang = ref(savedLang.value)

function switchLanguage(lang: string) {
  currentLang.value = lang
  savedLang.value = lang
  locale.value = lang

  document.documentElement.dir = languages.find(l => l.code === lang)?.dir || 'ltr'
}

onMounted(() => {
  switchLanguage(savedLang.value)
})
</script>

<template>
  <div class="relative">
    <button
      class="btn btn-circle p-2"
      popovertarget="popover-lang"
      style="anchor-name: --anchor-lang"
    >
      {{ currentLang.toUpperCase() }}
    </button>

    <ul
      id="popover-lang"
      class="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
      popover
      style="position-anchor: --anchor-lang"
    >
      <li v-for="lang in languages" :key="lang.code">
        <a @click="switchLanguage(lang.code)">{{ lang.label }}</a>
      </li>
    </ul>
  </div>
</template>
