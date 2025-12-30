<template>
  <div class="space-y-3">
    <div>
      <label class="label">
        <span class="label-text font-medium">{{
          $t('editor.nodeEditor.icon')
        }}</span>
      </label>

      <details class="bg-base-200 rounded-lg mt-2">
        <summary
          class="flex items-center justify-between px-4 py-2 font-medium cursor-pointer"
        >
          <span>{{ emojiPickerTitle }}</span>
          <ChevronDown :size="16" class="chevron" />
        </summary>
        <div class="p-2">
          <div class="grid grid-cols-8 gap-1 max-h-32 overflow-y-auto">
            <button
              v-for="emoji in emojis"
              :key="emoji"
              type="button"
              :class="[
                'text-lg w-8 h-8 rounded border transition-all hover:border-primary hover:bg-base-300',
                value === emoji
                  ? 'border-primary ring-1 ring-offset-1 ring-primary bg-base-300'
                  : 'border-transparent opacity-60 hover:opacity-100',
              ]"
              :title="emoji"
              @click="selectIcon(emoji)"
            >
              {{ emoji }}
            </button>
            <button
              type="button"
              :class="[
                'w-8 h-8 rounded border transition-all hover:border-primary hover:bg-base-300',
                value === null
                  ? 'border-primary ring-1 ring-offset-1 ring-primary bg-base-300'
                  : 'border-transparent opacity-60 hover:opacity-100',
              ]"
              @click="selectIcon(null)"
            >
              <X :size="14" />
            </button>
          </div>
        </div>
      </details>

      <div class="mt-2">
        <input
          v-model="customEmoji"
          type="text"
          class="input input-bordered w-full input-sm"
          placeholder="Or type custom emoji..."
          maxlength="4"
          @input="handleCustomEmoji"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { X, ChevronDown } from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  modelValue: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get: () => props.modelValue,
  set: newValue => emit('update:modelValue', newValue),
})

const emojiPickerTitle = computed(() => {
  if (props.modelValue) {
    return `${t('editor.nodeEditor.icon')} (${props.modelValue})`
  }
  return t('editor.nodeEditor.icon')
})

const emojis = [
  '💡',
  '🎯',
  '📝',
  '⭐',
  '❤️',
  '🔥',
  '✅',
  '🚀',
  '💻',
  '📊',
  '🎨',
  '🔧',
  '📌',
  '🏠',
  '🌈',
  '🎉',
  '🎵',
  '📷',
  '🎮',
  '💼',
  '🌍',
  '☀️',
  '🌙',
  '⚡',
  '🎁',
  '🎁',
  '🏆',
  '🔔',
  '💬',
]

const customEmoji = ref('')

const selectIcon = emoji => {
  emit('update:modelValue', emoji)
}

const handleCustomEmoji = () => {
  emit('update:modelValue', customEmoji.value || null)
}

watch(
  () => props.modelValue,
  newValue => {
    customEmoji.value = newValue || ''
  }
)
</script>

<style scoped>
summary .chevron {
  transition: transform 0.2s;
}

details[open] summary .chevron {
  transform: rotate(180deg);
}
</style>
