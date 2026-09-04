<script setup lang="ts">
import { ref } from 'vue'

import DiButton from '@/shared/ui/base/DiButton.vue'
import DiDropdown from '@/shared/ui/base/DiDropdown.vue'
import DiIcon from '@/shared/ui/base/DiIcon.vue'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

const controlledOpen = ref(false)

const columns = ref<Record<string, boolean>>({
  name: true,
  email: true,
  role: false,
})

const basicCode = `<DiDropdown role="menu" aria-label="Account actions" panel-class="w-56 p-1">
  <template #trigger>
    <DiButton variant="primary">Account</DiButton>
  </template>

  <button type="button" role="menuitem" class="di-demo-item">Dashboard</button>
  <button type="button" role="menuitem" class="di-demo-item">Profile</button>
  <div role="separator" class="my-1 h-px bg-base-300" />
  <button type="button" role="menuitem" class="di-demo-item text-error">Log out</button>
</DiDropdown>`

const placementCode = `<DiDropdown placement="bottom-start" panel-class="w-48 p-1">…</DiDropdown>
<DiDropdown placement="bottom-end" panel-class="w-48 p-1">…</DiDropdown>
<DiDropdown placement="top-end" panel-class="w-48 p-1">…</DiDropdown>

<!-- Any placement auto-flips to the opposite side when it would
     overflow the viewport, then clamps to stay fully visible. -->`

const stayOpenCode = `<DiDropdown
  :close-on-content-click="false"
  role="menu"
  aria-label="Visible columns"
  panel-class="w-56 p-1"
>
  <template #trigger>
    <DiButton outline>Columns</DiButton>
  </template>

  <label
    v-for="(_value, key) in columns"
    :key="key"
    role="menuitem"
    class="di-demo-item cursor-pointer"
  >
    <input v-model="columns[key]" type="checkbox" class="checkbox checkbox-sm" >
    <span class="capitalize">{{ key }}</span>
  </label>
</DiDropdown>`

const controlledCode = `<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
<\/script>

<template>
  <DiButton @click="open = !open">Toggle externally</DiButton>

  <DiDropdown v-model:open="open" panel-class="w-56 p-1">
    <template #trigger>
      <DiButton variant="primary">Open menu</DiButton>
    </template>
    <button type="button" role="menuitem" class="di-demo-item">Settings</button>
    <button type="button" role="menuitem" class="di-demo-item">Help</button>
  </DiDropdown>

  <p>open = {{ open }}</p>
</template>`

const exclusiveGroupCode = `<!-- Opening either dropdown closes the other one. -->
<DiDropdown group="toolbar" panel-class="w-48 p-1">
  <template #trigger><DiButton>Filters</DiButton></template>
  …
</DiDropdown>

<DiDropdown group="toolbar" placement="bottom-end" panel-class="w-48 p-1">
  <template #trigger><DiButton>Sort</DiButton></template>
  …
</DiDropdown>`

const richContentCode = `<!-- \`class\` falls through to the real trigger button. -->
<DiDropdown class="btn btn-ghost gap-2" role="menu" placement="bottom-end" panel-class="w-64 p-1">
  <template #trigger="{ open }">
    <DiIcon name="userOutlineRounded" size="sm" />
    Jane Cooper
    <DiIcon name="arrowDown" size="xs" :rotate="open ? 180 : 0" />
  </template>

  <div role="presentation" class="px-3 py-2">
    <p class="text-di-sm font-semibold">Jane Cooper</p>
    <p class="text-xs text-base-content/60">jane@example.com</p>
  </div>
  <div role="separator" class="my-1 h-px bg-base-300" />
  <button type="button" role="menuitem" class="di-demo-item">Settings</button>
  <button type="button" role="menuitem" class="di-demo-item text-error">Log out</button>
</DiDropdown>`
</script>

