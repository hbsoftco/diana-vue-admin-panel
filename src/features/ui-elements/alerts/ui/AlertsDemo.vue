<script setup lang="ts">
import { ref } from 'vue'

import DiAlert from '@/shared/ui/base/DiAlert.vue'
import DiButton from '@/shared/ui/base/DiButton.vue'
import DiIcon from '@/shared/ui/base/DiIcon.vue'
import DiLogo from '@/shared/ui/base/DiLogo.vue'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

const customClosePrimary = ref(true)
const customCloseInfo = ref(true)
const customCloseWarning = ref(true)
const customCloseError = ref(true)
const showLiveAlert = ref(false)

const basicAlert = `<DiAlert variant="warning" soft>
  <span>
    <strong>Heads up!</strong>
    {{ $t('features.uiElements.alert.messages.invalidEmail') }}
  </span>
</DiAlert>`

const liveAlert = `<script setup lang="ts">
import { ref } from 'vue'

import DiAlert from '@/shared/ui/base/DiAlert.vue'
import DiButton from '@/shared/ui/base/DiButton.vue'

const showLiveAlert = ref(false)
<\/script>

<template>
  <div class="flex flex-col items-start gap-3">
    <DiButton variant="primary" @click="showLiveAlert = true">
      Show live alert
    </DiButton>
    <DiAlert
      v-model="showLiveAlert"
      variant="success"
      role="status"
      closable
      class="w-full"
    >
      Your changes have been saved.
    </DiAlert>
  </div>
</template>`

const defaultAlerts = `<div class="flex flex-col gap-3">
  <DiAlert variant="primary" soft>A simple primary alert—check it out!</DiAlert>
  <DiAlert variant="secondary" soft>A simple secondary alert—check it out!</DiAlert>
  <DiAlert variant="info" soft>A simple info alert—check it out!</DiAlert>
  <DiAlert variant="success" soft>A simple success alert—check it out!</DiAlert>
  <DiAlert variant="warning" soft>A simple warning alert—check it out!</DiAlert>
  <DiAlert variant="error" soft>A simple danger alert—check it out!</DiAlert>
</div>`

const linksInAlerts = `<div class="flex flex-col gap-3">
  <DiAlert variant="primary" soft>
    A primary alert with
    <a href="#alert-actions" class="font-semibold underline">an example link</a>.
  </DiAlert>
  <DiAlert variant="info" soft>
    An info alert with
    <a href="#alert-actions" class="font-semibold underline">an example link</a>.
  </DiAlert>
  <DiAlert variant="success" soft>
    A success alert with
    <a href="#alert-actions" class="font-semibold underline">an example link</a>.
  </DiAlert>
  <DiAlert variant="warning" soft>
    A warning alert with
    <a href="#alert-actions" class="font-semibold underline">an example link</a>.
  </DiAlert>
  <DiAlert variant="error" soft>
    An error alert with
    <a href="#alert-actions" class="font-semibold underline">an example link</a>.
  </DiAlert>
</div>`

const coloredAlerts = `<div class="flex flex-col gap-3">
  <DiAlert variant="primary">A simple primary alert—check it out!</DiAlert>
  <DiAlert variant="secondary">A simple secondary alert—check it out!</DiAlert>
  <DiAlert variant="accent">A simple accent alert—check it out!</DiAlert>
  <DiAlert variant="info">A simple info alert—check it out!</DiAlert>
  <DiAlert variant="success">A simple success alert—check it out!</DiAlert>
  <DiAlert variant="warning">A simple warning alert—check it out!</DiAlert>
  <DiAlert variant="error">A simple danger alert—check it out!</DiAlert>
  <DiAlert variant="neutral">A simple neutral alert—check it out!</DiAlert>
</div>`

const outlineAlerts = `<div class="flex flex-col gap-3">
  <DiAlert variant="primary" outline>Primary outline alert</DiAlert>
  <DiAlert variant="secondary" outline>Secondary outline alert</DiAlert>
  <DiAlert variant="info" outline>Info outline alert</DiAlert>
  <DiAlert variant="success" outline>Success outline alert</DiAlert>
  <DiAlert variant="warning" outline>Warning outline alert</DiAlert>
  <DiAlert variant="error" outline>Error outline alert</DiAlert>
</div>`

const solidShadowAlerts = `<div class="flex flex-col gap-3">
  <DiAlert variant="primary" class="shadow-sm">Primary alert with a small shadow</DiAlert>
  <DiAlert variant="primary" class="shadow-md">Primary alert with a medium shadow</DiAlert>
  <DiAlert variant="primary" class="shadow-xl">Primary alert with a large shadow</DiAlert>
  <DiAlert variant="secondary" class="shadow-sm">Secondary alert with a small shadow</DiAlert>
  <DiAlert variant="secondary" class="shadow-md">Secondary alert with a medium shadow</DiAlert>
  <DiAlert variant="secondary" class="shadow-xl">Secondary alert with a large shadow</DiAlert>
</div>`

