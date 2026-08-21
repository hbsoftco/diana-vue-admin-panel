<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import type { Variant } from '@/shared/types/models'

import DiCheckbox from '@/shared/ui/base/checkbox/DiCheckbox.vue'
import DiButtonGroup from '@/shared/ui/base/DiButtonGroup.vue'
import DiIcon from '@/shared/ui/base/DiIcon.vue'
import DiSwitch from '@/shared/ui/base/DiSwitch.vue'
import DiToggleButton from '@/shared/ui/base/DiToggleButton.vue'
import DiRadio from '@/shared/ui/base/radio/DiRadio.vue'
import DiRadioGroup from '@/shared/ui/base/radio/DiRadioGroup.vue'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

const { t } = useI18n()
const defaultRadio = ref<string | null>('checked')
const stackedRadio = ref<string | null>('second')
const inlineRadio = ref<string | null>('first')
const toggleRadio = ref<string | null>('first')
const singleToggle = ref(false)
const checkedToggle = ref(true)
const favoriteChecked = ref(false)
const starredChecked = ref(true)
const controlSizes = ['xs', 'sm', 'md', 'lg'] as const
const switchSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const
const allVariants: Variant[] = [
  'primary',
  'secondary',
  'accent',
  'warning',
  'info',
  'success',
  'error',
  'neutral',
]
const referenceVariants: Variant[] = [
  'primary',
  'secondary',
  'warning',
  'info',
  'success',
  'error',
  'neutral',
]
const variantLabels = computed<Record<Variant, string>>(() => ({
  primary: t('features.forms.checksRadios.variants.primary'),
  secondary: t('features.forms.checksRadios.variants.secondary'),
  accent: t('features.forms.checksRadios.variants.accent'),
  warning: t('features.forms.checksRadios.variants.warning'),
  info: t('features.forms.checksRadios.variants.info'),
  success: t('features.forms.checksRadios.variants.success'),
  error: t('features.forms.checksRadios.variants.error'),
  neutral: t('features.forms.checksRadios.variants.neutral'),
}))
const defaultRadioOptions = computed(() => [
  { label: t('features.forms.checksRadios.labels.defaultRadio'), value: 'default' },
  { label: t('features.forms.checksRadios.labels.checkedRadio'), value: 'checked' },
])
const inlineRadioOptions = computed(() => [
  { label: t('features.forms.checksRadios.labels.first'), value: 'first' },
  { label: t('features.forms.checksRadios.labels.second'), value: 'second' },
  { label: t('features.forms.checksRadios.labels.disabled'), value: 'disabled', disabled: true },
])

const codes = {
  checks:
    '<DiCheckbox label="Default checkbox" />\n<DiCheckbox :model-value="true" label="Checked checkbox" />',
  disabledChecks:
    '<DiCheckbox disabled label="Disabled checkbox" />\n<DiCheckbox :model-value="true" disabled label="Disabled checked checkbox" />',
  radios: '<DiRadioGroup v-model="value" :options="options" orientation="horizontal" />',
  disabledRadios:
    '<DiRadio value="disabled" disabled label="Disabled radio" />\n<DiRadio model-value="checked" value="checked" disabled label="Disabled checked radio" />',
  stacked: '<DiRadioGroup v-model="value" :options="options" />',
  switches:
    '<DiSwitch label="Default switch" label-position="end" />\n<DiSwitch :model-value="true" label="Checked switch" label-position="end" />',
  checkboxSizes: '<DiCheckbox v-for="size in sizes" :size="size" :label="size.toUpperCase()" />',
  radioSizes:
    '<DiRadio v-for="size in sizes" value="selected" :size="size" :label="size.toUpperCase()" />',
  switchSizes:
    '<DiSwitch v-for="size in sizes" :model-value="true" :size="size" aria-label="Sized switch" />',
  inline:
    '<div class="flex flex-wrap gap-x-6 gap-y-3">\n  <DiCheckbox label="First" />\n  <DiCheckbox label="Second" />\n</div>',
  withoutLabels:
    '<DiCheckbox aria-label="Select this row" />\n<DiRadio value="compact" aria-label="Use compact layout" />',
  radioToggleButtons:
    '<DiButtonGroup>\n  <DiToggleButton v-model="value" type="radio" value="first" name="mode" label="First" />\n  <DiToggleButton v-model="value" type="radio" value="second" name="mode" label="Second" />\n</DiButtonGroup>',
  checkboxToggleButtons: '<DiToggleButton v-model="enabled" label="Single toggle" />',
  coloredCheckboxes:
    '<DiCheckbox v-for="variant in variants" :model-value="true" size="xs" :variant="variant" :label="variant" />',
  coloredRadios:
    '<DiRadio v-for="variant in variants" model-value="selected" value="selected" size="xs" :variant="variant" :label="variant" />',
  switchColors:
    '<DiSwitch v-for="variant in variants" :model-value="true" size="xs" :variant="variant" :label="variant" label-position="end" />',
  iconCheckboxes:
    '<DiCheckbox v-model="favorite" appearance="icon" label="Favorite">\n  <template #icon><DiIcon name="heart" /></template>\n  <template #checked-icon><DiIcon name="heartBold" /></template>\n</DiCheckbox>',
  minimalSwitches: '<DiSwitch appearance="minimal" size="sm" variant="primary" label="Primary" />',
  labeledSwitches:
    '<DiSwitch :model-value="true" appearance="labeled" variant="primary" label="Primary" label-position="end" />',
} as const
</script>

