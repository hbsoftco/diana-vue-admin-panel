<script setup lang="ts">
import { reactive, ref } from 'vue'

import DiButton from '@/shared/ui/base/DiButton.vue'
import DiModal from '@/shared/ui/base/DiModal.vue'
import DiRating from '@/shared/ui/base/DiRating.vue'
import DiInput from '@/shared/ui/base/input/DiInput.vue'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

const modalOpen = ref(false)
const persistentModalOpen = ref(false)
const scrollableModalOpen = ref(false)
const headerlessModalOpen = ref(false)
const fullscreenModalOpen = ref(false)
const blurredModalOpen = ref(false)
const ratingModalOpen = ref(false)
const rating = ref(3)
const parentModalOpen = ref(false)
const childModalOpen = ref(false)
const messageModalOpen = ref(false)
const messageRecipient = ref('')
const messageBody = ref('')
const messageWidth = ref('max-w-lg')
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

function openMessageModal(recipient: string, widthClass: string) {
  messageRecipient.value = recipient
  messageBody.value = ''
  messageWidth.value = widthClass
  messageModalOpen.value = true
}

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

const persistentModalCode = `<script setup lang="ts">
import { ref } from 'vue'

import DiButton from '@/shared/ui/base/DiButton.vue'
import DiModal from '@/shared/ui/base/DiModal.vue'

const persistentModalOpen = ref(false)
<\/script>

<template>
  <DiButton @click="persistentModalOpen = true">
    {{ $t('features.advancedUi.modals.persistent.open') }}
  </DiButton>

  <DiModal
    v-model="persistentModalOpen"
    aria-labelledby="persistent-modal-title"
    persistent
    show-close-button
  >
    <h2 id="persistent-modal-title" class="text-xl font-bold">
      {{ $t('features.advancedUi.modals.persistent.modalTitle') }}
    </h2>
    <p class="py-4">
      {{ $t('features.advancedUi.modals.persistent.description') }}
    </p>

    <template #actions="{ close }">
      <DiButton @click="close">
        {{ $t('common.actions.close') }}
      </DiButton>
    </template>
  </DiModal>
</template>`

const scrollableModalCode = `<script setup lang="ts">
import { ref } from 'vue'

import DiButton from '@/shared/ui/base/DiButton.vue'
import DiModal from '@/shared/ui/base/DiModal.vue'

const scrollableModalOpen = ref(false)
<\/script>

<template>
  <DiButton @click="scrollableModalOpen = true">
    {{ $t('features.advancedUi.modals.scrollable.open') }}
  </DiButton>

  <DiModal
    v-model="scrollableModalOpen"
    aria-labelledby="scrollable-modal-title"
    box-class="max-h-[75dvh] overflow-y-auto"
    show-close-button
    width-class="max-w-xl"
  >
    <h2 id="scrollable-modal-title" class="text-xl font-bold">
      {{ $t('features.advancedUi.modals.scrollable.modalTitle') }}
    </h2>
    <div class="space-y-4 py-4">
      <p v-for="paragraph in 8" :key="paragraph">
        {{ $t('features.advancedUi.modals.scrollable.paragraph') }}
      </p>
    </div>

    <template #actions="{ close }">
      <DiButton @click="close">
        {{ $t('common.actions.close') }}
      </DiButton>
    </template>
  </DiModal>
</template>`

const headerlessModalCode = `<script setup lang="ts">
import { ref } from 'vue'

import DiButton from '@/shared/ui/base/DiButton.vue'
import DiModal from '@/shared/ui/base/DiModal.vue'

const headerlessModalOpen = ref(false)
<\/script>

<template>
  <DiButton @click="headerlessModalOpen = true">
    {{ $t('features.advancedUi.modals.headerless.open') }}
  </DiButton>

  <DiModal
    v-model="headerlessModalOpen"
    :aria-label="$t('features.advancedUi.modals.headerless.ariaLabel')"
    show-close-button
    width-class="max-w-sm"
  >
    <p class="pt-8">
      {{ $t('features.advancedUi.modals.headerless.description') }}
    </p>

    <template #actions="{ close }">
      <DiButton @click="close">
        {{ $t('features.advancedUi.modals.headerless.understood') }}
      </DiButton>
    </template>
  </DiModal>
</template>`

