<script setup lang="ts">
import type { LatLngExpression, Map as LeafletMap, Marker as LeafletMarker } from 'leaflet'

import L from 'leaflet'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import type {
  DiLeafletCoordinate,
  DiLeafletInteractionOptions,
  DiLeafletMarker,
  DiLeafletMarkerEvent,
  DiLeafletTileLayer,
} from './di-leaflet-maps'

type Props = {
  center?: DiLeafletCoordinate
  zoom?: number
  minZoom?: number
  maxZoom?: number
  width?: string | number
  height?: string | number
  markers?: DiLeafletMarker[]
  tileLayer?: DiLeafletTileLayer
  interactions?: DiLeafletInteractionOptions
  fitBounds?: boolean
  fitBoundsPadding?: number
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  center: () => ({ lat: 51.505, lng: -0.09 }),
  zoom: 13,
  minZoom: 0,
  maxZoom: 18,
  width: '100%',
  height: 320,
  markers: () => [],
  tileLayer: () => ({
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors',
  }),
  interactions: () => ({}),
  fitBounds: false,
  fitBoundsPadding: 24,
})

const emit = defineEmits<{
  ready: [map: LeafletMap]
  markerClick: [event: DiLeafletMarkerEvent]
  mapClick: [coordinate: DiLeafletCoordinate]
  zoomChange: [zoom: number]
  centerChange: [center: DiLeafletCoordinate]
}>()

const slots = defineSlots<{
  popup?: (props: { marker: DiLeafletMarker }) => unknown
}>()

const { t } = useI18n()
const mapElement = ref<HTMLElement>()
const popupTargets = ref<Array<HTMLElement | undefined>>([])
let map: LeafletMap | undefined
let tileLayer: L.TileLayer | undefined
let leafletMarkers: LeafletMarker[] = []
let resizeObserver: ResizeObserver | undefined

const resolvedAriaLabel = computed(() => props.ariaLabel ?? t('components.leafletMaps.label'))
const mapStyle = computed(() => ({
  width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
}))

function toLatLng(coordinate: DiLeafletCoordinate): LatLngExpression {
  return [coordinate.lat, coordinate.lng]
}

function currentCenter(): DiLeafletCoordinate {
  const center = map?.getCenter()
  return center ? { lat: center.lat, lng: center.lng } : props.center
}

function renderTileLayer() {
  if (!map)
    return

  tileLayer?.remove()
  tileLayer = L.tileLayer(props.tileLayer.url, {
    ...props.tileLayer.options,
    attribution: props.tileLayer.attribution,
  }).addTo(map)
}

async function renderMarkers() {
  if (!map)
    return

  leafletMarkers.forEach(marker => marker.remove())
  leafletMarkers = []
  popupTargets.value = []

  props.markers.forEach((markerDefinition, index) => {
    const marker = L.marker(toLatLng(markerDefinition.position), markerDefinition.options).addTo(
      map!,
    )

    marker.on('click', (event: L.LeafletMouseEvent) => {
      emit('markerClick', {
        marker: markerDefinition,
        originalEvent: event.originalEvent as MouseEvent,
      })
    })

    if (markerDefinition.popup || slots.popup) {
      const popupTarget = document.createElement('div')
      if (!slots.popup)
        popupTarget.textContent = markerDefinition.popup ?? ''
      popupTargets.value[index] = popupTarget
      marker.bindPopup(popupTarget)
    }

    leafletMarkers.push(marker)
  })

  await nextTick()

  if (props.fitBounds && leafletMarkers.length > 0) {
    map.fitBounds(L.featureGroup(leafletMarkers).getBounds(), {
      padding: [props.fitBoundsPadding, props.fitBoundsPadding],
      maxZoom: props.maxZoom,
    })
  }
}

function setInteraction(
  name: keyof DiLeafletInteractionOptions,
  enabled: boolean | 'center' | undefined,
) {
  if (!map || enabled === undefined || name === 'zoomControl')
    return

  const handler = map[name]
  enabled === false ? handler.disable() : handler.enable()
}

function syncInteractions() {
  const interactionNames: Array<keyof DiLeafletInteractionOptions> = [
    'boxZoom',
    'doubleClickZoom',
    'dragging',
    'keyboard',
    'scrollWheelZoom',
    'touchZoom',
  ]
  interactionNames.forEach(name => setInteraction(name, props.interactions[name]))
}

async function initializeMap() {
  if (!mapElement.value || map)
    return

  map = L.map(mapElement.value, {
    ...props.interactions,
    center: toLatLng(props.center),
    zoom: props.zoom,
    minZoom: props.minZoom,
    maxZoom: props.maxZoom,
  })

  map.on('click', (event: L.LeafletMouseEvent) => {
    emit('mapClick', { lat: event.latlng.lat, lng: event.latlng.lng })
  })
  map.on('zoomend', () => emit('zoomChange', map!.getZoom()))
  map.on('moveend', () => emit('centerChange', currentCenter()))

  renderTileLayer()
  await renderMarkers()
  syncInteractions()

  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => map?.invalidateSize({ pan: false }))
    resizeObserver.observe(mapElement.value)
  }

  emit('ready', map)
}

watch(
  () => props.center,
  center => map?.setView(toLatLng(center), map.getZoom(), { animate: false }),
  { deep: true },
)
watch(
  () => props.zoom,
  zoom => map?.setZoom(zoom, { animate: false }),
)
watch(() => props.tileLayer, renderTileLayer, { deep: true })
watch(() => props.markers, renderMarkers, { deep: true })
watch(() => props.fitBounds, renderMarkers)
watch(() => props.interactions, syncInteractions, { deep: true })

onMounted(initializeMap)
onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  resizeObserver = undefined
  map?.remove()
  map = undefined
  tileLayer = undefined
  leafletMarkers = []
  popupTargets.value = []
})
</script>

<template>
  <div
    ref="mapElement"
    class="di-leaflet-maps isolate overflow-hidden rounded-box bg-base-200"
    :style="mapStyle"
    role="region"
    :aria-label="resolvedAriaLabel"
  />

  <template v-if="slots.popup">
    <Teleport
      v-for="(marker, index) in markers"
      :key="marker.id"
      :to="popupTargets[index]"
      :disabled="!popupTargets[index]"
    >
      <slot name="popup" :marker="marker" />
    </Teleport>
  </template>
</template>
