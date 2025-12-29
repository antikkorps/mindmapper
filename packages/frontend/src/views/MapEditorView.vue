<template>
  <div class="h-screen flex flex-col">
    <!-- Toolbar -->
    <div class="navbar bg-base-200 shadow-lg">
      <div class="flex-1 gap-2">
        <router-link to="/maps" class="btn btn-ghost btn-sm gap-2">
          ← {{ $t('editor.controls.back') }}
        </router-link>
        <input
          v-model="mapTitle"
          type="text"
          class="input input-ghost text-xl font-bold max-w-md"
          placeholder="Untitled Map"
          @blur="updateMapTitle"
          @keyup.enter="$event.target.blur()"
        />
        <span v-if="saving" class="loading loading-spinner loading-sm"></span>
      </div>
      <div class="flex-none gap-2">
        <div class="badge badge-outline badge-sm">
          {{
            $t('maps.card.nodes', {
              count: elements.filter(e => e.type !== 'smoothstep').length,
            })
          }}
        </div>
        <button class="btn btn-sm btn-primary gap-2" @click="addNode">
          <span>+</span> {{ $t('editor.controls.addNode') }}
        </button>
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-sm btn-ghost">⋮</div>
          <ul
            tabindex="0"
            class="dropdown-content z-[1] menu p-2 shadow-lg bg-base-200 rounded-box w-48"
          >
            <li>
              <a @click="autoLayout"
                >🔄 {{ $t('editor.controls.autoLayout') }}</a
              >
            </li>
            <li>
              <a @click="fitView">📐 {{ $t('editor.controls.fitView') }}</a>
            </li>
            <li class="border-t border-base-300 mt-1 pt-1">
              <a @click="exportMap">💾 Export</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Vue Flow Canvas -->
    <div class="flex-1 relative">
      <VueFlow
        v-model="elements"
        :default-zoom="1"
        :min-zoom="0.2"
        :max-zoom="4"
        @node-drag-stop="onNodeDragStop"
        @connect="onConnect"
        @edge-update="onEdgeUpdate"
        @node-click="onNodeClick"
        @node-double-click="onNodeDoubleClick"
        @node-context-menu="onNodeContextMenu"
      >
        <Background pattern-color="#aaa" :gap="16" />
        <Controls />
        <MiniMap />
      </VueFlow>

      <!-- Empty state -->
      <div
        v-if="elements.length === 0 && !loading"
        class="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div class="text-center max-w-md">
          <h2 class="text-2xl font-bold mb-2 text-base-content/50">
            Empty canvas
          </h2>
          <p class="text-base-content/40">
            {{ $t('editor.messages.loadSuccess') }}
          </p>
        </div>
      </div>

      <!-- Loading overlay -->
      <div
        v-if="loading"
        class="absolute inset-0 flex items-center justify-center bg-base-100/50"
      >
        <span class="loading loading-spinner loading-lg"></span>
      </div>

      <!-- Context Menu -->
      <NodeContextMenu
        :show="contextMenu.show"
        :x="contextMenu.x"
        :y="contextMenu.y"
        @edit="editNode"
        @delete="deleteNode"
        @duplicate="duplicateNode"
        @add-child="addChildNode"
        @close="closeContextMenu"
      />
    </div>

    <!-- Node Editor Modal -->
    <NodeEditorModal
      :show="editorModal.show"
      :node="editorModal.node"
      @close="closeEditorModal"
      @save="saveNodeLabel"
    />

    <!-- Keyboard Shortcuts Help Modal -->
    <KeyboardShortcutsModal
      :show="showKeyboardHelp"
      @close="showKeyboardHelp = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import { useNodesStore } from '@/stores/nodes'
import { useMapsStore } from '@/stores/maps'
import { useToast } from '@/composables/useToast'
import { useKeyboardShortcuts } from '@/composables/useKeyboardShortcuts'
import { debounce } from '@/utils/debounce'
import { applyAutoLayout, LAYOUT_PRESETS } from '@/utils/autoLayout'
import NodeEditorModal from '@/components/NodeEditorModal.vue'
import NodeContextMenu from '@/components/NodeContextMenu.vue'
import KeyboardShortcutsModal from '@/components/KeyboardShortcutsModal.vue'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const nodesStore = useNodesStore()
const mapsStore = useMapsStore()
const toast = useToast()
const { fitView: vueFlowFitView } = useVueFlow()

