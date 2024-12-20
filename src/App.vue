<template>
  <nav-bar />
  <main class="container mx-auto px-4 py-8">
    <router-view />
  </main>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
</script>
