import apiClient from './apiClient'

export const getNodesByMap = async mapId => {
  const response = await apiClient.get(`/maps/${mapId}/nodes`)
  // Backend returns { success: true, data: { ...map, nodes: [...] } }
  // We need to extract the nodes array
  return response.data.nodes || []
}

export const getNodeById = async id => {
  const response = await apiClient.get(`/nodes/${id}`)
  return response.data
}

export const createNode = async data => {
  const response = await apiClient.post('/nodes', data)
  return response.data
}

export const updateNode = async (id, data) => {
  const response = await apiClient.patch(`/nodes/${id}`, data)
  return response.data
}

export const deleteNode = async id => {
  const response = await apiClient.delete(`/nodes/${id}`)
  return response.data
}
