<script setup lang="ts" generic="T extends SelectValue = SelectValue">
import { computed, nextTick, ref } from 'vue'

import type { SelectOption, SelectValue } from './types'

import DiButton from '../DiButton.vue'
import DiIcon from '../DiIcon.vue'
import { useDiSelect } from './composables/use-di-select'
import DiSelectTag from './DiSelectTag.vue'

type Props = {
  ariaLabel?: string
}

withDefaults(defineProps<Props>(), {
  ariaLabel: 'Select an option',
})

defineSlots<{
  selected?: (props: { option: SelectOption<T>, clear: () => void }) => unknown
  tag?: (props: { option: SelectOption<T>, remove: () => void }) => unknown
}>()

const select = useDiSelect<T>()
const inputElement = ref<HTMLInputElement | null>(null)

const showPlaceholder = computed(
  () => !select.selectedOptions.value.length && (!select.searchable.value || !select.isOpen.value),
)

const showClear = computed(
  () => select.clearable.value && select.selectedOptions.value.length > 0 && !select.disabled.value,
)

function focusInput() {
  nextTick(() => inputElement.value?.focus())
}

function handlePointerDown(event: MouseEvent) {
  if (select.disabled.value)
    return

  if ((event.target as HTMLElement).closest('button'))
    return

  select.toggle()
  focusInput()
}

function moveHighlight(direction: 1 | -1) {
  if (!select.isOpen.value) {
    select.open()
    return
  }

  const options = select.filteredOptions.value
  if (!options.length)
    return

  let nextIndex = select.highlightedIndex.value
  for (let count = 0; count < options.length; count += 1) {
    nextIndex = (nextIndex + direction + options.length) % options.length
    const option = options[nextIndex]
    if (option && !select.isOptionDisabled(option)) {
      select.highlightedIndex.value = nextIndex
      break
    }
  }
}

function handleKeydown(event: KeyboardEvent) {
  if (select.disabled.value)
    return

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    moveHighlight(1)
  }
  else if (event.key === 'ArrowUp') {
    event.preventDefault()
    moveHighlight(-1)
  }
  else if (event.key === 'Enter') {
    event.preventDefault()
    const option = select.filteredOptions.value[select.highlightedIndex.value]
    if (select.isOpen.value && option) {
      select.selectOption(option)
    }
    else {
      select.open()
    }
  }
  else if (event.key === 'Escape') {
    event.preventDefault()
    select.close()
  }
  else if (event.key === ' ' && !select.searchable.value) {
    event.preventDefault()
    select.toggle()
  }
  else if (
    event.key === 'Backspace'
    && select.multiple.value
    && !select.query.value
    && select.selectedOptions.value.length
  ) {
    select.removeOption(select.selectedOptions.value[select.selectedOptions.value.length - 1]!)
  }
}
</script>

<template>
  <div
    :id="select.triggerId"
    class="flex w-full cursor-text flex-wrap items-center rounded-field border border-base-300 bg-base-100 text-base-content transition-colors hover:border-base-content/35"
    :class="[
      select.sizeClasses.value.trigger,
      select.isOpen.value && 'border-base-content/40 ring-2 ring-base-content/10',
      select.invalid.value && 'border-error',
      select.disabled.value && 'cursor-not-allowed bg-base-200 opacity-55',
    ]"
    @mousedown="handlePointerDown"
  >
    <template v-if="select.multiple.value">
      <DiSelectTag
        v-for="option in select.selectedOptions.value"
        :key="option.value"
        :option="option"
        :disabled="select.disabled.value"
        @remove="select.removeOption"
      >
        <template #default="slotProps">
          <slot name="tag" v-bind="slotProps">
            <span class="truncate">{{ option.label }}</span>
          </slot>
        </template>
      </DiSelectTag>
    </template>
    <template v-else-if="select.selectedOptions.value[0] && !select.isOpen.value">
      <slot name="selected" :option="select.selectedOptions.value[0]" :clear="select.clear">
        <span class="min-w-0 flex-1 truncate">{{ select.selectedOptions.value[0].label }}</span>
      </slot>
    </template>

    <input
      v-if="select.searchable.value"
      ref="inputElement"
      v-model="select.query.value"
      type="text"
      role="combobox"
      autocomplete="off"
      class="min-w-16 flex-1 border-0 bg-transparent p-0 text-inherit outline-none placeholder:text-base-content/45"
      :placeholder="showPlaceholder ? select.placeholder.value : ''"
      :aria-label="ariaLabel"
      :aria-controls="select.dropdownId"
      :aria-expanded="select.isOpen.value"
      :aria-activedescendant="select.activeDescendant.value"
      :aria-invalid="select.invalid.value || undefined"
      :disabled="select.disabled.value"
      @input="select.open"
      @keydown="handleKeydown"
    >
    <div
      v-else
      class="min-w-0 flex-1 outline-none"
      role="combobox"
      tabindex="0"
      :aria-label="ariaLabel"
      :aria-controls="select.dropdownId"
      :aria-expanded="select.isOpen.value"
      :aria-activedescendant="select.activeDescendant.value"
      :aria-invalid="select.invalid.value || undefined"
      :aria-disabled="select.disabled.value || undefined"
      @keydown="handleKeydown"
    >
      <span v-if="showPlaceholder" class="text-base-content/45">
        {{ select.placeholder.value }}
      </span>
    </div>

    <DiButton
      v-if="showClear"
      variant="ghost"
      :size="select.sizeClasses.value.actionSize"
      square
      aria-label="Clear selection"
      :custom-class="`${select.sizeClasses.value.action} text-base-content/45`"
      @click.stop="select.clear"
    >
      <DiIcon name="close" :size="select.sizeClasses.value.icon" />
    </DiButton>
    <DiIcon
      name="chevronDown"
      :size="select.sizeClasses.value.icon"
      color="muted"
      class="ms-auto shrink-0 transition-transform"
      :class="select.isOpen.value && 'rotate-180'"
    />
  </div>
</template>
