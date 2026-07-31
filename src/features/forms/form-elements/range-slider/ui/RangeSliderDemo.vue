<script setup lang="ts">
import { ref } from 'vue'

import DiButton from '@/shared/ui/base/DiButton.vue'
import { DiRangeSlider } from '@/shared/ui/base/range-slider'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

const basicValue = ref<[number, number]>([30, 80])
const connectedValue = ref<[number, number]>([20, 70])
const tooltipValue = ref<[number, number]>([25, 75])
const formattedValue = ref<[number, number]>([1500, 6500])
const verticalValue = ref<[number, number]>([20, 70])
const minimumDistanceValue = ref<[number, number]>([30, 60])
const maximumDistanceValue = ref<[number, number]>([35, 55])
const softLimitValue = ref<[number, number]>([10, 90])
const tickValue = ref<[number, number]>([25, 75])
const runtimeValue = ref<[number, number]>([35, 65])
const runtimeDisabled = ref(false)

const ticks = [
  { value: 0, label: '0' },
  { value: 25, label: '25' },
  { value: 50, label: '50' },
  { value: 75, label: '75' },
  { value: 100, label: '100' },
]

const basicCode = `<script setup lang="ts">
import { ref } from 'vue'

import { DiRangeSlider } from '@/shared/ui/base/range-slider'

const basicValue = ref<[number, number]>([30, 80])
<\/script>

<template>
  <DiRangeSlider v-model="basicValue" label="Price range" />
</template>`

const sizesCode = `<div class="space-y-7">
  <DiRangeSlider :model-value="[20, 70]" size="sm" label="Small" />
  <DiRangeSlider :model-value="[20, 70]" size="md" label="Medium" />
  <DiRangeSlider :model-value="[20, 70]" size="lg" label="Large" />
</div>`

const variantsCode = `<div class="grid gap-7 md:grid-cols-2">
  <DiRangeSlider :model-value="[20, 70]" variant="primary" label="Primary" />
  <DiRangeSlider :model-value="[20, 70]" variant="secondary" label="Secondary" />
  <DiRangeSlider :model-value="[20, 70]" variant="accent" label="Accent" />
  <DiRangeSlider :model-value="[20, 70]" variant="info" label="Info" />
  <DiRangeSlider :model-value="[20, 70]" variant="success" label="Success" />
  <DiRangeSlider :model-value="[20, 70]" variant="warning" label="Warning" />
  <DiRangeSlider :model-value="[20, 70]" variant="error" label="Error" />
</div>`

const connectedCode = `<script setup lang="ts">
import { ref } from 'vue'

import { DiRangeSlider } from '@/shared/ui/base/range-slider'

const connectedValue = ref<[number, number]>([20, 70])
<\/script>

<template>
  <DiRangeSlider
    v-model="connectedValue"
    label="Drag either handle, the track, or the connected selection"
  />
</template>`

const tooltipsCode = `<div class="space-y-8">
  <DiRangeSlider
    v-model="tooltipValue"
    label="Per-handle tooltips"
    show-tooltips
  />
  <DiRangeSlider
    :model-value="[45, 55]"
    label="Merge nearby tooltips"
    show-tooltips
    merge-tooltips
  />
</div>`

const formattedCode = `<DiRangeSlider
  v-model="formattedValue"
  :min="0"
  :max="10000"
  :step="100"
  label="Budget"
  :format-value="value => \`$\${value.toLocaleString()}\`"
  show-tooltips
/>`

const verticalCode = `<div class="flex justify-center gap-16">
  <DiRangeSlider
    v-model="verticalValue"
    orientation="vertical"
    label="Vertical interval"
    show-tooltips
  />
  <DiRangeSlider
    :model-value="[30, 80]"
    orientation="vertical"
    variant="secondary"
    aria-label="Secondary vertical interval"
  />
</div>`

const minimumDistanceCode = `<DiRangeSlider
  v-model="minimumDistanceValue"
  :min-distance="20"
  label="At least 20 units apart"
  helper-text="The handles cannot move closer than 20 units."
  show-tooltips
/>`

const maximumDistanceCode = `<DiRangeSlider
  v-model="maximumDistanceValue"
  :max-distance="30"
  label="At most 30 units apart"
  helper-text="The handles remain within 30 units of each other."
  show-tooltips
/>`

const softLimitsCode = `<DiRangeSlider
  v-model="softLimitValue"
  :soft-min="20"
  :soft-max="80"
  :ticks="[{ value: 20 }, { value: 80 }]"
  label="Recommended interval"
  helper-text="Values settle inside 20–80 when an interaction ends."
  show-tooltips
/>`

