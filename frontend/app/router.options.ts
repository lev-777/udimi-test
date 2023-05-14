import type { RouterConfig, RouterOptions } from '@nuxt/schema'

export default <RouterConfig>{
  routes: (_routes: RouterOptions) => [
    {
      name: 'login',
      path: '/',
      component: () => import('~/pages/login.vue'),
      meta: {
        guest: true,
        layout: 'default',
      },
    },
    {
      name: 'home',
      path: '/home',
      component: () => import('~/pages/home.vue'),
      meta: {
        auth: true,
        layout: 'userarea',
      },
    },
    {
      name: 'projects',
      path: '/projects',
      component: () => import('~/pages/home.vue'),
      meta: {
        auth: true,
        layout: 'userarea',
      },
    },
  ],
}
