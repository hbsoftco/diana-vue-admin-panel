<script setup lang="ts">
import AppHeader from '@shared/ui/layout/AppHeader.vue'
import AppSidebar from '@shared/ui/layout/AppSidebar.vue'
import { computed, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import type { BreadcrumbItem } from '@/shared/ui/base/DiBreadcrumb.vue'

import DiBreadcrumb from '@/shared/ui/base/DiBreadcrumb.vue'
import DiButton from '@/shared/ui/base/DiButton.vue'
import DiIcon from '@/shared/ui/base/DiIcon.vue'

const route = useRoute()
const { t } = useI18n()

watchEffect(() => {
  const pageTitle = (route.meta.pageTitle as string) || 'menu.dashboards'
  document.title = t(pageTitle)
})

const breadcrumbItems = computed<BreadcrumbItem[]>(() => {
  const crumbs = (route.meta.breadcrumb as { label: string, link?: string }[]) || []

  return crumbs.map((crumb, index) => ({
    label: t(crumb.label),
    to: crumb.link,
    active: index === crumbs.length - 1,
  }))
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

            <DiBreadcrumb
              v-if="breadcrumbItems.length > 0"
              :items="breadcrumbItems"
              variant="primary"
              separator-color="text-base-content/30"
            />
          </div>

          <RouterView />
        </div>

        <footer class="footer py-3 text-center mt-8 bg-content-background border-t border-content">
          <div class="flex justify-center items-center w-full">
            <span class="flex gap-1 text-di-sm">
              Copyright © <span id="year">2026</span>
              <DiButton variant="link" size="xs" custom-class="px-0.5 relative -top-0.5 text-di-sm">
                Diana
              </DiButton>
              . Designed with
              <DiIcon name="heartBold" color="error" custom-class="relative top-0.5" /> by
              <DiButton
                custom-class="px-0.5 text-di-sm relative -top-0.5 text-primary"
                tag="a"
                href="https://hosseinbajan.ir/"
                target="_blank"
                variant="link"
                size="xs"
              >
                Diana's father
              </DiButton>
              . Open Source under the MIT License
            </span>
          </div>
        </footer>
      </main>
    </div>
  </div>
</template>
