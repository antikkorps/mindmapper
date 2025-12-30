<template>
  <div
    :class="[classes.container, shapeClass]"
    class="hover:scale-105 active:scale-95 cursor-pointer"
  >
    <div :class="classes.text" :style="textStyle">
      {{ label }}
    </div>

    <Handle
      type="target"
      :position="Position.Top"
      class="!bg-transparent !border-2"
    />
    <Handle
      type="source"
      :position="Position.Bottom"
      class="!bg-transparent !border-2"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Handle, Position } from '@vue-flow/core'
import { getNodeClasses, reverseTransformRotation } from '@/config/nodeStyles'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  },
})

const label = computed(() => props.data.label || 'New Node')

const nodeStyle = computed(() => props.data.style || {})

const classes = computed(() => getNodeClasses(nodeStyle.value))

const shapeClass = computed(() => {
  const shape = nodeStyle.value.shape || 'rounded'
  if (shape === 'diamond') {
    return 'diamond-shape'
  }
  return ''
})

const textStyle = computed(() => {
  const reverseTransform = reverseTransformRotation(nodeStyle.value)
  return reverseTransform ? { transform: reverseTransform } : {}
})
</script>

<style scoped>
.node {
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.diamond-shape {
  transform: rotate(45deg);
  padding: 8px !important;
}

.vue-flow__handle {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: transparent;
  border: 2px solid currentColor;
}

.vue-flow__handle-connecting {
  background-color: currentColor;
}

.vue-flow__handle-valid {
  background-color: #22c55e;
}
</style>
