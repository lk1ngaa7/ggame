<template>
  <div class="home max-w-7xl mx-auto px-4">
    <!-- 顶部横幅 -->
    <div class="banner mb-8">
      <div class="relative h-80 rounded-lg overflow-hidden">
        <div v-for="(slide, index) in bannerSlides"
             :key="slide.id"
             v-show="currentSlide === index"
             class="absolute inset-0 w-full h-full transition-opacity duration-500"
             :class="{'opacity-100': currentSlide === index, 'opacity-0': currentSlide !== index}">
          <div :class="slide.bgClass" class="h-full w-full flex items-center justify-center">
            <div class="text-center">
              <h1 class="text-4xl text-white font-bold mb-4">{{ $t(slide.title) }}</h1>
              <p class="text-xl text-white">{{ $t(slide.description) }}</p>
            </div>
          </div>
        </div>

        <!-- 轮播控制按钮 -->
        <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          <button v-for="(_, index) in bannerSlides"
                  :key="index"
                  @click="currentSlide = index"
                  class="w-3 h-3 rounded-full transition-all duration-300"
                  :class="currentSlide === index ? 'bg-white' : 'bg-white/50'">
          </button>
        </div>

        <!-- 左右箭头 -->
        <button @click="prevSlide"
                class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-10">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button @click="nextSlide"
                class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-10">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- 游戏列表 -->
    <div class="game-list">
      <div class="mb-8">
        <div class="flex flex-wrap gap-2">
          <button
            @click="selectedTag = ''"
            class="px-4 py-2 rounded-full text-sm transition-colors"
            :class="selectedTag === '' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'">
            {{ $t('home.allGames') }}
          </button>
          <button
            v-for="tag in allTags"
            :key="tag"
            @click="selectedTag = tag"
            class="px-4 py-2 rounded-full text-sm transition-colors"
            :class="selectedTag === tag ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'">
            {{ tag }}
          </button>
        </div>
      </div>

      <h2 class="text-2xl font-bold mb-6">{{ selectedTag ? `${selectedTag} Games` : $t('home.popularGames') }}</h2>
      <div class="grid grid-cols-2 gap-4">
        <div v-for="game in filteredGames"
             :key="game.englishName"
             class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <div class="flex h-32">
            <div class="w-40">
              <img :src="game.pic"
                   :alt="game.englishName"
                   class="w-full h-full object-cover"
                   referrerpolicy="no-referrer"
                   crossorigin="anonymous">
            </div>
            <div class="flex-1 p-3 flex flex-col justify-between">
              <div>
                <h3 class="text-base font-semibold mb-2">{{ formatGameName(game.englishName) }}</h3>
                <div class="flex flex-wrap gap-1 mb-2">
                  <span v-for="tag in game.tags"
                        :key="tag"
                        class="px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-600">
                    {{ tag }}
                  </span>
                </div>
              </div>
              <a :href="`/game/${game.englishName}`"
                 class="inline-block px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm w-fit"
                 target="_blank">
                {{ $t('home.playNow') }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const { games, allTags, getGamesByTag } = useGameStore()
const selectedTag = ref('')
const currentSlide = ref(0)
const autoPlayInterval = ref<number>()

const bannerSlides = ref([
  {
    id: 1,
    title: 'home.banner.slide1.title',
    description: 'home.banner.slide1.description',
    bgClass: 'bg-gradient-to-r from-purple-500 to-pink-500'
  },
  {
    id: 2,
    title: 'home.banner.slide2.title',
    description: 'home.banner.slide2.description',
    bgClass: 'bg-gradient-to-r from-blue-500 to-teal-500'
  },
  {
    id: 3,
    title: 'home.banner.slide3.title',
    description: 'home.banner.slide3.description',
    bgClass: 'bg-gradient-to-r from-orange-500 to-red-500'
  }
])

const filteredGames = computed(() => {
  return getGamesByTag(selectedTag.value)
})

const formatGameName = (name: string) => {
  if (!name) return ''
  return name.split('_').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % bannerSlides.value.length
}

const prevSlide = () => {
  currentSlide.value = currentSlide.value === 0
    ? bannerSlides.value.length - 1
    : currentSlide.value - 1
}

const startAutoPlay = () => {
  stopAutoPlay() // 清除之前的定时器
  autoPlayInterval.value = setInterval(() => {
    nextSlide()
  }, 5000) as unknown as number
}

const stopAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
  }
}

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style scoped>
.banner {
  position: relative;
  overflow: hidden;
}
</style>
