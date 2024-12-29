<template>
  <div class="relative" @click.stop>
    <button
      @click="isOpen = !isOpen"
      class="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
    >
      <span class="text-sm">{{ currentLocaleName }}</span>
      <svg
        class="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    <!-- 下拉菜单 -->
    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg py-1 z-50"
    >
      <button
        v-for="locale in availableLocales"
        :key="locale.code"
        @click="changeLocale(locale.code)"
        class="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
        :class="{ 'text-blue-500': currentLocale === locale.code }"
      >
        {{ locale.name }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const isOpen = ref(false)

const availableLocales = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: '中文' }
]

const currentLocale = computed(() => locale.value)
const currentLocaleName = computed(() => {
  const current = availableLocales.find(l => l.code === locale.value)
  return current ? current.name : 'English'
})

const changeLocale = (newLocale: string) => {
  locale.value = newLocale
  localStorage.setItem('preferred-locale', newLocale)
  isOpen.value = false
}

// 点击其他地方关闭下拉菜单
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  
  // 可选：从 localStorage 读取用户语言偏好
  const savedLocale = localStorage.getItem('preferred-locale')
  if (savedLocale && availableLocales.some(l => l.code === savedLocale)) {
    locale.value = savedLocale
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
