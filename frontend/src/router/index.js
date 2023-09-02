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
    component: () => import(/* webpackChunkName: "login" */ '../views/Auth/LoginView.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import(/* webpackChunkName: "signup" */ '../views/Auth/RegisterView.vue')
  },
  {
    path: '/realcomics',
    name: 'realcomics',
    component: () => import(/* webpackChunkName: "realcomics" */ '../views/SectionReal/RealComicsView.vue')
  },
  {
    path: '/animatedcomics',
    name: 'animatedcomics',
    component: () => import(/* webpackChunkName: "aminatedcomics" */ '../views/SectionAnimated/AnimatedComicsView.vue')
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
    component: () => import(/* webpackChunkName: "viewcomic" */ '../components/SeeComic.vue')
  },
  {
    path: '/viewserie/:id',
    name: 'viewserie',
    component: () => import(/* webpackChunkName: "viewserie"*/ '../components/SeeSerie.vue')
  },
  {
    path: '/comicvip/:type',
    name: 'comicvip',
    component: () => import(/*webpackChunkName: "comicvip"*/ '../components/ZoneVip.vue')
  },
  {
    path: '/earnmoney/',
    name: 'earnmoney',
    component: () => import(/*webpackChunkName*/ '../components/EarnMoney.vue')
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
