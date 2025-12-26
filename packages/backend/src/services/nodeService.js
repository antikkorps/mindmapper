import BaseService from './BaseService.js'
import { Node } from '../models/index.js'
import { Op } from 'sequelize'

/**
 * Node service
 * Handles node-related business logic
 */
class NodeService extends BaseService {
  constructor() {
    super(Node)
  }

  /**
   * Get all nodes for a specific map
   * @param {string} mapId - Map ID
   * @returns {Promise<Array>} Array of nodes
   */
  async getNodesByMap(mapId) {
    return this.findAll({ mapId })
  }

  /**
   * Get all children of a node
   * @param {string} parentId - Parent node ID
   * @returns {Promise<Array>} Array of child nodes
   */
  async getChildren(parentId) {
    return this.findAll({ parentId })
  }

  /**
   * Get full node tree for a map
   * @param {string} mapId - Map ID
   * @returns {Promise<Array>} Array of root nodes with nested children
   */
  async getNodeTree(mapId) {
    return this.findAll(
      { mapId },
      {
        include: [
          {
            model: Node,
            as: 'children',
            recursive: true,
          },
        ],
        order: [['createdAt', 'ASC']],
      }
    )
  }

  /**
   * Get a node with its parent
   * @param {string} nodeId - Node ID
   * @returns {Promise<Object|null>} Node with parent or null if not found
   */
  async getNodeWithParent(nodeId) {
    return this.model.findByPk(nodeId, {
      include: [
        {
          model: Node,
          as: 'parent',
        },
      ],
    })
  }

  /**
   * Update node position
   * @param {string} nodeId - Node ID
   * @param {number} posX - New X position
   * @param {number} posY - New Y position
   * @returns {Promise<number>} Number of affected rows
   */
  async updatePosition(nodeId, posX, posY) {
    return this.update(nodeId, { posX, posY })
  }

  /**
   * Update node label
   * @param {string} nodeId - Node ID
   * @param {string} label - New label
   * @returns {Promise<number>} Number of affected rows
   */
  async updateLabel(nodeId, label) {
    return this.update(nodeId, { label })
  }

  /**
   * Delete node and all its descendants (CASCADE)
   * @param {string} nodeId - Node ID
   * @returns {Promise<number>} Number of deleted rows
   */
  async deleteNodeTree(nodeId) {
    // Find all descendant nodes recursively
    const getAllDescendantIds = async id => {
      const children = await this.getChildren(id)
      let descendantIds = []

      for (const child of children) {
        descendantIds.push(child.id)
        descendantIds = descendantIds.concat(
          await getAllDescendantIds(child.id)
        )
      }

      return descendantIds
    }

    const descendantIds = await getAllDescendantIds(nodeId)
    const allIdsToDelete = [nodeId, ...descendantIds]

    return this.model.destroy({
      where: {
        id: {
          [Op.in]: allIdsToDelete,
        },
      },
    })
  }

  /**
   * Get root nodes (nodes without parent) for a map
   * @param {string} mapId - Map ID
   * @returns {Promise<Array>} Array of root nodes
   */
  async getRootNodes(mapId) {
    return this.findAll(
      {
        mapId,
        parentId: null,
      },
      {
        order: [['createdAt', 'ASC']],
      }
    )
  }
}

export default new NodeService()
