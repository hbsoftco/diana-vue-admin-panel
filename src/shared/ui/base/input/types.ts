import type { Size, Variant } from '@/shared/types/models'

export type DiInputSize = Extract<Size, 'sm' | 'md' | 'lg'>
export type DiInputVariant = Exclude<Variant, 'neutral'>

export type DiInputType = 'text' | 'password' | 'email' | 'number' | 'search' | 'url' | 'tel'

export type DiInputValue = string | number | null

/**
 * Accessible labels for the built-in password visibility toggle.
 *
 * The base component stays i18n-agnostic, so consumers pass already
 * translated strings. English values are only a schema fallback.
 */
export type DiInputPasswordToggleLabels = {
  show: string
  hide: string
}

export type InputSizeClasses = {
  /** daisyUI control size class. */
  control: string
  /** Native input font-size. */
  content: string
  /**
   * Prefix/suffix icon scale, tied to the control size so the icon stays
   * visually proportional to the input height at every size.
   */
  icon: string
  /** Horizontal gap between the input text and its prefix/suffix affixes. */
  gap: string
  /** Padding for the interactive password-toggle hit area. */
  toggle: string
  loading: 'xs' | 'sm'
}
