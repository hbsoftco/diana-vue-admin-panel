<script setup lang="ts">
import { ref } from 'vue'

import DiPagination from '@/shared/ui/base/DiPagination.vue'
import PreviewCodeCard from '@/shared/ui/patterns/PreviewCodeCard.vue'

const currentPage = ref(4)
const compactPage = ref(20)

const basicPagination = `<DiPagination
  v-model="page"
  :total-pages="8"
  :aria-label="$t('features.ui-elements.pagination.label')"
  :previous-label="$t('features.ui-elements.pagination.previous')"
  :next-label="$t('features.ui-elements.pagination.next')"
/>`

const compactPagination = `<DiPagination
  v-model="page"
  :total-pages="40"
  :sibling-count="1"
  :boundary-count="1"
  show-first-last
  variant="primary"
  :aria-label="$t('features.ui-elements.pagination.label')"
  :first-label="$t('features.ui-elements.pagination.first')"
  :previous-label="$t('features.ui-elements.pagination.previous')"
  :next-label="$t('features.ui-elements.pagination.next')"
  :last-label="$t('features.ui-elements.pagination.last')"
/>`

const paginationSizes = `<div class="flex flex-col items-start gap-3">
  <DiPagination v-model="page" :total-pages="4" size="xs" :show-previous-next="false" :aria-label="$t('features.ui-elements.pagination.label')" />
  <DiPagination v-model="page" :total-pages="4" size="sm" :show-previous-next="false" :aria-label="$t('features.ui-elements.pagination.label')" />
  <DiPagination v-model="page" :total-pages="4" size="md" :show-previous-next="false" :aria-label="$t('features.ui-elements.pagination.label')" />
  <DiPagination v-model="page" :total-pages="4" size="lg" :show-previous-next="false" :aria-label="$t('features.ui-elements.pagination.label')" />
  <DiPagination v-model="page" :total-pages="4" size="xl" :show-previous-next="false" :aria-label="$t('features.ui-elements.pagination.label')" />
</div>`

const paginationStyles = `<div class="flex flex-col items-start gap-3">
  <DiPagination v-model="page" :total-pages="5" :show-previous-next="false" variant="primary" :aria-label="$t('features.ui-elements.pagination.label')" />
  <DiPagination v-model="page" :total-pages="5" :show-previous-next="false" variant="secondary" outline :aria-label="$t('features.ui-elements.pagination.label')" />
  <DiPagination v-model="page" :total-pages="5" :show-previous-next="false" variant="accent" soft :aria-label="$t('features.ui-elements.pagination.label')" />
  <DiPagination v-model="page" :total-pages="5" :show-previous-next="false" variant="info" dash :aria-label="$t('features.ui-elements.pagination.label')" />
</div>`

const verticalPagination = `<DiPagination
  v-model="page"
  :total-pages="5"
  orientation="vertical"
  variant="primary"
  :aria-label="$t('features.ui-elements.pagination.label')"
  :previous-label="$t('features.ui-elements.pagination.previous')"
  :next-label="$t('features.ui-elements.pagination.next')"
/>`

const customPageContent = `<DiPagination
  v-model="page"
  :total-pages="6"
  :show-previous-next="false"
  :aria-label="$t('features.ui-elements.pagination.label')"
>
  <template #page="{ page, active }">
    {{ active ? \`Page \${page}\` : page }}
  </template>
</DiPagination>`
</script>

<template>
  <div class="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
    <PreviewCodeCard
      :title="$t('features.ui-elements.pagination.basic')"
      :code="basicPagination"
      language="html"
    >
      <div class="space-y-3">
        <DiPagination
          v-model="currentPage"
          :total-pages="8"
          :aria-label="$t('features.ui-elements.pagination.label')"
          :previous-label="$t('features.ui-elements.pagination.previous')"
          :next-label="$t('features.ui-elements.pagination.next')"
        />
        <p class="text-sm text-base-content/70">
          {{ $t('features.ui-elements.pagination.current', { page: currentPage }) }}
        </p>
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.ui-elements.pagination.compact')"
      :code="compactPagination"
      language="html"
    >
      <DiPagination
        v-model="compactPage"
        :total-pages="40"
        :sibling-count="1"
        :boundary-count="1"
        show-first-last
        variant="primary"
        :aria-label="$t('features.ui-elements.pagination.label')"
        :first-label="$t('features.ui-elements.pagination.first')"
        :previous-label="$t('features.ui-elements.pagination.previous')"
        :next-label="$t('features.ui-elements.pagination.next')"
        :last-label="$t('features.ui-elements.pagination.last')"
      />
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.ui-elements.pagination.sizes')"
      :code="paginationSizes"
      language="html"
    >
      <div class="flex flex-col items-start gap-3">
        <DiPagination
          v-model="currentPage"
          :total-pages="4"
          size="xs"
          :show-previous-next="false"
          :aria-label="$t('features.ui-elements.pagination.label')"
        />
        <DiPagination
          v-model="currentPage"
          :total-pages="4"
          size="sm"
          :show-previous-next="false"
          :aria-label="$t('features.ui-elements.pagination.label')"
        />
        <DiPagination
          v-model="currentPage"
          :total-pages="4"
          size="md"
          :show-previous-next="false"
          :aria-label="$t('features.ui-elements.pagination.label')"
        />
        <DiPagination
          v-model="currentPage"
          :total-pages="4"
          size="lg"
          :show-previous-next="false"
          :aria-label="$t('features.ui-elements.pagination.label')"
        />
        <DiPagination
          v-model="currentPage"
          :total-pages="4"
          size="xl"
          :show-previous-next="false"
          :aria-label="$t('features.ui-elements.pagination.label')"
        />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.ui-elements.pagination.styles')"
      :code="paginationStyles"
      language="html"
    >
      <div class="flex flex-col items-start gap-3">
        <DiPagination
          v-model="currentPage"
          :total-pages="5"
          :show-previous-next="false"
          variant="primary"
          :aria-label="$t('features.ui-elements.pagination.label')"
        />
        <DiPagination
          v-model="currentPage"
          :total-pages="5"
          :show-previous-next="false"
          variant="secondary"
          outline
          :aria-label="$t('features.ui-elements.pagination.label')"
        />
        <DiPagination
          v-model="currentPage"
          :total-pages="5"
          :show-previous-next="false"
          variant="accent"
          soft
          :aria-label="$t('features.ui-elements.pagination.label')"
        />
        <DiPagination
          v-model="currentPage"
          :total-pages="5"
          :show-previous-next="false"
          variant="info"
          dash
          :aria-label="$t('features.ui-elements.pagination.label')"
        />
      </div>
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.ui-elements.pagination.vertical')"
      :code="verticalPagination"
      language="html"
    >
      <DiPagination
        v-model="currentPage"
        :total-pages="5"
        orientation="vertical"
        variant="primary"
        :aria-label="$t('features.ui-elements.pagination.label')"
        :previous-label="$t('features.ui-elements.pagination.previous')"
        :next-label="$t('features.ui-elements.pagination.next')"
      />
    </PreviewCodeCard>

    <PreviewCodeCard
      :title="$t('features.ui-elements.pagination.custom')"
      :code="customPageContent"
      language="html"
    >
      <DiPagination
        v-model="currentPage"
        :total-pages="6"
        :show-previous-next="false"
        :aria-label="$t('features.ui-elements.pagination.label')"
      >
        <template #page="{ page, active }">
          {{ active ? $t('features.ui-elements.pagination.page', { page }) : page }}
        </template>
      </DiPagination>
    </PreviewCodeCard>
  </div>
</template>
