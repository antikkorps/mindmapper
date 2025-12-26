const API_BASE_URL = '/api'
const DEFAULT_TIMEOUT = 10000

class ApiClient {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const token = localStorage.getItem('auth_token')

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    }

    // Timeout implementation
    const controller = new AbortController()
    const timeoutId = setTimeout(
      () => controller.abort(),
      options.timeout || DEFAULT_TIMEOUT
    )
    config.signal = controller.signal

    try {
      const response = await fetch(url, config)

      clearTimeout(timeoutId)

      // Handle non-2xx responses
      if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        const message = error.message || `HTTP Error ${response.status}`

        // Handle 401 Unauthorized
        if (response.status === 401) {
          localStorage.removeItem('auth_token')
          window.location.href = '/login'
        }

        throw new Error(message)
      }

      // Parse JSON response
      return await response.json()
    } catch (error) {
      clearTimeout(timeoutId)

      if (error.name === 'AbortError') {
        throw new Error('Request timeout')
      }

      throw error
    }
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' })
  }

  post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  patch(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  delete(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' })
  }
}

export default new ApiClient()
