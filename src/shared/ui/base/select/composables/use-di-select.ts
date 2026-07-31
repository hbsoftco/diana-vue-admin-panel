import { inject } from 'vue'

import type { SelectContext, SelectValue } from '../types'

import { DI_SELECT_KEY } from '../types'

export function useDiSelect<T extends SelectValue = SelectValue>() {
  const context = inject(DI_SELECT_KEY)

  if (!context) {
    throw new Error('DiSelect compound components must be used inside DiSelect')
  }

  return context as unknown as SelectContext<T>
}
