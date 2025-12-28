<template>
  <div
    class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group"
    @click="$emit('open', map.id)"
  >
    <div class="card-body">
      <!-- Title with edit mode -->
      <div v-if="!isEditing" class="flex justify-between items-start">
        <h2 class="card-title group-hover:text-primary transition-colors">
          {{ map.title }}
        </h2>
        <div class="dropdown dropdown-end" @click.stop>
          <div tabindex="0" role="button" class="btn btn-ghost btn-xs btn-circle">
            ⋮
          </div>
          <ul
            tabindex="0"
            class="dropdown-content z-[1] menu p-2 shadow-lg bg-base-200 rounded-box w-40"
          >
            <li><a @click="startEdit">✏️ Rename</a></li>
            <li><a @click="$emit('duplicate', map.id)">📋 Duplicate</a></li>
            <li class="border-t border-base-300 mt-1 pt-1">
              <a class="text-error" @click="$emit('delete', map.id)">🗑️ Delete</a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Edit mode -->
      <div v-else @click.stop>
        <input
          ref="titleInput"
          v-model="editedTitle"
          type="text"
          class="input input-bordered input-sm w-full"
          @blur="saveTitle"
          @keyup.enter="saveTitle"
          @keyup.esc="cancelEdit"
        />
      </div>

      <!-- Metadata -->
      <div class="flex flex-col gap-1 text-sm text-base-content/70">
        <p>
          <span class="font-semibold">Updated:</span>
          {{ formatDate(map.updatedAt) }}
        </p>
        <p v-if="map.nodeCount !== undefined">
          <span class="font-semibold">Nodes:</span>
          {{ map.nodeCount }}
        </p>
      </div>

      <!-- Actions -->
      <div class="card-actions justify-end mt-4">
        <div class="badge badge-outline badge-sm">
          {{ map.visibility || 'Private' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const props = defineProps({
  map: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['open', 'update', 'delete', 'duplicate'])

const isEditing = ref(false)
const editedTitle = ref('')
const titleInput = ref(null)

const formatDate = date => {
  if (!date) return 'Unknown'
  const d = new Date(date)
  const now = new Date()
  const diffMs = now - d
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return d.toLocaleDateString()
}

const startEdit = () => {
  isEditing.value = true
  editedTitle.value = props.map.title
  nextTick(() => {
    titleInput.value?.focus()
    titleInput.value?.select()
  })
}

const saveTitle = () => {
  if (editedTitle.value.trim() && editedTitle.value !== props.map.title) {
    emit('update', { id: props.map.id, title: editedTitle.value.trim() })
  }
  isEditing.value = false
}

const cancelEdit = () => {
  isEditing.value = false
  editedTitle.value = ''
}
</script>
