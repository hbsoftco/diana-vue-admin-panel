<script setup lang="ts">
import type { Ref } from 'vue'

import { nextTick, ref } from 'vue'

import type { AlertVariant } from '@/shared/types/models'

import DiButton from '@/shared/ui/base/DiButton.vue'
import DiToast from '@/shared/ui/base/DiToast.vue'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

const basicVisible = ref(false)
const variantVisible = ref(false)
const persistentVisible = ref(false)
const actionVisible = ref(false)
const placementVisible = ref(false)
const selectedVariant = ref<AlertVariant>('info')

type ToastKey = 'basic' | 'variant' | 'persistent' | 'action' | 'placement'

const toastVisibility = {
  basic: basicVisible,
  variant: variantVisible,
  persistent: persistentVisible,
  action: actionVisible,
  placement: placementVisible,
} satisfies Record<ToastKey, Ref<boolean>>

const basicToast = `<DiButton @click="visible = true">Show toast</DiButton>

<DiToast
  v-model="visible"
  :message="$t('features.ui-elements.toast.messages.saved')"
  :duration="4000"
  closable
  :close-label="$t('features.ui-elements.toast.close')"
/>`

const variantToasts = `<DiToast
  v-model="visible"
  :variant="variant"
  :message="$t('features.ui-elements.toast.messages.variant')"
  :duration="4000"
  soft
  closable
  :close-label="$t('features.ui-elements.toast.close')"
/>`

const persistentToast = `<DiToast
  v-model="visible"
  variant="warning"
  :title="$t('features.ui-elements.toast.messages.attention')"
  :message="$t('features.ui-elements.toast.messages.persistent')"
  closable
  :close-label="$t('features.ui-elements.toast.close')"
/>`

const toastWithAction = `<DiToast
  v-model="visible"
  variant="success"
  :message="$t('features.ui-elements.toast.messages.action')"
  :duration="6000"
  closable
  :close-label="$t('features.ui-elements.toast.close')"
>
  <template #actions="{ close }">
    <DiButton size="sm" variant="ghost" @click="close">
      {{ $t('features.ui-elements.toast.undo') }}
    </DiButton>
  </template>
</DiToast>`

const positionedToast = `<DiToast
  v-model="visible"
  horizontal="start"
  vertical="top"
  variant="info"
  :message="$t('features.ui-elements.toast.messages.position')"
  :duration="4000"
  closable
  :close-label="$t('features.ui-elements.toast.close')"
/>`

async function showToast(toast: ToastKey) {
  const visibility = toastVisibility[toast]
  visibility.value = false
  await nextTick()
  visibility.value = true
}

async function showVariant(variant: AlertVariant) {
  selectedVariant.value = variant
  await showToast('variant')
}
</script>

<template>
  <div class="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
    <PreviewCodeCard
      :title="$t('features.ui-elements.toast.basic')"
      :code="basicToast"
      language="html"
    >
      <DiButton variant="primary" @click="showToast('basic')">
        {{ $t('features.ui-elements.toast.show') }}
      </DiButton>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.ui-elements.toast.variants')"
      :code="variantToasts"
      language="html"
    >
      <div class="flex flex-wrap gap-2">
        <DiButton size="sm" variant="info" @click="showVariant('info')">
          {{ $t('variants.info') }}
        </DiButton>
        <DiButton size="sm" variant="success" @click="showVariant('success')">
          {{ $t('variants.success') }}
        </DiButton>
        <DiButton size="sm" variant="warning" @click="showVariant('warning')">
          {{ $t('variants.warning') }}
        </DiButton>
        <DiButton size="sm" variant="error" @click="showVariant('error')">
          {{ $t('variants.error') }}
        </DiButton>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.ui-elements.toast.persistent')"
      :code="persistentToast"
      language="html"
    >
      <DiButton variant="warning" outline @click="showToast('persistent')">
        {{ $t('features.ui-elements.toast.showPersistent') }}
      </DiButton>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.ui-elements.toast.actions')"
      :code="toastWithAction"
      language="html"
    >
      <DiButton variant="success" @click="showToast('action')">
        {{ $t('features.ui-elements.toast.showAction') }}
      </DiButton>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.ui-elements.toast.placement')"
      :code="positionedToast"
      language="html"
    >
      <DiButton variant="info" soft @click="showToast('placement')">
        {{ $t('features.ui-elements.toast.showPositioned') }}
      </DiButton>
    </PreviewCodeCard>
  </div>

  <DiToast
    v-model="basicVisible"
    :message="$t('features.ui-elements.toast.messages.saved')"
    :duration="4000"
    closable
    :close-label="$t('features.ui-elements.toast.close')"
  />

  <DiToast
    v-model="variantVisible"
    :variant="selectedVariant"
    :message="$t('features.ui-elements.toast.messages.variant')"
    :duration="4000"
    soft
    closable
    :close-label="$t('features.ui-elements.toast.close')"
  />

  <DiToast
    v-model="persistentVisible"
    variant="warning"
    :title="$t('features.ui-elements.toast.messages.attention')"
    :message="$t('features.ui-elements.toast.messages.persistent')"
    closable
    :close-label="$t('features.ui-elements.toast.close')"
  />

  <DiToast
    v-model="actionVisible"
    variant="success"
    :message="$t('features.ui-elements.toast.messages.action')"
    :duration="6000"
    closable
    :close-label="$t('features.ui-elements.toast.close')"
  >
    <template #actions="{ close }">
      <DiButton size="sm" variant="ghost" @click="close">
        {{ $t('features.ui-elements.toast.undo') }}
      </DiButton>
    </template>
  </DiToast>

  <DiToast
    v-model="placementVisible"
    horizontal="start"
    vertical="top"
    variant="info"
    :message="$t('features.ui-elements.toast.messages.position')"
    :duration="4000"
    closable
    :close-label="$t('features.ui-elements.toast.close')"
  />
</template>
