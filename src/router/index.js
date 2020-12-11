import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'History',
    meta: { layout: 'main', auth: true },
    component: () => import('@/views/History.vue'),
  },
  {
    path: '/history',
    name: 'history',
    meta: { layout: 'main', auth: true },
    component: () => import('@/views/HistoryRecodings.vue'),
  },
  {
    path: '/record',
    name: 'newRecord',
    meta: { layout: 'main', auth: true },
    component: () => import('@/views/Record.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    meta: { layout: 'main', auth: true },
    component: () => import('@/views/Profile.vue'),
  },
  {
    path: '/categories',
    name: 'categories',
    meta: { layout: 'main', auth: true },
    component: () => import('@/views/Categories.vue'),
  },
  {
    path: '/planning',
    name: 'planning',
    meta: { layout: 'main', auth: false },
    component: () => import('@/views/Planning.vue'),
  },
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'empty', auth: false },
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    meta: { layout: 'empty', auth: false },
    component: () => import('@/views/Register.vue'),
  },
  {
    path: '/details/:id',
    name: 'details',
    meta: { layout: 'main', auth: true },
    component: () => import('@/views/Details.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some((c) => c.meta.auth)

  if (requireAuth && !currentUser) {
    next('/login?message=login')
    alert('Для начала войдите в систему')
  } else {
    next()
  }
})

export default router
