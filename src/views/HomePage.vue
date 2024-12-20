<template>
  <div class="home">
    <!-- 顶部横幅 -->
    <div class="banner mb-8">
      <div class="bg-gradient-to-r from-blue-500 to-blue-700 h-80 rounded-lg flex items-center justify-center">
        <h1 class="text-4xl text-white font-bold">Welcome to GameHub</h1>
      </div>
    </div>

    <!-- 游戏列表 -->
    <div class="game-grid">
      <h2 class="text-2xl font-bold mb-6">Popular Games</h2>
      <div class="grid grid-cols-4 gap-6">
        <game-card v-for="game in games" :key="game.id" :game="game" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import GameCard from '@/components/GameCard.vue'
import { ref } from 'vue'

const games = ref([
  {
    id: 1,
    title: 'Zombie Duck Hunter',
    category: 'Action',
    rating: 4.5,
    plays: 10000
  },
  // Add more games here
])
</script>
