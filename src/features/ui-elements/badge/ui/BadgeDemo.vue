<script setup lang="ts">
import DiBadge from '@/shared/ui/base/DiBadge.vue'
import DiButton from '@/shared/ui/base/DiButton.vue'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

const defaultBadges = `<div class="flex flex-wrap gap-2 items-center">
  <DiBadge>Badge</DiBadge>
</div>`

const badgeSizes = `<div class="flex flex-wrap gap-2 items-center">
  <DiBadge size="xs">XSmall</DiBadge>
  <DiBadge size="sm">Small</DiBadge>
  <DiBadge size="md">Medium</DiBadge>
  <DiBadge size="lg">Large</DiBadge>
  <DiBadge size="xl">XLarge</DiBadge>
</div>`

const coloredBadges = `<div class="flex flex-wrap gap-2 items-center">
  <DiBadge variant="primary" size="sm">Primary</DiBadge>
  <DiBadge variant="secondary" size="sm">Secondary</DiBadge>
  <DiBadge variant="accent" size="sm">Accent</DiBadge>
  <DiBadge variant="neutral" size="sm">Neutral</DiBadge>
  <DiBadge variant="info" size="sm">Info</DiBadge>
  <DiBadge variant="success" size="sm">Success</DiBadge>
  <DiBadge variant="warning" size="sm">Warning</DiBadge>
  <DiBadge variant="error" size="sm">Error</DiBadge>
</div>`

const coloredPillBadges = `<div class="flex flex-wrap gap-2 items-center">
  <DiBadge variant="primary" pill size="sm">Primary</DiBadge>
  <DiBadge variant="secondary" pill size="sm">Secondary</DiBadge>
  <DiBadge variant="accent" pill size="sm">Accent</DiBadge>
  <DiBadge variant="neutral" pill size="sm">Neutral</DiBadge>
  <DiBadge variant="info" pill size="sm">Info</DiBadge>
  <DiBadge variant="success" pill size="sm">Success</DiBadge>
  <DiBadge variant="warning" pill size="sm">Warning</DiBadge>
  <DiBadge variant="error" pill size="sm">Error</DiBadge>
</div>`

const softBadges = `<div class="flex flex-wrap gap-2 items-center">
  <DiBadge variant="primary" soft>Primary</DiBadge>
  <DiBadge variant="secondary" soft>Secondary</DiBadge>
  <DiBadge variant="accent" soft>Accent</DiBadge>
  <DiBadge variant="info" soft>Info</DiBadge>
  <DiBadge variant="success" soft>Success</DiBadge>
  <DiBadge variant="warning" soft>Warning</DiBadge>
  <DiBadge variant="error" soft>Error</DiBadge>
</div>`

const softPillBadges = `<div class="flex flex-wrap gap-2 items-center">
  <DiBadge variant="primary" pill soft>Primary</DiBadge>
  <DiBadge variant="secondary" pill soft>Secondary</DiBadge>
  <DiBadge variant="accent" pill soft>Accent</DiBadge>
  <DiBadge variant="info" pill soft>Info</DiBadge>
  <DiBadge variant="success" pill soft>Success</DiBadge>
  <DiBadge variant="warning" pill soft>Warning</DiBadge>
  <DiBadge variant="error" pill soft>Error</DiBadge>
</div>`

const outlineBadges = `<div class="flex flex-wrap gap-2 items-center">
  <DiBadge variant="primary" outline>Primary</DiBadge>
  <DiBadge variant="secondary" outline>Secondary</DiBadge>
  <DiBadge variant="accent" outline>Accent</DiBadge>
  <DiBadge variant="info" outline>Info</DiBadge>
  <DiBadge variant="success" outline>Success</DiBadge>
  <DiBadge variant="warning" outline>Warning</DiBadge>
  <DiBadge variant="error" outline>Error</DiBadge>
</div>`

const outlinePillBadges = `<div class="flex flex-wrap gap-2 items-center">
  <DiBadge variant="primary" outline pill>Primary</DiBadge>
  <DiBadge variant="secondary" outline pill>Secondary</DiBadge>
  <DiBadge variant="accent" outline pill>Accent</DiBadge>
  <DiBadge variant="info" outline pill>Info</DiBadge>
  <DiBadge variant="success" outline pill>Success</DiBadge>
  <DiBadge variant="warning" outline pill>Warning</DiBadge>
  <DiBadge variant="error" outline pill>Error</DiBadge>
</div>`

