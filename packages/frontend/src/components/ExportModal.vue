<template>
  <div v-if="show" class="modal modal-open">
    <div class="modal-box">
      <h3 class="font-bold text-lg mb-4">📦 {{ $t('editor.export.title') }}</h3>

      <div class="grid grid-cols-1 gap-4">
        <button
          class="btn btn-lg btn-outline justify-start gap-4"
          @click="handleExport('png')"
        >
          <span class="text-2xl">🖼️</span>
          <div class="text-left">
            <div class="font-bold">{{ $t('editor.export.png') }}</div>
            <div class="text-sm opacity-70">
              {{ $t('editor.export.pngDesc') }}
            </div>
          </div>
        </button>

        <button
          class="btn btn-lg btn-outline justify-start gap-4"
          @click="handleExport('pdf')"
        >
          <span class="text-2xl">📄</span>
          <div class="text-left">
            <div class="font-bold">{{ $t('editor.export.pdf') }}</div>
            <div class="text-sm opacity-70">
              {{ $t('editor.export.pdfDesc') }}
            </div>
          </div>
        </button>

        <button
          class="btn btn-lg btn-outline justify-start gap-4"
          @click="handleExport('json')"
        >
          <span class="text-2xl">📋</span>
          <div class="text-left">
            <div class="font-bold">{{ $t('editor.export.json') }}</div>
            <div class="text-sm opacity-70">
              {{ $t('editor.export.jsonDesc') }}
            </div>
          </div>
        </button>
      </div>

      <div class="modal-action">
        <form method="dialog">
          <button class="btn" @click="$emit('close')">
            {{ $t('common.close') }}
          </button>
        </form>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button @click="$emit('close')">close</button>
    </form>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps({
  show: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close', 'export'])

const handleExport = format => {
  emit('export', format)
}
</script>
