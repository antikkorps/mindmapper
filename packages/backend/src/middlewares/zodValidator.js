import { ZodError } from 'zod'
import logger from '../config/logger.js'

/**
 * Zod validation middleware factory
 * Creates validation middleware for request body, query params, and route params
 */

/**
 * Validates request body against a Zod schema
 * @param {ZodSchema} schema - Zod schema to validate against
 * @returns {Function} Koa middleware
 */
export const validateBody = schema => {
  return async (ctx, next) => {
    try {
      const validated = schema.parse(ctx.request.body)
      ctx.request.body = validated // Replace with validated data
      await next()
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.issues.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        }))

        ctx.status = 400
        ctx.body = {
          success: false,
          error: {
            message: 'Validation failed',
            details: formattedErrors,
          },
        }
        logger.warn('Validation failed', {
          url: ctx.url,
          method: ctx.method,
          errors: formattedErrors,
        })
      } else {
        throw error
      }
    }
  }
}

/**
 * Validates query parameters against a Zod schema
 * @param {ZodSchema} schema - Zod schema to validate against
 * @returns {Function} Koa middleware
 */
export const validateQuery = schema => {
  return async (ctx, next) => {
    try {
      const validated = schema.parse(ctx.query)
      ctx.query = validated
      await next()
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.issues.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        }))

        ctx.status = 400
        ctx.body = {
          success: false,
          error: {
            message: 'Invalid query parameters',
            details: formattedErrors,
          },
        }
        logger.warn('Query validation failed', {
          url: ctx.url,
          method: ctx.method,
          errors: formattedErrors,
        })
      } else {
        throw error
      }
    }
  }
}

/**
 * Validates route parameters against a Zod schema
 * @param {ZodSchema} schema - Zod schema to validate against
 * @returns {Function} Koa middleware
 */
export const validateParams = schema => {
  return async (ctx, next) => {
    try {
      const validated = schema.parse(ctx.params)
      ctx.params = validated
      await next()
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.issues.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        }))

        ctx.status = 400
        ctx.body = {
          success: false,
          error: {
            message: 'Invalid route parameters',
            details: formattedErrors,
          },
        }
        logger.warn('Route params validation failed', {
          url: ctx.url,
          method: ctx.method,
          errors: formattedErrors,
        })
      } else {
        throw error
      }
    }
  }
}
