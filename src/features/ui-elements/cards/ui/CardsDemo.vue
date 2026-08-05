<script setup lang="ts">
import DiCard from '@shared/ui/base/DiCard.vue'

import DiButton from '@/shared/ui/base/DiButton.vue'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

const buttonCode = `<DiButton>Example</DiButton>`
</script>

<template>
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start">
    <DiCard>
      <template #figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          :alt="$t('features.uiElements.cards.shoesAlt')"
        >
      </template>
      <template #title>
        {{ $t('features.uiElements.cards.title') }}
      </template>
      <p>
        {{ $t('features.uiElements.cards.description') }}
      </p>

      <template #footer>
        <span class="text-di-sm">{{ $t('features.uiElements.cards.lastUpdated') }}</span>
      </template>
    </DiCard>

    <DiCard figure-bottom>
      <template #header>
        <div class="">
          <span class="text-sm font-semibold text-base-content">{{
            $t('features.uiElements.cards.header')
          }}</span>
        </div>
      </template>

      <template #figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          :alt="$t('features.uiElements.cards.shoesAlt')"
        >
      </template>
      <template #title>
        {{ $t('features.uiElements.cards.title') }}
      </template>
      <p>
        {{ $t('features.uiElements.cards.description') }}
      </p>
    </DiCard>

    <DiCard>
      <template #figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          :alt="$t('features.uiElements.cards.shoesAlt')"
        >
      </template>
      <p>
        {{ $t('features.uiElements.cards.sampleDescription') }}
      </p>

      <div>
        <DiButton variant="primary">
          {{ $t('features.uiElements.cards.readMore') }}
        </DiButton>
      </div>
    </DiCard>

    <div>
      <DiCard class="mb-4">
        <p>
          {{ $t('features.uiElements.cards.description') }}
        </p>
      </DiCard>

      <DiCard accent-color="#14b8a6">
        <template #header>
          <div class="flex items-center justify-between w-full">
            <span class="text-sm font-semibold text-base-content">{{
              $t('features.uiElements.cards.defaultButtons')
            }}</span>
            <DiButton variant="primary" size="sm" :soft="true">
              {{ $t('features.uiElements.cards.showCode') }}

              <template #icon-right>
                <i-material-symbols-light-code class="text-sm" />
              </template>
            </DiButton>
          </div>
        </template>

        <template #title>
          {{ $t('features.uiElements.cards.title') }}
        </template>
        <p>
          {{ $t('features.uiElements.cards.description') }}
        </p>

        <template #footer>
          <span class="text-di-sm">{{ $t('features.uiElements.cards.lastUpdated') }}</span>
        </template>
      </DiCard>
    </div>

    <PreviewCodeCard
      :title="$t('features.uiElements.cards.defaultButtons')"
      accent-color="#14b8a6"
      :code="buttonCode"
    >
      <DiButton>{{ $t('features.uiElements.cards.example') }}</DiButton>
    </PreviewCodeCard>
  </div>
</template>