<template>
  <div class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-12">
    <PreviewCodeCard
      :title="$t('features.forms.checksRadios.sections.checks')"
      class="xl:col-span-4"
      :code="codes.checks"
      language="html"
    >
      <div class="flex flex-col items-start gap-3">
        <DiCheckbox :label="$t('features.forms.checksRadios.labels.defaultCheckbox')" />
        <DiCheckbox
          :model-value="true"
          :label="$t('features.forms.checksRadios.labels.checkedCheckbox')"
        />
      </div>
    </PreviewCodeCard>
    <PreviewCodeCard
      :title="$t('features.forms.checksRadios.sections.disabledChecks')"
      class="xl:col-span-4"
      :code="codes.disabledChecks"
      language="html"
    >
      <div class="flex flex-col items-start gap-3">
        <DiCheckbox disabled :label="$t('features.forms.checksRadios.labels.disabledCheckbox')" />
        <DiCheckbox
          :model-value="true"
          disabled
          :label="$t('features.forms.checksRadios.labels.disabledChecked')"
        />
      </div>
    </PreviewCodeCard>
    <PreviewCodeCard
      :title="$t('features.forms.checksRadios.sections.radios')"
      class="xl:col-span-4"
      :code="codes.radios"
      language="html"
    >
      <DiRadioGroup
        v-model="defaultRadio"
        :options="defaultRadioOptions"
        orientation="horizontal"
      />
    </PreviewCodeCard>
    <PreviewCodeCard
      :title="$t('features.forms.checksRadios.sections.disabledRadios')"
      class="xl:col-span-4"
      :code="codes.disabledRadios"
      language="html"
    >
      <div class="flex flex-col items-start gap-3">
        <DiRadio
          model-value="none"
          value="disabled"
          disabled
          :label="$t('features.forms.checksRadios.labels.disabledRadio')"
        />
        <DiRadio
          model-value="checked"
          value="checked"
          disabled
          :label="$t('features.forms.checksRadios.labels.disabledCheckedRadio')"
        />
      </div>
    </PreviewCodeCard>
    <PreviewCodeCard
      :title="$t('features.forms.checksRadios.sections.stacked')"
      class="xl:col-span-4"
      :code="codes.stacked"
      language="html"
    >
      <DiRadioGroup v-model="stackedRadio" :options="inlineRadioOptions" />
    </PreviewCodeCard>
    <PreviewCodeCard
      :title="$t('features.forms.checksRadios.sections.switches')"
      class="xl:col-span-4"
      :code="codes.switches"
      language="html"
    >
      <div class="flex flex-col items-start gap-3">
        <DiSwitch
          :label="$t('features.forms.checksRadios.labels.defaultSwitch')"
          label-position="end"
        />
        <DiSwitch
          :model-value="true"
          :label="$t('features.forms.checksRadios.labels.checkedSwitch')"
          label-position="end"
        />
        <DiSwitch
          disabled
          :label="$t('features.forms.checksRadios.labels.disabledSwitch')"
          label-position="end"
        />
        <DiSwitch
          :model-value="true"
          disabled
          :label="$t('features.forms.checksRadios.labels.disabledCheckedSwitch')"
          label-position="end"
        />
      </div>
    </PreviewCodeCard>
    <PreviewCodeCard
      :title="$t('features.forms.checksRadios.sections.checkboxSizes')"
      class="xl:col-span-4"
      :code="codes.checkboxSizes"
      language="html"
    >
      <div class="flex flex-wrap items-center gap-5">
        <DiCheckbox
          v-for="size in controlSizes"
          :key="size"
          :model-value="true"
          :size="size"
          :label="size.toUpperCase()"
        />
      </div>
    </PreviewCodeCard>
    <PreviewCodeCard
      :title="$t('features.forms.checksRadios.sections.radioSizes')"
      class="xl:col-span-4"
      :code="codes.radioSizes"
      language="html"
    >
      <div class="flex flex-wrap items-center gap-5">
        <DiRadio
          v-for="size in controlSizes"
          :key="size"
          model-value="selected"
          value="selected"
          :size="size"
          :label="size.toUpperCase()"
        />
      </div>
    </PreviewCodeCard>
    <PreviewCodeCard
      :title="$t('features.forms.checksRadios.sections.switchSizes')"
      class="xl:col-span-4"
      :code="codes.switchSizes"
      language="html"
    >
      <div class="flex flex-wrap items-center gap-5">
        <DiSwitch
          v-for="size in switchSizes"
          :key="size"
          :model-value="true"
          :size="size"
          :aria-label="
            $t('features.forms.checksRadios.labels.switchSize', { size: size.toUpperCase() })
          "
        />
      </div>
    </PreviewCodeCard>
    <PreviewCodeCard
      :title="$t('features.forms.checksRadios.sections.inline')"
      class="xl:col-span-6"
      :code="codes.inline"
      language="html"
    >
      <div class="space-y-5">
        <div class="flex flex-wrap items-center gap-x-6 gap-y-3">
          <DiCheckbox :label="$t('features.forms.checksRadios.labels.first')" />
          <DiCheckbox :label="$t('features.forms.checksRadios.labels.second')" />
          <DiCheckbox disabled :label="$t('features.forms.checksRadios.labels.disabled')" />
        </div>
        <DiRadioGroup
          v-model="inlineRadio"
          :options="inlineRadioOptions"
          orientation="horizontal"
        />
      </div>
    </PreviewCodeCard>
    <PreviewCodeCard
      :title="$t('features.forms.checksRadios.sections.withoutLabels')"
      class="xl:col-span-3"
      :code="codes.withoutLabels"
      language="html"
    >
      <div class="flex items-center gap-4">
        <DiCheckbox :aria-label="$t('features.forms.checksRadios.labels.selectRow')" />
        <DiRadio
          model-value="compact"
          value="compact"
          name="label-less-layout"
          :aria-label="$t('features.forms.checksRadios.labels.compactLayout')"
        />
      </div>
    </PreviewCodeCard>
    <PreviewCodeCard
      :title="$t('features.forms.checksRadios.sections.radioToggleButtons')"
      class="xl:col-span-6"
      :code="codes.radioToggleButtons"
      language="html"
    >
      <DiButtonGroup :aria-label="$t('features.forms.checksRadios.labels.radioToggleButtons')">
        <DiToggleButton
          v-model="toggleRadio"
          type="radio"
          value="first"
          name="toggle-radio"
          :label="$t('features.forms.checksRadios.labels.first')"
        />
        <DiToggleButton
          v-model="toggleRadio"
          type="radio"
          value="second"
          name="toggle-radio"
          :label="$t('features.forms.checksRadios.labels.second')"
        />
        <DiToggleButton
          v-model="toggleRadio"
          type="radio"
          value="disabled"
          name="toggle-radio"
          :label="$t('features.forms.checksRadios.labels.disabled')"
          disabled
        />
      </DiButtonGroup>
    </PreviewCodeCard>
    <PreviewCodeCard
      :title="$t('features.forms.checksRadios.sections.checkboxToggleButtons')"
      class="xl:col-span-6"
      :code="codes.checkboxToggleButtons"
      language="html"
    >
      <div class="flex flex-wrap gap-3">
        <DiToggleButton
          v-model="singleToggle"
          :label="$t('features.forms.checksRadios.labels.singleToggle')"
        />
        <DiToggleButton
          v-model="checkedToggle"
          :label="$t('features.forms.checksRadios.labels.checked')"
          variant="secondary"
        />
        <DiToggleButton
          :model-value="false"
          :label="$t('features.forms.checksRadios.labels.disabled')"
          disabled
        />
      </div>
    </PreviewCodeCard>
    <PreviewCodeCard
      :title="$t('features.forms.checksRadios.sections.coloredCheckboxes')"
      class="xl:col-span-4"
      :code="codes.coloredCheckboxes"
      language="html"
    >
      <div class="grid gap-3 sm:grid-cols-2">
        <DiCheckbox
          v-for="variant in allVariants"
          :key="variant"
          :model-value="true"
          size="xs"
          :variant="variant"
          :label="variantLabels[variant]"
        />
      </div>
    </PreviewCodeCard>
    <PreviewCodeCard
      :title="$t('features.forms.checksRadios.sections.coloredRadios')"
      class="xl:col-span-4"
      :code="codes.coloredRadios"
      language="html"
    >
      <div class="grid gap-3 sm:grid-cols-2">
        <DiRadio
          v-for="variant in allVariants"
          :key="variant"
          model-value="selected"
          value="selected"
          size="xs"
          :variant="variant"
          :label="variantLabels[variant]"
        />
      </div>
    </PreviewCodeCard>
    <PreviewCodeCard
      :title="$t('features.forms.checksRadios.sections.switchColors')"
      class="xl:col-span-4"
      :code="codes.switchColors"
      language="html"
    >
      <div class="grid gap-3 sm:grid-cols-2">
        <DiSwitch
          v-for="variant in allVariants"
          :key="variant"
          :model-value="true"
          size="xs"
          :variant="variant"
          :label="variantLabels[variant]"
          label-position="end"
        />
      </div>
    </PreviewCodeCard>
    <PreviewCodeCard
      :title="$t('features.forms.checksRadios.sections.iconCheckboxes')"
      class="xl:col-span-4"
      :code="codes.iconCheckboxes"
      language="html"
    >
      <div class="flex flex-wrap items-center gap-3">
        <DiCheckbox
          v-model="favoriteChecked"
          appearance="icon"
          :label="$t('features.forms.checksRadios.labels.favorite')"
        >
          <template #icon>
            <DiIcon name="heart" size="lg" />
          </template>
          <template #checked-icon>
            <DiIcon name="heartBold" size="lg" />
          </template>
        </DiCheckbox>
        <DiCheckbox
          v-model="starredChecked"
          appearance="icon"
          variant="warning"
          :label="$t('features.forms.checksRadios.labels.starred')"
        >
          <template #icon>
            <DiIcon name="star" size="lg" />
          </template>
        </DiCheckbox>
        <DiCheckbox
          appearance="icon"
          variant="success"
          disabled
          :label="$t('features.forms.checksRadios.labels.disabledIcon')"
        >
          <template #icon>
            <DiIcon name="medalLine" size="lg" />
          </template>
        </DiCheckbox>
        <DiCheckbox
          :model-value="true"
          appearance="icon"
          variant="secondary"
          disabled
          :label="$t('features.forms.checksRadios.labels.disabledCheckedIcon')"
        >
          <template #icon>
            <DiIcon name="heartBold" size="lg" />
          </template>
        </DiCheckbox>
      </div>
    </PreviewCodeCard>
    <PreviewCodeCard
      :title="$t('features.forms.checksRadios.sections.minimalSwitches')"
      class="xl:col-span-4"
      :code="codes.minimalSwitches"
      language="html"
    >
      <div class="flex flex-wrap items-center gap-4">
        <DiSwitch
          v-for="variant in referenceVariants"
          :key="variant"
          appearance="minimal"
          size="sm"
          :variant="variant"
          :label="variantLabels[variant]"
        />
      </div>
    </PreviewCodeCard>
    <PreviewCodeCard
      :title="$t('features.forms.checksRadios.sections.labeledSwitches')"
      class="xl:col-span-4"
      :code="codes.labeledSwitches"
      language="html"
    >
      <div class="grid gap-3 sm:grid-cols-2">
        <DiSwitch
          v-for="variant in referenceVariants"
          :key="variant"
          :model-value="true"
          appearance="labeled"
          :variant="variant"
          :label="variantLabels[variant]"
          label-position="end"
        />
        <!-- DaisyUI has no light variant, so the Ynex light example uses base-content. -->
        <DiSwitch
          :model-value="true"
          appearance="labeled"
          :label="$t('features.forms.checksRadios.variants.light')"
          label-position="end"
          style="--input-color: var(--color-base-content)"
        />
      </div>
    </PreviewCodeCard>
  </div>
</template>
