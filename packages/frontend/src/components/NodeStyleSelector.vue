<template>
  <div class="space-y-4">
    <div>
      <label class="label">
        <span class="label-text font-medium">Color</span>
      </label>
      <div class="flex flex-wrap gap-2 mt-2">
        <button
          v-for="(color, key) in NODE_COLORS"
          :key="key"
          type="button"
          :class="[
            'w-10 h-10 rounded-lg border-2 transition-all hover:scale-110',
            color.bgClass,
            style.color === key
              ? 'border-base-content ring-2 ring-offset-2 ring-base-content'
              : 'border-transparent opacity-60 hover:opacity-100',
          ]"
          :title="color.name"
          @click="selectColor(key)"
        >
          <span class="sr-only">{{ color.name }}</span>
        </button>
      </div>
    </div>

    <div>
      <label class="label">
        <span class="label-text font-medium">Shape</span>
      </label>
      <div class="flex flex-wrap gap-2 mt-2">
        <button
          v-for="(shape, key) in NODE_SHAPES"
          :key="key"
          type="button"
          :class="[
            'px-4 py-2 border-2 rounded-lg transition-all hover:scale-105',
            style.shape === key
              ? 'border-primary bg-primary text-primary-content'
              : 'border-base-300 hover:border-primary',
          ]"
          @click="selectShape(key)"
        >
          {{ shape.name }}
        </button>
      </div>
    </div>

    <div>
      <label class="label">
        <span class="label-text font-medium">Style</span>
      </label>
      <div class="flex flex-wrap gap-2 mt-2">
        <button
          v-for="(nodeStyle, key) in NODE_STYLES"
          :key="key"
          type="button"
          :class="[
            'px-4 py-2 border-2 rounded-lg transition-all hover:scale-105',
            style.style === key
              ? 'border-primary bg-primary text-primary-content'
              : 'border-base-300 hover:border-primary',
          ]"
          @click="selectStyle(key)"
        >
          {{ nodeStyle.name }}
        </button>
      </div>
    </div>

    <div v-if="style.shape === 'diamond'">
      <label class="label">
        <span class="label-text font-medium">Text Rotation</span>
      </label>
      <div class="flex flex-wrap gap-2 mt-2">
        <button
          v-for="(rotation, key) in TEXT_ROTATION"
          :key="key"
          type="button"
          :class="[
            'px-4 py-2 border-2 rounded-lg transition-all hover:scale-105 text-left',
            style.textRotation === key
              ? 'border-primary bg-primary text-primary-content'
              : 'border-base-300 hover:border-primary',
          ]"
          @click="selectTextRotation(key)"
        >
          <div class="font-medium">{{ rotation.name }}</div>
          <div class="text-xs opacity-80">{{ rotation.description }}</div>
        </button>
      </div>
    </div>

    <div class="divider my-2"></div>

    <div
      class="preview-container bg-base-200 rounded-lg p-4 flex items-center justify-center min-h-[100px]"
    >
      <div
        :class="[previewClasses.container, previewShapeClass]"
        class="preview-node"
      >
        <div :class="previewClasses.text" :style="previewTextStyle">
          Preview
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import {
  NODE_COLORS,
  NODE_SHAPES,
  NODE_STYLES,
  TEXT_ROTATION,
  getNodeClasses,
  reverseTransformRotation,
} from '@/config/nodeStyles'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['update:modelValue'])

const style = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
})

const selectColor = color => {
  emit('update:modelValue', { ...style.value, color })
}

const selectShape = shape => {
  emit('update:modelValue', { ...style.value, shape })
}

const selectStyle = nodeStyle => {
  emit('update:modelValue', { ...style.value, style: nodeStyle })
}

const selectTextRotation = textRotation => {
  emit('update:modelValue', { ...style.value, textRotation })
}

const previewClasses = computed(() => getNodeClasses(style.value))

const previewShapeClass = computed(() => {
  const shape = style.value.shape || 'rounded'
  if (shape === 'diamond') {
    return 'diamond-shape'
  }
  return ''
})

const previewTextStyle = computed(() => {
  const reverseTransform = reverseTransformRotation(style.value)
  return reverseTransform ? { transform: reverseTransform } : {}
})
</script>

<style scoped>
.preview-node {
  min-width: 100px;
  max-width: 150px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.diamond-shape {
  transform: rotate(45deg);
  padding: 8px !important;
}
</style>
