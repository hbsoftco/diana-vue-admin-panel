<script setup lang="ts">
import { ref } from 'vue'

import DiAlert from '@/shared/ui/base/DiAlert.vue'
import DiButton from '@/shared/ui/base/DiButton.vue'
import DiIcon from '@/shared/ui/base/DiIcon.vue'
import DiToast from '@/shared/ui/base/DiToast.vue'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

type HorizontalPlacement = 'start' | 'center' | 'end' | 'left' | 'right'
type VerticalPlacement = 'top' | 'bottom'

const liveVisible = ref(false)
const basicVisible = ref(false)
const actionVisible = ref(false)
const fragmentVisible = ref(false)
const clickableVisible = ref(false)
const textVisible = ref(false)
const filledVisible = ref(false)
const outlinedVisible = ref(false)
const neutralVisible = ref(false)
const infoVisible = ref(false)
const successVisible = ref(false)
const warningVisible = ref(false)
const errorVisible = ref(false)
const positionedVisible = ref(false)
const persistentVisible = ref(false)
const selectedHorizontal = ref<HorizontalPlacement>('end')
const selectedVertical = ref<VerticalPlacement>('bottom')

function showPosition(horizontal: HorizontalPlacement, vertical: VerticalPlacement) {
  positionedVisible.value = false
  selectedHorizontal.value = horizontal
  selectedVertical.value = vertical
  requestAnimationFrame(() => {
    positionedVisible.value = true
  })
}

const liveExampleCode = `<script setup lang="ts">
import { ref } from 'vue'

import DiButton from '@/shared/ui/base/DiButton.vue'
import DiToast from '@/shared/ui/base/DiToast.vue'

const liveVisible = ref(false)
<\/script>

<template>
  <DiButton variant="primary" @click="liveVisible = true">Show live toast</DiButton>
  <DiToast
    v-model="liveVisible"
    variant="success"
    message="Your settings have been saved."
    :duration="4000"
    show-icon
    closable
  />
</template>`

const basicExampleCode = `<script setup lang="ts">
import { ref } from 'vue'

import DiButton from '@/shared/ui/base/DiButton.vue'
import DiToast from '@/shared/ui/base/DiToast.vue'

const basicVisible = ref(false)
<\/script>

<template>
  <DiButton variant="primary" @click="basicVisible = true">Open snackbar</DiButton>
  <DiToast
    v-model="basicVisible"
    variant="neutral"
    message="Hello, world! This is a toast message."
    :duration="5000"
    closable
  />
</template>`

const actionExampleCode = `<script setup lang="ts">
import { ref } from 'vue'

import DiButton from '@/shared/ui/base/DiButton.vue'
import DiToast from '@/shared/ui/base/DiToast.vue'

const actionVisible = ref(false)
<\/script>

<template>
  <DiButton variant="primary" @click="actionVisible = true">Open action snackbar</DiButton>
  <DiToast
    v-model="actionVisible"
    variant="neutral"
    title="View"
    message="Hello, world! This is a toast message."
    :duration="6000"
    closable
  >
    <template #actions="{ close }">
      <DiButton size="xs" variant="ghost" @click="close">View</DiButton>
    </template>
  </DiToast>
</template>`

const colorSchemesCode = `<div class="flex flex-col gap-3">
  <DiAlert variant="warning" soft show-icon>Heads up! This is the warning toast message.</DiAlert>
  <DiAlert variant="error" soft show-icon>Hello, world! This is the error toast message.</DiAlert>
  <DiAlert variant="info" soft show-icon>Hello, world! This is the info toast message.</DiAlert>
</div>`

