<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import DiLogo from '@/shared/ui/base/DiLogo.vue'

type Props = {
  title: string
  subtitle: string
  artworkLabel: string
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

    <DiLogo
      mono
      :label="t('layout.sidebar.logoAlt')"
      class="relative h-9 w-auto text-primary-content"
    />

    <div class="relative max-w-md">
      <p class="text-3xl font-bold leading-tight xl:text-4xl">
        {{ title }}
      </p>
      <p class="mt-4 text-base text-primary-content/80">
        {{ subtitle }}
      </p>
    </div>

    <p class="relative text-sm text-primary-content/70">
      {{ artworkLabel }}
    </p>
  </section>
</template>
