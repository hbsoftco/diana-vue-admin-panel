import type { DiSelectVariant, SelectVariantClasses } from './types'

export const SELECT_VARIANT_CLASSES: Record<DiSelectVariant, SelectVariantClasses> = {
  primary: {
    selected: 'bg-primary/10 text-primary',
    tag: 'bg-primary/12 text-primary',
    indicator: 'text-primary',
  },
  secondary: {
    selected: 'bg-secondary/10 text-secondary',
    tag: 'bg-secondary/12 text-secondary',
    indicator: 'text-secondary',
  },
  accent: {
    selected: 'bg-accent/10 text-accent',
    tag: 'bg-accent/12 text-accent',
    indicator: 'text-accent',
  },
  info: {
    selected: 'bg-info/10 text-info',
    tag: 'bg-info/12 text-info',
    indicator: 'text-info',
  },
  success: {
    selected: 'bg-success/10 text-success',
    tag: 'bg-success/12 text-success',
    indicator: 'text-success',
  },
  warning: {
    selected: 'bg-warning/10 text-warning',
    tag: 'bg-warning/12 text-warning',
    indicator: 'text-warning',
  },
  error: {
    selected: 'bg-error/10 text-error',
    tag: 'bg-error/12 text-error',
    indicator: 'text-error',
  },
}
