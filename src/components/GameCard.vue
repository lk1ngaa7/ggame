<template>
  <div class="game-card bg-white rounded-lg shadow-md overflow-hidden">
    <div class="aspect-w-16 aspect-h-9 bg-gray-200">
      <!-- Game thumbnail placeholder -->
    </div>
    <div class="p-4">
      <h3 class="font-bold text-lg">{{ game.title }}</h3>
      <p class="text-sm text-gray-600">{{ game.category }}</p>
      <div class="mt-2 flex items-center justify-between">
        <span class="text-sm">★ {{ game.rating }}</span>
        <span class="text-sm text-gray-500">{{ game.plays.toLocaleString() }} plays</span>
      </div>
      <button 
        @click="$router.push({ name: 'game-detail', params: { id: game.id }})"
        class="mt-3 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
      >
        Play Now
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  game: {
    id: number
    title: string
    category: string
    rating: number
    plays: number
  }
}>()
</script>
