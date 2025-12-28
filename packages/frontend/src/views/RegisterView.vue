<template>
  <div class="min-h-screen hero bg-base-200">
    <div class="hero-content flex-col lg:flex-row gap-12">
      <!-- Info section -->
      <div class="text-center lg:text-left max-w-md">
        <h1 class="text-5xl font-bold">Create account</h1>
        <p class="py-6">
          Start organizing your ideas with beautiful, interactive mind maps.
          Free forever!
        </p>
        <div class="flex flex-col gap-2 text-sm text-base-content/70">
          <div class="flex items-center gap-2">
            <Sparkles :size="16" class="text-primary" />
            <span>No credit card required</span>
          </div>
          <div class="flex items-center gap-2">
            <Sparkles :size="16" class="text-primary" />
            <span>Unlimited mind maps</span>
          </div>
          <div class="flex items-center gap-2">
            <Sparkles :size="16" class="text-primary" />
            <span>Real-time autosave</span>
          </div>
        </div>
      </div>

      <!-- Register form -->
      <div class="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
        <form class="card-body" @submit.prevent="handleRegister">
          <h2 class="text-2xl font-bold text-center mb-4">Register</h2>

          <!-- Username -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Username</span>
              <span class="label-text-alt text-base-content/50"
                >3-50 chars</span
              >
            </label>
            <input
              v-model="formData.username"
              type="text"
              placeholder="johndoe"
              class="input input-bordered"
              :class="{ 'input-error': errors.username }"
              required
              autofocus
            />
            <label v-if="errors.username" class="label">
              <span class="label-text-alt text-error">{{
                errors.username
              }}</span>
            </label>
          </div>

          <!-- Email -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              v-model="formData.email"
              type="email"
              placeholder="email@example.com"
              class="input input-bordered"
              :class="{ 'input-error': errors.email }"
              required
            />
            <label v-if="errors.email" class="label">
              <span class="label-text-alt text-error">{{ errors.email }}</span>
            </label>
          </div>

          <!-- Password -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
              <span class="label-text-alt text-base-content/50">Min 6 chars</span>
            </label>
            <input
              v-model="formData.password"
              type="password"
              placeholder="••••••••"
              class="input input-bordered"
              :class="{ 'input-error': errors.password }"
              required
            />
            <label v-if="errors.password" class="label">
              <span class="label-text-alt text-error">{{
                errors.password
              }}</span>
            </label>
          </div>

          <!-- Confirm Password -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Confirm Password</span>
            </label>
            <input
              v-model="formData.confirmPassword"
              type="password"
              placeholder="••••••••"
              class="input input-bordered"
              :class="{ 'input-error': errors.confirmPassword }"
              required
            />
            <label v-if="errors.confirmPassword" class="label">
              <span class="label-text-alt text-error">{{
                errors.confirmPassword
              }}</span>
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
              <span v-else>Create Account</span>
            </button>
          </div>

          <!-- Login link -->
          <div class="divider">OR</div>
          <p class="text-center text-sm">
            Already have an account?
            <router-link to="/login" class="link link-primary"
              >Login here</router-link
            >
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'
import { Sparkles, XCircle } from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

const formData = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const errors = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const validateForm = () => {
  let isValid = true
  errors.username = ''
  errors.email = ''
  errors.password = ''
  errors.confirmPassword = ''

  // Username validation
  const usernameRegex = /^[a-zA-Z0-9_]{3,50}$/
  if (!formData.username) {
    errors.username = 'Username is required'
    isValid = false
  } else if (!usernameRegex.test(formData.username)) {
    errors.username = 'Username must be 3-50 alphanumeric characters or _'
    isValid = false
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formData.email) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!emailRegex.test(formData.email)) {
    errors.email = 'Invalid email format'
    isValid = false
  }

  // Password validation
  if (!formData.password) {
    errors.password = 'Password is required'
    isValid = false
  } else if (formData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
    isValid = false
  }

  // Confirm password validation
  if (!formData.confirmPassword) {
    errors.confirmPassword = 'Please confirm your password'
    isValid = false
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
    isValid = false
  }

  return isValid
}

const handleRegister = async () => {
  if (!validateForm()) return

  try {
    await authStore.register({
      username: formData.username,
      email: formData.email,
      password: formData.password,
    })

    toast.success('Account created successfully!')
    router.push('/maps')
  } catch (error) {
    toast.error('Registration failed. Please try again.')
    console.error('Registration error:', error)
  }
}
</script>
