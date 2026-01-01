import type { IconName } from '@/shared/icons/registry'

export type MenuItem = {
  id: string
  label: string
  icon?: IconName
  route?: string
  children?: MenuItem[]
}
