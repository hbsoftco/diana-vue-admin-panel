import { createRouter, createWebHistory } from 'vue-router'

import { advancedUiRoutes } from '@/features/advanced-ui/routes'
import { authRoutes } from '@/features/auth/routes'
import { dashboardRoutes } from '@/features/dashboards/routes'
import { errorRoutes } from '@/features/error/routes'
import { formRoutes } from '@/features/forms/routes'
import { mapsIconsRoutes } from '@/features/maps-icons/routes'
import { tablesRoutes } from '@/features/tables/routes'
import { uiElementRoutes } from '@/features/ui-elements/routes'
import { utilityRoutes } from '@/features/utility/routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboards/crm',
    },
    authRoutes,
    dashboardRoutes,
    errorRoutes,
    formRoutes,
    mapsIconsRoutes,
    uiElementRoutes,
    advancedUiRoutes,
    tablesRoutes,
    utilityRoutes,
  ],
})

export default router