const defaultShadowAlerts = `<div class="flex flex-col gap-4">
  <DiAlert variant="primary" soft class="shadow-sm">Primary default alert with a small shadow</DiAlert>
  <DiAlert variant="primary" soft class="shadow-md">Primary default alert with a medium shadow</DiAlert>
  <DiAlert variant="primary" soft class="shadow-xl">Primary default alert with a large shadow</DiAlert>
  <DiAlert variant="info" soft class="shadow-sm">Soft info alert with a small shadow</DiAlert>
  <DiAlert variant="info" soft class="shadow-md">Soft info alert with a medium shadow</DiAlert>
  <DiAlert variant="info" soft class="shadow-xl">Soft info alert with a large shadow</DiAlert>
</div>`

const roundedSolidAlerts = `<div class="flex flex-col gap-3">
  <DiAlert variant="primary" rounded>Rounded primary alert</DiAlert>
  <DiAlert variant="secondary" rounded>Rounded secondary alert</DiAlert>
  <DiAlert variant="info" rounded>Rounded info alert</DiAlert>
  <DiAlert variant="warning" rounded>Rounded warning alert</DiAlert>
  <DiAlert variant="error" rounded>Rounded error alert</DiAlert>
</div>`

const roundedOutlineAlerts = `<div class="flex flex-col gap-3">
  <DiAlert variant="primary" outline rounded>Rounded outline primary alert</DiAlert>
  <DiAlert variant="secondary" outline rounded>Rounded outline secondary alert</DiAlert>
  <DiAlert variant="info" outline rounded>Rounded outline info alert</DiAlert>
  <DiAlert variant="warning" outline rounded>Rounded outline warning alert</DiAlert>
  <DiAlert variant="error" outline rounded>Rounded outline error alert</DiAlert>
</div>`

const roundedDefaultAlerts = `<div class="flex flex-col gap-3">
  <DiAlert variant="primary" soft rounded>Rounded default primary alert</DiAlert>
  <DiAlert variant="info" soft rounded>Rounded default info alert</DiAlert>
  <DiAlert variant="success" soft rounded>Rounded default success alert</DiAlert>
  <DiAlert variant="warning" soft rounded>Rounded default warning alert</DiAlert>
  <DiAlert variant="error" soft rounded>Rounded default error alert</DiAlert>
</div>`

const customCloseAlerts = `<script setup lang="ts">
import { ref } from 'vue'

import DiAlert from '@/shared/ui/base/DiAlert.vue'
import DiButton from '@/shared/ui/base/DiButton.vue'
import DiIcon from '@/shared/ui/base/DiIcon.vue'

const customClosePrimary = ref(true)
const customCloseInfo = ref(true)
const customCloseWarning = ref(true)
const customCloseError = ref(true)
<\/script>

<template>
  <div class="flex flex-col gap-3">
    <DiAlert v-model="customClosePrimary" variant="primary" soft rounded closable>
      Alert with a custom primary close button
      <template #close="{ close }">
        <DiButton variant="primary" size="sm" circle aria-label="Dismiss primary alert" @click="close">
          <DiIcon name="xMark" size="sm" />
        </DiButton>
      </template>
    </DiAlert>
    <DiAlert v-model="customCloseInfo" variant="info" soft rounded closable>
      Alert with a custom info close button
      <template #close="{ close }">
        <DiButton variant="info" size="sm" circle aria-label="Dismiss info alert" @click="close">
          <DiIcon name="xMark" size="sm" />
        </DiButton>
      </template>
    </DiAlert>
    <DiAlert v-model="customCloseWarning" variant="warning" soft rounded closable>
      Alert with a custom warning close button
      <template #close="{ close }">
        <DiButton variant="warning" size="sm" circle aria-label="Dismiss warning alert" @click="close">
          <DiIcon name="xMark" size="sm" />
        </DiButton>
      </template>
    </DiAlert>
    <DiAlert v-model="customCloseError" variant="error" soft rounded closable>
      Alert with a custom error close button
      <template #close="{ close }">
        <DiButton variant="error" size="sm" circle aria-label="Dismiss error alert" @click="close">
          <DiIcon name="xMark" size="sm" />
        </DiButton>
      </template>
    </DiAlert>
  </div>
</template>`

const iconAlerts = `<div class="flex flex-col gap-3">
  <DiAlert variant="primary" soft>
    <template #icon><DiIcon name="informationCircle" size="lg" /></template>
    Primary alert with a custom icon
  </DiAlert>
  <DiAlert variant="info" soft show-icon>Information alert with an icon</DiAlert>
  <DiAlert variant="success" soft show-icon>Success alert with an icon</DiAlert>
  <DiAlert variant="warning" soft show-icon>Warning alert with an icon</DiAlert>
  <DiAlert variant="error" soft show-icon>Danger alert with an icon</DiAlert>
</div>`

const customizedIconAlerts = `<div class="flex flex-col gap-3">
  <DiAlert variant="primary" soft class="border-s-4 border-s-primary">
    <template #icon><DiIcon name="informationCircle" size="lg" /></template>
    A customized primary alert with an icon
  </DiAlert>
  <DiAlert variant="info" soft class="border-s-4 border-s-info">
    <template #icon><DiIcon name="checkCircle" size="lg" /></template>
    A customized info alert with an icon
  </DiAlert>
  <DiAlert variant="warning" soft class="border-s-4 border-s-warning">
    <template #icon><DiIcon name="exclamationTriangle" size="lg" /></template>
    A customized warning alert with an icon
  </DiAlert>
  <DiAlert variant="error" soft class="border-s-4 border-s-error">
    <template #icon><DiIcon name="xCircle" size="lg" /></template>
    A customized danger alert with an icon
  </DiAlert>
</div>`

