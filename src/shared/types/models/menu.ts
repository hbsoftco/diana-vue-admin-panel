import type { IconName } from '@/shared/icons/registry'

export type MenuLabel = {
  type: 'label'
  id: string
  label: string
}

export type MenuNavigationItem = {
  type?: 'item'
  id: string
  label: string
  icon?: IconName
  route?: string
  disabled?: boolean
  children?: MenuItem[]
}

export type MenuItem = MenuLabel | MenuNavigationItem

export function isMenuLabel(item: MenuItem): item is MenuLabel {
  return item.type === 'label'
}
