/* eslint-disable unicorn/filename-case */

import type { Variant } from '@/shared/types/models'

export type ColorPreview = 'background' | 'border' | 'pair' | 'text'

export type ColorToken = {
  name: string
  variable: string
  utility: string
  previewClass: string
  preview: ColorPreview
  contentToken?: string
  contentClass?: string
}

export type OpacityToken = {
  label: string
  utility: string
  previewClass: string
}

export const semanticVariants: Variant[] = [
  'primary',
  'secondary',
  'accent',
  'neutral',
  'info',
  'success',
  'warning',
  'error',
]

export const semanticColors: ColorToken[] = [
  {
    name: 'primary',
    variable: '--color-primary',
    utility: 'bg-primary',
    previewClass: 'bg-primary',
    preview: 'pair',
    contentToken: '--color-primary-content',
    contentClass: 'text-primary-content',
  },
  {
    name: 'secondary',
    variable: '--color-secondary',
    utility: 'bg-secondary',
    previewClass: 'bg-secondary',
    preview: 'pair',
    contentToken: '--color-secondary-content',
    contentClass: 'text-secondary-content',
  },
  {
    name: 'accent',
    variable: '--color-accent',
    utility: 'bg-accent',
    previewClass: 'bg-accent',
    preview: 'pair',
    contentToken: '--color-accent-content',
    contentClass: 'text-accent-content',
  },
  {
    name: 'neutral',
    variable: '--color-neutral',
    utility: 'bg-neutral',
    previewClass: 'bg-neutral',
    preview: 'pair',
    contentToken: '--color-neutral-content',
    contentClass: 'text-neutral-content',
  },
  {
    name: 'info',
    variable: '--color-info',
    utility: 'bg-info',
    previewClass: 'bg-info',
    preview: 'pair',
    contentToken: '--color-info-content',
    contentClass: 'text-info-content',
  },
  {
    name: 'success',
    variable: '--color-success',
    utility: 'bg-success',
    previewClass: 'bg-success',
    preview: 'pair',
    contentToken: '--color-success-content',
    contentClass: 'text-success-content',
  },
  {
    name: 'warning',
    variable: '--color-warning',
    utility: 'bg-warning',
    previewClass: 'bg-warning',
    preview: 'pair',
    contentToken: '--color-warning-content',
    contentClass: 'text-warning-content',
  },
  {
    name: 'error',
    variable: '--color-error',
    utility: 'bg-error',
    previewClass: 'bg-error',
    preview: 'pair',
    contentToken: '--color-error-content',
    contentClass: 'text-error-content',
  },
]

export const surfaceColors: ColorToken[] = [
  {
    name: 'base-100',
    variable: '--color-base-100',
    utility: 'bg-base-100',
    previewClass: 'bg-base-100 text-base-content',
    preview: 'background',
  },
  {
    name: 'base-200',
    variable: '--color-base-200',
    utility: 'bg-base-200',
    previewClass: 'bg-base-200 text-base-content',
    preview: 'background',
  },
  {
    name: 'base-300',
    variable: '--color-base-300',
    utility: 'bg-base-300',
    previewClass: 'bg-base-300 text-base-content',
    preview: 'background',
  },
  {
    name: 'base-content',
    variable: '--color-base-content',
    utility: 'text-base-content',
    previewClass: 'text-base-content',
    preview: 'text',
  },
  {
    name: 'background',
    variable: '--color-bg-background',
    utility: 'bg-(--color-bg-background)',
    previewClass: 'bg-(--color-bg-background) text-base-content',
    preview: 'background',
  },
  {
    name: 'content-background',
    variable: '--color-bg-content-background',
    utility: 'bg-content-background',
    previewClass: 'bg-content-background text-base-content',
    preview: 'background',
  },
  {
    name: 'header',
    variable: '--color-bg-header',
    utility: 'bg-(--color-bg-header)',
    previewClass: 'bg-(--color-bg-header) text-base-content',
    preview: 'background',
  },
  {
    name: 'menu',
    variable: '--color-menu-bg',
    utility: 'bg-(--color-menu-bg)',
    previewClass: 'bg-(--color-menu-bg) text-menu-prime',
    preview: 'background',
  },
  {
    name: 'hover',
    variable: '--color-bg-hover',
    utility: 'bg-(--color-bg-hover)',
    previewClass: 'bg-(--color-bg-hover) text-menu-prime',
    preview: 'background',
  },
]