const imageAlerts = `<div class="flex flex-col gap-3">
  <DiAlert variant="primary" soft>
    <template #icon>
      <img src="@/assets/images/user.png" alt="" class="size-8 rounded-full object-cover">
    </template>
    A primary alert with an image
  </DiAlert>
  <DiAlert variant="info" soft>
    <template #icon>
      <DiLogo variant="mini" class="size-8 rounded-lg text-base-content" />
    </template>
    An info alert with a different image
  </DiAlert>
  <DiAlert variant="success" soft>
    <template #icon>
      <img src="@/assets/images/user.png" alt="" class="size-10 rounded-lg object-cover">
    </template>
    A success alert with a larger image
  </DiAlert>
</div>`

const sizedImageAlerts = `<div class="flex flex-col gap-3">
  <DiAlert variant="primary" soft>
    <template #icon>
      <img src="@/assets/images/user.png" alt="" class="size-6 rounded-full object-cover">
    </template>
    An alert with a small image
  </DiAlert>
  <DiAlert variant="info" soft>
    <template #icon>
      <DiLogo variant="mini" class="size-8 rounded-lg text-base-content" />
    </template>
    An alert with a medium image
  </DiAlert>
  <DiAlert variant="warning" soft>
    <template #icon>
      <img src="@/assets/images/user.png" alt="" class="size-10 rounded-lg object-cover">
    </template>
    An alert with a large image
  </DiAlert>
</div>`

const actionAlerts = `<div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
  <DiAlert
    variant="primary"
    layout="vertical"
    show-icon
    title="Information?"
    description="This alert shares important information."
    class="min-h-64 rounded-none border-x-0 border-b-0 border-t-2 bg-base-100 py-8 text-base-content"
  >
    <template #actions>
      <div class="flex gap-2">
        <DiButton size="xs" variant="primary" outline>Decline</DiButton>
        <DiButton size="xs" variant="primary">Accept</DiButton>
      </div>
    </template>
  </DiAlert>
  <DiAlert
    variant="info"
    layout="vertical"
    show-icon
    title="Confirmed"
    description="Your confirmation was recorded."
    class="min-h-64 rounded-none border-x-0 border-b-0 border-t-2 bg-base-100 py-8 text-base-content"
  >
    <template #actions><DiButton size="xs" variant="info">Close</DiButton></template>
  </DiAlert>
  <DiAlert
    variant="warning"
    layout="vertical"
    show-icon
    title="Warning"
    description="Review the warning before continuing."
    class="min-h-64 rounded-none border-x-0 border-b-0 border-t-2 bg-base-100 py-8 text-base-content"
  >
    <template #actions>
      <div class="flex gap-2">
        <DiButton size="xs" variant="warning" outline>Back</DiButton>
        <DiButton size="xs" variant="warning">Continue</DiButton>
      </div>
    </template>
  </DiAlert>
  <DiAlert
    variant="error"
    layout="vertical"
    show-icon
    title="Danger"
    description="This action cannot be undone."
    class="min-h-64 rounded-none border-x-0 border-b-0 border-t-2 bg-base-100 py-8 text-base-content"
  >
    <template #actions><DiButton size="xs" variant="error">Delete</DiButton></template>
  </DiAlert>
</div>`

const richAlerts = `<div class="grid gap-3 lg:grid-cols-4">
  <DiAlert variant="primary" outline show-icon title="Information Alert">
    Information alert with actions
    <template #actions><DiButton size="xs" variant="ghost">Open</DiButton></template>
  </DiAlert>
  <DiAlert variant="success" outline show-icon title="Success Alert">
    Your changes were saved
    <template #actions><DiButton size="xs" variant="ghost">Close</DiButton></template>
  </DiAlert>
  <DiAlert variant="warning" outline show-icon title="Warning Alert">
    Review this warning
    <template #actions><DiButton size="xs" variant="ghost">Open</DiButton></template>
  </DiAlert>
  <DiAlert variant="error" outline show-icon title="Danger Alert">
    Action requires attention
    <template #actions><DiButton size="xs" variant="ghost">Continue</DiButton></template>
  </DiAlert>
</div>`

const additionalContent = `<div class="grid gap-4 lg:grid-cols-2">
  <DiAlert variant="primary" class="block overflow-hidden p-0">
    <div class="flex items-center justify-between bg-primary px-4 py-3 text-primary-content">
      <strong>Thank you for reporting this.</strong>
      <DiIcon name="xMark" size="sm" />
    </div>
    <div class="bg-base-200 px-4 py-3 text-base-content">
      We appreciate your feedback.
      <a href="#alert-actions" class="font-semibold underline">Visit support for queries.</a>
    </div>
  </DiAlert>
  <DiAlert variant="info" class="block overflow-hidden p-0">
    <div class="flex items-center justify-between bg-info px-4 py-3 text-info-content">
      <strong>Thank you for reporting this.</strong>
      <DiIcon name="xMark" size="sm" />
    </div>
    <div class="bg-base-200 px-4 py-3 text-base-content">
      We appreciate your feedback.
      <a href="#alert-actions" class="font-semibold underline">Visit support for queries.</a>
    </div>
  </DiAlert>
  <DiAlert variant="success" class="block overflow-hidden p-0">
    <div class="flex items-center justify-between bg-success px-4 py-3 text-success-content">
      <strong>Thank you for reporting this.</strong>
      <DiIcon name="xMark" size="sm" />
    </div>
    <div class="bg-base-200 px-4 py-3 text-base-content">
      We appreciate your feedback.
      <a href="#alert-actions" class="font-semibold underline">Visit support for queries.</a>
    </div>
  </DiAlert>
  <DiAlert variant="warning" class="block overflow-hidden p-0">
    <div class="flex items-center justify-between bg-warning px-4 py-3 text-warning-content">
      <strong>Thank you for reporting this.</strong>
      <DiIcon name="xMark" size="sm" />
    </div>
    <div class="bg-base-200 px-4 py-3 text-base-content">
      We appreciate your feedback.
      <a href="#alert-actions" class="font-semibold underline">Visit support for queries.</a>
    </div>
  </DiAlert>
</div>`
</script>

