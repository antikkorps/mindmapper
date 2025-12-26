import BaseService from './BaseService.js'
import { User } from '../models/index.js'

/**
 * User service
 * Handles user-related business logic
 */
class UserService extends BaseService {
  constructor() {
    super(User)
  }

  /**
   * Find user by email
   * @param {string} email - User email
   * @returns {Promise<Object|null>} User or null if not found
   */
  async findByEmail(email) {
    return this.model.findOne({
      where: { email },
    })
  }

  /**
   * Find user by username
   * @param {string} username - Username
   * @returns {Promise<Object|null>} User or null if not found
   */
  async findByUsername(username) {
    return this.model.findOne({
      where: { username },
    })
  }

  /**
   * Get user with all their maps
   * @param {string} userId - User ID
   * @returns {Promise<Object|null>} User with maps or null if not found
   */
  async getUserWithMaps(userId) {
    return this.model.findByPk(userId, {
      include: [
        {
          model: (await import('../models/Map.js')).default,
          as: 'maps',
        },
      ],
    })
  }
}

export default new UserService()
