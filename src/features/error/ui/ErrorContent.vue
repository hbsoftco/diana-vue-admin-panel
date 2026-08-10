<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import DiButton from '@/shared/ui/base/DiButton.vue'
import DiIcon from '@/shared/ui/base/DiIcon.vue'

import ErrorIllustration from './ErrorIllustration.vue'

type Props = {
  code: '401' | '404' | '500'
}

const props = defineProps<Props>()
const router = useRouter()
const { t } = useI18n()

const translationKey = `features.error.${props.code}` as const
</script>

<template>
  <section
    class="card w-full max-w-5xl overflow-hidden border border-base-300 bg-base-100 shadow-sm"
    :aria-labelledby="`error-${code}-title`"
  >
    <div class="card-body items-center justify-center px-5 py-8 text-center sm:px-10 sm:py-10">
      <ErrorIllustration :code="code" :label="t(`${translationKey}.illustrationAlt`)" />

      <div class="mt-2 max-w-2xl">
        <p class="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          {{ t('features.error.statusLabel', { code }) }}
        </p>
        <h2 :id="`error-${code}-title`" class="text-2xl font-bold text-base-content sm:text-3xl">
          {{ t(`${translationKey}.heading`) }}
        </h2>
        <p class="mt-3 text-sm leading-6 text-base-content/65 sm:text-base">
          {{ t(`${translationKey}.description`) }}
        </p>

        <DiButton variant="primary" custom-class="mt-7" @click="router.push('/')">
          <template #icon-left>
            <DiIcon name="homeOutlineRounded" />
          </template>
          {{ t('features.error.backToHome') }}
        </DiButton>
      </div>
    </div>
  </section>
</template>
