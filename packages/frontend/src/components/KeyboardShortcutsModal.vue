<template>
  <dialog ref="modalRef" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box max-w-2xl">
      <!-- Header -->
      <div class="flex items-center gap-3 mb-6">
        <Keyboard :size="24" class="text-primary" />
        <h3 class="font-bold text-2xl">{{ $t('editor.shortcuts.title') }}</h3>
      </div>

      <!-- Shortcuts grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Editor shortcuts -->
        <div>
          <h4 class="font-semibold text-lg mb-3 flex items-center gap-2">
            <Edit3 :size="18" />
            Editor
          </h4>
          <div class="space-y-2">
            <ShortcutItem
              keys="Ctrl + N"
              :description="$t('editor.shortcuts.shortcuts.addNode')"
            />
            <ShortcutItem keys="Delete" description="Delete node" />
            <ShortcutItem keys="Ctrl + S" description="Save changes" />
            <ShortcutItem keys="Ctrl + Z" description="Undo" />
            <ShortcutItem keys="Ctrl + Shift + Z" description="Redo" />
          </div>
        </div>

        <!-- View shortcuts -->
        <div>
          <h4 class="font-semibold text-lg mb-3 flex items-center gap-2">
            <Eye :size="18" />
            View
          </h4>
          <div class="space-y-2">
            <ShortcutItem
              keys="Ctrl + +"
              :description="$t('editor.controls.zoomIn')"
            />
            <ShortcutItem
              keys="Ctrl + -"
              :description="$t('editor.controls.zoomOut')"
            />
            <ShortcutItem
              keys="Ctrl + 0"
              :description="$t('editor.controls.fitView')"
            />
            <ShortcutItem
              keys="Esc"
              :description="$t('editor.shortcuts.shortcuts.closeMenu')"
            />
          </div>
        </div>

        <!-- Navigation shortcuts -->
        <div>
          <h4 class="font-semibold text-lg mb-3 flex items-center gap-2">
            <Navigation :size="18" />
            Navigation
          </h4>
          <div class="space-y-2">
            <ShortcutItem keys="Double Click" description="Edit node label" />
            <ShortcutItem keys="Right Click" description="Context menu" />
            <ShortcutItem
              keys="? or F1"
              :description="$t('editor.shortcuts.shortcuts.help')"
            />
          </div>
        </div>

        <!-- Search shortcuts -->
        <div>
          <h4 class="font-semibold text-lg mb-3 flex items-center gap-2">
            <Search :size="18" />
            Search
          </h4>
          <div class="space-y-2">
            <ShortcutItem keys="Ctrl + K" description="Search nodes" />
            <ShortcutItem keys="Ctrl + F" description="Find in map" />
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="modal-action">
        <button class="btn btn-primary" @click="close">Got it!</button>
      </div>

      <!-- Close button -->
      <button
        class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        @click="close"
      >
        ✕
      </button>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button type="button" @click="close">{{ $t('common.close') }}</button>
    </form>
  </dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { Keyboard, Edit3, Eye, Navigation, Search } from 'lucide-vue-next'
import ShortcutItem from './ShortcutItem.vue'

const { t } = useI18n()

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
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
