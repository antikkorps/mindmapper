import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as nodesService from '@/services/nodesService'

export const useNodesStore = defineStore('nodes', () => {
  const nodes = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchNodesByMap = async mapId => {
    loading.value = true
    error.value = null
    try {
      nodes.value = await nodesService.getNodesByMap(mapId)
      return nodes.value
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  const createNode = async nodeData => {
    loading.value = true
    error.value = null
    try {
      const newNode = await nodesService.createNode(nodeData)
      nodes.value.push(newNode)
      return convertNodeToVueFlow(newNode)
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  const updateNode = async (id, data) => {
    loading.value = true
    error.value = null
    try {
      const updated = await nodesService.updateNode(id, data)
      const index = nodes.value.findIndex(n => n.id === id)
      if (index !== -1) {
        nodes.value[index] = updated
      }
      return updated
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  const updateNodePosition = async (id, position) => {
    // Optimistic update
    const index = nodes.value.findIndex(n => n.id === id)
    if (index !== -1) {
      nodes.value[index].posX = position.posX
      nodes.value[index].posY = position.posY
    }

    // Debounced API call
    return updateNode(id, position)
  }

  const updateNodeParent = async (nodeId, parentId) => {
    return updateNode(nodeId, { parentId })
  }

  const deleteNode = async id => {
    loading.value = true
    error.value = null
    try {
      await nodesService.deleteNode(id)
      nodes.value = nodes.value.filter(n => n.id !== id)
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  // DRY: Convert database nodes to Vue Flow format
  const convertToVueFlowFormat = dbNodes => {
    const vueFlowNodes = dbNodes.map(convertNodeToVueFlow)
    const vueFlowEdges = dbNodes
      .filter(node => node.parentId)
      .map(node => ({
        id: `e${node.parentId}-${node.id}`,
        source: node.parentId,
        target: node.id,
        type: 'smoothstep',
        style: {
          strokeWidth: 2,
          stroke: '#94a3b8',
          fill: 'none',
        },
      }))

    return [...vueFlowNodes, ...vueFlowEdges]
  }

  const convertNodeToVueFlow = node => ({
    id: node.id,
    type: 'custom',
    position: { x: node.posX, y: node.posY },
    data: {
      label: node.label,
      style: {
        color: node.styleColor || 'neutral',
        shape: node.styleShape || 'rounded',
        style: node.styleType || 'solid',
        textRotation: node.textRotation || 'horizontal',
      },
    },
  })

  return {
    nodes,
    loading,
    error,
    fetchNodesByMap,
    createNode,
    updateNode,
    updateNodePosition,
    updateNodeParent,
    deleteNode,
    convertToVueFlowFormat,
  }
})
