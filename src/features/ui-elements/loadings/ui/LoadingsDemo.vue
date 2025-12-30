<script setup lang="ts">
import DiLoading from '@/shared/ui/base/DiLoading.vue'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

const spinnerLoading = `<div class="flex flex-wrap gap-4 items-center">
  <DiLoading variant="spinner" size="xs" />
  <DiLoading variant="spinner" size="sm" />
  <DiLoading variant="spinner" size="md" />
  <DiLoading variant="spinner" size="lg" />
  <DiLoading variant="spinner" size="xl" />
</div>`

const dotsLoading = `<div class="flex flex-wrap gap-4 items-center">
  <DiLoading variant="dots" size="xs" />
  <DiLoading variant="dots" size="sm" />
  <DiLoading variant="dots" size="md" />
  <DiLoading variant="dots" size="lg" />
  <DiLoading variant="dots" size="xl" />
</div>`

const ringLoading = `<div class="flex flex-wrap gap-4 items-center">
  <DiLoading variant="ring" size="xs" />
  <DiLoading variant="ring" size="sm" />
  <DiLoading variant="ring" size="md" />
  <DiLoading variant="ring" size="lg" />
  <DiLoading variant="ring" size="xl" />
</div>`

const ballLoading = `<div class="flex flex-wrap gap-4 items-center">
  <DiLoading variant="ball" size="xs" />
  <DiLoading variant="ball" size="sm" />
  <DiLoading variant="ball" size="md" />
  <DiLoading variant="ball" size="lg" />
  <DiLoading variant="ball" size="xl" />
</div>`

const barsLoading = `<div class="flex flex-wrap gap-4 items-center">
  <DiLoading variant="bars" size="xs" />
  <DiLoading variant="bars" size="sm" />
  <DiLoading variant="bars" size="md" />
  <DiLoading variant="bars" size="lg" />
  <DiLoading variant="bars" size="xl" />
</div>`

const infinityLoading = `<div class="flex flex-wrap gap-4 items-center">
  <DiLoading variant="infinity" size="xs" />
  <DiLoading variant="infinity" size="sm" />
  <DiLoading variant="infinity" size="md" />
  <DiLoading variant="infinity" size="lg" />
  <DiLoading variant="infinity" size="xl" />
</div>`

const coloredSpinner = `<div class="flex flex-wrap gap-4 items-center">
  <DiLoading variant="spinner" size="lg" color="primary" />
  <DiLoading variant="spinner" size="lg" color="secondary" />
  <DiLoading variant="spinner" size="lg" color="accent" />
  <DiLoading variant="spinner" size="lg" color="info" />
  <DiLoading variant="spinner" size="lg" color="success" />
  <DiLoading variant="spinner" size="lg" color="warning" />
  <DiLoading variant="spinner" size="lg" color="error" />
</div>`

const coloredDots = `<div class="flex flex-wrap gap-4 items-center">
  <DiLoading variant="dots" size="lg" color="primary" />
  <DiLoading variant="dots" size="lg" color="secondary" />
  <DiLoading variant="dots" size="lg" color="accent" />
  <DiLoading variant="dots" size="lg" color="info" />
  <DiLoading variant="dots" size="lg" color="success" />
  <DiLoading variant="dots" size="lg" color="warning" />
  <DiLoading variant="dots" size="lg" color="error" />
</div>`

const coloredRing = `<div class="flex flex-wrap gap-4 items-center">
  <DiLoading variant="ring" size="lg" color="primary" />
  <DiLoading variant="ring" size="lg" color="secondary" />
  <DiLoading variant="ring" size="lg" color="accent" />
  <DiLoading variant="ring" size="lg" color="info" />
  <DiLoading variant="ring" size="lg" color="success" />
  <DiLoading variant="ring" size="lg" color="warning" />
  <DiLoading variant="ring" size="lg" color="error" />
</div>`

const coloredBall = `<div class="flex flex-wrap gap-4 items-center">
  <DiLoading variant="ball" size="lg" color="primary" />
  <DiLoading variant="ball" size="lg" color="secondary" />
  <DiLoading variant="ball" size="lg" color="accent" />
  <DiLoading variant="ball" size="lg" color="info" />
  <DiLoading variant="ball" size="lg" color="success" />
  <DiLoading variant="ball" size="lg" color="warning" />
  <DiLoading variant="ball" size="lg" color="error" />
</div>`

