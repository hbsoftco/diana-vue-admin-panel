<script setup lang="ts">
import DiCollapse from '@/shared/ui/base/DiCollapse.vue'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

const colors = ['primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error', 'neutral']

// Basic focus
const focusExample = `<DiCollapse title="How do I create an account?" type="focus" icon="arrow">
  Click the "Sign Up" button in the top right corner and follow the registration process.
</DiCollapse>`

// Checkbox
const checkboxExample = `<DiCollapse title="How do I create an account?" type="checkbox" icon="arrow">
  Click the "Sign Up" button in the top right corner and follow the registration process.
</DiCollapse>`

// Details/summary
const detailsExample = `<DiCollapse title="How do I create an account?" type="details" icon="arrow">
  Click the "Sign Up" button in the top right corner and follow the registration process.
</DiCollapse>`

// Icons
const iconsExample = `<div class="flex flex-col gap-2">
  <DiCollapse title="No icon (default)" icon="none">
    Click the "Sign Up" button in the top right corner and follow the registration process.
  </DiCollapse>
  <DiCollapse title="With arrow icon" icon="arrow">
    Click the "Sign Up" button in the top right corner and follow the registration process.
  </DiCollapse>
  <DiCollapse title="With plus/minus icon" icon="plus">
    Click the "Sign Up" button in the top right corner and follow the registration process.
  </DiCollapse>
</div>`

// Icon at start
const iconStartExample = `<DiCollapse title="Icon at the start" icon="arrow" :icon-start="true">
  Click the "Sign Up" button in the top right corner and follow the registration process.
</DiCollapse>`

// No border / no bg
const noBorderExample = `<div class="flex flex-col gap-2">
  <DiCollapse title="Without border and background" icon="arrow" :bordered="false" :bg="false">
    Click the "Sign Up" button in the top right corner and follow the registration process.
  </DiCollapse>
  <DiCollapse title="Without border only" icon="arrow" :bordered="false">
    Click the "Sign Up" button in the top right corner and follow the registration process.
  </DiCollapse>
</div>`

// Force open / close
const stateExample = `<div class="flex flex-col gap-2">
  <DiCollapse title="I have state open" icon="arrow" state="open">
    Click the "Sign Up" button in the top right corner and follow the registration process.
  </DiCollapse>
  <DiCollapse title="I have state close" icon="arrow" state="close">
    Click the "Sign Up" button in the top right corner and follow the registration process.
  </DiCollapse>
</div>`

// Colors
const colorsExample = `<div class="flex flex-col gap-2">
${colors
  .map(
    c => `  <DiCollapse title="${c}" icon="arrow" color="${c}">
    Click the "Sign Up" button in the top right corner and follow the registration process.
  </DiCollapse>`,
  )
  .join('\n')}
</div>`

// Custom title slot
const customTitleExample = `<DiCollapse icon="plus">
  <template #title>
    <span class="text-primary font-bold">Custom Title Slot</span>
  </template>
  Click the "Sign Up" button in the top right corner and follow the registration process.
</DiCollapse>`

// Multiple / FAQ
const faqExample = `<div class="flex flex-col gap-2">
  <DiCollapse title="What is your return policy?" icon="arrow" type="checkbox">
    You can return any item within 30 days of purchase for a full refund.
  </DiCollapse>
  <DiCollapse title="Do you offer customer support?" icon="arrow" type="checkbox">
    Yes, we offer 24/7 customer support via chat, email and phone.
  </DiCollapse>
  <DiCollapse title="How do I track my order?" icon="arrow" type="checkbox">
    Once your order ships, you will receive a tracking number via email.
  </DiCollapse>
  <DiCollapse title="Can I change my order after placing it?" icon="arrow" type="checkbox">
    Orders can be modified within 1 hour of placement by contacting support.
  </DiCollapse>
</div>`
</script>

