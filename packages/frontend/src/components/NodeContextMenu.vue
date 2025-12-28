<template>
  <div
    v-if="show"
    ref="menuRef"
    class="fixed z-50 menu bg-base-200 rounded-box shadow-xl w-48 p-2"
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

const menuStyle = computed(() => {
  // Menu dimensions (approximate)
  const menuWidth = 192 // w-48 = 12rem = 192px
  const menuHeight = 200 // approximate height

  // Viewport dimensions
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  // Calculate position, adjusting if menu would overflow viewport
  let left = props.x
  let top = props.y

  // Adjust horizontal position if menu would overflow right edge
  if (left + menuWidth > viewportWidth) {
    left = viewportWidth - menuWidth - 10 // 10px margin
  }

  // Adjust vertical position if menu would overflow bottom edge
  if (top + menuHeight > viewportHeight) {
    top = viewportHeight - menuHeight - 10 // 10px margin
  }

  return {
    left: `${left}px`,
    top: `${top}px`,
  }
})

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
