<template>
  <footer class="footer footer-center p-6 bg-base-300/50 text-base-content/70 text-sm">
    <div class="flex items-center gap-6 flex-wrap">
      <a
        :href="githubUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="link link-hover flex items-center gap-1"
      >
        <Github :size="16" />
        <span>GitHub</span>
      </a>
      <span class="opacity-50">•</span>
      <button class="link link-hover flex items-center gap-1" @click="openSponsorModal">
        <Heart :size="16" />
        <span>Sponsor</span>
      </button>
      <span class="opacity-50">•</span>
      <span>© {{ currentYear }} MindMapper</span>
    </div>
  </footer>
</template>

<script setup>
import { Github, Heart } from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps({
  githubUrl: {
    type: String,
    default: 'https://github.com/antikkorps/mindmapper',
  },
})

const emit = defineEmits(['open-sponsor'])

const currentYear = computed(() => new Date().getFullYear())

const openSponsorModal = () => {
  emit('open-sponsor')
}
</script>
