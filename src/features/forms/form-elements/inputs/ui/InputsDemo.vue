<script setup lang="ts">
import { ref } from 'vue'

import DiButton from '@/shared/ui/base/DiButton.vue'
import DiIcon from '@/shared/ui/base/DiIcon.vue'
import { DiInput } from '@/shared/ui/base/input'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

const name = ref('')
const email = ref('')
const showPassword = ref(false)

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
  <DiInput size="sm" label="Small input" placeholder="Small" />
  <DiInput size="md" label="Medium input" placeholder="Medium" />
  <DiInput size="lg" label="Large input" placeholder="Large" />
</div>`

const statesCode = `<div class="space-y-4">
  <DiInput model-value="Disabled value" label="Disabled input" disabled />
  <DiInput model-value="Readonly value" label="Readonly input" readonly />
  <DiInput label="Loading input" placeholder="Fetching account details" loading />
</div>`

const slotsCode = `<script setup lang="ts">
import { ref } from 'vue'

import DiButton from '@/shared/ui/base/DiButton.vue'
import DiIcon from '@/shared/ui/base/DiIcon.vue'
import { DiInput } from '@/shared/ui/base/input'

const showPassword = ref(false)
<\/script>

<template>
  <div class="space-y-4">
    <DiInput type="search" label="Search" placeholder="Search projects">
      <template #prefix>
        <DiIcon name="search" />
      </template>
      <template #suffix>
        <kbd class="kbd kbd-sm">⌘K</kbd>
      </template>
    </DiInput>
    <DiInput
      :type="showPassword ? 'text' : 'password'"
      label="Password"
      placeholder="Enter password"
    >
      <template #prefix>
        <DiIcon name="userOutlineRounded" />
      </template>
      <template #suffix>
        <DiButton
          variant="ghost"
          size="xs"
          square
          :aria-label="showPassword ? 'Hide password' : 'Show password'"
          @click="showPassword = !showPassword"
        >
          {{ showPassword ? 'Hide' : 'Show' }}
        </DiButton>
      </template>
    </DiInput>
  </div>
</template>`

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
      title="Basic Inputs"
      accent-color="#8b5cf6"
      :code="basicCode"
      language="vue"
      class="xl:col-span-2"
    >
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
    </PreviewCodeCard>

    <PreviewCodeCard
      title="Input Types"
      accent-color="#06b6d4"
      :code="typesCode"
      language="html"
      class="xl:col-span-2"
    >
      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <DiInput type="text" label="Text" placeholder="Text input" />
        <DiInput type="password" label="Password" placeholder="Password" />
        <DiInput type="email" label="Email" placeholder="name@example.com" />
        <DiInput type="number" label="Number" placeholder="100" />
        <DiInput type="search" label="Search" placeholder="Search" />
        <DiInput type="url" label="URL" placeholder="https://example.com" />
        <DiInput type="tel" label="Telephone" placeholder="+1 555 0123" />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard title="Sizes" accent-color="#14b8a6" :code="sizesCode" language="html">
      <div class="space-y-4">
        <DiInput size="sm" label="Small input" placeholder="Small" />
        <DiInput size="md" label="Medium input" placeholder="Medium" />
        <DiInput size="lg" label="Large input" placeholder="Large" />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      title="Disabled and Readonly"
      accent-color="#64748b"
      :code="statesCode"
      language="html"
    >
      <div class="space-y-4">
        <DiInput model-value="Disabled value" label="Disabled input" disabled />
        <DiInput model-value="Readonly value" label="Readonly input" readonly />
        <DiInput label="Loading input" placeholder="Fetching account details" loading />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      title="Prefix/Suffix Slots"
      accent-color="#8b5cf6"
      :code="slotsCode"
      language="vue"
    >
      <div class="space-y-4">
        <DiInput type="search" label="Search" placeholder="Search projects">
          <template #prefix>
            <DiIcon name="search" />
          </template>
          <template #suffix>
            <kbd class="kbd kbd-sm">⌘K</kbd>
          </template>
        </DiInput>
        <DiInput
          :type="showPassword ? 'text' : 'password'"
          label="Password"
          placeholder="Enter password"
        >
          <template #prefix>
            <DiIcon name="userOutlineRounded" />
          </template>
          <template #suffix>
            <DiButton
              variant="ghost"
              size="xs"
              square
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
              @click="showPassword = !showPassword"
            >
              {{ showPassword ? 'Hide' : 'Show' }}
            </DiButton>
          </template>
        </DiInput>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      title="Validation States"
      accent-color="#ef4444"
      :code="validationCode"
      language="html"
    >
      <div class="space-y-4">
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
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      title="Semantic Variants"
      accent-color="#f59e0b"
      :code="variantsCode"
      language="html"
      class="xl:col-span-2"
    >
      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DiInput variant="primary" label="Primary" placeholder="Focus to preview" />
        <DiInput variant="secondary" label="Secondary" placeholder="Focus to preview" />
        <DiInput variant="accent" label="Accent" placeholder="Focus to preview" />
        <DiInput variant="info" label="Info" placeholder="Focus to preview" />
        <DiInput variant="success" label="Success" placeholder="Focus to preview" />
        <DiInput variant="warning" label="Warning" placeholder="Focus to preview" />
        <DiInput variant="error" label="Error" placeholder="Focus to preview" />
      </div>
    </PreviewCodeCard>
  </div>
</template>
