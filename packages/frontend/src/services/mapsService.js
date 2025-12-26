import apiClient from './apiClient'

export const getMaps = async () => {
  return apiClient.get('/maps')
}

export const getMapById = async id => {
  return apiClient.get(`/maps/${id}`)
}

export const createMap = async data => {
  return apiClient.post('/maps', data)
}

export const updateMap = async (id, data) => {
  return apiClient.patch(`/maps/${id}`, data)
}

export const deleteMap = async id => {
  return apiClient.delete(`/maps/${id}`)
}
