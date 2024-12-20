// src/views/GamesPage.vue
<template>
  <div class="games-page">
    <!-- 游戏分类筛选 -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-4">All Games</h1>
      <div class="flex space-x-4">
        <button 
          v-for="category in categories" 
          :key="category"
          class="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
          :class="{ 'bg-blue-500 text-white': selectedCategory === category }"
          @click="selectedCategory = category"
        >
          {{ category }}
        </button>
      </div>
    </div>

    <!-- 游戏网格 -->
    <div class="grid grid-cols-4 gap-6">
      <game-card 
        v-for="game in filteredGames" 
        :key="game.id" 
        :game="game" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import GameCard from '@/components/GameCard.vue'

const categories = ['All', 'Action', 'Puzzle', 'Adventure', 'Sports']
const selectedCategory = ref('All')

const games = ref([
  {
    id: 1,
    title: 'Zombie Duck Hunter',
    category: 'Action',
    rating: 4.5,
    plays: 10000
  },
  {
    id: 2,
    title: 'Tank Battle',
    category: 'Action',
    rating: 4.3,
    plays: 8500
  },
  {
    id: 3,
    title: 'Fruit Snake',
    category: 'Puzzle',
    rating: 4.7,
    plays: 12000
  },
  // 可以添加更多游戏
])

const filteredGames = computed(() => {
  if (selectedCategory.value === 'All') {
    return games.value
  }
  return games.value.filter(game => game.category === selectedCategory.value)
})
</script>
