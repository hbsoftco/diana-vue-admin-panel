<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

import DiButton from '@/shared/ui/base/DiButton.vue'
import DiIcon from '@/shared/ui/base/DiIcon.vue'

const isFullscreen = ref(false)

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
    :title="isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'"
    @click="toggleFullscreen"
  >
    <DiIcon :name="!isFullscreen ? 'fullscreen' : 'fullscreenExit'" size="sm" />
  </DiButton>
</template>