const fragmentExampleCode = `<script setup lang="ts">
import { ref } from 'vue'

import DiButton from '@/shared/ui/base/DiButton.vue'
import DiIcon from '@/shared/ui/base/DiIcon.vue'
import DiToast from '@/shared/ui/base/DiToast.vue'

const fragmentVisible = ref(false)
<\/script>

<template>
  <DiButton variant="primary" @click="fragmentVisible = true">Show render-fragment snackbar</DiButton>
  <DiToast v-model="fragmentVisible" variant="neutral" :duration="5000" closable>
    <template #icon><DiIcon name="inbox" size="lg" /></template>
    <strong>I got a message for you</strong>
  </DiToast>
</template>`

const clickableExampleCode = `<script setup lang="ts">
import { ref } from 'vue'

import DiButton from '@/shared/ui/base/DiButton.vue'
import DiToast from '@/shared/ui/base/DiToast.vue'

const clickableVisible = ref(false)
<\/script>

<template>
  <DiButton variant="primary" @click="clickableVisible = true">Open clickable snackbar</DiButton>
  <DiToast
    v-model="clickableVisible"
    variant="info"
    appearance="text"
    message="Click this notification to dismiss it."
    :duration="6000"
    show-icon
    clickable
    close-on-click
  />
</template>`

const snackbarVariantsCode = `<script setup lang="ts">
import { ref } from 'vue'

import DiButton from '@/shared/ui/base/DiButton.vue'
import DiToast from '@/shared/ui/base/DiToast.vue'

const textVisible = ref(false)
const filledVisible = ref(false)
const outlinedVisible = ref(false)
<\/script>

<template>
  <div class="flex flex-wrap gap-2">
    <DiButton size="sm" variant="primary" @click="textVisible = true">Open text</DiButton>
    <DiButton size="sm" variant="info" @click="filledVisible = true">Open filled</DiButton>
    <DiButton size="sm" variant="success" @click="outlinedVisible = true">Open outlined</DiButton>
  </div>
  <DiToast v-model="textVisible" variant="neutral" appearance="text" message="Normal text snackbar" :duration="5000" closable />
  <DiToast v-model="filledVisible" variant="info" appearance="solid" message="Info filled snackbar" :duration="5000" show-icon closable />
  <DiToast v-model="outlinedVisible" variant="success" appearance="outline" message="Success outlined snackbar" :duration="5000" show-icon closable />
</template>`

const solidBackgroundCode = `<script setup lang="ts">
import { ref } from 'vue'

import DiButton from '@/shared/ui/base/DiButton.vue'
import DiToast from '@/shared/ui/base/DiToast.vue'

const neutralVisible = ref(false)
const infoVisible = ref(false)
const successVisible = ref(false)
const warningVisible = ref(false)
const errorVisible = ref(false)
<\/script>

<template>
  <div class="flex flex-wrap gap-2">
    <DiButton size="sm" variant="neutral" @click="neutralVisible = true">Dark</DiButton>
    <DiButton size="sm" variant="info" @click="infoVisible = true">Info</DiButton>
    <DiButton size="sm" variant="success" @click="successVisible = true">Success</DiButton>
    <DiButton size="sm" variant="warning" @click="warningVisible = true">Warning</DiButton>
    <DiButton size="sm" variant="error" @click="errorVisible = true">Danger</DiButton>
  </div>
  <DiToast v-model="neutralVisible" variant="neutral" message="Normal filled snackbar" :duration="5000" closable />
  <DiToast v-model="infoVisible" variant="info" message="The reactor was fired up successfully" :duration="5000" show-icon closable />
  <DiToast v-model="successVisible" variant="success" message="The reactor is running at optimum temperature" :duration="5000" show-icon closable />
  <DiToast v-model="warningVisible" variant="warning" message="The reactor temperature exceeds the optimal range" :duration="5000" show-icon closable />
  <DiToast v-model="errorVisible" variant="error" message="Reactor meltdown is imminent" :duration="5000" show-icon closable />
</template>`

