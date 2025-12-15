<script setup lang="ts">
import { ref } from 'vue'

import Button from '@/shared/ui/Button.vue'

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
        <Button variant="neutral">
          Neutral
        </Button>
        <Button variant="primary">
          Primary
        </Button>
        <Button variant="secondary">
          Secondary
        </Button>
        <Button variant="info">
          Info
        </Button>
        <Button variant="success">
          Success
        </Button>
        <Button variant="warning">
          Warning
        </Button>
        <Button variant="error">
          Error
        </Button>
        <Button variant="ghost">
          Ghost
        </Button>
        <Button variant="link">
          Link
        </Button>
      </div>
    </section>

    <!-- Button Sizes -->
    <section>
      <h2 class="text-2xl font-bold mb-4">
        Button Sizes
      </h2>
      <div class="flex flex-wrap items-center gap-4">
        <Button size="xs" variant="primary">
          Extra Small
        </Button>
        <Button size="sm" variant="primary">
          Small
        </Button>
        <Button size="md" variant="primary">
          Medium
        </Button>
        <Button size="lg" variant="primary">
          Large
        </Button>
      </div>
    </section>

    <!-- Outline Buttons -->
    <section>
      <h2 class="text-2xl font-bold mb-4">
        Outline Buttons
      </h2>
      <div class="flex flex-wrap gap-4">
        <Button outline>
          Neutral
        </Button>
        <Button outline variant="primary">
          Primary
        </Button>
        <Button outline variant="secondary">
          Secondary
        </Button>
        <Button outline variant="accent">
          Accent
        </Button>
        <Button outline variant="info">
          Info
        </Button>
        <Button outline variant="success">
          Success
        </Button>
        <Button outline variant="warning">
          Warning
        </Button>
        <Button outline variant="error">
          Error
        </Button>
      </div>
    </section>

    <!-- Button States -->
    <section>
      <h2 class="text-2xl font-bold mb-4">
        Button States
      </h2>
      <div class="flex flex-wrap gap-4">
        <Button variant="primary">
          Normal
        </Button>
        <Button variant="primary" active>
          Active
        </Button>
        <Button variant="primary" disabled>
          Disabled
        </Button>
        <Button variant="primary" loading>
          Loading
        </Button>
      </div>
    </section>

    <!-- Button with Icons -->
    <section>
      <h2 class="text-2xl font-bold mb-4">
        Buttons with Icons
      </h2>
      <div class="flex flex-wrap gap-4">
        <Button variant="primary">
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
        </Button>

        <Button variant="secondary">
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
        </Button>
      </div>
    </section>

    <!-- Icon Only Buttons -->
    <section>
      <h2 class="text-2xl font-bold mb-4">
        Icon Only Buttons
      </h2>
      <div class="flex flex-wrap gap-4">
        <Button square variant="primary">
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
        </Button>

        <Button circle variant="accent">
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
        </Button>
      </div>
    </section>

    <!-- Wide and Block Buttons -->
    <section>
      <h2 class="text-2xl font-bold mb-4">
        Wide and Block Buttons
      </h2>
      <div class="space-y-4">
        <Button wide variant="primary">
          Wide Button
        </Button>
        <Button block variant="secondary">
          Block Button
        </Button>
      </div>
    </section>

    <!-- Glass Button -->
    <section class="bg-gradient-to-r from-purple-500 to-pink-500 p-8 rounded-lg">
      <h2 class="text-2xl font-bold mb-4 text-white">
        Glass Button
      </h2>
      <Button glass>
        Glass Button
      </Button>
    </section>

    <!-- No Animation -->
    <section>
      <h2 class="text-2xl font-bold mb-4">
        No Animation Button
      </h2>
      <div class="flex gap-4">
        <Button variant="primary">
          With Animation
        </Button>
        <Button variant="primary" no-animation>
          No Animation
        </Button>
      </div>
    </section>

    <!-- Button as Link -->
    <section>
      <h2 class="text-2xl font-bold mb-4">
        Button as Link
      </h2>
      <Button tag="a" variant="primary">
        Link Button
      </Button>
    </section>

    <!-- Interactive Example -->
    <section>
      <h2 class="text-2xl font-bold mb-4">
        Interactive Example
      </h2>
      <Button variant="primary" @click="handleClick">
        Click Me ({{ clickCount }})
      </Button>
    </section>
  </div>
</template>
