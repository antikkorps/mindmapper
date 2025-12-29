<template>
  <div class="navbar bg-base-200 shadow-lg">
    <div class="flex-1">
      <router-link to="/maps" class="btn btn-ghost text-xl">
        🧠 {{ $t('navbar.brand') }}
      </router-link>
    </div>
    <div class="flex-none gap-2">
      <LanguageSelector />

      <!-- Theme Switcher Dropdown -->
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost gap-2">
          <Palette :size="20" />
          <span class="hidden sm:inline">{{ $t('navbar.theme') }}</span>
        </div>
        <ul
          tabindex="0"
          class="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52"
        >
          <li v-for="theme in themes" :key="theme">
            <input
              type="radio"
              name="theme-dropdown"
              class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
              :aria-label="theme"
              :value="theme"
              :checked="currentTheme === theme"
              @change="changeTheme(theme)"
            />
          </li>
        </ul>
      </div>

      <!-- User menu -->
      <div v-if="authStore.isAuthenticated" class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
          <Avatar
            :seed="authStore.user?.username || authStore.user?.email || 'user'"
            :name="authStore.user?.username"
            size="sm"
            avatar-style="avataaars"
          />
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
        >
          <li class="menu-title">
            <span>{{ authStore.user?.username || authStore.user?.email }}</span>
          </li>
          <li>
            <a>{{ $t('navbar.userMenu.profile') }}</a>
          </li>
          <li>
            <a>{{ $t('navbar.userMenu.settings') }}</a>
          </li>
          <div class="divider my-1"></div>
          <li>
            <a @click="handleLogout">{{ $t('navbar.userMenu.logout') }}</a>
          </li>
        </ul>
      </div>

      <!-- Login button if not authenticated -->
      <router-link v-else to="/login" class="btn btn-primary btn-sm gap-2">
        <LogIn :size="16" />
        {{ $t('common.login') }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import Avatar from '@/components/Avatar.vue'
import LanguageSelector from '@/components/LanguageSelector.vue'
import { APP_CONFIG } from '@/config/app.js'
import { useToast } from '@/composables/useToast'
import { useAuthStore } from '@/stores/auth'
import { useI18n } from 'vue-i18n'
import { LogIn, Palette } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const { t } = useI18n()

const themes = APP_CONFIG.themes
const currentTheme = ref(APP_CONFIG.defaultTheme)

onMounted(() => {
  const savedTheme = localStorage.getItem('theme') || APP_CONFIG.defaultTheme
  currentTheme.value = savedTheme
  document.documentElement.setAttribute('data-theme', savedTheme)
})

const changeTheme = theme => {
  currentTheme.value = theme
  localStorage.setItem('theme', theme)
  document.documentElement.setAttribute('data-theme', theme)
}

const handleLogout = () => {
  authStore.logout()
  const toast = useToast()
  toast.success(t('auth.messages.logoutSuccess'))
  router.push('/login')
}
</script>