const coloredBars = `<div class="flex flex-wrap gap-4 items-center">
  <DiLoading variant="bars" size="lg" color="primary" />
  <DiLoading variant="bars" size="lg" color="secondary" />
  <DiLoading variant="bars" size="lg" color="accent" />
  <DiLoading variant="bars" size="lg" color="info" />
  <DiLoading variant="bars" size="lg" color="success" />
  <DiLoading variant="bars" size="lg" color="warning" />
  <DiLoading variant="bars" size="lg" color="error" />
</div>`

const coloredInfinity = `<div class="flex flex-wrap gap-4 items-center">
  <DiLoading variant="infinity" size="lg" color="primary" />
  <DiLoading variant="infinity" size="lg" color="secondary" />
  <DiLoading variant="infinity" size="lg" color="accent" />
  <DiLoading variant="infinity" size="lg" color="info" />
  <DiLoading variant="infinity" size="lg" color="success" />
  <DiLoading variant="infinity" size="lg" color="warning" />
  <DiLoading variant="infinity" size="lg" color="error" />
</div>`

const allVariants = `<div class="flex flex-wrap gap-6 items-center">
  <DiLoading variant="spinner" size="lg" color="primary" />
  <DiLoading variant="dots" size="lg" color="secondary" />
  <DiLoading variant="ring" size="lg" color="accent" />
  <DiLoading variant="ball" size="lg" color="info" />
  <DiLoading variant="bars" size="lg" color="success" />
  <DiLoading variant="infinity" size="lg" color="warning" />
</div>`
</script>

