<script setup lang="ts">
import DiLogoLoading from '@/shared/ui/base/DiLogoLoading.vue'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

const defaultLogoLoading = `<div class="h-72">
  <DiLogoLoading />
</div>`

const customTextLogoLoading = `<div class="h-72">
  <DiLogoLoading text="Loading your content..." />
</div>`

const largeLogoLoading = `<div class="h-72">
  <DiLogoLoading size="lg" />
</div>`

const logoLoadingWithoutIndicator = `<div class="h-72">
  <DiLogoLoading :show-indicator="false" />
</div>`
</script>

<template>
  <div class="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
    <PreviewCodeCard
      :title="$t('features.uiElements.logoLoading.default')"
      :code="defaultLogoLoading"
      language="html"
    >
      <div class="h-72">
        <DiLogoLoading />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.logoLoading.customText')"
      :code="customTextLogoLoading"
      language="html"
    >
      <div class="h-72">
        <DiLogoLoading text="Loading your content..." />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.logoLoading.differentSize')"
      :code="largeLogoLoading"
      language="html"
    >
      <div class="h-72">
        <DiLogoLoading size="lg" />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.logoLoading.withoutIndicator')"
      :code="logoLoadingWithoutIndicator"
      language="html"
    >
      <div class="h-72">
        <DiLogoLoading :show-indicator="false" />
      </div>
    </PreviewCodeCard>
  </div>
</template>
