import type { Size, Variant } from '@/shared/types/models'

export type DiSliderSize = Extract<Size, 'sm' | 'md' | 'lg'>
export type DiSliderVariant = Exclude<Variant, 'neutral'>
export type DiSliderOrientation = 'horizontal' | 'vertical'

export type DiSliderTick = {
  value: number
  label?: string
}

export type SliderSizeClasses = {
  track: string
  thumb: string
  label: string
  value: string
  message: string
  ticks: string
}

export type DiRangeSliderValue = [number, number]
export type DiRangeSliderSize = DiSliderSize
export type DiRangeSliderVariant = DiSliderVariant
export type DiRangeSliderOrientation = DiSliderOrientation
export type DiRangeSliderTick = DiSliderTick
export type DiRangeSliderHandle = 0 | 1
