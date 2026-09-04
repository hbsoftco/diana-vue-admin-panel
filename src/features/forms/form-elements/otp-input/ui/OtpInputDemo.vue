<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { DiOtpInput } from '@/shared/ui/base/otp-input'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

const { t } = useI18n()

const basicValue = ref('')

const smallSizeValue = ref('123')
const mediumSizeValue = ref('1234')
const largeSizeValue = ref('12')

const shortLengthValue = ref('12')
const longLengthValue = ref('1234')

const disabledValue = ref('123456')
const errorValue = ref('12')

const liveValue = ref('')
const liveResult = computed(() =>
  liveValue.value
    ? t('features.forms.otpInput.live.result', { code: liveValue.value })
    : t('features.forms.otpInput.live.empty'),
)

const basicCode = `<script setup lang="ts">
import { ref } from 'vue'

import { DiOtpInput } from '@/shared/ui/base/otp-input'

const code = ref('')
<\/script>

<template>
  <DiOtpInput v-model="code" aria-label="Verification code" />
</template>`

const sizesCode = `<div class="flex flex-wrap items-end gap-6">
  <DiOtpInput v-model="smallCode" size="sm" aria-label="Verification code" />
  <DiOtpInput v-model="mediumCode" size="md" aria-label="Verification code" />
  <DiOtpInput v-model="largeCode" size="lg" aria-label="Verification code" />
</div>`

const lengthsCode = `<div class="flex flex-wrap items-end gap-6">
  <DiOtpInput v-model="pinCode" :length="4" aria-label="4-digit code" />
  <DiOtpInput v-model="smsCode" :length="6" aria-label="Verification code" />
</div>`

const statesCode = `<div class="flex flex-wrap items-end gap-6">
  <DiOtpInput v-model="disabledCode" disabled aria-label="Verification code" />
  <DiOtpInput
    v-model="errorCode"
    error="That code didn't match. Please try again."
    aria-label="Verification code"
  />
</div>`

const liveCode = `<script setup lang="ts">
import { computed, ref } from 'vue'

import { DiOtpInput } from '@/shared/ui/base/otp-input'

const code = ref('')
const result = computed(() => (code.value ? \`You entered: \${code.value}\` : 'Waiting for input…'))
<\/script>

<template>
  <DiOtpInput v-model="code" aria-label="Verification code" />
  <p>{{ result }}</p>
</template>`
</script>

<template>
  <div class="grid gap-6 xl:grid-cols-2">
    <PreviewCodeCard
      :title="$t('features.forms.otpInput.sections.basic')"
      accent-color="#8b5cf6"
      :code="basicCode"
      language="vue"
      class="xl:col-span-2"
    >
      <DiOtpInput v-model="basicValue" :aria-label="$t('features.forms.otpInput.aria.code')" />
      <p class="mt-4 text-xs text-base-content/60">
        {{ $t('features.forms.otpInput.messages.autoFocusNote') }}
      </p>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.forms.otpInput.sections.sizes')"
      accent-color="#14b8a6"
      :code="sizesCode"
      language="html"
    >
      <div class="flex flex-wrap items-end gap-6">
        <DiOtpInput
          v-model="smallSizeValue"
          size="sm"
          :aria-label="$t('features.forms.otpInput.aria.code')"
        />
        <DiOtpInput
          v-model="mediumSizeValue"
          size="md"
          :aria-label="$t('features.forms.otpInput.aria.code')"
        />
        <DiOtpInput
          v-model="largeSizeValue"
          size="lg"
          :aria-label="$t('features.forms.otpInput.aria.code')"
        />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.forms.otpInput.sections.lengths')"
      accent-color="#06b6d4"
      :code="lengthsCode"
      language="html"
    >
      <div class="flex flex-wrap items-end gap-6">
        <DiOtpInput
          v-model="shortLengthValue"
          :length="4"
          :aria-label="$t('features.forms.otpInput.aria.shortCode')"
        />
        <DiOtpInput
          v-model="longLengthValue"
          :length="6"
          :aria-label="$t('features.forms.otpInput.aria.code')"
        />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.forms.otpInput.sections.states')"
      accent-color="#ef4444"
      :code="statesCode"
      language="html"
    >
      <div class="flex flex-wrap items-end gap-6">
        <DiOtpInput
          v-model="disabledValue"
          disabled
          :aria-label="$t('features.forms.otpInput.aria.code')"
        />
        <DiOtpInput
          v-model="errorValue"
          :error="$t('features.forms.otpInput.messages.error')"
          :aria-label="$t('features.forms.otpInput.aria.code')"
        />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.forms.otpInput.sections.live')"
      accent-color="#22c55e"
      :code="liveCode"
      language="vue"
      class="xl:col-span-2"
    >
      <DiOtpInput v-model="liveValue" :aria-label="$t('features.forms.otpInput.aria.code')" />
      <p class="mt-4 text-sm font-medium text-base-content">
        {{ liveResult }}
      </p>
    </PreviewCodeCard>
  </div>
</template>
