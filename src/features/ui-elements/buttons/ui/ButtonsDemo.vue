<script setup lang="ts">
import DiButton from '@/shared/ui/base/DiButton.vue'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

const defaultButtons = `<div class="flex flex-wrap gap-2">
  <DiButton variant="primary">Primary</DiButton>
  <DiButton variant="secondary">Secondary</DiButton>
  <DiButton variant="info">Info</DiButton>
  <DiButton variant="success">Success</DiButton>
  <DiButton variant="warning">Warning</DiButton>
  <DiButton variant="error">Error</DiButton>
  <DiButton variant="neutral">Neutral</DiButton>
  <DiButton variant="link">Link</DiButton>
</div>`

const roundedButtons = `<div class="flex flex-wrap gap-2">
  <DiButton variant="primary" rounded>Primary</DiButton>
  <DiButton variant="secondary" rounded>Secondary</DiButton>
  <DiButton variant="info" rounded>Info</DiButton>
  <DiButton variant="success" rounded>Success</DiButton>
  <DiButton variant="warning" rounded>Warning</DiButton>
  <DiButton variant="error" rounded>Error</DiButton>
  <DiButton variant="neutral" rounded>Neutral</DiButton>
  <DiButton variant="link" rounded>Link</DiButton>
</div>`

const softButtons = `<div class="flex flex-wrap gap-2">
  <DiButton variant="primary" soft>Primary</DiButton>
  <DiButton variant="secondary" soft>Secondary</DiButton>
  <DiButton variant="info" soft>Info</DiButton>
  <DiButton variant="success" soft>Success</DiButton>
  <DiButton variant="warning" soft>Warning</DiButton>
  <DiButton variant="error" soft>Error</DiButton>
  <DiButton variant="neutral" soft>Neutral</DiButton>
  <DiButton variant="link" soft>Link</DiButton>
</div>`

const softRoundedButtons = `<div class="flex flex-wrap gap-2">
  <DiButton variant="primary" rounded soft>Primary</DiButton>
  <DiButton variant="secondary" rounded soft>Secondary</DiButton>
  <DiButton variant="info" rounded soft>Info</DiButton>
  <DiButton variant="success" rounded soft>Success</DiButton>
  <DiButton variant="warning" rounded soft>Warning</DiButton>
  <DiButton variant="error" rounded soft>Error</DiButton>
  <DiButton variant="neutral" rounded soft>Neutral</DiButton>
  <DiButton variant="link" rounded soft>Link</DiButton>
</div>`

const outlineButtons = `<div class="flex flex-wrap gap-2">
  <DiButton variant="primary" outline>Primary</DiButton>
  <DiButton variant="secondary" outline>Secondary</DiButton>
  <DiButton variant="info" outline>Info</DiButton>
  <DiButton variant="success" outline>Success</DiButton>
  <DiButton variant="warning" outline>Warning</DiButton>
  <DiButton variant="error" outline>Error</DiButton>
  <DiButton variant="neutral" outline>Neutral</DiButton>
  <DiButton variant="link" outline>Link</DiButton>
</div>`

const outlineRoundedButtons = `<div class="flex flex-wrap gap-2">
  <DiButton variant="primary" rounded outline>Primary</DiButton>
  <DiButton variant="secondary" rounded outline>Secondary</DiButton>
  <DiButton variant="info" rounded outline>Info</DiButton>
  <DiButton variant="success" rounded outline>Success</DiButton>
  <DiButton variant="warning" rounded outline>Warning</DiButton>
  <DiButton variant="error" rounded outline>Error</DiButton>
  <DiButton variant="neutral" rounded outline>Neutral</DiButton>
  <DiButton variant="link" rounded outline>Link</DiButton>
</div>`

const gradientButtons = `<div class="flex flex-wrap gap-2">
  <DiButton variant="primary" gradient>Primary</DiButton>
  <DiButton variant="secondary" gradient>Secondary</DiButton>
  <DiButton variant="info" gradient>Info</DiButton>
  <DiButton variant="success" gradient>Success</DiButton>
  <DiButton variant="warning" gradient>Warning</DiButton>
  <DiButton variant="error" gradient>Error</DiButton>
  <DiButton variant="neutral" gradient>Neutral</DiButton>
  <DiButton variant="link" outline>Link</DiButton>
</div>`

const gradientRoundedButtons = `<div class="flex flex-wrap gap-2">
  <DiButton variant="primary" rounded outline>Primary</DiButton>
  <DiButton variant="secondary" rounded outline>Secondary</DiButton>
  <DiButton variant="info" rounded outline>Info</DiButton>
  <DiButton variant="success" rounded outline>Success</DiButton>
  <DiButton variant="warning" rounded outline>Warning</DiButton>
  <DiButton variant="error" rounded outline>Error</DiButton>
  <DiButton variant="neutral" rounded outline>Neutral</DiButton>
  <DiButton variant="link" rounded outline>Link</DiButton>
</div>`

