<script setup lang="ts" generic="T extends SelectValue = SelectValue">
import { onClickOutside } from '@vueuse/core'
import { computed, provide, ref, useId, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import type {
  DiSelectSize,
  DiSelectVariant,
  SelectContext,
  SelectModelValue,
  SelectOption,
  SelectValue,
} from './types'

import DiSelectDropdown from './DiSelectDropdown.vue'
import DiSelectTrigger from './DiSelectTrigger.vue'
import { SELECT_SIZE_CLASSES } from './sizes'
import { DI_SELECT_KEY } from './types'
import { SELECT_VARIANT_CLASSES } from './variants'

type Props = {
  options?: SelectOption<T>[]
  multiple?: boolean
  searchable?: boolean
  clearable?: boolean
  disabled?: boolean
  loading?: boolean
  invalid?: boolean
  required?: boolean
  name?: string
  placeholder?: string
  emptyText?: string
  loadingText?: string
  maxSelections?: number
  size?: DiSelectSize
  ariaLabel?: string
  variant?: DiSelectVariant
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [],
  multiple: false,
  searchable: true,
  clearable: false,
  disabled: false,
  loading: false,
  invalid: false,
  required: false,
  size: 'md',
  variant: 'primary',
})

const emit = defineEmits<{
  change: [value: SelectModelValue<T>]
  open: []
  close: []
  search: [query: string]
  maxReached: [maximum: number]
}>()

defineSlots<{
  option?: (props: { option: SelectOption<T>, selected: boolean, highlighted: boolean }) => unknown
  selected?: (props: { option: SelectOption<T>, clear: () => void }) => unknown
  tag?: (props: { option: SelectOption<T>, remove: () => void }) => unknown
  empty?: () => unknown
  loading?: () => unknown
}>()

const model = defineModel<SelectModelValue<T>>({ default: null })
const { t } = useI18n()

const rootElement = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const query = ref('')
const highlightedIndex = ref(0)
const instanceId = useId().split(':').join('')
const triggerId = `di-select-trigger-${instanceId}`
const dropdownId = `di-select-listbox-${instanceId}`

const options = computed(() => props.options)
const multiple = computed(() => props.multiple)
const searchable = computed(() => props.searchable)
const clearable = computed(() => props.clearable)
const disabled = computed(() => props.disabled)
const loading = computed(() => props.loading)
const invalid = computed(() => props.invalid)
const maxSelections = computed(() => props.maxSelections)
const placeholder = computed(() => props.placeholder ?? t('components.select.placeholder'))
const emptyText = computed(() => props.emptyText ?? t('components.select.empty'))
const loadingText = computed(() => props.loadingText ?? t('components.select.loading'))
const ariaLabel = computed(() => props.ariaLabel ?? t('components.select.placeholder'))
const size = computed(() => props.size)
const sizeClasses = computed(() => SELECT_SIZE_CLASSES[size.value])
const variant = computed<DiSelectVariant>(() => props.variant)
const variantClasses = computed(() => SELECT_VARIANT_CLASSES[variant.value])

const modelValues = computed<T[]>(() => {
  if (props.multiple) {
    return Array.isArray(model.value) ? model.value : []
  }
  return model.value === null || Array.isArray(model.value) ? [] : [model.value]
})
const selectedValueSet = computed(() => new Set(modelValues.value))

const selectedOptions = computed(() =>
  options.value.filter(option => modelValues.value.includes(option.value)),
)

const filteredOptions = computed(() => {
  const normalizedQuery = query.value.trim().toLocaleLowerCase()
  if (!normalizedQuery)
    return options.value

  return options.value.filter(option =>
    option.label.toLocaleLowerCase().includes(normalizedQuery),
  )
})

const activeDescendant = computed(() => {
  const option = filteredOptions.value[highlightedIndex.value]
  return isOpen.value && option ? getOptionId(option) : undefined
})

function getOptionId(option: SelectOption<T>) {
  return `${dropdownId}-option-${String(option.value).replace(/[^\w-]/g, '-')}`
}

