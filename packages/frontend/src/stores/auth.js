import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiClient from '@/services/apiClient'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const accessToken = ref(null)
  const refreshToken = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const isAuthenticated = computed(() => !!accessToken.value && !!user.value)
  const userInitials = computed(() => {
    if (!user.value) return 'U'
    const name = user.value.username || user.value.email || 'User'
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  })

  // Actions
  const register = async ({ username, email, password }) => {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.post('/auth/register', {
        username,
        email,
        password,
      })

      // Save tokens (response.data from backend)
      accessToken.value = response.data.accessToken
      refreshToken.value = response.data.refreshToken
      user.value = response.data.user

      // Store in localStorage
      localStorage.setItem('access_token', response.data.accessToken)
      localStorage.setItem('refresh_token', response.data.refreshToken)
      localStorage.setItem('auth_token', response.data.accessToken) // For apiClient

      return response.data
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  const login = async ({ email, password }) => {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        password,
      })

      // Save tokens (response.data from backend)
      accessToken.value = response.data.accessToken
      refreshToken.value = response.data.refreshToken
      user.value = response.data.user

      // Store in localStorage
      localStorage.setItem('access_token', response.data.accessToken)
      localStorage.setItem('refresh_token', response.data.refreshToken)
      localStorage.setItem('auth_token', response.data.accessToken) // For apiClient

      return response.data
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    user.value = null
    accessToken.value = null
    refreshToken.value = null
    error.value = null

    // Clear localStorage
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('auth_token')
  }

  const fetchCurrentUser = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await apiClient.get('/auth/me')
      user.value = response.data
      return response.data
    } catch (e) {
      error.value = e.message
      // If unauthorized, clear tokens
      if (e.message.includes('401') || e.message.includes('Unauthorized')) {
        logout()
      }
      throw e
    } finally {
      loading.value = false
    }
  }

  const refreshAccessToken = async () => {
    try {
      const response = await apiClient.post('/auth/refresh', {
        refreshToken: refreshToken.value,
      })

      accessToken.value = response.data.accessToken
      localStorage.setItem('access_token', response.data.accessToken)
      localStorage.setItem('auth_token', response.data.accessToken)

      return response.data.accessToken
    } catch (e) {
      // If refresh fails, logout
      logout()
      throw e
    }
  }

  const initializeAuth = async () => {
    // Check if tokens exist in localStorage
    const storedAccessToken = localStorage.getItem('access_token')
    const storedRefreshToken = localStorage.getItem('refresh_token')

    if (storedAccessToken && storedRefreshToken) {
      accessToken.value = storedAccessToken
      refreshToken.value = storedRefreshToken

      try {
        // Fetch current user to validate token
        await fetchCurrentUser()
      } catch (e) {
        // If token is invalid, try to refresh
        try {
          await refreshAccessToken()
          await fetchCurrentUser()
        } catch (refreshError) {
          // If refresh fails, logout
          logout()
        }
      }
    }
  }

  return {
    // State
    user,
    accessToken,
    refreshToken,
    loading,
    error,

    // Getters
    isAuthenticated,
    userInitials,

    // Actions
    register,
    login,
    logout,
    fetchCurrentUser,
    refreshAccessToken,
    initializeAuth,
  }
})
