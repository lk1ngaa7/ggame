<template>
  <nav class="bg-white shadow-md">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between h-16">
        <div class="flex">
          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center">
            <img
              class="h-8 w-auto"
              src="@/assets/logo.svg"
              alt="Logo"
            >
          </div>

          <!-- Navigation Links -->
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <router-link
              v-for="item in navItems"
              :key="item.path"
              :to="item.path"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-blue-500"
            >
              {{ $t(`nav.${item.name.toLowerCase()}`) }}
            </router-link>
          </div>
        </div>

        <!-- Right side -->
        <div class="flex items-center">
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import LanguageSwitcher from './LanguageSwitcher.vue'

const navItems = [
  { name: 'home', path: '/' }
]
</script>
