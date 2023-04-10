import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from "@/store/auth";

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
  },
  {
    path: '/allthemostviewd',
    name:'allthemostviewed',
    component: () => import( /* webpackChunkName: "allthemostviewd"*/ '../views/AllMostView/AllMostView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile/ProfileView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/viewcomic/:id',
    name: 'viewcomic',
    component: () => import(/* webpackChunkName: "viewcomic" */ '../views/viewComic/viewComic.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) return '/login';
})

export default router
