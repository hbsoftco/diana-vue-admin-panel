<script setup lang="ts">
import DiSkeleton from '@/shared/ui/base/DiSkeleton.vue'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
const colors = [
  'default',
  'primary',
  'secondary',
  'accent',
  'info',
  'success',
  'warning',
  'error',
  'neutral',
]

// Examples by size
const sizeExamples = `<div class="flex flex-wrap gap-4 items-end">
${sizes.map(s => `  <DiSkeleton size="${s}" />`).join('\n')}
</div>`

// Examples by color
const colorExamples = `<div class="flex flex-wrap gap-4 items-center">
${colors.map(c => `  <DiSkeleton size="md" color="${c}" />`).join('\n')}
</div>`

// Examples by shape
const shapeExamples = `<div class="flex flex-wrap gap-4 items-center">
  <DiSkeleton size="md" shape="rectangle" />
  <DiSkeleton size="md" shape="circle" />
  <DiSkeleton size="md" rounded="rounded-xl" />
</div>`

// Avatar card example
const avatarCardExamples = `<div class="flex w-52 flex-col gap-4">
  <div class="flex items-center gap-4">
    <DiSkeleton size="md" shape="circle" />
    <div class="flex flex-col gap-2">
      <DiSkeleton width="5rem" height="1rem" />
      <DiSkeleton width="7rem" height="1rem" />
    </div>
  </div>
  <DiSkeleton width="100%" height="8rem" />
</div>`

// Image card example
const imageCardExamples = `<div class="flex w-52 flex-col gap-4">
  <DiSkeleton width="100%" height="8rem" />
  <DiSkeleton width="7rem" height="1rem" />
  <DiSkeleton width="100%" height="1rem" />
  <DiSkeleton width="100%" height="1rem" />
</div>`

// Text variant example
const textExamples = `<div class="flex flex-col gap-2">
  <DiSkeleton text>AI is thinking harder...</DiSkeleton>
  <DiSkeleton text>Loading your content right now...</DiSkeleton>
</div>`

// Custom size examples
const customExamples = `<div class="flex flex-wrap gap-4 items-center">
  <DiSkeleton size="60px" shape="circle" />
  <DiSkeleton width="10rem" height="2rem" />
  <DiSkeleton size="80px" rounded="rounded-2xl" />
  <DiSkeleton width="100%" height="4rem" rounded="rounded-lg" />
</div>`
</script>

<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 items-start">
    <!-- Size Examples -->
    <PreviewCodeCard
      :title="$t('features.advanced-ui.skeletons.skeletonSizes')"
      accent-color="#14b8a6"
      :code="sizeExamples"
      language="html"
    >
      <div class="flex flex-wrap gap-4 items-end">
        <DiSkeleton v-for="s in sizes" :key="s" :size="s" />
      </div>
    </PreviewCodeCard>

    <!-- Shape Examples -->
    <PreviewCodeCard
      :title="$t('features.advanced-ui.skeletons.skeletonShapes')"
      accent-color="#14b8a6"
      :code="shapeExamples"
      language="html"
    >
      <div class="flex flex-wrap gap-4 items-center">
        <DiSkeleton size="md" shape="rectangle" />
        <DiSkeleton size="md" shape="circle" />
        <DiSkeleton size="md" rounded="rounded-xl" />
      </div>
    </PreviewCodeCard>

    <!-- Color Examples -->
    <PreviewCodeCard
      :title="$t('features.advanced-ui.skeletons.skeletonColors')"
      accent-color="#14b8a6"
      :code="colorExamples"
      language="html"
      class="lg:col-span-2"
    >
      <div class="flex flex-wrap gap-4 items-center">
        <DiSkeleton v-for="c in colors" :key="c" size="md" :color="c" />
      </div>
    </PreviewCodeCard>

    <!-- Avatar Card -->
    <PreviewCodeCard
      :title="$t('features.advanced-ui.skeletons.avatarCard')"
      accent-color="#14b8a6"
      :code="avatarCardExamples"
      language="html"
    >
      <div class="flex w-52 flex-col gap-4">
        <div class="flex items-center gap-4">
          <DiSkeleton size="md" shape="circle" />
          <div class="flex flex-col gap-2">
            <DiSkeleton width="5rem" height="1rem" />
            <DiSkeleton width="7rem" height="1rem" />
          </div>
        </div>
        <DiSkeleton width="100%" height="8rem" />
      </div>
    </PreviewCodeCard>

    <!-- Image Card -->
    <PreviewCodeCard
      :title="$t('features.advanced-ui.skeletons.imageCard')"
      accent-color="#14b8a6"
      :code="imageCardExamples"
      language="html"
    >
      <div class="flex w-52 flex-col gap-4">
        <DiSkeleton width="100%" height="8rem" />
        <DiSkeleton width="7rem" height="1rem" />
        <DiSkeleton width="100%" height="1rem" />
        <DiSkeleton width="100%" height="1rem" />
      </div>
    </PreviewCodeCard>

    <!-- Text Variant -->
    <PreviewCodeCard
      :title="$t('features.advanced-ui.skeletons.skeletonText')"
      accent-color="#14b8a6"
      :code="textExamples"
      language="html"
    >
      <div class="flex flex-col gap-2">
        <DiSkeleton text>
          AI is thinking harder...
        </DiSkeleton>
        <DiSkeleton text>
          Loading your content right now...
        </DiSkeleton>
      </div>
    </PreviewCodeCard>

    <!-- Custom Sizes -->
    <PreviewCodeCard
      :title="$t('features.advanced-ui.skeletons.customSkeletons')"
      accent-color="#14b8a6"
      :code="customExamples"
      language="html"
    >
      <div class="flex flex-wrap gap-4 items-center">
        <DiSkeleton size="60px" shape="circle" />
        <DiSkeleton width="10rem" height="2rem" />
        <DiSkeleton size="80px" rounded="rounded-2xl" />
        <DiSkeleton width="100%" height="4rem" rounded="rounded-lg" />
      </div>
    </PreviewCodeCard>
  </div>
</template>
