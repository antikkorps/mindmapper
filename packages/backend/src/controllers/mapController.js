import mapService from '../services/mapService.js'

/**
 * Map controller
 * Handles HTTP requests for mindmap operations
 */
const mapController = {
  /**
   * Get all maps
   */
  async getAllMaps(ctx) {
    try {
      const maps = await mapService.findAll()
      ctx.body = {
        success: true,
        data: maps,
      }
    } catch (error) {
      ctx.status = 500
      ctx.body = {
        success: false,
        error: error.message,
      }
    }
  },

  /**
   * Get map by ID
   */
  async getMapById(ctx) {
    try {
      const { id } = ctx.params
      const map = await mapService.findById(id)

      if (!map) {
        ctx.status = 404
        ctx.body = {
          success: false,
          error: 'Map not found',
        }
        return
      }

      ctx.body = {
        success: true,
        data: map,
      }
    } catch (error) {
      ctx.status = 500
      ctx.body = {
        success: false,
        error: error.message,
      }
    }
  },

  /**
   * Create a new map
   */
  async createMap(ctx) {
    try {
      const { title, userId } = ctx.request.body

      if (!userId) {
        ctx.status = 400
        ctx.body = {
          success: false,
          error: 'Missing required field: userId',
        }
        return
      }

      const map = await mapService.create({
        title: title || 'Untitled Mindmap',
        userId,
      })

      ctx.status = 201
      ctx.body = {
        success: true,
        data: map,
      }
    } catch (error) {
      ctx.status = 400
      ctx.body = {
        success: false,
        error: error.message,
      }
    }
  },

  /**
   * Update map
   */
  async updateMap(ctx) {
    try {
      const { id } = ctx.params
      const { title } = ctx.request.body

      const mapExists = await mapService.exists(id)
      if (!mapExists) {
        ctx.status = 404
        ctx.body = {
          success: false,
          error: 'Map not found',
        }
        return
      }

      const affectedCount = await mapService.update(id, { title })

      ctx.body = {
        success: true,
        data: { affectedCount },
      }
    } catch (error) {
      ctx.status = 400
      ctx.body = {
        success: false,
        error: error.message,
      }
    }
  },

  /**
   * Delete map
   */
  async deleteMap(ctx) {
    try {
      const { id } = ctx.params

      const mapExists = await mapService.exists(id)
      if (!mapExists) {
        ctx.status = 404
        ctx.body = {
          success: false,
          error: 'Map not found',
        }
        return
      }

      await mapService.delete(id)

      ctx.body = {
        success: true,
        message: 'Map deleted successfully',
      }
    } catch (error) {
      ctx.status = 500
      ctx.body = {
        success: false,
        error: error.message,
      }
    }
  },

  /**
   * Get all maps for a user
   */
  async getMapsByUser(ctx) {
    try {
      const { userId } = ctx.params
      const maps = await mapService.getMapsByUser(userId)

      ctx.body = {
        success: true,
        data: maps,
      }
    } catch (error) {
      ctx.status = 500
      ctx.body = {
        success: false,
        error: error.message,
      }
    }
  },

  /**
   * Get map with all its nodes
   */
  async getMapWithNodes(ctx) {
    try {
      const { id } = ctx.params
      const map = await mapService.getMapWithNodes(id)

      if (!map) {
        ctx.status = 404
        ctx.body = {
          success: false,
          error: 'Map not found',
        }
        return
      }

      ctx.body = {
        success: true,
        data: map,
      }
    } catch (error) {
      ctx.status = 500
      ctx.body = {
        success: false,
        error: error.message,
      }
    }
  },
}

export default mapController
