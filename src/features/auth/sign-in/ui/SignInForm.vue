<script setup lang="ts">
import { computed, useId } from 'vue'
import { useI18n } from 'vue-i18n'

import DiCheckbox from '@/shared/ui/base/checkbox/DiCheckbox.vue'
import DiAlert from '@/shared/ui/base/DiAlert.vue'
import DiButton from '@/shared/ui/base/DiButton.vue'
import { DiInput } from '@/shared/ui/base/input'

import { emailKey, requiredKey, useAuthForm } from '../../composables/use-auth-form'

export type SignInPayload = {
  email: string
  password: string
  rememberMe: boolean
}

const emit = defineEmits<{
  submit: [payload: SignInPayload]
}>()

const { t } = useI18n()

const headingId = `${useId()}-heading`

const { fields, errors, submitting, succeeded, handleSubmit } = useAuthForm({
  tag: 'SignIn',
  fields: { email: '', password: '', rememberMe: false },
  trimFields: ['email'],
  validators: {
    email: emailKey(
      'features.auth.signIn.errors.emailRequired',
      'features.auth.signIn.errors.emailInvalid',
    ),
    password: requiredKey('features.auth.signIn.errors.passwordRequired', { trim: false }),
  },
  onSubmit: payload => emit('submit', payload),
})

const passwordToggleLabels = computed(() => ({
  show: t('features.auth.signIn.showPassword'),
  hide: t('features.auth.signIn.hidePassword'),
}))
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

    <DiAlert
      v-if="succeeded"
      variant="success"
      soft
      show-icon
      role="status"
      :title="t('features.auth.signIn.successTitle')"
      :description="t('features.auth.signIn.successMessage')"
    />

    <form
      v-else
      class="space-y-5"
      novalidate
      :aria-labelledby="headingId"
      @submit.prevent="handleSubmit"
    >
      <DiInput
        v-model="fields.email"
        type="email"
        name="email"
        autocomplete="email"
        inputmode="email"
        prefix-icon="mail"
        :label="t('features.auth.signIn.emailLabel')"
        :placeholder="t('features.auth.signIn.emailPlaceholder')"
        :error="errors.email"
        required
      />

      <DiInput
        v-model="fields.password"
        type="password"
        name="password"
        autocomplete="current-password"
        prefix-icon="lock"
        show-password-toggle
        :password-toggle-labels="passwordToggleLabels"
        :label="t('features.auth.signIn.passwordLabel')"
        :placeholder="t('features.auth.signIn.passwordPlaceholder')"
        :error="errors.password"
        required
      />

      <div class="flex flex-wrap items-center justify-between gap-2">
        <DiCheckbox v-model="fields.rememberMe" size="xs">
          <template #label>
            <span class="text-xs font-medium text-base-content">
              {{ t('features.auth.signIn.rememberMe') }}
            </span>
          </template>
        </DiCheckbox>

        <RouterLink
          to="/auth/reset-password"
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
