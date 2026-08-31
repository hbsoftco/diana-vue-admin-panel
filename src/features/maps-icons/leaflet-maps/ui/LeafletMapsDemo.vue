<script setup lang="ts">
import { ref, shallowRef } from 'vue'

import type {
  DiLeafletCoordinate,
  DiLeafletMarker,
  DiLeafletTileLayer,
} from '@/shared/ui/base/di-leaflet-maps'

import DiButton from '@/shared/ui/base/DiButton.vue'
import DiLeafletMaps from '@/shared/ui/base/DiLeafletMaps.vue'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

const london = { lat: 51.505, lng: -0.09 }
const paris = { lat: 48.8566, lng: 2.3522 }
const clickedCoordinate = ref<DiLeafletCoordinate>()

const cityMarkers: DiLeafletMarker[] = [
  { id: 'london', position: london, popup: 'London' },
  { id: 'westminster', position: { lat: 51.4995, lng: -0.1248 }, popup: 'Westminster' },
  { id: 'tower', position: { lat: 51.5081, lng: -0.0759 }, popup: 'Tower of London' },
]

const richPopupMarkers: DiLeafletMarker[] = [
  { id: 'eiffel', position: { lat: 48.8584, lng: 2.2945 } },
]

const openTopoMap: DiLeafletTileLayer = {
  url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
  attribution: 'Map data © OpenStreetMap contributors, SRTM | Map style © OpenTopoMap',
  options: { maxZoom: 17 },
}

const dynamicMarkers = shallowRef<DiLeafletMarker[]>([
  { id: 'lisbon', position: { lat: 38.7223, lng: -9.1393 }, popup: 'Lisbon' },
  { id: 'madrid', position: { lat: 40.4168, lng: -3.7038 }, popup: 'Madrid' },
  { id: 'paris', position: paris, popup: 'Paris' },
  { id: 'berlin', position: { lat: 52.52, lng: 13.405 }, popup: 'Berlin' },
])

function addRome() {
  if (dynamicMarkers.value.some(marker => marker.id === 'rome'))
    return

  dynamicMarkers.value = [
    ...dynamicMarkers.value,
    { id: 'rome', position: { lat: 41.9028, lng: 12.4964 }, popup: 'Rome' },
  ]
}

const basicCode = `<template>
  <DiLeafletMaps
    :center="{ lat: 51.505, lng: -0.09 }"
    :zoom="12"
    :height="300"
    aria-label="Basic map of London"
  />
</template>`

const markersCode = `<script setup lang="ts">
import type { DiLeafletMarker } from '@/shared/ui/base/di-leaflet-maps'
import DiLeafletMaps from '@/shared/ui/base/DiLeafletMaps.vue'

const cityMarkers: DiLeafletMarker[] = [
  { id: 'london', position: { lat: 51.505, lng: -0.09 }, popup: 'London' },
  { id: 'westminster', position: { lat: 51.4995, lng: -0.1248 }, popup: 'Westminster' },
  { id: 'tower', position: { lat: 51.5081, lng: -0.0759 }, popup: 'Tower of London' },
]
<\/script>

<template>
  <DiLeafletMaps
    :center="{ lat: 51.505, lng: -0.09 }"
    :zoom="13"
    :markers="cityMarkers"
    :height="300"
    aria-label="London landmarks"
    @marker-click="event => console.log(event.marker.id)"
  />
</template>`

const popupCode = `<script setup lang="ts">
import DiLeafletMaps from '@/shared/ui/base/DiLeafletMaps.vue'

const markers = [{ id: 'eiffel', position: { lat: 48.8584, lng: 2.2945 } }]
<\/script>

<template>
  <DiLeafletMaps
    :center="{ lat: 48.8566, lng: 2.3522 }"
    :zoom="13"
    :markers="markers"
    aria-label="Paris map"
  >
    <template #popup="{ marker }">
      <article class="min-w-40">
        <strong>Eiffel Tower</strong>
        <p class="mt-1 text-xs">Marker: {{ marker.id }}</p>
      </article>
    </template>
  </DiLeafletMaps>
</template>`

const tileCode = `<script setup lang="ts">
import DiLeafletMaps from '@/shared/ui/base/DiLeafletMaps.vue'

const openTopoMap = {
  url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
  attribution: 'Map data © OpenStreetMap contributors, SRTM | Map style © OpenTopoMap',
  options: { maxZoom: 17 },
}
<\/script>

<template>
  <DiLeafletMaps
    :center="{ lat: 46.8, lng: 8.23 }"
    :zoom="7"
    :tile-layer="openTopoMap"
    aria-label="Topographic map of Switzerland"
  />
</template>`