export const textColors: ColorToken[] = [
  {
    name: 'base-content',
    variable: '--color-base-content',
    utility: 'text-base-content',
    previewClass: 'text-base-content',
    preview: 'text',
  },
  {
    name: 'primary',
    variable: '--color-primary',
    utility: 'text-primary',
    previewClass: 'text-primary',
    preview: 'text',
  },
  {
    name: 'secondary',
    variable: '--color-secondary',
    utility: 'text-secondary',
    previewClass: 'text-secondary',
    preview: 'text',
  },
  {
    name: 'accent',
    variable: '--color-accent',
    utility: 'text-accent',
    previewClass: 'text-accent',
    preview: 'text',
  },
  {
    name: 'neutral',
    variable: '--color-neutral',
    utility: 'text-neutral',
    previewClass: 'text-neutral',
    preview: 'text',
  },
  {
    name: 'info',
    variable: '--color-info',
    utility: 'text-info',
    previewClass: 'text-info',
    preview: 'text',
  },
  {
    name: 'success',
    variable: '--color-success',
    utility: 'text-success',
    previewClass: 'text-success',
    preview: 'text',
  },
  {
    name: 'warning',
    variable: '--color-warning',
    utility: 'text-warning',
    previewClass: 'text-warning',
    preview: 'text',
  },
  {
    name: 'error',
    variable: '--color-error',
    utility: 'text-error',
    previewClass: 'text-error',
    preview: 'text',
  },
  {
    name: 'menu-prime',
    variable: '--color-menu-prime',
    utility: 'text-menu-prime',
    previewClass: 'text-menu-prime bg-(--color-menu-bg)',
    preview: 'text',
  },
  {
    name: 'muted (derived)',
    variable: '--color-base-content',
    utility: 'text-base-content/60',
    previewClass: 'text-base-content/60',
    preview: 'text',
  },
]

export const borderColors: ColorToken[] = [
  {
    name: 'base-300',
    variable: '--color-base-300',
    utility: 'border-base-300',
    previewClass: 'border-base-300',
    preview: 'border',
  },
  {
    name: 'primary',
    variable: '--color-primary',
    utility: 'border-primary',
    previewClass: 'border-primary',
    preview: 'border',
  },
  {
    name: 'secondary',
    variable: '--color-secondary',
    utility: 'border-secondary',
    previewClass: 'border-secondary',
    preview: 'border',
  },
  {
    name: 'accent',
    variable: '--color-accent',
    utility: 'border-accent',
    previewClass: 'border-accent',
    preview: 'border',
  },
  {
    name: 'neutral',
    variable: '--color-neutral',
    utility: 'border-neutral',
    previewClass: 'border-neutral',
    preview: 'border',
  },
  {
    name: 'info',
    variable: '--color-info',
    utility: 'border-info',
    previewClass: 'border-info',
    preview: 'border',
  },
  {
    name: 'success',
    variable: '--color-success',
    utility: 'border-success',
    previewClass: 'border-success',
    preview: 'border',
  },
  {
    name: 'warning',
    variable: '--color-warning',
    utility: 'border-warning',
    previewClass: 'border-warning',
    preview: 'border',
  },
  {
    name: 'error',
    variable: '--color-error',
    utility: 'border-error',
    previewClass: 'border-error',
    preview: 'border',
  },
  {
    name: 'header-border',
    variable: '--color-border-header',
    utility: 'border-(--color-border-header)',
    previewClass: 'border-(--color-border-header)',
    preview: 'border',
  },
  {
    name: 'content-border',
    variable: '--color-border-content',
    utility: 'border-content',
    previewClass: 'border-content',
    preview: 'border',
  },
  {
    name: 'menu-border',
    variable: '--color-menu-border',
    utility: 'border-(--color-menu-border)',
    previewClass: 'border-(--color-menu-border)',
    preview: 'border',
  },
]

export const contentColors = semanticColors

export const opacityColors: OpacityToken[] = [
  { label: '100%', utility: 'bg-primary', previewClass: 'bg-primary' },
  { label: '75%', utility: 'bg-primary/75', previewClass: 'bg-primary/75' },
  { label: '50%', utility: 'bg-primary/50', previewClass: 'bg-primary/50' },
  { label: '25%', utility: 'bg-primary/25', previewClass: 'bg-primary/25' },
  { label: '10%', utility: 'bg-primary/10', previewClass: 'bg-primary/10' },
]
