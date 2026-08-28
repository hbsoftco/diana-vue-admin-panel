<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import DiAlert from '@/shared/ui/base/DiAlert.vue'
import DiButton from '@/shared/ui/base/DiButton.vue'
import DiLoading from '@/shared/ui/base/DiLoading.vue'

import type { GoogleMapDemoType } from '../google-maps'

import { createGoogleMapDemo, loadGoogleMaps } from '../google-maps'

type Props = { apiKey?: string, demo: GoogleMapDemoType, mapLabel: string }
const props = withDefaults(defineProps<Props>(), { apiKey: '' })
const { t } = useI18n()
const mapElement = ref<HTMLElement>()
const status = ref<'idle' | 'loading' | 'ready' | 'error'>('idle')
let requestId = 0

async function initializeMap() {
  if (!props.apiKey.trim()) {
    status.value = 'idle'
    return
  }
  const currentRequest = ++requestId
  status.value = 'loading'
  try {
    const maps = await loadGoogleMaps(props.apiKey.trim())
    if (currentRequest !== requestId)
      return
    status.value = 'ready'
    await nextTick()
    if (mapElement.value)
      createGoogleMapDemo(maps, mapElement.value, props.demo)
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
  <div class="relative h-[18.75rem] w-full overflow-hidden bg-base-200">
    <div
      v-if="status === 'ready'"
      ref="mapElement"
      class="h-full w-full"
      role="region"
      :aria-label="mapLabel"
    />
    <div
      v-else-if="status === 'loading'"
      class="flex h-full flex-col items-center justify-center gap-3 text-base-content/70"
      role="status"
    >
      <DiLoading color="primary" size="lg" />
      <span class="text-sm">{{ t('features.mapsIcons.googleMaps.loading') }}</span>
    </div>
    <div v-else class="flex h-full items-center justify-center p-5">
      <DiAlert
        :variant="status === 'error' ? 'error' : 'info'"
        soft
        show-icon
        custom-class="w-full"
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
