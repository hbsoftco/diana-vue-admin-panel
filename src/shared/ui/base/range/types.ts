import type { Size, Variant } from '@/shared/types/models'

export type DiRangeSize = Extract<Size, 'sm' | 'md' | 'lg'>
export type DiRangeVariant = Exclude<Variant, 'neutral'>
export type DiRangeThumbShape = 'rounded' | 'square'
export type DiRangeOrientation = 'horizontal' | 'vertical'

export type DiRangeTick = {
  value: number
  label?: string
}

export type RangeSizeClasses = {
  control: string
  label: string
  value: string
  message: string
  ticks: string
}
