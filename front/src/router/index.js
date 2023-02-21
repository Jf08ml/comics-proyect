import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
  },
  {
    path: '/realcomics',
    name: 'realcomics',
    component: () => import(/* webpackChunkName: "login" */ '../views/RealComicsView.vue')
  },
  {
    path: '/aminatedcomics',
    name: 'aminatedcomics',
    component: () => import(/* webpackChunkName: "login" */ '../views/AnimatedComicsView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