const fullscreenModalCode = `<script setup lang="ts">
import { ref } from 'vue'

import DiButton from '@/shared/ui/base/DiButton.vue'
import DiModal from '@/shared/ui/base/DiModal.vue'

const fullscreenModalOpen = ref(false)
<\/script>

<template>
  <DiButton @click="fullscreenModalOpen = true">
    {{ $t('features.advancedUi.modals.fullscreen.open') }}
  </DiButton>

  <DiModal
    v-model="fullscreenModalOpen"
    aria-labelledby="fullscreen-modal-title"
    box-class="flex h-dvh max-h-none flex-col rounded-none [&>.modal-action]:mt-auto"
    modal-class="p-0"
    show-close-button
    width-class="w-full max-w-none"
  >
    <h2 id="fullscreen-modal-title" class="text-xl font-bold">
      {{ $t('features.advancedUi.modals.fullscreen.modalTitle') }}
    </h2>
    <p class="py-4">
      {{ $t('features.advancedUi.modals.fullscreen.description') }}
    </p>

    <template #actions="{ close }">
      <DiButton @click="close">
        {{ $t('common.actions.close') }}
      </DiButton>
    </template>
  </DiModal>
</template>`

const blurredModalCode = `<script setup lang="ts">
import { ref } from 'vue'

import DiButton from '@/shared/ui/base/DiButton.vue'
import DiModal from '@/shared/ui/base/DiModal.vue'

const blurredModalOpen = ref(false)
<\/script>

<template>
  <DiButton @click="blurredModalOpen = true">
    {{ $t('features.advancedUi.modals.blurred.open') }}
  </DiButton>

  <DiModal
    v-model="blurredModalOpen"
    aria-labelledby="blurred-modal-title"
    backdrop-blur="md"
  >
    <h2 id="blurred-modal-title" class="text-xl font-bold">
      {{ $t('features.advancedUi.modals.blurred.modalTitle') }}
    </h2>
    <p class="py-4">
      {{ $t('features.advancedUi.modals.blurred.description') }}
    </p>

    <template #actions="{ close }">
      <DiButton @click="close">
        {{ $t('common.actions.close') }}
      </DiButton>
    </template>
  </DiModal>
</template>`

const ratingModalCode = `<script setup lang="ts">
import { ref } from 'vue'

import DiButton from '@/shared/ui/base/DiButton.vue'
import DiModal from '@/shared/ui/base/DiModal.vue'
import DiRating from '@/shared/ui/base/DiRating.vue'

const ratingModalOpen = ref(false)
const rating = ref(3)
<\/script>

<template>
  <DiButton @click="ratingModalOpen = true">
    {{ $t('features.advancedUi.modals.rating.open') }}
  </DiButton>

  <DiModal
    v-model="ratingModalOpen"
    aria-labelledby="rating-modal-title"
    show-close-button
    width-class="max-w-sm"
  >
    <h2 id="rating-modal-title" class="text-xl font-bold">
      {{ $t('features.advancedUi.modals.rating.modalTitle') }}
    </h2>
    <p class="py-4">
      {{ $t('features.advancedUi.modals.rating.question') }}
    </p>
    <DiRating v-model="rating" name="modal-rating" />

    <template #actions="{ close }">
      <DiButton @click="close">
        {{ $t('common.actions.close') }}
      </DiButton>
    </template>
  </DiModal>
</template>`

