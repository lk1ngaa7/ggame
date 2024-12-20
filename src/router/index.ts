import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomePage.vue')
    },
    {
      path: '/games',
      name: 'games',
      component: () => import('../views/GamesPage.vue')
    },
    {
      path: '/game/:id',
      name: 'game-detail',
      component: () => import('../views/GameDetailPage.vue')
    }
  ]
})

export default router
