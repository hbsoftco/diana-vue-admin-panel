<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import DiCard from '@/shared/ui/base/DiCard.vue'

import GoogleMap from './ui/GoogleMap.vue'

const { t } = useI18n()
const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
</script>

<template>
  <div class="grid grid-cols-1 gap-6">
    <DiCard
      :title="t('features.mapsIcons.googleMaps.basicMap')"
      border
      body-class="gap-0 p-0 overflow-hidden rounded-b-box"
    >
      <GoogleMap
        :api-key="googleMapsApiKey"
        :center="{ lat: 35.7219, lng: 51.3347 }"
        :zoom="11"
        :map-label="t('features.mapsIcons.googleMaps.mapLabel')"
      />
    </DiCard>
  </div>
</template>
