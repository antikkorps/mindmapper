<template>
  <dialog ref="modalRef" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <!-- Header -->
      <h3 class="font-bold text-lg mb-4">Edit Node</h3>

      <!-- Form -->
      <form @submit.prevent="saveNode">
        <div class="form-control w-full mb-4">
          <label class="label">
            <span class="label-text">Label</span>
            <span class="label-text-alt text-base-content/50"
              >{{ nodeLabel.length }}/255</span
            >
          </label>
          <textarea
            ref="labelInput"
            v-model="nodeLabel"
            class="textarea textarea-bordered h-24 resize-none"
            placeholder="Enter node label..."
            maxlength="255"
            @keydown.enter.exact="saveNode"
            @keydown.esc="close"
          ></textarea>
          <label v-if="error" class="label">
            <span class="label-text-alt text-error">{{ error }}</span>
          </label>
        </div>

        <!-- Node metadata (optional info) -->
        <div class="flex gap-2 text-sm text-base-content/70 mb-4">
          <div class="badge badge-outline badge-sm">
            ID: {{ node?.id?.slice(0, 8) }}...
          </div>
          <div v-if="node?.parentId" class="badge badge-outline badge-sm">
            Has parent
          </div>
        </div>

        <!-- Actions -->
        <div class="modal-action">
          <button type="button" class="btn btn-ghost" @click="close">
            Cancel
          </button>
          <button
            type="submit"
            class="btn btn-primary"
            :disabled="!isValid || saving"
          >
            <span v-if="saving" class="loading loading-spinner loading-sm"></span>
            <span v-else>Save</span>
          </button>
        </div>
      </form>

      <!-- Close button -->
      <button
        class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        @click="close"
      >
        ✕
      </button>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button type="button" @click="close">close</button>
    </form>
  </dialog>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'

const props = defineProps({
  node: {
    type: Object,
    default: null,
  },
  show: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close', 'save', 'delete'])

const modalRef = ref(null)
const labelInput = ref(null)
const nodeLabel = ref('')
const error = ref('')
const saving = ref(false)

const isValid = computed(() => {
  return nodeLabel.value.trim().length > 0 && nodeLabel.value.length <= 255
})

// Watch for show prop changes
watch(
  () => props.show,
  async newValue => {
    if (newValue) {
      nodeLabel.value = props.node?.data?.label || ''
      error.value = ''
      modalRef.value?.showModal()
      await nextTick()
      labelInput.value?.focus()
      labelInput.value?.select()
    } else {
      modalRef.value?.close()
    }
  }
)

const close = () => {
  emit('close')
}

const saveNode = async () => {
  if (!isValid.value) {
    error.value = 'Label must be between 1 and 255 characters'
    return
  }

  saving.value = true
  try {
    await emit('save', {
      id: props.node.id,
      label: nodeLabel.value.trim(),
    })
    close()
  } catch (err) {
    error.value = err.message || 'Failed to save node'
  } finally {
    saving.value = false
  }
}
</script>
