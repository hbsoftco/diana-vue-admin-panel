<script setup lang="ts">
import { ref } from 'vue'

import DiButton from '@/shared/ui/base/DiButton.vue'
import DiButtonGroup from '@/shared/ui/base/DiButtonGroup.vue'
import DiIcon from '@/shared/ui/base/DiIcon.vue'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

const activeTool = ref(1)

const basicCode = `<DiButtonGroup aria-label="Media controls">
  <DiButton variant="info" aria-label="Previous">|◀</DiButton>
  <DiButton variant="info" aria-label="Pause">Ⅱ</DiButton>
  <DiButton variant="info" aria-label="Next">▶|</DiButton>
</DiButtonGroup>`

const navigationCode = `<DiButtonGroup rounded aria-label="Navigation">
  <DiButton variant="primary" active>Active Link</DiButton>
  <DiButton variant="primary" soft>Link</DiButton>
  <DiButton variant="primary" soft>Link</DiButton>
</DiButtonGroup>`

const mixedCode = `<DiButtonGroup aria-label="Alignment">
  <DiButton variant="error">Left</DiButton>
  <DiButton variant="warning">Middle</DiButton>
  <DiButton variant="success">Right</DiButton>
</DiButtonGroup>`

const outlineCode = `<DiButtonGroup aria-label="Alignment options">
  <DiButton variant="primary" outline>Left</DiButton>
  <DiButton variant="primary" outline>Middle</DiButton>
  <DiButton variant="primary" outline>Right</DiButton>
</DiButtonGroup>`

const iconCode = `<DiButtonGroup aria-label="Alarm controls">
  <DiButton variant="primary" outline square aria-label="Set alarm">⏱</DiButton>
  <DiButton variant="primary" outline square disabled aria-label="Mute alarm">⊘</DiButton>
  <DiButton variant="primary" outline>
    <template #icon-left>⏰</template>
    Add alarm
  </DiButton>
</DiButtonGroup>`

const outlinedCode = `<DiButtonGroup aria-label="Outlined choices">
  <DiButton variant="primary" outline>One</DiButton>
  <DiButton variant="primary" outline>Two</DiButton>
  <DiButton variant="primary" outline>Three</DiButton>
</DiButtonGroup>`

const sizingCode = `<div class="flex flex-wrap items-center gap-2">
  <DiButtonGroup aria-label="Small alignment">
    <DiButton size="xs" variant="success" outline>Left</DiButton>
    <DiButton size="xs" variant="success" outline>Middle</DiButton>
    <DiButton size="xs" variant="success" outline>Right</DiButton>
  </DiButtonGroup>
  <DiButtonGroup aria-label="Medium alignment">
    <DiButton size="sm" variant="success" outline>Left</DiButton>
    <DiButton size="sm" variant="success" outline>Middle</DiButton>
    <DiButton size="sm" variant="success" outline>Right</DiButton>
  </DiButtonGroup>
  <DiButtonGroup aria-label="Large alignment">
    <DiButton size="md" variant="success" outline>Left</DiButton>
    <DiButton size="md" variant="success" outline>Middle</DiButton>
    <DiButton size="md" variant="success" outline>Right</DiButton>
  </DiButtonGroup>
</div>`

const verticalCode = `<div class="flex flex-wrap items-start justify-around gap-8">
  <DiButtonGroup orientation="vertical" aria-label="Primary actions">
    <DiButton v-for="index in 5" :key="index" variant="primary">Button</DiButton>
  </DiButtonGroup>
  <DiButtonGroup orientation="vertical" rounded aria-label="Info actions">
    <DiButton v-for="index in 4" :key="index" variant="info">Button</DiButton>
  </DiButtonGroup>
  <DiButtonGroup orientation="vertical" aria-label="Outlined choices">
    <DiButton variant="primary" outline>One</DiButton>
    <DiButton variant="primary" outline>Two</DiButton>
    <DiButton variant="primary" outline>Three</DiButton>
  </DiButtonGroup>
</div>`

