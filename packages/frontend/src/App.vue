<template>
  <div class="min-h-screen">
    <Navbar />
    <RouterView />
    <Toast ref="toastRef" />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Toast from '@/components/Toast.vue'
import { setToastInstance } from '@/composables/useToast'

const toastRef = ref(null)

// Set toast instance immediately after mount to avoid timing issues
onMounted(async () => {
  await nextTick()
  if (toastRef.value) {
    setToastInstance(toastRef.value)
  }
})
</script>
