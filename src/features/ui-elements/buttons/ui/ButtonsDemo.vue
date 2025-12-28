<script setup lang="ts">
import { ref } from 'vue'

import DiButton from '@/shared/ui/base/DiButton.vue'

const clickCount = ref(0)

function handleClick() {
  clickCount.value++
}
</script>

<template>
  <div class="space-y-12">
    <!-- Button Variants -->
    <section>
      <h2 class="text-2xl font-bold mb-4">
        Button Variants
      </h2>
      <div class="flex flex-wrap gap-4">
        <DiButton variant="neutral">
          Neutral
        </DiButton>
        <DiButton variant="primary">
          Primary
        </DiButton>
        <DiButton variant="secondary">
          Secondary
        </DiButton>
        <DiButton variant="info">
          Info
        </DiButton>
        <DiButton variant="success">
          Success
        </DiButton>
        <DiButton variant="warning">
          Warning
        </DiButton>
        <DiButton variant="error">
          Error
        </DiButton>
        <DiButton variant="ghost">
          Ghost
        </DiButton>
        <DiButton variant="link">
          Link
        </DiButton>
      </div>
    </section>

    <!-- Button Sizes -->
    <section>
      <h2 class="text-2xl font-bold mb-4">
        Button Sizes
      </h2>
      <div class="flex flex-wrap items-center gap-4">
        <DiButton size="xs" variant="primary">
          Extra Small
        </DiButton>
        <DiButton size="sm" variant="primary">
          Small
        </DiButton>
        <DiButton size="md" variant="primary">
          Medium
        </DiButton>
        <DiButton size="lg" variant="primary">
          Large
        </DiButton>
      </div>
    </section>

    <!-- Outline Buttons -->
    <section>
      <h2 class="text-2xl font-bold mb-4">
        Outline Buttons
      </h2>
      <div class="flex flex-wrap gap-4">
        <DiButton outline>
          Neutral
        </DiButton>
        <DiButton outline variant="primary">
          Primary
        </DiButton>
        <DiButton outline variant="secondary">
          Secondary
        </DiButton>
        <DiButton outline variant="accent">
          Accent
        </DiButton>
        <DiButton outline variant="info">
          Info
        </DiButton>
        <DiButton outline variant="success">
          Success
        </DiButton>
        <DiButton outline variant="warning">
          Warning
        </DiButton>
        <DiButton outline variant="error">
          Error
        </DiButton>
      </div>
    </section>

    <!-- Button States -->
    <section>
      <h2 class="text-2xl font-bold mb-4">
        Button States
      </h2>
      <div class="flex flex-wrap gap-4">
        <DiButton variant="primary">
          Normal
        </DiButton>
        <DiButton variant="primary" active>
          Active
        </DiButton>
        <DiButton variant="primary" disabled>
          Disabled
        </DiButton>
        <DiButton variant="primary" loading>
          Loading
        </DiButton>
      </div>
    </section>

    <!-- Button with Icons -->
    <section>
      <h2 class="text-2xl font-bold mb-4">
        Buttons with Icons
      </h2>
      <div class="flex flex-wrap gap-4">
        <DiButton variant="primary">
          <template #icon-left>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </template>
          With Icon Left
        </DiButton>

        <DiButton variant="secondary">
          With Icon Right
          <template #icon-right>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </template>
        </DiButton>
      </div>
    </section>

    <!-- Icon Only Buttons -->
    <section>
      <h2 class="text-2xl font-bold mb-4">
        Icon Only Buttons
      </h2>
      <div class="flex flex-wrap gap-4">
        <DiButton square variant="primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </DiButton>

        <DiButton circle variant="accent">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </DiButton>
      </div>
    </section>

    <!-- Wide and Block Buttons -->
    <section>
      <h2 class="text-2xl font-bold mb-4">
        Wide and Block Buttons
      </h2>
      <div class="space-y-4">
        <DiButton wide variant="primary">
          Wide Button
        </DiButton>
        <DiButton block variant="secondary">
          Block Button
        </DiButton>
      </div>
    </section>

    <!-- Glass Button -->
    <section class="bg-gradient-to-r from-purple-500 to-pink-500 p-8 rounded-lg">
      <h2 class="text-2xl font-bold mb-4 text-white">
        Glass Button
      </h2>
      <DiButton glass>
        Glass Button
      </DiButton>
    </section>

    <!-- No Animation -->
    <section>
      <h2 class="text-2xl font-bold mb-4">
        No Animation Button
      </h2>
      <div class="flex gap-4">
        <DiButton variant="primary">
          With Animation
        </DiButton>
        <DiButton variant="primary" no-animation>
          No Animation
        </DiButton>
      </div>
    </section>

    <!-- Button as Link -->
    <section>
      <h2 class="text-2xl font-bold mb-4">
        Button as Link
      </h2>
      <DiButton tag="a" variant="primary">
        Link Button
      </DiButton>
    </section>

    <!-- Interactive Example -->
    <section>
      <h2 class="text-2xl font-bold mb-4">
        Interactive Example
      </h2>
      <DiButton variant="primary" @click="handleClick">
        Click Me ({{ clickCount }})
      </DiButton>
    </section>
  </div>
</template>
