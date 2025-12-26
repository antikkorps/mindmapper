import { ref } from 'vue'

/**
 * DRY composable: Reusable API call wrapper with loading and error states
 * @returns {Object} { loading, error, execute }
 */
export function useApiCall() {
  const loading = ref(false)
  const error = ref(null)

  const execute = async (apiFunc, ...args) => {
    loading.value = true
    error.value = null

    try {
      const result = await apiFunc(...args)
      return result
    } catch (e) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  const reset = () => {
    loading.value = false
    error.value = null
  }

  return {
    loading,
    error,
    execute,
    reset,
  }
}