const interactiveCode = `<script setup lang="ts">
import { ref } from 'vue'
import DiLeafletMaps from '@/shared/ui/base/DiLeafletMaps.vue'

const clickedCoordinate = ref()
<\/script>

<template>
  <DiLeafletMaps
    :center="{ lat: 39.5, lng: -98.35 }"
    :zoom="4"
    aria-label="Clickable map of the United States"
    @map-click="clickedCoordinate = $event"
  />
  <p v-if="clickedCoordinate">
    {{ clickedCoordinate.lat.toFixed(5) }}, {{ clickedCoordinate.lng.toFixed(5) }}
  </p>
</template>`

const advancedCode = `<script setup lang="ts">
import { ref } from 'vue'
import DiButton from '@/shared/ui/base/DiButton.vue'
import DiLeafletMaps from '@/shared/ui/base/DiLeafletMaps.vue'

const markers = ref([
  { id: 'lisbon', position: { lat: 38.7223, lng: -9.1393 }, popup: 'Lisbon' },
  { id: 'madrid', position: { lat: 40.4168, lng: -3.7038 }, popup: 'Madrid' },
  { id: 'paris', position: { lat: 48.8566, lng: 2.3522 }, popup: 'Paris' },
  { id: 'berlin', position: { lat: 52.52, lng: 13.405 }, popup: 'Berlin' },
])

function addRome() {
  markers.value = [...markers.value, {
    id: 'rome', position: { lat: 41.9028, lng: 12.4964 }, popup: 'Rome',
  }]
}
<\/script>

<template>
  <DiLeafletMaps :markers="markers" fit-bounds aria-label="European cities" />
  <DiButton size="sm" variant="primary" @click="addRome">Add Rome</DiButton>
</template>`
</script>

<template>
  <div class="grid grid-cols-1 items-start gap-6 xl:grid-cols-2">
    <PreviewCodeCard
      :title="$t('features.mapsIcons.leafletMaps.basicMap')"
      :code="basicCode"
      language="vue"
    >
      <DiLeafletMaps
        :center="london"
        :zoom="12"
        :height="300"
        :aria-label="$t('features.mapsIcons.leafletMaps.basicMapLabel')"
      />
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.mapsIcons.leafletMaps.markers')"
      :code="markersCode"
      language="vue"
    >
      <DiLeafletMaps
        :center="london"
        :zoom="13"
        :markers="cityMarkers"
        :height="300"
        :aria-label="$t('features.mapsIcons.leafletMaps.markersLabel')"
      />
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.mapsIcons.leafletMaps.customPopup')"
      :code="popupCode"
      language="vue"
    >
      <DiLeafletMaps
        :center="paris"
        :zoom="13"
        :markers="richPopupMarkers"
        :aria-label="$t('features.mapsIcons.leafletMaps.popupLabel')"
      >
        <template #popup="{ marker }">
          <article class="min-w-40 text-base-content">
            <strong>{{ $t('features.mapsIcons.leafletMaps.eiffelTower') }}</strong>
            <p class="mt-1 text-xs">
              {{ $t('features.mapsIcons.leafletMaps.markerId') }}: {{ marker.id }}
            </p>
          </article>
        </template>
      </DiLeafletMaps>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.mapsIcons.leafletMaps.tileLayers')"
      :code="tileCode"
      language="vue"
    >
      <DiLeafletMaps
        :center="{ lat: 46.8, lng: 8.23 }"
        :zoom="7"
        :tile-layer="openTopoMap"
        :aria-label="$t('features.mapsIcons.leafletMaps.tileLayerLabel')"
      />
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.mapsIcons.leafletMaps.interactiveMap')"
      :code="interactiveCode"
      language="vue"
    >
      <DiLeafletMaps
        :center="{ lat: 39.5, lng: -98.35 }"
        :zoom="4"
        :aria-label="$t('features.mapsIcons.leafletMaps.interactiveMapLabel')"
        @map-click="clickedCoordinate = $event"
      />
      <p class="mt-3 text-sm text-base-content/70" aria-live="polite">
        <template v-if="clickedCoordinate">
          {{ $t('features.mapsIcons.leafletMaps.clickedCoordinates') }}:
          {{ clickedCoordinate.lat.toFixed(5) }}, {{ clickedCoordinate.lng.toFixed(5) }}
        </template>
        <template v-else>
          {{ $t('features.mapsIcons.leafletMaps.clickInstruction') }}
        </template>
      </p>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.mapsIcons.leafletMaps.advancedMap')"
      :code="advancedCode"
      language="vue"
    >
      <DiLeafletMaps
        :markers="dynamicMarkers"
        fit-bounds
        :aria-label="$t('features.mapsIcons.leafletMaps.advancedMapLabel')"
      />
      <div class="mt-3 flex items-center justify-between gap-3">
        <span class="text-sm text-base-content/70">
          {{ $t('features.mapsIcons.leafletMaps.markerCount', { count: dynamicMarkers.length }) }}
        </span>
        <DiButton
          size="sm"
          variant="primary"
          :disabled="dynamicMarkers.length > 4"
          @click="addRome"
        >
          {{ $t('features.mapsIcons.leafletMaps.addRome') }}
        </DiButton>
      </div>
    </PreviewCodeCard>
  </div>
</template>
