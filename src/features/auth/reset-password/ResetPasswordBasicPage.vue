<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import DiLogo from '@/shared/ui/base/DiLogo.vue'

import ResetPasswordForm from './ui/ResetPasswordForm.vue'

const { t } = useI18n()
</script>

<template>
  <div class="flex min-h-screen items-center justify-center p-4 sm:p-6">
    <div class="w-full max-w-md">
      <RouterLink to="/" class="mb-8 flex justify-center">
        <DiLogo :label="t('layout.sidebar.logoAlt')" class="h-9 w-auto text-base-content" />
      </RouterLink>

      <div class="card border border-base-300 bg-base-100 shadow-sm">
        <div class="card-body p-6 sm:p-8">
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  </div>
</template>
