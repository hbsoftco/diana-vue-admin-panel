import type {
  DiSliderOrientation,
  DiSliderSize,
  DiSliderTick,
  DiSliderVariant,
} from '../slider/types'

export type DiRangeSize = DiSliderSize
export type DiRangeVariant = DiSliderVariant
export type DiRangeThumbShape = 'rounded' | 'square'
export type DiRangeOrientation = DiSliderOrientation
export type DiRangeTick = DiSliderTick

export type RangeSizeClasses = {
  control: string
  label: string
  value: string
  message: string
  ticks: string
}
