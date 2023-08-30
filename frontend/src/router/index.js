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
    component: () => import(/* webpackChunkName: "realcomics" */ '../views/RealComics/RealComicsView.vue')
  },
  {
    path: '/animatedcomics',
    name: 'animatedcomics',
    component: () => import(/* webpackChunkName: "aminatedcomics" */ '../views/AnimatedComics/AnimatedComicsView.vue')
  },
  {
    path: '/allthemostviewd',
    name:'allthemostviewed',
    component: () => import( /* webpackChunkName: "allthemostviewd"*/ '../views/AllMost/AllMostView.vue')
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
    component: () => import(/* webpackChunkName: "viewcomic" */ '../views/ViewComic/ComicView.vue')
  },
  {
    path: '/viewserie/:id',
    name: 'viewserie',
    component: () => import(/* webpackChunkName: "viewserie"*/ '../views/ViewSeries/SerieView.vue')
  },
  {
    path: '/comicvip/:type',
    name: 'comicvip',
    component: () => import(/*webpackChunkName: "comicvip"*/ '../views/ZoneVIP/ZoneVipView.vue')
  },
  {
    path: '/earnmoney/',
    name: 'earnmoney',
    component: () => import(/*webpackChunkName*/ '../views/EarnMoney/EarnMoneyView.vue')
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
