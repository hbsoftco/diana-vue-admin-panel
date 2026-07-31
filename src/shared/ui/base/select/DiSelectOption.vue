<script setup lang="ts" generic="T extends SelectValue = SelectValue">
import type { SelectOption, SelectValue } from './types'

import DiIcon from '../DiIcon.vue'
import { useDiSelect } from './composables/use-di-select'

type Props = {
  option: SelectOption<T>
  index: number
}

defineProps<Props>()

defineSlots<{
  default?: (props: { option: SelectOption<T>, selected: boolean, highlighted: boolean }) => unknown
}>()

const select = useDiSelect<T>()
</script>

<template>
  <div
    :id="select.getOptionId(option)"
    role="option"
    :aria-selected="select.isSelected(option.value)"
    :aria-disabled="select.isOptionDisabled(option) || undefined"
    class="flex cursor-pointer items-center outline-none"
    :class="[
      select.sizeClasses.value.option,
      select.highlightedIndex.value === index && 'bg-base-200',
      select.isSelected(option.value) && ['font-medium', select.variantClasses.value.selected],
      select.isOptionDisabled(option) && 'cursor-not-allowed opacity-45',
    ]"
    @mouseenter="select.highlightedIndex.value = index"
    @mousedown.prevent
    @click="select.selectOption(option)"
  >
    <span class="min-w-0 flex-1">
      <slot
        :option="option"
        :selected="select.isSelected(option.value)"
        :highlighted="select.highlightedIndex.value === index"
      >
        {{ option.label }}
      </slot>
    </span>
    <DiIcon
      v-if="select.isSelected(option.value)"
      name="lightCheck"
      :size="select.sizeClasses.value.icon"
      :custom-class="select.variantClasses.value.indicator"
    />
  </div>
</template>
