import type { ComputedRef, InjectionKey, Ref } from 'vue'

import type { Size, Variant } from '@/shared/types/models'

export type DiSelectVariant = Exclude<Variant, 'neutral'>
export type DiSelectSize = Extract<Size, 'sm' | 'md' | 'lg'>

export type SelectSizeClasses = {
  trigger: string
  option: string
  tag: string
  action: string
  icon: 'xs' | 'sm'
  actionSize: 'xs' | 'sm'
}

export type SelectVariantClasses = {
  selected: string
  tag: string
  indicator: string
}

export type SelectValue = string | number

export type SelectOption<T extends SelectValue = SelectValue> = {
  label: string
  value: T
  disabled?: boolean
  meta?: unknown
}

export type SelectModelValue<T extends SelectValue = SelectValue> = T | T[] | null

export type SelectContext<T extends SelectValue = SelectValue> = {
  activeDescendant: ComputedRef<string | undefined>
  clear: () => void
  clearable: ComputedRef<boolean>
  close: () => void
  disabled: ComputedRef<boolean>
  dropdownId: string
  emptyText: ComputedRef<string>
  filteredOptions: ComputedRef<SelectOption<T>[]>
  getOptionId: (option: SelectOption<T>) => string
  highlightedIndex: Ref<number>
  invalid: ComputedRef<boolean>
  isOpen: Ref<boolean>
  isOptionDisabled: (option: SelectOption<T>) => boolean
  isSelected: (value: T) => boolean
  loading: ComputedRef<boolean>
  loadingText: ComputedRef<string>
  maxSelections: ComputedRef<number | undefined>
  multiple: ComputedRef<boolean>
  open: () => void
  placeholder: ComputedRef<string>
  query: Ref<string>
  removeOption: (option: SelectOption<T>) => void
  searchable: ComputedRef<boolean>
  selectOption: (option: SelectOption<T>) => void
  selectedOptions: ComputedRef<SelectOption<T>[]>
  size: ComputedRef<DiSelectSize>
  sizeClasses: ComputedRef<SelectSizeClasses>
  toggle: () => void
  triggerId: string
  variant: ComputedRef<DiSelectVariant>
  variantClasses: ComputedRef<SelectVariantClasses>
}

export const DI_SELECT_KEY: InjectionKey<SelectContext<SelectValue>> = Symbol('DiSelect')
