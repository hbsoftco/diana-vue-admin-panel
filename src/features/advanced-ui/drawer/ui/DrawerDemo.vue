<script setup lang="ts">
import { ref } from 'vue'

import DiButton from '@/shared/ui/base/DiButton.vue'
import DiDrawer from '@/shared/ui/base/DiDrawer.vue'
import DiIcon from '@/shared/ui/base/DiIcon.vue'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

/* =======================
   State
======================= */

const basicOpen = ref(false)
const navbarOpen = ref(false)
const responsiveOpen = ref(false)
const iconOnlyOpen = ref(false)
const endOpen = ref(false)

/* =======================
   Code examples
======================= */

const basicExample = `<DiButton variant="primary" @click="isOpen = true">
  Open drawer
</DiButton>

<DiDrawer v-model="isOpen">
  <template #side>
    <ul class="menu bg-base-200 min-h-full w-64 p-4">
      <li class="menu-title">
        Open drawer
      </li>
      <li><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
    </ul>
  </template>
</DiDrawer>`

const navbarExample = `<DiDrawer v-model="isOpen">
  <template #content>
    <div class="navbar bg-base-300 w-full">
      <div class="flex-none lg:hidden">
        <DiButton variant="ghost" square @click="isOpen = true">
          <DiIcon name="menu" size="md" />
        </DiButton>
      </div>

      <div class="mx-2 flex-1 px-2">
        Navbar Title
      </div>

      <div class="hidden flex-none lg:block">
        <ul class="menu menu-horizontal">
          <li><a>Navbar Item 1</a></li>
          <li><a>Navbar Item 2</a></li>
        </ul>
      </div>
    </div>

    <div class="p-4">
      Content
    </div>
  </template>

  <template #side>
    <ul class="menu bg-base-200 min-h-full w-64 p-4">
      <li><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
    </ul>
  </template>
</DiDrawer>`

const responsiveExample = `<DiDrawer v-model="isOpen" open-at="lg">
  <template #content>
    <div class="flex h-full flex-col items-center justify-center gap-2">
      <DiButton
        variant="primary"
        class="drawer-button lg:hidden"
        @click="isOpen = true"
      >
        Open drawer
      </DiButton>
    </div>
  </template>

  <template #side>
    <ul class="menu bg-base-200 min-h-full w-64 p-4">
      <li><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
    </ul>
  </template>
</DiDrawer>`

const iconOnlyExample = `<DiDrawer v-model="isOpen" open-at="lg">
  <template #content>
    <nav class="navbar w-full bg-base-300">
      <DiButton variant="ghost" square @click="isOpen = !isOpen">
        <DiIcon name="menu" size="md" />
      </DiButton>

      <div class="px-4">
        Navbar Title
      </div>
    </nav>

    <div class="p-4">
      Page Content
    </div>
  </template>

  <template #side>
    <div class="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64 transition-all duration-300">
      <ul class="menu w-full grow">
        <li>
          <DiButton
            variant="ghost" size="sm"
            class="is-drawer-close:tooltip is-drawer-close:tooltip-right justify-start w-full"
            data-tip="Homepage"
          >
            <DiIcon name="home" size="md" />
            <span class="is-drawer-close:hidden">Homepage</span>
          </DiButton>
        </li>

        <li>
          <DiButton
            variant="ghost" size="sm"
            class="is-drawer-close:tooltip is-drawer-close:tooltip-right justify-start w-full"
            data-tip="Settings"
          >
            <DiIcon name="settingsOutlineRounded" size="md" />
            <span class="is-drawer-close:hidden">Settings</span>
          </DiButton>
        </li>
      </ul>
    </div>
  </template>
</DiDrawer>`

const endExample = `<DiButton variant="primary" @click="isOpen = true">
  Open drawer
</DiButton>

<DiDrawer v-model="isOpen" position="end">
  <template #side>
    <ul class="menu bg-base-200 min-h-full w-64 p-4">
      <li class="menu-title">
        Navigation
      </li>

      <li><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
    </ul>
  </template>
</DiDrawer>`
</script>

