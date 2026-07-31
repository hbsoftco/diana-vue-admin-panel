<script setup lang="ts">
import { computed, ref } from 'vue'

import DiButton from '@/shared/ui/base/DiButton.vue'
import { DiRange } from '@/shared/ui/base/range'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

const basicValue = ref(45)
const displayValue = ref(68)
const tooltipValue = ref(42)
const redValue = ref(120)
const greenValue = ref(80)
const blueValue = ref(190)
const linkedValueA = ref(60)
const linkedValueB = ref(80)
const linkedLocked = ref(false)
const toggleValue = ref(1)
const pipValue = ref(50)
const softLimitValue = ref(50)
const runtimeDisabled = ref(true)
const softLimitMessage = computed(() =>
  softLimitValue.value < 20 || softLimitValue.value > 80
    ? 'Outside the recommended range of 20–80.'
    : undefined,
)

function updateLinkedValueA(value: number) {
  const offset = linkedValueB.value - linkedValueA.value
  linkedValueA.value = value
  if (linkedLocked.value)
    linkedValueB.value = Math.min(100, Math.max(50, value + offset))
}

function updateLinkedValueB(value: number) {
  const offset = linkedValueB.value - linkedValueA.value
  linkedValueB.value = value
  if (linkedLocked.value)
    linkedValueA.value = Math.min(100, Math.max(50, value - offset))
}

function enforceSoftLimits() {
  softLimitValue.value = Math.min(80, Math.max(20, softLimitValue.value))
}

const namedTicks = [
  { value: 0, label: 'Low' },
  { value: 25, label: '25' },
  { value: 50, label: 'Medium' },
  { value: 75, label: '75' },
  { value: 100, label: 'High' },
]

const basicCode = `<script setup lang="ts">
import { ref } from 'vue'

import { DiRange } from '@/shared/ui/base/range'

const basicValue = ref(45)
<\/script>

<template>
  <DiRange v-model="basicValue" />
</template>`

const sizesCode = `<div class="space-y-5">
  <DiRange :model-value="30" size="sm" label="Small range" />
  <DiRange :model-value="50" size="md" label="Medium range" />
  <DiRange :model-value="70" size="lg" label="Large range" />
</div>`

const variantsCode = `<div class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
  <DiRange :model-value="40" variant="primary" label="Primary" />
  <DiRange :model-value="40" variant="secondary" label="Secondary" />
  <DiRange :model-value="40" variant="accent" label="Accent" />
  <DiRange :model-value="40" variant="info" label="Info" />
  <DiRange :model-value="40" variant="success" label="Success" />
  <DiRange :model-value="40" variant="warning" label="Warning" />
  <DiRange :model-value="40" variant="error" label="Error" />
</div>`

const limitsCode = `<div class="space-y-5">
  <DiRange :model-value="0" :min="-50" :max="50" label="Temperature (-50 to 50)" show-value />
  <DiRange :model-value="500" :min="100" :max="1000" label="Budget (100 to 1000)" show-value />
</div>`

const stepsCode = `<div class="space-y-6">
  <DiRange :model-value="2.5" :min="0" :max="5" :step="0.5" label="Half steps" show-value />
  <DiRange :model-value="50" :step="25" label="Quarter steps" show-ticks />
</div>`

const disabledCode = `<div class="space-y-5">
  <DiRange :model-value="35" label="Disabled range" disabled />
  <DiRange :model-value="65" label="Readonly range" readonly show-value />
</div>`

const labelsCode = `<div class="space-y-5">
  <DiRange :model-value="25" label="Volume" />
  <DiRange :model-value="75" label="Brightness" show-value />
</div>`

const helperCode = `<DiRange
  :model-value="60"
  label="Profile completeness"
  helper-text="Move the slider to choose the completion target."
/>`

const validationCode = `<div class="space-y-5">
  <DiRange
    :model-value="90"
    variant="primary"
    label="Risk threshold"
    error="Choose a value of 80 or lower."
    show-value
  />
  <DiRange
    :model-value="70"
    variant="secondary"
    label="Quality target"
    success="This target is within the recommended range."
    show-value
  />
</div>`