const dashBadges = `<div class="flex flex-wrap gap-2 items-center">
  <DiBadge variant="primary" dash>Primary</DiBadge>
  <DiBadge variant="secondary" dash>Secondary</DiBadge>
  <DiBadge variant="accent" dash>Accent</DiBadge>
  <DiBadge variant="info" dash>Info</DiBadge>
  <DiBadge variant="success" dash>Success</DiBadge>
  <DiBadge variant="warning" dash>Warning</DiBadge>
  <DiBadge variant="error" dash>Error</DiBadge>
</div>`

const dashPillBadges = `<div class="flex flex-wrap gap-2 items-center">
  <DiBadge variant="primary" dash pill>Primary</DiBadge>
  <DiBadge variant="secondary" dash pill>Secondary</DiBadge>
  <DiBadge variant="accent" dash pill>Accent</DiBadge>
  <DiBadge variant="info" dash pill>Info</DiBadge>
  <DiBadge variant="success" dash pill>Success</DiBadge>
  <DiBadge variant="warning" dash pill>Warning</DiBadge>
  <DiBadge variant="error" dash pill>Error</DiBadge>
</div>`

const ghostBadge = `<div class="flex flex-wrap gap-2 items-center">
  <DiBadge variant="ghost">Ghost</DiBadge>
</div>`

const emptyBadges = `<div class="flex flex-wrap gap-2 items-center">
  <DiBadge variant="primary" size="lg" />
  <DiBadge variant="primary" size="md" />
  <DiBadge variant="primary" size="sm" />
  <DiBadge variant="primary" size="xs" />
</div>`

const badgeWithIcons = `<div class="flex flex-wrap gap-2 items-center">
  <DiBadge variant="info">
    <template #icon-left>
      <i-heroicons-information-circle class="text-sm" />
    </template>
    Info
  </DiBadge>
  <DiBadge variant="success" pill>
    <template #icon-left>
      <i-heroicons-check-circle class="text-sm" />
    </template>
    Success
  </DiBadge>
  <DiBadge variant="warning">
    <template #icon-left>
      <i-heroicons-exclamation-triangle class="text-sm" />
    </template>
    Warning
  </DiBadge>
  <DiBadge variant="secondary" pill outline>
    <template #icon-left>
      <i-heroicons-exclamation-triangle class="text-sm" />
    </template>
    Secondary
  </DiBadge>
  <DiBadge variant="accent" dash>
    <template #icon-left>
      <i-heroicons-exclamation-triangle class="text-sm" />
    </template>
    Accent
  </DiBadge>
  <DiBadge variant="error">
    <template #icon-left>
      <i-heroicons-x-circle class="text-sm" />
    </template>
    Error
  </DiBadge>
  <DiBadge variant="neutral" pill>
    <template #icon-left>
      <i-heroicons-check-circle class="text-sm" />
    </template>
    Neutral
  </DiBadge>
  <DiBadge variant="error" dash pill>
    <template #icon-left>
      <i-heroicons-x-circle class="text-sm" />
    </template>
    Error
  </DiBadge>
  <DiBadge variant="success" soft>
    <template #icon-left>
      <i-heroicons-check-circle class="text-sm" />
    </template>
    Success
  </DiBadge>
</div>`

const badgeInText = `<div class="flex flex-col gap-3">
  <h1 class="text-xl font-semibold">
    Heading 1 <DiBadge size="xl">Badge</DiBadge>
  </h1>
  <h2 class="text-lg font-semibold">
    Heading 2 <DiBadge size="lg">Badge</DiBadge>
  </h2>
  <h3 class="text-base font-semibold">
    Heading 3 <DiBadge size="md">Badge</DiBadge>
  </h3>
  <h4 class="text-sm font-semibold">
    Heading 4 <DiBadge size="sm">Badge</DiBadge>
  </h4>
  <h5 class="text-xs font-semibold">
    Heading 5 <DiBadge size="xs">Badge</DiBadge>
  </h5>
  <p class="text-xs">
    Paragraph <DiBadge size="xs">Badge</DiBadge>
  </p>
</div>`

