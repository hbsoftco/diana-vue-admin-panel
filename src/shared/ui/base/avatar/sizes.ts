import type { AvatarSize } from './types'

export type AvatarSizeClasses = {
  container: string
  text: string
  icon: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  status: string
  badge: string
  badgeText: string
  badgeOffset: string
  badgeIconSize: string
  groupOverlap: string
}

export const AVATAR_SIZE_CLASSES: Record<AvatarSize, AvatarSizeClasses> = {
  'xs': {
    container: 'size-6',
    text: 'text-[0.625rem]',
    icon: 'xs',
    status: 'size-2 border-2',
    badge: 'size-3.5 border-2',
    badgeText: 'text-[0.4375rem]',
    badgeOffset: '-top-1 -end-1',
    badgeIconSize: '0.4375rem',
    groupOverlap: '-ms-1.5',
  },
  'sm': {
    container: 'size-8',
    text: 'text-xs',
    icon: 'sm',
    status: 'size-2.5 border-2',
    badge: 'size-4 border-2',
    badgeText: 'text-[0.5rem]',
    badgeOffset: '-top-1 -end-1',
    badgeIconSize: '0.5rem',
    groupOverlap: '-ms-2',
  },
  'md': {
    container: 'size-10',
    text: 'text-sm',
    icon: 'md',
    status: 'size-3 border-2',
    badge: 'size-5 border-2',
    badgeText: 'text-[0.625rem]',
    badgeOffset: '-top-1 -end-1',
    badgeIconSize: '0.625rem',
    groupOverlap: '-ms-2.5',
  },
  'lg': {
    container: 'size-12',
    text: 'text-base',
    icon: 'lg',
    status: 'size-3.5 border-2',
    badge: 'size-[1.375rem] border-2',
    badgeText: 'text-[0.625rem]',
    badgeOffset: '-top-1 -end-0.5',
    badgeIconSize: '0.75rem',
    groupOverlap: '-ms-3',
  },
  'xl': {
    container: 'size-16',
    text: 'text-xl',
    icon: 'xl',
    status: 'size-4 border-2',
    badge: 'size-6 border-2',
    badgeText: 'text-xs',
    badgeOffset: '-top-1 -end-0.5',
    badgeIconSize: '0.875rem',
    groupOverlap: '-ms-4',
  },
  '2xl': {
    container: 'size-20',
    text: 'text-2xl',
    icon: '2xl',
    status: 'size-5 border-2',
    badge: 'size-7 border-2',
    badgeText: 'text-xs',
    badgeOffset: '-top-1 end-0',
    badgeIconSize: '1rem',
    groupOverlap: '-ms-5',
  },
}
