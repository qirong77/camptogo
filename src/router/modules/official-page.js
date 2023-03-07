export const officialRoutes = [
  {
    path: '/',
    redirect: '/login',
    component: () => import('../../../src/view/official-page/index/index.vue'),
  },
  {
    path: '/login',
    component: () => import('../../../src/view/official-page/login/login.vue')
  },
  // 入驻
  {
    path: '/settle-in',
    component: () => import('../../view/official-page/settle-in/settle-in.vue')
  }
]
