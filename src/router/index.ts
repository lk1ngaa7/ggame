import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import GameDetailPage from '@/views/GameDetailPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/games',
      name: 'games',
      component: () => import('../views/GamesPage.vue')
    },
    {
      path: '/game/:name',
      name: 'game-detail',
      component: GameDetailPage
    }
  ]
})

export default router
