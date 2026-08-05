<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import DiButton from '@/shared/ui/base/DiButton.vue'
import DiIcon from '@/shared/ui/base/DiIcon.vue'

const isFullscreen = ref(false)
const { t } = useI18n()
const toggleLabel = computed(() =>
  isFullscreen.value ? t('layout.fullscreen.exit') : t('layout.fullscreen.enter'),
)

function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen()
  }
  else {
    document.documentElement.requestFullscreen().catch((err) => {
      console.error(`Error attempting to enable fullscreen: ${err.message}`)
    })
  }
}

function handleFullscreenChange() {
  isFullscreen.value = !!document.fullscreenElement
}

onMounted(() => {
  document.addEventListener('fullscreenchange', handleFullscreenChange)
})

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
})
</script>

<template>
  <DiButton
    size="sm"
    variant="ghost"
    circle
    :aria-label="toggleLabel"
    :title="toggleLabel"
    @click="toggleFullscreen"
  >
    <DiIcon :name="!isFullscreen ? 'fullscreen' : 'fullscreenExit'" size="sm" />
  </DiButton>
</template>
