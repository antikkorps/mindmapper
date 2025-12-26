<template>
  <div class="container mx-auto p-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-4xl font-bold">My Mind Maps</h1>
      <button class="btn btn-primary" @click="createMap">
        <span class="mr-2">+</span> New Map
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="map in maps"
        :key="map.id"
        class="card-mindmap cursor-pointer"
        @click="openMap(map.id)"
      >
        <div class="card-body">
          <h2 class="card-title">{{ map.title }}</h2>
          <p class="text-sm text-base-content/70">
            Updated {{ formatDate(map.updatedAt) }}
          </p>
        </div>
      </div>

      <div v-if="maps.length === 0" class="col-span-full text-center py-12">
        <p class="text-xl text-base-content/50">
          No maps yet. Create your first one!
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMapsStore } from '@/stores/maps'

const router = useRouter()
const mapsStore = useMapsStore()
const maps = ref([])

onMounted(async () => {
  await mapsStore.fetchMaps()
  maps.value = mapsStore.maps
})

const createMap = async () => {
  const newMap = await mapsStore.createMap('Untitled Map')
  router.push(`/maps/${newMap.id}`)
}

const openMap = id => {
  router.push(`/maps/${id}`)
}

const formatDate = date => {
  return new Date(date).toLocaleDateString()
}
</script>
