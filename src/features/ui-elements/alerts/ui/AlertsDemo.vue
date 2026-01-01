<script setup lang="ts">
import { ref } from 'vue'

import DiAlert from '@/shared/ui/base/DiAlert.vue'
import DiButton from '@/shared/ui/base/DiButton.vue'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

const closableInfo = ref(true)
const closableSuccess = ref(true)
const closableWarning = ref(true)
const closableError = ref(true)

const defaultAlert = `<DiAlert variant="info">
  12 unread messages. Tap to see.
</DiAlert>`

const coloredAlerts = `<div class="flex flex-col gap-4">
  <DiAlert variant="info">New software update available.</DiAlert>
  <DiAlert variant="success">Your purchase has been confirmed!</DiAlert>
  <DiAlert variant="warning">Warning: Invalid email address!</DiAlert>
  <DiAlert variant="error">Error! Task failed successfully.</DiAlert>
</div>`

const softAlerts = `<div class="flex flex-col gap-4">
  <DiAlert variant="info" soft>12 unread messages. Tap to see.</DiAlert>
  <DiAlert variant="success" soft>Your purchase has been confirmed!</DiAlert>
  <DiAlert variant="warning" soft>Warning: Invalid email address!</DiAlert>
  <DiAlert variant="error" soft>Error! Task failed successfully.</DiAlert>
</div>`

const outlineAlerts = `<div class="flex flex-col gap-4">
  <DiAlert variant="info" outline>12 unread messages. Tap to see.</DiAlert>
  <DiAlert variant="success" outline>Your purchase has been confirmed!</DiAlert>
  <DiAlert variant="warning" outline>Warning: Invalid email address!</DiAlert>
  <DiAlert variant="error" outline>Error! Task failed successfully.</DiAlert>
</div>`

const dashAlerts = `<div class="flex flex-col gap-4">
  <DiAlert variant="info" dash>12 unread messages. Tap to see.</DiAlert>
  <DiAlert variant="success" dash>Your purchase has been confirmed!</DiAlert>
  <DiAlert variant="warning" dash>Warning: Invalid email address!</DiAlert>
  <DiAlert variant="error" dash>Error! Task failed successfully.</DiAlert>
</div>`

const closableAlerts = `<div class="flex flex-col gap-4">
  <DiAlert v-model="closableInfo" variant="info" closable>
    Click the X button to close this alert.
  </DiAlert>
  <DiAlert v-model="closableSuccess" variant="success" closable>
    Success! You can close this alert.
  </DiAlert>
  <DiAlert v-model="closableWarning" variant="warning" closable>
    Warning! This alert is closable.
  </DiAlert>
  <DiAlert v-model="closableError" variant="error" closable>
    Error! Click to dismiss this alert.
  </DiAlert>
</div>`

const alertWithTitle = `<DiAlert variant="info" title="New message!" description="You have 1 unread message">
</DiAlert>`

const alertWithActions = `<DiAlert variant="info" layout="vertical" class="sm:alert-horizontal">
  We use cookies for no reason.
  <template #actions>
    <DiButton size="sm">Deny</DiButton>
    <DiButton size="sm" variant="primary">Accept</DiButton>
  </template>
</DiAlert>`

const alertWithCustomIcon = `<DiAlert variant="success">
  <template #icon>
    <i-material-symbols-light-celebration-outline class="h-6 w-6 shrink-0" />
  </template>
  Congratulations! You've won a prize!
</DiAlert>`

const verticalAlert = `<DiAlert variant="warning" layout="vertical">
  <template #actions>
    <DiButton size="sm" variant="warning">Action</DiButton>
  </template>
  This is a vertical layout alert, good for mobile screens.
</DiAlert>`

const alertWithTitleAndActions = `<DiAlert variant="info" layout="vertical" class="sm:alert-horizontal" title="New message!" description="You have 1 unread message">
  <template #actions>
    <DiButton size="sm">See</DiButton>
  </template>
</DiAlert>`
</script>

