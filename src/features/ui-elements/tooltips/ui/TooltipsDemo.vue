<script setup lang="ts">
import DiButton from '@/shared/ui/base/DiButton.vue'
import DiIcon from '@/shared/ui/base/DiIcon.vue'
import DiTooltip from '@/shared/ui/base/DiTooltip.vue'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

const basicTooltip = `<DiTooltip text="Hello world">
  <DiButton>Hover me</DiButton>
</DiTooltip>`

const positionTooltips = `<div class="flex gap-4 flex-wrap justify-center">
  <DiTooltip text="Tooltip on top" position="top">
    <DiButton size="sm">Top</DiButton>
  </DiTooltip>
  <DiTooltip text="Tooltip on right" position="right">
    <DiButton size="sm">Right</DiButton>
  </DiTooltip>
  <DiTooltip text="Tooltip on bottom" position="bottom">
    <DiButton size="sm">Bottom</DiButton>
  </DiTooltip>
  <DiTooltip text="Tooltip on left" position="left">
    <DiButton size="sm">Left</DiButton>
  </DiTooltip>
</div>`

const coloredTooltips = `<div class="flex gap-4 flex-wrap justify-center">
  <DiTooltip text="Primary tooltip" variant="primary">
    <DiButton size="sm" variant="primary">Primary</DiButton>
  </DiTooltip>
  <DiTooltip text="Secondary tooltip" variant="secondary">
    <DiButton size="sm" variant="secondary">Secondary</DiButton>
  </DiTooltip>
  <DiTooltip text="Accent tooltip" variant="accent">
    <DiButton size="sm" variant="accent">Accent</DiButton>
  </DiTooltip>
  <DiTooltip text="Info tooltip" variant="info">
    <DiButton size="sm" variant="info">Info</DiButton>
  </DiTooltip>
</div>`

const moreColors = `<div class="flex gap-4 flex-wrap justify-center">
  <DiTooltip text="Success tooltip" variant="success">
    <DiButton size="sm" variant="success">Success</DiButton>
  </DiTooltip>
  <DiTooltip text="Warning tooltip" variant="warning">
    <DiButton size="sm" variant="warning">Warning</DiButton>
  </DiTooltip>
  <DiTooltip text="Error tooltip" variant="error">
    <DiButton size="sm" variant="error">Error</DiButton>
  </DiTooltip>
  <DiTooltip text="Neutral tooltip" variant="neutral">
    <DiButton size="sm">Neutral</DiButton>
  </DiTooltip>
</div>`

const openTooltip = `<div class="flex gap-4 flex-wrap justify-center">
  <DiTooltip text="Always visible" :open="true">
    <DiButton size="sm">Open tooltip</DiButton>
  </DiTooltip>
  <DiTooltip text="Hover to see" :open="false">
    <DiButton size="sm">Hover tooltip</DiButton>
  </DiTooltip>
</div>`

const tooltipWithButton = `<div class="flex gap-4 flex-wrap justify-center">
  <DiTooltip text="Click me!" tag="button">
    <DiButton size="sm">Button with tooltip</DiButton>
  </DiTooltip>

  <DiTooltip text="Primary action" position="top">
    <DiButton variant="primary" size="sm">Action</DiButton>
  </DiTooltip>

  <DiTooltip text="Delete item" position="bottom" variant="error">
    <DiButton variant="error" size="sm">Delete</DiButton>
  </DiTooltip>
</div>`

const combinedPositionsColors = `<div class="grid grid-cols-4 gap-4">
  <DiTooltip text="Primary top" position="top" variant="primary">
    <DiButton size="sm" variant="primary" class="w-full">P-Top</DiButton>
  </DiTooltip>
  <DiTooltip text="Success right" position="right" variant="success">
    <DiButton size="sm" variant="success" class="w-full">S-Right</DiButton>
  </DiTooltip>
  <DiTooltip text="Warning bottom" position="bottom" variant="warning">
    <DiButton size="sm" variant="warning" class="w-full">W-Bottom</DiButton>
  </DiTooltip>
  <DiTooltip text="Error left" position="left" variant="error">
    <DiButton size="sm" variant="error" class="w-full">E-Left</DiButton>
  </DiTooltip>
</div>`

