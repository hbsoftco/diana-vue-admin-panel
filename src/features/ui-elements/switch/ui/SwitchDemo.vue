<script setup lang="ts">
import { ref } from 'vue'

import DiSwitch from '@/shared/ui/base/DiSwitch.vue'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

const notificationsEnabled = ref(true)

const defaultSwitch = `<script setup lang="ts">
import { ref } from 'vue'

const notificationsEnabled = ref(true)
<\/script>

<template>
  <DiSwitch
    v-model="notificationsEnabled"
    :label="$t('features.ui-elements.switch.notifications')"
  />
</template>`

const variantSwitches = `<div class="flex flex-wrap items-center gap-4">
  <DiSwitch :model-value="true" variant="neutral" :aria-label="$t('features.ui-elements.switch.example')" />
  <DiSwitch :model-value="true" variant="primary" :aria-label="$t('features.ui-elements.switch.example')" />
  <DiSwitch :model-value="true" variant="secondary" :aria-label="$t('features.ui-elements.switch.example')" />
  <DiSwitch :model-value="true" variant="accent" :aria-label="$t('features.ui-elements.switch.example')" />
  <DiSwitch :model-value="true" variant="info" :aria-label="$t('features.ui-elements.switch.example')" />
  <DiSwitch :model-value="true" variant="success" :aria-label="$t('features.ui-elements.switch.example')" />
  <DiSwitch :model-value="true" variant="warning" :aria-label="$t('features.ui-elements.switch.example')" />
  <DiSwitch :model-value="true" variant="error" :aria-label="$t('features.ui-elements.switch.example')" />
</div>`

const sizeSwitches = `<div class="flex flex-wrap items-center gap-4">
  <DiSwitch :model-value="true" size="xs" :aria-label="$t('features.ui-elements.switch.example')" />
  <DiSwitch :model-value="true" size="sm" :aria-label="$t('features.ui-elements.switch.example')" />
  <DiSwitch :model-value="true" size="md" :aria-label="$t('features.ui-elements.switch.example')" />
  <DiSwitch :model-value="true" size="lg" :aria-label="$t('features.ui-elements.switch.example')" />
  <DiSwitch :model-value="true" size="xl" :aria-label="$t('features.ui-elements.switch.example')" />
</div>`

const stateSwitches = `<div class="flex flex-col items-start gap-4">
  <DiSwitch :label="$t('features.ui-elements.switch.disabledOff')" disabled />
  <DiSwitch
    :model-value="true"
    :label="$t('features.ui-elements.switch.disabledOn')"
    disabled
  />
  <DiSwitch
    :model-value="true"
    :label="$t('features.ui-elements.switch.readOnly')"
    read-only
  />
  <DiSwitch :label="$t('features.ui-elements.switch.invalid')" invalid />
  <DiSwitch :label="$t('features.ui-elements.switch.indeterminate')" indeterminate />
</div>`

const iconSwitch = `<DiSwitch :label="$t('features.ui-elements.switch.iconToggle')">
  <template #unchecked-icon>
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M18 6 6 18M6 6l12 12" stroke-linecap="round" stroke-width="3" />
    </svg>
  </template>
  <template #checked-icon>
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path
        d="m5 12 4 4L19 6"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="3"
      />
    </svg>
  </template>
</DiSwitch>`
</script>

<template>
  <div class="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
    <PreviewCodeCard
      :title="$t('features.ui-elements.switch.default')"
      :code="defaultSwitch"
      language="vue"
    >
      <DiSwitch
        v-model="notificationsEnabled"
        :label="$t('features.ui-elements.switch.notifications')"
      />
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.ui-elements.switch.variants')"
      :code="variantSwitches"
      language="html"
    >
      <div class="flex flex-wrap items-center gap-4">
        <DiSwitch
          :model-value="true"
          variant="neutral"
          :aria-label="$t('features.ui-elements.switch.example')"
        />
        <DiSwitch
          :model-value="true"
          variant="primary"
          :aria-label="$t('features.ui-elements.switch.example')"
        />
        <DiSwitch
          :model-value="true"
          variant="secondary"
          :aria-label="$t('features.ui-elements.switch.example')"
        />
        <DiSwitch
          :model-value="true"
          variant="accent"
          :aria-label="$t('features.ui-elements.switch.example')"
        />
        <DiSwitch
          :model-value="true"
          variant="info"
          :aria-label="$t('features.ui-elements.switch.example')"
        />
        <DiSwitch
          :model-value="true"
          variant="success"
          :aria-label="$t('features.ui-elements.switch.example')"
        />
        <DiSwitch
          :model-value="true"
          variant="warning"
          :aria-label="$t('features.ui-elements.switch.example')"
        />
        <DiSwitch
          :model-value="true"
          variant="error"
          :aria-label="$t('features.ui-elements.switch.example')"
        />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.ui-elements.switch.sizes')"
      :code="sizeSwitches"
      language="html"
    >
      <div class="flex flex-wrap items-center gap-4">
        <DiSwitch
          :model-value="true"
          size="xs"
          :aria-label="$t('features.ui-elements.switch.example')"
        />
        <DiSwitch
          :model-value="true"
          size="sm"
          :aria-label="$t('features.ui-elements.switch.example')"
        />
        <DiSwitch
          :model-value="true"
          size="md"
          :aria-label="$t('features.ui-elements.switch.example')"
        />
        <DiSwitch
          :model-value="true"
          size="lg"
          :aria-label="$t('features.ui-elements.switch.example')"
        />
        <DiSwitch
          :model-value="true"
          size="xl"
          :aria-label="$t('features.ui-elements.switch.example')"
        />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.ui-elements.switch.states')"
      :code="stateSwitches"
      language="html"
    >
      <div class="flex flex-col items-start gap-4">
        <DiSwitch :label="$t('features.ui-elements.switch.disabledOff')" disabled />
        <DiSwitch
          :model-value="true"
          :label="$t('features.ui-elements.switch.disabledOn')"
          disabled
        />
        <DiSwitch
          :model-value="true"
          :label="$t('features.ui-elements.switch.readOnly')"
          read-only
        />
        <DiSwitch :label="$t('features.ui-elements.switch.invalid')" invalid />
        <DiSwitch :label="$t('features.ui-elements.switch.indeterminate')" indeterminate />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.ui-elements.switch.icons')"
      :code="iconSwitch"
      language="html"
      class="lg:col-span-2"
    >
      <DiSwitch :label="$t('features.ui-elements.switch.iconToggle')">
        <template #unchecked-icon>
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M18 6 6 18M6 6l12 12" stroke-linecap="round" stroke-width="3" />
          </svg>
        </template>
        <template #checked-icon>
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
              d="m5 12 4 4L19 6"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
            />
          </svg>
        </template>
      </DiSwitch>
    </PreviewCodeCard>
  </div>
</template>
