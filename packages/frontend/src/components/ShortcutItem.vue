<template>
  <div class="flex justify-between items-center text-sm">
    <span class="text-base-content/70">{{ description }}</span>
    <kbd class="kbd kbd-sm">{{ keys }}</kbd>
  </div>
</template>

<script setup>
defineProps({
  keys: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})
</script>