const ticksCode = `<DiRangeSlider
  v-model="tickValue"
  :ticks="ticks"
  ticks-clickable
  label="Click a marker to move the nearest handle"
  show-tooltips
/>`

const disabledCode = `<DiRangeSlider
  :model-value="[30, 70]"
  label="Disabled selection"
  disabled
  show-tooltips
/>`

const validationCode = `<div class="space-y-7">
  <DiRangeSlider
    :model-value="[10, 90]"
    variant="primary"
    label="Delivery window"
    error="Choose a narrower delivery window."
  />
  <DiRangeSlider
    :model-value="[30, 60]"
    variant="secondary"
    label="Confidence interval"
    success="This interval meets the recommendation."
  />
</div>`

const runtimeCode = `<script setup lang="ts">
import { ref } from 'vue'

import DiButton from '@/shared/ui/base/DiButton.vue'
import { DiRangeSlider } from '@/shared/ui/base/range-slider'

const runtimeValue = ref<[number, number]>([35, 65])
const runtimeDisabled = ref(false)
<\/script>

<template>
  <div class="space-y-4">
    <DiRangeSlider
      v-model="runtimeValue"
      label="Runtime-controlled selection"
      :disabled="runtimeDisabled"
      show-tooltips
    />
    <DiButton size="sm" @click="runtimeDisabled = !runtimeDisabled">
      {{ runtimeDisabled ? 'Enable slider' : 'Disable slider' }}
    </DiButton>
  </div>
</template>`

const thumbIconsCode = `<div class="space-y-8">
  <DiRangeSlider :model-value="[20, 70]" label="Default square handles" />
  <DiRangeSlider
    :model-value="[25, 75]"
    label="Drag indicator handles"
    thumb-icon="pauseLine"
  />
  <div class="grid gap-7 md:grid-cols-3">
    <DiRangeSlider :model-value="[20, 70]" size="sm" label="Small" thumb-icon="pauseLine" />
    <DiRangeSlider :model-value="[20, 70]" size="md" label="Medium" thumb-icon="pauseLine" />
    <DiRangeSlider :model-value="[20, 70]" size="lg" label="Large" thumb-icon="pauseLine" />
  </div>
</div>`
</script>