const toolbarCode = `<script setup lang="ts">
import { ref } from 'vue'

const activeTool = ref(1)
${'</scr' + 'ipt>'}

<template>
  <div class="space-y-3">
    <div class="flex flex-wrap gap-2">
      <DiButtonGroup role="toolbar" aria-label="Primary pages">
        <DiButton v-for="page in 4" :key="page" variant="primary" :active="activeTool === page" @click="activeTool = page">{{ page }}</DiButton>
      </DiButtonGroup>
      <DiButtonGroup role="toolbar" aria-label="Secondary pages">
        <DiButton v-for="page in [5, 6, 7]" :key="page" variant="info" :active="activeTool === page" @click="activeTool = page">{{ page }}</DiButton>
      </DiButtonGroup>
      <DiButton variant="info" :active="activeTool === 8" @click="activeTool = 8">8</DiButton>
    </div>
    <DiButtonGroup role="toolbar" aria-label="Outlined pages">
      <DiButton v-for="page in 4" :key="page" variant="info" outline :active="activeTool === page" @click="activeTool = page">{{ page }}</DiButton>
    </DiButtonGroup>
  </div>
</template>`

const socialCode = `<DiButtonGroup aria-label="Social networks">
  <DiButton social="facebook" square aria-label="Facebook">f</DiButton>
  <DiButton social="x" square aria-label="X">𝕏</DiButton>
  <DiButton social="email" square aria-label="Email">@</DiButton>
  <DiButton social="github" square aria-label="GitHub">◉</DiButton>
  <DiButton social="google" square aria-label="Google">G</DiButton>
</DiButtonGroup>`

const nestingCode = `<DiButtonGroup rounded aria-label="Nested actions">
  <DiButton variant="primary">1</DiButton>
  <DiButton variant="primary">2</DiButton>
  <DiButton variant="primary">
    Dropdown
    <template #icon-right>
      <DiIcon name="chevronDown" size="xs" />
    </template>
  </DiButton>
</DiButtonGroup>`
</script>

