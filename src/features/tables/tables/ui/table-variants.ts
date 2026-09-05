import type { Variant } from '@/shared/types/models'

/**
 * Table color-variant tokens.
 *
 * daisyUI's `<table>` has no built-in colored-row/head modifiers (unlike its
 * `alert`/`badge`/`btn` components), so this extends the project's existing
 * semantic `Variant` system rather than inventing a parallel one: a soft,
 * translucent tint reuses the same `/10`–`/25` opacity convention DiInput's
 * focus rings and DiAlert's `soft` variant already use. A translucent overlay
 * stays legible against `text-base-content` in both themes without needing a
 * `-content` counterpart, which keeps the table body readable at normal
 * table density (Bootstrap's own `.table-{variant}` rows are pastel-tinted,
 * not solid saturated blocks — solid color is reserved for buttons/badges).
 */
export const TABLE_VARIANT_ROW_CLASSES: Record<Variant, string> = {
  neutral: 'bg-neutral/10',
  primary: 'bg-primary/10',
  secondary: 'bg-secondary/10',
  accent: 'bg-accent/10',
  info: 'bg-info/10',
  success: 'bg-success/10',
  warning: 'bg-warning/10',
  error: 'bg-error/10',
}

/**
 * Bootstrap's `table-dark` has no semantic-color equivalent — it's a solid
 * inverted surface, not a hue. `neutral` is Diana's existing token for that
 * (the same solid `bg-{token} text-{token}-content` pairing AuthBrandPanel
 * already uses for a solid colored panel).
 */
export const TABLE_DARK_ROW_CLASS = 'bg-neutral text-neutral-content'

/** Bootstrap's `table-light` is a plain neutral surface, not a semantic color. */
export const TABLE_LIGHT_ROW_CLASS = 'bg-base-200'

/**
 * Bootstrap's `table-active`: a neutral highlight for a selected row or
 * cell, not a semantic color — reuses the same `base-300` treatment already
 * used for hover/active menu rows elsewhere in the shell.
 */
export const TABLE_ACTIVE_CLASS = 'bg-base-300'

/**
 * Bordered variant: daisyUI tables ship borderless, so this adds a grid of
 * hairline borders using the same `[&_selector]` static arbitrary-child
 * pattern DiInput's icon sizing already relies on.
 */
export const TABLE_BORDERED_CLASS
  = 'border border-base-300 [&_th]:border [&_th]:border-base-300 [&_td]:border [&_td]:border-base-300'

/** Removes daisyUI's default hairline row dividers for a fully borderless table. */
export const TABLE_BORDERLESS_CLASS = '[&_tr]:border-none'

/** Tint applied to every other column for the "striped columns" example. */
export const TABLE_EVEN_COLUMN_CLASS = 'bg-base-200/60'
