<script setup lang="ts">
import { reactive, ref } from 'vue'

import DiButton from '@/shared/ui/base/DiButton.vue'
import DiModal from '@/shared/ui/base/DiModal.vue'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

const modalOpen = ref(false)
const positionModals = reactive({
  top: false,
  middle: false,
  bottom: false,
  start: false,
  end: false,
})

const placements = [
  { value: 'top', labelKey: 'features.advancedUi.modals.positions.top' },
  { value: 'middle', labelKey: 'features.advancedUi.modals.positions.middle' },
  { value: 'bottom', labelKey: 'features.advancedUi.modals.positions.bottom' },
  { value: 'start', labelKey: 'features.advancedUi.modals.positions.start' },
  { value: 'end', labelKey: 'features.advancedUi.modals.positions.end' },
] as const

const basicModalCode = `<script setup lang="ts">
import { ref } from 'vue'

import DiButton from '@/shared/ui/base/DiButton.vue'
import DiModal from '@/shared/ui/base/DiModal.vue'

const modalOpen = ref(false)
<\/script>

<template>
  <DiButton @click="modalOpen = true">
    {{ $t('features.advancedUi.modals.open') }}
  </DiButton>

  <DiModal v-model="modalOpen" aria-labelledby="basic-modal-title">
    <h2 id="basic-modal-title" class="text-xl font-bold">
      {{ $t('features.advancedUi.modals.title') }}
    </h2>
    <p class="py-4">
      {{ $t('features.advancedUi.modals.description') }}
    </p>

    <template #actions="{ close }">
      <DiButton @click="close">
        {{ $t('common.actions.close') }}
      </DiButton>
    </template>
  </DiModal>
</template>`

const positionVariantsCode = `<script setup lang="ts">
import { reactive } from 'vue'

import DiButton from '@/shared/ui/base/DiButton.vue'
import DiModal from '@/shared/ui/base/DiModal.vue'

const positionModals = reactive({
  top: false,
  middle: false,
  bottom: false,
  start: false,
  end: false,
})

const placements = [
  { value: 'top', labelKey: 'features.advancedUi.modals.positions.top' },
  { value: 'middle', labelKey: 'features.advancedUi.modals.positions.middle' },
  { value: 'bottom', labelKey: 'features.advancedUi.modals.positions.bottom' },
  { value: 'start', labelKey: 'features.advancedUi.modals.positions.start' },
  { value: 'end', labelKey: 'features.advancedUi.modals.positions.end' },
] as const
<\/script>

<template>
  <div class="flex flex-wrap gap-3">
    <DiButton
      v-for="placement in placements"
      :key="placement.value"
      @click="positionModals[placement.value] = true"
    >
      {{ $t(placement.labelKey) }}
    </DiButton>
  </div>

  <DiModal
    v-for="placement in placements"
    :key="placement.value"
    v-model="positionModals[placement.value]"
    :aria-labelledby="\`position-modal-\${placement.value}\`"
    backdrop-blur="sm"
    :placement="placement.value"
  >
    <h2 :id="\`position-modal-\${placement.value}\`" class="text-xl font-bold">
      {{ $t('features.advancedUi.modals.positions.modalTitle', {
        placement: $t(placement.labelKey),
      }) }}
    </h2>
    <p class="py-4">
      {{ $t('features.advancedUi.modals.positions.description', {
        placement: $t(placement.labelKey),
      }) }}
    </p>

    <template #actions="{ close }">
      <DiButton @click="close">
        {{ $t('common.actions.close') }}
      </DiButton>
    </template>
  </DiModal>
</template>`
</script>

<template>
  <div class="grid gap-6">
    <PreviewCodeCard
      :code="basicModalCode"
      language="vue"
      :title="$t('features.advancedUi.modals.example')"
    >
      <DiButton @click="modalOpen = true">
        {{ $t('features.advancedUi.modals.open') }}
      </DiButton>

      <DiModal v-model="modalOpen" aria-labelledby="basic-modal-title">
        <h2 id="basic-modal-title" class="text-xl font-bold">
          {{ $t('features.advancedUi.modals.title') }}
        </h2>
        <p class="py-4">
          {{ $t('features.advancedUi.modals.description') }}
        </p>

        <template #actions="{ close }">
          <DiButton @click="close">
            {{ $t('common.actions.close') }}
          </DiButton>
        </template>
      </DiModal>
    </PreviewCodeCard>

    <PreviewCodeCard
      :code="positionVariantsCode"
      language="vue"
      :title="$t('features.advancedUi.modals.positions.title')"
    >
      <div class="flex flex-wrap gap-3">
        <DiButton
          v-for="placement in placements"
          :key="placement.value"
          @click="positionModals[placement.value] = true"
        >
          {{ $t(placement.labelKey) }}
        </DiButton>
      </div>

      <DiModal
        v-for="placement in placements"
        :key="placement.value"
        v-model="positionModals[placement.value]"
        :aria-labelledby="`position-modal-${placement.value}`"
        backdrop-blur="sm"
        :placement="placement.value"
      >
        <h2 :id="`position-modal-${placement.value}`" class="text-xl font-bold">
          {{
            $t('features.advancedUi.modals.positions.modalTitle', {
              placement: $t(placement.labelKey),
            })
          }}
        </h2>
        <p class="py-4">
          {{
            $t('features.advancedUi.modals.positions.description', {
              placement: $t(placement.labelKey),
            })
          }}
        </p>

        <template #actions="{ close }">
          <DiButton @click="close">
            {{ $t('common.actions.close') }}
          </DiButton>
        </template>
      </DiModal>
    </PreviewCodeCard>
  </div>
</template>
