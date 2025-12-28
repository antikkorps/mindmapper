<template>
  <div
    v-if="show"
    ref="menuRef"
    class="absolute z-50 menu bg-base-200 rounded-box shadow-xl w-48 p-2"
    :style="menuStyle"
    @click.stop
  >
    <li>
      <a @click="$emit('edit')">
        <Edit3 :size="16" />
        Edit Label
      </a>
    </li>
    <li>
      <a @click="$emit('add-child')">
        <GitBranch :size="16" />
        Add Child Node
      </a>
    </li>
    <li>
      <a @click="$emit('duplicate')">
        <Copy :size="16" />
        Duplicate
      </a>
    </li>
    <div class="divider my-1"></div>
    <li>
      <a class="text-error" @click="$emit('delete')">
        <Trash2 :size="16" />
        Delete Node
      </a>
    </li>
  </div>
</template>

<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue'
import { Edit3, GitBranch, Copy, Trash2 } from 'lucide-vue-next'

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  x: {
    type: Number,
    default: 0,
  },
  y: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['edit', 'delete', 'duplicate', 'add-child', 'close'])

const menuRef = ref(null)

const menuStyle = computed(() => ({
  left: `${props.x}px`,
  top: `${props.y}px`,
}))

// Close menu when clicking outside
const handleClickOutside = event => {
  if (menuRef.value && !menuRef.value.contains(event.target)) {
    emit('close')
  }
}

// Close menu on Escape key
const handleEscape = event => {
  if (event.key === 'Escape') {
    emit('close')
  }
}

watch(
  () => props.show,
  newValue => {
    if (newValue) {
      document.addEventListener('click', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    } else {
      document.removeEventListener('click', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }
)

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscape)
})
</script>
