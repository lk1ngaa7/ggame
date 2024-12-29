<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 relative overflow-hidden">
    <!-- 添加梦幻气泡效果 -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="bubble-1"></div>
      <div class="bubble-2"></div>
      <div class="bubble-3"></div>
    </div>
    
    <!-- 主要内容 -->
    <div class="relative z-10">
      <nav-bar />
      <main class="container mx-auto px-4 py-8">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
</script>

<style>
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background-color: #f8fafc;
}

/* 添加一些全局的平滑滚动效果 */
html {
  scroll-behavior: smooth;
}

/* 自定义滚动条样式 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: #94a3b8;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}

/* 梦幻气泡动画 */
.bubble-1,
.bubble-2,
.bubble-3 {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.5;
  animation: float 20s infinite ease-in-out;
}

.bubble-1 {
  width: 300px;
  height: 300px;
  background: rgba(216, 180, 254, 0.4); /* 浅紫色 */
  top: -150px;
  right: 10%;
  animation-delay: -2s;
}

.bubble-2 {
  width: 200px;
  height: 200px;
  background: rgba(251, 207, 232, 0.4); /* 浅粉色 */
  bottom: 20%;
  left: 5%;
  animation-delay: -5s;
}

.bubble-3 {
  width: 250px;
  height: 250px;
  background: rgba(199, 210, 254, 0.4); /* 浅蓝色 */
  top: 30%;
  left: 30%;
  animation-delay: -8s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(30px) scale(1.05);
  }
}

/* 为卡片添加玻璃态效果 */
.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
}
</style>
