import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { requiresGuest: true },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: { requiresGuest: true },
    },
    {
      path: '/maps',
      name: 'maps',
      component: () => import('../views/MapsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/maps/:id',
      name: 'map-editor',
      component: () => import('../views/MapEditorView.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

// Navigation guards
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // Initialize auth if not already done
  if (!authStore.user && !authStore.loading) {
    try {
      await authStore.initializeAuth()
    } catch (error) {
      console.error('Auth initialization error:', error)
    }
  }

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest)

  if (requiresAuth && !authStore.isAuthenticated) {
    // Redirect to login if trying to access protected route
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else if (requiresGuest && authStore.isAuthenticated) {
    // Redirect to maps if already logged in and trying to access login/register
    next({ name: 'maps' })
  } else {
    next()
  }
})

export default router
