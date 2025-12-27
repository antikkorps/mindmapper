import { User } from '../models/index.js'
import { hashPassword, comparePassword } from '../utils/hash.js'
import { generateToken, generateRefreshToken } from '../utils/jwt.js'
import logger from '../config/logger.js'

/**
 * Authentication controller
 * Handles user registration, login, and token management
 */
const authController = {
  /**
   * Register a new user
   */
  async register(ctx) {
    try {
      const { username, email, password } = ctx.request.body

      // Check if user already exists
      const existingUser = await User.findOne({
        where: { email },
      })

      if (existingUser) {
        ctx.status = 409
        ctx.body = {
          success: false,
          error: 'User with this email already exists',
        }
        return
      }

      // Hash password
      const hashedPassword = await hashPassword(password)

      // Create user
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      })

      // Generate tokens
      const token = generateToken(user)
      const refreshToken = generateRefreshToken(user)

      logger.info('User registered successfully', {
        userId: user.id,
        email: user.email,
      })

      ctx.status = 201
      ctx.body = {
        success: true,
        data: {
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
          },
          token,
          refreshToken,
        },
      }
    } catch (error) {
      logger.error('Registration failed', { error: error.message })
      ctx.status = 400
      ctx.body = {
        success: false,
        error: error.message,
      }
    }
  },

  /**
   * Login user
   */
  async login(ctx) {
    try {
      const { email, password } = ctx.request.body

      // Find user by email
      const user = await User.findOne({
        where: { email },
      })

      if (!user) {
        ctx.status = 401
        ctx.body = {
          success: false,
          error: 'Invalid email or password',
        }
        return
      }

      // Verify password
      const isValidPassword = await comparePassword(password, user.password)

      if (!isValidPassword) {
        ctx.status = 401
        ctx.body = {
          success: false,
          error: 'Invalid email or password',
        }
        return
      }

      // Generate tokens
      const token = generateToken(user)
      const refreshToken = generateRefreshToken(user)

      logger.info('User logged in successfully', {
        userId: user.id,
        email: user.email,
      })

      ctx.body = {
        success: true,
        data: {
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
          },
          token,
          refreshToken,
        },
      }
    } catch (error) {
      logger.error('Login failed', { error: error.message })
      ctx.status = 500
      ctx.body = {
        success: false,
        error: error.message,
      }
    }
  },

  /**
   * Refresh access token
   */
  async refreshToken(ctx) {
    try {
      const { refreshToken } = ctx.request.body

      if (!refreshToken) {
        ctx.status = 400
        ctx.body = {
          success: false,
          error: 'Refresh token is required',
        }
        return
      }

      // Verify refresh token
      const { verifyToken } = await import('../utils/jwt.js')
      const decoded = verifyToken(refreshToken)

      // Find user
      const user = await User.findByPk(decoded.id)

      if (!user) {
        ctx.status = 401
        ctx.body = {
          success: false,
          error: 'User not found',
        }
        return
      }

      // Generate new access token
      const newToken = generateToken(user)

      ctx.body = {
        success: true,
        data: {
          token: newToken,
        },
      }
    } catch (error) {
      logger.error('Token refresh failed', { error: error.message })
      ctx.status = 401
      ctx.body = {
        success: false,
        error: 'Invalid or expired refresh token',
      }
    }
  },

  /**
   * Get current authenticated user
   */
  async me(ctx) {
    try {
      const user = ctx.state.user

      ctx.body = {
        success: true,
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt,
        },
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

export default authController
