<script setup lang="ts">
import { ref } from 'vue'

import DiButton from '@/shared/ui/base/DiButton.vue'
import DiProgress from '@/shared/ui/base/DiProgress.vue'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

const interactiveValue = ref(35)

const defaultProgress = `<DiProgress class="w-full" :value="40" :aria-label="$t('pages.progress.progress')" />`

const progressVariants = `<div class="space-y-3">
  <DiProgress class="w-full" :value="20" variant="neutral" :aria-label="$t('pages.progress.progress')" />
  <DiProgress class="w-full" :value="30" variant="primary" :aria-label="$t('pages.progress.progress')" />
  <DiProgress class="w-full" :value="40" variant="secondary" :aria-label="$t('pages.progress.progress')" />
  <DiProgress class="w-full" :value="50" variant="accent" :aria-label="$t('pages.progress.progress')" />
  <DiProgress class="w-full" :value="60" variant="info" :aria-label="$t('pages.progress.progress')" />
  <DiProgress class="w-full" :value="70" variant="success" :aria-label="$t('pages.progress.progress')" />
  <DiProgress class="w-full" :value="80" variant="warning" :aria-label="$t('pages.progress.progress')" />
  <DiProgress class="w-full" :value="90" variant="error" :aria-label="$t('pages.progress.progress')" />
</div>`

const progressSizes = `<div class="space-y-4">
  <DiProgress class="w-full" :value="65" size="xs" :aria-label="$t('pages.progress.progress')" />
  <DiProgress class="w-full" :value="65" size="sm" :aria-label="$t('pages.progress.progress')" />
  <DiProgress class="w-full" :value="65" size="md" :aria-label="$t('pages.progress.progress')" />
  <DiProgress class="w-full" :value="65" size="lg" :aria-label="$t('pages.progress.progress')" />
  <DiProgress class="w-full" :value="65" size="xl" :aria-label="$t('pages.progress.progress')" />
</div>`

const indeterminateProgress = `<DiProgress class="w-full" variant="primary" :aria-label="$t('pages.progress.progress')" />`

const customRange = `<DiProgress
  class="w-full"
  :value="3"
  :max="5"
  variant="success"
  :aria-label="$t('pages.progress.progress')"
/>`

const interactiveProgress = `<script setup lang="ts">
import { ref } from 'vue'

const progress = ref(35)
${'</scr' + 'ipt>'}

<template>
  <DiProgress
    class="w-full"
    :value="progress"
    variant="primary"
    :aria-label="$t('pages.progress.progress')"
  />
  <DiButton @click="progress = Math.min(progress + 10, 100)">
    Increase progress
  </DiButton>
</template>`

function increaseProgress() {
  interactiveValue.value = Math.min(interactiveValue.value + 10, 100)
}

function resetProgress() {
  interactiveValue.value = 0
}
</script>

<template>
  <div class="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
    <PreviewCodeCard
      :title="$t('features.ui-elements.progress.default')"
      :code="defaultProgress"
      language="html"
    >
      <DiProgress class="w-full" :value="40" :aria-label="$t('pages.progress.progress')" />
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.ui-elements.progress.indeterminate')"
      :code="indeterminateProgress"
      language="html"
    >
      <DiProgress class="w-full" variant="primary" :aria-label="$t('pages.progress.progress')" />
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.ui-elements.progress.variants')"
      :code="progressVariants"
      language="html"
    >
      <div class="space-y-3">
        <DiProgress
          class="w-full"
          :value="20"
          variant="neutral"
          :aria-label="$t('pages.progress.progress')"
        />
        <DiProgress
          class="w-full"
          :value="30"
          variant="primary"
          :aria-label="$t('pages.progress.progress')"
        />
        <DiProgress
          class="w-full"
          :value="40"
          variant="secondary"
          :aria-label="$t('pages.progress.progress')"
        />
        <DiProgress
          class="w-full"
          :value="50"
          variant="accent"
          :aria-label="$t('pages.progress.progress')"
        />
        <DiProgress
          class="w-full"
          :value="60"
          variant="info"
          :aria-label="$t('pages.progress.progress')"
        />
        <DiProgress
          class="w-full"
          :value="70"
          variant="success"
          :aria-label="$t('pages.progress.progress')"
        />
        <DiProgress
          class="w-full"
          :value="80"
          variant="warning"
          :aria-label="$t('pages.progress.progress')"
        />
        <DiProgress
          class="w-full"
          :value="90"
          variant="error"
          :aria-label="$t('pages.progress.progress')"
        />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.ui-elements.progress.sizes')"
      :code="progressSizes"
      language="html"
    >
      <div class="space-y-4">
        <DiProgress
          class="w-full"
          :value="65"
          size="xs"
          :aria-label="$t('pages.progress.progress')"
        />
        <DiProgress
          class="w-full"
          :value="65"
          size="sm"
          :aria-label="$t('pages.progress.progress')"
        />
        <DiProgress
          class="w-full"
          :value="65"
          size="md"
          :aria-label="$t('pages.progress.progress')"
        />
        <DiProgress
          class="w-full"
          :value="65"
          size="lg"
          :aria-label="$t('pages.progress.progress')"
        />
        <DiProgress
          class="w-full"
          :value="65"
          size="xl"
          :aria-label="$t('pages.progress.progress')"
        />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.ui-elements.progress.customRange')"
      :code="customRange"
      language="html"
    >
      <DiProgress
        class="w-full"
        :value="3"
        :max="5"
        variant="success"
        :aria-label="$t('pages.progress.progress')"
      />
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.ui-elements.progress.interactive')"
      :code="interactiveProgress"
      language="vue"
    >
      <div class="space-y-4">
        <div class="flex items-center gap-3">
          <DiProgress
            class="w-full"
            :value="interactiveValue"
            variant="primary"
            :aria-label="$t('pages.progress.progress')"
          />
          <span class="min-w-12 text-end text-sm font-medium">{{ interactiveValue }}%</span>
        </div>
        <div class="flex flex-wrap gap-2">
          <DiButton size="sm" variant="primary" @click="increaseProgress">
            {{ $t('features.ui-elements.progress.increase') }}
          </DiButton>
          <DiButton size="sm" variant="ghost" @click="resetProgress">
            {{ $t('features.ui-elements.progress.reset') }}
          </DiButton>
        </div>
      </div>
    </PreviewCodeCard>
  </div>
</template>
