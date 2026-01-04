<script setup lang="ts">
import { ref } from 'vue'

import DiButton from '@/shared/ui/base/DiButton.vue'
import DiModal from '@/shared/ui/base/DiModal.vue'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

const modalBasic = ref(false)
const modalTop = ref(false)
const modalBottom = ref(false)
const modalStart = ref(false)
const modalEnd = ref(false)
const modalSm = ref(false)
const modalLg = ref(false)
const modalXl = ref(false)
const modalFull = ref(false)
const modalResponsive = ref(false)
const modalNoCloseBackdrop = ref(false)
const modalNoEsc = ref(false)
const modalNoCloseButton = ref(false)
const modalBlurXs = ref(false)
const modalBlurSm = ref(false)
const modalBlurMd = ref(false)
const modalNoTransition = ref(false)
const modalBordered = ref(false)
const modalConfirmation = ref(false)

// Code snippets for PreviewCodeCard
const basicCode = `<DiModal v-model="modalBasic">
  <p class="text-center py-12 text-lg">{{ $t('features.ui-elements.modal.basic.description') }}</p>
</DiModal>

<DiButton @click="modalBasic = true">{{ $t('features.ui-elements.modal.actions.open') }}</DiButton>`

const positionCode = `<DiModal v-model="modalTop" position="top">
  <p class="text-center py-12">{{ $t('features.ui-elements.modal.position.topDesc') }}</p>
</DiModal>

<DiModal v-model="modalBottom" position="bottom">
  <p class="text-center py-12">{{ $t('features.ui-elements.modal.position.bottomDesc') }}</p>
</DiModal>`

const sizeCode = `<DiModal v-model="modalSm" size="sm">
  <p class="text-center py-8">{{ $t('features.ui-elements.modal.size.sm') }}</p>
</DiModal>

<DiModal v-model="modalLg" size="lg">
  <p class="text-center py-12">{{ $t('features.ui-elements.modal.size.lg') }}</p>
</DiModal>

<DiModal v-model="modalXl" size="xl">
  <p class="text-center py-16">{{ $t('features.ui-elements.modal.size.xl') }}</p>
</DiModal>

<DiModal v-model="modalFull" size="full">
  <p class="text-center py-32 text-2xl">{{ $t('features.ui-elements.modal.size.fullDesc') }}</p>
</DiModal>`

const responsiveCode = `<DiModal v-model="modalResponsive" size="xl" responsive>
  <p class="text-center py-16 text-lg">Responsive behavior on mobile</p>
</DiModal>`

const closeBehaviorCode = `<DiModal v-model="modalNoCloseBackdrop" :close-on-backdrop="false">
  <p class="py-8 text-center">{{ $t('features.ui-elements.modal.behavior.noBackdropDesc') }}</p>
</DiModal>

<DiModal v-model="modalNoEsc" :close-on-esc="false">
  <p class="py-8 text-center">{{ $t('features.ui-elements.modal.behavior.noEscDesc') }}</p>
</DiModal>

<DiModal v-model="modalNoCloseButton" :show-close-button="false">
  <p class="py-12 text-center text-lg">{{ $t('features.ui-elements.modal.behavior.noCloseButtonDesc') }}</p>
</DiModal>`

const blurCode = `<DiModal v-model="modalBlurXs" backdrop-blur="xs">
  <p class="py-12 text-center">{{ $t('features.ui-elements.modal.blur.xs') }}</p>
</DiModal>

<DiModal v-model="modalBlurSm" backdrop-blur="sm">
  <p class="py-12 text-center">{{ $t('features.ui-elements.modal.blur.sm') }}</p>
</DiModal>

<DiModal v-model="modalBlurMd" backdrop-blur="md">
  <p class="py-12 text-center">{{ $t('features.ui-elements.modal.blur.md') }}</p>
</DiModal>`

const transitionCode = `<DiModal v-model="modalNoTransition" :transition="false">
  <p class="py-12 text-center text-lg">Instant open/close without animation</p>
</DiModal>`

const borderedCode = `<DiModal v-model="modalBordered" bordered>
  <template #header>
    <h3 class="font-bold text-xl">{{ $t('features.ui-elements.modal.basic.header') }}</h3>
  </template>
  <div class="py-6">
    <p>Main modal content goes here. You can place any components.</p>
  </div>
  <template #actions>
    <DiButton variant="ghost">{{ $t('features.ui-elements.modal.actions.cancel') }}</DiButton>
    <DiButton>{{ $t('features.ui-elements.modal.actions.confirm') }}</DiButton>
  </template>
</DiModal>`

const confirmationCode = `<DiModal v-model="modalConfirmation" bordered>
  <template #header>
    <h3 class="font-bold text-xl">{{ $t('features.ui-elements.modal.confirmation.header') }}</h3>
  </template>
  <p class="py-6">{{ $t('features.ui-elements.modal.confirmation.description') }}</p>
  <template #actions>
    <DiButton variant="ghost">{{ $t('features.ui-elements.modal.actions.cancel') }}</DiButton>
    <DiButton variant="error">{{ $t('features.ui-elements.modal.actions.delete') }}</DiButton>
  </template>
</DiModal>`
</script>