const nestedModalCode = `<script setup lang="ts">
import { ref } from 'vue'

import DiButton from '@/shared/ui/base/DiButton.vue'
import DiModal from '@/shared/ui/base/DiModal.vue'

const parentModalOpen = ref(false)
const childModalOpen = ref(false)
<\/script>

<template>
  <DiButton @click="parentModalOpen = true">
    {{ $t('features.advancedUi.modals.nested.open') }}
  </DiButton>

  <DiModal v-model="parentModalOpen" aria-labelledby="parent-modal-title">
    <h2 id="parent-modal-title" class="text-xl font-bold">
      {{ $t('features.advancedUi.modals.nested.parentTitle') }}
    </h2>
    <p class="py-4">
      {{ $t('features.advancedUi.modals.nested.parentDescription') }}
    </p>
    <DiButton @click="childModalOpen = true">
      {{ $t('features.advancedUi.modals.nested.openChild') }}
    </DiButton>

    <template #actions="{ close }">
      <DiButton @click="close">
        {{ $t('common.actions.close') }}
      </DiButton>
    </template>
  </DiModal>

  <DiModal
    v-model="childModalOpen"
    aria-labelledby="child-modal-title"
    width-class="max-w-xs"
  >
    <h2 id="child-modal-title" class="text-lg font-bold">
      {{ $t('features.advancedUi.modals.nested.childTitle') }}
    </h2>
    <p class="py-4">
      {{ $t('features.advancedUi.modals.nested.childDescription') }}
    </p>

    <template #actions="{ close }">
      <DiButton @click="close">
        {{ $t('common.actions.close') }}
      </DiButton>
    </template>
  </DiModal>
</template>`

