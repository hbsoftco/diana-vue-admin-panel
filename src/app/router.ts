import { createRouter, createWebHistory } from 'vue-router'

import { advancedUiRoutes } from '@/features/advanced-ui/routes'
import { dashboardRoutes } from '@/features/dashboards/routes'
import { uiElementRoutes } from '@/features/ui-elements/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboards/crm',
    },
    dashboardRoutes,
    uiElementRoutes,
    advancedUiRoutes,
  ],
})

export default router
