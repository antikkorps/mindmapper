import userService from '../services/userService.js'

/**
 * User controller
 * Handles HTTP requests for user operations
 */
const userController = {
  /**
   * Get all users
   */
  async getAllUsers(ctx) {
    try {
      const users = await userService.findAll()
      ctx.body = {
        success: true,
        data: users,
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
   * Get user by ID
   */
  async getUserById(ctx) {
    try {
      const { id } = ctx.params
      const user = await userService.findById(id)

      if (!user) {
        ctx.status = 404
        ctx.body = {
          success: false,
          error: 'User not found',
        }
        return
      }

      ctx.body = {
        success: true,
        data: user,
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
   * Create a new user
   */
  async createUser(ctx) {
    try {
      const { username, email, password } = ctx.request.body

      if (!username || !email || !password) {
        ctx.status = 400
        ctx.body = {
          success: false,
          error: 'Missing required fields: username, email, password',
        }
        return
      }

      const user = await userService.create({
        username,
        email,
        password,
      })

      ctx.status = 201
      ctx.body = {
        success: true,
        data: user,
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
   * Update user
   */
  async updateUser(ctx) {
    try {
      const { id } = ctx.params
      const { username, email } = ctx.request.body

      const userExists = await userService.exists(id)
      if (!userExists) {
        ctx.status = 404
        ctx.body = {
          success: false,
          error: 'User not found',
        }
        return
      }

      const affectedCount = await userService.update(id, {
        username,
        email,
      })

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
   * Delete user
   */
  async deleteUser(ctx) {
    try {
      const { id } = ctx.params

      const userExists = await userService.exists(id)
      if (!userExists) {
        ctx.status = 404
        ctx.body = {
          success: false,
          error: 'User not found',
        }
        return
      }

      await userService.delete(id)

      ctx.body = {
        success: true,
        message: 'User deleted successfully',
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
   * Get user with their maps
   */
  async getUserWithMaps(ctx) {
    try {
      const { id } = ctx.params
      const user = await userService.getUserWithMaps(id)

      if (!user) {
        ctx.status = 404
        ctx.body = {
          success: false,
          error: 'User not found',
        }
        return
      }

      ctx.body = {
        success: true,
        data: user,
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

export default userController
