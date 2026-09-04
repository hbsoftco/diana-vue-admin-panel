<script setup lang="ts">
import userAvatarUrl from '@assets/images/user.png'
import { computed, useId } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import DiAvatar from '@/shared/ui/base/avatar/DiAvatar.vue'
import DiAlert from '@/shared/ui/base/DiAlert.vue'
import DiButton from '@/shared/ui/base/DiButton.vue'
import { DiInput } from '@/shared/ui/base/input'

import { requiredKey, useAuthForm } from '../../composables/use-auth-form'

export type LockScreenPayload = {
  password: string
}

const emit = defineEmits<{
  submit: [payload: LockScreenPayload]
}>()

const { t } = useI18n()
const route = useRoute()

// Placeholder, already-identified session — the same mock identity shown by
// the header user menu (see shared/ui/layout/UserProfile.vue) until a real
// session is wired up. Lock Screen re-authenticates this known user rather
// than collecting a fresh identity like Sign In does.
const user = { name: 'John Doe' }

const headingId = `${useId()}-heading`
const avatarAlt = computed(() => t('features.auth.lockScreen.avatarAlt', { name: user.name }))

// Keep "sign in as someone else" on the same Basic/Cover layout the lock
// screen is currently rendered under, instead of always landing on Basic.
const signInPath = computed(() =>
  route.path.endsWith('/cover') ? '/auth/sign-in/cover' : '/auth/sign-in/basic',
)

const { fields, errors, submitting, succeeded, handleSubmit } = useAuthForm({
  tag: 'LockScreen',
  fields: { password: '' },
  validators: {
    // A returning user is re-entering a password that already exists, so —
    // like Sign In and unlike Sign Up — only presence is enforced here, not
    // a minimum length.
    password: requiredKey('features.auth.lockScreen.errors.passwordRequired', { trim: false }),
  },
  onSubmit: payload => emit('submit', payload),
})

const passwordToggleLabels = computed(() => ({
  show: t('features.auth.lockScreen.showPassword'),
  hide: t('features.auth.lockScreen.hidePassword'),
}))
</script>

<template>
  <div class="w-full">
    <header class="mb-6 flex flex-col items-center text-center">
      <DiAvatar :src="userAvatarUrl" :alt="avatarAlt" size="xl" shape="circle" class="mb-4" />
      <h1 :id="headingId" class="text-2xl font-bold text-base-content sm:text-3xl">
        {{ user.name }}
      </h1>
      <p class="mt-2 text-sm text-base-content/65">
        {{ t('features.auth.lockScreen.subtitle') }}
      </p>
    </header>

    <DiAlert
      v-if="succeeded"
      variant="success"
      soft
      show-icon
      role="status"
      :title="t('features.auth.lockScreen.successTitle')"
      :description="t('features.auth.lockScreen.successMessage')"
    />

    <form
      v-else
      class="space-y-5"
      novalidate
      :aria-labelledby="headingId"
      @submit.prevent="handleSubmit"
    >
      <DiInput
        v-model="fields.password"
        type="password"
        name="password"
        autocomplete="current-password"
        prefix-icon="lock"
        show-password-toggle
        :password-toggle-labels="passwordToggleLabels"
        :label="t('features.auth.lockScreen.passwordLabel')"
        :placeholder="t('features.auth.lockScreen.passwordPlaceholder')"
        :error="errors.password"
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
            ? t('features.auth.lockScreen.submitting')
            : t('features.auth.lockScreen.submit')
        }}
      </DiButton>

      <p class="text-center text-sm text-base-content/65">
        {{ t('features.auth.lockScreen.notYou') }}
        <RouterLink
          :to="signInPath"
          class="font-medium text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {{ t('features.auth.lockScreen.signInDifferent') }}
        </RouterLink>
      </p>
    </form>
  </div>
</template>
