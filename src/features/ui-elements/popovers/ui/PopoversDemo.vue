<script setup lang="ts">
import { ref } from 'vue'

import DiButton from '@/shared/ui/base/DiButton.vue'
import DiIcon from '@/shared/ui/base/DiIcon.vue'
import { DiPopover } from '@/shared/ui/base/popover'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

const controlledOpen = ref(false)

const basicCode = `<DiPopover>
  <template #trigger>
    <DiButton variant="primary">Open popover</DiButton>
  </template>
  A compact surface connected to its trigger.
</DiPopover>`

const titleCode = `<DiPopover title="Popover Title" placement="right">
  <template #trigger>
    <DiButton outline variant="primary">Popover Right</DiButton>
  </template>
  And here's some amazing content. It's very engaging. Right?
</DiPopover>`

const headerSlotCode = `<DiPopover placement="bottom">
  <template #trigger>
    <DiButton outline variant="secondary">Custom header</DiButton>
  </template>
  <template #header>
    <span class="text-secondary">Custom Header Slot</span>
  </template>
  Header slots replace the title prop when both are provided.
</DiPopover>`

const footerActionsCode = `<DiPopover title="Confirm update" placement="bottom-end">
  <template #trigger>
    <DiButton outline>Footer actions</DiButton>
  </template>
  Save these changes to your profile?
  <template #footer="{ close }">
    <div class="flex justify-end gap-2">
      <DiButton size="sm" variant="ghost" @click="close">Cancel</DiButton>
      <DiButton size="sm" variant="primary" @click="close">Save</DiButton>
    </div>
  </template>
</DiPopover>`

const placementsCode = `<div class="flex flex-wrap justify-center gap-3 py-12">
  <DiPopover title="Popover Top" placement="top"><template #trigger><DiButton size="sm" outline>Top</DiButton></template>Arrow points down</DiPopover>
  <DiPopover title="Popover Bottom" placement="bottom"><template #trigger><DiButton size="sm" outline>Bottom</DiButton></template>Arrow points up</DiPopover>
  <DiPopover title="Popover Left" placement="left"><template #trigger><DiButton size="sm" outline>Left</DiButton></template>Arrow points right</DiPopover>
  <DiPopover title="Popover Right" placement="right"><template #trigger><DiButton size="sm" outline>Right</DiButton></template>Arrow points left</DiPopover>
</div>`

const alignmentCode = `<div class="flex flex-wrap justify-center gap-3 py-12">
  <DiPopover placement="bottom-start"><template #trigger><DiButton size="sm">Start</DiButton></template>Start aligned</DiPopover>
  <DiPopover placement="bottom"><template #trigger><DiButton size="sm">Center</DiButton></template>Center aligned</DiPopover>
  <DiPopover placement="bottom-end"><template #trigger><DiButton size="sm">End</DiButton></template>End aligned</DiPopover>
</div>`

const widthCode = `<div class="grid gap-3 sm:grid-cols-3">
  <DiPopover width="auto"><template #trigger><DiButton block>Auto</DiButton></template>Natural width</DiPopover>
  <DiPopover width="trigger"><template #trigger><DiButton block>Trigger</DiButton></template>Matches the trigger</DiPopover>
  <DiPopover width="full"><template #trigger><DiButton block>Full</DiButton></template>Uses the viewport width</DiPopover>
</div>`

const richContentCode = `<DiPopover size="lg" width="trigger">
  <template #trigger><DiButton variant="secondary">Account details</DiButton></template>
  <template #header>Profile status</template>
  <div class="flex items-start gap-3">
    <DiIcon name="informationCircle" color="info" size="lg" />
    <p>Your profile is ready for review.</p>
  </div>
  <template #footer="{ close }">
    <DiButton size="sm" variant="primary" @click="close">Got it</DiButton>
  </template>
</DiPopover>`

const controlledCode = `<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
<\/script>

<template>
  <DiButton @click="open = !open">Toggle externally</DiButton>
  <DiPopover v-model:open="open">
    <template #trigger><DiButton variant="ghost">Popover trigger</DiButton></template>
    Controlled content
  </DiPopover>
</template>`

const outsideCode = `<DiPopover :close-on-click-outside="false">
  <template #trigger><DiButton>Keep open outside</DiButton></template>
  Use the trigger again or press Escape to close.
</DiPopover>`

const nestedCode = `<DiPopover>
  <template #trigger><DiButton>Open parent</DiButton></template>
  <div class="space-y-3">
    <p>Parent popover</p>
    <DiPopover placement="right-start">
      <template #trigger><DiButton size="sm" variant="secondary">Open child</DiButton></template>
      Child popover
    </DiPopover>
  </div>
</DiPopover>`
</script>

