import type { DiInputSize, InputSizeClasses } from './types'

export const INPUT_SIZE_CLASSES: Record<DiInputSize, InputSizeClasses> = {
  sm: {
    control: 'input-sm',
    content: 'text-xs',
    icon: '[&_svg]:size-3.5',
    loading: 'xs',
  },
  md: {
    control: 'input-md',
    content: 'text-sm',
    icon: '[&_svg]:size-4',
    loading: 'xs',
  },
  lg: {
    control: 'input-lg',
    content: 'text-base',
    icon: '[&_svg]:size-5',
    loading: 'sm',
  },
}
