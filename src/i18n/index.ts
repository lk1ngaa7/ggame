import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import zh from './locales/zh.json'

// 从localStorage获取保存的语言设置，如果没有则使用浏览器语言
const savedLocale = localStorage.getItem('preferred-locale')
const browserLang = navigator.language.toLowerCase()
const defaultLocale = savedLocale || (browserLang.startsWith('zh') ? 'zh' : 'en')

const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'en',
  messages: {
    en,
    zh
  },
  globalInjection: true
})

export default i18n
