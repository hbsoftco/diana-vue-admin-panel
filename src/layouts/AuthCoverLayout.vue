<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import AuthBrandPanel from './AuthBrandPanel.vue'

type AuthBrandVariant = 'sign-in' | 'sign-up' | 'reset-password' | 'two-step'

const BRAND_KEYS: Record<
  AuthBrandVariant,
  { title: string, subtitle: string, artworkLabel: string }
> = {
  'sign-in': {
    title: 'features.auth.signIn.brandTitle',
    subtitle: 'features.auth.signIn.brandSubtitle',
    artworkLabel: 'features.auth.signIn.brandArtworkLabel',
  },
  'sign-up': {
    title: 'features.auth.signUp.brandTitle',
    subtitle: 'features.auth.signUp.brandSubtitle',
    artworkLabel: 'features.auth.signUp.brandArtworkLabel',
  },
  'reset-password': {
    title: 'features.auth.resetPassword.brandTitle',
    subtitle: 'features.auth.resetPassword.brandSubtitle',
    artworkLabel: 'features.auth.resetPassword.brandArtworkLabel',
  },
  'two-step': {
    title: 'features.auth.twoStep.brandTitle',
    subtitle: 'features.auth.twoStep.brandSubtitle',
    artworkLabel: 'features.auth.twoStep.brandArtworkLabel',
  },
}

const route = useRoute()
const { t } = useI18n()

// Each cover route declares `meta.brandVariant`; fall back to sign-in only if a
// future route forgets to (the copy still resolves rather than crashing).
const brand = computed(() => {
  const variant = (route.meta.brandVariant as AuthBrandVariant) ?? 'sign-in'
  const keys = BRAND_KEYS[variant] ?? BRAND_KEYS['sign-in']
  return {
    title: t(keys.title),
    subtitle: t(keys.subtitle),
    artworkLabel: t(keys.artworkLabel),
  }
})
</script>

<template>
  <div class="grid min-h-screen lg:grid-cols-5">
    <AuthBrandPanel
      class="hidden lg:col-span-2 lg:flex"
      :title="brand.title"
      :subtitle="brand.subtitle"
      :artwork-label="brand.artworkLabel"
    />

    <div class="flex items-center justify-center p-4 sm:p-6 lg:col-span-3 lg:p-10">
      <div class="w-full max-w-md">
        <RouterView />
      </div>
    </div>
  </div>
</template>