const placementCode = `<script setup lang="ts">
import { ref } from 'vue'

import DiToast from '@/shared/ui/base/DiToast.vue'

type HorizontalPlacement = 'start' | 'center' | 'end' | 'left' | 'right'
type VerticalPlacement = 'top' | 'bottom'

const positionedVisible = ref(false)
const selectedHorizontal = ref<HorizontalPlacement>('end')
const selectedVertical = ref<VerticalPlacement>('bottom')

function showPosition(horizontal: HorizontalPlacement, vertical: VerticalPlacement) {
  positionedVisible.value = false
  selectedHorizontal.value = horizontal
  selectedVertical.value = vertical
  requestAnimationFrame(() => {
    positionedVisible.value = true
  })
}
<\/script>

<template>
  <div class="flex flex-wrap gap-2">
    <DiButton size="xs" variant="primary" @click="showPosition('end', 'bottom')">Primary</DiButton>
    <DiButton size="xs" outline @click="showPosition('start', 'top')">Top start</DiButton>
    <DiButton size="xs" outline @click="showPosition('left', 'top')">Top left</DiButton>
    <DiButton size="xs" outline @click="showPosition('center', 'top')">Top center</DiButton>
    <DiButton size="xs" outline @click="showPosition('right', 'top')">Top right</DiButton>
    <DiButton size="xs" outline @click="showPosition('end', 'top')">Top end</DiButton>
    <DiButton size="xs" outline @click="showPosition('start', 'bottom')">Bottom start</DiButton>
    <DiButton size="xs" outline @click="showPosition('left', 'bottom')">Bottom left</DiButton>
    <DiButton size="xs" outline @click="showPosition('center', 'bottom')">Bottom center</DiButton>
    <DiButton size="xs" outline @click="showPosition('right', 'bottom')">Bottom right</DiButton>
    <DiButton size="xs" outline @click="showPosition('end', 'bottom')">Bottom end</DiButton>
  </div>
  <DiToast
    v-model="positionedVisible"
    :horizontal="selectedHorizontal"
    :vertical="selectedVertical"
    variant="neutral"
    message="Placement preview"
    :duration="4000"
    closable
  />
</template>`

const persistentCode = `<script setup lang="ts">
import { ref } from 'vue'

import DiButton from '@/shared/ui/base/DiButton.vue'
import DiToast from '@/shared/ui/base/DiToast.vue'

const persistentVisible = ref(false)
<\/script>

<template>
  <div class="flex gap-2">
    <DiButton variant="primary" @click="persistentVisible = true">Open snackbar</DiButton>
    <DiButton variant="error" @click="persistentVisible = false">Hide snackbar</DiButton>
  </div>
  <DiToast v-model="persistentVisible" variant="warning" message="This toast stays open until hidden." show-icon closable />
</template>`
</script>

