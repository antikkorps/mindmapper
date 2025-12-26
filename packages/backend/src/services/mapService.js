import BaseService from './BaseService.js'
import { Map } from '../models/index.js'

/**
 * Map service
 * Handles mindmap-related business logic
 */
class MapService extends BaseService {
  constructor() {
    super(Map)
  }

  /**
   * Get all maps for a user
   * @param {string} userId - User ID
   * @returns {Promise<Array>} Array of maps
   */
  async getMapsByUser(userId) {
    return this.findAll({ userId })
  }

  /**
   * Get map with all its nodes
   * @param {string} mapId - Map ID
   * @returns {Promise<Object|null>} Map with nodes or null if not found
   */
  async getMapWithNodes(mapId) {
    return this.model.findByPk(mapId, {
      include: [
        {
          model: (await import('../models/Node.js')).default,
          as: 'nodes',
        },
      ],
    })
  }

  /**
   * Check if user owns the map
   * @param {string} mapId - Map ID
   * @param {string} userId - User ID
   * @returns {Promise<boolean>} True if user owns the map
   */
  async isOwner(mapId, userId) {
    const map = await this.findById(mapId)
    return map && map.userId === userId
  }
}

export default new MapService()