const defaultButtons = `<div class="flex flex-wrap gap-2">
  <DiButton
    variant="primary"
    badge-position="right"
    badge-value="32"
    badge-outline
    badge-variant="warning"
    badge-size="sm"
  >
    Primary
  </DiButton>
  <DiButton
    variant="info"
    badge-position="right"
    badge-value="Hot"
    badge-variant="error"
    badge-size="sm"
  >
    Info
  </DiButton>
  <DiButton
    variant="warning"
    badge-position="left"
    badge-value="New"
    badge-variant="info"
    badge-size="sm"
  >
    Warning
  </DiButton>
  <DiButton
    variant="warning"
    dash
    badge-position="left"
    badge-value="21"
    badge-variant="error"
    badge-size="sm"
    rounded
  >
    Warning
  </DiButton>
  <DiButton
    variant="neutral"
    badge-position="left"
    badge-dash
    badge-value="122"
    badge-variant="primary"
    badge-size="sm"
  >
    Neutral
  </DiButton>
  <DiButton
    variant="success"
    dash
    rounded
    badge-position="left"
    badge-dash
    badge-value="122"
    badge-variant="error"
    badge-size="sm"
  >
    Success
  </DiButton>
  <DiButton
    variant="error"
    rounded
    badge-position="right"
    badge-value="2421"
    badge-pill
    badge-variant="info"
    badge-size="xs"
  >
    Error
  </DiButton>
  <DiButton
    outline
    rounded
    variant="secondary"
    badge-position="right"
    badge-value="New"
    badge-variant="secondary"
    badge-pill
  >
    Secondary
  </DiButton>
  <DiButton variant="link">
    Link
  </DiButton>
</div>`
</script>

