import { createRouter, createWebHashHistory } from 'vue-router'
import { officialRoutes } from './modules/official-page'
import { userRouter } from './modules/user'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [...officialRoutes, ...userRouter]
})