<template>
  <div class="grid grid-cols-1 items-start gap-4 xl:grid-cols-3">
    <PreviewCodeCard
      :title="$t('features.uiElements.toast.sections.live')"
      :code="liveExampleCode"
      language="vue"
    >
      <DiButton variant="primary" @click="liveVisible = true">
        {{ $t('features.uiElements.toast.show') }}
      </DiButton>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.toast.sections.basic')"
      :code="basicExampleCode"
      language="vue"
    >
      <DiButton variant="primary" @click="basicVisible = true">
        {{ $t('features.uiElements.toast.show') }}
      </DiButton>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.toast.sections.action')"
      :code="actionExampleCode"
      language="vue"
    >
      <DiButton variant="primary" @click="actionVisible = true">
        {{ $t('features.uiElements.toast.showAction') }}
      </DiButton>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.toast.sections.colors')"
      :code="colorSchemesCode"
      language="html"
    >
      <div class="flex flex-col gap-3">
        <DiAlert variant="warning" soft show-icon>
          {{ $t('features.uiElements.toast.messages.warning') }}
        </DiAlert>
        <DiAlert variant="error" soft show-icon>
          {{ $t('features.uiElements.toast.messages.error') }}
        </DiAlert>
        <DiAlert variant="info" soft show-icon>
          {{ $t('features.uiElements.toast.messages.info') }}
        </DiAlert>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.toast.sections.fragment')"
      :code="fragmentExampleCode"
      language="vue"
    >
      <DiButton variant="primary" @click="fragmentVisible = true">
        {{ $t('features.uiElements.toast.actions.showFragment') }}
      </DiButton>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.toast.sections.clickable')"
      :code="clickableExampleCode"
      language="vue"
    >
      <DiButton variant="primary" @click="clickableVisible = true">
        {{ $t('features.uiElements.toast.actions.showClickable') }}
      </DiButton>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.toast.sections.variants')"
      :code="snackbarVariantsCode"
      language="vue"
      class="xl:col-span-2"
    >
      <div class="flex flex-wrap gap-2">
        <DiButton size="sm" variant="primary" @click="textVisible = true">
          {{ $t('features.uiElements.toast.actions.showText') }}
        </DiButton>
        <DiButton size="sm" variant="info" @click="filledVisible = true">
          {{ $t('features.uiElements.toast.actions.showFilled') }}
        </DiButton>
        <DiButton size="sm" variant="success" @click="outlinedVisible = true">
          {{ $t('features.uiElements.toast.actions.showOutlined') }}
        </DiButton>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.toast.sections.solid')"
      :code="solidBackgroundCode"
      language="vue"
    >
      <div class="flex flex-wrap gap-2">
        <DiButton size="sm" variant="neutral" @click="neutralVisible = true">
          {{ $t('features.uiElements.toast.colors.dark') }}
        </DiButton>
        <DiButton size="sm" variant="info" @click="infoVisible = true">
          {{ $t('common.variants.info') }}
        </DiButton>
        <DiButton size="sm" variant="success" @click="successVisible = true">
          {{ $t('common.variants.success') }}
        </DiButton>
        <DiButton size="sm" variant="warning" @click="warningVisible = true">
          {{ $t('common.variants.warning') }}
        </DiButton>
        <DiButton size="sm" variant="error" @click="errorVisible = true">
          {{ $t('features.uiElements.toast.colors.danger') }}
        </DiButton>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.toast.sections.position')"
      :code="placementCode"
      language="vue"
      class="xl:col-span-3"
    >
      <div class="flex flex-wrap gap-2">
        <DiButton size="xs" variant="primary" @click="showPosition('end', 'bottom')">
          {{ $t('common.variants.primary') }}
        </DiButton>
        <DiButton size="xs" outline @click="showPosition('start', 'top')">
          {{ $t('features.uiElements.toast.positions.topStart') }}
        </DiButton>
        <DiButton size="xs" outline @click="showPosition('left', 'top')">
          {{ $t('features.uiElements.toast.positions.topLeft') }}
        </DiButton>
        <DiButton size="xs" outline @click="showPosition('center', 'top')">
          {{ $t('features.uiElements.toast.positions.topCenter') }}
        </DiButton>
        <DiButton size="xs" outline @click="showPosition('right', 'top')">
          {{ $t('features.uiElements.toast.positions.topRight') }}
        </DiButton>
        <DiButton size="xs" outline @click="showPosition('end', 'top')">
          {{ $t('features.uiElements.toast.positions.topEnd') }}
        </DiButton>
        <DiButton size="xs" outline @click="showPosition('start', 'bottom')">
          {{ $t('features.uiElements.toast.positions.bottomStart') }}
        </DiButton>
        <DiButton size="xs" outline @click="showPosition('left', 'bottom')">
          {{ $t('features.uiElements.toast.positions.bottomLeft') }}
        </DiButton>
        <DiButton size="xs" outline @click="showPosition('center', 'bottom')">
          {{ $t('features.uiElements.toast.positions.bottomCenter') }}
        </DiButton>
        <DiButton size="xs" outline @click="showPosition('right', 'bottom')">
          {{ $t('features.uiElements.toast.positions.bottomRight') }}
        </DiButton>
        <DiButton size="xs" outline @click="showPosition('end', 'bottom')">
          {{ $t('features.uiElements.toast.positions.bottomEnd') }}
        </DiButton>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.toast.sections.persistent')"
      :code="persistentCode"
      language="vue"
      class="xl:col-span-3"
    >
      <div class="flex gap-2">
        <DiButton variant="primary" @click="persistentVisible = true">
          {{ $t('features.uiElements.toast.showPersistent') }}
        </DiButton>
        <DiButton variant="error" @click="persistentVisible = false">
          {{ $t('common.actions.hide') }}
        </DiButton>
      </div>
    </PreviewCodeCard>
  </div>

  <DiToast
    v-model="liveVisible"
    variant="success"
    :message="$t('features.uiElements.toast.messages.saved')"
    :duration="4000"
    show-icon
    closable
  />
  <DiToast
    v-model="basicVisible"
    variant="neutral"
    :message="$t('features.uiElements.toast.messages.basic')"
    :duration="5000"
    closable
  />
  <DiToast
    v-model="actionVisible"
    variant="neutral"
    :title="$t('features.uiElements.toast.actions.view')"
    :message="$t('features.uiElements.toast.messages.basic')"
    :duration="6000"
    closable
  >
    <template #actions="{ close }">
      <DiButton size="xs" variant="ghost" @click="close">
        {{ $t('features.uiElements.toast.actions.view') }}
      </DiButton>
    </template>
  </DiToast>
  <DiToast v-model="fragmentVisible" variant="neutral" :duration="5000" closable>
    <template #icon>
      <DiIcon name="inbox" size="lg" />
    </template>
    <strong>{{ $t('features.uiElements.toast.messages.inbox') }}</strong>
  </DiToast>
  <DiToast
    v-model="clickableVisible"
    variant="info"
    appearance="text"
    :message="$t('features.uiElements.toast.messages.clickable')"
    :duration="6000"
    show-icon
    clickable
    close-on-click
  />
  <DiToast
    v-model="textVisible"
    variant="neutral"
    appearance="text"
    :message="$t('features.uiElements.toast.messages.text')"
    :duration="5000"
    closable
  />
  <DiToast
    v-model="filledVisible"
    variant="info"
    appearance="solid"
    :message="$t('features.uiElements.toast.messages.filled')"
    :duration="5000"
    show-icon
    closable
  />
  <DiToast
    v-model="outlinedVisible"
    variant="success"
    appearance="outline"
    :message="$t('features.uiElements.toast.messages.outlined')"
    :duration="5000"
    show-icon
    closable
  />
  <DiToast
    v-model="neutralVisible"
    variant="neutral"
    :message="$t('features.uiElements.toast.messages.neutral')"
    :duration="5000"
    closable
  />
  <DiToast
    v-model="infoVisible"
    variant="info"
    :message="$t('features.uiElements.toast.messages.reactorStarted')"
    :duration="5000"
    show-icon
    closable
  />
  <DiToast
    v-model="successVisible"
    variant="success"
    :message="$t('features.uiElements.toast.messages.reactorOptimal')"
    :duration="5000"
    show-icon
    closable
  />
  <DiToast
    v-model="warningVisible"
    variant="warning"
    :message="$t('features.uiElements.toast.messages.reactorWarning')"
    :duration="5000"
    show-icon
    closable
  />
  <DiToast
    v-model="errorVisible"
    variant="error"
    :message="$t('features.uiElements.toast.messages.reactorDanger')"
    :duration="5000"
    show-icon
    closable
  />
  <DiToast
    v-model="positionedVisible"
    :horizontal="selectedHorizontal"
    :vertical="selectedVertical"
    variant="neutral"
    :message="$t('features.uiElements.toast.messages.position')"
    :duration="4000"
    closable
  />
  <DiToast
    v-model="persistentVisible"
    variant="warning"
    :message="$t('features.uiElements.toast.messages.persistent')"
    show-icon
    closable
  />
</template>
