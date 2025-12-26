<template>
  <div class="h-screen flex flex-col">
    <!-- Toolbar -->
    <div class="navbar bg-base-200 shadow-lg">
      <div class="flex-1">
        <router-link to="/maps" class="btn btn-ghost btn-sm">
          ← Back
        </router-link>
        <input
          v-model="mapTitle"
          type="text"
          class="input input-ghost text-xl font-bold ml-4"
          @blur="updateMapTitle"
        />
      </div>
      <div class="flex-none gap-2">
        <button class="btn btn-sm btn-primary" @click="addNode">
          Add Node
        </button>
        <button class="btn btn-sm btn-ghost" @click="autoLayout">
          Auto Layout
        </button>
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
        @edge-update="onEdgeUpdate"
      >
        <Background />
        <Controls />
        <MiniMap />
      </VueFlow>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { VueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import { useNodesStore } from '@/stores/nodes'
import { useMapsStore } from '@/stores/maps'

const route = useRoute()
const nodesStore = useNodesStore()
const mapsStore = useMapsStore()

const mapId = route.params.id
const mapTitle = ref('')
const elements = ref([])

onMounted(async () => {
  await loadMap()
})

const loadMap = async () => {
  const map = await mapsStore.fetchMapById(mapId)
  mapTitle.value = map.title

  const nodes = await nodesStore.fetchNodesByMap(mapId)
  elements.value = nodesStore.convertToVueFlowFormat(nodes)
}

const addNode = async () => {
  const newNode = await nodesStore.createNode({
    mapId,
    label: 'New Node',
    posX: Math.random() * 500,
    posY: Math.random() * 500,
  })
  elements.value.push(newNode)
}

const onNodeDragStop = async event => {
  const { node } = event
  await nodesStore.updateNodePosition(node.id, {
    posX: node.position.x,
    posY: node.position.y,
  })
}

const onEdgeUpdate = async ({ edge, connection }) => {
  await nodesStore.updateNodeParent(connection.target, connection.source)
}

const updateMapTitle = async () => {
  await mapsStore.updateMap(mapId, { title: mapTitle.value })
}

const autoLayout = () => {
  // TODO: Implement Dagre auto-layout
  console.log('Auto layout - to be implemented')
}
</script>

<style>
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/core/dist/theme-default.css';
@import '@vue-flow/controls/dist/style.css';
@import '@vue-flow/minimap/dist/style.css';
</style>
