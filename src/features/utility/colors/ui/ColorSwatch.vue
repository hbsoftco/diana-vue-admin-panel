<script setup lang="ts">
import type { ColorToken } from '../data/colorTokens'

import TokenPreview from './TokenPreview.vue'

defineProps<{
  token: ColorToken
}>()
</script>

<template>
  <article class="min-w-0 rounded-box border border-base-300 bg-base-100 p-3">
    <TokenPreview
      :label="token.name"
      :preview="token.preview"
      :preview-class="token.previewClass"
      :content-class="token.contentClass"
    />

    <dl class="mt-3 space-y-2 text-xs">
      <div>
        <dt class="text-base-content/60">
          {{ $t('features.utility.colors.cssVariable') }}
        </dt>
        <dd>
          <code class="break-all text-base-content">{{ token.variable }}</code>
        </dd>
      </div>
      <div>
        <dt class="text-base-content/60">
          {{ $t('features.utility.colors.utility') }}
        </dt>
        <dd>
          <code class="break-all text-primary">{{ token.utility }}</code>
        </dd>
      </div>
      <div v-if="token.contentToken">
        <dt class="text-base-content/60">
          {{ $t('features.utility.colors.contentToken') }}
        </dt>
        <dd>
          <code class="break-all text-base-content">{{ token.contentToken }}</code>
        </dd>
      </div>
    </dl>
  </article>
</template>
