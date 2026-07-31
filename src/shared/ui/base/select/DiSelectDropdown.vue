<script setup lang="ts" generic="T extends SelectValue = SelectValue">
import type { SelectOption, SelectValue } from './types'

import DiLoading from '../DiLoading.vue'
import { useDiSelect } from './composables/use-di-select'
import DiSelectOption from './DiSelectOption.vue'

defineSlots<{
  option?: (props: { option: SelectOption<T>, selected: boolean, highlighted: boolean }) => unknown
  empty?: () => unknown
  loading?: () => unknown
}>()

const select = useDiSelect<T>()
</script>

<template>
  <div
    v-if="select.isOpen.value"
    :id="select.dropdownId"
    role="listbox"
    :aria-multiselectable="select.multiple.value || undefined"
    class="absolute inset-x-0 top-full z-50 mt-1 max-h-60 overflow-y-auto rounded-field border border-base-300 bg-base-100 py-1 shadow-lg"
  >
    <div
      v-if="select.loading.value"
      class="flex items-center justify-center gap-2 px-3 py-6 text-sm text-base-content/55"
      role="status"
    >
      <slot name="loading">
        <DiLoading size="sm" />
        {{ select.loadingText.value }}
      </slot>
    </div>
    <template v-else-if="select.filteredOptions.value.length">
      <DiSelectOption
        v-for="(option, index) in select.filteredOptions.value"
        :key="option.value"
        :option="option"
        :index="index"
      >
        <template #default="slotProps">
          <slot name="option" v-bind="slotProps">
            {{ option.label }}
          </slot>
        </template>
      </DiSelectOption>
    </template>
    <div v-else class="px-3 py-6 text-center text-sm text-base-content/55" role="status">
      <slot name="empty">
        {{ select.emptyText.value }}
      </slot>
    </div>
  </div>
</template>
