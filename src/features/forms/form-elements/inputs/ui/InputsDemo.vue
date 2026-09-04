<script setup lang="ts">
import { ref } from 'vue'

import { DiInput } from '@/shared/ui/base/input'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

const name = ref('')
const email = ref('')

const basicCode = `<script setup lang="ts">
import { ref } from 'vue'

import { DiInput } from '@/shared/ui/base/input'

const name = ref('')
const email = ref('')
<\/script>

<template>
  <div class="grid gap-4 md:grid-cols-2">
    <DiInput v-model="name" label="Full name" placeholder="Enter your name" />
    <DiInput
      v-model="email"
      type="email"
      label="Email address"
      placeholder="name@example.com"
      helper-text="We'll never share your email."
    />
  </div>
</template>`

const typesCode = `<div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
  <DiInput type="text" label="Text" placeholder="Text input" />
  <DiInput type="password" label="Password" placeholder="Password" />
  <DiInput type="email" label="Email" placeholder="name@example.com" />
  <DiInput type="number" label="Number" placeholder="100" />
  <DiInput type="search" label="Search" placeholder="Search" />
  <DiInput type="url" label="URL" placeholder="https://example.com" />
  <DiInput type="tel" label="Telephone" placeholder="+1 555 0123" />
</div>`

const sizesCode = `<div class="space-y-4">
  <DiInput size="sm" label="Small input" placeholder="Small" prefix-icon="mail" />
  <DiInput size="md" label="Medium input" placeholder="Medium" prefix-icon="mail" />
  <DiInput size="lg" label="Large input" placeholder="Large" prefix-icon="mail" />
</div>`

const statesCode = `<div class="space-y-4">
  <DiInput model-value="Disabled value" label="Disabled input" disabled />
  <DiInput model-value="Readonly value" label="Readonly input" readonly />
  <DiInput label="Loading input" placeholder="Fetching account details" loading />
</div>`

const slotsCode = `<div class="space-y-4">
  <!-- Prefix icon only -->
  <DiInput type="email" label="Email" placeholder="name@example.com" prefix-icon="mail" />

  <!-- Suffix icon only -->
  <DiInput type="search" label="Search" placeholder="Search projects" suffix-icon="search" />

  <!-- Prefix and suffix together -->
  <DiInput label="Event date" placeholder="Pick a date" prefix-icon="calendarDays" suffix-icon="chevronDown" />

  <!-- Built-in password show/hide toggle -->
  <DiInput
    type="password"
    label="Password"
    placeholder="Enter password"
    prefix-icon="lock"
    show-password-toggle
    :password-toggle-labels="{ show: 'Show password', hide: 'Hide password' }"
  />

  <!-- Error state with status icon -->
  <DiInput
    model-value="not-an-email"
    type="email"
    label="Email"
    prefix-icon="mail"
    show-error-icon
    error="Enter a valid email address."
  />

  <!-- Custom slot content still overrides the icon props -->
  <DiInput type="search" label="Command" placeholder="Search">
    <template #prefix>
      <kbd class="kbd kbd-sm">⌘</kbd>
    </template>
    <template #suffix>
      <kbd class="kbd kbd-sm">K</kbd>
    </template>
  </DiInput>
</div>`

const validationCode = `<div class="space-y-4">
  <DiInput
    model-value="invalid-email"
    type="email"
    label="Email with error"
    error="Enter a valid email address."
  />
  <DiInput
    model-value="diana-admin"
    label="Username with success"
    success="This username is available."
  />
  <DiInput label="Password guidance" helper-text="Use at least eight characters." />
</div>`

const variantsCode = `<div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
  <DiInput variant="primary" label="Primary" placeholder="Focus to preview" />
  <DiInput variant="secondary" label="Secondary" placeholder="Focus to preview" />
  <DiInput variant="accent" label="Accent" placeholder="Focus to preview" />
  <DiInput variant="info" label="Info" placeholder="Focus to preview" />
  <DiInput variant="success" label="Success" placeholder="Focus to preview" />
  <DiInput variant="warning" label="Warning" placeholder="Focus to preview" />
  <DiInput variant="error" label="Error" placeholder="Focus to preview" />
</div>`
</script>