<template>
  <div class="grid gap-6 xl:grid-cols-2">
    <PreviewCodeCard title="Basic" accent-color="#8b5cf6" :code="basicCode" language="vue">
      <DiRangeSlider v-model="basicValue" label="Price range" />
    </PreviewCodeCard>

    <PreviewCodeCard title="Sizes" accent-color="#14b8a6" :code="sizesCode" language="html">
      <div class="space-y-7">
        <DiRangeSlider :model-value="[20, 70]" size="sm" label="Small" />
        <DiRangeSlider :model-value="[20, 70]" size="md" label="Medium" />
        <DiRangeSlider :model-value="[20, 70]" size="lg" label="Large" />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      title="Semantic Variants"
      accent-color="#06b6d4"
      :code="variantsCode"
      language="html"
      class="xl:col-span-2"
    >
      <div class="grid gap-7 md:grid-cols-2">
        <DiRangeSlider :model-value="[20, 70]" variant="primary" label="Primary" />
        <DiRangeSlider :model-value="[20, 70]" variant="secondary" label="Secondary" />
        <DiRangeSlider :model-value="[20, 70]" variant="accent" label="Accent" />
        <DiRangeSlider :model-value="[20, 70]" variant="info" label="Info" />
        <DiRangeSlider :model-value="[20, 70]" variant="success" label="Success" />
        <DiRangeSlider :model-value="[20, 70]" variant="warning" label="Warning" />
        <DiRangeSlider :model-value="[20, 70]" variant="error" label="Error" />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      title="Connected Track"
      accent-color="#8b5cf6"
      :code="connectedCode"
      language="vue"
    >
      <DiRangeSlider
        v-model="connectedValue"
        label="Drag either handle, the track, or the connected selection"
      />
    </PreviewCodeCard>

    <PreviewCodeCard title="Tooltips" accent-color="#06b6d4" :code="tooltipsCode" language="html">
      <div class="space-y-8">
        <DiRangeSlider v-model="tooltipValue" label="Per-handle tooltips" show-tooltips />
        <DiRangeSlider
          :model-value="[45, 55]"
          label="Merge nearby tooltips"
          show-tooltips
          merge-tooltips
        />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      title="Formatted Values"
      accent-color="#22c55e"
      :code="formattedCode"
      language="html"
    >
      <DiRangeSlider
        v-model="formattedValue"
        :min="0"
        :max="10000"
        :step="100"
        label="Budget"
        :format-value="(value) => `$${value.toLocaleString()}`"
        show-tooltips
      />
    </PreviewCodeCard>

    <PreviewCodeCard title="Vertical" accent-color="#8b5cf6" :code="verticalCode" language="html">
      <div class="flex justify-center gap-16">
        <DiRangeSlider
          v-model="verticalValue"
          orientation="vertical"
          label="Vertical interval"
          show-tooltips
        />
        <DiRangeSlider
          :model-value="[30, 80]"
          orientation="vertical"
          variant="secondary"
          aria-label="Secondary vertical interval"
        />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      title="Minimum Distance"
      accent-color="#f59e0b"
      :code="minimumDistanceCode"
      language="html"
    >
      <DiRangeSlider
        v-model="minimumDistanceValue"
        :min-distance="20"
        label="At least 20 units apart"
        helper-text="The handles cannot move closer than 20 units."
        show-tooltips
      />
    </PreviewCodeCard>

    <PreviewCodeCard
      title="Maximum Distance"
      accent-color="#ef4444"
      :code="maximumDistanceCode"
      language="html"
    >
      <DiRangeSlider
        v-model="maximumDistanceValue"
        :max-distance="30"
        label="At most 30 units apart"
        helper-text="The handles remain within 30 units of each other."
        show-tooltips
      />
    </PreviewCodeCard>

    <PreviewCodeCard
      title="Soft Limits"
      accent-color="#f59e0b"
      :code="softLimitsCode"
      language="html"
    >
      <DiRangeSlider
        v-model="softLimitValue"
        :soft-min="20"
        :soft-max="80"
        :ticks="[{ value: 20 }, { value: 80 }]"
        label="Recommended interval"
        helper-text="Values settle inside 20–80 when an interaction ends."
        show-tooltips
      />
    </PreviewCodeCard>

    <PreviewCodeCard
      title="Clickable Ticks"
      accent-color="#14b8a6"
      :code="ticksCode"
      language="html"
    >
      <DiRangeSlider
        v-model="tickValue"
        :ticks="ticks"
        ticks-clickable
        label="Click a marker to move the nearest handle"
        show-tooltips
      />
    </PreviewCodeCard>

    <PreviewCodeCard title="Disabled" accent-color="#64748b" :code="disabledCode" language="html">
      <DiRangeSlider :model-value="[30, 70]" label="Disabled selection" disabled show-tooltips />
    </PreviewCodeCard>

    <PreviewCodeCard
      title="Validation"
      accent-color="#ef4444"
      :code="validationCode"
      language="html"
    >
      <div class="space-y-7">
        <DiRangeSlider
          :model-value="[10, 90]"
          variant="primary"
          label="Delivery window"
          error="Choose a narrower delivery window."
        />
        <DiRangeSlider
          :model-value="[30, 60]"
          variant="secondary"
          label="Confidence interval"
          success="This interval meets the recommendation."
        />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      title="Runtime State Changes"
      accent-color="#8b5cf6"
      :code="runtimeCode"
      language="vue"
    >
      <div class="space-y-4">
        <DiRangeSlider
          v-model="runtimeValue"
          label="Runtime-controlled selection"
          :disabled="runtimeDisabled"
          show-tooltips
        />
        <DiButton size="sm" @click="runtimeDisabled = !runtimeDisabled">
          {{ runtimeDisabled ? 'Enable slider' : 'Disable slider' }}
        </DiButton>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      title="Thumb Handles"
      accent-color="#8b5cf6"
      :code="thumbIconsCode"
      language="html"
      class="xl:col-span-2"
    >
      <div class="space-y-8">
        <DiRangeSlider :model-value="[20, 70]" label="Default square handles" />
        <DiRangeSlider
          :model-value="[25, 75]"
          label="Drag indicator handles"
          thumb-icon="pauseLine"
        />
        <div class="grid gap-7 md:grid-cols-3">
          <DiRangeSlider :model-value="[20, 70]" size="sm" label="Small" thumb-icon="pauseLine" />
          <DiRangeSlider :model-value="[20, 70]" size="md" label="Medium" thumb-icon="pauseLine" />
          <DiRangeSlider :model-value="[20, 70]" size="lg" label="Large" thumb-icon="pauseLine" />
        </div>
      </div>
    </PreviewCodeCard>
  </div>
</template>
