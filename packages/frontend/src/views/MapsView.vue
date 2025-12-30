<template>
  <div class="container mx-auto p-8">
    <!-- Header -->
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
    >
      <div>
        <h1 class="text-4xl font-bold">{{ $t('maps.title') }}</h1>
        <p class="text-base-content/70 mt-2">
          {{ $t('maps.count', { count: maps.length }) }}
        </p>
      </div>
      <button
        class="btn btn-primary gap-2"
        @click="createMap"
        :disabled="loading"
      >
        <span v-if="loading" class="loading loading-spinner loading-sm"></span>
        <span v-else>+</span>
        {{ $t('maps.newMap') }}
      </button>
    </div>

    <!-- Loading state -->
    <div
      v-if="loading && maps.length === 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
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
          <Inbox class="mx-auto text-base-content/20 mb-4" :size="96" />
          <h2 class="text-2xl font-bold mb-2">{{ $t('maps.empty.title') }}</h2>
          <p class="text-base-content/70 mb-6">
            {{ $t('maps.empty.description') }}
          </p>
          <button class="btn btn-primary gap-2" @click="createMap">
            <Plus :size="20" />
            {{ $t('maps.empty.button') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useMapsStore } from '@/stores/maps'
import { useToast } from '@/composables/useToast'
import MapCard from '@/components/MapCard.vue'
import { Inbox, Plus } from 'lucide-vue-next'

const router = useRouter()
const { t } = useI18n()
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
    toast.error(t('maps.messages.loadError'))
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
    toast.success(t('maps.messages.createSuccess'))
    router.push(`/maps/${newMap.id}`)
  } catch (error) {
    const toast = useToast()
    toast.error(t('maps.messages.createError'))
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
    toast.success(t('maps.messages.renameSuccess'))
  } catch (error) {
    const toast = useToast()
    toast.error(t('maps.messages.renameError'))
    console.error('Error updating map:', error)
  }
}

const deleteMap = async id => {
  if (!confirm(t('maps.messages.deleteConfirm'))) {
    return
  }

  try {
    await mapsStore.deleteMap(id)
    maps.value = mapsStore.maps
    const toast = useToast()
    toast.success(t('maps.messages.deleteSuccess'))
  } catch (error) {
    const toast = useToast()
    toast.error(t('maps.messages.deleteError'))
    console.error('Error deleting map:', error)
  }
}

const duplicateMap = async id => {
  const toast = useToast()
  toast.info(t('maps.messages.duplicateComing'))
  console.log('Duplicate map:', id)
}
</script>
