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

      <main class="flex-1 overflow-y-auto px-4">
        <div v-if="route?.meta" class="flex block items-center justify-between my-4">
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
      </main>
    </div>
  </div>
</template>