<template>
  <div class="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
    <PreviewCodeCard
      :title="$t('features.uiElements.dropdowns.basic')"
      accent-color="#7c3aed"
      :code="basicCode"
      language="html"
    >
      <div class="flex min-h-40 justify-center p-6">
        <DiDropdown
          role="menu"
          :aria-label="$t('features.uiElements.dropdowns.userMenu')"
          panel-class="w-56 p-1"
        >
          <template #trigger>
            <DiButton variant="primary">
              {{ $t('features.uiElements.dropdowns.account') }}
            </DiButton>
          </template>

          <button type="button" role="menuitem" class="di-demo-item">
            {{ $t('features.uiElements.dropdowns.dashboard') }}
          </button>
          <button type="button" role="menuitem" class="di-demo-item">
            {{ $t('features.uiElements.dropdowns.profile') }}
          </button>
          <div role="separator" class="my-1 h-px bg-base-300" />
          <button type="button" role="menuitem" class="di-demo-item text-error">
            {{ $t('features.uiElements.dropdowns.logout') }}
          </button>
        </DiDropdown>
      </div>
      <p class="px-6 pb-4 text-xs text-base-content/60">
        {{ $t('features.uiElements.dropdowns.keyboardHint') }}
      </p>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.dropdowns.placement')"
      accent-color="#7c3aed"
      :code="placementCode"
      language="html"
    >
      <div class="flex min-h-40 flex-wrap items-center justify-center gap-3 p-6">
        <DiDropdown placement="bottom-start" panel-class="w-48 p-1">
          <template #trigger>
            <DiButton size="sm" outline>
              bottom-start
            </DiButton>
          </template>
          <button type="button" role="menuitem" class="di-demo-item">
            {{ $t('features.uiElements.dropdowns.profile') }}
          </button>
          <button type="button" role="menuitem" class="di-demo-item">
            {{ $t('features.uiElements.dropdowns.settings') }}
          </button>
        </DiDropdown>

        <DiDropdown placement="bottom-end" panel-class="w-48 p-1">
          <template #trigger>
            <DiButton size="sm" outline>
              bottom-end
            </DiButton>
          </template>
          <button type="button" role="menuitem" class="di-demo-item">
            {{ $t('features.uiElements.dropdowns.profile') }}
          </button>
          <button type="button" role="menuitem" class="di-demo-item">
            {{ $t('features.uiElements.dropdowns.settings') }}
          </button>
        </DiDropdown>

        <DiDropdown placement="top-end" panel-class="w-48 p-1">
          <template #trigger>
            <DiButton size="sm" outline>
              top-end
            </DiButton>
          </template>
          <button type="button" role="menuitem" class="di-demo-item">
            {{ $t('features.uiElements.dropdowns.profile') }}
          </button>
          <button type="button" role="menuitem" class="di-demo-item">
            {{ $t('features.uiElements.dropdowns.settings') }}
          </button>
        </DiDropdown>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.dropdowns.stayOpen')"
      accent-color="#7c3aed"
      :code="stayOpenCode"
      language="html"
    >
      <div class="flex min-h-40 justify-center p-6">
        <DiDropdown
          :close-on-content-click="false"
          role="menu"
          :aria-label="$t('features.uiElements.dropdowns.stayOpen')"
          panel-class="w-56 p-1"
        >
          <template #trigger>
            <DiButton outline>
              {{ $t('features.uiElements.dropdowns.columns') }}
            </DiButton>
          </template>

          <label
            v-for="(_value, key) in columns"
            :key="key"
            role="menuitem"
            class="di-demo-item cursor-pointer"
          >
            <input v-model="columns[key]" type="checkbox" class="checkbox checkbox-sm">
            <span class="capitalize">{{ key }}</span>
          </label>
        </DiDropdown>
      </div>
      <p class="px-6 pb-4 text-xs text-base-content/60">
        {{ $t('features.uiElements.dropdowns.stayOpenHint') }}
      </p>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.dropdowns.controlled')"
      accent-color="#7c3aed"
      :code="controlledCode"
      language="vue"
    >
      <div class="flex min-h-40 flex-col items-center gap-3 p-6">
        <DiButton size="sm" variant="ghost" @click="controlledOpen = !controlledOpen">
          {{ $t('features.uiElements.dropdowns.toggleExternally') }}
        </DiButton>

        <DiDropdown v-model:open="controlledOpen" panel-class="w-56 p-1">
          <template #trigger>
            <DiButton variant="primary">
              {{ $t('features.uiElements.dropdowns.openMenu') }}
            </DiButton>
          </template>
          <button type="button" role="menuitem" class="di-demo-item">
            {{ $t('features.uiElements.dropdowns.settings') }}
          </button>
          <button type="button" role="menuitem" class="di-demo-item">
            {{ $t('features.uiElements.dropdowns.help') }}
          </button>
        </DiDropdown>

        <p class="text-xs text-base-content/60">
          open = {{ controlledOpen }}
        </p>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.dropdowns.exclusiveGroup')"
      accent-color="#7c3aed"
      :code="exclusiveGroupCode"
      language="html"
    >
      <div class="flex min-h-40 items-center justify-center gap-3 p-6">
        <DiDropdown group="demo-toolbar" panel-class="w-48 p-1">
          <template #trigger>
            <DiButton size="sm">
              {{ $t('features.uiElements.dropdowns.filters') }}
            </DiButton>
          </template>
          <button type="button" role="menuitem" class="di-demo-item">
            {{ $t('features.uiElements.dropdowns.dashboard') }}
          </button>
          <button type="button" role="menuitem" class="di-demo-item">
            {{ $t('features.uiElements.dropdowns.profile') }}
          </button>
        </DiDropdown>

        <DiDropdown group="demo-toolbar" placement="bottom-end" panel-class="w-48 p-1">
          <template #trigger>
            <DiButton size="sm">
              {{ $t('features.uiElements.dropdowns.sort') }}
            </DiButton>
          </template>
          <button type="button" role="menuitem" class="di-demo-item">
            {{ $t('features.uiElements.dropdowns.settings') }}
          </button>
          <button type="button" role="menuitem" class="di-demo-item">
            {{ $t('features.uiElements.dropdowns.help') }}
          </button>
        </DiDropdown>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.uiElements.dropdowns.richContent')"
      accent-color="#7c3aed"
      :code="richContentCode"
      language="html"
    >
      <div class="flex min-h-40 justify-center p-6">
        <DiDropdown
          class="btn btn-ghost gap-2"
          role="menu"
          placement="bottom-end"
          panel-class="w-64 p-1"
        >
          <template #trigger="{ open }">
            <DiIcon name="userOutlineRounded" size="sm" />
            Jane Cooper
            <DiIcon name="arrowDown" size="xs" :rotate="open ? 180 : 0" />
          </template>

          <div role="presentation" class="px-3 py-2">
            <p class="text-di-sm font-semibold">
              Jane Cooper
            </p>
            <p class="text-xs text-base-content/60">
              jane@example.com
            </p>
          </div>
          <div role="separator" class="my-1 h-px bg-base-300" />
          <button type="button" role="menuitem" class="di-demo-item">
            {{ $t('features.uiElements.dropdowns.settings') }}
          </button>
          <button type="button" role="menuitem" class="di-demo-item text-error">
            {{ $t('features.uiElements.dropdowns.logout') }}
          </button>
        </DiDropdown>
      </div>
    </PreviewCodeCard>
  </div>
</template>

<style scoped>
.di-demo-item {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0.75rem;
  border-radius: var(--radius-field);
  padding: 0.5rem 0.75rem;
  font-size: 0.813rem;
  text-align: start;
}

.di-demo-item:hover,
.di-demo-item:focus-visible {
  background-color: var(--color-base-200);
  outline: none;
}
</style>
