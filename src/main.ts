import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import VueGtag from 'vue-gtag-next'

import './assets/main.css'

const app = createApp(App)

// 配置 Google Analytics
app.use(VueGtag, {
  property: {
    id: import.meta.env.VITE_GA_ID // 从环境变量获取 GA ID
  },
  isEnabled: import.meta.env.PROD, // 仅在生产环境启用
  useDebugger: !import.meta.env.PROD, // 在开发环境使用调试模式
})

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
