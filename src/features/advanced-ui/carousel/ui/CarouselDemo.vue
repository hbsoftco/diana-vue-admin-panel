<script setup lang="ts">
import { ref } from 'vue'

import DiCarousel from '@/shared/ui/base/DiCarousel.vue'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

const activeSlide = ref(0)

const basicCode = `<template>
  <DiCarousel :slide-count="3">
    <template #default="{ index }">
      <div class="grid min-h-64 w-full place-items-center bg-base-200">
        Slide {{ index + 1 }}
      </div>
    </template>
  </DiCarousel>
</template>`

const controlledCode = `<script setup lang="ts">
import { ref } from 'vue'
import DiCarousel from '@/shared/ui/base/DiCarousel.vue'

const activeSlide = ref(0)
<\/script>

<template>
  <DiCarousel v-model="activeSlide" :slide-count="3" loop>
    <template #default="{ index }">
      <article>Slide {{ index + 1 }}</article>
    </template>
  </DiCarousel>
</template>`

const minimalCode = `<template>
  <DiCarousel
    :slide-count="3"
    :show-controls="false"
    label="Featured content"
  >
    <template #default="{ index }">
      <article>Featured item {{ index + 1 }}</article>
    </template>
  </DiCarousel>
</template>`
</script>

<template>
  <div class="grid grid-cols-1 gap-6 xl:grid-cols-2">
    <PreviewCodeCard :title="$t('features.advancedUi.carousel.basic')" :code="basicCode">
      <DiCarousel
        :slide-count="3"
        :label="$t('features.advancedUi.carousel.label')"
        :previous-label="$t('features.advancedUi.carousel.previous')"
        :next-label="$t('features.advancedUi.carousel.next')"
        :slide-label="$t('features.advancedUi.carousel.slide')"
      >
        <template #default="{ index }">
          <div
            class="grid min-h-64 w-full place-items-center bg-base-200 text-4xl font-bold text-base-content"
          >
            {{ $t('features.advancedUi.carousel.slide') }} {{ index + 1 }}
          </div>
        </template>
      </DiCarousel>
    </PreviewCodeCard>

    <PreviewCodeCard :title="$t('features.advancedUi.carousel.controlled')" :code="controlledCode">
      <DiCarousel
        v-model="activeSlide"
        :slide-count="3"
        loop
        :label="$t('features.advancedUi.carousel.label')"
        :previous-label="$t('features.advancedUi.carousel.previous')"
        :next-label="$t('features.advancedUi.carousel.next')"
        :slide-label="$t('features.advancedUi.carousel.slide')"
      >
        <template #default="{ index }">
          <article
            class="flex min-h-64 w-full flex-col justify-end bg-primary p-6 text-primary-content"
          >
            <p class="text-sm font-semibold uppercase tracking-wide">
              {{ $t('features.advancedUi.carousel.featured') }}
            </p>
            <h3 class="mt-2 text-3xl font-bold">
              {{ $t('features.advancedUi.carousel.story') }} {{ index + 1 }}
            </h3>
          </article>
        </template>
      </DiCarousel>
      <p class="mt-3 text-xs text-base-content/60">
        {{ $t('features.advancedUi.carousel.active') }}: {{ activeSlide + 1 }}
      </p>
    </PreviewCodeCard>

    <PreviewCodeCard
      class="xl:col-span-2"
      :title="$t('features.advancedUi.carousel.indicatorsOnly')"
      :code="minimalCode"
    >
      <DiCarousel
        :slide-count="3"
        :show-controls="false"
        :label="$t('features.advancedUi.carousel.featured')"
        :slide-label="$t('features.advancedUi.carousel.slide')"
      >
        <template #default="{ index }">
          <div
            class="grid min-h-48 w-full place-items-center border border-base-300 bg-base-100 p-8 text-center"
          >
            <span class="text-xl font-semibold">
              {{ $t('features.advancedUi.carousel.story') }} {{ index + 1 }}
            </span>
          </div>
        </template>
      </DiCarousel>
    </PreviewCodeCard>
  </div>
</template>
