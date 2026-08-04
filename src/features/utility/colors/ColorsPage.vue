<script setup lang="ts">
import DiAlert from '@/shared/ui/base/DiAlert.vue'
import DiBadge from '@/shared/ui/base/DiBadge.vue'
import DiButton from '@/shared/ui/base/DiButton.vue'
import DiCard from '@/shared/ui/base/DiCard.vue'
import DiProgress from '@/shared/ui/base/DiProgress.vue'
import { DiInput } from '@/shared/ui/base/input'

import {
  borderColors,
  contentColors,
  opacityColors,
  semanticColors,
  semanticVariants,
  surfaceColors,
  textColors,
} from './data/colorTokens'
import ColorSection from './ui/ColorSection.vue'
import ColorSwatch from './ui/ColorSwatch.vue'
</script>

<template>
  <div class="space-y-6">
    <ColorSection
      :title="$t('features.utility.colors.semanticColors')"
      :description="$t('features.utility.colors.semanticDescription')"
    >
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <ColorSwatch v-for="token in semanticColors" :key="token.name" :token="token" />
      </div>
    </ColorSection>

    <ColorSection
      :title="$t('features.utility.colors.surfaces')"
      :description="$t('features.utility.colors.surfacesDescription')"
    >
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <ColorSwatch v-for="token in surfaceColors" :key="token.name" :token="token" />
      </div>
    </ColorSection>

    <ColorSection
      :title="$t('features.utility.colors.textColors')"
      :description="$t('features.utility.colors.textDescription')"
    >
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <ColorSwatch v-for="token in textColors" :key="token.name" :token="token" />
      </div>
    </ColorSection>

    <ColorSection
      :title="$t('features.utility.colors.borderColors')"
      :description="$t('features.utility.colors.borderDescription')"
    >
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <ColorSwatch v-for="token in borderColors" :key="token.name" :token="token" />
      </div>
    </ColorSection>

    <ColorSection
      :title="$t('features.utility.colors.contentColors')"
      :description="$t('features.utility.colors.contentDescription')"
    >
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <ColorSwatch v-for="token in contentColors" :key="token.name" :token="token" />
      </div>
    </ColorSection>

    <ColorSection
      :title="$t('features.utility.colors.opacity')"
      :description="$t('features.utility.colors.opacityDescription')"
    >
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div
          v-for="item in opacityColors"
          :key="item.label"
          class="rounded-box border border-base-300 bg-base-100 p-3"
        >
          <div
            class="flex min-h-24 items-center justify-center rounded-box text-lg font-semibold text-base-content"
            :class="item.previewClass"
          >
            {{ item.label }}
          </div>
          <code class="mt-3 block text-center text-xs text-primary">{{ item.utility }}</code>
        </div>
      </div>
    </ColorSection>

    <ColorSection
      :title="$t('features.utility.colors.componentUsage')"
      :description="$t('features.utility.colors.componentDescription')"
    >
      <div class="grid items-start gap-4 xl:grid-cols-2">
        <DiCard border shadow="none" body-class="gap-4">
          <template #title>
            {{ $t('features.utility.colors.actionsAndStatus') }}
          </template>
          <div class="flex flex-wrap gap-2">
            <DiButton
              v-for="variant in semanticVariants"
              :key="variant"
              :variant="variant"
              size="sm"
            >
              {{ variant }}
            </DiButton>
          </div>
          <div class="flex flex-wrap gap-2">
            <DiBadge v-for="variant in semanticVariants" :key="variant" :variant="variant">
              {{ variant }}
            </DiBadge>
          </div>
          <div class="space-y-3">
            <DiProgress
              v-for="(variant, index) in semanticVariants"
              :key="variant"
              :variant="variant"
              :value="(index + 1) * 11"
            />
          </div>
        </DiCard>

        <DiCard border shadow="none" body-class="gap-4">
          <template #title>
            {{ $t('features.utility.colors.feedbackAndInput') }}
          </template>
          <DiAlert variant="info" soft show-icon>
            {{ $t('features.utility.colors.infoMessage') }}
          </DiAlert>
          <DiAlert variant="success" soft show-icon>
            {{ $t('features.utility.colors.successMessage') }}
          </DiAlert>
          <DiInput
            :label="$t('features.utility.colors.inputLabel')"
            :placeholder="$t('features.utility.colors.inputPlaceholder')"
            :helper-text="$t('features.utility.colors.inputHelp')"
          />
        </DiCard>
      </div>
    </ColorSection>
  </div>
</template>
