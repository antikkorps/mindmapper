<template>
  <div v-if="show" class="modal modal-open">
    <div class="modal-box">
      <h3 class="font-bold text-lg mb-6 flex items-center gap-2">
        <Download :size="24" class="text-primary" />
        {{ $t('editor.export.title') }}
      </h3>

      <div class="grid grid-cols-1 gap-4">
        <button
          class="btn btn-lg btn-outline justify-start gap-4 group hover:border-primary"
          @click="handleExport('png')"
        >
          <Image
            :size="28"
            class="group-hover:text-primary transition-colors"
          />
          <div class="text-left">
            <div class="font-bold">{{ $t('editor.export.png') }}</div>
            <div class="text-sm opacity-70">
              {{ $t('editor.export.pngDesc') }}
            </div>
          </div>
        </button>

        <button
          class="btn btn-lg btn-outline justify-start gap-4 group hover:border-secondary"
          @click="handleExport('pdf')"
        >
          <FileText
            :size="28"
            class="group-hover:text-secondary transition-colors"
          />
          <div class="text-left">
            <div class="font-bold">{{ $t('editor.export.pdf') }}</div>
            <div class="text-sm opacity-70">
              {{ $t('editor.export.pdfDesc') }}
            </div>
          </div>
        </button>

        <button
          class="btn btn-lg btn-outline justify-start gap-4 group hover:border-accent"
          @click="handleExport('json')"
        >
          <Code :size="28" class="group-hover:text-accent transition-colors" />
          <div class="text-left">
            <div class="font-bold">{{ $t('editor.export.json') }}</div>
            <div class="text-sm opacity-70">
              {{ $t('editor.export.jsonDesc') }}
            </div>
          </div>
        </button>
      </div>

      <div class="modal-action">
        <button class="btn" @click="$emit('close')">
          {{ $t('common.close') }}
        </button>
      </div>
    </div>
    <div class="modal-backdrop" @click="$emit('close')">
      <button class="hidden">close</button>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { Download, Image, FileText, Code } from 'lucide-vue-next'

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
