<template>
  <div class="glass-card rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
    <router-link :to="'/game/' + game.englishName">
      <div class="relative pb-[50.85%]"> 
        <img 
          :src="game.thumbnail" 
          :alt="game.englishName" 
          class="absolute top-0 left-0 w-full h-full object-cover"
        >
      </div>
      <div class="p-4">
        <h3 class="text-lg font-semibold mb-2 text-gray-800">{{ formatGameName(game.englishName || '') }}</h3>
        <div class="flex flex-wrap gap-2">
          <span v-for="category in game.tags?.slice(0, 3)" 
                :key="category" 
                class="px-2 py-1 bg-white bg-opacity-50 rounded-full text-xs text-gray-700">
            {{ $t(`game.categories.${category}`) }}
          </span>
        </div>
        <button class="mt-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full hover:from-pink-600 hover:to-purple-600 transition-colors w-full transform hover:scale-105 duration-200">
          {{ $t('home.playNow') }}
        </button>
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
interface Game {
  englishName: string
  url: string
  thumbnail: string
  tags: string[]
}

const props = defineProps<{
  game: Game
}>()

const formatGameName = (name: string) => {
  if (!name) return ''
  return name.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}
</script>
