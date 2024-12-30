<template>
  <div class="game-detail p-4">
    <div v-if="game" class="max-w-7xl mx-auto">
      <!-- 游戏标题和标签 -->
      <div class="mb-6">
        <h1 class="text-3xl font-bold mb-4">{{ formatGameName(game.englishName) }}</h1>
        <div class="flex flex-wrap gap-2 mt-4">
          <span v-for="category in game?.categories || []" :key="category"
            class="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
            {{ $t(`game.categories.${category}`) }}
          </span>
        </div>
      </div>

      <!-- 游戏窗口 -->
      <div class="game-window bg-white rounded-lg shadow-lg overflow-hidden">
        <iframe
          :src="game.url"
          class="w-full aspect-video"
          frameborder="0"
          referrerpolicy="no-referrer"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        ></iframe>
      </div>

      <!-- 游戏描述或其他信息 -->
      <div class="mt-8">
        <h2 class="text-xl font-semibold mb-4">{{ $t('game.relatedGames') }}</h2>
        <div class="grid grid-cols-4 gap-4">
          <div v-for="relatedGame in relatedGames"
               :key="relatedGame.englishName"
               class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <router-link :to="`/game/${relatedGame.englishName}`">
              <img :src="relatedGame.pic"
                   :alt="relatedGame.englishName"
                   class="w-full h-32 object-cover"
                   referrerpolicy="no-referrer"
                   crossorigin="anonymous">
              <div class="p-3">
                <h3 class="font-semibold mb-2">{{ formatGameName(relatedGame.englishName) }}</h3>
                <div class="flex flex-wrap gap-1">
                  <span v-for="tag in relatedGame.tags.slice(0, 2)"
                        :key="tag"
                        class="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-600">
                    {{ $t(`game.categories.${tag}`) }}
                  </span>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-12">
      <p class="text-xl text-gray-600">{{ $t('game.gameNotFound') }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useGameStore } from '@/stores/gameStore'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const { getGameByName, games } = useGameStore()
const { t } = useI18n()

const game = computed(() => {
  const gameName = route.params.name as string
  return getGameByName(gameName)
})

const formatGameName = (name: string) => {
  if (!name) return ''
  return name.split('_').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

// 获取相关游戏（基于相同标签）
const relatedGames = computed(() => {
  if (!game.value) return []

  // 获取当前游戏的标签
  const currentTags = new Set(game.value.tags)

  // 找到具有相同标签的其他游戏
  return games.value
    .filter(g =>
      g.englishName !== game.value?.englishName && // 排除当前游戏
      g.tags.some(tag => currentTags.has(tag)) // 至少有一个相同标签
    )
    .slice(0, 4) // 只显示4个相关游戏
})
</script>
