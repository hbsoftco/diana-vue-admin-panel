<script setup lang="ts">
import { computed } from 'vue'

import type { ColorPreview } from '../data/colorTokens'

type Props = {
  label: string
  preview: ColorPreview
  previewClass: string
  contentClass?: string
}

const props = defineProps<Props>()

const previewClasses = computed(() => [
  'flex min-h-24 items-center justify-center rounded-box text-center font-semibold',
  props.preview === 'border' && 'border-4 bg-base-100 text-base-content',
  props.preview === 'text' && 'border border-base-300 bg-base-100 text-xl',
  props.previewClass,
  props.contentClass,
])
</script>

<template>
  <div :class="previewClasses">
    {{ label }}
  </div>
</template>
