<script setup lang="ts">
import DiBadge from '@/shared/ui/base/DiBadge.vue'
import DiProgress from '@/shared/ui/base/DiProgress.vue'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

const basicCode = `<div class="space-y-3">
  <DiProgress class="w-full" variant="primary" aria-label="Loading" />
  <DiProgress class="w-full" :value="25" variant="primary" aria-label="25% complete" />
  <DiProgress class="w-full" :value="50" variant="primary" aria-label="50% complete" />
  <DiProgress class="w-full" :value="75" variant="primary" aria-label="75% complete" />
  <DiProgress class="w-full" :value="100" variant="primary" aria-label="Complete" />
</div>`

const colorsCode = `<div class="space-y-3">
  <DiProgress class="w-full" :value="20" variant="info" aria-label="20% complete" />
  <DiProgress class="w-full" :value="40" variant="warning" aria-label="40% complete" />
  <DiProgress class="w-full" :value="60" variant="secondary" aria-label="60% complete" />
  <DiProgress class="w-full" :value="80" variant="success" aria-label="80% complete" />
  <DiProgress class="w-full" :value="100" variant="error" aria-label="Complete" />
</div>`

const stripedCode = `<div class="space-y-3">
  <DiProgress class="w-full" :value="10" variant="primary" pattern="striped" aria-label="10% complete" />
  <DiProgress class="w-full" :value="25" variant="info" pattern="striped" aria-label="25% complete" />
  <DiProgress class="w-full" :value="50" variant="success" pattern="striped" aria-label="50% complete" />
  <DiProgress class="w-full" :value="75" variant="secondary" pattern="striped" aria-label="75% complete" />
  <DiProgress class="w-full" :value="100" variant="warning" pattern="striped" aria-label="Complete" />
</div>`

const heightsCode = `<div class="space-y-4">
  <DiProgress class="w-full" :value="10" size="xs" variant="primary" aria-label="Extra small" />
  <DiProgress class="w-full" :value="25" size="sm" variant="primary" aria-label="Small" />
  <DiProgress class="w-full" :value="50" size="md" variant="primary" aria-label="Medium" />
  <DiProgress class="w-full" :value="75" size="lg" variant="primary" aria-label="Large" />
  <DiProgress class="w-full" :value="100" size="xl" variant="primary" aria-label="Extra large" />
</div>`

const labelsCode = `<div class="space-y-4">
  <DiProgress class="w-full" :value="10" variant="primary" show-value aria-label="10% complete" />
  <DiProgress class="w-full" :value="20" variant="info" show-value aria-label="20% complete" />
  <DiProgress class="w-full" :value="40" variant="success" show-value aria-label="40% complete" />
  <DiProgress class="w-full" :value="60" variant="secondary" show-value aria-label="60% complete" />
  <DiProgress class="w-full" :value="80" variant="warning" show-value aria-label="80% complete" />
</div>`

const verticalCode = `<div class="flex h-36 items-center justify-around">
  <DiProgress :value="20" size="xs" orientation="vertical" variant="primary" aria-label="20% complete" />
  <DiProgress :value="40" size="lg" orientation="vertical" variant="primary" aria-label="40% complete" />
  <DiProgress :value="25" size="md" orientation="vertical" variant="primary" show-value aria-label="25% complete" />
  <DiProgress :value="65" size="sm" orientation="vertical" variant="primary" pattern="striped" aria-label="65% complete" />
  <DiProgress :value="80" size="xl" orientation="vertical" variant="primary" pattern="striped" aria-label="80% complete" />
</div>`

const animatedCode = `<div class="space-y-3">
  <DiProgress class="w-full" :value="10" variant="primary" pattern="striped" animated aria-label="10% complete" />
  <DiProgress class="w-full" :value="25" variant="info" pattern="striped" animated aria-label="25% complete" />
  <DiProgress class="w-full" :value="50" variant="success" pattern="striped" animated aria-label="50% complete" />
  <DiProgress class="w-full" :value="75" variant="secondary" pattern="striped" animated aria-label="75% complete" />
  <DiProgress class="w-full" :value="100" variant="warning" pattern="striped" animated aria-label="Complete" />
</div>`

const determinateCode = `<div class="space-y-5">
  <DiProgress class="w-full" :value="50" size="xs" variant="primary" aria-label="50% complete" />
  <DiProgress class="w-full" :value="50" size="xs" variant="info" aria-label="50% complete" />
  <DiProgress class="w-full" :value="50" size="xs" variant="success" aria-label="50% complete" />
  <DiProgress class="w-full" :value="50" size="xs" variant="warning" aria-label="50% complete" />
</div>`

