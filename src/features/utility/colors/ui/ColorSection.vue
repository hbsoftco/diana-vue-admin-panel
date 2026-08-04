<script setup lang="ts">
import DiCard from '@/shared/ui/base/DiCard.vue'

defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <section>
    <DiCard body-class="gap-5">
      <template #title>
        {{ title }}
      </template>
      <p class="max-w-3xl text-sm leading-6 text-base-content/65">
        {{ description }}
      </p>
      <slot />
    </DiCard>
  </section>
</template>