<template>
  <div class="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
    <PreviewCodeCard
      :title="$t('features.uiElements.popover.basic')"
      accent-color="#14b8a6"
      :code="basicCode"
      language="html"
    >
      <div class="flex justify-center p-6">
        <DiPopover>
          <template #trigger>
            <DiButton variant="primary">
              {{ $t('features.uiElements.popover.open') }}
            </DiButton>
          </template>
          {{ $t('features.uiElements.popover.compactContent') }}
        </DiPopover>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.popover.titleSupport')"
      accent-color="#14b8a6"
      :code="titleCode"
      language="html"
    >
      <div class="flex justify-center p-8">
        <DiPopover :title="$t('features.uiElements.popover.live.popoverTitle')" placement="right">
          <template #trigger>
            <DiButton outline variant="primary">
              {{ $t('features.uiElements.popover.live.popoverRight') }}
            </DiButton>
          </template>{{
            $t('features.uiElements.popover.live.andHeresSomeAmazingContentItsVeryEngagingRight')
          }}
        </DiPopover>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.popover.headerSlot')"
      accent-color="#14b8a6"
      :code="headerSlotCode"
      language="html"
    >
      <div class="flex justify-center p-8">
        <DiPopover placement="bottom">
          <template #trigger>
            <DiButton outline variant="secondary">
              {{ $t('features.uiElements.popover.live.customHeader') }}
            </DiButton>
          </template>
          <template #header>
            <span class="text-secondary">{{
              $t('features.uiElements.popover.live.customHeaderSlot')
            }}</span>
          </template>{{
            $t('features.uiElements.popover.live.headerSlotsReplaceTheTitlePropWhenBothAreProvided')
          }}
        </DiPopover>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.popover.footerActions')"
      accent-color="#14b8a6"
      :code="footerActionsCode"
      language="html"
    >
      <div class="flex justify-center p-8">
        <DiPopover
          :title="$t('features.uiElements.popover.live.confirmUpdate')"
          placement="bottom-end"
        >
          <template #trigger>
            <DiButton outline>
              {{ $t('features.uiElements.popover.live.footerActions') }}
            </DiButton>
          </template>{{ $t('features.uiElements.popover.live.saveTheseChangesToYourProfile')
          }}<template #footer="{ close }">
            <div class="flex justify-end gap-2">
              <DiButton size="sm" variant="ghost" @click="close">
                {{ $t('features.uiElements.popover.live.cancel') }}
              </DiButton>
              <DiButton size="sm" variant="primary" @click="close">
                {{ $t('features.uiElements.popover.live.save') }}
              </DiButton>
            </div>
          </template>
        </DiPopover>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.popover.arrowPlacements')"
      accent-color="#14b8a6"
      :code="placementsCode"
      language="html"
    >
      <div class="flex flex-wrap justify-center gap-3 py-12">
        <DiPopover :title="$t('features.uiElements.popover.live.popoverTop')" placement="top">
          <template #trigger>
            <DiButton size="sm" outline>
              {{ $t('features.uiElements.popover.live.top') }}
            </DiButton>
          </template>{{ $t('features.uiElements.popover.live.arrowPointsDown') }}
        </DiPopover>
        <DiPopover :title="$t('features.uiElements.popover.live.popoverBottom')" placement="bottom">
          <template #trigger>
            <DiButton size="sm" outline>
              {{ $t('features.uiElements.popover.live.bottom') }}
            </DiButton>
          </template>{{ $t('features.uiElements.popover.live.arrowPointsUp') }}
        </DiPopover>
        <DiPopover :title="$t('features.uiElements.popover.live.popoverLeft')" placement="left">
          <template #trigger>
            <DiButton size="sm" outline>
              {{ $t('features.uiElements.popover.live.left') }}
            </DiButton>
          </template>{{ $t('features.uiElements.popover.live.arrowPointsRight') }}
        </DiPopover>
        <DiPopover :title="$t('features.uiElements.popover.live.popoverRight')" placement="right">
          <template #trigger>
            <DiButton size="sm" outline>
              {{ $t('features.uiElements.popover.live.right') }}
            </DiButton>
          </template>{{ $t('features.uiElements.popover.live.arrowPointsLeft') }}
        </DiPopover>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.popover.alignment')"
      accent-color="#14b8a6"
      :code="alignmentCode"
      language="html"
    >
      <div class="flex flex-wrap justify-center gap-3 py-12">
        <DiPopover placement="bottom-start">
          <template #trigger>
            <DiButton size="sm">
              {{ $t('features.uiElements.popover.live.start') }}
            </DiButton>
          </template>{{ $t('features.uiElements.popover.live.startAligned') }}
        </DiPopover>
        <DiPopover placement="bottom">
          <template #trigger>
            <DiButton size="sm">
              {{ $t('features.uiElements.popover.live.center') }}
            </DiButton>
          </template>{{ $t('features.uiElements.popover.live.centerAligned') }}
        </DiPopover>
        <DiPopover placement="bottom-end">
          <template #trigger>
            <DiButton size="sm">
              {{ $t('features.uiElements.popover.live.end') }}
            </DiButton>
          </template>{{ $t('features.uiElements.popover.live.endAligned') }}
        </DiPopover>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.popover.widths')"
      accent-color="#14b8a6"
      :code="widthCode"
      language="html"
    >
      <div class="grid gap-3 sm:grid-cols-3">
        <DiPopover width="auto">
          <template #trigger>
            <DiButton block>
              {{ $t('features.uiElements.popover.live.auto') }}
            </DiButton>
          </template>{{ $t('features.uiElements.popover.live.naturalWidth') }}
        </DiPopover>
        <DiPopover width="trigger">
          <template #trigger>
            <DiButton block>
              {{ $t('features.uiElements.popover.live.trigger') }}
            </DiButton>
          </template>{{ $t('features.uiElements.popover.live.matchesTheTrigger') }}
        </DiPopover>
        <DiPopover width="full">
          <template #trigger>
            <DiButton block>
              {{ $t('features.uiElements.popover.live.full') }}
            </DiButton>
          </template>{{ $t('features.uiElements.popover.live.usesTheViewportWidth') }}
        </DiPopover>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.popover.richContent')"
      accent-color="#14b8a6"
      :code="richContentCode"
      language="html"
    >
      <div class="flex justify-center p-6">
        <DiPopover size="lg" width="trigger">
          <template #trigger>
            <DiButton variant="secondary">
              {{ $t('features.uiElements.popover.live.accountDetails') }}
            </DiButton>
          </template>
          <template #header>
            {{ $t('features.uiElements.popover.live.profileStatus') }}
          </template>
          <div class="flex items-start gap-3">
            <DiIcon name="informationCircle" color="info" size="lg" />
            <p>{{ $t('features.uiElements.popover.live.yourProfileIsReadyForReview') }}</p>
          </div>
          <template #footer="{ close }">
            <DiButton size="sm" variant="primary" @click="close">
              {{ $t('features.uiElements.popover.live.gotIt') }}
            </DiButton>
          </template>
        </DiPopover>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.popover.controlled')"
      accent-color="#14b8a6"
      :code="controlledCode"
      language="vue"
    >
      <div class="flex flex-wrap items-center justify-center gap-3 p-6">
        <DiButton @click="controlledOpen = !controlledOpen">
          {{ $t('features.uiElements.popover.live.toggleExternally') }}
        </DiButton>
        <DiPopover v-model:open="controlledOpen">
          <template #trigger>
            <DiButton variant="ghost">
              {{ $t('features.uiElements.popover.live.popoverTrigger') }}
            </DiButton>
          </template>{{ $t('features.uiElements.popover.live.controlledContent') }}
        </DiPopover>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.popover.outside')"
      accent-color="#14b8a6"
      :code="outsideCode"
      language="html"
    >
      <div class="flex justify-center p-6">
        <DiPopover :close-on-click-outside="false">
          <template #trigger>
            <DiButton>
              {{
                $t('features.uiElements.popover.live.keepOpenOutside')
              }}
            </DiButton>
          </template>{{ $t('features.uiElements.popover.live.useTheTriggerAgainOrPressEscapeToClose') }}
        </DiPopover>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.popover.nested')"
      accent-color="#14b8a6"
      :code="nestedCode"
      language="html"
    >
      <div class="flex justify-center p-6">
        <DiPopover>
          <template #trigger>
            <DiButton>{{ $t('features.uiElements.popover.live.openParent') }}</DiButton>
          </template>
          <div class="space-y-3">
            <p>{{ $t('features.uiElements.popover.live.parentPopover') }}</p>
            <DiPopover placement="right-start">
              <template #trigger>
                <DiButton size="sm" variant="secondary">
                  {{ $t('features.uiElements.popover.live.openChild') }}
                </DiButton>
              </template>{{ $t('features.uiElements.popover.live.childPopover') }}
            </DiPopover>
          </div>
        </DiPopover>
      </div>
    </PreviewCodeCard>
  </div>
</template>
