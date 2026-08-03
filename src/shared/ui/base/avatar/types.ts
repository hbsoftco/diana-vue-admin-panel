import type { IconName } from '@/shared/icons/registry'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type AvatarShape = 'circle' | 'square' | 'rounded'
export type AvatarVariant
  = | 'primary'
    | 'secondary'
    | 'accent'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away'
export type AvatarBadgePosition = 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'

export type DiAvatarGroupItem = {
  id?: string | number
  src?: string
  alt?: string
  name?: string
  initials?: string
  icon?: IconName
  shape?: AvatarShape
  variant?: AvatarVariant
  fallback?: boolean
  status?: AvatarStatus
  badgePosition?: AvatarBadgePosition
  badgeVariant?: AvatarVariant
  decorative?: boolean
}
