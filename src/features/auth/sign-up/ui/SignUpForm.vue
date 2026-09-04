<script setup lang="ts">
import { computed, ref, useId } from 'vue'
import { useI18n } from 'vue-i18n'

import DiCheckbox from '@/shared/ui/base/checkbox/DiCheckbox.vue'
import DiButton from '@/shared/ui/base/DiButton.vue'
import { DiInput } from '@/shared/ui/base/input'

export type SignUpPayload = {
  fullName: string
  email: string
  password: string
  agreeToTerms: boolean
}

const emit = defineEmits<{
  submit: [payload: SignUpPayload]
}>()

const { t } = useI18n()

const EMAIL_PATTERN = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/
const MIN_PASSWORD_LENGTH = 8

const uid = useId()
const headingId = `${uid}-heading`

const fullName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreeToTerms = ref(false)
const submitting = ref(false)
const submitted = ref(false)

const passwordToggleLabels = computed(() => ({
  show: t('features.auth.signUp.showPassword'),
  hide: t('features.auth.signUp.hidePassword'),
}))

const fullNameErrorKey = computed(() =>
  fullName.value.trim() ? '' : 'features.auth.signUp.errors.fullNameRequired',
)

const emailErrorKey = computed(() => {
  const value = email.value.trim()
  if (!value)
    return 'features.auth.signUp.errors.emailRequired'
  if (!EMAIL_PATTERN.test(value))
    return 'features.auth.signUp.errors.emailInvalid'
  return ''
})

const passwordErrorKey = computed(() => {
  if (!password.value)
    return 'features.auth.signUp.errors.passwordRequired'
  if (password.value.length < MIN_PASSWORD_LENGTH)
    return 'features.auth.signUp.errors.passwordTooShort'
  return ''
})

const confirmPasswordErrorKey = computed(() => {
  if (!confirmPassword.value)
    return 'features.auth.signUp.errors.confirmPasswordRequired'
  if (confirmPassword.value !== password.value)
    return 'features.auth.signUp.errors.passwordMismatch'
  return ''
})

const agreeToTermsErrorKey = computed(() =>
  agreeToTerms.value ? '' : 'features.auth.signUp.errors.termsRequired',
)

const fullNameError = computed(() =>
  submitted.value && fullNameErrorKey.value ? t(fullNameErrorKey.value) : '',
)
const emailError = computed(() =>
  submitted.value && emailErrorKey.value ? t(emailErrorKey.value) : '',
)
const passwordError = computed(() =>
  submitted.value && passwordErrorKey.value ? t(passwordErrorKey.value) : '',
)
const confirmPasswordError = computed(() =>
  submitted.value && confirmPasswordErrorKey.value ? t(confirmPasswordErrorKey.value) : '',
)
const agreeToTermsError = computed(() =>
  submitted.value && agreeToTermsErrorKey.value ? t(agreeToTermsErrorKey.value) : '',
)

const canSubmit = computed(() => agreeToTerms.value && !submitting.value)

async function onSubmit() {
  submitted.value = true

  if (
    fullNameErrorKey.value
    || emailErrorKey.value
    || passwordErrorKey.value
    || confirmPasswordErrorKey.value
    || agreeToTermsErrorKey.value
    || submitting.value
  ) {
    return
  }

  submitting.value = true

  const payload: SignUpPayload = {
    fullName: fullName.value.trim(),
    email: email.value.trim(),
    password: password.value,
    agreeToTerms: agreeToTerms.value,
  }

  // UI-only build: fake the network round-trip and report the collected values.
  await new Promise(resolve => setTimeout(resolve, 1200))

  // eslint-disable-next-line no-console
  console.log('[SignUp] submit', payload)
  emit('submit', payload)

  submitting.value = false
}
</script>

<template>
  <div class="w-full">
    <header class="mb-6">
      <h1 :id="headingId" class="text-2xl font-bold text-base-content sm:text-3xl">
        {{ t('features.auth.signUp.title') }}
      </h1>
      <p class="mt-2 text-sm text-base-content/65">
        {{ t('features.auth.signUp.subtitle') }}
      </p>
    </header>

    <form class="space-y-5" novalidate :aria-labelledby="headingId" @submit.prevent="onSubmit">
      <DiInput
        v-model="fullName"
        type="text"
        name="fullName"
        autocomplete="name"
        prefix-icon="user"
        :label="t('features.auth.signUp.fullNameLabel')"
        :placeholder="t('features.auth.signUp.fullNamePlaceholder')"
        :error="fullNameError"
        required
      />

      <DiInput
        v-model="email"
        type="email"
        name="email"
        autocomplete="email"
        inputmode="email"
        prefix-icon="mail"
        :label="t('features.auth.signUp.emailLabel')"
        :placeholder="t('features.auth.signUp.emailPlaceholder')"
        :error="emailError"
        required
      />

      <DiInput
        v-model="password"
        type="password"
        name="password"
        autocomplete="new-password"
        prefix-icon="lock"
        show-password-toggle
        :password-toggle-labels="passwordToggleLabels"
        :label="t('features.auth.signUp.passwordLabel')"
        :placeholder="t('features.auth.signUp.passwordPlaceholder')"
        :error="passwordError"
        required
      />

      <DiInput
        v-model="confirmPassword"
        type="password"
        name="confirmPassword"
        autocomplete="new-password"
        prefix-icon="lock"
        show-password-toggle
        :password-toggle-labels="passwordToggleLabels"
        :label="t('features.auth.signUp.confirmPasswordLabel')"
        :placeholder="t('features.auth.signUp.confirmPasswordPlaceholder')"
        :error="confirmPasswordError"
        required
      />

      <DiCheckbox v-model="agreeToTerms" size="xs" :error="agreeToTermsError" required>
        <template #label>
          <span class="text-xs font-medium text-base-content">
            {{ t('features.auth.signUp.agreeToTerms') }}
          </span>
        </template>
      </DiCheckbox>

      <DiButton
        variant="primary"
        native-type="submit"
        block
        :loading="submitting"
        :disabled="!canSubmit"
        custom-class="mt-1"
      >
        {{ submitting ? t('features.auth.signUp.submitting') : t('features.auth.signUp.submit') }}
      </DiButton>

      <p class="text-center text-sm text-base-content/65">
        {{ t('features.auth.signUp.haveAccount') }}
        <RouterLink
          to="/auth/sign-in"
          class="font-medium text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {{ t('features.auth.signUp.signIn') }}
        </RouterLink>
      </p>
    </form>
  </div>
</template>
