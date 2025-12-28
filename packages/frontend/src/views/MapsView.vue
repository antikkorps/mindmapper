<template>
  <div class="container mx-auto p-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <div>
        <h1 class="text-4xl font-bold">My Mind Maps</h1>
        <p class="text-base-content/70 mt-2">
          {{ maps.length }} {{ maps.length === 1 ? 'map' : 'maps' }}
        </p>
      </div>
      <button class="btn btn-primary gap-2" @click="createMap" :disabled="loading">
        <span v-if="loading" class="loading loading-spinner loading-sm"></span>
        <span v-else>+</span>
        New Map
      </button>
    </div>

    <!-- Loading state -->
    <div v-if="loading && maps.length === 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="i in 6" :key="i" class="skeleton h-48"></div>
    </div>

    <!-- Maps grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <MapCard
        v-for="map in maps"
        :key="map.id"
        :map="map"
        @open="openMap"
        @update="updateMap"
        @delete="deleteMap"
        @duplicate="duplicateMap"
      />

      <!-- Empty state -->
      <div v-if="maps.length === 0" class="col-span-full text-center py-20">
        <div class="max-w-md mx-auto">
          <svg
            class="w-24 h-24 mx-auto text-base-content/20 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h2 class="text-2xl font-bold mb-2">No mind maps yet</h2>
          <p class="text-base-content/70 mb-6">
            Create your first mind map to get started
          </p>
          <button class="btn btn-primary" @click="createMap">
            Create your first map
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMapsStore } from '@/stores/maps'
import { useToast } from '@/composables/useToast'
import MapCard from '@/components/MapCard.vue'

const router = useRouter()
const mapsStore = useMapsStore()

const maps = ref([])
const loading = ref(false)

onMounted(async () => {
  await loadMaps()
})

const loadMaps = async () => {
  loading.value = true
  try {
    await mapsStore.fetchMaps()
    maps.value = mapsStore.maps
  } catch (error) {
    const toast = useToast()
    toast.error('Failed to load maps')
    console.error('Error loading maps:', error)
  } finally {
    loading.value = false
  }
}

const createMap = async () => {
  loading.value = true
  try {
    const newMap = await mapsStore.createMap('Untitled Map')
    maps.value = mapsStore.maps
    const toast = useToast()
    toast.success('Map created successfully')
    router.push(`/maps/${newMap.id}`)
  } catch (error) {
    const toast = useToast()
    toast.error('Failed to create map')
    console.error('Error creating map:', error)
  } finally {
    loading.value = false
  }
}

const openMap = id => {
  router.push(`/maps/${id}`)
}

const updateMap = async ({ id, title }) => {
  try {
    await mapsStore.updateMap(id, { title })
    maps.value = mapsStore.maps
    const toast = useToast()
    toast.success('Map renamed')
  } catch (error) {
    const toast = useToast()
    toast.error('Failed to rename map')
    console.error('Error updating map:', error)
  }
}

const deleteMap = async id => {
  // Confirm deletion with DaisyUI modal would be better, but for now use confirm
  if (!confirm('Are you sure you want to delete this map? This action cannot be undone.')) {
    return
  }

  try {
    await mapsStore.deleteMap(id)
    maps.value = mapsStore.maps
    const toast = useToast()
    toast.success('Map deleted')
  } catch (error) {
    const toast = useToast()
    toast.error('Failed to delete map')
    console.error('Error deleting map:', error)
  }
}

const duplicateMap = async id => {
  // TODO: Implement duplicate functionality in backend
  const toast = useToast()
  toast.info('Duplicate feature coming soon!')
  console.log('Duplicate map:', id)
}
</script>
