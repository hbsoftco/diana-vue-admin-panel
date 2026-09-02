<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import logoUrl from '@/assets/images/logo.svg'

type Props = {
  title?: string
  subtitle?: string
  artworkLabel?: string
}

defineProps<Props>()

const { t } = useI18n()
</script>

<template>
  <section
    class="relative flex h-full flex-col justify-between overflow-hidden bg-primary p-10 text-primary-content xl:p-14"
  >
    <svg
      class="pointer-events-none absolute inset-0 h-full w-full opacity-30"
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <circle cx="60" cy="70" r="140" class="fill-primary-content/10" />
      <circle cx="330" cy="320" r="180" class="fill-primary-content/10" />
      <circle cx="320" cy="60" r="8" class="fill-primary-content/40" />
      <circle cx="80" cy="330" r="6" class="fill-primary-content/40" />
    </svg>

    <img
      :src="logoUrl"
      :alt="t('layout.sidebar.logoAlt')"
      class="relative h-9 w-auto brightness-0 invert"
    >

    <div class="relative max-w-md">
      <p class="text-3xl font-bold leading-tight xl:text-4xl">
        {{ title ?? t('features.auth.signIn.brandTitle') }}
      </p>
      <p class="mt-4 text-base text-primary-content/80">
        {{ subtitle ?? t('features.auth.signIn.brandSubtitle') }}
      </p>
    </div>

    <p class="relative text-sm text-primary-content/70">
      {{ artworkLabel ?? t('features.auth.signIn.brandArtworkLabel') }}
    </p>
  </section>
</template>
