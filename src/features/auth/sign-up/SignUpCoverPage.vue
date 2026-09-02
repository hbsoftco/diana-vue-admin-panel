<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import AuthBrandPanel from '../sign-in/ui/AuthBrandPanel.vue'
import SignUpForm from './ui/SignUpForm.vue'

const { t } = useI18n()
</script>

<template>
  <div class="grid min-h-screen lg:grid-cols-2">
    <AuthBrandPanel
      class="hidden lg:flex"
      :title="t('features.auth.signUp.brandTitle')"
      :subtitle="t('features.auth.signUp.brandSubtitle')"
      :artwork-label="t('features.auth.signUp.brandArtworkLabel')"
    />

    <div class="flex items-center justify-center p-4 sm:p-6 lg:p-10">
      <div class="w-full max-w-md">
        <SignUpForm />
      </div>
    </div>
  </div>
</template>
