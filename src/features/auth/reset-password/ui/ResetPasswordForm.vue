<script setup lang="ts">
import { computed, ref, useId } from 'vue'
import { useI18n } from 'vue-i18n'

import DiAlert from '@/shared/ui/base/DiAlert.vue'
import DiButton from '@/shared/ui/base/DiButton.vue'
import { DiInput } from '@/shared/ui/base/input'

export type ResetPasswordPayload = {
  email: string
}

const emit = defineEmits<{
  submit: [payload: ResetPasswordPayload]
}>()

const { t } = useI18n()

const EMAIL_PATTERN = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/

const uid = useId()
const headingId = `${uid}-heading`

const email = ref('')
const submitting = ref(false)
const submitted = ref(false)
const succeeded = ref(false)

const emailErrorKey = computed(() => {
  const value = email.value.trim()
  if (!value)
    return 'features.auth.resetPassword.errors.emailRequired'
  if (!EMAIL_PATTERN.test(value))
    return 'features.auth.resetPassword.errors.emailInvalid'
  return ''
})

const emailError = computed(() =>
  submitted.value && emailErrorKey.value ? t(emailErrorKey.value) : '',
)

async function onSubmit() {
  submitted.value = true

  if (emailErrorKey.value || submitting.value)
    return

  submitting.value = true

  const payload: ResetPasswordPayload = {
    email: email.value.trim(),
  }

  // UI-only build: fake the network round-trip and report the collected values.
  await new Promise(resolve => setTimeout(resolve, 1200))

  // eslint-disable-next-line no-console
  console.log('[ResetPassword] submit', payload)
  emit('submit', payload)

  submitting.value = false
  succeeded.value = true
}
</script>

<template>
  <div class="w-full">
    <header class="mb-6">
      <h1 :id="headingId" class="text-2xl font-bold text-base-content sm:text-3xl">
        {{ t('features.auth.resetPassword.title') }}
      </h1>
      <p class="mt-2 text-sm text-base-content/65">
        {{ t('features.auth.resetPassword.subtitle') }}
      </p>
    </header>

    <DiAlert
      v-if="succeeded"
      variant="success"
      soft
      show-icon
      role="status"
      :title="t('features.auth.resetPassword.successTitle')"
      :description="t('features.auth.resetPassword.successMessage')"
    />

    <form
      v-else
      class="space-y-5"
      novalidate
      :aria-labelledby="headingId"
      @submit.prevent="onSubmit"
    >
      <DiInput
        v-model="email"
        type="email"
        name="email"
        autocomplete="email"
        inputmode="email"
        prefix-icon="mail"
        :label="t('features.auth.resetPassword.emailLabel')"
        :placeholder="t('features.auth.resetPassword.emailPlaceholder')"
        :error="emailError"
        required
      />

      <DiButton
        variant="primary"
        native-type="submit"
        block
        :loading="submitting"
        custom-class="mt-1"
      >
        {{
          submitting
            ? t('features.auth.resetPassword.submitting')
            : t('features.auth.resetPassword.submit')
        }}
      </DiButton>
    </form>

    <p class="mt-6 text-center text-sm text-base-content/65">
      {{ t('features.auth.resetPassword.rememberPassword') }}
      <RouterLink
        to="/auth/sign-in"
        class="font-medium text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {{ t('features.auth.resetPassword.signIn') }}
      </RouterLink>
    </p>
  </div>
</template>