const valueCode = `<script setup lang="ts">
import { ref } from 'vue'

import { DiRange } from '@/shared/ui/base/range'

const displayValue = ref(68)
<\/script>

<template>
  <DiRange
    v-model="displayValue"
    label="Completion"
    helper-text="The displayed value updates as you move the slider."
    show-value
  />
</template>`

const stylingCode = `<div class="space-y-6">
  <DiRange :model-value="35" label="Rounded thumb" thumb-shape="rounded" />
  <DiRange :model-value="65" label="Square thumb" thumb-shape="square" />
</div>`

const tooltipCode = `<script setup lang="ts">
import { ref } from 'vue'

import { DiRange } from '@/shared/ui/base/range'

const tooltipValue = ref(42)
<\/script>

<template>
  <DiRange v-model="tooltipValue" label="Brightness" show-tooltip />
</template>`

const colorMixerCode = `<script setup lang="ts">
import { ref } from 'vue'

import { DiRange } from '@/shared/ui/base/range'

const redValue = ref(120)
const greenValue = ref(80)
const blueValue = ref(190)
<\/script>

<template>
  <div class="flex flex-wrap items-end justify-center gap-8">
    <div class="flex gap-8">
      <DiRange v-model="redValue" :max="255" aria-label="Red" orientation="vertical" variant="error" />
      <DiRange v-model="greenValue" :max="255" aria-label="Green" orientation="vertical" variant="success" />
      <DiRange v-model="blueValue" :max="255" aria-label="Blue" orientation="vertical" variant="info" />
    </div>
    <div
      class="aspect-square rounded-box border border-base-300"
      :style="{ backgroundColor: \`rgb(\${redValue}, \${greenValue}, \${blueValue})\` }"
    />
  </div>
</template>`

const linkedCode = `<script setup lang="ts">
import { ref } from 'vue'

import DiButton from '@/shared/ui/base/DiButton.vue'
import { DiRange } from '@/shared/ui/base/range'

const linkedValueA = ref(60)
const linkedValueB = ref(80)
const linkedLocked = ref(false)

function updateLinkedValueA(value: number) {
  const offset = linkedValueB.value - linkedValueA.value
  linkedValueA.value = value
  if (linkedLocked.value)
    linkedValueB.value = Math.min(100, Math.max(50, value + offset))
}

function updateLinkedValueB(value: number) {
  const offset = linkedValueB.value - linkedValueA.value
  linkedValueB.value = value
  if (linkedLocked.value)
    linkedValueA.value = Math.min(100, Math.max(50, value - offset))
}
<\/script>

<template>
  <div class="space-y-4">
    <DiRange
      :model-value="linkedValueA"
      :min="50"
      label="Linked control A"
      show-value
      @update:model-value="updateLinkedValueA"
    />
    <DiRange
      :model-value="linkedValueB"
      :min="50"
      label="Linked control B"
      show-value
      @update:model-value="updateLinkedValueB"
    />
    <DiButton size="sm" @click="linkedLocked = !linkedLocked">
      {{ linkedLocked ? 'Unlock controls' : 'Lock controls' }}
    </DiButton>
  </div>
</template>`

const toggleCode = `<script setup lang="ts">
import { ref } from 'vue'

import { DiRange } from '@/shared/ui/base/range'

const toggleValue = ref(1)
<\/script>

<template>
  <DiRange
    v-model="toggleValue"
    :min="0"
    :max="1"
    orientation="vertical"
    label="Slider toggle"
    :format-value="value => value ? 'On' : 'Off'"
    show-value
    show-ticks
  />
</template>`

const pipsCode = `<script setup lang="ts">
import { ref } from 'vue'

import { DiRange } from '@/shared/ui/base/range'

const pipValue = ref(50)
const namedTicks = [
  { value: 0, label: 'Low' },
  { value: 25, label: '25' },
  { value: 50, label: 'Medium' },
  { value: 75, label: '75' },
  { value: 100, label: 'High' },
]
<\/script>

<template>
  <DiRange
    v-model="pipValue"
    label="Click a marker to move"
    :ticks="namedTicks"
    ticks-clickable
    show-value
  />
</template>`

