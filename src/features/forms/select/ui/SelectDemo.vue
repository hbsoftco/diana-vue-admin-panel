<script setup lang="ts">
import { reactive, ref } from 'vue'

import type { DiSelectSize, DiSelectVariant, SelectOption } from '@/shared/ui/base/select'

import DiButton from '@/shared/ui/base/DiButton.vue'
import { DiSelect } from '@/shared/ui/base/select'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

type PersonMeta = { initials: string, role: string, color: string }

const states: SelectOption[] = [
  { label: 'Texas', value: 'texas' },
  { label: 'Georgia', value: 'georgia' },
  { label: 'California', value: 'california' },
  { label: 'Washington D.C', value: 'washington' },
  { label: 'Virginia', value: 'virginia', disabled: true },
]

const people: SelectOption[] = [
  {
    label: 'Andrew',
    value: 'andrew',
    meta: { initials: 'AN', role: 'Designer', color: 'bg-primary' } satisfies PersonMeta,
  },
  {
    label: 'Maya',
    value: 'maya',
    meta: { initials: 'MY', role: 'Developer', color: 'bg-info' } satisfies PersonMeta,
  },
  {
    label: 'Brodus Axel',
    value: 'brodus',
    meta: { initials: 'BA', role: 'Product manager', color: 'bg-success' } satisfies PersonMeta,
  },
  {
    label: 'Goldhens',
    value: 'goldhens',
    meta: { initials: 'GO', role: 'Researcher', color: 'bg-warning' } satisfies PersonMeta,
  },
  {
    label: 'Angelina',
    value: 'angelina',
    meta: { initials: 'AG', role: 'Support lead', color: 'bg-secondary' } satisfies PersonMeta,
  },
]

const basicValue = ref<string | number | null>('texas')
const multipleValue = ref<(string | number)[]>(['texas'])
const placeholderValue = ref<string | number | null>(null)
const multiplePlaceholderValue = ref<(string | number)[]>([])
const customOptionValue = ref<string | number | null>(null)
const customSelectedValue = ref<string | number | null>('andrew')
const limitedValue = ref<(string | number)[]>(['andrew', 'maya'])
const disabledValue = ref<string | number | null>('texas')
const disabledMultipleValue = ref<(string | number)[]>(['texas'])
const controlsDisabled = ref(false)
const variantExamples = reactive<
  Array<{
    variant: DiSelectVariant
    value: (string | number)[]
  }>
>(
  ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'].map(variant => ({
    variant: variant as DiSelectVariant,
    value: ['texas'],
  })),
)
const singleSizeExamples = reactive<
  Array<{
    size: DiSelectSize
    value: string | number | null
  }>
>(['sm', 'md', 'lg'].map(size => ({ size: size as DiSelectSize, value: 'texas' })))
const multipleSizeExamples = reactive<
  Array<{
    size: DiSelectSize
    value: (string | number)[]
  }>
>(['sm', 'md', 'lg'].map(size => ({ size: size as DiSelectSize, value: ['texas'] })))

function personMeta(option: SelectOption) {
  return option.meta as PersonMeta
}

const basicCode = `<DiSelect v-model="basicValue" :options="states" />`
const multipleCode = `<DiSelect v-model="multipleValue" :options="states" multiple />`
const variantsCode = `<div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
  <div v-for="example in variantExamples" :key="example.variant" class="space-y-1.5">
    <span class="block text-sm font-medium capitalize">{{ example.variant }}</span>
    <DiSelect v-model="example.value" :options="states" :variant="example.variant" multiple />
  </div>
</div>`
const sizesCode = `<div class="grid gap-6 lg:grid-cols-2">
  <div class="space-y-3">
    <h3 class="font-semibold">Single select sizes</h3>
    <div v-for="example in singleSizeExamples" :key="example.size" class="space-y-1.5">
      <span class="block text-sm font-medium capitalize">{{ example.size }} select</span>
      <DiSelect v-model="example.value" :options="states" :size="example.size" />
    </div>
  </div>
  <div class="space-y-3">
    <h3 class="font-semibold">Multiple select sizes</h3>
    <div v-for="example in multipleSizeExamples" :key="example.size" class="space-y-1.5">
      <span class="block text-sm font-medium capitalize">{{ example.size }} select with tags</span>
      <DiSelect v-model="example.value" :options="states" :size="example.size" multiple />
    </div>
  </div>
</div>`
const singlePlaceholderCode = `<DiSelect
  v-model="placeholderValue"
  :options="states"
  placeholder="Select a state"
  clearable
/>`
const multiplePlaceholderCode = `<DiSelect
  v-model="multiplePlaceholderValue"
  :options="people"
  multiple
  placeholder="Choose people"
/>`
const customOptionCode = `<DiSelect v-model="customOptionValue" :options="people" placeholder="Choose customer">
  <template #option="{ option }">
    <div class="flex items-center gap-2">
      <span class="grid size-8 place-items-center rounded-full text-xs text-white" :class="personMeta(option).color">{{ personMeta(option).initials }}</span>
      <span><span class="block font-medium">{{ option.label }}</span><span class="block text-xs text-base-content/50">{{ personMeta(option).role }}</span></span>
    </div>
  </template>
</DiSelect>`
const customSelectedCode = `<DiSelect v-model="customSelectedValue" :options="people" placeholder="Choose client">
  <template #selected="{ option }">
    <span class="flex min-w-0 flex-1 items-center gap-2">
      <span class="grid size-6 place-items-center rounded-full text-[10px] text-white" :class="personMeta(option).color">{{ personMeta(option).initials }}</span>
      <span class="truncate">{{ option.label }}</span>
    </span>
  </template>
</DiSelect>`
const limitCode = `<DiSelect
  v-model="limitedValue"
  :options="people"
  multiple
  :max-selections="3"
  placeholder="Choose people"
/>`
const disabledCode = `<div class="space-y-3">
  <DiSelect v-model="disabledValue" :options="states" :disabled="controlsDisabled" />
  <DiSelect v-model="disabledMultipleValue" :options="states" multiple :disabled="controlsDisabled" />
  <div class="flex gap-2">
    <DiButton variant="primary" soft size="sm" @click="controlsDisabled = false">Enable</DiButton>
    <DiButton variant="primary" size="sm" @click="controlsDisabled = true">Disable</DiButton>
  </div>
</div>`
</script>

