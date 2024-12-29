<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <router-link :to="'/game/' + game.englishName">
      <div class="relative pb-[80%]"> <!-- 128/160 = 0.8 = 80% -->
        <img
          :src="game.thumbnail"
          :alt="game.englishName"
          class="absolute top-0 left-0 w-full h-full object-cover"
        >
      </div>
      <div class="p-3">
        <h3 class="text-base font-semibold mb-2">{{ game.englishName }}</h3>
        <div class="flex flex-wrap gap-1">
          <span v-for="category in game.categories"
                :key="category"
                class="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-600">
            {{ $t(`game.categories.${category}`) }}
          </span>
        </div>
        <button class="mt-3 bg-blue-500 text-white px-3 py-1.5 rounded-full hover:bg-blue-600 transition-colors w-full text-sm">
          {{ $t('home.playNow') }}
        </button>
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { Game } from '@/types'

defineProps<{
  game: Game
}>()
</script>
