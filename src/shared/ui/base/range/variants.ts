import type { DiRangeVariant } from './types'

export const RANGE_VARIANT_CLASSES: Record<DiRangeVariant, string> = {
  primary: 'range-primary [--range-thumb:var(--color-primary)]',
  secondary: 'range-secondary [--range-thumb:var(--color-secondary)]',
  accent: 'range-accent [--range-thumb:var(--color-accent)]',
  info: 'range-info [--range-thumb:var(--color-info)]',
  success: 'range-success [--range-thumb:var(--color-success)]',
  warning: 'range-warning [--range-thumb:var(--color-warning)]',
  error: 'range-error [--range-thumb:var(--color-error)]',
}