const dashButtons = `<div class="flex flex-wrap gap-2">
  <DiButton variant="primary" dash>Primary</DiButton>
  <DiButton variant="secondary" dash>Secondary</DiButton>
  <DiButton variant="info" dash>Info</DiButton>
  <DiButton variant="success" dash>Success</DiButton>
  <DiButton variant="warning" dash>Warning</DiButton>
  <DiButton variant="error" dash>Error</DiButton>
  <DiButton variant="neutral" dash>Neutral</DiButton>
  <DiButton variant="link" dash>Link</DiButton>
</div>`

const dashRoundedButtons = `<div class="flex flex-wrap gap-2">
  <DiButton variant="primary" rounded dash>Primary</DiButton>
  <DiButton variant="secondary" rounded dash>Secondary</DiButton>
  <DiButton variant="info" rounded dash>Info</DiButton>
  <DiButton variant="success" rounded dash>Success</DiButton>
  <DiButton variant="warning" rounded dash>Warning</DiButton>
  <DiButton variant="error" rounded dash>Error</DiButton>
  <DiButton variant="neutral" rounded dash>Neutral</DiButton>
  <DiButton variant="link" rounded dash>Link</DiButton>
</div>`

const htmlTags = `<div class="flex flex-wrap gap-2">
  <DiButton native-type="submit" variant="primary">Primary</DiButton>
  <DiButton tag="input" native-type="button" variant="secondary" value="Secondary" />
  <DiButton tag="input" native-type="submit" variant="info" value="Submit" />
  <DiButton tag="input" native-type="radio" variant="success" aria-label="Radio" />
  <DiButton tag="input" native-type="checkbox" variant="warning" aria-label="Checkbox" />
  <DiButton tag="input" native-type="reset" variant="error" value="Reset" />
  <DiButton tag="a" href="#" role="button"> Link </DiButton>
</div>
`
const disabledButtons = `<div class="flex flex-wrap gap-2">
  <DiButton variant="primary" disabled>Primary</DiButton>
  <DiButton variant="secondary" disabled>Secondary</DiButton>
  <DiButton variant="info" disabled>Info</DiButton>
  <DiButton variant="success" disabled>Success</DiButton>
  <DiButton variant="warning" disabled>Warning</DiButton>
  <DiButton variant="error" disabled>Error</DiButton>
  <DiButton variant="neutral" disabled>Neutral</DiButton>
  <DiButton variant="link" disabled>Link</DiButton>
</div>`

const loadingButtons = `<div class="flex flex-wrap gap-2">
  <DiButton variant="primary" loading :loading-disabled="false">Primary</DiButton>
  <DiButton variant="secondary" loading loading-variant="bars">Secondary</DiButton>
  <DiButton variant="info" loading loading-variant="ball">Info</DiButton>
  <DiButton variant="success" loading loading-variant="dots" :loading-disabled="false">Success</DiButton>
  <DiButton variant="warning" loading loading-variant="ring">Warning</DiButton>
  <DiButton variant="error" loading loading-variant="spinner">Error</DiButton>
  <DiButton variant="neutral" loading>Neutral</DiButton>
  <DiButton variant="link" loading loading-variant="infinity">Link</DiButton>
</div>`

const iconButtons = `<div class="flex flex-wrap gap-2">
  <DiButton variant="primary" square>
    <i-mdi:home class="text-lg" />
  </DiButton>
  <DiButton variant="secondary" square>
    <i-mdi:archive class="text-lg" />
  </DiButton>
  <DiButton variant="error" square>
    <i-mdi:cart class="text-lg" />
  </DiButton>
  <DiButton variant="warning" square>
    <i-mdi:calendar class="text-lg" />
  </DiButton>
</div>`

const iconCircleButtons = `<div class="flex flex-wrap gap-2">
  <DiButton variant="ghost" circle>
    <i-mdi:home class="text-lg" />
  </DiButton>
  <DiButton variant="ghost" circle>
    <i-mdi:delete class="text-lg" />
  </DiButton>
  <DiButton variant="ghost" circle>
    <i-mdi:bell class="text-lg" />
  </DiButton>
  <DiButton variant="ghost" circle>
    <i-mdi:bookmark class="text-lg" />
  </DiButton>
</div>`

const iconOutlineCircleButtons = `<div class="flex flex-wrap gap-2">
  <DiButton variant="primary" circle outline>
    <i-mdi:phone class="text-lg" />
  </DiButton>
  <DiButton variant="info" circle outline>
    <i-mdi:magnify class="text-lg" />
  </DiButton>
  <DiButton variant="success" circle outline>
    <i-mdi:video class="text-lg" />
  </DiButton>
  <DiButton variant="error" circle outline>
    <i-mdi:image class="text-lg" />
  </DiButton>
</div>`

