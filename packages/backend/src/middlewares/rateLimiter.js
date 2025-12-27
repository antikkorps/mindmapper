import ratelimit from 'koa-ratelimit'
import logger from '../config/logger.js'

/**
 * In-memory storage for rate limiting
 * For production, use Redis
 */
const db = new Map()

/**
 * Rate limiter configuration
 */
export const createRateLimiter = (options = {}) => {
  const defaults = {
    driver: 'memory',
    db,
    duration: 60000, // 1 minute
    errorMessage: 'Too many requests, please try again later.',
    id: (ctx) => ctx.ip,
    headers: {
      remaining: 'Rate-Limit-Remaining',
      reset: 'Rate-Limit-Reset',
      total: 'Rate-Limit-Total',
    },
    max: 100, // 100 requests per minute
    disableHeader: false,
    whitelist: (ctx) => {
      // Whitelist certain IPs or endpoints if needed
      return false
    },
    blacklist: (ctx) => {
      // Blacklist certain IPs if needed
      return false
    },
  }

  return ratelimit({
    ...defaults,
    ...options,
  })
}

/**
 * Strict rate limiter for auth endpoints
 * 5 requests per minute to prevent brute force
 */
export const authRateLimiter = createRateLimiter({
  max: 5,
  duration: 60000,
  errorMessage: 'Too many authentication attempts, please try again later.',
  id: (ctx) => {
    // Rate limit by IP + email if present in request body
    const email = ctx.request.body?.email
    return email ? `${ctx.ip}:${email}` : ctx.ip
  },
})

/**
 * Standard rate limiter for API endpoints
 * 100 requests per minute
 */
export const apiRateLimiter = createRateLimiter({
  max: 100,
  duration: 60000,
})

/**
 * Lenient rate limiter for read operations
 * 200 requests per minute
 */
export const readRateLimiter = createRateLimiter({
  max: 200,
  duration: 60000,
})

/**
 * Custom rate limit handler with Winston logging
 */
export const rateLimitHandler = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    if (error.status === 429) {
      logger.warn('Rate limit exceeded', {
        ip: ctx.ip,
        url: ctx.url,
        method: ctx.method,
      })
    }
    throw error
  }
}