function isSelected(value: T) {
  return selectedValueSet.value.has(value)
}

function isOptionDisabled(option: SelectOption<T>) {
  return Boolean(option.disabled)
}

function updateModel(value: SelectModelValue<T>) {
  model.value = value
  emit('change', value)
}

function open() {
  if (props.disabled || isOpen.value)
    return

  isOpen.value = true
  const firstEnabled = filteredOptions.value.findIndex(option => !option.disabled)
  highlightedIndex.value = Math.max(firstEnabled, 0)
  emit('open')
}

function close() {
  if (!isOpen.value)
    return

  isOpen.value = false
  query.value = ''
  emit('close')
}

function toggle() {
  if (isOpen.value)
    close()
  else open()
}

function selectOption(option: SelectOption<T>) {
  if (props.disabled || option.disabled)
    return

  if (props.multiple) {
    if (isSelected(option.value)) {
      removeOption(option)
      return
    }

    if (props.maxSelections && modelValues.value.length >= props.maxSelections) {
      emit('maxReached', props.maxSelections)
      return
    }

    updateModel([...modelValues.value, option.value])
    query.value = ''
  }
  else {
    updateModel(option.value)
    close()
  }
}

function removeOption(option: SelectOption<T>) {
  if (props.disabled)
    return

  if (props.multiple) {
    updateModel(modelValues.value.filter(value => value !== option.value))
  }
  else if (isSelected(option.value)) {
    updateModel(null)
  }
}

function clear() {
  if (!props.disabled) {
    updateModel(props.multiple ? [] : null)
    query.value = ''
  }
}

const context: SelectContext<T> = {
  activeDescendant,
  clear,
  clearable,
  close,
  disabled,
  dropdownId,
  emptyText,
  filteredOptions,
  getOptionId,
  highlightedIndex,
  invalid,
  isOpen,
  isOptionDisabled,
  isSelected,
  loading,
  loadingText,
  maxSelections,
  multiple,
  open,
  placeholder,
  query,
  removeOption,
  searchable,
  selectOption,
  selectedOptions,
  size,
  sizeClasses,
  toggle,
  triggerId,
  variant,
  variantClasses,
}

function castOption(option: SelectOption<SelectValue>) {
  return option as unknown as SelectOption<T>
}

provide(DI_SELECT_KEY, context as unknown as SelectContext<SelectValue>)
onClickOutside(rootElement, close)

watch(query, (value) => {
  highlightedIndex.value = 0
  emit('search', value)
})

watch(
  () => props.disabled,
  (value) => {
    if (value)
      close()
  },
)
</script>

<template>
  <div ref="rootElement" class="relative w-full">
    <DiSelectTrigger :aria-label="ariaLabel">
      <template v-if="$slots.selected" #selected="slotProps">
        <slot name="selected" :option="castOption(slotProps.option)" :clear="slotProps.clear" />
      </template>
      <template v-if="$slots.tag" #tag="slotProps">
        <slot name="tag" :option="castOption(slotProps.option)" :remove="slotProps.remove" />
      </template>
    </DiSelectTrigger>

    <DiSelectDropdown>
      <template v-if="$slots.option" #option="slotProps">
        <slot
          name="option"
          :option="castOption(slotProps.option)"
          :selected="slotProps.selected"
          :highlighted="slotProps.highlighted"
        />
      </template>
      <template v-if="$slots.empty" #empty>
        <slot name="empty" />
      </template>
      <template v-if="$slots.loading" #loading>
        <slot name="loading" />
      </template>
    </DiSelectDropdown>

    <template v-if="name">
      <input
        v-for="value in modelValues"
        :key="value"
        type="hidden"
        :name="multiple ? `${name}[]` : name"
        :value="value"
      >
    </template>
    <input
      v-if="required && !modelValues.length"
      class="pointer-events-none absolute h-px w-px opacity-0"
      tabindex="-1"
      required
      :name="name"
      value=""
      aria-hidden="true"
    >
  </div>
</template>
