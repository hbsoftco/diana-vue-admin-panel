import AuthBasicLayout from '@/layouts/AuthBasicLayout.vue'
import AuthCoverLayout from '@/layouts/AuthCoverLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

export const authRoutes = {
  path: '/auth',
  component: AuthLayout,
  children: [
    {
      path: '',
      redirect: '/auth/sign-in/basic',
    },
    {
      path: 'sign-in',
      redirect: '/auth/sign-in/basic',
    },
    {
      path: 'sign-up',
      redirect: '/auth/sign-up/basic',
    },
    {
      path: 'reset-password',
      redirect: '/auth/reset-password/basic',
    },
    {
      path: 'two-step',
      redirect: '/auth/two-step/basic',
    },
    {
      path: 'lock-screen',
      redirect: '/auth/lock-screen/basic',
    },
    {
      path: '',
      component: AuthBasicLayout,
      children: [
        {
          path: 'sign-in/basic',
          component: () => import('@/pages/auth/sign-in/basic.vue'),
          meta: {
            pageTitle: 'pages.auth.signIn.basic.title',
          },
        },
        {
          path: 'sign-up/basic',
          component: () => import('@/pages/auth/sign-up/basic.vue'),
          meta: {
            pageTitle: 'pages.auth.signUp.basic.title',
          },
        },
        {
          path: 'reset-password/basic',
          component: () => import('@/pages/auth/reset-password/basic.vue'),
          meta: {
            pageTitle: 'pages.auth.resetPassword.basic.title',
          },
        },
        {
          path: 'two-step/basic',
          component: () => import('@/pages/auth/two-step/basic.vue'),
          meta: {
            pageTitle: 'pages.auth.twoStep.basic.title',
          },
        },
        {
          path: 'lock-screen/basic',
          component: () => import('@/pages/auth/lock-screen/basic.vue'),
          meta: {
            pageTitle: 'pages.auth.lockScreen.basic.title',
          },
        },
      ],
    },
    {
      path: '',
      component: AuthCoverLayout,
      children: [
        {
          path: 'sign-in/cover',
          component: () => import('@/pages/auth/sign-in/cover.vue'),
          meta: {
            pageTitle: 'pages.auth.signIn.cover.title',
            brandVariant: 'sign-in',
          },
        },
        {
          path: 'sign-up/cover',
          component: () => import('@/pages/auth/sign-up/cover.vue'),
          meta: {
            pageTitle: 'pages.auth.signUp.cover.title',
            brandVariant: 'sign-up',
          },
        },
        {
          path: 'reset-password/cover',
          component: () => import('@/pages/auth/reset-password/cover.vue'),
          meta: {
            pageTitle: 'pages.auth.resetPassword.cover.title',
            brandVariant: 'reset-password',
          },
        },
        {
          path: 'two-step/cover',
          component: () => import('@/pages/auth/two-step/cover.vue'),
          meta: {
            pageTitle: 'pages.auth.twoStep.cover.title',
            brandVariant: 'two-step',
          },
        },
        {
          path: 'lock-screen/cover',
          component: () => import('@/pages/auth/lock-screen/cover.vue'),
          meta: {
            pageTitle: 'pages.auth.lockScreen.cover.title',
            brandVariant: 'lock-screen',
          },
        },
      ],
    },
  ],
}
