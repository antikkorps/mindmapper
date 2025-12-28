<template>
  <dialog ref="modalRef" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <!-- Header -->
      <div class="flex items-center gap-3 mb-6">
        <Heart :size="28" class="text-error" fill="currentColor" />
        <h3 class="font-bold text-2xl">Support MindMapper</h3>
      </div>

      <!-- Content -->
      <div class="space-y-6">
        <p class="text-base-content/80">
          MindMapper is a free and open-source project. If you find it useful,
          consider supporting its development!
        </p>

        <!-- Sponsor buttons -->
        <div class="space-y-3">
          <!-- Buy Me a Coffee -->
          <a
            :href="buyMeACoffeeUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-block btn-lg bg-[#FFDD00] hover:bg-[#FFDD00]/90 text-black border-none gap-3"
          >
            <Coffee :size="24" />
            <span class="text-lg font-semibold">Buy Me a Coffee</span>
          </a>

          <!-- Ko-fi (optional) -->
          <a
            v-if="kofiUrl"
            :href="kofiUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-block btn-lg bg-[#FF5E5B] hover:bg-[#FF5E5B]/90 text-white border-none gap-3"
          >
            <Heart :size="24" fill="currentColor" />
            <span class="text-lg font-semibold">Support on Ko-fi</span>
          </a>

          <!-- GitHub Sponsors (optional) -->
          <a
            v-if="githubSponsorsUrl"
            :href="githubSponsorsUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-block btn-lg bg-[#EA4AAA] hover:bg-[#EA4AAA]/90 text-white border-none gap-3"
          >
            <Github :size="24" />
            <span class="text-lg font-semibold">Sponsor on GitHub</span>
          </a>
        </div>

        <!-- Additional info -->
        <div class="alert alert-info">
          <Info :size="20" />
          <div class="text-sm">
            <p class="font-semibold">Your support helps:</p>
            <ul class="list-disc list-inside mt-2 space-y-1">
              <li>Keep the project maintained</li>
              <li>Add new features faster</li>
              <li>Cover hosting costs</li>
            </ul>
          </div>
        </div>

        <!-- Star on GitHub -->
        <div class="divider">OR</div>
        <a
          :href="githubRepoUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-outline btn-block gap-2"
        >
          <Star :size="20" />
          Star on GitHub (it's free!)
        </a>
      </div>

      <!-- Footer -->
      <div class="modal-action">
        <button class="btn" @click="close">Close</button>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button type="button" @click="close">close</button>
    </form>
  </dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Coffee, Heart, Github, Star, Info } from 'lucide-vue-next'

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  buyMeACoffeeUrl: {
    type: String,
    required: true,
  },
  kofiUrl: {
    type: String,
    default: '',
  },
  githubSponsorsUrl: {
    type: String,
    default: '',
  },
  githubRepoUrl: {
    type: String,
    default: 'https://github.com/yourusername/mindmap',
  },
})

const emit = defineEmits(['close'])

const modalRef = ref(null)

watch(
  () => props.show,
  newValue => {
    if (newValue) {
      modalRef.value?.showModal()
    } else {
      modalRef.value?.close()
    }
  }
)

const close = () => {
  emit('close')
}
</script>
