<script setup lang="ts">
import AppHeader from '@shared/ui/layout/AppHeader.vue'
import AppSidebar from '@shared/ui/layout/AppSidebar.vue'
import { watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const route = useRoute()
const { t } = useI18n()

// Set document title from route meta
watchEffect(() => {
  const pageTitle = (route.meta.pageTitle as string) || 'menu.dashboards'
  document.title = t(pageTitle)
})
</script>

<template>
  <div class="flex h-screen bg-(--color-bg-background)">
    <AppSidebar />

    <div class="flex-1 flex flex-col">
      <AppHeader />

      <main class="flex-1 overflow-y-auto">
        <div class="px-4 min-h-[calc(100vh-9.9rem)]">
          <div v-if="route?.meta" class="flex items-center justify-between my-4">
            <h1 class="font-semibold text-base-content text-lg">
              {{ $t((route?.meta?.pageTitle as string) || 'menu.dashboards') }}
            </h1>
            <div class="breadcrumbs text-[13px]">
              <ul>
                <li
                  v-for="(crumb, index) in (route.meta.breadcrumb as {
                    label: string
                    link?: string
                  }[]) || []"
                  :key="index"
                  class="font-medium"
                >
                  <RouterLink
                    v-if="crumb.link"
                    :to="crumb.link"
                    class="no-underline text-base-content"
                  >
                    {{ $t(crumb.label) }}
                  </RouterLink>
                  <span v-else class="no-underline">{{ $t(crumb.label) }}</span>
                </li>
              </ul>
            </div>
          </div>

          <RouterView />
        </div>

        <footer
          class="footer py-3 text-center mt-8 bg-content-background border-t border-(--color-border-header)"
        >
          <div class="flex justify-center items-center w-full">
            <span class="flex gap-1 text-[13.6px]">
              Copyright © <span id="year">2025</span>
              <a href="javascript:void(0);" class="font-semibold">Diana</a>. Designed with
              <i-solar-heart-bold class="text-error relative top-0.5" /> by
              <a href="https://hosseinbajan.ir/" target="_blank">
                <span class="font-semibold text-primary text-decoration-underline">
                  Diana's father
                </span>
              </a>
              All rights reserved
            </span>
          </div>
        </footer>
      </main>
    </div>
  </div>
</template>
