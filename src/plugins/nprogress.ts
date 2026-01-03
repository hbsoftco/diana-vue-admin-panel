import type { Router } from 'vue-router'

import { useNProgress } from '@vueuse/integrations/useNProgress'
import 'nprogress/nprogress.css'

export function setupNProgress(router: Router) {
  const { start, done } = useNProgress(null, {
    showSpinner: false,
    trickleSpeed: 200,
  })

  router.beforeEach((to, from, next) => {
    start()
    next()
  })

  router.afterEach(() => {
    done()
  })
}
