import { createRouter, createWebHistory } from 'vue-router'

import { dashboardRoutes } from '@/features/dashboards/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    dashboardRoutes,
  ],
})

export default router
