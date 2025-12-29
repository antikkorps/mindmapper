<template>
  <div class="min-h-screen hero bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse gap-12">
      <!-- Info section -->
      <div class="text-center lg:text-left max-w-md">
        <h1 class="text-5xl font-bold">{{ $t('auth.login.subtitle') }}</h1>
        <p class="py-6">
          {{ $t('auth.messages.loginSuccess') }} {{ $t('maps.title') }}
        </p>
        <div class="flex flex-col gap-2 text-sm text-base-content/70">
          <div class="flex items-center gap-2">
            <CheckCircle2 :size="16" class="text-success" />
            <span>Real-time autosave</span>
          </div>
          <div class="flex items-center gap-2">
            <CheckCircle2 :size="16" class="text-success" />
            <span>6 beautiful themes</span>
          </div>
          <div class="flex items-center gap-2">
            <CheckCircle2 :size="16" class="text-success" />
            <span>Unlimited mind maps</span>
          </div>
        </div>
      </div>

      <!-- Login form -->
      <div class="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
        <form class="card-body" @submit.prevent="handleLogin">
          <h2 class="text-2xl font-bold text-center mb-4">
            {{ $t('auth.login.title') }}
          </h2>

          <!-- Email -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">{{ $t('auth.login.email') }}</span>
            </label>
            <input
              v-model="formData.email"
              type="email"
              :placeholder="$t('auth.login.emailPlaceholder')"
              class="input input-bordered"
              :class="{ 'input-error': errors.email }"
              required
              autofocus
            />
            <label v-if="errors.email" class="label">
              <span class="label-text-alt text-error">{{ errors.email }}</span>
            </label>
          </div>

          <!-- Password -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">{{ $t('auth.login.password') }}</span>
            </label>
            <input
              v-model="formData.password"
              type="password"
              :placeholder="$t('auth.login.passwordPlaceholder')"
              class="input input-bordered"
              :class="{ 'input-error': errors.password }"
              required
            />
            <label v-if="errors.password" class="label">
              <span class="label-text-alt text-error">{{
                errors.password
              }}</span>
            </label>
            <label class="label">
              <a href="#" class="label-text-alt link link-hover"
                >Forgot password?</a
              >
            </label>
          </div>

          <!-- Error message -->
          <div v-if="authStore.error" class="alert alert-error">
            <XCircle :size="20" />
            <span>{{ authStore.error }}</span>
          </div>

          <!-- Submit button -->
          <div class="form-control mt-6">
            <button
              type="submit"
              class="btn btn-primary"
              :disabled="authStore.loading"
            >
              <span
                v-if="authStore.loading"
                class="loading loading-spinner loading-sm"
              ></span>
              <span v-else>{{ $t('auth.login.submit') }}</span>
            </button>
          </div>

          <!-- Register link -->
          <div class="divider">OR</div>
          <p class="text-center text-sm">
            {{ $t('auth.login.noAccount') }}
            <router-link to="/register" class="link link-primary">{{
              $t('auth.login.registerLink')
            }}</router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'
import { CheckCircle2, XCircle } from 'lucide-vue-next'

const router = useRouter()
const { t } = useI18n()
const authStore = useAuthStore()

const formData = reactive({
  email: '',
  password: '',
})

const errors = reactive({
  email: '',
  password: '',
})

const validateForm = () => {
  let isValid = true
  errors.email = ''
  errors.password = ''

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formData.email) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!emailRegex.test(formData.email)) {
    errors.email = 'Invalid email format'
    isValid = false
  }

  if (!formData.password) {
    errors.password = 'Password is required'
    isValid = false
  } else if (formData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
    isValid = false
  }

  return isValid
}

const handleLogin = async () => {
  if (!validateForm()) return

  try {
    await authStore.login({
      email: formData.email,
      password: formData.password,
    })

    const toast = useToast()
    toast.success(t('auth.messages.loginSuccess'))
    router.push('/maps')
  } catch (error) {
    const toast = useToast()
    toast.error(t('auth.messages.loginError'))
    console.error('Login error:', error)
  }
}
</script>
