import apiClient from './apiClient'

export const getNodesByMap = async mapId => {
  return apiClient.get(`/maps/${mapId}/nodes`)
}

export const getNodeById = async id => {
  return apiClient.get(`/nodes/${id}`)
}

export const createNode = async data => {
  return apiClient.post('/nodes', data)
}

export const updateNode = async (id, data) => {
  return apiClient.patch(`/nodes/${id}`, data)
}

export const deleteNode = async id => {
  return apiClient.delete(`/nodes/${id}`)
}
