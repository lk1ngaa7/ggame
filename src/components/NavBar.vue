<template>
  <nav class="bg-gray-800 text-white">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <router-link to="/" class="text-xl font-bold">GameHub</router-link>
          <div class="ml-10 flex items-center space-x-4">
            <router-link 
              v-for="item in navItems" 
              :key="item.path" 
              :to="item.path"
              class="px-3 py-2 rounded-md hover:bg-gray-700"
            >
              {{ item.name }}
            </router-link>
          </div>
        </div>
        <div class="flex items-center">
          <input 
            type="text" 
            placeholder="Search games..." 
            class="px-4 py-2 rounded-lg bg-gray-700 text-white placeholder:text-gray-400"
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Games', path: '/games' }
]
</script>
