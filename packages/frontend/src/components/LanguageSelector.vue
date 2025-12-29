<template>
  <div class="dropdown dropdown-end">
    <div
      tabindex="0"
      role="button"
      class="btn btn-ghost gap-2"
      :aria-label="$t('language.select')"
    >
      <Languages :size="20" />
      <span class="hidden sm:inline">{{ $t('language.select') }}</span>
      <div class="text-xs opacity-70">{{ currentLocale.toUpperCase() }}</div>
    </div>
    <ul
      tabindex="0"
      class="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-40"
    >
      <li v-for="locale in supportedLocales" :key="locale" class="menu-item">
        <button
          class="w-full btn btn-sm btn-ghost justify-between"
          :class="{ 'btn-active': currentLocale === locale }"
          @click="changeLocale(locale)"
        >
          <span>{{ $t(`language.${locale}`) }}</span>
          <Check
            v-if="currentLocale === locale"
            :size="16"
            class="text-primary"
          />
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { Languages, Check } from 'lucide-vue-next'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { getSupportedLocales, setLocale } from '@/i18n'

const { locale } = useI18n()

const currentLocale = computed(() => locale.value)
const supportedLocales = getSupportedLocales()

const changeLocale = newLocale => {
  setLocale(newLocale)
}
</script>

<style scoped>
.menu-item {
  list-style: none;
}
</style>
