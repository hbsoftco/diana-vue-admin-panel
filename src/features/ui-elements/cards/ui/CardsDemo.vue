<script setup lang="ts">
import Card from '@shared/ui/Card.vue'

import Button from '@/shared/ui/Button.vue'
</script>

<template>
  <div class="space-y-6">
    <div>
      <Card accent-color="#14b8a6" actions-position="start">
        <template #header>
          <div class="flex items-center justify-between w-full">
            <span class="text-sm font-semibold text-base-content">Default Buttons</span>
            <Button variant="primary" size="sm" :soft="true">
              Show Code

              <template #icon-right>
                <i-material-symbols-light-code class="text-sm" />
              </template>
            </Button>
          </div>
        </template>
        <div class="flex flex-wrap gap-2">
          <button class="btn btn-primary">
            Primary
          </button>
          <button class="btn btn-secondary">
            Secondary
          </button>
          <button class="btn btn-success">
            Success
          </button>
          <button class="btn btn-error">
            Danger
          </button>
          <button class="btn btn-warning">
            Warning
          </button>
          <button class="btn btn-info">
            Info
          </button>
          <button class="btn btn-neutral">
            Neutral
          </button>
          <button class="btn btn-link">
            Link
          </button>
        </div>
      </Card>
    </div>

    <div>
      <h2 class="text-xl font-semibold mb-4">
        Basic Card
      </h2>
      <Card width="w-96">
        <template #title>
          Card Title
        </template>
        <p>
          A card component has a figure, a body part, and inside body there are title and actions
          parts
        </p>
        <template #actions>
          <button class="btn btn-primary">
            Buy Now
          </button>
        </template>
      </Card>
    </div>

    <div>
      <h2 class="text-xl font-semibold mb-4">
        Card with Header Badge
      </h2>
      <Card width="w-96" accent-color="#14b8a6" actions-position="start">
        <template #header>
          <span class="text-sm font-semibold text-base-content">Featured</span>
        </template>
        <template #title>
          Special title treatment
        </template>
        <p class="text-base-content/70">
          Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one
          of the more obscure Latin words, consectetur, from a Lorem Ipsum passage
        </p>
        <template #actions>
          <button class="btn btn-primary">
            Read More
          </button>
        </template>
      </Card>
    </div>
  </div>
</template>
