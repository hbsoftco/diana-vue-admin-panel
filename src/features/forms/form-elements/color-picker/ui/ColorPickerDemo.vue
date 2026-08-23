<script setup lang="ts">
import { ref } from 'vue'

import { DiColorPicker } from '@/shared/ui/base/color-picker'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

const basicColor = ref('#2563EB')
const themeColor = ref('#7C3AED')
const compactColor = ref('#059669')

const codes = {
  basic: `<script setup lang="ts">
import { ref } from 'vue'

import { DiColorPicker } from '@/shared/ui/base/color-picker'

const color = ref('#2563EB')
<\/script>

<template>
  <DiColorPicker v-model="color" label="Brand color" />
</template>`,
  theme: `<DiColorPicker v-model="themeColor" label="Theme accent" size="lg" />`,
  compact: `<DiColorPicker v-model="color" label="Compact picker" variant="compact" size="sm" />`,
  disabled: `<div class="grid gap-4 sm:grid-cols-2">
  <DiColorPicker model-value="#64748B" label="Disabled color" disabled />
  <DiColorPicker model-value="#0EA5E9" label="Readonly color" readonly />
</div>`,
  defaults: `<div class="grid gap-4 sm:grid-cols-3">
  <DiColorPicker model-value="#EF4444" label="Red" />
  <DiColorPicker model-value="#22C55E" label="Green" />
  <DiColorPicker model-value="#3B82F6" label="Blue" />
</div>`,
} as const
</script>

<template>
  <div class="grid grid-cols-1 gap-6 xl:grid-cols-12">
    <PreviewCodeCard
      :title="$t('features.forms.colorPicker.sections.basic')"
      class="xl:col-span-6"
      :code="codes.basic"
      language="vue"
    >
      <DiColorPicker v-model="basicColor" :label="$t('features.forms.colorPicker.labels.brand')" />
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.forms.colorPicker.sections.theme')"
      class="xl:col-span-6"
      :code="codes.theme"
      language="html"
    >
      <DiColorPicker
        v-model="themeColor"
        :label="$t('features.forms.colorPicker.labels.theme')"
        size="lg"
      />
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.forms.colorPicker.sections.compact')"
      class="xl:col-span-4"
      :code="codes.compact"
      language="html"
    >
      <DiColorPicker
        v-model="compactColor"
        :label="$t('features.forms.colorPicker.labels.compact')"
        variant="compact"
        size="sm"
      />
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.forms.colorPicker.sections.disabled')"
      class="xl:col-span-8"
      :code="codes.disabled"
      language="html"
    >
      <div class="grid gap-4 sm:grid-cols-2">
        <DiColorPicker
          model-value="#64748B"
          :label="$t('features.forms.colorPicker.labels.disabled')"
          disabled
        />
        <DiColorPicker
          model-value="#0EA5E9"
          :label="$t('features.forms.colorPicker.labels.readonly')"
          readonly
        />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.forms.colorPicker.sections.defaults')"
      class="xl:col-span-12"
      :code="codes.defaults"
      language="html"
    >
      <div class="grid gap-4 sm:grid-cols-3">
        <DiColorPicker model-value="#EF4444" :label="$t('features.forms.colorPicker.labels.red')" />
        <DiColorPicker
          model-value="#22C55E"
          :label="$t('features.forms.colorPicker.labels.green')"
        />
        <DiColorPicker
          model-value="#3B82F6"
          :label="$t('features.forms.colorPicker.labels.blue')"
        />
      </div>
    </PreviewCodeCard>
  </div>
</template>
