import nodeService from '../services/nodeService.js'

/**
 * Node controller
 * Handles HTTP requests for node operations
 */
const nodeController = {
  /**
   * Get all nodes
   */
  async getAllNodes(ctx) {
    try {
      const nodes = await nodeService.findAll()
      ctx.body = {
        success: true,
        data: nodes,
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
   * Get node by ID
   */
  async getNodeById(ctx) {
    try {
      const { id } = ctx.params
      const node = await nodeService.findById(id)

      if (!node) {
        ctx.status = 404
        ctx.body = {
          success: false,
          error: 'Node not found',
        }
        return
      }

      ctx.body = {
        success: true,
        data: node,
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
   * Create a new node
   */
  async createNode(ctx) {
    try {
      const {
        label,
        posX,
        posY,
        parentId,
        mapId,
        styleColor,
        styleShape,
        styleType,
        textRotation,
      } = ctx.request.body

      if (!mapId) {
        ctx.status = 400
        ctx.body = {
          success: false,
          error: 'Missing required field: mapId',
        }
        return
      }

      const node = await nodeService.create({
        label: label || 'New Node',
        posX: posX ?? 0,
        posY: posY ?? 0,
        parentId: parentId || null,
        mapId,
        styleColor: styleColor || 'neutral',
        styleShape: styleShape || 'rounded',
        styleType: styleType || 'solid',
        textRotation: textRotation || 'horizontal',
      })

      ctx.status = 201
      ctx.body = {
        success: true,
        data: node,
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
   * Update node
   */
  async updateNode(ctx) {
    try {
      const { id } = ctx.params
      const {
        label,
        posX,
        posY,
        parentId,
        styleColor,
        styleShape,
        styleType,
        textRotation,
      } = ctx.request.body

      const nodeExists = await nodeService.exists(id)
      if (!nodeExists) {
        ctx.status = 404
        ctx.body = {
          success: false,
          error: 'Node not found',
        }
        return
      }

      const updateData = {}
      if (label !== undefined) updateData.label = label
      if (posX !== undefined) updateData.posX = posX
      if (posY !== undefined) updateData.posY = posY
      if (parentId !== undefined) updateData.parentId = parentId
      if (styleColor !== undefined) updateData.styleColor = styleColor
      if (styleShape !== undefined) updateData.styleShape = styleShape
      if (styleType !== undefined) updateData.styleType = styleType
      if (textRotation !== undefined) updateData.textRotation = textRotation

      const affectedCount = await nodeService.update(id, updateData)

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
   * Delete node
   */
  async deleteNode(ctx) {
    try {
      const { id } = ctx.params

      const nodeExists = await nodeService.exists(id)
      if (!nodeExists) {
        ctx.status = 404
        ctx.body = {
          success: false,
          error: 'Node not found',
        }
        return
      }

      await nodeService.deleteNodeTree(id)

      ctx.body = {
        success: true,
        message: 'Node deleted successfully',
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
   * Get all nodes for a map
   */
  async getNodesByMap(ctx) {
    try {
      const { mapId } = ctx.params
      const nodes = await nodeService.getNodesByMap(mapId)

      ctx.body = {
        success: true,
        data: nodes,
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
   * Update node position
   */
  async updateNodePosition(ctx) {
    try {
      const { id } = ctx.params
      const { posX, posY } = ctx.request.body

      if (posX === undefined || posY === undefined) {
        ctx.status = 400
        ctx.body = {
          success: false,
          error: 'Missing required fields: posX, posY',
        }
        return
      }

      const affectedCount = await nodeService.updatePosition(id, posX, posY)

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
   * Update node label
   */
  async updateNodeLabel(ctx) {
    try {
      const { id } = ctx.params
      const { label } = ctx.request.body

      if (!label) {
        ctx.status = 400
        ctx.body = {
          success: false,
          error: 'Missing required field: label',
        }
        return
      }

      const affectedCount = await nodeService.updateLabel(id, label)

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
}

export default nodeController