const wideButtons = `<div class="flex flex-col gap-2">
  <DiButton variant="primary" wide>Primary Wide</DiButton>
  <DiButton variant="secondary" wide>Secondary Wide</DiButton>
  <DiButton variant="info" wide>Info Wide</DiButton>
  <DiButton variant="success" wide>Success Wide</DiButton>
  <DiButton variant="warning" wide>Warning Wide</DiButton>
  <DiButton variant="error" wide>Error Wide</DiButton>
  <DiButton variant="neutral" wide>Neutral Wide</DiButton>
</div>`

const blockButtons = `<div class="flex flex-col gap-2">
  <DiButton variant="primary" block>Primary Block</DiButton>
  <DiButton variant="secondary" block>Secondary Block</DiButton>
  <DiButton variant="info" block>Info Block</DiButton>
  <DiButton variant="success" block>Success Block</DiButton>
  <DiButton variant="warning" block>Warning Block</DiButton>
  <DiButton variant="error" block>Error Block</DiButton>
  <DiButton variant="neutral" block>Neutral Block</DiButton>
</div>`

const buttonSizes = `<div class="flex flex-wrap items-center gap-2">
  <DiButton variant="primary" size="xs">Extra Small</DiButton>
  <DiButton variant="primary" size="sm">Small</DiButton>
  <DiButton variant="primary" size="md">Medium</DiButton>
  <DiButton variant="primary" size="lg">Large</DiButton>
  <DiButton variant="primary" size="xl">Extra Large</DiButton>
</div>`

const buttonWithIcon = `<div class="flex flex-wrap items-center gap-2">
  <DiButton variant="primary">
    <template #icon-left>
      <i-mdi:home class="text-lg" />
    </template>
    Home
  </DiButton>

  <DiButton variant="secondary">
    <template #icon-right>
      <i-mdi:cog class="text-lg" />
    </template>
    Settings
  </DiButton>

  <DiButton variant="success">
    <template #icon-left>
      <i-mdi:check class="text-lg" />
    </template>
    Success
  </DiButton>

  <DiButton variant="warning">
    <template #icon-right>
      <i-mdi:alert class="text-lg" />
    </template>
    Warning
  </DiButton>
</div>`

const socialButtons = `<div class="flex flex-wrap items-center gap-2">
  <DiButton social="google" wide>
    <template #icon-left>
      <i-logos:google-icon class="text-base" />
    </template>
    Continue with Google
  </DiButton>

  <DiButton social="github" wide>
    <template #icon-left>
      <i-mdi:github class="text-lg" />
    </template>
    Continue with GitHub
  </DiButton>

  <DiButton social="facebook" wide>
    <template #icon-left>
      <i-logos:facebook class="text-lg" />
    </template>
    Continue with Facebook
  </DiButton>

  <DiButton social="apple" wide>
    <template #icon-left>
      <i-ic:baseline-apple class="text-lg" />
    </template>
    Continue with Apple
  </DiButton>

  <DiButton social="x" wide>
    <template #icon-left>
      <i-fa7-brands:x-twitter class="text-lg" />
    </template>
    Continue with X
  </DiButton>

  <DiButton social="linkedin" wide>
    <template #icon-left>
      <i-mdi:linkedin class="text-lg" />
    </template>
    Continue with LinkedIn
  </DiButton>

  <DiButton social="slack" wide>
    <template #icon-left>
      <i-logos:slack-icon class="text-sm" />
    </template>
    Continue with Slack
  </DiButton>

  <DiButton social="microsoft" wide>
    <template #icon-left>
      <i-logos:microsoft-icon class="text-sm" />
    </template>
    Continue with Microsoft
  </DiButton>

  <DiButton social="line" wide>
    <template #icon-left>
      <i-fontisto:line class="text-base" />
    </template>
    Continue with LINE
  </DiButton>

  <DiButton social="wechat" wide>
    <template #icon-left>
      <i-ic:round-wechat class="text-lg" />
    </template>
    Continue with WeChat
  </DiButton>

  <DiButton social="kakao" wide>
    <template #icon-left>
      <i-simple-icons:kakaotalk class="text-lg" />
    </template>
    Continue with Kakao
  </DiButton>

  <DiButton
    social="amazon"
    wide
    loading
    loading-variant="infinity"
  >
    <template #icon-left>
      <i-ri:amazon-fill class="text-lg" />
    </template>
    Continue with Amazon
  </DiButton>

  <DiButton social="vk" wide>
    <template #icon-left>
      <i-basil:vk-solid class="text-lg" />
    </template>
    Continue with VK
  </DiButton>

  <DiButton social="metamask" wide>
    <template #icon-left>
      <i-logos:metamask-icon class="text-sm" />
    </template>
    Continue with MetaMask
  </DiButton>
</div>`

