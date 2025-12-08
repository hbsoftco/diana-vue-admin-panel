import type { FunctionalComponent, SVGAttributes } from 'vue'

export type MenuItem = {
  id: string
  label: string
  icon?: FunctionalComponent<SVGAttributes> | string
  route?: string
  children?: MenuItem[]
}
