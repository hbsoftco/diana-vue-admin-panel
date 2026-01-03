<script setup lang="ts">
import DiIcon from '@/shared/ui/base/DiIcon.vue'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
const colors = ['default', 'primary', 'success', 'warning', 'error', 'muted']

// Examples by size
const sizeExamples = `<div class="flex flex-wrap gap-4 items-center">
${sizes.map(s => `  <DiIcon name="moon" size="${s}" />`).join('\n')}
</div>`

// Examples by color
const colorExamples = `<div class="flex flex-wrap gap-4 items-center">
${colors.map(c => `  <DiIcon name="sun" size="lg" color="${c}" />`).join('\n')}
</div>`

// Spin & Pulse examples
const animateExamples = `<div class="flex flex-wrap gap-4 items-center">
  <DiIcon name="sun" size="lg" spin />
  <DiIcon name="bell" size="lg" pulse />
</div>`

// Rotate & Flip examples
const transformExamples = `<div class="flex flex-wrap gap-4 items-center">
  <DiIcon name="heart" size="lg" :rotate="45" />
  <DiIcon name="heart" size="lg" flip />
  <DiIcon name="heart" size="lg" :rotate="90" flip />
</div>`

// Badge examples
const badgeExamples = `<div class="flex flex-wrap gap-4 items-center">
  <DiIcon name="bell" size="lg" :badge="3" />
  <DiIcon name="sun" size="lg" badge="Hot" badge-variant="secondary" />
  <DiIcon name="star" size="lg" badge="!" badge-variant="warning" badge-pill />
</div>`

// Custom examples
const customExamples = `<div class="flex flex-wrap gap-2 items-center">
  <DiIcon name="bell" size="2rem" />
  <DiIcon name="heart" color="orange" size="xl" />
  <DiIcon name="camera" color="#14b8a6" size="25px" />
  <DiIcon name="calendarDays" color="warning" size="lg" title="Calendar" />
  <DiIcon name="sun" color="warning" spin size="3rem" title="Calendar" />
  <DiIcon name="bell" size="2rem" :rotate="180" />
</div>`
</script>

<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 items-start">
    <!-- Size Examples -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.icons.iconSizes')"
      accent-color="#14b8a6"
      :code="sizeExamples"
      language="html"
    >
      <div class="flex flex-wrap gap-4 items-center">
        <DiIcon v-for="s in sizes" :key="s" name="moon" :size="s" />
      </div>
    </PreviewCodeCard>

    <!-- Color Examples -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.icons.iconColors')"
      accent-color="#14b8a6"
      :code="colorExamples"
      language="html"
    >
      <div class="flex flex-wrap gap-4 items-center">
        <DiIcon v-for="c in colors" :key="c" name="sun" size="lg" :color="c" />
      </div>
    </PreviewCodeCard>

    <!-- Spin & Pulse -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.icons.spinAndPulse')"
      accent-color="#14b8a6"
      :code="animateExamples"
      language="html"
    >
      <div class="flex flex-wrap gap-4 items-center">
        <DiIcon name="sun" size="lg" spin />
        <DiIcon name="bell" size="lg" pulse />
      </div>
    </PreviewCodeCard>

    <!-- Rotate & Flip -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.icons.rotateAndFlip')"
      accent-color="#14b8a6"
      :code="transformExamples"
      language="html"
    >
      <div class="flex flex-wrap gap-4 items-center">
        <DiIcon name="heart" size="lg" :rotate="45" />
        <DiIcon name="heart" size="lg" flip />
        <DiIcon name="heart" size="lg" :rotate="90" flip />
      </div>
    </PreviewCodeCard>

    <!-- Badges -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.icons.iconsWithBadges')"
      accent-color="#14b8a6"
      :code="badgeExamples"
      language="html"
      class="lg:col-span-2"
    >
      <div class="flex flex-wrap gap-4 items-center">
        <DiIcon name="bell" size="lg" :badge="3" />
        <DiIcon name="sun" size="lg" badge="Hot" badge-variant="secondary" class="mx-6" />
        <DiIcon name="star" size="lg" badge="!" badge-variant="warning" badge-pill />
      </div>
    </PreviewCodeCard>

    <!-- Custom Icons -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.icons.customIcons')"
      accent-color="#14b8a6"
      :code="customExamples"
      language="html"
      class="lg:col-span-2"
    >
      <div class="flex flex-wrap gap-2 items-center">
        <DiIcon name="bell" size="2rem" />
        <DiIcon name="heart" color="orange" size="xl" />
        <DiIcon name="camera" color="#14b8a6" size="25px" />
        <DiIcon name="calendarDays" color="warning" size="lg" title="Calendar" />
        <DiIcon name="sun" color="warning" spin size="3rem" title="Calendar" />
        <DiIcon name="bell" size="2rem" :rotate="180" />
      </div>
    </PreviewCodeCard>
  </div>
</template>