const dottedCode = `<div class="space-y-4">
  <DiProgress class="w-full" :value="55" variant="primary" pattern="dotted" animated aria-label="55% complete" />
  <DiProgress class="w-full" :value="55" variant="info" pattern="dotted" animated aria-label="55% complete" />
  <DiProgress class="w-full" :value="55" variant="success" pattern="dotted" animated aria-label="55% complete" />
  <DiProgress class="w-full" :value="55" variant="secondary" pattern="dotted" animated aria-label="55% complete" />
  <DiProgress class="w-full" :value="55" variant="warning" pattern="dotted" animated aria-label="55% complete" />
</div>`

const namedCode = `<div class="space-y-8">
  <div class="flex items-center gap-3">
    <DiBadge class="min-w-20" variant="primary" size="sm">Mobile</DiBadge>
    <DiProgress class="w-full" :value="50" variant="primary" label-position="end" aria-label="Mobile 50%">
      <template #value-label="{ percentage }">
        <DiBadge class="-translate-y-5" variant="primary" size="sm">{{ Math.round(percentage) }}%</DiBadge>
      </template>
    </DiProgress>
  </div>
  <div class="flex items-center gap-3">
    <DiBadge class="min-w-20" variant="info" size="sm">Watches</DiBadge>
    <DiProgress class="w-full" :value="60" variant="info" label-position="end" aria-label="Watches 60%">
      <template #value-label="{ percentage }">
        <DiBadge class="-translate-y-5" variant="info" size="sm">{{ Math.round(percentage) }}%</DiBadge>
      </template>
    </DiProgress>
  </div>
  <div class="flex items-center gap-3">
    <DiBadge class="min-w-20" variant="success" size="sm">Shirts</DiBadge>
    <DiProgress class="w-full" :value="70" variant="success" label-position="end" aria-label="Shirts 70%">
      <template #value-label="{ percentage }">
        <DiBadge class="-translate-y-5" variant="success" size="sm">{{ Math.round(percentage) }}%</DiBadge>
      </template>
    </DiProgress>
  </div>
</div>`

const markersCode = `<div class="space-y-7">
  <DiProgress class="w-full" :value="50" :markers="[25]" variant="primary" aria-label="50% complete" />
  <DiProgress class="w-full" :value="60" :markers="[25, 50]" variant="info" aria-label="60% complete" />
  <DiProgress class="w-full" :value="70" :markers="[25, 50]" variant="success" aria-label="70% complete" />
  <DiProgress class="w-full" :value="80" :markers="[25, 50, 75]" variant="secondary" aria-label="80% complete" />
  <DiProgress class="w-full" :value="90" :markers="[25, 50, 75]" variant="warning" aria-label="90% complete" />
</div>`

const outlinedLabelsCode = `<div class="space-y-10 py-2">
  <DiProgress class="w-full" :value="50" size="xs" variant="primary" label-position="end" aria-label="50% complete">
    <template #value-label="{ percentage }">
      <span class="rounded-full border border-primary bg-base-100 px-2 py-0.5 text-primary">{{ Math.round(percentage) }}%</span>
    </template>
  </DiProgress>
  <DiProgress class="w-full" :value="60" size="xs" variant="info" label-position="end" aria-label="60% complete">
    <template #value-label="{ percentage }">
      <span class="rounded-full border border-info bg-base-100 px-2 py-0.5 text-info">{{ Math.round(percentage) }}%</span>
    </template>
  </DiProgress>
  <DiProgress class="w-full" :value="70" size="xs" variant="success" label-position="end" aria-label="70% complete">
    <template #value-label="{ percentage }">
      <span class="rounded-full border border-success bg-base-100 px-2 py-0.5 text-success">{{ Math.round(percentage) }}%</span>
    </template>
  </DiProgress>
</div>`
</script>