const socialIconButtons = `<div class="flex flex-wrap items-center gap-2">
  <DiButton social="google" square>
    <i-logos:google-icon class="text-lg" />
  </DiButton>
  <DiButton social="github" square>
    <i-mdi:github class="text-lg" />
  </DiButton>
  <DiButton social="facebook" square>
    <i-logos:facebook class="text-lg" />
  </DiButton>
  <DiButton social="apple" square>
    <i-ic:baseline-apple class="text-lg" />
  </DiButton>
  <DiButton social="x" square>
    <i-fa7-brands:x-twitter class="text-lg" />
  </DiButton>
  <DiButton social="linkedin" square>
    <i-mdi:linkedin class="text-lg" />
  </DiButton>
  <DiButton social="slack" square>
    <i-logos:slack-icon class="text-base" />
  </DiButton>
  <DiButton social="microsoft" square>
    <i-logos:microsoft-icon class="text-base" />
  </DiButton>
  <DiButton social="line" square>
    <i-fontisto:line class="text-lg" />
  </DiButton>
  <DiButton social="wechat" square>
    <i-ic:round-wechat class="text-lg" />
  </DiButton>
  <DiButton social="kakao" square>
    <i-simple-icons:kakaotalk class="text-lg" />
  </DiButton>
  <DiButton social="amazon" square>
    <i-ri:amazon-fill class="text-lg" />
  </DiButton>
  <DiButton social="vk" square>
    <i-basil:vk-solid class="text-lg" />
  </DiButton>
  <DiButton social="metamask" square>
    <i-logos:metamask-icon class="text-base" />
  </DiButton>
</div>`
</script>

