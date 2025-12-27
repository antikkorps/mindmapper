import { verifyToken } from '../utils/jwt.js'
import { User } from '../models/index.js'
import logger from '../config/logger.js'

/**
 * Authentication middleware
 * Verifies JWT token and attaches user to context
 */
export const authenticate = async (ctx, next) => {
  try {
    // Get token from Authorization header
    const authHeader = ctx.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      ctx.status = 401
      ctx.body = {
        success: false,
        error: 'Missing or invalid authorization header',
      }
      return
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix

    // Verify token
    const decoded = verifyToken(token)

    // Fetch user from database
    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ['password'] }, // Exclude password from response
    })

    if (!user) {
      ctx.status = 401
      ctx.body = {
        success: false,
        error: 'User not found',
      }
      return
    }

    // Attach user to context
    ctx.state.user = user

    await next()
  } catch (error) {
    logger.warn('Authentication failed', {
      error: error.message,
      url: ctx.url,
    })

    ctx.status = 401
    ctx.body = {
      success: false,
      error: error.message,
    }
  }
}

/**
 * Optional authentication middleware
 * Attaches user to context if token is present, but doesn't require it
 */
export const optionalAuth = async (ctx, next) => {
  try {
    const authHeader = ctx.headers.authorization

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7)
      const decoded = verifyToken(token)

      const user = await User.findByPk(decoded.id, {
        attributes: { exclude: ['password'] },
      })

      if (user) {
        ctx.state.user = user
      }
    }
  } catch (error) {
    // Silently fail for optional auth
    logger.debug('Optional auth failed', { error: error.message })
  }

  await next()
}
