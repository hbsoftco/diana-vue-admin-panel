<script setup lang="ts">
import { computed, useId } from 'vue'
import { useI18n } from 'vue-i18n'

import DiCheckbox from '@/shared/ui/base/checkbox/DiCheckbox.vue'
import DiAlert from '@/shared/ui/base/DiAlert.vue'
import DiButton from '@/shared/ui/base/DiButton.vue'
import { DiInput } from '@/shared/ui/base/input'

import {
  checkedKey,
  emailKey,
  matchKey,
  minLenKey,
  requiredKey,
  useAuthForm,
} from '../../composables/use-auth-form'

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

const MIN_PASSWORD_LENGTH = 8
const headingId = `${useId()}-heading`

const { fields, errors, submitting, succeeded, handleSubmit } = useAuthForm({
  tag: 'SignUp',
  fields: {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  },
  trimFields: ['fullName', 'email'],
  omitFields: ['confirmPassword'],
  validators: {
    fullName: requiredKey('features.auth.signUp.errors.fullNameRequired'),
    email: emailKey(
      'features.auth.signUp.errors.emailRequired',
      'features.auth.signUp.errors.emailInvalid',
    ),
    password: minLenKey(
      MIN_PASSWORD_LENGTH,
      'features.auth.signUp.errors.passwordRequired',
      'features.auth.signUp.errors.passwordTooShort',
    ),
    confirmPassword: matchKey(
      'password',
      'features.auth.signUp.errors.confirmPasswordRequired',
      'features.auth.signUp.errors.passwordMismatch',
    ),
    agreeToTerms: checkedKey('features.auth.signUp.errors.termsRequired'),
  },
  onSubmit: payload => emit('submit', payload),
})

const passwordToggleLabels = computed(() => ({
  show: t('features.auth.signUp.showPassword'),
  hide: t('features.auth.signUp.hidePassword'),
}))
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

    <DiAlert
      v-if="succeeded"
      variant="success"
      soft
      show-icon
      role="status"
      :title="t('features.auth.signUp.successTitle')"
      :description="t('features.auth.signUp.successMessage')"
    />

    <form
      v-else
      class="space-y-5"
      novalidate
      :aria-labelledby="headingId"
      @submit.prevent="handleSubmit"
    >
      <DiInput
        v-model="fields.fullName"
        type="text"
        name="fullName"
        autocomplete="name"
        prefix-icon="user"
        :label="t('features.auth.signUp.fullNameLabel')"
        :placeholder="t('features.auth.signUp.fullNamePlaceholder')"
        :error="errors.fullName"
        required
      />

      <DiInput
        v-model="fields.email"
        type="email"
        name="email"
        autocomplete="email"
        inputmode="email"
        prefix-icon="mail"
        :label="t('features.auth.signUp.emailLabel')"
        :placeholder="t('features.auth.signUp.emailPlaceholder')"
        :error="errors.email"
        required
      />

      <DiInput
        v-model="fields.password"
        type="password"
        name="password"
        autocomplete="new-password"
        prefix-icon="lock"
        show-password-toggle
        :password-toggle-labels="passwordToggleLabels"
        :label="t('features.auth.signUp.passwordLabel')"
        :placeholder="t('features.auth.signUp.passwordPlaceholder')"
        :error="errors.password"
        required
      />

      <DiInput
        v-model="fields.confirmPassword"
        type="password"
        name="confirmPassword"
        autocomplete="new-password"
        prefix-icon="lock"
        show-password-toggle
        :password-toggle-labels="passwordToggleLabels"
        :label="t('features.auth.signUp.confirmPasswordLabel')"
        :placeholder="t('features.auth.signUp.confirmPasswordPlaceholder')"
        :error="errors.confirmPassword"
        required
      />

      <DiCheckbox v-model="fields.agreeToTerms" size="xs" :error="errors.agreeToTerms" required>
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