<template>
  <div class="grid gap-6 xl:grid-cols-2">
    <PreviewCodeCard
      :title="$t('features.forms.inputs.sections.basic')"
      accent-color="#8b5cf6"
      :code="basicCode"
      language="vue"
      class="xl:col-span-2"
    >
      <div class="grid gap-4 md:grid-cols-2">
        <DiInput
          v-model="name"
          :label="$t('features.forms.inputs.labels.fullName')"
          :placeholder="$t('features.forms.inputs.placeholders.name')"
        />
        <DiInput
          v-model="email"
          type="email"
          :label="$t('features.forms.inputs.labels.email')"
          placeholder="name@example.com"
          :helper-text="$t('features.forms.inputs.helpers.emailPrivacy')"
        />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.forms.inputs.sections.types')"
      accent-color="#06b6d4"
      :code="typesCode"
      language="html"
      class="xl:col-span-2"
    >
      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <DiInput
          type="text"
          :label="$t('features.forms.inputs.labels.text')"
          :placeholder="$t('features.forms.inputs.placeholders.text')"
        />
        <DiInput
          type="password"
          :label="$t('features.forms.inputs.labels.password')"
          :placeholder="$t('features.forms.inputs.placeholders.password')"
        />
        <DiInput
          type="email"
          :label="$t('features.forms.inputs.labels.emailShort')"
          placeholder="name@example.com"
        />
        <DiInput
          type="number"
          :label="$t('features.forms.inputs.labels.number')"
          placeholder="100"
        />
        <DiInput
          type="search"
          :label="$t('features.forms.inputs.labels.search')"
          :placeholder="$t('features.forms.inputs.placeholders.search')"
        />
        <DiInput type="url" label="URL" placeholder="https://example.com" />
        <DiInput
          type="tel"
          :label="$t('features.forms.inputs.labels.telephone')"
          placeholder="+1 555 0123"
        />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.forms.inputs.sections.sizes')"
      accent-color="#14b8a6"
      :code="sizesCode"
      language="html"
    >
      <div class="space-y-4">
        <DiInput
          size="sm"
          prefix-icon="mail"
          :label="$t('features.forms.inputs.labels.small')"
          :placeholder="$t('features.forms.inputs.sizes.small')"
        />
        <DiInput
          size="md"
          prefix-icon="mail"
          :label="$t('features.forms.inputs.labels.medium')"
          :placeholder="$t('features.forms.inputs.sizes.medium')"
        />
        <DiInput
          size="lg"
          prefix-icon="mail"
          :label="$t('features.forms.inputs.labels.large')"
          :placeholder="$t('features.forms.inputs.sizes.large')"
        />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.forms.inputs.sections.states')"
      accent-color="#64748b"
      :code="statesCode"
      language="html"
    >
      <div class="space-y-4">
        <DiInput
          :model-value="$t('features.forms.inputs.values.disabled')"
          :label="$t('features.forms.inputs.labels.disabled')"
          disabled
        />
        <DiInput
          :model-value="$t('features.forms.inputs.values.readonly')"
          :label="$t('features.forms.inputs.labels.readonly')"
          readonly
        />
        <DiInput
          :label="$t('features.forms.inputs.labels.loading')"
          :placeholder="$t('features.forms.inputs.placeholders.loading')"
          loading
        />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.forms.inputs.sections.slots')"
      accent-color="#8b5cf6"
      :code="slotsCode"
      language="html"
    >
      <div class="space-y-4">
        <DiInput
          type="email"
          prefix-icon="mail"
          :label="$t('features.forms.inputs.labels.emailShort')"
          placeholder="name@example.com"
        />
        <DiInput
          type="search"
          suffix-icon="search"
          :label="$t('features.forms.inputs.labels.search')"
          :placeholder="$t('features.forms.inputs.placeholders.projects')"
        />
        <DiInput
          prefix-icon="calendarDays"
          suffix-icon="chevronDown"
          :label="$t('features.forms.inputs.labels.text')"
          :placeholder="$t('features.forms.inputs.placeholders.text')"
        />
        <DiInput
          type="password"
          prefix-icon="lock"
          show-password-toggle
          :password-toggle-labels="{
            show: $t('features.forms.inputs.actions.showPassword'),
            hide: $t('features.forms.inputs.actions.hidePassword'),
          }"
          :label="$t('features.forms.inputs.labels.password')"
          :placeholder="$t('features.forms.inputs.placeholders.enterPassword')"
        />
        <DiInput
          model-value="invalid-email"
          type="email"
          prefix-icon="mail"
          show-error-icon
          :label="$t('features.forms.inputs.labels.emailError')"
          :error="$t('features.forms.inputs.validation.email')"
        />
        <DiInput
          type="search"
          :label="$t('features.forms.inputs.labels.search')"
          :placeholder="$t('features.forms.inputs.placeholders.search')"
        >
          <template #prefix>
            <kbd class="kbd kbd-sm">⌘</kbd>
          </template>
          <template #suffix>
            <kbd class="kbd kbd-sm">K</kbd>
          </template>
        </DiInput>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.forms.inputs.sections.validation')"
      accent-color="#ef4444"
      :code="validationCode"
      language="html"
    >
      <div class="space-y-4">
        <DiInput
          model-value="invalid-email"
          type="email"
          :label="$t('features.forms.inputs.labels.emailError')"
          :error="$t('features.forms.inputs.validation.email')"
        />
        <DiInput
          model-value="diana-admin"
          :label="$t('features.forms.inputs.labels.usernameSuccess')"
          :success="$t('features.forms.inputs.validation.usernameAvailable')"
        />
        <DiInput
          :label="$t('features.forms.inputs.labels.passwordGuidance')"
          :helper-text="$t('features.forms.inputs.helpers.password')"
        />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.forms.inputs.sections.variants')"
      accent-color="#f59e0b"
      :code="variantsCode"
      language="html"
      class="xl:col-span-2"
    >
      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DiInput
          variant="primary"
          :label="$t('common.variants.primary')"
          :placeholder="$t('features.forms.inputs.placeholders.focus')"
        />
        <DiInput
          variant="secondary"
          :label="$t('common.variants.secondary')"
          :placeholder="$t('features.forms.inputs.placeholders.focus')"
        />
        <DiInput
          variant="accent"
          :label="$t('common.variants.accent')"
          :placeholder="$t('features.forms.inputs.placeholders.focus')"
        />
        <DiInput
          variant="info"
          :label="$t('common.variants.info')"
          :placeholder="$t('features.forms.inputs.placeholders.focus')"
        />
        <DiInput
          variant="success"
          :label="$t('common.variants.success')"
          :placeholder="$t('features.forms.inputs.placeholders.focus')"
        />
        <DiInput
          variant="warning"
          :label="$t('common.variants.warning')"
          :placeholder="$t('features.forms.inputs.placeholders.focus')"
        />
        <DiInput
          variant="error"
          :label="$t('common.variants.error')"
          :placeholder="$t('features.forms.inputs.placeholders.focus')"
        />
      </div>
    </PreviewCodeCard>
  </div>
</template>
