<script setup>
import LanguageToggle from '@shared/ui/layout/LanguageToggle.vue'
import ThemeToggle from '@shared/ui/layout/ThemeToggle.vue'
</script>

<template>
  <div class="min-h-screen bg-base-100 text-base-content">
    <div class="flex justify-center">
      <ThemeToggle />

      <LanguageToggle />
    </div>
    {{ $t('greeting') }}
  </div>
</template>
