import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/maps',
      name: 'maps',
      component: () => import('../views/MapsView.vue'),
    },
    {
      path: '/maps/:id',
      name: 'map-editor',
      component: () => import('../views/MapEditorView.vue'),
    },
  ],
})

export default router