const mapId = route.params.id
const mapTitle = ref('')
const elements = ref([])
const loading = ref(false)
const saving = ref(false)
const showKeyboardHelp = ref(false)

// Context menu state
const contextMenu = reactive({
  show: false,
  x: 0,
  y: 0,
  node: null,
})

// Editor modal state
const editorModal = reactive({
  show: false,
  node: null,
})

// Keyboard shortcuts
useKeyboardShortcuts({
  'ctrl+n': () => addNode(),
  escape: () => {
    if (contextMenu.show) closeContextMenu()
    if (editorModal.show) closeEditorModal()
  },
  'shift+?': () => {
    showKeyboardHelp.value = true
  },
  f1: () => {
    showKeyboardHelp.value = true
  },
})

onMounted(async () => {
  await loadMap()
})

const loadMap = async () => {
  loading.value = true
  try {
    const map = await mapsStore.fetchMapById(mapId)
    mapTitle.value = map.title

    const nodes = await nodesStore.fetchNodesByMap(mapId)
    elements.value = nodesStore.convertToVueFlowFormat(nodes)
  } catch (error) {
    toast.error(t('editor.messages.loadError'))
    console.error('Error loading map:', error)
    router.push('/maps')
  } finally {
    loading.value = false
  }
}

const addNode = async () => {
  try {
    const newNode = await nodesStore.createNode({
      mapId,
      label: 'New Node',
      posX: Math.random() * 500,
      posY: Math.random() * 500,
    })
    elements.value.push(newNode)
    toast.success(t('editor.messages.nodeCreated'))
  } catch (error) {
    toast.error('Failed to add node')
    console.error('Error adding node:', error)
  }
}

// Debounced position update (300ms delay)
const debouncedPositionUpdate = debounce(async (nodeId, position) => {
  saving.value = true
  try {
    await nodesStore.updateNodePosition(nodeId, position)
  } catch (error) {
    toast.error('Failed to save position')
    console.error('Error updating position:', error)
  } finally {
    saving.value = false
  }
}, 300)

const onNodeDragStop = async event => {
  const { node } = event
  debouncedPositionUpdate(node.id, {
    posX: node.position.x,
    posY: node.position.y,
  })
}

const onConnect = async connection => {
  try {
    // Update parent-child relationship in backend
    await nodesStore.updateNodeParent(connection.target, connection.source)

    // Add edge visually
    elements.value.push({
      id: `e${connection.source}-${connection.target}`,
      source: connection.source,
      target: connection.target,
      type: 'smoothstep',
    })

    toast.success('Connection created')
  } catch (error) {
    toast.error('Failed to create connection')
    console.error('Error creating connection:', error)
  }
}

const onEdgeUpdate = async ({ edge, connection }) => {
  try {
    await nodesStore.updateNodeParent(connection.target, connection.source)
    toast.success('Connection updated')
  } catch (error) {
    toast.error('Failed to update connection')
    console.error('Error updating edge:', error)
  }
}

const onNodeClick = ({ node }) => {
  closeContextMenu()
}

const onNodeDoubleClick = ({ node }) => {
  openEditorModal(node)
}

const onNodeContextMenu = ({ event, node }) => {
  event.preventDefault()
  contextMenu.show = true
  contextMenu.x = event.clientX
  contextMenu.y = event.clientY
  contextMenu.node = node
}

// Context Menu handlers
const closeContextMenu = () => {
  contextMenu.show = false
  contextMenu.node = null
}

const editNode = () => {
  openEditorModal(contextMenu.node)
  closeContextMenu()
}

const deleteNode = async () => {
  const node = contextMenu.node
  closeContextMenu()

  // Confirmation (using native confirm for now, could be a DaisyUI modal)
  if (
    !confirm(
      `Delete "${node.data.label}"?\n\nThis will also delete all child nodes.`
    )
  ) {
    return
  }

  try {
    await nodesStore.deleteNode(node.id)
    // Remove node and its edges from elements
    elements.value = elements.value.filter(
      el => el.id !== node.id && el.source !== node.id && el.target !== node.id
    )
    toast.success(t('editor.messages.nodeDeleted'))
  } catch (error) {
    toast.error('Failed to delete node')
    console.error('Error deleting node:', error)
  }
}