<template>
  <div class="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
    <PreviewCodeCard
      :title="$t('features.uiElements.progress.basic')"
      :code="basicCode"
      language="html"
    >
      <div class="space-y-3">
        <DiProgress class="w-full" variant="primary" aria-label="Loading" />
        <DiProgress class="w-full" :value="25" variant="primary" aria-label="25% complete" />
        <DiProgress class="w-full" :value="50" variant="primary" aria-label="50% complete" />
        <DiProgress class="w-full" :value="75" variant="primary" aria-label="75% complete" />
        <DiProgress class="w-full" :value="100" variant="primary" aria-label="Complete" />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.progress.colors')"
      :code="colorsCode"
      language="html"
    >
      <div class="space-y-3">
        <DiProgress class="w-full" :value="20" variant="info" aria-label="20% complete" />
        <DiProgress class="w-full" :value="40" variant="warning" aria-label="40% complete" />
        <DiProgress class="w-full" :value="60" variant="secondary" aria-label="60% complete" />
        <DiProgress class="w-full" :value="80" variant="success" aria-label="80% complete" />
        <DiProgress class="w-full" :value="100" variant="error" aria-label="Complete" />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.progress.striped')"
      :code="stripedCode"
      language="html"
    >
      <div class="space-y-3">
        <DiProgress
          class="w-full"
          :value="10"
          variant="primary"
          pattern="striped"
          aria-label="10% complete"
        />
        <DiProgress
          class="w-full"
          :value="25"
          variant="info"
          pattern="striped"
          aria-label="25% complete"
        />
        <DiProgress
          class="w-full"
          :value="50"
          variant="success"
          pattern="striped"
          aria-label="50% complete"
        />
        <DiProgress
          class="w-full"
          :value="75"
          variant="secondary"
          pattern="striped"
          aria-label="75% complete"
        />
        <DiProgress
          class="w-full"
          :value="100"
          variant="warning"
          pattern="striped"
          aria-label="Complete"
        />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.progress.heights')"
      :code="heightsCode"
      language="html"
    >
      <div class="space-y-4">
        <DiProgress
          class="w-full"
          :value="10"
          size="xs"
          variant="primary"
          aria-label="Extra small"
        />
        <DiProgress class="w-full" :value="25" size="sm" variant="primary" aria-label="Small" />
        <DiProgress class="w-full" :value="50" size="md" variant="primary" aria-label="Medium" />
        <DiProgress class="w-full" :value="75" size="lg" variant="primary" aria-label="Large" />
        <DiProgress
          class="w-full"
          :value="100"
          size="xl"
          variant="primary"
          aria-label="Extra large"
        />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.progress.labels')"
      :code="labelsCode"
      language="html"
    >
      <div class="space-y-4">
        <DiProgress
          class="w-full"
          :value="10"
          variant="primary"
          show-value
          aria-label="10% complete"
        />
        <DiProgress
          class="w-full"
          :value="20"
          variant="info"
          show-value
          aria-label="20% complete"
        />
        <DiProgress
          class="w-full"
          :value="40"
          variant="success"
          show-value
          aria-label="40% complete"
        />
        <DiProgress
          class="w-full"
          :value="60"
          variant="secondary"
          show-value
          aria-label="60% complete"
        />
        <DiProgress
          class="w-full"
          :value="80"
          variant="warning"
          show-value
          aria-label="80% complete"
        />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.progress.vertical')"
      :code="verticalCode"
      language="html"
    >
      <div class="flex h-36 items-center justify-around">
        <DiProgress
          :value="20"
          size="xs"
          orientation="vertical"
          variant="primary"
          aria-label="20% complete"
        />
        <DiProgress
          :value="40"
          size="lg"
          orientation="vertical"
          variant="primary"
          aria-label="40% complete"
        />
        <DiProgress
          :value="25"
          size="md"
          orientation="vertical"
          variant="primary"
          show-value
          aria-label="25% complete"
        />
        <DiProgress
          :value="65"
          size="sm"
          orientation="vertical"
          variant="primary"
          pattern="striped"
          aria-label="65% complete"
        />
        <DiProgress
          :value="80"
          size="xl"
          orientation="vertical"
          variant="primary"
          pattern="striped"
          aria-label="80% complete"
        />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.progress.animatedStriped')"
      :code="animatedCode"
      language="html"
    >
      <div class="space-y-3">
        <DiProgress
          class="w-full"
          :value="10"
          variant="primary"
          pattern="striped"
          animated
          aria-label="10% complete"
        />
        <DiProgress
          class="w-full"
          :value="25"
          variant="info"
          pattern="striped"
          animated
          aria-label="25% complete"
        />
        <DiProgress
          class="w-full"
          :value="50"
          variant="success"
          pattern="striped"
          animated
          aria-label="50% complete"
        />
        <DiProgress
          class="w-full"
          :value="75"
          variant="secondary"
          pattern="striped"
          animated
          aria-label="75% complete"
        />
        <DiProgress
          class="w-full"
          :value="100"
          variant="warning"
          pattern="striped"
          animated
          aria-label="Complete"
        />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.progress.determinate')"
      :code="determinateCode"
      language="html"
    >
      <div class="space-y-5">
        <DiProgress
          class="w-full"
          :value="50"
          size="xs"
          variant="primary"
          aria-label="50% complete"
        />
        <DiProgress class="w-full" :value="50" size="xs" variant="info" aria-label="50% complete" />
        <DiProgress
          class="w-full"
          :value="50"
          size="xs"
          variant="success"
          aria-label="50% complete"
        />
        <DiProgress
          class="w-full"
          :value="50"
          size="xs"
          variant="warning"
          aria-label="50% complete"
        />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.progress.customAnimated')"
      :code="dottedCode"
      language="html"
    >
      <div class="space-y-4">
        <DiProgress
          class="w-full"
          :value="55"
          variant="primary"
          pattern="dotted"
          animated
          aria-label="55% complete"
        />
        <DiProgress
          class="w-full"
          :value="55"
          variant="info"
          pattern="dotted"
          animated
          aria-label="55% complete"
        />
        <DiProgress
          class="w-full"
          :value="55"
          variant="success"
          pattern="dotted"
          animated
          aria-label="55% complete"
        />
        <DiProgress
          class="w-full"
          :value="55"
          variant="secondary"
          pattern="dotted"
          animated
          aria-label="55% complete"
        />
        <DiProgress
          class="w-full"
          :value="55"
          variant="warning"
          pattern="dotted"
          animated
          aria-label="55% complete"
        />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.progress.named')"
      :code="namedCode"
      language="html"
    >
      <div class="space-y-8">
        <div class="flex items-center gap-3">
          <DiBadge class="min-w-20" variant="primary" size="sm">
            Mobile
          </DiBadge>
          <DiProgress
            class="w-full"
            :value="50"
            variant="primary"
            label-position="end"
            aria-label="Mobile 50%"
          >
            <template #value-label="{ percentage }">
              <DiBadge class="-translate-y-5" variant="primary" size="sm">
                {{ Math.round(percentage) }}%
              </DiBadge>
            </template>
          </DiProgress>
        </div>
        <div class="flex items-center gap-3">
          <DiBadge class="min-w-20" variant="info" size="sm">
            Watches
          </DiBadge>
          <DiProgress
            class="w-full"
            :value="60"
            variant="info"
            label-position="end"
            aria-label="Watches 60%"
          >
            <template #value-label="{ percentage }">
              <DiBadge class="-translate-y-5" variant="info" size="sm">
                {{ Math.round(percentage) }}%
              </DiBadge>
            </template>
          </DiProgress>
        </div>
        <div class="flex items-center gap-3">
          <DiBadge class="min-w-20" variant="success" size="sm">
            Shirts
          </DiBadge>
          <DiProgress
            class="w-full"
            :value="70"
            variant="success"
            label-position="end"
            aria-label="Shirts 70%"
          >
            <template #value-label="{ percentage }">
              <DiBadge class="-translate-y-5" variant="success" size="sm">
                {{ Math.round(percentage) }}%
              </DiBadge>
            </template>
          </DiProgress>
        </div>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.progress.markers')"
      :code="markersCode"
      language="html"
    >
      <div class="space-y-7">
        <DiProgress
          class="w-full"
          :value="50"
          :markers="[25]"
          variant="primary"
          aria-label="50% complete"
        />
        <DiProgress
          class="w-full"
          :value="60"
          :markers="[25, 50]"
          variant="info"
          aria-label="60% complete"
        />
        <DiProgress
          class="w-full"
          :value="70"
          :markers="[25, 50]"
          variant="success"
          aria-label="70% complete"
        />
        <DiProgress
          class="w-full"
          :value="80"
          :markers="[25, 50, 75]"
          variant="secondary"
          aria-label="80% complete"
        />
        <DiProgress
          class="w-full"
          :value="90"
          :markers="[25, 50, 75]"
          variant="warning"
          aria-label="90% complete"
        />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.progress.outlinedLabels')"
      :code="outlinedLabelsCode"
      language="html"
    >
      <div class="space-y-10 py-2">
        <DiProgress
          class="w-full"
          :value="50"
          size="xs"
          variant="primary"
          label-position="end"
          aria-label="50% complete"
        >
          <template #value-label="{ percentage }">
            <span class="rounded-full border border-primary bg-base-100 px-2 py-0.5 text-primary">{{ Math.round(percentage) }}%</span>
          </template>
        </DiProgress>
        <DiProgress
          class="w-full"
          :value="60"
          size="xs"
          variant="info"
          label-position="end"
          aria-label="60% complete"
        >
          <template #value-label="{ percentage }">
            <span class="rounded-full border border-info bg-base-100 px-2 py-0.5 text-info">{{ Math.round(percentage) }}%</span>
          </template>
        </DiProgress>
        <DiProgress
          class="w-full"
          :value="70"
          size="xs"
          variant="success"
          label-position="end"
          aria-label="70% complete"
        >
          <template #value-label="{ percentage }">
            <span class="rounded-full border border-success bg-base-100 px-2 py-0.5 text-success">{{ Math.round(percentage) }}%</span>
          </template>
        </DiProgress>
      </div>
    </PreviewCodeCard>
  </div>
</template>
