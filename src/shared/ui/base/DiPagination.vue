<script setup lang="ts">
import { computed } from 'vue'

import type { BtnVariant, Size } from '@/shared/types/models'

import { useDirection } from '@/shared/composables/use-direction'
import DiButton from '@/shared/ui/base/DiButton.vue'

type Orientation = 'horizontal' | 'vertical'
type PaginationItem = number | 'ellipsis-start' | 'ellipsis-end'

type Props = {
  totalPages: number
  siblingCount?: number
  boundaryCount?: number
  size?: Size
  variant?: BtnVariant
  orientation?: Orientation
  disabled?: boolean
  outline?: boolean
  soft?: boolean
  dash?: boolean
  showPreviousNext?: boolean
  showFirstLast?: boolean
  ariaLabel?: string
  firstLabel?: string
  previousLabel?: string
  nextLabel?: string
  lastLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  siblingCount: 1,
  boundaryCount: 1,
  size: 'md',
  variant: 'neutral',
  orientation: 'horizontal',
  disabled: false,
  outline: false,
  soft: false,
  dash: false,
  showPreviousNext: true,
  showFirstLast: false,
  ariaLabel: 'Pagination',
  firstLabel: 'First page',
  previousLabel: 'Previous page',
  nextLabel: 'Next page',
  lastLabel: 'Last page',
})

const emit = defineEmits<{
  change: [page: number]
}>()

defineSlots<{
  page?: (props: { page: number, active: boolean }) => unknown
  ellipsis?: () => unknown
  first?: () => unknown
  previous?: () => unknown
  next?: () => unknown
  last?: () => unknown
}>()

const model = defineModel<number>({ default: 1 })

const { isRtl } = useDirection()

const ORIENTATION_CLASSES: Record<Orientation, string> = {
  horizontal: 'join-horizontal',
  vertical: 'join-vertical',
}

const normalizedTotalPages = computed(() =>
  Number.isFinite(props.totalPages) ? Math.max(1, Math.floor(props.totalPages)) : 1,
)

const currentPage = computed(() =>
  Math.min(Math.max(Math.floor(model.value || 1), 1), normalizedTotalPages.value),
)

const normalizedSiblingCount = computed(() =>
  Number.isFinite(props.siblingCount) ? Math.max(0, Math.floor(props.siblingCount)) : 1,
)

const normalizedBoundaryCount = computed(() =>
  Number.isFinite(props.boundaryCount) ? Math.max(0, Math.floor(props.boundaryCount)) : 1,
)

const paginationClasses = computed(() => ['join', ORIENTATION_CLASSES[props.orientation]])

const pageItems = computed<PaginationItem[]>(() => {
  const pages = new Set<number>()
  const total = normalizedTotalPages.value
  const boundary = normalizedBoundaryCount.value
  const sibling = normalizedSiblingCount.value

  for (let page = 1; page <= Math.min(boundary, total); page++) pages.add(page)

  for (let page = Math.max(total - boundary + 1, 1); page <= total; page++) pages.add(page)

  for (
    let page = Math.max(currentPage.value - sibling, 1);
    page <= Math.min(currentPage.value + sibling, total);
    page++
  ) {
    pages.add(page)
  }

  const sortedPages = [...pages].sort((first, second) => first - second)
  const items: PaginationItem[] = []

  sortedPages.forEach((page, index) => {
    const previousPage = sortedPages[index - 1]

    if (previousPage !== undefined && page - previousPage === 2)
      items.push(previousPage + 1)
    else if (previousPage !== undefined && page - previousPage > 2)
      items.push(index === 1 ? 'ellipsis-start' : 'ellipsis-end')

    items.push(page)
  })

  return items
})

const isFirstPage = computed(() => currentPage.value === 1)
const isLastPage = computed(() => currentPage.value === normalizedTotalPages.value)
const previousSymbol = computed(() => (isRtl.value ? '›' : '‹'))
const nextSymbol = computed(() => (isRtl.value ? '‹' : '›'))
const firstSymbol = computed(() => (isRtl.value ? '»' : '«'))
const lastSymbol = computed(() => (isRtl.value ? '«' : '»'))

function selectPage(page: number) {
  if (props.disabled)
    return

  const nextPage = Math.min(Math.max(page, 1), normalizedTotalPages.value)

  if (nextPage === currentPage.value)
    return

  model.value = nextPage
  emit('change', nextPage)
}
</script>

<template>
  <nav :aria-label="ariaLabel">
    <div :class="paginationClasses">
      <DiButton
        v-if="showFirstLast"
        custom-class="join-item"
        :size="size"
        :variant="variant"
        :outline="outline"
        :soft="soft"
        :dash="dash"
        :disabled="disabled || isFirstPage"
        :aria-label="firstLabel"
        @click="selectPage(1)"
      >
        <slot name="first">
          {{ firstSymbol }}
        </slot>
      </DiButton>

      <DiButton
        v-if="showPreviousNext"
        custom-class="join-item"
        :size="size"
        :variant="variant"
        :outline="outline"
        :soft="soft"
        :dash="dash"
        :disabled="disabled || isFirstPage"
        :aria-label="previousLabel"
        @click="selectPage(currentPage - 1)"
      >
        <slot name="previous">
          {{ previousSymbol }}
        </slot>
      </DiButton>

      <template v-for="item in pageItems" :key="item">
        <DiButton
          v-if="typeof item === 'number'"
          custom-class="join-item"
          :size="size"
          :variant="variant"
          :outline="outline"
          :soft="soft"
          :dash="dash"
          :active="item === currentPage"
          :disabled="disabled"
          :aria-current="item === currentPage ? 'page' : undefined"
          :aria-label="String(item)"
          @click="selectPage(item)"
        >
          <slot name="page" :page="item" :active="item === currentPage">
            {{ item }}
          </slot>
        </DiButton>

        <DiButton
          v-else
          custom-class="join-item"
          :size="size"
          :variant="variant"
          :outline="outline"
          :soft="soft"
          :dash="dash"
          disabled
          aria-hidden="true"
          tabindex="-1"
        >
          <slot name="ellipsis">
            …
          </slot>
        </DiButton>
      </template>

      <DiButton
        v-if="showPreviousNext"
        custom-class="join-item"
        :size="size"
        :variant="variant"
        :outline="outline"
        :soft="soft"
        :dash="dash"
        :disabled="disabled || isLastPage"
        :aria-label="nextLabel"
        @click="selectPage(currentPage + 1)"
      >
        <slot name="next">
          {{ nextSymbol }}
        </slot>
      </DiButton>

      <DiButton
        v-if="showFirstLast"
        custom-class="join-item"
        :size="size"
        :variant="variant"
        :outline="outline"
        :soft="soft"
        :dash="dash"
        :disabled="disabled || isLastPage"
        :aria-label="lastLabel"
        @click="selectPage(normalizedTotalPages)"
      >
        <slot name="last">
          {{ lastSymbol }}
        </slot>
      </DiButton>
    </div>
  </nav>
</template>