<template>
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 items-start">
    <!-- Basic Modal -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.modal.basic.title')"
      accent-color="#8b5cf6"
      :code="basicCode"
      language="html"
    >
      <DiButton @click="modalBasic = true">
        {{ $t('features.ui-elements.modal.actions.open') }}
      </DiButton>

      <DiModal v-model="modalBasic">
        <p class="text-center py-12 text-lg">
          {{ $t('features.ui-elements.modal.basic.description') }}
        </p>
      </DiModal>
    </PreviewCodeCard>

    <!-- Position Variants -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.modal.position.title')"
      accent-color="#8b5cf6"
      :code="positionCode"
      language="html"
    >
      <div class="flex gap-4 flex-wrap">
        <DiButton @click="modalTop = true">
          Top
        </DiButton>
        <DiButton @click="modalBottom = true">
          Bottom
        </DiButton>
        <DiButton @click="modalEnd = true">
          End
        </DiButton>
        <DiButton @click="modalStart = true">
          Start
        </DiButton>
      </div>

      <DiModal v-model="modalTop" position="top">
        <p class="text-center py-12">
          {{ $t('features.ui-elements.modal.position.topDesc') }}
        </p>
      </DiModal>

      <DiModal v-model="modalBottom" position="bottom">
        <p class="text-center py-12">
          {{ $t('features.ui-elements.modal.position.bottomDesc') }}
        </p>
      </DiModal>

      <DiModal v-model="modalEnd" position="end">
        <p class="text-center py-12">
          {{ $t('features.ui-elements.modal.position.bottomDesc') }}
        </p>
      </DiModal>

      <DiModal v-model="modalStart" position="start">
        <p class="text-center py-12">
          {{ $t('features.ui-elements.modal.position.bottomDesc') }}
        </p>
      </DiModal>
    </PreviewCodeCard>

    <!-- Size Variants -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.modal.size.title')"
      accent-color="#8b5cf6"
      :code="sizeCode"
      language="html"
      class="lg:col-span-2"
    >
      <div class="flex gap-4 flex-wrap">
        <DiButton @click="modalSm = true">
          sm
        </DiButton>
        <DiButton @click="modalBasic = true">
          md (default)
        </DiButton>
        <DiButton @click="modalLg = true">
          lg
        </DiButton>
        <DiButton @click="modalXl = true">
          xl
        </DiButton>
        <DiButton @click="modalFull = true">
          {{ $t('features.ui-elements.modal.size.full') }}
        </DiButton>
      </div>

      <DiModal v-model="modalSm" size="sm">
        <p class="text-center py-8">
          {{ $t('features.ui-elements.modal.size.sm') }}
        </p>
      </DiModal>

      <DiModal v-model="modalLg" size="lg">
        <p class="text-center py-12">
          {{ $t('features.ui-elements.modal.size.lg') }}
        </p>
      </DiModal>

      <DiModal v-model="modalXl" size="xl">
        <p class="text-center py-16">
          {{ $t('features.ui-elements.modal.size.xl') }}
        </p>
      </DiModal>

      <DiModal v-model="modalFull" size="full">
        <p class="text-center py-32 text-2xl">
          {{ $t('features.ui-elements.modal.size.fullDesc') }}
        </p>
      </DiModal>
    </PreviewCodeCard>

    <!-- Responsive -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.modal.responsive')"
      accent-color="#8b5cf6"
      :code="responsiveCode"
      language="html"
    >
      <DiButton @click="modalResponsive = true">
        {{ $t('features.ui-elements.modal.actions.open') }}
      </DiButton>

      <DiModal v-model="modalResponsive" size="xl" responsive>
        <p class="text-center py-16 text-lg">
          Responsive behavior on mobile
        </p>
      </DiModal>
    </PreviewCodeCard>

    <!-- Behavior Options -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.modal.behavior.title')"
      accent-color="#8b5cf6"
      :code="closeBehaviorCode"
      language="html"
    >
      <div class="flex gap-4 flex-wrap">
        <DiButton @click="modalNoCloseBackdrop = true">
          {{ $t('features.ui-elements.modal.behavior.noBackdrop') }}
        </DiButton>
        <DiButton @click="modalNoEsc = true">
          {{ $t('features.ui-elements.modal.behavior.noEsc') }}
        </DiButton>
        <DiButton @click="modalNoCloseButton = true">
          {{ $t('features.ui-elements.modal.behavior.noCloseButton') }}
        </DiButton>
      </div>

      <DiModal v-model="modalNoCloseBackdrop" :close-on-backdrop="false">
        <p class="py-8 text-center">
          {{ $t('features.ui-elements.modal.behavior.noBackdropDesc') }}
        </p>
      </DiModal>

      <DiModal v-model="modalNoEsc" :close-on-esc="false">
        <p class="py-8 text-center">
          {{ $t('features.ui-elements.modal.behavior.noEscDesc') }}
        </p>
      </DiModal>

      <DiModal v-model="modalNoCloseButton" :show-close-button="false">
        <p class="py-12 text-center text-lg">
          {{ $t('features.ui-elements.modal.behavior.noCloseButtonDesc') }}
        </p>
      </DiModal>
    </PreviewCodeCard>

    <!-- Backdrop Blur -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.modal.blur.title')"
      accent-color="#8b5cf6"
      :code="blurCode"
      language="html"
    >
      <div class="flex gap-4 flex-wrap">
        <DiButton @click="modalBlurXs = true">
          blur-xs
        </DiButton>
        <DiButton @click="modalBlurSm = true">
          blur-sm
        </DiButton>
        <DiButton @click="modalBlurMd = true">
          blur-md
        </DiButton>
      </div>

      <DiModal v-model="modalBlurXs" backdrop-blur="xs" :transition="false" position="middle">
        <p class="py-12 text-center">
          {{ $t('features.ui-elements.modal.blur.xs') }}
        </p>
      </DiModal>

      <DiModal v-model="modalBlurSm" backdrop-blur="sm" :transition="false">
        <p class="py-12 text-center">
          {{ $t('features.ui-elements.modal.blur.sm') }}
        </p>
      </DiModal>

      <DiModal v-model="modalBlurMd" backdrop-blur="md" :transition="false">
        <p class="py-12 text-center">
          {{ $t('features.ui-elements.modal.blur.md') }}
        </p>
      </DiModal>
    </PreviewCodeCard>

    <!-- No Transition -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.modal.noTransition')"
      accent-color="#8b5cf6"
      :code="transitionCode"
      language="html"
    >
      <DiButton @click="modalNoTransition = true">
        {{ $t('features.ui-elements.modal.actions.open') }}
      </DiButton>

      <DiModal v-model="modalNoTransition" :transition="false">
        <p class="py-12 text-center text-lg">
          Instant open/close without animation
        </p>
      </DiModal>
    </PreviewCodeCard>

    <!-- Bordered with Header & Actions -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.modal.borderedWithSlots')"
      accent-color="#8b5cf6"
      :code="borderedCode"
      language="html"
      class="lg:col-span-2"
    >
      <DiButton @click="modalBordered = true">
        {{ $t('features.ui-elements.modal.actions.open') }}
      </DiButton>

      <DiModal v-model="modalBordered" bordered>
        <template #header>
          <h3 class="font-bold text-xl">
            {{ $t('features.ui-elements.modal.basic.header') }}
          </h3>
        </template>

        <div class="py-6">
          <p>Main modal content goes here. You can place any components.</p>
        </div>

        <template #actions>
          <DiButton variant="ghost">
            {{ $t('features.ui-elements.modal.actions.cancel') }}
          </DiButton>
          <DiButton>{{ $t('features.ui-elements.modal.actions.confirm') }}</DiButton>
        </template>
      </DiModal>
    </PreviewCodeCard>

    <!-- Confirmation Dialog Example -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.modal.confirmation.title')"
      accent-color="#8b5cf6"
      :code="confirmationCode"
      language="html"
      class="lg:col-span-2"
    >
      <DiButton variant="error" @click="modalConfirmation = true">
        {{ $t('features.ui-elements.modal.confirmation.open') }}
      </DiButton>

      <DiModal v-model="modalConfirmation" bordered>
        <template #header>
          <h3 class="font-bold text-xl">
            {{ $t('features.ui-elements.modal.confirmation.header') }}
          </h3>
        </template>

        <p class="py-6">
          {{ $t('features.ui-elements.modal.confirmation.description') }}
        </p>

        <template #actions>
          <DiButton variant="ghost">
            {{ $t('features.ui-elements.modal.actions.cancel') }}
          </DiButton>
          <DiButton variant="error">
            {{ $t('features.ui-elements.modal.actions.delete') }}
          </DiButton>
        </template>
      </DiModal>
    </PreviewCodeCard>

    <button class="btn" onclick="my_modal_1.showModal()">
      open modal
    </button>
    <dialog id="my_modal_1" class="modal modal-top">
      <div class="modal-box">
        <h3 class="text-lg font-bold">
          Hello!
        </h3>
        <p class="py-4">
          Press ESC key or click the button below to close
        </p>
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  </div>

  <button class="btn" onclick="my_modal_3.showModal()">
    open modal
  </button>
  <dialog id="my_modal_3" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <h3 class="text-lg font-bold">
        Hello!
      </h3>
      <p class="py-4">
        Press ESC key or click on ✕ button to close
      </p>
    </div>
  </dialog>
</template>
