<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

import { GOOGLE_MAP_DEMOS } from './google-maps'
import GoogleMap from './ui/GoogleMap.vue'

const { t } = useI18n()
const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
</script>

<template>
  <div class="grid grid-cols-1 items-start gap-6 xl:grid-cols-2">
    <PreviewCodeCard
      v-for="demo in GOOGLE_MAP_DEMOS"
      :key="demo.id"
      :title="t(demo.titleKey)"
      :code="demo.code"
      language="vue"
    >
      <GoogleMap :api-key="googleMapsApiKey" :demo="demo.id" :map-label="t(demo.labelKey)" />
    </PreviewCodeCard>
  </div>
</template>