const duplicateNode = async () => {
  const node = contextMenu.node
  closeContextMenu()

  try {
    const newNode = await nodesStore.createNode({
      mapId,
      label: `${node.data.label} (copy)`,
      posX: node.position.x + 50,
      posY: node.position.y + 50,
      parentId: node.parentId || null,
    })
    elements.value.push(newNode)

    // If original node has a parent, create edge for duplicate
    if (node.parentId) {
      elements.value.push({
        id: `e${node.parentId}-${newNode.id}`,
        source: node.parentId,
        target: newNode.id,
        type: 'smoothstep',
      })
    }

    toast.success('Node duplicated')
  } catch (error) {
    toast.error('Failed to duplicate node')
    console.error('Error duplicating node:', error)
  }
}

const addChildNode = async () => {
  const parentNode = contextMenu.node
  closeContextMenu()

  try {
    const newNode = await nodesStore.createNode({
      mapId,
      label: 'New Child Node',
      posX: parentNode.position.x,
      posY: parentNode.position.y + 100,
      parentId: parentNode.id,
    })

    // Add node to elements
    elements.value.push(newNode)

    // Add edge from parent to child
    elements.value.push({
      id: `e${parentNode.id}-${newNode.id}`,
      source: parentNode.id,
      target: newNode.id,
      type: 'smoothstep',
    })

    toast.success('Child node added')
  } catch (error) {
    toast.error('Failed to add child node')
    console.error('Error adding child node:', error)
  }
}

// Editor Modal handlers
const openEditorModal = node => {
  editorModal.show = true
  editorModal.node = node
}

const closeEditorModal = () => {
  editorModal.show = false
  editorModal.node = null
}

const saveNodeLabel = async ({ id, label }) => {
  try {
    await nodesStore.updateNode(id, { label })

    // Update node in elements
    const nodeIndex = elements.value.findIndex(el => el.id === id)
    if (nodeIndex !== -1 && elements.value[nodeIndex].data) {
      elements.value[nodeIndex].data.label = label
    }

    toast.success(t('editor.messages.nodeUpdated'))
  } catch (error) {
    toast.error('Failed to update node')
    console.error('Error updating node:', error)
    throw error
  }
}

const updateMapTitle = async () => {
  if (!mapTitle.value.trim()) {
    mapTitle.value = 'Untitled Map'
  }
  try {
    await mapsStore.updateMap(mapId, { title: mapTitle.value })
    toast.success('Map title updated')
  } catch (error) {
    toast.error('Failed to update title')
    console.error('Error updating title:', error)
  }
}

const autoLayout = async () => {
  if (elements.value.length === 0) {
    toast.warning('No nodes to layout')
    return
  }

  try {
    // Apply Dagre layout
    const layoutedElements = applyAutoLayout(
      elements.value,
      LAYOUT_PRESETS.VERTICAL
    )

    // Extract nodes to update positions in backend
    const nodes = layoutedElements.filter(el => !el.source && !el.target)

    // Update positions in Vue Flow (immediate visual feedback)
    elements.value = layoutedElements

    // Batch update positions in backend
    saving.value = true
    const updatePromises = nodes.map(node =>
      nodesStore.updateNodePosition(node.id, {
        posX: node.position.x,
        posY: node.position.y,
      })
    )

    await Promise.all(updatePromises)

    toast.success(t('editor.messages.layoutApplied'))

    // Fit view to show all nodes
    setTimeout(() => {
      vueFlowFitView({ padding: 0.2, duration: 300 })
    }, 100)
  } catch (error) {
    toast.error('Failed to apply layout')
    console.error('Auto-layout error:', error)
  } finally {
    saving.value = false
  }
}

const fitView = () => {
  vueFlowFitView({ padding: 0.2, duration: 300 })
}

const exportMap = () => {
  toast.info('Export feature coming soon!')
  // TODO: Implement export (PNG/JSON)
}
</script>

<style>
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/core/dist/theme-default.css';
@import '@vue-flow/controls/dist/style.css';
@import '@vue-flow/minimap/dist/style.css';
</style>