<template>
  <div class="grid grid-cols-1 items-start gap-4 xl:grid-cols-2">
    <PreviewCodeCard
      :title="$t('features.uiElements.alert.defaultAlert')"
      accent-color="#14b8a6"
      :code="basicAlert"
      language="html"
    >
      <DiAlert variant="warning" soft>
        <span>
          <strong>{{ $t('features.uiElements.alert.live.headsUp') }}</strong>
          {{ $t('features.uiElements.alert.messages.invalidEmail') }}
        </span>
      </DiAlert>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.alert.live.liveExample')"
      accent-color="#14b8a6"
      :code="liveAlert"
      language="vue"
    >
      <div class="flex flex-col items-start gap-3">
        <DiButton variant="primary" @click="showLiveAlert = true">
          {{ $t('features.uiElements.alert.live.showLiveAlert') }}
        </DiButton>
        <DiAlert v-model="showLiveAlert" variant="success" role="status" closable class="w-full">
          {{ $t('features.uiElements.alert.live.yourChangesHaveBeenSaved') }}
        </DiAlert>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.alert.live.defaultAlerts')"
      accent-color="#14b8a6"
      :code="defaultAlerts"
      language="html"
    >
      <div class="flex flex-col gap-3">
        <DiAlert variant="primary" soft>
          {{ $t('features.uiElements.alert.live.aSimplePrimaryAlertCheckItOut') }}
        </DiAlert>
        <DiAlert variant="secondary" soft>
          {{ $t('features.uiElements.alert.live.aSimpleSecondaryAlertCheckItOut') }}
        </DiAlert>
        <DiAlert variant="info" soft>
          {{ $t('features.uiElements.alert.live.aSimpleInfoAlertCheckItOut') }}
        </DiAlert>
        <DiAlert variant="success" soft>
          {{ $t('features.uiElements.alert.live.aSimpleSuccessAlertCheckItOut') }}
        </DiAlert>
        <DiAlert variant="warning" soft>
          {{ $t('features.uiElements.alert.live.aSimpleWarningAlertCheckItOut') }}
        </DiAlert>
        <DiAlert variant="error" soft>
          {{ $t('features.uiElements.alert.live.aSimpleDangerAlertCheckItOut') }}
        </DiAlert>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.alert.live.linksInAlerts')"
      accent-color="#14b8a6"
      :code="linksInAlerts"
      language="html"
    >
      <div class="flex flex-col gap-3">
        <DiAlert variant="primary" soft>
          {{ $t('features.uiElements.alert.live.aPrimaryAlertWith')
          }}<a href="#alert-actions" class="font-semibold underline">{{
            $t('features.uiElements.alert.live.anExampleLink')
          }}</a>.
        </DiAlert>
        <DiAlert variant="info" soft>
          {{ $t('features.uiElements.alert.live.anInfoAlertWith')
          }}<a href="#alert-actions" class="font-semibold underline">{{
            $t('features.uiElements.alert.live.anExampleLink')
          }}</a>.
        </DiAlert>
        <DiAlert variant="success" soft>
          {{ $t('features.uiElements.alert.live.aSuccessAlertWith')
          }}<a href="#alert-actions" class="font-semibold underline">{{
            $t('features.uiElements.alert.live.anExampleLink')
          }}</a>.
        </DiAlert>
        <DiAlert variant="warning" soft>
          {{ $t('features.uiElements.alert.live.aWarningAlertWith')
          }}<a href="#alert-actions" class="font-semibold underline">{{
            $t('features.uiElements.alert.live.anExampleLink')
          }}</a>.
        </DiAlert>
        <DiAlert variant="error" soft>
          {{ $t('features.uiElements.alert.live.anErrorAlertWith')
          }}<a href="#alert-actions" class="font-semibold underline">{{
            $t('features.uiElements.alert.live.anExampleLink')
          }}</a>.
        </DiAlert>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.alert.coloredAlerts')"
      accent-color="#14b8a6"
      :code="coloredAlerts"
      language="html"
    >
      <div class="flex flex-col gap-3">
        <DiAlert variant="primary">
          {{ $t('features.uiElements.alert.live.aSimplePrimaryAlertCheckItOut') }}
        </DiAlert>
        <DiAlert variant="secondary">
          {{ $t('features.uiElements.alert.live.aSimpleSecondaryAlertCheckItOut') }}
        </DiAlert>
        <DiAlert variant="accent">
          {{ $t('features.uiElements.alert.live.aSimpleAccentAlertCheckItOut') }}
        </DiAlert>
        <DiAlert variant="info">
          {{ $t('features.uiElements.alert.live.aSimpleInfoAlertCheckItOut') }}
        </DiAlert>
        <DiAlert variant="success">
          {{ $t('features.uiElements.alert.live.aSimpleSuccessAlertCheckItOut') }}
        </DiAlert>
        <DiAlert variant="warning">
          {{ $t('features.uiElements.alert.live.aSimpleWarningAlertCheckItOut') }}
        </DiAlert>
        <DiAlert variant="error">
          {{ $t('features.uiElements.alert.live.aSimpleDangerAlertCheckItOut') }}
        </DiAlert>
        <DiAlert variant="neutral">
          {{ $t('features.uiElements.alert.live.aSimpleNeutralAlertCheckItOut') }}
        </DiAlert>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.alert.outlineAlerts')"
      accent-color="#14b8a6"
      :code="outlineAlerts"
      language="html"
    >
      <div class="flex flex-col gap-3">
        <DiAlert variant="primary" outline>
          {{ $t('features.uiElements.alert.live.primaryOutlineAlert') }}
        </DiAlert>
        <DiAlert variant="secondary" outline>
          {{ $t('features.uiElements.alert.live.secondaryOutlineAlert') }}
        </DiAlert>
        <DiAlert variant="info" outline>
          {{ $t('features.uiElements.alert.live.infoOutlineAlert') }}
        </DiAlert>
        <DiAlert variant="success" outline>
          {{ $t('features.uiElements.alert.live.successOutlineAlert') }}
        </DiAlert>
        <DiAlert variant="warning" outline>
          {{ $t('features.uiElements.alert.live.warningOutlineAlert') }}
        </DiAlert>
        <DiAlert variant="error" outline>
          {{ $t('features.uiElements.alert.live.errorOutlineAlert') }}
        </DiAlert>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.alert.live.solidAlertsWithDifferentShadows')"
      accent-color="#14b8a6"
      :code="solidShadowAlerts"
      language="html"
    >
      <div class="flex flex-col gap-3">
        <DiAlert variant="primary" class="shadow-sm">
          {{ $t('features.uiElements.alert.live.primaryAlertWithASmallShadow') }}
        </DiAlert>
        <DiAlert variant="primary" class="shadow-md">
          {{ $t('features.uiElements.alert.live.primaryAlertWithAMediumShadow') }}
        </DiAlert>
        <DiAlert variant="primary" class="shadow-xl">
          {{ $t('features.uiElements.alert.live.primaryAlertWithALargeShadow') }}
        </DiAlert>
        <DiAlert variant="secondary" class="shadow-sm">
          {{ $t('features.uiElements.alert.live.secondaryAlertWithASmallShadow') }}
        </DiAlert>
        <DiAlert variant="secondary" class="shadow-md">
          {{ $t('features.uiElements.alert.live.secondaryAlertWithAMediumShadow') }}
        </DiAlert>
        <DiAlert variant="secondary" class="shadow-xl">
          {{ $t('features.uiElements.alert.live.secondaryAlertWithALargeShadow') }}
        </DiAlert>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.alert.live.defaultAlertsWithDifferentShadows')"
      accent-color="#14b8a6"
      :code="defaultShadowAlerts"
      language="html"
    >
      <div class="flex flex-col gap-4">
        <DiAlert variant="primary" soft class="shadow-sm">
          {{ $t('features.uiElements.alert.live.primaryDefaultAlertWithASmallShadow') }}
        </DiAlert>
        <DiAlert variant="primary" soft class="shadow-md">
          {{ $t('features.uiElements.alert.live.primaryDefaultAlertWithAMediumShadow') }}
        </DiAlert>
        <DiAlert variant="primary" soft class="shadow-xl">
          {{ $t('features.uiElements.alert.live.primaryDefaultAlertWithALargeShadow') }}
        </DiAlert>
        <DiAlert variant="info" soft class="shadow-sm">
          {{ $t('features.uiElements.alert.live.softInfoAlertWithASmallShadow') }}
        </DiAlert>
        <DiAlert variant="info" soft class="shadow-md">
          {{ $t('features.uiElements.alert.live.softInfoAlertWithAMediumShadow') }}
        </DiAlert>
        <DiAlert variant="info" soft class="shadow-xl">
          {{ $t('features.uiElements.alert.live.softInfoAlertWithALargeShadow') }}
        </DiAlert>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.alert.live.roundedSolidAlerts')"
      accent-color="#14b8a6"
      :code="roundedSolidAlerts"
      language="html"
    >
      <div class="flex flex-col gap-3">
        <DiAlert variant="primary" rounded>
          {{ $t('features.uiElements.alert.live.roundedPrimaryAlert') }}
        </DiAlert>
        <DiAlert variant="secondary" rounded>
          {{ $t('features.uiElements.alert.live.roundedSecondaryAlert') }}
        </DiAlert>
        <DiAlert variant="info" rounded>
          {{ $t('features.uiElements.alert.live.roundedInfoAlert') }}
        </DiAlert>
        <DiAlert variant="warning" rounded>
          {{ $t('features.uiElements.alert.live.roundedWarningAlert') }}
        </DiAlert>
        <DiAlert variant="error" rounded>
          {{ $t('features.uiElements.alert.live.roundedErrorAlert') }}
        </DiAlert>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.alert.live.roundedOutlineAlerts')"
      accent-color="#14b8a6"
      :code="roundedOutlineAlerts"
      language="html"
    >
      <div class="flex flex-col gap-3">
        <DiAlert variant="primary" outline rounded>
          {{ $t('features.uiElements.alert.live.roundedOutlinePrimaryAlert') }}
        </DiAlert>
        <DiAlert variant="secondary" outline rounded>
          {{ $t('features.uiElements.alert.live.roundedOutlineSecondaryAlert') }}
        </DiAlert>
        <DiAlert variant="info" outline rounded>
          {{ $t('features.uiElements.alert.live.roundedOutlineInfoAlert') }}
        </DiAlert>
        <DiAlert variant="warning" outline rounded>
          {{ $t('features.uiElements.alert.live.roundedOutlineWarningAlert') }}
        </DiAlert>
        <DiAlert variant="error" outline rounded>
          {{ $t('features.uiElements.alert.live.roundedOutlineErrorAlert') }}
        </DiAlert>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.alert.live.roundedDefaultAlerts')"
      accent-color="#14b8a6"
      :code="roundedDefaultAlerts"
      language="html"
    >
      <div class="flex flex-col gap-3">
        <DiAlert variant="primary" soft rounded>
          {{ $t('features.uiElements.alert.live.roundedDefaultPrimaryAlert') }}
        </DiAlert>
        <DiAlert variant="info" soft rounded>
          {{ $t('features.uiElements.alert.live.roundedDefaultInfoAlert') }}
        </DiAlert>
        <DiAlert variant="success" soft rounded>
          {{ $t('features.uiElements.alert.live.roundedDefaultSuccessAlert') }}
        </DiAlert>
        <DiAlert variant="warning" soft rounded>
          {{ $t('features.uiElements.alert.live.roundedDefaultWarningAlert') }}
        </DiAlert>
        <DiAlert variant="error" soft rounded>
          {{ $t('features.uiElements.alert.live.roundedDefaultErrorAlert') }}
        </DiAlert>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.alert.closableAlerts')"
      accent-color="#14b8a6"
      :code="customCloseAlerts"
      language="vue"
    >
      <div class="flex flex-col gap-3">
        <DiAlert v-model="customClosePrimary" variant="primary" soft rounded closable>
          {{ $t('features.uiElements.alert.live.alertWithACustomPrimaryCloseButton')
          }}<template #close="{ close }">
            <DiButton
              variant="primary"
              size="sm"
              circle
              :aria-label="$t('features.uiElements.alert.live.dismissPrimaryAlert')"
              @click="close"
            >
              <DiIcon name="xMark" size="sm" />
            </DiButton>
          </template>
        </DiAlert>
        <DiAlert v-model="customCloseInfo" variant="info" soft rounded closable>
          {{ $t('features.uiElements.alert.live.alertWithACustomInfoCloseButton')
          }}<template #close="{ close }">
            <DiButton
              variant="info"
              size="sm"
              circle
              :aria-label="$t('features.uiElements.alert.live.dismissInfoAlert')"
              @click="close"
            >
              <DiIcon name="xMark" size="sm" />
            </DiButton>
          </template>
        </DiAlert>
        <DiAlert v-model="customCloseWarning" variant="warning" soft rounded closable>
          {{ $t('features.uiElements.alert.live.alertWithACustomWarningCloseButton')
          }}<template #close="{ close }">
            <DiButton
              variant="warning"
              size="sm"
              circle
              :aria-label="$t('features.uiElements.alert.live.dismissWarningAlert')"
              @click="close"
            >
              <DiIcon name="xMark" size="sm" />
            </DiButton>
          </template>
        </DiAlert>
        <DiAlert v-model="customCloseError" variant="error" soft rounded closable>
          {{ $t('features.uiElements.alert.live.alertWithACustomErrorCloseButton')
          }}<template #close="{ close }">
            <DiButton
              variant="error"
              size="sm"
              circle
              :aria-label="$t('features.uiElements.alert.live.dismissErrorAlert')"
              @click="close"
            >
              <DiIcon name="xMark" size="sm" />
            </DiButton>
          </template>
        </DiAlert>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.alert.alertWithCustomIcon')"
      accent-color="#14b8a6"
      :code="iconAlerts"
      language="html"
    >
      <div class="flex flex-col gap-3">
        <DiAlert variant="primary" soft>
          <template #icon>
            <DiIcon name="informationCircle" size="lg" />
          </template>{{ $t('features.uiElements.alert.live.primaryAlertWithACustomIcon') }}
        </DiAlert>
        <DiAlert variant="info" soft show-icon>
          {{ $t('features.uiElements.alert.live.informationAlertWithAnIcon') }}
        </DiAlert>
        <DiAlert variant="success" soft show-icon>
          {{ $t('features.uiElements.alert.live.successAlertWithAnIcon') }}
        </DiAlert>
        <DiAlert variant="warning" soft show-icon>
          {{ $t('features.uiElements.alert.live.warningAlertWithAnIcon') }}
        </DiAlert>
        <DiAlert variant="error" soft show-icon>
          {{ $t('features.uiElements.alert.live.dangerAlertWithAnIcon') }}
        </DiAlert>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.alert.live.customizedAlertsWithIcons')"
      accent-color="#14b8a6"
      :code="customizedIconAlerts"
      language="html"
    >
      <div class="flex flex-col gap-3">
        <DiAlert variant="primary" soft class="border-s-4 border-s-primary">
          <template #icon>
            <DiIcon name="informationCircle" size="lg" />
          </template>{{ $t('features.uiElements.alert.live.aCustomizedPrimaryAlertWithAnIcon') }}
        </DiAlert>
        <DiAlert variant="info" soft class="border-s-4 border-s-info">
          <template #icon>
            <DiIcon name="checkCircle" size="lg" />
          </template>{{ $t('features.uiElements.alert.live.aCustomizedInfoAlertWithAnIcon') }}
        </DiAlert>
        <DiAlert variant="warning" soft class="border-s-4 border-s-warning">
          <template #icon>
            <DiIcon name="exclamationTriangle" size="lg" />
          </template>{{ $t('features.uiElements.alert.live.aCustomizedWarningAlertWithAnIcon') }}
        </DiAlert>
        <DiAlert variant="error" soft class="border-s-4 border-s-error">
          <template #icon>
            <DiIcon name="xCircle" size="lg" />
          </template>{{ $t('features.uiElements.alert.live.aCustomizedDangerAlertWithAnIcon') }}
        </DiAlert>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.alert.live.alertsWithImages')"
      accent-color="#14b8a6"
      :code="imageAlerts"
      language="html"
    >
      <div class="flex flex-col gap-3">
        <DiAlert variant="primary" soft>
          <template #icon>
            <img
              src="@/assets/images/user.png"
              alt=""
              class="size-8 rounded-full object-cover"
            >
          </template>{{ $t('features.uiElements.alert.live.aPrimaryAlertWithAnImage') }}
        </DiAlert>
        <DiAlert variant="info" soft>
          <template #icon>
            <DiLogo variant="mini" class="size-8 rounded-lg text-base-content" />
          </template>{{ $t('features.uiElements.alert.live.anInfoAlertWithADifferentImage') }}
        </DiAlert>
        <DiAlert variant="success" soft>
          <template #icon>
            <img
              src="@/assets/images/user.png"
              alt=""
              class="size-10 rounded-lg object-cover"
            >
          </template>{{ $t('features.uiElements.alert.live.aSuccessAlertWithALargerImage') }}
        </DiAlert>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.alert.live.alertsWithDifferentSizeImages')"
      accent-color="#14b8a6"
      :code="sizedImageAlerts"
      language="html"
    >
      <div class="flex flex-col gap-3">
        <DiAlert variant="primary" soft>
          <template #icon>
            <img
              src="@/assets/images/user.png"
              alt=""
              class="size-6 rounded-full object-cover"
            >
          </template>{{ $t('features.uiElements.alert.live.anAlertWithASmallImage') }}
        </DiAlert>
        <DiAlert variant="info" soft>
          <template #icon>
            <DiLogo variant="mini" class="size-8 rounded-lg text-base-content" />
          </template>{{ $t('features.uiElements.alert.live.anAlertWithAMediumImage') }}
        </DiAlert>
        <DiAlert variant="warning" soft>
          <template #icon>
            <img
              src="@/assets/images/user.png"
              alt=""
              class="size-10 rounded-lg object-cover"
            >
          </template>{{ $t('features.uiElements.alert.live.anAlertWithALargeImage') }}
        </DiAlert>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      id="alert-actions"
      :title="$t('features.uiElements.alert.alertWithActions')"
      accent-color="#14b8a6"
      :code="actionAlerts"
      language="html"
      class="xl:col-span-2"
    >
      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <DiAlert
          variant="primary"
          layout="vertical"
          show-icon
          :title="$t('features.uiElements.alert.live.information')"
          description="This alert shares important information."
          class="min-h-64 rounded-none border-x-0 border-b-0 border-t-2 bg-base-100 py-8 text-base-content"
        >
          <template #actions>
            <div class="flex gap-2">
              <DiButton size="xs" variant="primary" outline>
                {{ $t('features.uiElements.alert.live.decline') }}
              </DiButton>
              <DiButton size="xs" variant="primary">
                {{ $t('features.uiElements.alert.live.accept') }}
              </DiButton>
            </div>
          </template>
        </DiAlert>
        <DiAlert
          variant="info"
          layout="vertical"
          show-icon
          :title="$t('features.uiElements.alert.live.confirmed')"
          description="Your confirmation was recorded."
          class="min-h-64 rounded-none border-x-0 border-b-0 border-t-2 bg-base-100 py-8 text-base-content"
        >
          <template #actions>
            <DiButton size="xs" variant="info">
              {{ $t('features.uiElements.alert.live.close') }}
            </DiButton>
          </template>
        </DiAlert>
        <DiAlert
          variant="warning"
          layout="vertical"
          show-icon
          :title="$t('features.uiElements.alert.live.warning')"
          description="Review the warning before continuing."
          class="min-h-64 rounded-none border-x-0 border-b-0 border-t-2 bg-base-100 py-8 text-base-content"
        >
          <template #actions>
            <div class="flex gap-2">
              <DiButton size="xs" variant="warning" outline>
                {{ $t('features.uiElements.alert.live.back') }}
              </DiButton>
              <DiButton size="xs" variant="warning">
                {{ $t('features.uiElements.alert.live.continue') }}
              </DiButton>
            </div>
          </template>
        </DiAlert>
        <DiAlert
          variant="error"
          layout="vertical"
          show-icon
          :title="$t('features.uiElements.alert.live.danger')"
          description="This action cannot be undone."
          class="min-h-64 rounded-none border-x-0 border-b-0 border-t-2 bg-base-100 py-8 text-base-content"
        >
          <template #actions>
            <DiButton size="xs" variant="error">
              {{ $t('features.uiElements.alert.live.delete') }}
            </DiButton>
          </template>
        </DiAlert>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.alert.alertWithTitleAndActions')"
      accent-color="#14b8a6"
      :code="richAlerts"
      language="html"
      class="xl:col-span-2"
    >
      <div class="grid gap-3 lg:grid-cols-4">
        <DiAlert
          variant="primary"
          outline
          show-icon
          :title="$t('features.uiElements.alert.live.informationAlert')"
        >
          {{ $t('features.uiElements.alert.live.informationAlertWithActions')
          }}<template #actions>
            <DiButton size="xs" variant="ghost">
              {{ $t('features.uiElements.alert.live.open') }}
            </DiButton>
          </template>
        </DiAlert>
        <DiAlert
          variant="success"
          outline
          show-icon
          :title="$t('features.uiElements.alert.live.successAlert')"
        >
          {{ $t('features.uiElements.alert.live.yourChangesWereSaved')
          }}<template #actions>
            <DiButton size="xs" variant="ghost">
              {{ $t('features.uiElements.alert.live.close') }}
            </DiButton>
          </template>
        </DiAlert>
        <DiAlert
          variant="warning"
          outline
          show-icon
          :title="$t('features.uiElements.alert.live.warningAlert')"
        >
          {{ $t('features.uiElements.alert.live.reviewThisWarning')
          }}<template #actions>
            <DiButton size="xs" variant="ghost">
              {{ $t('features.uiElements.alert.live.open') }}
            </DiButton>
          </template>
        </DiAlert>
        <DiAlert
          variant="error"
          outline
          show-icon
          :title="$t('features.uiElements.alert.live.dangerAlert')"
        >
          {{ $t('features.uiElements.alert.live.actionRequiresAttention')
          }}<template #actions>
            <DiButton size="xs" variant="ghost">
              {{ $t('features.uiElements.alert.live.continue') }}
            </DiButton>
          </template>
        </DiAlert>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.alert.live.additionalContent')"
      accent-color="#14b8a6"
      :code="additionalContent"
      language="html"
      class="xl:col-span-2"
    >
      <div class="grid gap-4 lg:grid-cols-2">
        <DiAlert variant="primary" class="block overflow-hidden p-0">
          <div class="flex items-center justify-between bg-primary px-4 py-3 text-primary-content">
            <strong>{{ $t('features.uiElements.alert.live.thankYouForReportingThis') }}</strong>
            <DiIcon name="xMark" size="sm" />
          </div>
          <div class="bg-base-200 px-4 py-3 text-base-content">
            {{ $t('features.uiElements.alert.live.weAppreciateYourFeedback')
            }}<a href="#alert-actions" class="font-semibold underline">{{
              $t('features.uiElements.alert.live.visitSupportForQueries')
            }}</a>
          </div>
        </DiAlert>
        <DiAlert variant="info" class="block overflow-hidden p-0">
          <div class="flex items-center justify-between bg-info px-4 py-3 text-info-content">
            <strong>{{ $t('features.uiElements.alert.live.thankYouForReportingThis') }}</strong>
            <DiIcon name="xMark" size="sm" />
          </div>
          <div class="bg-base-200 px-4 py-3 text-base-content">
            {{ $t('features.uiElements.alert.live.weAppreciateYourFeedback')
            }}<a href="#alert-actions" class="font-semibold underline">{{
              $t('features.uiElements.alert.live.visitSupportForQueries')
            }}</a>
          </div>
        </DiAlert>
        <DiAlert variant="success" class="block overflow-hidden p-0">
          <div class="flex items-center justify-between bg-success px-4 py-3 text-success-content">
            <strong>{{ $t('features.uiElements.alert.live.thankYouForReportingThis') }}</strong>
            <DiIcon name="xMark" size="sm" />
          </div>
          <div class="bg-base-200 px-4 py-3 text-base-content">
            {{ $t('features.uiElements.alert.live.weAppreciateYourFeedback')
            }}<a href="#alert-actions" class="font-semibold underline">{{
              $t('features.uiElements.alert.live.visitSupportForQueries')
            }}</a>
          </div>
        </DiAlert>
        <DiAlert variant="warning" class="block overflow-hidden p-0">
          <div class="flex items-center justify-between bg-warning px-4 py-3 text-warning-content">
            <strong>{{ $t('features.uiElements.alert.live.thankYouForReportingThis') }}</strong>
            <DiIcon name="xMark" size="sm" />
          </div>
          <div class="bg-base-200 px-4 py-3 text-base-content">
            {{ $t('features.uiElements.alert.live.weAppreciateYourFeedback')
            }}<a href="#alert-actions" class="font-semibold underline">{{
              $t('features.uiElements.alert.live.visitSupportForQueries')
            }}</a>
          </div>
        </DiAlert>
      </div>
    </PreviewCodeCard>
  </div>
</template>
