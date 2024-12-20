// src/views/GameDetailPage.vue
<template>
  <div class="game-detail">
    <!-- 游戏标题和信息 -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">{{ game.title }}</h1>
      <div class="flex items-center space-x-4 text-gray-600">
        <span>{{ game.category }}</span>
        <span>★ {{ game.rating }}</span>
        <span>{{ game.plays.toLocaleString() }} plays</span>
      </div>
    </div>

    <!-- 游戏窗口 -->
    <div class="game-window bg-gray-900 rounded-lg overflow-hidden">
      <div class="aspect-w-16 aspect-h-9 bg-black">
        <!-- 游戏内容将在这里加载 -->
        <div class="flex items-center justify-center text-white text-xl">
          Game Content
        </div>
      </div>
    </div>

    <!-- 游戏控制栏 -->
    <div class="mt-4 p-4 bg-white rounded-lg shadow-md">
      <div class="flex items-center justify-between">
        <div class="flex space-x-4">
          <button class="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
            <span class="material-icons">fullscreen</span>
          </button>
          <button class="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
            <span class="material-icons">volume_up</span>
          </button>
        </div>
        <button class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
          Restart Game
        </button>
      </div>
    </div>

    <!-- 游戏描述 -->
    <div class="mt-8">
      <h2 class="text-2xl font-bold mb-4">About this game</h2>
      <p class="text-gray-600">
        {{ game.description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const gameId = parseInt(route.params.id as string)

// 模拟游戏数据
const game = ref({
  id: gameId,
  title: 'Zombie Duck Hunter',
  category: 'Action',
  rating: 4.5,
  plays: 10000,
  description: 'An exciting action game where you hunt zombie ducks in a post-apocalyptic world. Test your shooting skills and reflexes as you face increasingly challenging waves of undead waterfowl.'
})

onMounted(() => {
  // 这里可以根据 gameId 加载具体的游戏数据
  console.log(`Loading game with ID: ${gameId}`)
})
</script>
