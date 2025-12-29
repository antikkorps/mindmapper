import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import fr from '@/locales/fr.json'

const SUPPORTED_LOCALES = ['en', 'fr']
const DEFAULT_LOCALE = 'en'
const STORAGE_KEY = 'mindmap-locale'

const getInitialLocale = () => {
  const saved = localStorage.getItem(STORAGE_KEY)

  if (saved && SUPPORTED_LOCALES.includes(saved)) {
    return saved
  }

  const browserLocale = navigator.language.split('-')[0]
  if (SUPPORTED_LOCALES.includes(browserLocale)) {
    return browserLocale
  }

  return DEFAULT_LOCALE
}

const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: DEFAULT_LOCALE,
  messages: {
    en,
    fr,
  },
  numberFormats: {
    en: {
      decimal: {
        style: 'decimal',
      },
    },
    fr: {
      decimal: {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
    },
  },
  datetimeFormats: {
    en: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      },
    },
    fr: {
      short: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
      long: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      },
    },
  },
})

export const setLocale = locale => {
  if (SUPPORTED_LOCALES.includes(locale)) {
    i18n.global.locale.value = locale
    localStorage.setItem(STORAGE_KEY, locale)
    document.documentElement.lang = locale
  }
}

export const getLocale = () => i18n.global.locale.value

export const getSupportedLocales = () => SUPPORTED_LOCALES

export default i18n