<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 items-start">
    <!-- Focus Type -->
    <PreviewCodeCard
      :title="$t('features.advancedUi.collapses.focusType')"
      accent-color="#14b8a6"
      :code="focusExample"
      language="html"
    >
      <DiCollapse
        :title="$t('features.advancedUi.collapses.sampleTitle')"
        type="focus"
        icon="arrow"
      >
        {{ $t('features.advancedUi.collapses.sampleContent') }}
      </DiCollapse>
    </PreviewCodeCard>

    <!-- Checkbox Type -->
    <PreviewCodeCard
      :title="$t('features.advancedUi.collapses.checkboxType')"
      accent-color="#14b8a6"
      :code="checkboxExample"
      language="html"
    >
      <DiCollapse
        :title="$t('features.advancedUi.collapses.sampleTitle')"
        type="checkbox"
        icon="arrow"
      >
        {{ $t('features.advancedUi.collapses.sampleContent') }}
      </DiCollapse>
    </PreviewCodeCard>

    <!-- Details Type -->
    <PreviewCodeCard
      :title="$t('features.advancedUi.collapses.detailsType')"
      accent-color="#14b8a6"
      :code="detailsExample"
      language="html"
    >
      <DiCollapse
        :title="$t('features.advancedUi.collapses.sampleTitle')"
        type="details"
        icon="arrow"
      >
        {{ $t('features.advancedUi.collapses.sampleContent') }}
      </DiCollapse>
    </PreviewCodeCard>

    <!-- Icon Start -->
    <PreviewCodeCard
      :title="$t('features.advancedUi.collapses.iconStart')"
      accent-color="#14b8a6"
      :code="iconStartExample"
      language="html"
    >
      <DiCollapse
        :title="$t('features.advancedUi.collapses.sampleTitle')"
        icon="arrow"
        :icon-start="true"
      >
        {{ $t('features.advancedUi.collapses.sampleContent') }}
      </DiCollapse>
    </PreviewCodeCard>

    <!-- Icons -->
    <PreviewCodeCard
      :title="$t('features.advancedUi.collapses.iconTypes')"
      accent-color="#14b8a6"
      :code="iconsExample"
      language="html"
      class="lg:col-span-2"
    >
      <div class="flex flex-col gap-2">
        <DiCollapse :title="$t('features.advancedUi.collapses.noIcon')" icon="none">
          {{ $t('features.advancedUi.collapses.sampleContent') }}
        </DiCollapse>
        <DiCollapse :title="$t('features.advancedUi.collapses.arrowIcon')" icon="arrow">
          {{ $t('features.advancedUi.collapses.sampleContent') }}
        </DiCollapse>
        <DiCollapse :title="$t('features.advancedUi.collapses.plusIcon')" icon="plus">
          {{ $t('features.advancedUi.collapses.sampleContent') }}
        </DiCollapse>
      </div>
    </PreviewCodeCard>

    <!-- Colors -->
    <PreviewCodeCard
      :title="$t('features.advancedUi.collapses.collapseColors')"
      accent-color="#14b8a6"
      :code="colorsExample"
      language="html"
      class="lg:col-span-2"
    >
      <div class="flex flex-col gap-2">
        <DiCollapse v-for="c in colors" :key="c" :title="c" icon="arrow" :color="c">
          {{ $t('features.advancedUi.collapses.sampleContent') }}
        </DiCollapse>
      </div>
    </PreviewCodeCard>

    <!-- No Border / No Bg -->
    <PreviewCodeCard
      :title="$t('features.advancedUi.collapses.noBorder')"
      accent-color="#14b8a6"
      :code="noBorderExample"
      language="html"
      class="lg:col-span-2"
    >
      <div class="flex flex-col gap-2">
        <DiCollapse
          :title="$t('features.advancedUi.collapses.noBorderAndBg')"
          icon="arrow"
          :bordered="false"
          :bg="false"
        >
          {{ $t('features.advancedUi.collapses.sampleContent') }}
        </DiCollapse>
        <DiCollapse
          :title="$t('features.advancedUi.collapses.noBorderOnly')"
          icon="arrow"
          :bordered="false"
        >
          {{ $t('features.advancedUi.collapses.sampleContent') }}
        </DiCollapse>
      </div>
    </PreviewCodeCard>

    <!-- Force State -->
    <PreviewCodeCard
      :title="$t('features.advancedUi.collapses.forceState')"
      accent-color="#14b8a6"
      :code="stateExample"
      language="html"
      class="lg:col-span-2"
    >
      <div class="flex flex-col gap-2">
        <DiCollapse
          :title="$t('features.advancedUi.collapses.forceOpen')"
          icon="arrow"
          state="open"
        >
          {{ $t('features.advancedUi.collapses.sampleContent') }}
        </DiCollapse>
        <DiCollapse
          :title="$t('features.advancedUi.collapses.forceClose')"
          icon="arrow"
          state="close"
        >
          {{ $t('features.advancedUi.collapses.sampleContent') }}
        </DiCollapse>
      </div>
    </PreviewCodeCard>

    <!-- Custom Title Slot -->
    <PreviewCodeCard
      :title="$t('features.advancedUi.collapses.customTitle')"
      accent-color="#14b8a6"
      :code="customTitleExample"
      language="html"
    >
      <DiCollapse icon="plus">
        <template #title>
          <span class="text-primary font-bold">{{
            $t('features.advancedUi.collapses.customTitleSlot')
          }}</span>
        </template>
        {{ $t('features.advancedUi.collapses.sampleContent') }}
      </DiCollapse>
    </PreviewCodeCard>

    <!-- FAQ Example -->
    <PreviewCodeCard
      :title="$t('features.advancedUi.collapses.faqExample')"
      accent-color="#14b8a6"
      :code="faqExample"
      language="html"
      class="lg:col-span-2"
    >
      <div class="flex flex-col gap-2">
        <DiCollapse
          :title="$t('features.advancedUi.collapses.faq1Title')"
          icon="arrow"
          type="checkbox"
        >
          {{ $t('features.advancedUi.collapses.faq1Content') }}
        </DiCollapse>
        <DiCollapse
          :title="$t('features.advancedUi.collapses.faq2Title')"
          icon="arrow"
          type="checkbox"
        >
          {{ $t('features.advancedUi.collapses.faq2Content') }}
        </DiCollapse>
        <DiCollapse
          :title="$t('features.advancedUi.collapses.faq3Title')"
          icon="arrow"
          type="checkbox"
        >
          {{ $t('features.advancedUi.collapses.faq3Content') }}
        </DiCollapse>
        <DiCollapse
          :title="$t('features.advancedUi.collapses.faq4Title')"
          icon="arrow"
          type="checkbox"
        >
          {{ $t('features.advancedUi.collapses.faq4Content') }}
        </DiCollapse>
      </div>
    </PreviewCodeCard>
  </div>
</template>
