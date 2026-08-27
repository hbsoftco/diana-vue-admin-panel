<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import DiAlert from '@/shared/ui/base/DiAlert.vue'
import DiButton from '@/shared/ui/base/DiButton.vue'
import DiLoading from '@/shared/ui/base/DiLoading.vue'

type Coordinates = {
  lat: number
  lng: number
}

type GoogleMapConstructor = new (
  element: HTMLElement,
  options: { center: Coordinates, zoom: number },
) => unknown

type GoogleMapsWindow = Window & {
  google?: {
    maps: {
      Map: GoogleMapConstructor
    }
  }
}

type Props = {
  apiKey?: string
  center: Coordinates
  zoom?: number
  mapLabel: string
}

const props = withDefaults(defineProps<Props>(), {
  apiKey: '',
  zoom: 10,
})

const { t } = useI18n()
const mapElement = ref<HTMLElement>()
const status = ref<'idle' | 'loading' | 'ready' | 'error'>('idle')
let requestId = 0

function loadGoogleMaps(apiKey: string) {
  const googleMapsWindow = window as GoogleMapsWindow

  if (googleMapsWindow.google?.maps.Map)
    return Promise.resolve(googleMapsWindow.google.maps)

  return new Promise<NonNullable<GoogleMapsWindow['google']>['maps']>((resolve, reject) => {
    const callbackName = `__dianaGoogleMapsReady${Date.now()}`
    const script = document.createElement('script')

    Object.assign(googleMapsWindow, {
      [callbackName]: () => {
        Reflect.deleteProperty(googleMapsWindow, callbackName)
        const maps = googleMapsWindow.google?.maps
        if (maps)
          resolve(maps)
        else reject(new Error('Google Maps initialized without the maps library'))
      },
    })

    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&callback=${callbackName}&loading=async`
    script.async = true
    script.onerror = () => {
      Reflect.deleteProperty(googleMapsWindow, callbackName)
      script.remove()
      reject(new Error('Google Maps script failed to load'))
    }
    document.head.append(script)
  })
}

async function initializeMap() {
  if (!props.apiKey) {
    status.value = 'idle'
    return
  }

  const currentRequest = ++requestId
  status.value = 'loading'

  try {
    const maps = await loadGoogleMaps(props.apiKey)
    if (currentRequest !== requestId)
      return

    status.value = 'ready'
    await nextTick()

    if (mapElement.value)
      Reflect.construct(maps.Map, [mapElement.value, { center: props.center, zoom: props.zoom }])
  }
  catch {
    if (currentRequest === requestId)
      status.value = 'error'
  }
}

onMounted(initializeMap)

onBeforeUnmount(() => {
  requestId++
  mapElement.value?.replaceChildren()
})
</script>

<template>
  <div class="relative min-h-96 w-full bg-base-200">
    <div
      v-if="status === 'ready'"
      ref="mapElement"
      class="h-96 w-full"
      role="region"
      :aria-label="mapLabel"
    />

    <div
      v-else-if="status === 'loading'"
      class="flex min-h-96 flex-col items-center justify-center gap-3 text-base-content/70"
      role="status"
    >
      <DiLoading color="primary" size="lg" />
      <span class="text-sm">{{ t('features.mapsIcons.googleMaps.loading') }}</span>
    </div>

    <div v-else class="flex min-h-96 items-center justify-center p-6">
      <DiAlert
        :variant="status === 'error' ? 'error' : 'info'"
        soft
        show-icon
        custom-class="max-w-2xl"
        :title="
          t(
            status === 'error'
              ? 'features.mapsIcons.googleMaps.loadErrorTitle'
              : 'features.mapsIcons.googleMaps.missingKeyTitle',
          )
        "
        :description="
          t(
            status === 'error'
              ? 'features.mapsIcons.googleMaps.loadErrorDescription'
              : 'features.mapsIcons.googleMaps.missingKeyDescription',
          )
        "
      >
        <template v-if="status === 'error'" #actions>
          <DiButton variant="error" size="sm" outline @click="initializeMap">
            {{ t('features.mapsIcons.googleMaps.retry') }}
          </DiButton>
        </template>
      </DiAlert>
    </div>
  </div>
</template>
