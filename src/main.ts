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
    id: import.meta.env.VITE_GA_ID
  },
  appName: 'GameHub',
  enabled: true,
  bootstrap: true,
  pageTrackerTemplate: () => ({
    page_title: document.title,
    page_path: router.currentRoute.value.path,
    page_location: window.location.href
  })
})

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
