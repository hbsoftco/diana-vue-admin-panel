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
  const pageTitle = (route.meta.pageTitle as string) || 'pages.dashboard.title'
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

    <div class="min-w-0 flex-1 flex flex-col">
      <AppHeader />

      <main class="flex-1 overflow-y-auto">
        <div class="px-4 min-h-[calc(100vh-9.9rem)]">
          <div v-if="route?.meta" class="flex items-center justify-between my-4">
            <h1 class="font-semibold text-base-content text-lg">
              {{ $t((route?.meta?.pageTitle as string) || 'pages.dashboard.title') }}
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
            <i18n-t
              keypath="layout.footer.copyright"
              tag="span"
              class="flex flex-wrap items-center justify-center gap-1 text-di-sm"
              :values="{ year: 2026 }"
            >
              <template #brand>
                <DiButton
                  variant="link"
                  size="xs"
                  custom-class="px-0.5 relative -top-0.5 text-di-sm"
                >
                  Diana
                </DiButton>
              </template>
              <template #heart>
                <DiIcon name="heartBold" color="error" custom-class="relative top-0.5" />
              </template>
              <template #author>
                <DiButton
                  custom-class="px-0.5 text-di-sm relative -top-0.5 text-primary"
                  tag="a"
                  href="https://hosseinbajan.ir/"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="link"
                  size="xs"
                >
                  Diana's father
                </DiButton>
              </template>
              <template #license>
                MIT
              </template>
            </i18n-t>
          </div>
        </footer>
      </main>
    </div>
  </div>
</template>
