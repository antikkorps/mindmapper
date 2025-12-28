<template>
  <div class="min-h-screen">
    <Navbar />
    <RouterView />
    <Toast ref="toastRef" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Toast from '@/components/Toast.vue'
import { setToastInstance } from '@/composables/useToast'

const toastRef = ref(null)

onMounted(() => {
  setToastInstance(toastRef.value)
})
</script>
