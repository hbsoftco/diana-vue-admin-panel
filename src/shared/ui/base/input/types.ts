import type { Size, Variant } from '@/shared/types/models'

export type DiInputSize = Extract<Size, 'sm' | 'md' | 'lg'>
export type DiInputVariant = Exclude<Variant, 'neutral'>

export type DiInputType = 'text' | 'password' | 'email' | 'number' | 'search' | 'url' | 'tel'

export type DiInputValue = string | number | null

export type InputSizeClasses = {
  control: string
  content: string
  icon: string
  loading: 'xs' | 'sm'
}
