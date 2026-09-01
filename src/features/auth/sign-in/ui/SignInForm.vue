<script setup lang="ts">
import { computed, ref, useId } from 'vue'
import { useI18n } from 'vue-i18n'

import DiCheckbox from '@/shared/ui/base/checkbox/DiCheckbox.vue'
import DiButton from '@/shared/ui/base/DiButton.vue'
import DiIcon from '@/shared/ui/base/DiIcon.vue'
import { DiInput } from '@/shared/ui/base/input'

export type SignInPayload = {
  email: string
  password: string
  rememberMe: boolean
}

const emit = defineEmits<{
  submit: [payload: SignInPayload]
}>()

const { t } = useI18n()

const EMAIL_PATTERN = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/

const uid = useId()
const passwordId = `${uid}-password`
const headingId = `${uid}-heading`

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const submitting = ref(false)
const submitted = ref(false)

const emailErrorKey = computed(() => {
  const value = email.value.trim()
  if (!value)
    return 'features.auth.signIn.errors.emailRequired'
  if (!EMAIL_PATTERN.test(value))
    return 'features.auth.signIn.errors.emailInvalid'
  return ''
})

const passwordErrorKey = computed(() =>
  password.value ? '' : 'features.auth.signIn.errors.passwordRequired',
)

const emailError = computed(() =>
  submitted.value && emailErrorKey.value ? t(emailErrorKey.value) : '',
)
const passwordError = computed(() =>
  submitted.value && passwordErrorKey.value ? t(passwordErrorKey.value) : '',
)

const passwordToggleLabel = computed(() =>
  showPassword.value
    ? t('features.auth.signIn.hidePassword')
    : t('features.auth.signIn.showPassword'),
)

function togglePassword() {
  showPassword.value = !showPassword.value
}

async function onSubmit() {
  submitted.value = true

  if (emailErrorKey.value || passwordErrorKey.value || submitting.value)
    return

  submitting.value = true

  const payload: SignInPayload = {
    email: email.value.trim(),
    password: password.value,
    rememberMe: rememberMe.value,
  }

  // UI-only build: fake the network round-trip and report the collected values.
  await new Promise(resolve => setTimeout(resolve, 1200))

  // eslint-disable-next-line no-console
  console.log('[SignIn] submit', payload)
  emit('submit', payload)

  submitting.value = false
}
</script>

<template>
  <div class="w-full">
    <header class="mb-6">
      <h1 :id="headingId" class="text-2xl font-bold text-base-content sm:text-3xl">
        {{ t('features.auth.signIn.title') }}
      </h1>
      <p class="mt-2 text-sm text-base-content/65">
        {{ t('features.auth.signIn.subtitle') }}
      </p>
    </header>

    <form class="space-y-5" novalidate :aria-labelledby="headingId" @submit.prevent="onSubmit">
      <DiInput
        v-model="email"
        type="email"
        name="email"
        autocomplete="email"
        inputmode="email"
        :label="t('features.auth.signIn.emailLabel')"
        :placeholder="t('features.auth.signIn.emailPlaceholder')"
        :error="emailError"
        required
      >
        <template #prefix>
          <DiIcon name="emailOutline" />
        </template>
      </DiInput>

      <DiInput
        :id="passwordId"
        v-model="password"
        :type="showPassword ? 'text' : 'password'"
        name="password"
        autocomplete="current-password"
        :label="t('features.auth.signIn.passwordLabel')"
        :placeholder="t('features.auth.signIn.passwordPlaceholder')"
        :error="passwordError"
        required
      >
        <template #prefix>
          <DiIcon name="lockOutline" />
        </template>
        <template #suffix>
          <button
            type="button"
            class="inline-flex items-center rounded-sm p-0.5 text-base-content/55 transition-colors hover:text-base-content focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            :aria-label="passwordToggleLabel"
            :aria-pressed="showPassword"
            :aria-controls="passwordId"
            @click="togglePassword"
          >
            <DiIcon :name="showPassword ? 'eyeOff' : 'eye'" />
          </button>
        </template>
      </DiInput>

      <div class="flex flex-wrap items-center justify-between gap-2">
        <DiCheckbox v-model="rememberMe" size="xs">
          <template #label>
            <span class="text-xs font-medium text-base-content">
              {{ t('features.auth.signIn.rememberMe') }}
            </span>
          </template>
        </DiCheckbox>

        <RouterLink
          to="/auth/forgot-password"
          class="text-xs font-medium text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {{ t('features.auth.signIn.forgotPassword') }}
        </RouterLink>
      </div>

      <DiButton
        variant="primary"
        native-type="submit"
        block
        :loading="submitting"
        custom-class="mt-1"
      >
        {{ submitting ? t('features.auth.signIn.submitting') : t('features.auth.signIn.submit') }}
      </DiButton>

      <p class="text-center text-sm text-base-content/65">
        {{ t('features.auth.signIn.noAccount') }}
        <RouterLink
          to="/auth/sign-up"
          class="font-medium text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {{ t('features.auth.signIn.signUp') }}
        </RouterLink>
      </p>
    </form>
  </div>
</template>
