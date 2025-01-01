<template>
  <div class="home max-w-7xl mx-auto px-4 pt-0">
    <!-- 轮播图 -->
    <div class="banner mb-4">
      <div class="relative h-16 rounded-xl overflow-hidden shadow-lg">
        <div v-for="(slide, index) in bannerSlides"
             :key="slide.id"
             v-show="currentSlide === index"
             class="absolute inset-0 w-full h-full transition-opacity duration-500"
             :class="{'opacity-100': currentSlide === index, 'opacity-0': currentSlide !== index}">
          <div :class="slide.bgClass" class="h-full w-full flex items-center justify-center">
            <div class="text-center">
              <h1 class="text-lg text-white font-bold">{{ t(slide.title) }}</h1>
            </div>
          </div>
        </div>

        <!-- 轮播控制按钮 -->
        <div class="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1 z-10">
          <button v-for="(_, index) in bannerSlides"
                  :key="index"
                  @click="currentSlide = index"
                  class="w-1.5 h-1.5 rounded-full transition-all duration-300"
                  :class="currentSlide === index ? 'bg-white' : 'bg-white/50'">
          </button>
        </div>

        <!-- 左右箭头 -->
        <button @click="prevSlide"
                class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-0.5 rounded-full z-10">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button @click="nextSlide"
                class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-0.5 rounded-full z-10">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- 游戏分类标签 -->
    <div class="flex items-center gap-2 mb-8">
      <!-- 固定显示的标签 -->
      <button
        @click="selectedTag = ''"
        class="h-9 px-4 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap"
        :class="selectedTag === '' ? 'bg-indigo-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'">
        {{ t('home.allGames') }}
      </button>
      <button
        v-for="tag in visibleTags"
        :key="tag"
        @click="selectedTag = tag"
        class="h-9 px-4 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap"
        :class="selectedTag === tag ? 'bg-indigo-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'">
        {{ tag }}
      </button>

      <!-- 更多按钮和下拉菜单 -->
      <div class="relative">
        <button
          @click="showMoreTags = !showMoreTags"
          class="h-9 px-4 rounded-full text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all duration-200 flex items-center gap-1"
          :class="{ 'bg-gray-200': showMoreTags }">
          更多
          <svg
            class="w-4 h-4 transition-transform duration-200"
            :class="{'rotate-180': showMoreTags}"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>

        <!-- 下拉菜单 -->
        <div v-if="showMoreTags"
             class="absolute top-full right-0 mt-1 py-1 bg-white rounded-lg shadow-lg border border-gray-100 min-w-[160px] max-h-[320px] overflow-y-auto z-50">
          <button
            v-for="tag in moreTags"
            :key="tag"
            @click="selectTag(tag)"
            class="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
            :class="{'text-indigo-500 bg-indigo-50 hover:bg-indigo-50': selectedTag === tag, 'text-gray-700': selectedTag !== tag}">
            {{ tag }}
            <span v-if="selectedTag === tag" class="text-indigo-500">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- 游戏列表 -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="game in filteredGames"
           :key="game.englishName"
           class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
        <div class="relative aspect-[4/3]">
          <img :src="game.pic"
               :alt="game.englishName"
               class="w-full h-full object-cover rounded-t-xl"
               referrerpolicy="no-referrer"
               crossorigin="anonymous">
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-xl">
            <div class="absolute bottom-2 left-2 right-2">
              <a :href="`/game/${game.englishName}`"
                 class="block w-full text-center px-3 py-1.5 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors text-sm"
                 target="_blank"
                 @click="trackGameClick(game.englishName)">
                {{ t('home.playNow') }}
              </a>
            </div>
          </div>
        </div>
        <div class="p-3">
          <h3 class="text-sm font-medium mb-1.5 line-clamp-1">{{ formatGameName(game.englishName) }}</h3>
          <div class="flex flex-wrap gap-1">
            <span v-for="tag in game.tags.slice(0, 2)"
                  :key="tag"
                  class="px-1.5 py-0.5 bg-gray-50 text-gray-600 rounded text-xs">
              {{ tag }}
            </span>
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
import { useGtag } from 'vue-gtag-next'

const { t } = useI18n()
const { games } = useGameStore()
const { event } = useGtag()

// 提取所有唯一的标签
const allTags = computed(() => {
  const tagSet = new Set<string>()
  games.value.forEach(game => {
    game.tags.forEach(tag => tagSet.add(tag))
  })
  return Array.from(tagSet)
})

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

// 游戏点击事件追踪
const trackGameClick = (gameName: string) => {
  event('game_card_click', {
    game_name: gameName,
    source: 'home_page'
  })
}

const visibleTags = computed(() => {
  const primaryTagsList = Array.from(allTags.value)
  return primaryTagsList.slice(0, 11)
})

const moreTags = computed(() => {
  const primaryTagsList = Array.from(allTags.value)
  return primaryTagsList.slice(5)
})

const showMoreTags = ref(false)

const filteredGames = computed(() => {
  return games.value.filter(game => selectedTag.value === '' || game.tags.includes(selectedTag.value))
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

const selectTag = (tag: string) => {
  selectedTag.value = tag
  showMoreTags.value = false
}

onMounted(() => {
  startAutoPlay()
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target.closest('.relative')) {
      showMoreTags.value = false
    }
  })
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
