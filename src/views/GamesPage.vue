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
          {{ t(`game.categories.${category}`) }}
        </button>
        <button 
          class="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
          :class="{ 'bg-blue-500 text-white': selectedCategory === null }"
          @click="selectedCategory = null"
        >
          {{ t('game.categories.all') }}
        </button>
      </div>
    </div>

    <!-- 游戏网格 -->
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="game in filteredGames" :key="game.englishName">
        <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <router-link :to="'/game/' + game.englishName">
            <div class="relative pb-[50.85%]">
              <img 
                :src="game.thumbnail" 
                :alt="game.englishName" 
                class="absolute top-0 left-0 w-full h-full object-cover"
              >
            </div>
            <div class="p-4">
              <h3 class="text-lg font-semibold mb-2">{{ game.englishName }}</h3>
              <div class="flex flex-wrap gap-2">
                <span v-for="category in game.categories || []" 
                      :key="category"
                      class="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                  {{ t(`game.categories.${category}`) }}
                </span>
              </div>
              <button class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors w-full">
                {{ t('home.playNow') }}
              </button>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGameStore } from '@/stores/gameStore'

const { t } = useI18n()
const { games } = useGameStore()

const categories = ['Action', 'Adventure', 'Puzzle', 'Strategy'] as const
type CategoryType = typeof categories[number] | null

const selectedCategory = ref<CategoryType>(null)

const filteredGames = computed(() => {
  if (!selectedCategory.value) return games.value
  return games.value.filter(game => (game.categories || []).includes(selectedCategory.value!))
})
</script>
