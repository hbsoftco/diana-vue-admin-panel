import type { DiRangeSize, RangeSizeClasses } from './types'

export const RANGE_SIZE_CLASSES: Record<DiRangeSize, RangeSizeClasses> = {
  sm: {
    control: 'range-sm',
    label: 'mb-1 text-xs',
    value: 'badge-xs text-[10px]',
    message: 'mt-1 text-[11px]',
    ticks: 'mt-0.5 text-[10px]',
  },
  md: {
    control: 'range-md',
    label: 'mb-1.5 text-sm',
    value: 'badge-sm text-xs',
    message: 'mt-1.5 text-xs',
    ticks: 'mt-1 text-[11px]',
  },
  lg: {
    control: 'range-lg',
    label: 'mb-2 text-base',
    value: 'badge-sm text-sm',
    message: 'mt-2 text-sm',
    ticks: 'mt-1.5 text-xs',
  },
}
