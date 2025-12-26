import { defineStore } from 'pinia'
import { ref } from 'vue'
import * as mapsService from '@/services/mapsService'

export const useMapsStore = defineStore('maps', () => {
  const maps = ref([])
  const currentMap = ref(null)
  const loading = ref(false)
  const error = ref(null)

  const fetchMaps = async () => {
    loading.value = true
    error.value = null
    try {
      maps.value = await mapsService.getMaps()
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  const fetchMapById = async id => {
    loading.value = true
    error.value = null
    try {
      currentMap.value = await mapsService.getMapById(id)
      return currentMap.value
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  const createMap = async title => {
    loading.value = true
    error.value = null
    try {
      const newMap = await mapsService.createMap({ title })
      maps.value.push(newMap)
      return newMap
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  const updateMap = async (id, data) => {
    loading.value = true
    error.value = null
    try {
      const updated = await mapsService.updateMap(id, data)
      const index = maps.value.findIndex(m => m.id === id)
      if (index !== -1) {
        maps.value[index] = updated
      }
      if (currentMap.value?.id === id) {
        currentMap.value = updated
      }
      return updated
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  const deleteMap = async id => {
    loading.value = true
    error.value = null
    try {
      await mapsService.deleteMap(id)
      maps.value = maps.value.filter(m => m.id !== id)
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    maps,
    currentMap,
    loading,
    error,
    fetchMaps,
    fetchMapById,
    createMap,
    updateMap,
    deleteMap,
  }
})