<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 items-start">
    <!-- Spinner Loading -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.loading.spinnerLoading')"
      accent-color="#14b8a6"
      :code="spinnerLoading"
      language="html"
    >
      <div class="flex flex-wrap gap-4 items-center">
        <DiLoading variant="spinner" size="xs" />
        <DiLoading variant="spinner" size="sm" />
        <DiLoading variant="spinner" size="md" />
        <DiLoading variant="spinner" size="lg" />
        <DiLoading variant="spinner" size="xl" />
      </div>
    </PreviewCodeCard>

    <!-- Dots Loading -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.loading.dotsLoading')"
      accent-color="#14b8a6"
      :code="dotsLoading"
      language="html"
    >
      <div class="flex flex-wrap gap-4 items-center">
        <DiLoading variant="dots" size="xs" />
        <DiLoading variant="dots" size="sm" />
        <DiLoading variant="dots" size="md" />
        <DiLoading variant="dots" size="lg" />
        <DiLoading variant="dots" size="xl" />
      </div>
    </PreviewCodeCard>

    <!-- Ring Loading -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.loading.ringLoading')"
      accent-color="#14b8a6"
      :code="ringLoading"
      language="html"
    >
      <div class="flex flex-wrap gap-4 items-center">
        <DiLoading variant="ring" size="xs" />
        <DiLoading variant="ring" size="sm" />
        <DiLoading variant="ring" size="md" />
        <DiLoading variant="ring" size="lg" />
        <DiLoading variant="ring" size="xl" />
      </div>
    </PreviewCodeCard>

    <!-- Ball Loading -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.loading.ballLoading')"
      accent-color="#14b8a6"
      :code="ballLoading"
      language="html"
    >
      <div class="flex flex-wrap gap-4 items-center">
        <DiLoading variant="ball" size="xs" />
        <DiLoading variant="ball" size="sm" />
        <DiLoading variant="ball" size="md" />
        <DiLoading variant="ball" size="lg" />
        <DiLoading variant="ball" size="xl" />
      </div>
    </PreviewCodeCard>

    <!-- Bars Loading -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.loading.barsLoading')"
      accent-color="#14b8a6"
      :code="barsLoading"
      language="html"
    >
      <div class="flex flex-wrap gap-4 items-center">
        <DiLoading variant="bars" size="xs" />
        <DiLoading variant="bars" size="sm" />
        <DiLoading variant="bars" size="md" />
        <DiLoading variant="bars" size="lg" />
        <DiLoading variant="bars" size="xl" />
      </div>
    </PreviewCodeCard>

    <!-- Infinity Loading -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.loading.infinityLoading')"
      accent-color="#14b8a6"
      :code="infinityLoading"
      language="html"
    >
      <div class="flex flex-wrap gap-4 items-center">
        <DiLoading variant="infinity" size="xs" />
        <DiLoading variant="infinity" size="sm" />
        <DiLoading variant="infinity" size="md" />
        <DiLoading variant="infinity" size="lg" />
        <DiLoading variant="infinity" size="xl" />
      </div>
    </PreviewCodeCard>

    <!-- Colored Spinner -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.loading.coloredSpinner')"
      accent-color="#14b8a6"
      :code="coloredSpinner"
      language="html"
    >
      <div class="flex flex-wrap gap-4 items-center">
        <DiLoading variant="spinner" size="lg" color="primary" />
        <DiLoading variant="spinner" size="lg" color="secondary" />
        <DiLoading variant="spinner" size="lg" color="accent" />
        <DiLoading variant="spinner" size="lg" color="info" />
        <DiLoading variant="spinner" size="lg" color="success" />
        <DiLoading variant="spinner" size="lg" color="warning" />
        <DiLoading variant="spinner" size="lg" color="error" />
      </div>
    </PreviewCodeCard>

    <!-- Colored Dots -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.loading.coloredDots')"
      accent-color="#14b8a6"
      :code="coloredDots"
      language="html"
    >
      <div class="flex flex-wrap gap-4 items-center">
        <DiLoading variant="dots" size="lg" color="primary" />
        <DiLoading variant="dots" size="lg" color="secondary" />
        <DiLoading variant="dots" size="lg" color="accent" />
        <DiLoading variant="dots" size="lg" color="info" />
        <DiLoading variant="dots" size="lg" color="success" />
        <DiLoading variant="dots" size="lg" color="warning" />
        <DiLoading variant="dots" size="lg" color="error" />
      </div>
    </PreviewCodeCard>

    <!-- Colored Ring -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.loading.coloredRing')"
      accent-color="#14b8a6"
      :code="coloredRing"
      language="html"
    >
      <div class="flex flex-wrap gap-4 items-center">
        <DiLoading variant="ring" size="lg" color="primary" />
        <DiLoading variant="ring" size="lg" color="secondary" />
        <DiLoading variant="ring" size="lg" color="accent" />
        <DiLoading variant="ring" size="lg" color="info" />
        <DiLoading variant="ring" size="lg" color="success" />
        <DiLoading variant="ring" size="lg" color="warning" />
        <DiLoading variant="ring" size="lg" color="error" />
      </div>
    </PreviewCodeCard>

    <!-- Colored Ball -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.loading.coloredBall')"
      accent-color="#14b8a6"
      :code="coloredBall"
      language="html"
    >
      <div class="flex flex-wrap gap-4 items-center">
        <DiLoading variant="ball" size="lg" color="primary" />
        <DiLoading variant="ball" size="lg" color="secondary" />
        <DiLoading variant="ball" size="lg" color="accent" />
        <DiLoading variant="ball" size="lg" color="info" />
        <DiLoading variant="ball" size="lg" color="success" />
        <DiLoading variant="ball" size="lg" color="warning" />
        <DiLoading variant="ball" size="lg" color="error" />
      </div>
    </PreviewCodeCard>

    <!-- Colored Bars -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.loading.coloredBars')"
      accent-color="#14b8a6"
      :code="coloredBars"
      language="html"
    >
      <div class="flex flex-wrap gap-4 items-center">
        <DiLoading variant="bars" size="lg" color="primary" />
        <DiLoading variant="bars" size="lg" color="secondary" />
        <DiLoading variant="bars" size="lg" color="accent" />
        <DiLoading variant="bars" size="lg" color="info" />
        <DiLoading variant="bars" size="lg" color="success" />
        <DiLoading variant="bars" size="lg" color="warning" />
        <DiLoading variant="bars" size="lg" color="error" />
      </div>
    </PreviewCodeCard>

    <!-- Colored Infinity -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.loading.coloredInfinity')"
      accent-color="#14b8a6"
      :code="coloredInfinity"
      language="html"
    >
      <div class="flex flex-wrap gap-4 items-center">
        <DiLoading variant="infinity" size="lg" color="primary" />
        <DiLoading variant="infinity" size="lg" color="secondary" />
        <DiLoading variant="infinity" size="lg" color="accent" />
        <DiLoading variant="infinity" size="lg" color="info" />
        <DiLoading variant="infinity" size="lg" color="success" />
        <DiLoading variant="infinity" size="lg" color="warning" />
        <DiLoading variant="infinity" size="lg" color="error" />
      </div>
    </PreviewCodeCard>

    <!-- All Variants Combined -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.loading.allVariants')"
      accent-color="#14b8a6"
      :code="allVariants"
      language="html"
      class="lg:col-span-2"
    >
      <div class="flex flex-wrap gap-6 items-center justify-center">
        <DiLoading variant="spinner" size="lg" color="primary" />
        <DiLoading variant="dots" size="lg" color="secondary" />
        <DiLoading variant="ring" size="lg" color="accent" />
        <DiLoading variant="ball" size="lg" color="info" />
        <DiLoading variant="bars" size="lg" color="success" />
        <DiLoading variant="infinity" size="lg" color="warning" />
      </div>
    </PreviewCodeCard>
  </div>
</template>
