import type { Size, Variant } from '@/shared/types/models'

export type DiRadioValue = string | number | boolean
export type DiRadioSize = Extract<Size, 'xs' | 'sm' | 'md' | 'lg'>
export type DiRadioVariant = Variant
export type DiRadioLabelPosition = 'start' | 'end'
export type DiRadioOrientation = 'vertical' | 'horizontal'

export type DiRadioOption<T extends DiRadioValue = DiRadioValue> = {
  label: string
  value: T
  disabled?: boolean
  helperText?: string
}