<template>
  <div class="grid grid-cols-1 items-start gap-4 lg:grid-cols-12">
    <PreviewCodeCard
      class="lg:col-span-3"
      :title="$t('features.uiElements.buttonGroup.basic')"
      :code="basicCode"
      language="html"
    >
      <DiButtonGroup :aria-label="$t('features.uiElements.buttonGroup.live.mediaControls')">
        <DiButton variant="info" :aria-label="$t('features.uiElements.buttonGroup.live.previous')">
          |◀
        </DiButton>
        <DiButton variant="info" :aria-label="$t('features.uiElements.buttonGroup.live.pause')">
          Ⅱ
        </DiButton>
        <DiButton variant="info" :aria-label="$t('features.uiElements.buttonGroup.live.next')">
          ▶|
        </DiButton>
      </DiButtonGroup>
    </PreviewCodeCard>

    <PreviewCodeCard
      class="lg:col-span-3"
      :title="$t('features.uiElements.buttonGroup.navigation')"
      :code="navigationCode"
      language="html"
    >
      <DiButtonGroup rounded :aria-label="$t('features.uiElements.buttonGroup.live.navigation')">
        <DiButton variant="primary" active>
          {{ $t('features.uiElements.buttonGroup.live.activeLink') }}
        </DiButton>
        <DiButton variant="primary" soft>
          {{ $t('features.uiElements.buttonGroup.live.link') }}
        </DiButton>
        <DiButton variant="primary" soft>
          {{ $t('features.uiElements.buttonGroup.live.link') }}
        </DiButton>
      </DiButtonGroup>
    </PreviewCodeCard>

    <PreviewCodeCard
      class="lg:col-span-3"
      :title="$t('features.uiElements.buttonGroup.mixed')"
      :code="mixedCode"
      language="html"
    >
      <DiButtonGroup :aria-label="$t('features.uiElements.buttonGroup.live.alignment')">
        <DiButton variant="error">
          {{ $t('features.uiElements.buttonGroup.live.left') }}
        </DiButton>
        <DiButton variant="warning">
          {{ $t('features.uiElements.buttonGroup.live.middle') }}
        </DiButton>
        <DiButton variant="success">
          {{ $t('features.uiElements.buttonGroup.live.right') }}
        </DiButton>
      </DiButtonGroup>
    </PreviewCodeCard>

    <PreviewCodeCard
      class="lg:col-span-3"
      :title="$t('features.uiElements.buttonGroup.outline')"
      :code="outlineCode"
      language="html"
    >
      <DiButtonGroup :aria-label="$t('features.uiElements.buttonGroup.live.alignmentOptions')">
        <DiButton variant="primary" outline>
          {{ $t('features.uiElements.buttonGroup.live.left') }}
        </DiButton>
        <DiButton variant="primary" outline>
          {{ $t('features.uiElements.buttonGroup.live.middle') }}
        </DiButton>
        <DiButton variant="primary" outline>
          {{ $t('features.uiElements.buttonGroup.live.right') }}
        </DiButton>
      </DiButtonGroup>
    </PreviewCodeCard>

    <PreviewCodeCard
      class="lg:col-span-6"
      :title="$t('features.uiElements.buttonGroup.icons')"
      :code="iconCode"
      language="html"
    >
      <DiButtonGroup :aria-label="$t('features.uiElements.buttonGroup.live.alarmControls')">
        <DiButton
          variant="primary"
          outline
          square
          :aria-label="$t('features.uiElements.buttonGroup.live.setAlarm')"
        >
          ⏱
        </DiButton>
        <DiButton
          variant="primary"
          outline
          square
          disabled
          :aria-label="$t('features.uiElements.buttonGroup.live.muteAlarm')"
        >
          ⊘
        </DiButton>
        <DiButton variant="primary" outline>
          <template #icon-left>
            ⏰
          </template>{{ $t('features.uiElements.buttonGroup.live.addAlarm') }}
        </DiButton>
      </DiButtonGroup>
    </PreviewCodeCard>

    <PreviewCodeCard
      class="lg:col-span-6"
      :title="$t('features.uiElements.buttonGroup.outlined')"
      :code="outlinedCode"
      language="html"
    >
      <DiButtonGroup :aria-label="$t('features.uiElements.buttonGroup.live.outlinedChoices')">
        <DiButton variant="primary" outline>
          {{ $t('features.uiElements.buttonGroup.live.one') }}
        </DiButton>
        <DiButton variant="primary" outline>
          {{ $t('features.uiElements.buttonGroup.live.two') }}
        </DiButton>
        <DiButton variant="primary" outline>
          {{ $t('features.uiElements.buttonGroup.live.three') }}
        </DiButton>
      </DiButtonGroup>
    </PreviewCodeCard>

    <PreviewCodeCard
      class="lg:col-span-6"
      :title="$t('features.uiElements.buttonGroup.sizing')"
      :code="sizingCode"
      language="html"
    >
      <div class="flex flex-wrap items-center gap-2">
        <DiButtonGroup :aria-label="$t('features.uiElements.buttonGroup.live.smallAlignment')">
          <DiButton size="xs" variant="success" outline>
            {{ $t('features.uiElements.buttonGroup.live.left') }}
          </DiButton><DiButton size="xs" variant="success" outline>
            {{ $t('features.uiElements.buttonGroup.live.middle') }}
          </DiButton><DiButton size="xs" variant="success" outline>
            {{ $t('features.uiElements.buttonGroup.live.right') }}
          </DiButton>
        </DiButtonGroup>
        <DiButtonGroup :aria-label="$t('features.uiElements.buttonGroup.live.mediumAlignment')">
          <DiButton size="sm" variant="success" outline>
            {{ $t('features.uiElements.buttonGroup.live.left') }}
          </DiButton><DiButton size="sm" variant="success" outline>
            {{ $t('features.uiElements.buttonGroup.live.middle') }}
          </DiButton><DiButton size="sm" variant="success" outline>
            {{ $t('features.uiElements.buttonGroup.live.right') }}
          </DiButton>
        </DiButtonGroup>
        <DiButtonGroup :aria-label="$t('features.uiElements.buttonGroup.live.largeAlignment')">
          <DiButton size="md" variant="success" outline>
            {{ $t('features.uiElements.buttonGroup.live.left') }}
          </DiButton><DiButton size="md" variant="success" outline>
            {{ $t('features.uiElements.buttonGroup.live.middle') }}
          </DiButton><DiButton size="md" variant="success" outline>
            {{ $t('features.uiElements.buttonGroup.live.right') }}
          </DiButton>
        </DiButtonGroup>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      class="lg:col-span-6 lg:row-span-2"
      :title="$t('features.uiElements.buttonGroup.vertical')"
      :code="verticalCode"
      language="html"
    >
      <div class="flex flex-wrap items-start justify-around gap-8">
        <DiButtonGroup
          orientation="vertical"
          :aria-label="$t('features.uiElements.buttonGroup.live.primaryActions')"
        >
          <DiButton v-for="index in 5" :key="index" variant="primary">
            {{ $t('features.uiElements.buttonGroup.live.button') }}
          </DiButton>
        </DiButtonGroup>
        <DiButtonGroup
          orientation="vertical"
          rounded
          :aria-label="$t('features.uiElements.buttonGroup.live.infoActions')"
        >
          <DiButton v-for="index in 4" :key="index" variant="info">
            {{ $t('features.uiElements.buttonGroup.live.button') }}
          </DiButton>
        </DiButtonGroup>
        <DiButtonGroup
          orientation="vertical"
          :aria-label="$t('features.uiElements.buttonGroup.live.outlinedChoices')"
        >
          <DiButton variant="primary" outline>
            {{ $t('features.uiElements.buttonGroup.live.one') }}
          </DiButton><DiButton variant="primary" outline>
            {{ $t('features.uiElements.buttonGroup.live.two') }}
          </DiButton><DiButton variant="primary" outline>
            {{ $t('features.uiElements.buttonGroup.live.three') }}
          </DiButton>
        </DiButtonGroup>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      class="lg:col-span-6"
      :title="$t('features.uiElements.buttonGroup.toolbar')"
      :code="toolbarCode"
      language="vue"
    >
      <div class="space-y-3">
        <div class="flex flex-wrap gap-2">
          <DiButtonGroup
            role="toolbar"
            :aria-label="$t('features.uiElements.buttonGroup.live.primaryPages')"
          >
            <DiButton
              v-for="page in 4"
              :key="page"
              variant="primary"
              :active="activeTool === page"
              @click="activeTool = page"
            >
              {{ page }}
            </DiButton>
          </DiButtonGroup>
          <DiButtonGroup
            role="toolbar"
            :aria-label="$t('features.uiElements.buttonGroup.live.secondaryPages')"
          >
            <DiButton
              v-for="page in [5, 6, 7]"
              :key="page"
              variant="info"
              :active="activeTool === page"
              @click="activeTool = page"
            >
              {{ page }}
            </DiButton>
          </DiButtonGroup>
          <DiButton variant="info" :active="activeTool === 8" @click="activeTool = 8">
            8
          </DiButton>
        </div>
        <DiButtonGroup
          role="toolbar"
          :aria-label="$t('features.uiElements.buttonGroup.live.outlinedPages')"
        >
          <DiButton
            v-for="page in 4"
            :key="page"
            variant="info"
            outline
            :active="activeTool === page"
            @click="activeTool = page"
          >
            {{ page }}
          </DiButton>
        </DiButtonGroup>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      class="lg:order-2 lg:col-span-6"
      :title="$t('features.uiElements.buttonGroup.social')"
      :code="socialCode"
      language="html"
    >
      <DiButtonGroup :aria-label="$t('features.uiElements.buttonGroup.live.socialNetworks')">
        <DiButton social="facebook" square aria-label="Facebook">
          f
        </DiButton><DiButton social="x" square aria-label="X">
          𝕏
        </DiButton><DiButton social="email" square aria-label="Email">
          @
        </DiButton><DiButton social="github" square aria-label="GitHub">
          ◉
        </DiButton><DiButton social="google" square aria-label="Google">
          G
        </DiButton>
      </DiButtonGroup>
    </PreviewCodeCard>

    <PreviewCodeCard
      class="lg:order-1 lg:col-span-6"
      :title="$t('features.uiElements.buttonGroup.nesting')"
      :code="nestingCode"
      language="html"
    >
      <DiButtonGroup rounded :aria-label="$t('features.uiElements.buttonGroup.live.nestedActions')">
        <DiButton variant="primary">
          1
        </DiButton><DiButton variant="primary">
          2
        </DiButton><DiButton variant="primary">
          {{ $t('features.uiElements.buttonGroup.live.dropdown')
          }}<template #icon-right>
            <DiIcon name="chevronDown" size="xs" />
          </template>
        </DiButton>
      </DiButtonGroup>
    </PreviewCodeCard>
  </div>
</template>
