import type { DiInputSize, InputSizeClasses } from './types'

/**
 * Size-scaled class map for DiInput.
 *
 * The `icon` entry keeps prefix/suffix icons proportional to the control:
 * roughly half the input height at every size (sm 16px, md 20px, lg 24px),
 * paired with a matching `gap` so icons never look cramped against the text.
 */
export const INPUT_SIZE_CLASSES: Record<DiInputSize, InputSizeClasses> = {
  sm: {
    control: 'input-sm',
    content: 'text-xs',
    icon: '[&_svg]:size-4',
    gap: 'gap-1.5',
    toggle: 'p-1',
    loading: 'xs',
  },
  md: {
    control: 'input-md',
    content: 'text-sm',
    icon: '[&_svg]:size-5',
    gap: 'gap-2',
    toggle: 'p-1',
    loading: 'xs',
  },
  lg: {
    control: 'input-lg',
    content: 'text-base',
    icon: '[&_svg]:size-6',
    gap: 'gap-2.5',
    toggle: 'p-1.5',
    loading: 'sm',
  },
}
