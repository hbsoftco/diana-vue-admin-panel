<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import type { AccordionItem } from '@/shared/ui/base/DiAccordion.vue'

import DiAccordion from '@/shared/ui/base/DiAccordion.vue'
import DiBadge from '@/shared/ui/base/DiBadge.vue'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

const { t } = useI18n()

const singleOpen = ref(['account'])
const multipleOpen = ref(['account', 'shipping'])

const items = computed<AccordionItem[]>(() => [
  {
    id: 'account',
    title: t('features.advanced-ui.accordions.accountTitle'),
    content: t('features.advanced-ui.accordions.accountContent'),
  },
  {
    id: 'shipping',
    title: t('features.advanced-ui.accordions.shippingTitle'),
    content: t('features.advanced-ui.accordions.shippingContent'),
  },
  {
    id: 'returns',
    title: t('features.advanced-ui.accordions.returnsTitle'),
    content: t('features.advanced-ui.accordions.returnsContent'),
  },
])

const stateItems = computed<AccordionItem[]>(() => [
  ...items.value,
  {
    id: 'unavailable',
    title: t('features.advanced-ui.accordions.disabledTitle'),
    content: t('features.advanced-ui.accordions.disabledContent'),
    disabled: true,
  },
])

const basicCode = `<script setup lang="ts">
import { ref } from 'vue'
import DiAccordion from '@/shared/ui/base/DiAccordion.vue'

const openItems = ref(['account'])
const items = [
  { id: 'account', title: 'Account settings', content: 'Manage your profile and security.' },
  { id: 'shipping', title: 'Shipping', content: 'Review delivery methods and addresses.' },
]
<\/script>

<template>
  <DiAccordion v-model="openItems" :items="items" />
</template>`

const multipleCode = `<template>
  <DiAccordion
    v-model="openItems"
    :items="items"
    multiple
  />
</template>`

const variantsCode = `<template>
  <DiAccordion :items="items" variant="bordered" icon="plus" size="sm" />
  <DiAccordion :items="items" icon="none" size="lg" />
</template>`

const slotsCode = `<template>
  <DiAccordion :items="items">
    <template #title="{ item, open }">
      <span class="flex items-center gap-2">
        {{ item.title }}
        <DiBadge v-if="open" size="xs" variant="success">Open</DiBadge>
      </span>
    </template>

    <template #default="{ item }">
      <p>{{ item.content }}</p>
    </template>
  </DiAccordion>
</template>`
</script>

<template>
  <div class="grid grid-cols-1 gap-6 xl:grid-cols-2">
    <PreviewCodeCard :title="$t('features.advanced-ui.accordions.basic')" :code="basicCode">
      <DiAccordion v-model="singleOpen" :items="items" />
    </PreviewCodeCard>

    <PreviewCodeCard :title="$t('features.advanced-ui.accordions.multiple')" :code="multipleCode">
      <DiAccordion v-model="multipleOpen" :items="items" multiple />
      <p class="mt-3 text-xs text-base-content/60">
        {{ $t('features.advanced-ui.accordions.openItems') }}:
        {{ multipleOpen.join(', ') || $t('features.advanced-ui.accordions.none') }}
      </p>
    </PreviewCodeCard>

    <PreviewCodeCard :title="$t('features.advanced-ui.accordions.variants')" :code="variantsCode">
      <div class="space-y-5">
        <DiAccordion :items="items" variant="bordered" icon="plus" size="sm" />
        <DiAccordion :items="stateItems" icon="none" size="lg" />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard :title="$t('features.advanced-ui.accordions.customContent')" :code="slotsCode">
      <DiAccordion :items="items">
        <template #title="{ item, open }">
          <span class="flex items-center gap-2">
            {{ item.title }}
            <DiBadge v-if="open" size="xs" variant="success">
              {{ $t('features.advanced-ui.accordions.open') }}
            </DiBadge>
          </span>
        </template>

        <template #default="{ item }">
          <p>{{ item.content }}</p>
        </template>
      </DiAccordion>
    </PreviewCodeCard>
  </div>
</template>
