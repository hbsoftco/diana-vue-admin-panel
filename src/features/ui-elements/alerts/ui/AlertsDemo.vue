<script setup lang="ts">
import { ref } from 'vue'

import DiAlert from '@/shared/ui/base/DiAlert.vue'
import DiButton from '@/shared/ui/base/DiButton.vue'
import DiIcon from '@/shared/ui/base/DiIcon.vue'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

const customClosePrimary = ref(true)
const customCloseInfo = ref(true)
const customCloseWarning = ref(true)
const customCloseError = ref(true)
const showLiveAlert = ref(false)

const basicAlert = `<DiAlert variant="warning" soft>
  <span>
    <strong>Heads up!</strong>
    {{ $t('features.ui-elements.alert.messages.invalidEmail') }}
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
      <img src="@/assets/images/logo-mini.png" alt="" class="size-8 rounded-lg object-cover">
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
      <img src="@/assets/images/logo-mini.png" alt="" class="size-8 rounded-lg object-cover">
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
      :title="$t('features.ui-elements.alert.defaultAlert')"
      accent-color="#14b8a6"
      :code="basicAlert"
      language="html"
    >
      <DiAlert variant="warning" soft>
        <span>
          <strong>Heads up!</strong>
          {{ $t('features.ui-elements.alert.messages.invalidEmail') }}
        </span>
      </DiAlert>
    </PreviewCodeCard>

    <PreviewCodeCard
      title="Live example"
      accent-color="#14b8a6"
      :code="liveAlert"
      language="vue"
    >
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
    </PreviewCodeCard>

    <PreviewCodeCard
      title="Default alerts"
      accent-color="#14b8a6"
      :code="defaultAlerts"
      language="html"
    >
      <div class="flex flex-col gap-3">
        <DiAlert variant="primary" soft>
          A simple primary alert—check it out!
        </DiAlert>
        <DiAlert variant="secondary" soft>
          A simple secondary alert—check it out!
        </DiAlert>
        <DiAlert variant="info" soft>
          A simple info alert—check it out!
        </DiAlert>
        <DiAlert variant="success" soft>
          A simple success alert—check it out!
        </DiAlert>
        <DiAlert variant="warning" soft>
          A simple warning alert—check it out!
        </DiAlert>
        <DiAlert variant="error" soft>
          A simple danger alert—check it out!
        </DiAlert>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      title="Links in alerts"
      accent-color="#14b8a6"
      :code="linksInAlerts"
      language="html"
    >
      <div class="flex flex-col gap-3">
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
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.ui-elements.alert.coloredAlerts')"
      accent-color="#14b8a6"
      :code="coloredAlerts"
      language="html"
    >
      <div class="flex flex-col gap-3">
        <DiAlert variant="primary">
          A simple primary alert—check it out!
        </DiAlert>
        <DiAlert variant="secondary">
          A simple secondary alert—check it out!
        </DiAlert>
        <DiAlert variant="accent">
          A simple accent alert—check it out!
        </DiAlert>
        <DiAlert variant="info">
          A simple info alert—check it out!
        </DiAlert>
        <DiAlert variant="success">
          A simple success alert—check it out!
        </DiAlert>
        <DiAlert variant="warning">
          A simple warning alert—check it out!
        </DiAlert>
        <DiAlert variant="error">
          A simple danger alert—check it out!
        </DiAlert>
        <DiAlert variant="neutral">
          A simple neutral alert—check it out!
        </DiAlert>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.ui-elements.alert.outlineAlerts')"
      accent-color="#14b8a6"
      :code="outlineAlerts"
      language="html"
    >
      <div class="flex flex-col gap-3">
        <DiAlert variant="primary" outline>
          Primary outline alert
        </DiAlert>
        <DiAlert variant="secondary" outline>
          Secondary outline alert
        </DiAlert>
        <DiAlert variant="info" outline>
          Info outline alert
        </DiAlert>
        <DiAlert variant="success" outline>
          Success outline alert
        </DiAlert>
        <DiAlert variant="warning" outline>
          Warning outline alert
        </DiAlert>
        <DiAlert variant="error" outline>
          Error outline alert
        </DiAlert>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      title="Solid alerts with different shadows"
      accent-color="#14b8a6"
      :code="solidShadowAlerts"
      language="html"
    >
      <div class="flex flex-col gap-3">
        <DiAlert variant="primary" class="shadow-sm">
          Primary alert with a small shadow
        </DiAlert>
        <DiAlert variant="primary" class="shadow-md">
          Primary alert with a medium shadow
        </DiAlert>
        <DiAlert variant="primary" class="shadow-xl">
          Primary alert with a large shadow
        </DiAlert>
        <DiAlert variant="secondary" class="shadow-sm">
          Secondary alert with a small shadow
        </DiAlert>
        <DiAlert variant="secondary" class="shadow-md">
          Secondary alert with a medium shadow
        </DiAlert>
        <DiAlert variant="secondary" class="shadow-xl">
          Secondary alert with a large shadow
        </DiAlert>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      title="Default alerts with different shadows"
      accent-color="#14b8a6"
      :code="defaultShadowAlerts"
      language="html"
    >
      <div class="flex flex-col gap-4">
        <DiAlert variant="primary" soft class="shadow-sm">
          Primary default alert with a small shadow
        </DiAlert>
        <DiAlert variant="primary" soft class="shadow-md">
          Primary default alert with a medium shadow
        </DiAlert>
        <DiAlert variant="primary" soft class="shadow-xl">
          Primary default alert with a large shadow
        </DiAlert>
        <DiAlert variant="info" soft class="shadow-sm">
          Soft info alert with a small shadow
        </DiAlert>
        <DiAlert variant="info" soft class="shadow-md">
          Soft info alert with a medium shadow
        </DiAlert>
        <DiAlert variant="info" soft class="shadow-xl">
          Soft info alert with a large shadow
        </DiAlert>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      title="Rounded solid alerts"
      accent-color="#14b8a6"
      :code="roundedSolidAlerts"
      language="html"
    >
      <div class="flex flex-col gap-3">
        <DiAlert variant="primary" rounded>
          Rounded primary alert
        </DiAlert>
        <DiAlert variant="secondary" rounded>
          Rounded secondary alert
        </DiAlert>
        <DiAlert variant="info" rounded>
          Rounded info alert
        </DiAlert>
        <DiAlert variant="warning" rounded>
          Rounded warning alert
        </DiAlert>
        <DiAlert variant="error" rounded>
          Rounded error alert
        </DiAlert>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      title="Rounded outline alerts"
      accent-color="#14b8a6"
      :code="roundedOutlineAlerts"
      language="html"
    >
      <div class="flex flex-col gap-3">
        <DiAlert variant="primary" outline rounded>
          Rounded outline primary alert
        </DiAlert>
        <DiAlert variant="secondary" outline rounded>
          Rounded outline secondary alert
        </DiAlert>
        <DiAlert variant="info" outline rounded>
          Rounded outline info alert
        </DiAlert>
        <DiAlert variant="warning" outline rounded>
          Rounded outline warning alert
        </DiAlert>
        <DiAlert variant="error" outline rounded>
          Rounded outline error alert
        </DiAlert>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      title="Rounded default alerts"
      accent-color="#14b8a6"
      :code="roundedDefaultAlerts"
      language="html"
    >
      <div class="flex flex-col gap-3">
        <DiAlert variant="primary" soft rounded>
          Rounded default primary alert
        </DiAlert>
        <DiAlert variant="info" soft rounded>
          Rounded default info alert
        </DiAlert>
        <DiAlert variant="success" soft rounded>
          Rounded default success alert
        </DiAlert>
        <DiAlert variant="warning" soft rounded>
          Rounded default warning alert
        </DiAlert>
        <DiAlert variant="error" soft rounded>
          Rounded default error alert
        </DiAlert>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.ui-elements.alert.closableAlerts')"
      accent-color="#14b8a6"
      :code="customCloseAlerts"
      language="vue"
    >
      <div class="flex flex-col gap-3">
        <DiAlert v-model="customClosePrimary" variant="primary" soft rounded closable>
          Alert with a custom primary close button
          <template #close="{ close }">
            <DiButton
              variant="primary"
              size="sm"
              circle
              aria-label="Dismiss primary alert"
              @click="close"
            >
              <DiIcon name="xMark" size="sm" />
            </DiButton>
          </template>
        </DiAlert>
        <DiAlert v-model="customCloseInfo" variant="info" soft rounded closable>
          Alert with a custom info close button
          <template #close="{ close }">
            <DiButton
              variant="info"
              size="sm"
              circle
              aria-label="Dismiss info alert"
              @click="close"
            >
              <DiIcon name="xMark" size="sm" />
            </DiButton>
          </template>
        </DiAlert>
        <DiAlert v-model="customCloseWarning" variant="warning" soft rounded closable>
          Alert with a custom warning close button
          <template #close="{ close }">
            <DiButton
              variant="warning"
              size="sm"
              circle
              aria-label="Dismiss warning alert"
              @click="close"
            >
              <DiIcon name="xMark" size="sm" />
            </DiButton>
          </template>
        </DiAlert>
        <DiAlert v-model="customCloseError" variant="error" soft rounded closable>
          Alert with a custom error close button
          <template #close="{ close }">
            <DiButton
              variant="error"
              size="sm"
              circle
              aria-label="Dismiss error alert"
              @click="close"
            >
              <DiIcon name="xMark" size="sm" />
            </DiButton>
          </template>
        </DiAlert>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.ui-elements.alert.alertWithCustomIcon')"
      accent-color="#14b8a6"
      :code="iconAlerts"
      language="html"
    >
      <div class="flex flex-col gap-3">
        <DiAlert variant="primary" soft>
          <template #icon>
            <DiIcon name="informationCircle" size="lg" />
          </template>
          Primary alert with a custom icon
        </DiAlert>
        <DiAlert variant="info" soft show-icon>
          Information alert with an icon
        </DiAlert>
        <DiAlert variant="success" soft show-icon>
          Success alert with an icon
        </DiAlert>
        <DiAlert variant="warning" soft show-icon>
          Warning alert with an icon
        </DiAlert>
        <DiAlert variant="error" soft show-icon>
          Danger alert with an icon
        </DiAlert>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      title="Customized alerts with icons"
      accent-color="#14b8a6"
      :code="customizedIconAlerts"
      language="html"
    >
      <div class="flex flex-col gap-3">
        <DiAlert variant="primary" soft class="border-s-4 border-s-primary">
          <template #icon>
            <DiIcon name="informationCircle" size="lg" />
          </template>
          A customized primary alert with an icon
        </DiAlert>
        <DiAlert variant="info" soft class="border-s-4 border-s-info">
          <template #icon>
            <DiIcon name="checkCircle" size="lg" />
          </template>
          A customized info alert with an icon
        </DiAlert>
        <DiAlert variant="warning" soft class="border-s-4 border-s-warning">
          <template #icon>
            <DiIcon name="exclamationTriangle" size="lg" />
          </template>
          A customized warning alert with an icon
        </DiAlert>
        <DiAlert variant="error" soft class="border-s-4 border-s-error">
          <template #icon>
            <DiIcon name="xCircle" size="lg" />
          </template>
          A customized danger alert with an icon
        </DiAlert>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      title="Alerts with images"
      accent-color="#14b8a6"
      :code="imageAlerts"
      language="html"
    >
      <div class="flex flex-col gap-3">
        <DiAlert variant="primary" soft>
          <template #icon>
            <img src="@/assets/images/user.png" alt="" class="size-8 rounded-full object-cover">
          </template>
          A primary alert with an image
        </DiAlert>
        <DiAlert variant="info" soft>
          <template #icon>
            <img
              src="@/assets/images/logo-mini.png"
              alt=""
              class="size-8 rounded-lg object-cover"
            >
          </template>
          An info alert with a different image
        </DiAlert>
        <DiAlert variant="success" soft>
          <template #icon>
            <img src="@/assets/images/user.png" alt="" class="size-10 rounded-lg object-cover">
          </template>
          A success alert with a larger image
        </DiAlert>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      title="Alerts with different size images"
      accent-color="#14b8a6"
      :code="sizedImageAlerts"
      language="html"
    >
      <div class="flex flex-col gap-3">
        <DiAlert variant="primary" soft>
          <template #icon>
            <img src="@/assets/images/user.png" alt="" class="size-6 rounded-full object-cover">
          </template>
          An alert with a small image
        </DiAlert>
        <DiAlert variant="info" soft>
          <template #icon>
            <img src="@/assets/images/logo-mini.png" alt="" class="size-8 rounded-lg object-cover">
          </template>
          An alert with a medium image
        </DiAlert>
        <DiAlert variant="warning" soft>
          <template #icon>
            <img src="@/assets/images/user.png" alt="" class="size-10 rounded-lg object-cover">
          </template>
          An alert with a large image
        </DiAlert>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      id="alert-actions"
      :title="$t('features.ui-elements.alert.alertWithActions')"
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
          title="Information?"
          description="This alert shares important information."
          class="min-h-64 rounded-none border-x-0 border-b-0 border-t-2 bg-base-100 py-8 text-base-content"
        >
          <template #actions>
            <div class="flex gap-2">
              <DiButton size="xs" variant="primary" outline>
                Decline
              </DiButton>
              <DiButton size="xs" variant="primary">
                Accept
              </DiButton>
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
          <template #actions>
            <DiButton size="xs" variant="info">
              Close
            </DiButton>
          </template>
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
              <DiButton size="xs" variant="warning" outline>
                Back
              </DiButton>
              <DiButton size="xs" variant="warning">
                Continue
              </DiButton>
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
          <template #actions>
            <DiButton size="xs" variant="error">
              Delete
            </DiButton>
          </template>
        </DiAlert>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.ui-elements.alert.alertWithTitleAndActions')"
      accent-color="#14b8a6"
      :code="richAlerts"
      language="html"
      class="xl:col-span-2"
    >
      <div class="grid gap-3 lg:grid-cols-4">
        <DiAlert variant="primary" outline show-icon title="Information Alert">
          Information alert with actions
          <template #actions>
            <DiButton size="xs" variant="ghost">
              Open
            </DiButton>
          </template>
        </DiAlert>
        <DiAlert variant="success" outline show-icon title="Success Alert">
          Your changes were saved
          <template #actions>
            <DiButton size="xs" variant="ghost">
              Close
            </DiButton>
          </template>
        </DiAlert>
        <DiAlert variant="warning" outline show-icon title="Warning Alert">
          Review this warning
          <template #actions>
            <DiButton size="xs" variant="ghost">
              Open
            </DiButton>
          </template>
        </DiAlert>
        <DiAlert variant="error" outline show-icon title="Danger Alert">
          Action requires attention
          <template #actions>
            <DiButton size="xs" variant="ghost">
              Continue
            </DiButton>
          </template>
        </DiAlert>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      title="Additional content"
      accent-color="#14b8a6"
      :code="additionalContent"
      language="html"
      class="xl:col-span-2"
    >
      <div class="grid gap-4 lg:grid-cols-2">
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
      </div>
    </PreviewCodeCard>
  </div>
</template>
