<script setup lang="ts">
import { ref } from 'vue'

import DiRating from '@/shared/ui/base/DiRating.vue'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

/* =======================
   Models
======================= */
const basicValue = ref(3)
const halfValue = ref(2.5)
const readonlyValue = ref(1)

/* =======================
   Code samples
======================= */

const basicRating = `<DiRating v-model="value" />`

const sizesRating = `<div class="flex flex-col gap-4">
  <DiRating size="xs" />
  <DiRating size="sm" />
  <DiRating size="md" />
  <DiRating size="lg" />
</div>`

const variantsRating = `<div class="flex flex-wrap gap-4">
  <DiRating variant="warning" />
  <DiRating variant="primary" />
  <DiRating variant="secondary" />
  <DiRating variant="accent" />
  <DiRating variant="info" />
  <DiRating variant="success" />
  <DiRating variant="error" />
</div>`

const masksRating = `<div class="flex flex-wrap gap-6">
  <DiRating mask="star" />
  <DiRating mask="heart" />
  <DiRating mask="circle" />
  <DiRating mask="square" />
  <DiRating mask="star-2" />
</div>`

const halfRating = `<div class="flex flex-col gap-4">
  <DiRating v-model="value" half spacing="xs" />
  <DiRating v-model="value" mask="circle" spacing="xs" half />
  <DiRating v-model="value" mask="heart" spacing="xs" half />
  <DiRating v-model="value" mask="square" spacing="xs" half />
  <DiRating v-model="value" mask="square" half />
  <DiRating v-model="value" mask="star-2" half />
</div>`

const spacingRating = `<div class="flex flex-col gap-4">
  <DiRating spacing="xs" />
  <DiRating spacing="sm" />
  <DiRating spacing="md" />
  <DiRating spacing="lg" />
  <DiRating spacing="xl" />
</div>`

const readonlyRating = `<DiRating v-model="value" readOnly />`

const disabledRating = `<DiRating :model-value="3" disabled />`

const customMaxRating = `<DiRating :max="10" />`
</script>

<template>
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 items-start">
    <!-- Basic -->
    <PreviewCodeCard
      :title="$t('features.advancedUi.rating.basicRating')"
      accent-color="#f59e0b"
      :code="basicRating"
      language="html"
    >
      <DiRating v-model="basicValue" />
    </PreviewCodeCard>

    <!-- Sizes -->
    <PreviewCodeCard
      :title="$t('features.advancedUi.rating.sizesRating')"
      accent-color="#f59e0b"
      :code="sizesRating"
      language="html"
    >
      <div class="flex flex-col gap-4">
        <DiRating size="xs" />
        <DiRating size="sm" />
        <DiRating size="md" />
        <DiRating size="lg" />
      </div>
    </PreviewCodeCard>

    <!-- Variants -->
    <PreviewCodeCard
      :title="$t('features.advancedUi.rating.variants')"
      accent-color="#f59e0b"
      :code="variantsRating"
      language="html"
    >
      <div class="flex flex-wrap gap-4">
        <DiRating variant="warning" />
        <DiRating variant="primary" />
        <DiRating variant="secondary" />
        <DiRating variant="accent" />
        <DiRating variant="info" />
        <DiRating variant="success" />
        <DiRating variant="error" />
      </div>
    </PreviewCodeCard>

    <!-- Masks -->
    <PreviewCodeCard
      :title="$t('features.advancedUi.rating.masksRating')"
      accent-color="#f59e0b"
      :code="masksRating"
      language="html"
    >
      <div class="flex flex-wrap gap-6">
        <DiRating mask="star" />
        <DiRating mask="heart" />
        <DiRating mask="circle" />
        <DiRating mask="square" />
        <DiRating mask="star-2" />
      </div>
    </PreviewCodeCard>

    <!-- Half -->
    <PreviewCodeCard
      :title="$t('features.advancedUi.rating.halfRating')"
      accent-color="#f59e0b"
      :code="halfRating"
      language="html"
    >
      <div class="flex flex-col gap-4">
        <DiRating v-model="halfValue" half spacing="xs" />
        <DiRating v-model="halfValue" mask="circle" spacing="xs" half />
        <DiRating v-model="halfValue" mask="heart" spacing="xs" half />
        <DiRating v-model="halfValue" mask="square" spacing="xs" half />
        <DiRating v-model="halfValue" mask="square" half />
        <DiRating v-model="halfValue" mask="star-2" half />
      </div>
    </PreviewCodeCard>

    <!-- Spacing -->
    <PreviewCodeCard
      :title="$t('features.advancedUi.rating.spacingRating')"
      accent-color="#f59e0b"
      :code="spacingRating"
      language="html"
    >
      <div class="flex flex-col gap-4">
        <DiRating spacing="xs" />
        <DiRating spacing="sm" />
        <DiRating spacing="md" />
        <DiRating spacing="lg" />
        <DiRating spacing="xl" />
      </div>
    </PreviewCodeCard>

    <!-- Readonly -->
    <PreviewCodeCard
      :title="$t('features.advancedUi.rating.readonlyRating')"
      accent-color="#f59e0b"
      :code="readonlyRating"
      language="html"
    >
      <DiRating v-model="readonlyValue" read-only />
    </PreviewCodeCard>

    <!-- Disabled -->
    <PreviewCodeCard
      :title="$t('features.advancedUi.rating.disabledRating')"
      accent-color="#f59e0b"
      :code="disabledRating"
      language="html"
    >
      <DiRating :model-value="3" disabled />
    </PreviewCodeCard>

    <!-- Custom max -->
    <PreviewCodeCard
      :title="$t('features.advancedUi.rating.customMaxRating')"
      accent-color="#f59e0b"
      :code="customMaxRating"
      language="html"
      class="lg:col-span-2"
    >
      <DiRating :max="10" />
    </PreviewCodeCard>
  </div>
</template>
