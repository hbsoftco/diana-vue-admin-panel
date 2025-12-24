<script setup lang="ts">
import DiCard from '@shared/ui/DiCard.vue'

import DiButton from '@/shared/ui/DiButton.vue'
</script>

<template>
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start">
    <DiCard>
      <template #figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        >
      </template>
      <template #title>
        Card Title
      </template>
      <p>
        A card component has a figure, a body part, and inside body there are title and actions
        parts
      </p>

      <template #footer>
        <span class="text-di-sm">Last updated 3 mins age</span>
      </template>
    </DiCard>

    <DiCard figure-bottom>
      <template #header>
        <div class="">
          <span class="text-sm font-semibold text-base-content">Header</span>
        </div>
      </template>

      <template #figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        >
      </template>
      <template #title>
        Card Title
      </template>
      <p>
        A card component has a figure, a body part, and inside body there are title and actions
        parts
      </p>
    </DiCard>

    <DiCard>
      <template #figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        >
      </template>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
        galley.
      </p>

      <div>
        <DiButton variant="primary">
          Read More ...
        </DiButton>
      </div>
    </DiCard>

    <div>
      <DiCard class="mb-4">
        <p>
          A card component has a figure, a body part, and inside body there are title and actions
          parts
        </p>
      </DiCard>

      <DiCard accent-color="#14b8a6">
        <template #header>
          <div class="flex items-center justify-between w-full">
            <span class="text-sm font-semibold text-base-content">Default Buttons</span>
            <DiButton variant="primary" size="sm" :soft="true">
              Show Code

              <template #icon-right>
                <i-material-symbols-light-code class="text-sm" />
              </template>
            </DiButton>
          </div>
        </template>

        <template #title>
          Card Title
        </template>
        <p>
          A card component has a figure, a body part, and inside body there are title and actions
          parts
        </p>

        <template #footer>
          <span class="text-di-sm">Last updated 3 mins age</span>
        </template>
      </DiCard>
    </div>
  </div>
</template>
