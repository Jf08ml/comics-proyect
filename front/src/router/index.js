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
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "signup" */ '../views/RegisterView.vue')
  },
  {
    path: '/realcomics',
    name: 'realcomics',
    component: () => import(/* webpackChunkName: "realcomics" */ '../views/RealComicsView.vue')
  },
  {
    path: '/animatedcomics',
    name: 'animatedcomics',
    component: () => import(/* webpackChunkName: "aminatedcomics" */ '../views/AnimatedComicsView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
