import type { DiSelectSize, SelectSizeClasses } from './types'

export const SELECT_SIZE_CLASSES: Record<DiSelectSize, SelectSizeClasses> = {
  sm: {
    trigger: 'min-h-8 gap-1 px-2.5 text-xs',
    option: 'min-h-8 gap-1.5 px-2.5 py-1.5 text-xs',
    tag: 'gap-0.5 py-0 ps-1.5 pe-0.5 text-[11px]',
    action: 'min-h-5 h-5 w-5 p-0',
    icon: 'xs',
    actionSize: 'xs',
  },
  md: {
    trigger: 'min-h-10 gap-1.5 px-3 text-sm',
    option: 'min-h-9 gap-2 px-3 py-2 text-sm',
    tag: 'gap-1 py-0.5 ps-2 pe-0.5 text-xs',
    action: 'min-h-6 h-6 w-6 p-0',
    icon: 'xs',
    actionSize: 'xs',
  },
  lg: {
    trigger: 'min-h-12 gap-2 px-3.5 text-base',
    option: 'min-h-11 gap-2.5 px-3.5 py-2.5 text-base',
    tag: 'gap-1.5 py-1 ps-2.5 pe-1 text-sm',
    action: 'min-h-7 h-7 w-7 p-0',
    icon: 'sm',
    actionSize: 'sm',
  },
}
