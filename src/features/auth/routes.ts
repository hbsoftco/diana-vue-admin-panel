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
      path: 'sign-in/basic',
      component: () => import('@/pages/auth/sign-in/basic.vue'),
      meta: {
        pageTitle: 'pages.auth.signIn.basic.title',
      },
    },
    {
      path: 'sign-in/cover',
      component: () => import('@/pages/auth/sign-in/cover.vue'),
      meta: {
        pageTitle: 'pages.auth.signIn.cover.title',
      },
    },
  ],
}
