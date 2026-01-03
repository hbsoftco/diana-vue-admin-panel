<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import type { BreadcrumbItem } from '@/shared/ui/base/DiBreadcrumb.vue'

import DiBreadcrumb from '@/shared/ui/base/DiBreadcrumb.vue'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

const { t } = useI18n()

const defaultBreadcrumb = `<DiBreadcrumb :items="[
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Electronics' }
]" />`

const breadcrumbVariants = `<div class="flex flex-col gap-4">
  <DiBreadcrumb variant="primary" :items="items" />
  <DiBreadcrumb variant="secondary" :items="items" />
  <DiBreadcrumb variant="accent" :items="items" />
  <DiBreadcrumb variant="info" :items="items" />
  <DiBreadcrumb variant="success" :items="items" />
  <DiBreadcrumb variant="warning" :items="items" />
  <DiBreadcrumb variant="error" :items="items" />
</div>`

const breadcrumbWithIcons = `<DiBreadcrumb :items="[
  { label: 'Home', to: '/', icon: 'homeOutlineRounded' },
  { label: 'Settings', to: '/settings', icon: 'settingsOutlineRounded' },
  { label: 'Profile', icon: 'userOutlineRounded' }
]" />`

const breadcrumbWithHome = `<DiBreadcrumb
  show-home
  :items="[
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Reports', to: '/reports' },
    { label: 'Monthly' }
  ]"
/>`

const customSeparator = `<div class="flex flex-col gap-4">
  <DiBreadcrumb
    separator="chevronRight"
    :items="items"
  />
  <DiBreadcrumb
    separator="slash"
    :items="items"
  />
  <DiBreadcrumb
    separator="chevronRightHero"
    :items="items"
  />
  <DiBreadcrumb
    separator="tilde"
    :items="items"
  />
  <DiBreadcrumb
    separator="arrowRightOutline"
    :items="items"
  />
</div>`

const complexBreadcrumb = `<DiBreadcrumb
  variant="info"
  show-home
  separator="chevronRight"
  :items="[
    { label: 'Projects', to: '/projects', icon: 'folderOutlineRounded' },
    { label: 'Web Development', to: '/projects/web' },
    { label: 'Admin Dashboard', icon: 'dashboardOutlineRounded' }
  ]"
/>`

const singleItem = `<DiBreadcrumb :items="[
  { label: 'Current Page' }
]" />`

const longBreadcrumb = `<DiBreadcrumb :items="[
  { label: 'Home', to: '/', icon: 'homeOutlineRounded' },
  { label: 'Products', to: '/products' },
  { label: 'Electronics', to: '/products/electronics' },
  { label: 'Computers', to: '/products/electronics/computers' },
  { label: 'Laptops', to: '/products/electronics/computers/laptops' },
  { label: 'Gaming Laptops' }
]" />`

// Sample data
const basicItems: BreadcrumbItem[] = [
  { label: t('features.ui-elements.breadcrumb.home'), to: '/' },
  { label: t('features.ui-elements.breadcrumb.products'), to: '/products' },
  { label: t('features.ui-elements.breadcrumb.electronics') },
]

const itemsWithIcons: BreadcrumbItem[] = [
  { label: t('features.ui-elements.breadcrumb.home'), to: '/', icon: 'homeOutlineRounded' },
  {
    label: t('features.ui-elements.breadcrumb.settings'),
    to: '/settings',
    icon: 'settingsOutlineRounded',
  },
  { label: t('features.ui-elements.breadcrumb.profile'), icon: 'userOutlineRounded' },
]

const dashboardItems: BreadcrumbItem[] = [
  { label: t('features.ui-elements.breadcrumb.dashboard'), to: '/dashboard' },
  { label: t('features.ui-elements.breadcrumb.reports'), to: '/reports' },
  { label: t('features.ui-elements.breadcrumb.monthly') },
]

const projectItems: BreadcrumbItem[] = [
  {
    label: t('features.ui-elements.breadcrumb.projects'),
    to: '/projects',
    icon: 'folderOutlineRounded',
  },
  { label: t('features.ui-elements.breadcrumb.webDevelopment'), to: '/projects/web' },
  { label: t('features.ui-elements.breadcrumb.adminDashboard'), icon: 'dashboardOutlineRounded' },
]

