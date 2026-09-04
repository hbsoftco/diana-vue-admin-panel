<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useId } from 'vue'
import { useI18n } from 'vue-i18n'

import DiAlert from '@/shared/ui/base/DiAlert.vue'
import DiButton from '@/shared/ui/base/DiButton.vue'
import { DiOtpInput } from '@/shared/ui/base/otp-input'

import { minLenKey, useAuthForm } from '../../composables/use-auth-form'

export type TwoStepVerificationPayload = {
  code: string
}

const emit = defineEmits<{
  submit: [payload: TwoStepVerificationPayload]
}>()

const CODE_LENGTH = 6
const RESEND_COOLDOWN_SECONDS = 30

const { t } = useI18n()

const headingId = `${useId()}-heading`

const { fields, errors, submitting, succeeded, isValid, handleSubmit } = useAuthForm({
  tag: 'TwoStepVerification',
  fields: { code: '' },
  validators: {
    code: minLenKey(
      CODE_LENGTH,
      'features.auth.twoStep.errors.codeRequired',
      'features.auth.twoStep.errors.codeIncomplete',
    ),
  },
  onSubmit: payload => emit('submit', payload),
})

const boxAriaLabels = computed(() =>
  Array.from({ length: CODE_LENGTH }, (_, index) =>
    t('features.auth.twoStep.digitAriaLabel', { index: index + 1, length: CODE_LENGTH })),
)

// Mock-only resend cooldown: no request is made, this just simulates the
// standard "wait before resending" OTP UX with a local countdown.
const resendSecondsLeft = ref(0)
let cooldownTimer: ReturnType<typeof setInterval> | undefined

const resendDisabled = computed(() => resendSecondsLeft.value > 0)
const resendLabel = computed(() =>
  resendDisabled.value
    ? t('features.auth.twoStep.resendCooldown', { seconds: resendSecondsLeft.value })
    : t('features.auth.twoStep.resend'),
)

function stopCooldown() {
  if (cooldownTimer !== undefined) {
    clearInterval(cooldownTimer)
    cooldownTimer = undefined
  }
}

function handleResend() {
  if (resendDisabled.value)
    return

  resendSecondsLeft.value = RESEND_COOLDOWN_SECONDS
  cooldownTimer = setInterval(() => {
    resendSecondsLeft.value -= 1
    if (resendSecondsLeft.value <= 0)
      stopCooldown()
  }, 1000)
}

onBeforeUnmount(stopCooldown)
</script>

<template>
  <div class="w-full">
    <header class="mb-6">
      <h1 :id="headingId" class="text-2xl font-bold text-base-content sm:text-3xl">
        {{ t('features.auth.twoStep.title') }}
      </h1>
      <p class="mt-2 text-sm text-base-content/65">
        {{ t('features.auth.twoStep.subtitle') }}
      </p>
    </header>

    <DiAlert
      v-if="succeeded"
      variant="success"
      soft
      show-icon
      role="status"
      :title="t('features.auth.twoStep.successTitle')"
      :description="t('features.auth.twoStep.successMessage')"
    />

    <form
      v-else
      class="space-y-5"
      novalidate
      :aria-labelledby="headingId"
      @submit.prevent="handleSubmit"
    >
      <DiOtpInput
        v-model="fields.code"
        :length="CODE_LENGTH"
        input-type="numeric"
        auto-focus
        :error="errors.code"
        :aria-label="t('features.auth.twoStep.codeAriaLabel')"
        :box-aria-labels="boxAriaLabels"
      />

      <DiButton
        variant="primary"
        native-type="submit"
        block
        :loading="submitting"
        :disabled="!isValid"
        custom-class="mt-1"
      >
        {{ submitting ? t('features.auth.twoStep.submitting') : t('features.auth.twoStep.submit') }}
      </DiButton>

      <p class="text-center text-sm text-base-content/65">
        {{ t('features.auth.twoStep.didNotGetCode') }}
        <button
          type="button"
          class="font-medium text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:text-base-content/40 disabled:no-underline"
          :disabled="resendDisabled"
          @click="handleResend"
        >
          {{ resendLabel }}
        </button>
      </p>

      <p class="text-center text-sm text-base-content/65">
        <RouterLink
          to="/auth/sign-in"
          class="font-medium text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {{ t('features.auth.twoStep.backToSignIn') }}
        </RouterLink>
      </p>
    </form>
  </div>
</template>