const softLimitsCode = `<script setup lang="ts">
import { computed, ref } from 'vue'

import { DiRange } from '@/shared/ui/base/range'

const softLimitValue = ref(50)
const softLimitMessage = computed(() =>
  softLimitValue.value < 20 || softLimitValue.value > 80
    ? 'Outside the recommended range of 20–80.'
    : undefined,
)

function enforceSoftLimits() {
  softLimitValue.value = Math.min(80, Math.max(20, softLimitValue.value))
}
<\/script>

<template>
  <DiRange
    v-model="softLimitValue"
    label="Soft limits"
    helper-text="Recommended: 20–80. The full 0–100 range remains available."
    :error="softLimitMessage"
    :ticks="[{ value: 20 }, { value: 80 }]"
    show-value
    @change="enforceSoftLimits"
  />
</template>`

const disabledToggleCode = `<script setup lang="ts">
import { ref } from 'vue'

import DiButton from '@/shared/ui/base/DiButton.vue'
import { DiRange } from '@/shared/ui/base/range'

const runtimeDisabled = ref(true)
<\/script>

<template>
  <div class="space-y-4">
    <DiRange :model-value="55" label="Runtime disabled state" :disabled="runtimeDisabled" />
    <DiButton size="sm" @click="runtimeDisabled = !runtimeDisabled">
      {{ runtimeDisabled ? 'Enable range' : 'Disable range' }}
    </DiButton>
  </div>
</template>`
</script>

