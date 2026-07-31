import type { DiInputVariant } from './types'

export const INPUT_VARIANT_CLASSES: Record<DiInputVariant, string> = {
  primary: 'focus-within:ring-primary/25 caret-primary',
  secondary: 'focus-within:ring-secondary/25 caret-secondary',
  accent: 'focus-within:ring-accent/25 caret-accent',
  info: 'focus-within:ring-info/25 caret-info',
  success: 'focus-within:ring-success/25 caret-success',
  warning: 'focus-within:ring-warning/25 caret-warning',
  error: 'focus-within:ring-error/25 caret-error',
}