<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 items-start">
    <!-- Basic -->
    <PreviewCodeCard
      :title="$t('features.advanced-ui.drawers.basic')"
      accent-color="#a855f7"
      :code="basicExample"
      language="html"
    >
      <DiButton variant="primary" @click="basicOpen = true">
        {{ $t('features.advanced-ui.drawers.openDrawer') }}
      </DiButton>
      <DiDrawer v-model="basicOpen">
        <template #side>
          <ul class="menu bg-base-200 min-h-full w-64 p-4">
            <li class="menu-title">
              {{ $t('features.advanced-ui.drawers.openDrawer') }}
            </li>
            <li>
              <a>{{ $t('features.advanced-ui.drawers.item1') }}</a>
            </li>
            <li>
              <a>{{ $t('features.advanced-ui.drawers.item2') }}</a>
            </li>
          </ul>
        </template>
      </DiDrawer>
    </PreviewCodeCard>

    <!-- End (right) -->
    <PreviewCodeCard
      :title="$t('features.advanced-ui.drawers.end')"
      accent-color="#a855f7"
      :code="endExample"
      language="html"
    >
      <DiButton variant="primary" @click="endOpen = true">
        {{ $t('features.advanced-ui.drawers.openDrawer') }}
      </DiButton>
      <DiDrawer v-model="endOpen" position="end">
        <template #side>
          <ul class="menu bg-base-200 min-h-full w-64 p-4">
            <li class="menu-title">
              {{ $t('features.advanced-ui.drawers.sidebarTitle') }}
            </li>
            <li>
              <a>{{ $t('features.advanced-ui.drawers.item1') }}</a>
            </li>
            <li>
              <a>{{ $t('features.advanced-ui.drawers.item2') }}</a>
            </li>
          </ul>
        </template>
      </DiDrawer>
    </PreviewCodeCard>

    <!-- Navbar + Sidebar (mobile drawer / desktop navbar) -->
    <PreviewCodeCard
      :title="$t('features.advanced-ui.drawers.navbar')"
      accent-color="#a855f7"
      :code="navbarExample"
      language="html"
      class="lg:col-span-2"
    >
      <DiDrawer
        v-model="navbarOpen"
        custom-class="h-64 rounded-box overflow-hidden border border-base-300"
      >
        <template #content>
          <div class="navbar bg-base-300 w-full">
            <div class="flex-none lg:hidden">
              <DiButton variant="ghost" square @click="navbarOpen = true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </DiButton>
            </div>
            <div class="mx-2 flex-1 px-2">
              {{ $t('features.advanced-ui.drawers.navbarTitle') }}
            </div>
            <div class="hidden flex-none lg:block">
              <ul class="menu menu-horizontal">
                <li>
                  <a>{{ $t('features.advanced-ui.drawers.navItem1') }}</a>
                </li>
                <li>
                  <a>{{ $t('features.advanced-ui.drawers.navItem2') }}</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="p-4">
            {{ $t('features.advanced-ui.drawers.content') }}
          </div>
        </template>
        <template #side>
          <ul class="menu bg-base-200 min-h-full w-64 p-4">
            <li>
              <a>{{ $t('features.advanced-ui.drawers.item1') }}</a>
            </li>
            <li>
              <a>{{ $t('features.advanced-ui.drawers.item2') }}</a>
            </li>
          </ul>
        </template>
      </DiDrawer>
    </PreviewCodeCard>

    <!-- Responsive (lg:drawer-open) -->
    <PreviewCodeCard
      :title="$t('features.advanced-ui.drawers.responsive')"
      accent-color="#a855f7"
      :code="responsiveExample"
      language="html"
      class="lg:col-span-2"
    >
      <DiDrawer
        v-model="responsiveOpen"
        open-at="lg"
        custom-class="h-64 rounded-box overflow-hidden border border-base-300"
      >
        <template #content>
          <div class="flex h-full flex-col items-center justify-center gap-2">
            <p class="text-base-content/60 text-sm">
              {{ $t('features.advanced-ui.drawers.responsiveHint') }}
            </p>
            <DiButton
              variant="primary"
              class="drawer-button lg:hidden"
              @click="responsiveOpen = true"
            >
              {{ $t('features.advanced-ui.drawers.openDrawer') }}
            </DiButton>
          </div>
        </template>
        <template #side>
          <ul class="menu bg-base-200 min-h-full w-64 p-4">
            <li>
              <a>{{ $t('features.advanced-ui.drawers.item1') }}</a>
            </li>
            <li>
              <a>{{ $t('features.advanced-ui.drawers.item2') }}</a>
            </li>
          </ul>
        </template>
      </DiDrawer>
    </PreviewCodeCard>

    <!-- Icon-only collapsible (is-drawer-open / is-drawer-close) -->
    <PreviewCodeCard
      :title="$t('features.advanced-ui.drawers.iconOnly')"
      accent-color="#a855f7"
      :code="iconOnlyExample"
      language="html"
      class="lg:col-span-2"
    >
      <DiDrawer
        v-model="iconOnlyOpen"
        open-at="lg"
        side-class="is-drawer-close:overflow-visible"
        custom-class="h-64 rounded-box overflow-hidden border border-base-300"
      >
        <template #content>
          <nav class="navbar w-full bg-base-300">
            <DiButton variant="ghost" square @click="iconOnlyOpen = !iconOnlyOpen">
              <DiIcon name="menu" size="md" />
            </DiButton>
            <div class="px-4">
              {{ $t('features.advanced-ui.drawers.navbarTitle') }}
            </div>
          </nav>
          <div class="p-4">
            {{ $t('features.advanced-ui.drawers.content') }}
          </div>
        </template>
        <template #side>
          <div
            class="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64 transition-all duration-300"
          >
            <ul class="menu w-full grow">
              <li>
                <DiButton
                  variant="ghost"
                  size="sm"
                  class="is-drawer-close:tooltip is-drawer-close:tooltip-right justify-start w-full"
                  data-tip="Homepage"
                >
                  <DiIcon name="home" size="md" />
                  <span class="is-drawer-close:hidden">{{
                    $t('features.advanced-ui.drawers.homepage')
                  }}</span>
                </DiButton>
              </li>
              <li>
                <DiButton
                  variant="ghost"
                  size="sm"
                  class="is-drawer-close:tooltip is-drawer-close:tooltip-right justify-start w-full"
                  data-tip="Settings"
                >
                  <DiIcon name="settingsOutlineRounded" size="md" />
                  <span class="is-drawer-close:hidden">{{
                    $t('features.advanced-ui.drawers.settings')
                  }}</span>
                </DiButton>
              </li>
            </ul>
          </div>
        </template>
      </DiDrawer>
    </PreviewCodeCard>
  </div>
</template>
