import apiClient from './apiClient'

export const getMaps = async (userId) => {
  // If userId provided, get user-specific maps, otherwise get all
  const endpoint = userId ? `/maps/user/${userId}` : '/maps'
  const response = await apiClient.get(endpoint)
  return response.data
}

export const getMapById = async id => {
  const response = await apiClient.get(`/maps/${id}`)
  return response.data
}

export const createMap = async data => {
  const response = await apiClient.post('/maps', data)
  return response.data
}

export const updateMap = async (id, data) => {
  const response = await apiClient.patch(`/maps/${id}`, data)
  return response.data
}

export const deleteMap = async id => {
  const response = await apiClient.delete(`/maps/${id}`)
  return response.data
}
