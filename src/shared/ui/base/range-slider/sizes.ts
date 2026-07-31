import type { DiSliderSize, SliderSizeClasses } from './types'

export const SLIDER_SIZE_CLASSES: Record<DiSliderSize, SliderSizeClasses> = {
  sm: {
    track: 'h-1.5',
    thumb: 'size-4',
    label: 'mb-1 text-xs',
    value: 'badge-xs text-[10px]',
    message: 'mt-1 text-[11px]',
    ticks: 'mt-0.5 text-[10px]',
  },
  md: {
    track: 'h-2',
    thumb: 'size-5',
    label: 'mb-1.5 text-sm',
    value: 'badge-sm text-xs',
    message: 'mt-1.5 text-xs',
    ticks: 'mt-1 text-[11px]',
  },
  lg: {
    track: 'h-2.5',
    thumb: 'size-6',
    label: 'mb-2 text-base',
    value: 'badge-sm text-sm',
    message: 'mt-2 text-sm',
    ticks: 'mt-1.5 text-xs',
  },
}