<template>
  <div class="grid gap-6 xl:grid-cols-3">
    <PreviewCodeCard title="Basic Select" accent-color="#8b5cf6" :code="basicCode">
      <DiSelect v-model="basicValue" :options="states" />
    </PreviewCodeCard>
    <PreviewCodeCard title="Multiple Select" accent-color="#8b5cf6" :code="multipleCode">
      <DiSelect v-model="multipleValue" :options="states" multiple />
    </PreviewCodeCard>
    <PreviewCodeCard
      title="Semantic Variants"
      accent-color="#8b5cf6"
      :code="variantsCode"
      class="xl:col-span-3"
    >
      <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div v-for="example in variantExamples" :key="example.variant" class="space-y-1.5">
          <span class="block text-sm font-medium capitalize">{{ example.variant }}</span>
          <DiSelect v-model="example.value" :options="states" :variant="example.variant" multiple />
        </div>
      </div>
    </PreviewCodeCard>
    <PreviewCodeCard title="Sizes" accent-color="#14b8a6" :code="sizesCode" class="xl:col-span-3">
      <div class="grid gap-6 lg:grid-cols-2">
        <div class="space-y-3">
          <h3 class="font-semibold">
            Single select sizes
          </h3>
          <div v-for="example in singleSizeExamples" :key="example.size" class="space-y-1.5">
            <span class="block text-sm font-medium capitalize">{{ example.size }} select</span>
            <DiSelect v-model="example.value" :options="states" :size="example.size" />
          </div>
        </div>
        <div class="space-y-3">
          <h3 class="font-semibold">
            Multiple select sizes
          </h3>
          <div v-for="example in multipleSizeExamples" :key="example.size" class="space-y-1.5">
            <span class="block text-sm font-medium capitalize">{{ example.size }} select with tags</span>
            <DiSelect v-model="example.value" :options="states" :size="example.size" multiple />
          </div>
        </div>
      </div>
    </PreviewCodeCard>
    <PreviewCodeCard
      title="Single Select With Placeholder"
      accent-color="#8b5cf6"
      :code="singlePlaceholderCode"
    >
      <DiSelect
        v-model="placeholderValue"
        :options="states"
        placeholder="Select a state"
        clearable
      />
    </PreviewCodeCard>
    <PreviewCodeCard
      title="Multiple Select With Placeholder"
      accent-color="#06b6d4"
      :code="multiplePlaceholderCode"
    >
      <DiSelect
        v-model="multiplePlaceholderValue"
        :options="people"
        multiple
        placeholder="Choose people"
      />
    </PreviewCodeCard>
    <PreviewCodeCard
      title="Custom Option Rendering"
      accent-color="#06b6d4"
      :code="customOptionCode"
    >
      <DiSelect v-model="customOptionValue" :options="people" placeholder="Choose customer">
        <template #option="{ option }">
          <div class="flex items-center gap-2">
            <span
              class="grid size-8 place-items-center rounded-full text-xs text-white"
              :class="personMeta(option).color"
            >{{ personMeta(option).initials }}</span>
            <span><span class="block font-medium">{{ option.label }}</span><span class="block text-xs text-base-content/50">{{
              personMeta(option).role
            }}</span></span>
          </div>
        </template>
      </DiSelect>
    </PreviewCodeCard>
    <PreviewCodeCard
      title="Custom Selected Rendering"
      accent-color="#06b6d4"
      :code="customSelectedCode"
    >
      <DiSelect v-model="customSelectedValue" :options="people" placeholder="Choose client">
        <template #selected="{ option }">
          <span class="flex min-w-0 flex-1 items-center gap-2">
            <span
              class="grid size-6 place-items-center rounded-full text-[10px] text-white"
              :class="personMeta(option).color"
            >{{ personMeta(option).initials }}</span>
            <span class="truncate">{{ option.label }}</span>
          </span>
        </template>
      </DiSelect>
    </PreviewCodeCard>
    <PreviewCodeCard
      title="Maximum Selection Limit"
      accent-color="#f59e0b"
      :code="limitCode"
      class="xl:col-span-2"
    >
      <DiSelect
        v-model="limitedValue"
        :options="people"
        multiple
        :max-selections="3"
        placeholder="Choose people"
      />
    </PreviewCodeCard>
    <PreviewCodeCard title="Runtime Disable / Enable" accent-color="#ef4444" :code="disabledCode">
      <div class="space-y-3">
        <DiSelect v-model="disabledValue" :options="states" :disabled="controlsDisabled" />
        <DiSelect
          v-model="disabledMultipleValue"
          :options="states"
          multiple
          :disabled="controlsDisabled"
        />
        <div class="flex gap-2">
          <DiButton variant="primary" soft size="sm" @click="controlsDisabled = false">
            Enable
          </DiButton>
          <DiButton variant="primary" size="sm" @click="controlsDisabled = true">
            Disable
          </DiButton>
        </div>
      </div>
    </PreviewCodeCard>
  </div>
</template>