<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 items-start">
    <!-- Badge Sizes -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.badge.badgeSizes')"
      accent-color="#14b8a6"
      :code="badgeSizes"
      language="html"
    >
      <div class="flex flex-wrap gap-2 items-center">
        <DiBadge size="xs">
          XSmall
        </DiBadge>
        <DiBadge size="sm">
          Small
        </DiBadge>
        <DiBadge size="md">
          Medium
        </DiBadge>
        <DiBadge size="lg">
          Large
        </DiBadge>
        <DiBadge size="xl">
          XLarge
        </DiBadge>
      </div>
    </PreviewCodeCard>

    <!-- Empty Badges -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.badge.emptyBadges')"
      accent-color="#14b8a6"
      :code="emptyBadges"
      language="html"
    >
      <div class="flex flex-wrap gap-2 items-center">
        <DiBadge variant="primary" size="lg" />
        <DiBadge variant="primary" size="md" />
        <DiBadge variant="primary" size="sm" />
        <DiBadge variant="primary" size="xs" />
      </div>
    </PreviewCodeCard>

    <!-- Normal Colored Badges -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.badge.coloredBadges')"
      accent-color="#14b8a6"
      :code="coloredBadges"
      language="html"
    >
      <div class="flex flex-wrap gap-2 items-center">
        <DiBadge variant="primary" size="sm">
          {{ $t('variants.primary') }}
        </DiBadge>
        <DiBadge variant="secondary" size="sm">
          {{ $t('variants.secondary') }}
        </DiBadge>
        <DiBadge variant="accent" size="sm">
          {{ $t('variants.accent') }}
        </DiBadge>
        <DiBadge variant="neutral" size="sm">
          {{ $t('variants.neutral') }}
        </DiBadge>
        <DiBadge variant="info" size="sm">
          {{ $t('variants.info') }}
        </DiBadge>
        <DiBadge variant="success" size="sm">
          {{ $t('variants.success') }}
        </DiBadge>
        <DiBadge variant="warning" size="sm">
          {{ $t('variants.warning') }}
        </DiBadge>
        <DiBadge variant="error" size="sm">
          {{ $t('variants.error') }}
        </DiBadge>
      </div>
    </PreviewCodeCard>

    <!-- Pill Colored Badges -->
    <PreviewCodeCard
      :title="`${$t('features.ui-elements.badge.coloredBadges')} (Pill)`"
      accent-color="#14b8a6"
      :code="coloredPillBadges"
      language="html"
    >
      <div class="flex flex-wrap gap-2 items-center">
        <DiBadge variant="primary" pill size="sm">
          {{ $t('variants.primary') }}
        </DiBadge>
        <DiBadge variant="secondary" pill size="sm">
          {{ $t('variants.secondary') }}
        </DiBadge>
        <DiBadge variant="accent" pill size="sm">
          {{ $t('variants.accent') }}
        </DiBadge>
        <DiBadge variant="neutral" pill size="sm">
          {{ $t('variants.neutral') }}
        </DiBadge>
        <DiBadge variant="info" pill size="sm">
          {{ $t('variants.info') }}
        </DiBadge>
        <DiBadge variant="success" pill size="sm">
          {{ $t('variants.success') }}
        </DiBadge>
        <DiBadge variant="warning" pill size="sm">
          {{ $t('variants.warning') }}
        </DiBadge>
        <DiBadge variant="error" pill size="sm">
          {{ $t('variants.error') }}
        </DiBadge>
      </div>
    </PreviewCodeCard>

    <!-- Normal Soft Badges -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.badge.softBadges')"
      accent-color="#14b8a6"
      :code="softBadges"
      language="html"
    >
      <div class="flex flex-wrap gap-2 items-center">
        <DiBadge variant="primary" soft size="sm">
          {{ $t('variants.primary') }}
        </DiBadge>
        <DiBadge variant="secondary" soft size="sm">
          {{ $t('variants.secondary') }}
        </DiBadge>
        <DiBadge variant="accent" soft size="sm">
          {{ $t('variants.accent') }}
        </DiBadge>
        <DiBadge variant="info" soft size="sm">
          {{ $t('variants.info') }}
        </DiBadge>
        <DiBadge variant="success" soft size="sm">
          {{ $t('variants.success') }}
        </DiBadge>
        <DiBadge variant="warning" soft size="sm">
          {{ $t('variants.warning') }}
        </DiBadge>
        <DiBadge variant="error" soft size="sm">
          {{ $t('variants.error') }}
        </DiBadge>
      </div>
    </PreviewCodeCard>

    <!-- Pill Soft Badges -->
    <PreviewCodeCard
      :title="`${$t('features.ui-elements.badge.softBadges')} (Pill)`"
      accent-color="#14b8a6"
      :code="softPillBadges"
      language="html"
    >
      <div class="flex flex-wrap gap-2 items-center">
        <DiBadge variant="primary" pill soft size="sm">
          {{ $t('variants.primary') }}
        </DiBadge>
        <DiBadge variant="secondary" pill soft size="sm">
          {{ $t('variants.secondary') }}
        </DiBadge>
        <DiBadge variant="accent" pill soft size="sm">
          {{ $t('variants.accent') }}
        </DiBadge>
        <DiBadge variant="info" pill soft size="sm">
          {{ $t('variants.info') }}
        </DiBadge>
        <DiBadge variant="success" pill soft size="sm">
          {{ $t('variants.success') }}
        </DiBadge>
        <DiBadge variant="warning" pill soft size="sm">
          {{ $t('variants.warning') }}
        </DiBadge>
        <DiBadge variant="error" pill soft size="sm">
          {{ $t('variants.error') }}
        </DiBadge>
      </div>
    </PreviewCodeCard>

    <!-- Normal Outline Badges -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.badge.outlineBadges')"
      accent-color="#14b8a6"
      :code="outlineBadges"
      language="html"
    >
      <div class="flex flex-wrap gap-2 items-center">
        <DiBadge variant="primary" outline size="sm">
          {{ $t('variants.primary') }}
        </DiBadge>
        <DiBadge variant="secondary" outline size="sm">
          {{ $t('variants.secondary') }}
        </DiBadge>
        <DiBadge variant="accent" outline size="sm">
          {{ $t('variants.accent') }}
        </DiBadge>
        <DiBadge variant="info" outline size="sm">
          {{ $t('variants.info') }}
        </DiBadge>
        <DiBadge variant="success" outline size="sm">
          {{ $t('variants.success') }}
        </DiBadge>
        <DiBadge variant="warning" outline size="sm">
          {{ $t('variants.warning') }}
        </DiBadge>
        <DiBadge variant="error" outline size="sm">
          {{ $t('variants.error') }}
        </DiBadge>
      </div>
    </PreviewCodeCard>

    <!-- Pill Outline Badges -->
    <PreviewCodeCard
      :title="`${$t('features.ui-elements.badge.outlineBadges')} (Pill)`"
      accent-color="#14b8a6"
      :code="outlinePillBadges"
      language="html"
    >
      <div class="flex flex-wrap gap-2 items-center">
        <DiBadge variant="primary" outline pill size="sm">
          {{ $t('variants.primary') }}
        </DiBadge>
        <DiBadge variant="secondary" outline pill size="sm">
          {{ $t('variants.secondary') }}
        </DiBadge>
        <DiBadge variant="accent" outline pill size="sm">
          {{ $t('variants.accent') }}
        </DiBadge>
        <DiBadge variant="info" outline pill size="sm">
          {{ $t('variants.info') }}
        </DiBadge>
        <DiBadge variant="success" outline pill size="sm">
          {{ $t('variants.success') }}
        </DiBadge>
        <DiBadge variant="warning" outline pill size="sm">
          {{ $t('variants.warning') }}
        </DiBadge>
        <DiBadge variant="error" outline pill size="sm">
          {{ $t('variants.error') }}
        </DiBadge>
      </div>
    </PreviewCodeCard>

    <!-- Normal Dash Badges -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.badge.dashBadges')"
      accent-color="#14b8a6"
      :code="dashBadges"
      language="html"
    >
      <div class="flex flex-wrap gap-2 items-center">
        <DiBadge variant="primary" dash size="sm">
          {{ $t('variants.primary') }}
        </DiBadge>
        <DiBadge variant="secondary" dash size="sm">
          {{ $t('variants.secondary') }}
        </DiBadge>
        <DiBadge variant="accent" dash size="sm">
          {{ $t('variants.accent') }}
        </DiBadge>
        <DiBadge variant="info" dash size="sm">
          {{ $t('variants.info') }}
        </DiBadge>
        <DiBadge variant="success" dash size="sm">
          {{ $t('variants.success') }}
        </DiBadge>
        <DiBadge variant="warning" dash size="sm">
          {{ $t('variants.warning') }}
        </DiBadge>
        <DiBadge variant="error" dash size="sm">
          {{ $t('variants.error') }}
        </DiBadge>
      </div>
    </PreviewCodeCard>

    <!-- Pill Dash Badges -->
    <PreviewCodeCard
      :title="`${$t('features.ui-elements.badge.dashBadges')} (Pill)`"
      accent-color="#14b8a6"
      :code="dashPillBadges"
      language="html"
    >
      <div class="flex flex-wrap gap-2 items-center">
        <DiBadge variant="primary" dash pill size="sm">
          {{ $t('variants.primary') }}
        </DiBadge>
        <DiBadge variant="secondary" dash pill size="sm">
          {{ $t('variants.secondary') }}
        </DiBadge>
        <DiBadge variant="accent" dash pill size="sm">
          {{ $t('variants.accent') }}
        </DiBadge>
        <DiBadge variant="info" dash pill size="sm">
          {{ $t('variants.info') }}
        </DiBadge>
        <DiBadge variant="success" dash pill size="sm">
          {{ $t('variants.success') }}
        </DiBadge>
        <DiBadge variant="warning" dash pill size="sm">
          {{ $t('variants.warning') }}
        </DiBadge>
        <DiBadge variant="error" dash pill size="sm">
          {{ $t('variants.error') }}
        </DiBadge>
      </div>
    </PreviewCodeCard>

    <!-- Ghost Badge -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.badge.ghostBadge')"
      accent-color="#14b8a6"
      :code="ghostBadge"
      language="html"
    >
      <div class="flex flex-wrap gap-2 items-center">
        <DiBadge variant="ghost">
          Ghost
        </DiBadge>
      </div>
    </PreviewCodeCard>

    <!-- Default Badge -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.badge.defaultBadge')"
      accent-color="#14b8a6"
      :code="defaultBadges"
      language="html"
    >
      <div class="flex flex-wrap gap-2 items-center">
        <DiBadge>Badge</DiBadge>
      </div>
    </PreviewCodeCard>

    <!-- Default Buttons -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.buttons.defaultButtons')"
      accent-color="#14b8a6"
      :code="defaultButtons"
      language="html"
    >
      <div class="flex flex-wrap gap-2">
        <DiButton
          variant="primary"
          badge-position="right"
          badge-value="32"
          badge-outline
          badge-variant="warning"
          badge-size="sm"
        >
          Messages
        </DiButton>
        <DiButton
          variant="info"
          badge-position="right"
          badge-value="Hot"
          badge-variant="error"
          badge-size="sm"
        >
          Badge Buttons
        </DiButton>
        <DiButton
          variant="warning"
          badge-position="left"
          badge-value="New"
          badge-variant="info"
          badge-size="sm"
        >
          {{ $t('variants.warning') }}
        </DiButton>
        <DiButton
          variant="warning"
          dash
          badge-position="left"
          badge-value="21"
          badge-variant="error"
          badge-size="sm"
          rounded
        >
          {{ $t('variants.warning') }}
        </DiButton>
        <DiButton
          variant="neutral"
          rounded
          badge-position="left"
          badge-value="New"
          badge-variant="error"
          badge-size="lg"
          badge-pill
          badge-dash
        >
          Notifications
        </DiButton>
        <DiButton
          variant="success"
          dash
          rounded
          badge-position="left"
          badge-value="122"
          badge-variant="success"
          badge-size="sm"
        >
          {{ $t('variants.success') }}
        </DiButton>
        <DiButton
          variant="error"
          rounded
          badge-position="right"
          badge-value="242"
          badge-variant="neutral"
          badge-size="xl"
        >
          {{ $t('variants.error') }}
        </DiButton>
        <DiButton
          outline
          rounded
          variant="secondary"
          badge-position="right"
          badge-value="New"
          badge-variant="secondary"
          badge-pill
        >
          {{ $t('variants.secondary') }}
        </DiButton>
        <DiButton variant="link">
          {{ $t('variants.link') }}
        </DiButton>
      </div>
    </PreviewCodeCard>

    <!-- Badge with Icons -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.badge.badgeWithIcons')"
      accent-color="#14b8a6"
      :code="badgeWithIcons"
      language="html"
      class="lg:col-span-2"
    >
      <div class="flex flex-wrap gap-2 items-center">
        <DiBadge variant="info">
          <template #icon-left>
            <i-heroicons-information-circle class="text-sm" />
          </template>
          {{ $t('variants.info') }}
        </DiBadge>
        <DiBadge variant="success" pill>
          <template #icon-left>
            <i-heroicons-check-circle class="text-sm" />
          </template>
          {{ $t('variants.success') }}
        </DiBadge>
        <DiBadge variant="warning">
          <template #icon-left>
            <i-heroicons-exclamation-triangle class="text-sm" />
          </template>
          {{ $t('variants.warning') }}
        </DiBadge>
        <DiBadge variant="secondary" pill outline>
          <template #icon-left>
            <i-heroicons-exclamation-triangle class="text-sm" />
          </template>
          {{ $t('variants.secondary') }}
        </DiBadge>
        <DiBadge variant="accent" dash>
          <template #icon-left>
            <i-heroicons-exclamation-triangle class="text-sm" />
          </template>
          {{ $t('variants.accent') }}
        </DiBadge>
        <DiBadge variant="error">
          <template #icon-left>
            <i-heroicons-x-circle class="text-sm" />
          </template>
          {{ $t('variants.error') }}
        </DiBadge>
        <DiBadge variant="neutral" pill>
          <template #icon-left>
            <i-heroicons-check-circle class="text-sm" />
          </template>
          {{ $t('variants.neutral') }}
        </DiBadge>
        <DiBadge variant="error" dash pill>
          <template #icon-left>
            <i-heroicons-x-circle class="text-sm" />
          </template>
          {{ $t('variants.error') }}
        </DiBadge>
        <DiBadge variant="success" soft>
          <template #icon-left>
            <i-heroicons-check-circle class="text-sm" />
          </template>
          {{ $t('variants.success') }}
        </DiBadge>
        <DiBadge variant="warning" dash pill>
          <template #icon-right>
            <i-heroicons-exclamation-triangle class="text-sm" />
          </template>
          {{ $t('variants.warning') }}
        </DiBadge>
        <DiBadge variant="info" outline pill>
          <template #icon-right>
            <i-heroicons-information-circle class="text-sm" />
          </template>
          {{ $t('variants.info') }}
        </DiBadge>
      </div>
    </PreviewCodeCard>

    <!-- Badge in Text -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.badge.badgeInText')"
      accent-color="#14b8a6"
      :code="badgeInText"
      language="html"
      class="lg:col-span-2"
    >
      <div class="flex flex-col gap-3">
        <h1 class="text-xl font-semibold">
          Heading 1 <DiBadge size="xl">
            Badge
          </DiBadge>
        </h1>
        <h2 class="text-lg font-semibold">
          Heading 2 <DiBadge size="lg">
            Badge
          </DiBadge>
        </h2>
        <h3 class="text-base font-semibold">
          Heading 3 <DiBadge size="md">
            Badge
          </DiBadge>
        </h3>
        <h4 class="text-sm font-semibold">
          Heading 4 <DiBadge size="sm">
            Badge
          </DiBadge>
        </h4>
        <h5 class="text-xs font-semibold">
          Heading 5 <DiBadge size="xs">
            Badge
          </DiBadge>
        </h5>
        <p class="text-xs">
          Paragraph <DiBadge size="xs">
            Badge
          </DiBadge>
        </p>
      </div>
    </PreviewCodeCard>
  </div>
</template>
