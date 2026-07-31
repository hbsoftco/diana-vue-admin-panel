import type { DiRangeSize, RangeSizeClasses } from './types'

import { SLIDER_SIZE_CLASSES } from '../slider/sizes'

export const RANGE_SIZE_CLASSES: Record<DiRangeSize, RangeSizeClasses> = {
  sm: {
    control: 'range-sm',
    label: SLIDER_SIZE_CLASSES.sm.label,
    value: SLIDER_SIZE_CLASSES.sm.value,
    message: SLIDER_SIZE_CLASSES.sm.message,
    ticks: SLIDER_SIZE_CLASSES.sm.ticks,
  },
  md: {
    control: 'range-md',
    label: SLIDER_SIZE_CLASSES.md.label,
    value: SLIDER_SIZE_CLASSES.md.value,
    message: SLIDER_SIZE_CLASSES.md.message,
    ticks: SLIDER_SIZE_CLASSES.md.ticks,
  },
  lg: {
    control: 'range-lg',
    label: SLIDER_SIZE_CLASSES.lg.label,
    value: SLIDER_SIZE_CLASSES.lg.value,
    message: SLIDER_SIZE_CLASSES.lg.message,
    ticks: SLIDER_SIZE_CLASSES.lg.ticks,
  },
}