const tooltipOnIcons = `<div class="flex gap-4 flex-wrap justify-center items-center">
  <DiTooltip text="Information" position="top" variant="info">
    <DiIcon
      name="informationCircle"
      color="info"
      size="1.5rem"
      custom-class="cursor-pointer"
    />
  </DiTooltip>

  <DiTooltip text="Settings" position="right" variant="neutral">
    <DiIcon name="cogHero" color="neutral" size="1.5rem" custom-class="cursor-pointer" />
  </DiTooltip>

  <DiTooltip text="Delete" position="bottom" variant="error">
    <DiIcon name="trash" color="error" size="1.5rem" custom-class="cursor-pointer" />
  </DiTooltip>

  <DiTooltip text="Help" position="left" variant="primary">
    <DiIcon
      name="questionMarkCircle"
      color="primary"
      size="1.5rem"
      custom-class="cursor-pointer"
    />
  </DiTooltip>
</div>`

const multiLineTooltip = `<div class="flex gap-4 flex-wrap justify-center">
  <DiTooltip
    text="This is a longer tooltip text that might wrap to multiple lines depending on the screen size"
    position="top"
    variant="info"
  >
    <DiButton size="sm">Long text</DiButton>
  </DiTooltip>

  <DiTooltip
    text="Short"
    position="bottom"
    variant="success"
  >
    <DiButton size="sm">Short text</DiButton>
  </DiTooltip>
</div>`

const interactiveElements = `<div class="flex gap-4 flex-wrap justify-center items-center">
  <DiTooltip text="Click to copy" position="top" variant="info">
    <DiButton size="sm" outline>Copy</DiButton>
  </DiTooltip>

  <DiTooltip text="Toggle switch" position="right" variant="neutral">
    <input type="checkbox" class="toggle toggle-primary" />
  </DiTooltip>

  <DiTooltip text="Select option" position="bottom" variant="accent">
    <select class="select select-bordered select-sm">
      <option>Option 1</option>
      <option>Option 2</option>
    </select>
  </DiTooltip>
</div>`
</script>