<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 items-start">
    <!-- Colored Alerts -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.alert.coloredAlerts')"
      accent-color="#14b8a6"
      :code="coloredAlerts"
      language="html"
    >
      <div class="flex flex-col gap-4">
        <DiAlert variant="info">
          {{ $t('features.ui-elements.alert.messages.newUpdate') }}
        </DiAlert>
        <DiAlert variant="success">
          {{ $t('features.ui-elements.alert.messages.purchaseConfirmed') }}
        </DiAlert>
        <DiAlert variant="warning">
          {{ $t('features.ui-elements.alert.messages.invalidEmail') }}
        </DiAlert>
        <DiAlert variant="error">
          {{ $t('features.ui-elements.alert.messages.taskFailed') }}
        </DiAlert>
      </div>
    </PreviewCodeCard>

    <!-- Soft Style Alerts -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.alert.softAlerts')"
      accent-color="#14b8a6"
      :code="softAlerts"
      language="html"
    >
      <div class="flex flex-col gap-4">
        <DiAlert variant="info" soft closable>
          {{ $t('features.ui-elements.alert.messages.unreadMessages') }}
        </DiAlert>
        <DiAlert variant="success" soft closable layout="vertical">
          {{ $t('features.ui-elements.alert.messages.purchaseConfirmed') }}
        </DiAlert>
        <DiAlert variant="warning" soft>
          {{ $t('features.ui-elements.alert.messages.invalidEmail') }}
        </DiAlert>
        <DiAlert variant="error" soft>
          {{ $t('features.ui-elements.alert.messages.taskFailed') }}
        </DiAlert>
      </div>
    </PreviewCodeCard>

    <!-- Outline Style Alerts -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.alert.outlineAlerts')"
      accent-color="#14b8a6"
      :code="outlineAlerts"
      language="html"
    >
      <div class="flex flex-col gap-4">
        <DiAlert variant="info" outline closable>
          {{ $t('features.ui-elements.alert.messages.unreadMessages') }}
        </DiAlert>
        <DiAlert variant="success" outline>
          {{ $t('features.ui-elements.alert.messages.purchaseConfirmed') }}
        </DiAlert>
        <DiAlert variant="warning" outline>
          {{ $t('features.ui-elements.alert.messages.invalidEmail') }}
        </DiAlert>
        <DiAlert variant="error" outline>
          {{ $t('features.ui-elements.alert.messages.taskFailed') }}
        </DiAlert>
      </div>
    </PreviewCodeCard>

    <!-- Dash Style Alerts -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.alert.dashAlerts')"
      accent-color="#14b8a6"
      :code="dashAlerts"
      language="html"
    >
      <div class="flex flex-col gap-4">
        <DiAlert variant="info" dash closable>
          {{ $t('features.ui-elements.alert.messages.unreadMessages') }}
        </DiAlert>
        <DiAlert variant="success" dash>
          {{ $t('features.ui-elements.alert.messages.purchaseConfirmed') }}
        </DiAlert>
        <DiAlert variant="warning" dash>
          {{ $t('features.ui-elements.alert.messages.invalidEmail') }}
        </DiAlert>
        <DiAlert variant="error" dash>
          {{ $t('features.ui-elements.alert.messages.taskFailed') }}
        </DiAlert>
      </div>
    </PreviewCodeCard>

    <!-- Closable Alerts -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.alert.closableAlerts')"
      accent-color="#14b8a6"
      :code="closableAlerts"
      language="html"
    >
      <div class="flex flex-col gap-4">
        <DiAlert v-model="closableInfo" variant="info" closable>
          {{ $t('features.ui-elements.alert.messages.clickToClose') }}
        </DiAlert>
        <DiAlert v-model="closableSuccess" variant="success" closable>
          {{ $t('features.ui-elements.alert.messages.successClosable') }}
        </DiAlert>
        <DiAlert v-model="closableWarning" variant="warning" closable>
          {{ $t('features.ui-elements.alert.messages.warningClosable') }}
        </DiAlert>
        <DiAlert v-model="closableError" variant="error" closable>
          {{ $t('features.ui-elements.alert.messages.errorClosable') }}
        </DiAlert>
      </div>
    </PreviewCodeCard>

    <!-- Alert with Title -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.alert.alertWithTitle')"
      accent-color="#14b8a6"
      :code="alertWithTitle"
      language="html"
    >
      <DiAlert
        variant="info"
        :title="$t('features.ui-elements.alert.messages.newMessageTitle')"
        :description="$t('features.ui-elements.alert.messages.newMessageDesc')"
      />
    </PreviewCodeCard>

    <!-- Alert with Actions -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.alert.alertWithActions')"
      accent-color="#14b8a6"
      :code="alertWithActions"
      language="html"
    >
      <DiAlert variant="info" layout="vertical" class="sm:alert-horizontal">
        {{ $t('features.ui-elements.alert.messages.cookiesMessage') }}
        <template #actions>
          <div class="flex gap-2">
            <DiButton size="sm">
              {{ $t('features.ui-elements.alert.actions.deny') }}
            </DiButton>
            <DiButton size="sm" variant="primary">
              {{ $t('features.ui-elements.alert.actions.accept') }}
            </DiButton>
          </div>
        </template>
      </DiAlert>
    </PreviewCodeCard>

    <!-- Default Alert -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.alert.defaultAlert')"
      accent-color="#14b8a6"
      :code="defaultAlert"
      language="html"
    >
      <DiAlert variant="info">
        12 unread messages. Tap to see.
      </DiAlert>
    </PreviewCodeCard>

    <!-- Alert with Custom Icon -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.alert.alertWithCustomIcon')"
      accent-color="#14b8a6"
      :code="alertWithCustomIcon"
      language="html"
    >
      <DiAlert variant="success">
        <template #icon>
          <i-material-symbols-light-celebration-outline class="h-6 w-6 shrink-0" />
        </template>
        {{ $t('features.ui-elements.alert.messages.congratulations') }}
      </DiAlert>
    </PreviewCodeCard>

    <!-- Vertical Layout Alert -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.alert.verticalAlert')"
      accent-color="#14b8a6"
      :code="verticalAlert"
      language="html"
    >
      <DiAlert variant="warning" layout="vertical">
        <template #actions>
          <DiButton size="sm" variant="warning">
            {{ $t('features.ui-elements.alert.actions.action') }}
          </DiButton>
        </template>
        {{ $t('features.ui-elements.alert.messages.verticalLayout') }}
      </DiAlert>
    </PreviewCodeCard>

    <!-- Alert with Title and Actions -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.alert.alertWithTitleAndActions')"
      accent-color="#14b8a6"
      :code="alertWithTitleAndActions"
      language="html"
      class="lg:col-span-2"
    >
      <DiAlert
        variant="info"
        layout="vertical"
        class="sm:alert-horizontal"
        :title="$t('features.ui-elements.alert.messages.newMessageTitle')"
        :description="$t('features.ui-elements.alert.messages.newMessageDesc')"
      >
        <template #actions>
          <DiButton size="sm">
            {{ $t('features.ui-elements.alert.actions.see') }}
          </DiButton>
        </template>
      </DiAlert>
    </PreviewCodeCard>
  </div>
</template>