<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 items-start">
    <!-- Default Buttons -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.buttons.defaultButtons')"
      accent-color="#14b8a6"
      :code="defaultButtons"
      language="html"
    >
      <div class="flex flex-wrap gap-2">
        <DiButton variant="primary">
          {{ $t('variants.primary') }}
        </DiButton>
        <DiButton variant="secondary">
          {{ $t('variants.secondary') }}
        </DiButton>
        <DiButton variant="info">
          {{ $t('variants.info') }}
        </DiButton>
        <DiButton variant="success">
          {{ $t('variants.success') }}
        </DiButton>
        <DiButton variant="warning">
          {{ $t('variants.warning') }}
        </DiButton>
        <DiButton variant="error">
          {{ $t('variants.error') }}
        </DiButton>
        <DiButton variant="neutral">
          {{ $t('variants.neutral') }}
        </DiButton>
        <DiButton variant="link">
          {{ $t('variants.link') }}
        </DiButton>
      </div>
    </PreviewCodeCard>

    <!-- Default Rounded Buttons -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.buttons.roundedButtons')"
      accent-color="#14b8a6"
      :code="roundedButtons"
      language="html"
    >
      <div class="flex flex-wrap gap-2">
        <DiButton variant="primary" rounded>
          {{ $t('variants.primary') }}
        </DiButton>
        <DiButton variant="secondary" rounded>
          {{ $t('variants.secondary') }}
        </DiButton>
        <DiButton variant="info" rounded>
          {{ $t('variants.info') }}
        </DiButton>
        <DiButton variant="success" rounded>
          {{ $t('variants.success') }}
        </DiButton>
        <DiButton variant="warning" rounded>
          {{ $t('variants.warning') }}
        </DiButton>
        <DiButton variant="error" rounded>
          {{ $t('variants.error') }}
        </DiButton>
        <DiButton variant="neutral" rounded>
          {{ $t('variants.neutral') }}
        </DiButton>
        <DiButton variant="link" rounded>
          {{ $t('variants.link') }}
        </DiButton>
      </div>
    </PreviewCodeCard>

    <!-- Soft Buttons -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.buttons.softButtons')"
      accent-color="#14b8a6"
      :code="softButtons"
      language="html"
    >
      <div class="flex flex-wrap gap-2">
        <DiButton variant="primary" soft>
          {{ $t('variants.primary') }}
        </DiButton>
        <DiButton variant="secondary" soft>
          {{ $t('variants.secondary') }}
        </DiButton>
        <DiButton variant="info" soft>
          {{ $t('variants.info') }}
        </DiButton>
        <DiButton variant="success" soft>
          {{ $t('variants.success') }}
        </DiButton>
        <DiButton variant="warning" soft>
          {{ $t('variants.warning') }}
        </DiButton>
        <DiButton variant="error" soft>
          {{ $t('variants.error') }}
        </DiButton>
        <DiButton variant="neutral" soft>
          {{ $t('variants.neutral') }}
        </DiButton>
        <DiButton variant="link" soft>
          {{ $t('variants.link') }}
        </DiButton>
      </div>
    </PreviewCodeCard>

    <!-- Soft Rounded Buttons -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.buttons.softRoundedButtons')"
      accent-color="#14b8a6"
      :code="softRoundedButtons"
      language="html"
    >
      <div class="flex flex-wrap gap-2">
        <DiButton variant="primary" rounded soft>
          {{ $t('variants.primary') }}
        </DiButton>
        <DiButton variant="secondary" rounded soft>
          {{ $t('variants.secondary') }}
        </DiButton>
        <DiButton variant="info" rounded soft>
          {{ $t('variants.info') }}
        </DiButton>
        <DiButton variant="success" rounded soft>
          {{ $t('variants.success') }}
        </DiButton>
        <DiButton variant="warning" rounded soft>
          {{ $t('variants.warning') }}
        </DiButton>
        <DiButton variant="error" rounded soft>
          {{ $t('variants.error') }}
        </DiButton>
        <DiButton variant="neutral" rounded soft>
          {{ $t('variants.neutral') }}
        </DiButton>
        <DiButton variant="link" rounded soft>
          {{ $t('variants.link') }}
        </DiButton>
      </div>
    </PreviewCodeCard>

    <!-- Outline Buttons -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.buttons.outlineButtons')"
      accent-color="#14b8a6"
      :code="outlineButtons"
      language="html"
    >
      <div class="flex flex-wrap gap-2">
        <DiButton variant="primary" outline>
          {{ $t('variants.primary') }}
        </DiButton>
        <DiButton variant="secondary" outline>
          {{ $t('variants.secondary') }}
        </DiButton>
        <DiButton variant="info" outline>
          {{ $t('variants.info') }}
        </DiButton>
        <DiButton variant="success" outline>
          {{ $t('variants.success') }}
        </DiButton>
        <DiButton variant="warning" outline>
          {{ $t('variants.warning') }}
        </DiButton>
        <DiButton variant="error" outline>
          {{ $t('variants.error') }}
        </DiButton>
        <DiButton variant="neutral" outline>
          {{ $t('variants.neutral') }}
        </DiButton>
        <DiButton variant="link" outline>
          {{ $t('variants.link') }}
        </DiButton>
      </div>
    </PreviewCodeCard>

    <!-- Outline Rounded Buttons -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.buttons.outlineRoundedButtons')"
      accent-color="#14b8a6"
      :code="outlineRoundedButtons"
      language="html"
    >
      <div class="flex flex-wrap gap-2">
        <DiButton variant="primary" rounded outline>
          {{ $t('variants.primary') }}
        </DiButton>
        <DiButton variant="secondary" rounded outline>
          {{ $t('variants.secondary') }}
        </DiButton>
        <DiButton variant="info" rounded outline>
          {{ $t('variants.info') }}
        </DiButton>
        <DiButton variant="success" rounded outline>
          {{ $t('variants.success') }}
        </DiButton>
        <DiButton variant="warning" rounded outline>
          {{ $t('variants.warning') }}
        </DiButton>
        <DiButton variant="error" rounded outline>
          {{ $t('variants.error') }}
        </DiButton>
        <DiButton variant="neutral" rounded outline>
          {{ $t('variants.neutral') }}
        </DiButton>
        <DiButton variant="link" rounded outline>
          {{ $t('variants.link') }}
        </DiButton>
      </div>
    </PreviewCodeCard>

    <!-- Gradient Buttons -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.buttons.gradientButtons')"
      accent-color="#14b8a6"
      :code="gradientButtons"
      language="html"
    >
      <div class="flex flex-wrap gap-2">
        <DiButton variant="primary" gradient>
          {{ $t('variants.primary') }}
        </DiButton>
        <DiButton variant="secondary" gradient>
          {{ $t('variants.secondary') }}
        </DiButton>
        <DiButton variant="info" gradient>
          {{ $t('variants.info') }}
        </DiButton>
        <DiButton variant="success" gradient>
          {{ $t('variants.success') }}
        </DiButton>
        <DiButton variant="warning" gradient>
          {{ $t('variants.warning') }}
        </DiButton>
        <DiButton variant="error" gradient>
          {{ $t('variants.error') }}
        </DiButton>
        <DiButton variant="neutral" gradient>
          {{ $t('variants.neutral') }}
        </DiButton>
        <DiButton variant="link" gradient>
          {{ $t('variants.link') }}
        </DiButton>
      </div>
    </PreviewCodeCard>

    <!-- Gradient Rounded Buttons -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.buttons.gradientRoundedButtons')"
      accent-color="#14b8a6"
      :code="gradientRoundedButtons"
      language="html"
    >
      <div class="flex flex-wrap gap-2">
        <DiButton variant="primary" rounded gradient>
          {{ $t('variants.primary') }}
        </DiButton>
        <DiButton variant="secondary" rounded gradient>
          {{ $t('variants.secondary') }}
        </DiButton>
        <DiButton variant="info" rounded gradient>
          {{ $t('variants.info') }}
        </DiButton>
        <DiButton variant="success" rounded gradient>
          {{ $t('variants.success') }}
        </DiButton>
        <DiButton variant="warning" rounded gradient>
          {{ $t('variants.warning') }}
        </DiButton>
        <DiButton variant="error" rounded gradient>
          {{ $t('variants.error') }}
        </DiButton>
        <DiButton variant="neutral" rounded gradient>
          {{ $t('variants.neutral') }}
        </DiButton>
        <DiButton variant="link" rounded gradient>
          {{ $t('variants.link') }}
        </DiButton>
      </div>
    </PreviewCodeCard>

    <!-- Dash Buttons -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.buttons.dashButtons')"
      accent-color="#14b8a6"
      :code="dashButtons"
      language="html"
    >
      <div class="flex flex-wrap gap-2">
        <DiButton variant="primary" dash>
          {{ $t('variants.primary') }}
        </DiButton>
        <DiButton variant="secondary" dash>
          {{ $t('variants.secondary') }}
        </DiButton>
        <DiButton variant="info" dash>
          {{ $t('variants.info') }}
        </DiButton>
        <DiButton variant="success" dash>
          {{ $t('variants.success') }}
        </DiButton>
        <DiButton variant="warning" dash>
          {{ $t('variants.warning') }}
        </DiButton>
        <DiButton variant="error" dash>
          {{ $t('variants.error') }}
        </DiButton>
        <DiButton variant="neutral" dash>
          {{ $t('variants.neutral') }}
        </DiButton>
        <DiButton variant="link" dash>
          {{ $t('variants.link') }}
        </DiButton>
      </div>
    </PreviewCodeCard>

    <!-- Dash Rounded Buttons -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.buttons.dashRoundedButtons')"
      accent-color="#14b8a6"
      :code="dashRoundedButtons"
      language="html"
    >
      <div class="flex flex-wrap gap-2">
        <DiButton variant="primary" rounded dash>
          {{ $t('variants.primary') }}
        </DiButton>
        <DiButton variant="secondary" rounded dash>
          {{ $t('variants.secondary') }}
        </DiButton>
        <DiButton variant="info" rounded dash>
          {{ $t('variants.info') }}
        </DiButton>
        <DiButton variant="success" rounded dash>
          {{ $t('variants.success') }}
        </DiButton>
        <DiButton variant="warning" rounded dash>
          {{ $t('variants.warning') }}
        </DiButton>
        <DiButton variant="error" rounded dash>
          {{ $t('variants.error') }}
        </DiButton>
        <DiButton variant="neutral" rounded dash>
          {{ $t('variants.neutral') }}
        </DiButton>
        <DiButton variant="link" rounded dash>
          {{ $t('variants.link') }}
        </DiButton>
      </div>
    </PreviewCodeCard>

    <!-- HTML tags -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.buttons.htmlTags')"
      accent-color="#14b8a6"
      :code="htmlTags"
      language="html"
    >
      <div class="flex flex-wrap gap-2">
        <DiButton native-type="submit" variant="primary">
          {{ $t('variants.primary') }}
        </DiButton>
        <DiButton
          tag="input"
          native-type="button"
          variant="secondary"
          :value="$t('variants.secondary')"
        />
        <DiButton tag="input" native-type="submit" variant="info" value="Submit" />
        <DiButton tag="input" native-type="radio" variant="success" aria-label="Radio" />
        <DiButton tag="input" native-type="checkbox" variant="warning" aria-label="Checkbox" />
        <DiButton tag="input" native-type="reset" variant="error" value="Reset" />
        <DiButton tag="a" href="https://hosseinbajan.ir" role="button">
          {{ $t('variants.link') }}
        </DiButton>
      </div>
    </PreviewCodeCard>

    <!-- Disabled Buttons -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.buttons.disabledButtons')"
      accent-color="#14b8a6"
      :code="disabledButtons"
      language="html"
    >
      <div class="flex flex-wrap gap-2">
        <DiButton variant="primary" disabled>
          {{ $t('variants.primary') }}
        </DiButton>
        <DiButton variant="secondary" disabled>
          {{ $t('variants.secondary') }}
        </DiButton>
        <DiButton variant="info" disabled>
          {{ $t('variants.info') }}
        </DiButton>
        <DiButton variant="success" disabled>
          {{ $t('variants.success') }}
        </DiButton>
        <DiButton variant="warning" disabled>
          {{ $t('variants.warning') }}
        </DiButton>
        <DiButton variant="error" disabled>
          {{ $t('variants.error') }}
        </DiButton>
        <DiButton variant="neutral" disabled>
          {{ $t('variants.neutral') }}
        </DiButton>
        <DiButton variant="link" disabled>
          {{ $t('variants.link') }}
        </DiButton>
      </div>
    </PreviewCodeCard>

    <!-- Loading Buttons -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.buttons.loadingButtons')"
      accent-color="#14b8a6"
      :code="loadingButtons"
      language="html"
    >
      <div class="flex flex-wrap gap-2">
        <DiButton variant="primary" loading :loading-disabled="false">
          {{ $t('variants.primary') }}
        </DiButton>
        <DiButton variant="secondary" loading loading-variant="bars">
          {{ $t('variants.secondary') }}
        </DiButton>
        <DiButton variant="info" loading loading-variant="ball">
          {{ $t('variants.info') }}
        </DiButton>
        <DiButton variant="success" loading loading-variant="dots" :loading-disabled="false">
          {{ $t('variants.success') }}
        </DiButton>
        <DiButton variant="warning" loading loading-variant="ring">
          {{ $t('variants.warning') }}
        </DiButton>
        <DiButton variant="error" loading loading-variant="spinner">
          {{ $t('variants.error') }}
        </DiButton>
        <DiButton variant="neutral" loading>
          {{ $t('variants.neutral') }}
        </DiButton>
        <DiButton variant="link" loading loading-variant="infinity">
          {{ $t('variants.link') }}
        </DiButton>
      </div>
    </PreviewCodeCard>

    <!-- Wide Buttons -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.buttons.wideButtons')"
      accent-color="#14b8a6"
      :code="wideButtons"
      language="html"
    >
      <div class="flex flex-col gap-2">
        <DiButton variant="primary" wide>
          {{ $t('variants.primary') }} Wide
        </DiButton>
        <DiButton variant="secondary" wide>
          {{ $t('variants.secondary') }} Wide
        </DiButton>
      </div>
    </PreviewCodeCard>

    <!-- Icon Buttons -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.buttons.iconButtons')"
      accent-color="#14b8a6"
      :code="iconButtons"
      language="html"
    >
      <div class="flex flex-wrap gap-2">
        <DiButton variant="primary" square>
          <i-mdi:home class="text-lg" />
        </DiButton>
        <DiButton variant="secondary" square>
          <i-mdi:archive class="text-lg" />
        </DiButton>
        <DiButton variant="error" square>
          <i-mdi:cart class="text-lg" />
        </DiButton>
        <DiButton variant="warning" square>
          <i-mdi:calendar class="text-lg" />
        </DiButton>
      </div>
    </PreviewCodeCard>

    <!-- Icon Circle Buttons -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.buttons.iconCircleButtons')"
      accent-color="#14b8a6"
      :code="iconCircleButtons"
      language="html"
    >
      <div class="flex flex-wrap gap-2">
        <DiButton variant="ghost" circle>
          <i-mdi:home class="text-lg" />
        </DiButton>
        <DiButton variant="ghost" circle>
          <i-mdi:delete class="text-lg" />
        </DiButton>
        <DiButton variant="ghost" circle>
          <i-mdi:bell class="text-lg" />
        </DiButton>
        <DiButton variant="ghost" circle>
          <i-mdi:bookmark class="text-lg" />
        </DiButton>
      </div>
    </PreviewCodeCard>

    <!-- Icon Outline Circle Buttons -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.buttons.iconOutlineCircleButtons')"
      accent-color="#14b8a6"
      :code="iconOutlineCircleButtons"
      language="html"
    >
      <div class="flex flex-wrap gap-2">
        <DiButton variant="primary" circle outline>
          <i-mdi:phone class="text-lg" />
        </DiButton>
        <DiButton variant="info" circle outline>
          <i-mdi:magnify class="text-lg" />
        </DiButton>
        <DiButton variant="success" circle outline>
          <i-mdi:video class="text-lg" />
        </DiButton>
        <DiButton variant="error" circle outline>
          <i-mdi:image class="text-lg" />
        </DiButton>
      </div>
    </PreviewCodeCard>

    <!-- Block Buttons -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.buttons.blockButtons')"
      accent-color="#14b8a6"
      :code="blockButtons"
      language="html"
    >
      <div class="flex flex-col gap-2">
        <DiButton variant="primary" block>
          {{ $t('variants.primary') }} Block
        </DiButton>
      </div>
    </PreviewCodeCard>

    <!-- Button Sizes -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.buttons.buttonSizes')"
      accent-color="#14b8a6"
      :code="buttonSizes"
      language="html"
    >
      <div class="flex flex-wrap items-center gap-2">
        <DiButton variant="primary" size="xs">
          Extra Small
        </DiButton>
        <DiButton variant="primary" size="sm">
          Small
        </DiButton>
        <DiButton variant="primary" size="md">
          Medium
        </DiButton>
        <DiButton variant="primary" size="lg">
          Large
        </DiButton>
        <DiButton variant="primary" size="xl">
          Extra Large
        </DiButton>
      </div>
    </PreviewCodeCard>

    <!-- Button with Icon -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.buttons.buttonWithIcon')"
      accent-color="#14b8a6"
      :code="buttonWithIcon"
      language="html"
    >
      <div class="flex flex-wrap items-center gap-2">
        <DiButton variant="primary">
          <template #icon-left>
            <i-mdi:home class="text-lg" />
          </template>
          Home
        </DiButton>

        <DiButton variant="secondary">
          <template #icon-right>
            <i-mdi:cog class="text-lg" />
          </template>
          Settings
        </DiButton>

        <DiButton variant="success">
          <template #icon-left>
            <i-mdi:check class="text-lg" />
          </template>
          Success
        </DiButton>

        <DiButton variant="warning">
          <template #icon-right>
            <i-mdi:alert class="text-lg" />
          </template>
          Warning
        </DiButton>
      </div>
    </PreviewCodeCard>

    <!-- Social Login Buttons -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.buttons.socialButtons')"
      accent-color="#14b8a6"
      :code="socialButtons"
      language="html"
    >
      <div class="flex flex-wrap items-center gap-2">
        <DiButton social="google" wide>
          <template #icon-left>
            <i-logos:google-icon class="text-base" />
          </template>
          Continue with Google
        </DiButton>

        <DiButton social="github" wide>
          <template #icon-left>
            <i-mdi:github class="text-lg" />
          </template>
          Continue with GitHub
        </DiButton>

        <DiButton social="facebook" wide>
          <template #icon-left>
            <i-logos:facebook class="text-lg" />
          </template>
          Continue with Facebook
        </DiButton>

        <DiButton social="apple" wide>
          <template #icon-left>
            <i-ic:baseline-apple class="text-lg" />
          </template>
          Continue with Apple
        </DiButton>

        <DiButton social="x" wide>
          <template #icon-left>
            <i-fa7-brands:x-twitter class="text-lg" />
          </template>
          Continue with X
        </DiButton>

        <DiButton social="linkedin" wide>
          <template #icon-left>
            <i-mdi:linkedin class="text-lg" />
          </template>
          Continue with LinkedIn
        </DiButton>

        <DiButton social="slack" wide>
          <template #icon-left>
            <i-logos:slack-icon class="text-sm" />
          </template>
          Continue with Slack
        </DiButton>

        <DiButton social="microsoft" wide>
          <template #icon-left>
            <i-logos:microsoft-icon class="text-sm" />
          </template>
          Continue with Microsoft
        </DiButton>

        <DiButton social="line" wide>
          <template #icon-left>
            <i-fontisto:line class="text-base" />
          </template>
          Continue with LINE
        </DiButton>

        <DiButton social="wechat" wide>
          <template #icon-left>
            <i-ic:round-wechat class="text-lg" />
          </template>
          Continue with WeChat
        </DiButton>

        <DiButton social="kakao" wide>
          <template #icon-left>
            <i-simple-icons:kakaotalk class="text-lg" />
          </template>
          Continue with Kakao
        </DiButton>

        <DiButton social="amazon" wide loading loading-variant="infinity">
          <template #icon-left>
            <i-ri:amazon-fill class="text-lg" />
          </template>
          Continue with Amazon
        </DiButton>

        <DiButton social="vk" wide>
          <template #icon-left>
            <i-basil:vk-solid class="text-lg" />
          </template>
          Continue with VK
        </DiButton>

        <DiButton social="metamask" wide>
          <template #icon-left>
            <i-logos:metamask-icon class="text-sm" />
          </template>
          Continue with MetaMask
        </DiButton>
      </div>
    </PreviewCodeCard>

    <!-- Social Buttons -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.buttons.socialIconButtons')"
      accent-color="#14b8a6"
      :code="socialIconButtons"
      language="html"
    >
      <div class="flex flex-wrap items-center gap-2">
        <DiButton social="google" square>
          <i-logos:google-icon class="text-lg" />
        </DiButton>

        <DiButton social="github" square>
          <i-mdi:github class="text-lg" />
        </DiButton>

        <DiButton social="facebook" square>
          <i-logos:facebook class="text-lg" />
        </DiButton>

        <DiButton social="apple" square>
          <i-ic:baseline-apple class="text-lg" />
        </DiButton>

        <DiButton social="x" square>
          <i-fa7-brands:x-twitter class="text-lg" />
        </DiButton>

        <DiButton social="linkedin" square>
          <i-mdi:linkedin class="text-lg" />
        </DiButton>

        <DiButton social="slack" square>
          <i-logos:slack-icon class="text-base" />
        </DiButton>

        <DiButton social="microsoft" square>
          <i-logos:microsoft-icon class="text-base" />
        </DiButton>

        <DiButton social="line" square>
          <i-fontisto:line class="text-lg" />
        </DiButton>

        <DiButton social="wechat" square>
          <i-ic:round-wechat class="text-lg" />
        </DiButton>

        <DiButton social="kakao" square>
          <i-simple-icons:kakaotalk class="text-lg" />
        </DiButton>

        <DiButton social="amazon" square>
          <i-ri:amazon-fill class="text-lg" />
        </DiButton>

        <DiButton social="vk" square>
          <i-basil:vk-solid class="text-lg" />
        </DiButton>

        <DiButton social="metamask" square>
          <i-logos:metamask-icon class="text-base" />
        </DiButton>
      </div>
    </PreviewCodeCard>
  </div>
</template>
