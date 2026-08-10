<script setup lang="ts">
import { watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const route = useRoute()
const { t } = useI18n()

watchEffect(() => {
  if (route.meta.pageTitle) {
    document.title = t(route.meta.pageTitle as string)
  }
})
</script>

<template>
  <main class="flex min-h-screen items-center justify-center bg-base-200 p-4 sm:p-6">
    <RouterView />
  </main>
</template>
