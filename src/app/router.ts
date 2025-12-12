import { createRouter, createWebHistory } from 'vue-router'

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
  ],
})

export default router
