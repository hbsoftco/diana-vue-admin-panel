<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import type { Size } from '@/shared/types/models'

import DiLogo from '@/shared/ui/base/DiLogo.vue'

type Props = {
  text?: string
  size?: Size
  showIndicator?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  showIndicator: true,
})

const { t } = useI18n()

const SIZE_CLASSES: Record<Size, string> = {
  xs: 'w-12',
  sm: 'w-16',
  md: 'w-24',
  lg: 'w-32',
  xl: 'w-40',
}

const logoClasses = computed(() => ['di-logo-loading__logo h-auto', SIZE_CLASSES[props.size]])
const loadingText = computed(() => props.text ?? t('components.logoLoading.loading'))
</script>

<template>
  <div
    class="di-logo-loading flex size-full min-h-40 flex-col items-center justify-center gap-4 text-center text-base-content"
    role="status"
    aria-live="polite"
    aria-busy="true"
  >
    <DiLogo variant="mini" :class="logoClasses" />

    <span class="text-sm text-base-content/70">{{ loadingText }}</span>

    <span
      v-if="showIndicator"
      class="di-logo-loading__indicator flex items-center gap-1.5"
      aria-hidden="true"
    >
      <span v-for="dot in 3" :key="dot" class="size-1.5 rounded-full bg-primary" />
    </span>
  </div>
</template>

<style scoped>
.di-logo-loading__logo {
  animation: di-logo-loading-breathe 2.8s ease-in-out infinite;
}

.di-logo-loading__indicator > span {
  animation: di-logo-loading-dot 1.4s ease-in-out infinite;
}

.di-logo-loading__indicator > span:nth-child(2) {
  animation-delay: 160ms;
}

.di-logo-loading__indicator > span:nth-child(3) {
  animation-delay: 320ms;
}

@keyframes di-logo-loading-breathe {
  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.06);
  }
}

@keyframes di-logo-loading-dot {
  0%,
  60%,
  100% {
    opacity: 0.3;
    transform: translateY(0);
  }

  30% {
    opacity: 1;
    transform: translateY(-0.2rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .di-logo-loading__logo,
  .di-logo-loading__indicator > span {
    animation: none;
  }
}
</style>
