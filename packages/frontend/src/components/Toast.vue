<template>
  <div class="toast toast-bottom toast-end z-50">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="toastClasses(toast.type)"
        class="alert shadow-lg min-w-[300px] max-w-md"
      >
        <component :is="getIcon(toast.type)" :size="20" :stroke-width="2" />
        <span>{{ toast.message }}</span>
        <button
          class="btn btn-sm btn-ghost btn-circle ml-auto"
          @click="removeToast(toast.id)"
        >
          <X :size="16" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { AlertTriangle, CheckCircle2, Info, X, XCircle } from 'lucide-vue-next'
import { ref } from 'vue'

const toasts = ref([])
let nextId = 1

const toastClasses = type => {
  const typeMap = {
    success: 'alert-success',
    error: 'alert-error',
    warning: 'alert-warning',
    info: 'alert-info',
  }
  return typeMap[type] || typeMap.info
}

const getIcon = type => {
  const iconMap = {
    success: CheckCircle2,
    error: XCircle,
    warning: AlertTriangle,
    info: Info,
  }
  return iconMap[type] || iconMap.info
}

const addToast = (message, type = 'info', duration = 3000) => {
  const id = nextId++
  toasts.value.push({ id, message, type })

  if (duration > 0) {
    setTimeout(() => removeToast(id), duration)
  }

  return id
}

const removeToast = id => {
  const index = toasts.value.findIndex(t => t.id === id)
  if (index > -1) {
    toasts.value.splice(index, 1)
  }
}

// Expose methods for parent component
defineExpose({
  addToast,
  removeToast,
})
</script>

<style scoped>
/* Toast animations */
.toast-enter-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.toast-leave-active {
  transition: all 0.3s ease-out;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.9);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.9);
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>