<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 items-start">
    <!-- Basic Tooltip -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.tooltip.basicTooltip')"
      accent-color="#14b8a6"
      :code="basicTooltip"
      language="html"
    >
      <div class="flex justify-center p-4">
        <DiTooltip text="Hello world">
          <DiButton>{{ $t('features.ui-elements.tooltip.hoverMe') }}</DiButton>
        </DiTooltip>
      </div>
    </PreviewCodeCard>

    <!-- Position Variants -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.tooltip.positionTooltips')"
      accent-color="#14b8a6"
      :code="positionTooltips"
      language="html"
    >
      <div class="flex gap-4 flex-wrap justify-center p-4">
        <DiTooltip :text="$t('features.ui-elements.tooltip.tooltipOnTop')" position="top">
          <DiButton size="sm">
            {{ $t('features.ui-elements.tooltip.top') }}
          </DiButton>
        </DiTooltip>
        <DiTooltip :text="$t('features.ui-elements.tooltip.tooltipOnRight')" position="right">
          <DiButton size="sm">
            {{ $t('features.ui-elements.tooltip.right') }}
          </DiButton>
        </DiTooltip>
        <DiTooltip :text="$t('features.ui-elements.tooltip.tooltipOnBottom')" position="bottom">
          <DiButton size="sm">
            {{ $t('features.ui-elements.tooltip.bottom') }}
          </DiButton>
        </DiTooltip>
        <DiTooltip :text="$t('features.ui-elements.tooltip.tooltipOnLeft')" position="left">
          <DiButton size="sm">
            {{ $t('features.ui-elements.tooltip.left') }}
          </DiButton>
        </DiTooltip>
      </div>
    </PreviewCodeCard>

    <!-- Colored Tooltips (Primary Set) -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.tooltip.coloredTooltips')"
      accent-color="#14b8a6"
      :code="coloredTooltips"
      language="html"
    >
      <div class="flex gap-4 flex-wrap justify-center p-4">
        <DiTooltip :text="$t('features.ui-elements.tooltip.primaryTooltip')" variant="primary">
          <DiButton size="sm" variant="primary">
            {{ $t('features.ui-elements.tooltip.primary') }}
          </DiButton>
        </DiTooltip>
        <DiTooltip :text="$t('features.ui-elements.tooltip.secondaryTooltip')" variant="secondary">
          <DiButton size="sm" variant="secondary">
            {{ $t('features.ui-elements.tooltip.secondary') }}
          </DiButton>
        </DiTooltip>
        <DiTooltip :text="$t('features.ui-elements.tooltip.accentTooltip')" variant="accent">
          <DiButton size="sm" variant="accent">
            {{ $t('features.ui-elements.tooltip.accent') }}
          </DiButton>
        </DiTooltip>
        <DiTooltip :text="$t('features.ui-elements.tooltip.infoTooltip')" variant="info">
          <DiButton size="sm" variant="info">
            {{ $t('features.ui-elements.tooltip.info') }}
          </DiButton>
        </DiTooltip>
      </div>
    </PreviewCodeCard>

    <!-- More Colors (Status Set) -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.tooltip.statusTooltips')"
      accent-color="#14b8a6"
      :code="moreColors"
      language="html"
    >
      <div class="flex gap-4 flex-wrap justify-center p-4">
        <DiTooltip :text="$t('features.ui-elements.tooltip.successTooltip')" variant="success">
          <DiButton size="sm" variant="success">
            {{ $t('features.ui-elements.tooltip.success') }}
          </DiButton>
        </DiTooltip>
        <DiTooltip :text="$t('features.ui-elements.tooltip.warningTooltip')" variant="warning">
          <DiButton size="sm" variant="warning">
            {{ $t('features.ui-elements.tooltip.warning') }}
          </DiButton>
        </DiTooltip>
        <DiTooltip :text="$t('features.ui-elements.tooltip.errorTooltip')" variant="error">
          <DiButton size="sm" variant="error">
            {{ $t('features.ui-elements.tooltip.error') }}
          </DiButton>
        </DiTooltip>
        <DiTooltip :text="$t('features.ui-elements.tooltip.neutralTooltip')" variant="neutral">
          <DiButton size="sm">
            {{ $t('features.ui-elements.tooltip.neutral') }}
          </DiButton>
        </DiTooltip>
      </div>
    </PreviewCodeCard>

    <!-- Always Open Tooltip -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.tooltip.openTooltips')"
      accent-color="#14b8a6"
      :code="openTooltip"
      language="html"
    >
      <div class="flex gap-8 flex-wrap justify-center p-4">
        <DiTooltip :text="$t('features.ui-elements.tooltip.alwaysVisible')" :open="true">
          <DiButton size="sm">
            {{ $t('features.ui-elements.tooltip.openTooltip') }}
          </DiButton>
        </DiTooltip>
        <DiTooltip :text="$t('features.ui-elements.tooltip.hoverToSee')" :open="false">
          <DiButton size="sm">
            {{ $t('features.ui-elements.tooltip.hoverTooltip') }}
          </DiButton>
        </DiTooltip>
      </div>
    </PreviewCodeCard>

    <!-- Tooltip with Buttons -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.tooltip.tooltipWithButtons')"
      accent-color="#14b8a6"
      :code="tooltipWithButton"
      language="html"
    >
      <div class="flex gap-4 flex-wrap justify-center p-4">
        <DiTooltip :text="$t('features.ui-elements.tooltip.clickMe')" tag="button">
          <DiButton size="sm">
            {{ $t('features.ui-elements.tooltip.buttonWithTooltip') }}
          </DiButton>
        </DiTooltip>

        <DiTooltip :text="$t('features.ui-elements.tooltip.primaryAction')" position="top">
          <DiButton variant="primary" size="sm">
            {{ $t('features.ui-elements.tooltip.action') }}
          </DiButton>
        </DiTooltip>

        <DiTooltip
          :text="$t('features.ui-elements.tooltip.deleteItem')"
          position="bottom"
          variant="error"
        >
          <DiButton variant="error" size="sm">
            {{ $t('features.ui-elements.tooltip.delete') }}
          </DiButton>
        </DiTooltip>
      </div>
    </PreviewCodeCard>

    <!-- Combined Positions and Colors -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.tooltip.combinedTooltips')"
      accent-color="#14b8a6"
      :code="combinedPositionsColors"
      language="html"
    >
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        <DiTooltip
          :text="$t('features.ui-elements.tooltip.primaryTop')"
          position="top"
          variant="primary"
        >
          <DiButton size="sm" variant="primary" class="w-full">
            P-Top
          </DiButton>
        </DiTooltip>
        <DiTooltip
          :text="$t('features.ui-elements.tooltip.successRight')"
          position="right"
          variant="success"
        >
          <DiButton size="sm" variant="success" class="w-full">
            S-Right
          </DiButton>
        </DiTooltip>
        <DiTooltip
          :text="$t('features.ui-elements.tooltip.warningBottom')"
          position="bottom"
          variant="warning"
        >
          <DiButton size="sm" variant="warning" class="w-full">
            W-Bottom
          </DiButton>
        </DiTooltip>
        <DiTooltip
          :text="$t('features.ui-elements.tooltip.errorLeft')"
          position="left"
          variant="error"
        >
          <DiButton size="sm" variant="error" class="w-full">
            E-Left
          </DiButton>
        </DiTooltip>
      </div>
    </PreviewCodeCard>

    <!-- Tooltip on Icons -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.tooltip.tooltipOnIcons')"
      accent-color="#14b8a6"
      :code="tooltipOnIcons"
      language="html"
    >
      <div class="flex gap-6 flex-wrap justify-center items-center p-4">
        <DiTooltip
          :text="$t('features.ui-elements.tooltip.information')"
          position="top"
          variant="info"
        >
          <DiIcon
            name="informationCircle"
            color="info"
            size="1.5rem"
            custom-class="cursor-pointer"
          />
        </DiTooltip>

        <DiTooltip
          :text="$t('features.ui-elements.tooltip.settings')"
          position="right"
          variant="neutral"
        >
          <DiIcon name="cogHero" color="neutral" size="1.5rem" custom-class="cursor-pointer" />
        </DiTooltip>

        <DiTooltip
          :text="$t('features.ui-elements.tooltip.deleteIcon')"
          position="bottom"
          variant="error"
        >
          <DiIcon name="trash" color="error" size="1.5rem" custom-class="cursor-pointer" />
        </DiTooltip>

        <DiTooltip
          :text="$t('features.ui-elements.tooltip.help')"
          position="left"
          variant="primary"
        >
          <DiIcon
            name="questionMarkCircle"
            color="primary"
            size="1.5rem"
            custom-class="cursor-pointer"
          />
        </DiTooltip>
      </div>
    </PreviewCodeCard>

    <!-- Multi-line Tooltip -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.tooltip.multiLineTooltips')"
      accent-color="#14b8a6"
      :code="multiLineTooltip"
      language="html"
    >
      <div class="flex gap-4 flex-wrap justify-center p-4">
        <DiTooltip
          :text="$t('features.ui-elements.tooltip.longTooltipText')"
          position="top"
          variant="info"
        >
          <DiButton size="sm">
            {{ $t('features.ui-elements.tooltip.longText') }}
          </DiButton>
        </DiTooltip>

        <DiTooltip
          :text="$t('features.ui-elements.tooltip.short')"
          position="bottom"
          variant="success"
        >
          <DiButton size="sm">
            {{ $t('features.ui-elements.tooltip.shortText') }}
          </DiButton>
        </DiTooltip>
      </div>
    </PreviewCodeCard>

    <!-- Interactive Elements with Tooltips -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.tooltip.interactiveElements')"
      accent-color="#14b8a6"
      :code="interactiveElements"
      language="html"
      class="lg:col-span-2"
    >
      <div class="flex gap-6 flex-wrap justify-center items-center p-4">
        <DiTooltip
          :text="$t('features.ui-elements.tooltip.clickToCopy')"
          position="top"
          variant="info"
        >
          <DiButton size="sm" outline>
            {{ $t('features.ui-elements.tooltip.copy') }}
          </DiButton>
        </DiTooltip>

        <DiTooltip
          :text="$t('features.ui-elements.tooltip.toggleSwitch')"
          position="right"
          variant="neutral"
        >
          <input type="checkbox" class="toggle toggle-primary">
        </DiTooltip>

        <DiTooltip
          :text="$t('features.ui-elements.tooltip.selectOption')"
          position="bottom"
          variant="accent"
        >
          <select class="select select-bordered select-sm">
            <option>{{ $t('features.ui-elements.tooltip.option1') }}</option>
            <option>{{ $t('features.ui-elements.tooltip.option2') }}</option>
          </select>
        </DiTooltip>
      </div>
    </PreviewCodeCard>
  </div>
</template>