const singleItemData: BreadcrumbItem[] = [
  { label: t('features.ui-elements.breadcrumb.currentPage') },
]

const longItems: BreadcrumbItem[] = [
  { label: t('features.ui-elements.breadcrumb.home'), to: '/', icon: 'homeOutlineRounded' },
  { label: t('features.ui-elements.breadcrumb.products'), to: '/products' },
  { label: t('features.ui-elements.breadcrumb.electronics'), to: '/products/electronics' },
  { label: t('features.ui-elements.breadcrumb.computers'), to: '/products/electronics/computers' },
  {
    label: t('features.ui-elements.breadcrumb.laptops'),
    to: '/products/electronics/computers/laptops',
  },
  { label: t('features.ui-elements.breadcrumb.gamingLaptops') },
]
</script>

<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 items-start">
    <!-- Default Breadcrumb -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.breadcrumb.defaultBreadcrumb')"
      accent-color="#14b8a6"
      :code="defaultBreadcrumb"
      language="html"
    >
      <DiBreadcrumb :items="basicItems" />
    </PreviewCodeCard>

    <!-- Single Item -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.breadcrumb.singleItem')"
      accent-color="#14b8a6"
      :code="singleItem"
      language="html"
    >
      <DiBreadcrumb :items="singleItemData" />
    </PreviewCodeCard>

    <!-- Breadcrumb with Icons -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.breadcrumb.breadcrumbWithIcons')"
      accent-color="#14b8a6"
      :code="breadcrumbWithIcons"
      language="html"
    >
      <DiBreadcrumb :items="itemsWithIcons" />
    </PreviewCodeCard>

    <!-- Breadcrumb with Home Icon -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.breadcrumb.breadcrumbWithHome')"
      accent-color="#14b8a6"
      :code="breadcrumbWithHome"
      language="html"
    >
      <DiBreadcrumb show-home :items="dashboardItems" />
    </PreviewCodeCard>

    <!-- Custom Separators -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.breadcrumb.customSeparators')"
      accent-color="#14b8a6"
      :code="customSeparator"
      language="html"
      class="lg:col-span-2"
    >
      <div class="flex flex-col gap-4">
        <DiBreadcrumb separator="chevronRight" :items="basicItems" />
        <DiBreadcrumb separator="slash" :items="basicItems" />
        <DiBreadcrumb separator="chevronRightHero" :items="basicItems" />
        <DiBreadcrumb separator="tilde" :items="basicItems" />
        <DiBreadcrumb separator="arrowRightOutline" :items="basicItems" />
      </div>
    </PreviewCodeCard>

    <!-- Breadcrumb Variants -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.breadcrumb.breadcrumbVariants')"
      accent-color="#14b8a6"
      :code="breadcrumbVariants"
      language="html"
      class="lg:col-span-2"
    >
      <div class="flex flex-col gap-4">
        <DiBreadcrumb variant="primary" :items="basicItems" />
        <DiBreadcrumb variant="secondary" :items="basicItems" />
        <DiBreadcrumb variant="accent" :items="basicItems" />
        <DiBreadcrumb variant="info" :items="basicItems" />
        <DiBreadcrumb variant="success" :items="basicItems" />
        <DiBreadcrumb variant="warning" :items="basicItems" />
        <DiBreadcrumb variant="error" :items="basicItems" />
      </div>
    </PreviewCodeCard>

    <!-- Complex Example -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.breadcrumb.complexBreadcrumb')"
      accent-color="#14b8a6"
      :code="complexBreadcrumb"
      language="html"
      class="lg:col-span-2"
    >
      <DiBreadcrumb variant="info" show-home separator="chevronRight" :items="projectItems" />
    </PreviewCodeCard>

    <!-- Long Breadcrumb -->
    <PreviewCodeCard
      :title="$t('features.ui-elements.breadcrumb.longBreadcrumb')"
      accent-color="#14b8a6"
      :code="longBreadcrumb"
      language="html"
      class="lg:col-span-2"
    >
      <DiBreadcrumb :items="longItems" />
    </PreviewCodeCard>
  </div>
</template>