<template>
  <div class="grid gap-6 xl:grid-cols-2">
    <PreviewCodeCard title="Basic Range" accent-color="#8b5cf6" :code="basicCode" language="vue">
      <DiRange v-model="basicValue" />
    </PreviewCodeCard>

    <PreviewCodeCard title="Sizes" accent-color="#14b8a6" :code="sizesCode" language="html">
      <div class="space-y-5">
        <DiRange :model-value="30" size="sm" label="Small range" />
        <DiRange :model-value="50" size="md" label="Medium range" />
        <DiRange :model-value="70" size="lg" label="Large range" />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      title="Semantic Variants"
      accent-color="#06b6d4"
      :code="variantsCode"
      language="html"
      class="xl:col-span-2"
    >
      <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <DiRange :model-value="40" variant="primary" label="Primary" />
        <DiRange :model-value="40" variant="secondary" label="Secondary" />
        <DiRange :model-value="40" variant="accent" label="Accent" />
        <DiRange :model-value="40" variant="info" label="Info" />
        <DiRange :model-value="40" variant="success" label="Success" />
        <DiRange :model-value="40" variant="warning" label="Warning" />
        <DiRange :model-value="40" variant="error" label="Error" />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      title="Min / Max Examples"
      accent-color="#8b5cf6"
      :code="limitsCode"
      language="html"
    >
      <div class="space-y-5">
        <DiRange :model-value="0" :min="-50" :max="50" label="Temperature (-50 to 50)" show-value />
        <DiRange
          :model-value="500"
          :min="100"
          :max="1000"
          label="Budget (100 to 1000)"
          show-value
        />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard title="Step Examples" accent-color="#f59e0b" :code="stepsCode" language="html">
      <div class="space-y-6">
        <DiRange :model-value="2.5" :min="0" :max="5" :step="0.5" label="Half steps" show-value />
        <DiRange :model-value="50" :step="25" label="Quarter steps" show-ticks />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard title="Disabled" accent-color="#64748b" :code="disabledCode" language="html">
      <div class="space-y-5">
        <DiRange :model-value="35" label="Disabled range" disabled />
        <DiRange :model-value="65" label="Readonly range" readonly show-value />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard title="With Labels" accent-color="#8b5cf6" :code="labelsCode" language="html">
      <div class="space-y-5">
        <DiRange :model-value="25" label="Volume" />
        <DiRange :model-value="75" label="Brightness" show-value />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      title="With Helper Text"
      accent-color="#06b6d4"
      :code="helperCode"
      language="html"
    >
      <DiRange
        :model-value="60"
        label="Profile completeness"
        helper-text="Move the slider to choose the completion target."
      />
    </PreviewCodeCard>

    <PreviewCodeCard
      title="Validation States"
      accent-color="#ef4444"
      :code="validationCode"
      language="html"
    >
      <div class="space-y-5">
        <DiRange
          :model-value="90"
          variant="primary"
          label="Risk threshold"
          error="Choose a value of 80 or lower."
          show-value
        />
        <DiRange
          :model-value="70"
          variant="secondary"
          label="Quality target"
          success="This target is within the recommended range."
          show-value
        />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard title="Value Display" accent-color="#22c55e" :code="valueCode" language="vue">
      <DiRange
        v-model="displayValue"
        label="Completion"
        helper-text="The displayed value updates as you move the slider."
        show-value
      />
    </PreviewCodeCard>

    <PreviewCodeCard
      title="Rounded and Square Styling"
      accent-color="#8b5cf6"
      :code="stylingCode"
      language="html"
    >
      <div class="space-y-6">
        <DiRange :model-value="35" label="Rounded thumb" thumb-shape="rounded" />
        <DiRange :model-value="65" label="Square thumb" thumb-shape="square" />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      title="Sliding Handle Tooltip"
      accent-color="#06b6d4"
      :code="tooltipCode"
      language="vue"
    >
      <DiRange v-model="tooltipValue" label="Brightness" show-tooltip />
    </PreviewCodeCard>

    <PreviewCodeCard
      title="Color Picker Sliders"
      accent-color="#ef4444"
      :code="colorMixerCode"
      language="vue"
    >
      <div class="flex flex-wrap items-end justify-center gap-8">
        <div class="flex gap-8">
          <DiRange
            v-model="redValue"
            :max="255"
            aria-label="Red"
            orientation="vertical"
            variant="error"
          />
          <DiRange
            v-model="greenValue"
            :max="255"
            aria-label="Green"
            orientation="vertical"
            variant="success"
          />
          <DiRange
            v-model="blueValue"
            :max="255"
            aria-label="Blue"
            orientation="vertical"
            variant="info"
          />
        </div>
        <div
          class="aspect-square rounded-box border border-base-300"
          :style="{ backgroundColor: `rgb(${redValue}, ${greenValue}, ${blueValue})` }"
        />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      title="Linked and Lockable Sliders"
      accent-color="#14b8a6"
      :code="linkedCode"
      language="vue"
    >
      <div class="space-y-4">
        <DiRange
          :model-value="linkedValueA"
          :min="50"
          label="Linked control A"
          show-value
          @update:model-value="updateLinkedValueA"
        />
        <DiRange
          :model-value="linkedValueB"
          :min="50"
          label="Linked control B"
          show-value
          @update:model-value="updateLinkedValueB"
        />
        <DiButton size="sm" @click="linkedLocked = !linkedLocked">
          {{ linkedLocked ? 'Unlock controls' : 'Lock controls' }}
        </DiButton>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard title="Slider Toggle" accent-color="#8b5cf6" :code="toggleCode" language="vue">
      <DiRange
        v-model="toggleValue"
        :min="0"
        :max="1"
        orientation="vertical"
        label="Slider toggle"
        :format-value="(value) => (value ? 'On' : 'Off')"
        show-value
        show-ticks
      />
    </PreviewCodeCard>

    <PreviewCodeCard title="Clickable Pips" accent-color="#f59e0b" :code="pipsCode" language="vue">
      <DiRange
        v-model="pipValue"
        label="Click a marker to move"
        :ticks="namedTicks"
        ticks-clickable
        show-value
      />
    </PreviewCodeCard>

    <PreviewCodeCard
      title="Soft Limits"
      accent-color="#f59e0b"
      :code="softLimitsCode"
      language="vue"
    >
      <DiRange
        v-model="softLimitValue"
        label="Soft limits"
        helper-text="Recommended: 20–80. The full 0–100 range remains available."
        :error="softLimitMessage"
        :ticks="[{ value: 20 }, { value: 80 }]"
        show-value
        @change="enforceSoftLimits"
      />
    </PreviewCodeCard>

    <PreviewCodeCard
      title="Runtime Disabled State"
      accent-color="#64748b"
      :code="disabledToggleCode"
      language="vue"
    >
      <div class="space-y-4">
        <DiRange :model-value="55" label="Runtime disabled state" :disabled="runtimeDisabled" />
        <DiButton size="sm" @click="runtimeDisabled = !runtimeDisabled">
          {{ runtimeDisabled ? 'Enable range' : 'Disable range' }}
        </DiButton>
      </div>
    </PreviewCodeCard>
  </div>
</template>