const varyingContentCode = `<script setup lang="ts">
import { ref } from 'vue'

import DiButton from '@/shared/ui/base/DiButton.vue'
import DiInput from '@/shared/ui/base/input/DiInput.vue'
import DiModal from '@/shared/ui/base/DiModal.vue'

const messageModalOpen = ref(false)
const messageRecipient = ref('')
const messageBody = ref('')
const messageWidth = ref('max-w-lg')

function openMessageModal(recipient: string, widthClass: string) {
  messageRecipient.value = recipient
  messageBody.value = ''
  messageWidth.value = widthClass
  messageModalOpen.value = true
}
<\/script>

<template>
  <div class="flex flex-wrap gap-3">
    <DiButton @click="openMessageModal('@mdo', 'max-w-sm')">
      @mdo
    </DiButton>
    <DiButton @click="openMessageModal('@fat', 'max-w-lg')">
      @fat
    </DiButton>
    <DiButton @click="openMessageModal('@getbootstrap', 'max-w-2xl')">
      @getbootstrap
    </DiButton>
  </div>

  <DiModal
    v-model="messageModalOpen"
    aria-labelledby="message-modal-title"
    show-close-button
    :width-class="messageWidth"
  >
    <h2 id="message-modal-title" class="text-xl font-bold">
      {{ $t('features.advancedUi.modals.varying.modalTitle', { recipient: messageRecipient }) }}
    </h2>
    <div class="space-y-4 py-4">
      <DiInput
        v-model="messageRecipient"
        :label="$t('features.advancedUi.modals.varying.recipient')"
      />
      <label class="block text-sm font-medium">
        {{ $t('features.advancedUi.modals.varying.message') }}
        <textarea
          v-model="messageBody"
          class="textarea textarea-bordered mt-1.5 w-full"
          rows="4"
        />
      </label>
    </div>

    <template #actions="{ close }">
      <DiButton variant="ghost" @click="close">
        {{ $t('common.actions.close') }}
      </DiButton>
      <DiButton @click="close">
        {{ $t('features.advancedUi.modals.varying.send') }}
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

    <PreviewCodeCard
      :code="persistentModalCode"
      language="vue"
      :title="$t('features.advancedUi.modals.persistent.title')"
    >
      <DiButton @click="persistentModalOpen = true">
        {{ $t('features.advancedUi.modals.persistent.open') }}
      </DiButton>

      <DiModal
        v-model="persistentModalOpen"
        aria-labelledby="persistent-modal-title"
        persistent
        show-close-button
      >
        <h2 id="persistent-modal-title" class="text-xl font-bold">
          {{ $t('features.advancedUi.modals.persistent.modalTitle') }}
        </h2>
        <p class="py-4">
          {{ $t('features.advancedUi.modals.persistent.description') }}
        </p>

        <template #actions="{ close }">
          <DiButton @click="close">
            {{ $t('common.actions.close') }}
          </DiButton>
        </template>
      </DiModal>
    </PreviewCodeCard>

    <PreviewCodeCard
      :code="scrollableModalCode"
      language="vue"
      :title="$t('features.advancedUi.modals.scrollable.title')"
    >
      <DiButton @click="scrollableModalOpen = true">
        {{ $t('features.advancedUi.modals.scrollable.open') }}
      </DiButton>

      <DiModal
        v-model="scrollableModalOpen"
        aria-labelledby="scrollable-modal-title"
        box-class="max-h-[75dvh] overflow-y-auto"
        show-close-button
        width-class="max-w-xl"
      >
        <h2 id="scrollable-modal-title" class="text-xl font-bold">
          {{ $t('features.advancedUi.modals.scrollable.modalTitle') }}
        </h2>
        <div class="space-y-4 py-4">
          <p v-for="paragraph in 8" :key="paragraph">
            {{ $t('features.advancedUi.modals.scrollable.paragraph') }}
          </p>
        </div>

        <template #actions="{ close }">
          <DiButton @click="close">
            {{ $t('common.actions.close') }}
          </DiButton>
        </template>
      </DiModal>
    </PreviewCodeCard>

    <PreviewCodeCard
      :code="headerlessModalCode"
      language="vue"
      :title="$t('features.advancedUi.modals.headerless.title')"
    >
      <DiButton @click="headerlessModalOpen = true">
        {{ $t('features.advancedUi.modals.headerless.open') }}
      </DiButton>

      <DiModal
        v-model="headerlessModalOpen"
        :aria-label="$t('features.advancedUi.modals.headerless.ariaLabel')"
        show-close-button
        width-class="max-w-sm"
      >
        <p class="pt-8">
          {{ $t('features.advancedUi.modals.headerless.description') }}
        </p>

        <template #actions="{ close }">
          <DiButton @click="close">
            {{ $t('features.advancedUi.modals.headerless.understood') }}
          </DiButton>
        </template>
      </DiModal>
    </PreviewCodeCard>

    <PreviewCodeCard
      :code="fullscreenModalCode"
      language="vue"
      :title="$t('features.advancedUi.modals.fullscreen.title')"
    >
      <DiButton @click="fullscreenModalOpen = true">
        {{ $t('features.advancedUi.modals.fullscreen.open') }}
      </DiButton>

      <DiModal
        v-model="fullscreenModalOpen"
        aria-labelledby="fullscreen-modal-title"
        box-class="flex h-dvh max-h-none flex-col rounded-none [&>.modal-action]:mt-auto"
        modal-class="p-0"
        show-close-button
        width-class="w-full max-w-none"
      >
        <h2 id="fullscreen-modal-title" class="text-xl font-bold">
          {{ $t('features.advancedUi.modals.fullscreen.modalTitle') }}
        </h2>
        <p class="py-4">
          {{ $t('features.advancedUi.modals.fullscreen.description') }}
        </p>

        <template #actions="{ close }">
          <DiButton @click="close">
            {{ $t('common.actions.close') }}
          </DiButton>
        </template>
      </DiModal>
    </PreviewCodeCard>

    <PreviewCodeCard
      :code="blurredModalCode"
      language="vue"
      :title="$t('features.advancedUi.modals.blurred.title')"
    >
      <DiButton @click="blurredModalOpen = true">
        {{ $t('features.advancedUi.modals.blurred.open') }}
      </DiButton>

      <DiModal v-model="blurredModalOpen" aria-labelledby="blurred-modal-title" backdrop-blur="md">
        <h2 id="blurred-modal-title" class="text-xl font-bold">
          {{ $t('features.advancedUi.modals.blurred.modalTitle') }}
        </h2>
        <p class="py-4">
          {{ $t('features.advancedUi.modals.blurred.description') }}
        </p>

        <template #actions="{ close }">
          <DiButton @click="close">
            {{ $t('common.actions.close') }}
          </DiButton>
        </template>
      </DiModal>
    </PreviewCodeCard>

    <PreviewCodeCard
      :code="ratingModalCode"
      language="vue"
      :title="$t('features.advancedUi.modals.rating.title')"
    >
      <DiButton @click="ratingModalOpen = true">
        {{ $t('features.advancedUi.modals.rating.open') }}
      </DiButton>

      <DiModal
        v-model="ratingModalOpen"
        aria-labelledby="rating-modal-title"
        show-close-button
        width-class="max-w-sm"
      >
        <h2 id="rating-modal-title" class="text-xl font-bold">
          {{ $t('features.advancedUi.modals.rating.modalTitle') }}
        </h2>
        <p class="py-4">
          {{ $t('features.advancedUi.modals.rating.question') }}
        </p>
        <DiRating v-model="rating" name="modal-rating" />

        <template #actions="{ close }">
          <DiButton @click="close">
            {{ $t('common.actions.close') }}
          </DiButton>
        </template>
      </DiModal>
    </PreviewCodeCard>

    <PreviewCodeCard
      :code="nestedModalCode"
      language="vue"
      :title="$t('features.advancedUi.modals.nested.title')"
    >
      <DiButton @click="parentModalOpen = true">
        {{ $t('features.advancedUi.modals.nested.open') }}
      </DiButton>

      <DiModal v-model="parentModalOpen" aria-labelledby="parent-modal-title">
        <h2 id="parent-modal-title" class="text-xl font-bold">
          {{ $t('features.advancedUi.modals.nested.parentTitle') }}
        </h2>
        <p class="py-4">
          {{ $t('features.advancedUi.modals.nested.parentDescription') }}
        </p>
        <DiButton @click="childModalOpen = true">
          {{ $t('features.advancedUi.modals.nested.openChild') }}
        </DiButton>

        <template #actions="{ close }">
          <DiButton @click="close">
            {{ $t('common.actions.close') }}
          </DiButton>
        </template>
      </DiModal>

      <DiModal v-model="childModalOpen" aria-labelledby="child-modal-title" width-class="max-w-xs">
        <h2 id="child-modal-title" class="text-lg font-bold">
          {{ $t('features.advancedUi.modals.nested.childTitle') }}
        </h2>
        <p class="py-4">
          {{ $t('features.advancedUi.modals.nested.childDescription') }}
        </p>

        <template #actions="{ close }">
          <DiButton @click="close">
            {{ $t('common.actions.close') }}
          </DiButton>
        </template>
      </DiModal>
    </PreviewCodeCard>

    <PreviewCodeCard
      :code="varyingContentCode"
      language="vue"
      :title="$t('features.advancedUi.modals.varying.title')"
    >
      <div class="flex flex-wrap gap-3">
        <DiButton @click="openMessageModal('@mdo', 'max-w-sm')">
          @mdo
        </DiButton>
        <DiButton @click="openMessageModal('@fat', 'max-w-lg')">
          @fat
        </DiButton>
        <DiButton @click="openMessageModal('@getbootstrap', 'max-w-2xl')">
          @getbootstrap
        </DiButton>
      </div>

      <DiModal
        v-model="messageModalOpen"
        aria-labelledby="message-modal-title"
        show-close-button
        :width-class="messageWidth"
      >
        <h2 id="message-modal-title" class="text-xl font-bold">
          {{ $t('features.advancedUi.modals.varying.modalTitle', { recipient: messageRecipient }) }}
        </h2>
        <div class="space-y-4 py-4">
          <DiInput
            v-model="messageRecipient"
            :label="$t('features.advancedUi.modals.varying.recipient')"
          />
          <label class="block text-sm font-medium">
            {{ $t('features.advancedUi.modals.varying.message') }}
            <textarea
              v-model="messageBody"
              class="textarea textarea-bordered mt-1.5 w-full"
              rows="4"
            />
          </label>
        </div>

        <template #actions="{ close }">
          <DiButton variant="ghost" @click="close">
            {{ $t('common.actions.close') }}
          </DiButton>
          <DiButton @click="close">
            {{ $t('features.advancedUi.modals.varying.send') }}
          </DiButton>
        </template>
      </DiModal>
    </PreviewCodeCard>
  </div>
</template>
