/**
 * Request validation middleware factory
 * Creates validation middleware for request body, query params, and route params
 */

/**
 * Validates request body against a schema
 * @param {Function} validationFn - Validation function that throws on invalid data
 * @returns {Function} Koa middleware
 */
export const validateBody = validationFn => {
  return async (ctx, next) => {
    try {
      validationFn(ctx.request.body)
      await next()
    } catch (error) {
      ctx.status = 400
      ctx.body = {
        success: false,
        error: {
          message: 'Validation failed',
          details: error.message,
        },
      }
    }
  }
}

/**
 * Validates query parameters against a schema
 * @param {Function} validationFn - Validation function that throws on invalid data
 * @returns {Function} Koa middleware
 */
export const validateQuery = validationFn => {
  return async (ctx, next) => {
    try {
      validationFn(ctx.query)
      await next()
    } catch (error) {
      ctx.status = 400
      ctx.body = {
        success: false,
        error: {
          message: 'Invalid query parameters',
          details: error.message,
        },
      }
    }
  }
}

/**
 * Validates route parameters against a schema
 * @param {Function} validationFn - Validation function that throws on invalid data
 * @returns {Function} Koa middleware
 */
export const validateParams = validationFn => {
  return async (ctx, next) => {
    try {
      validationFn(ctx.params)
      await next()
    } catch (error) {
      ctx.status = 400
      ctx.body = {
        success: false,
        error: {
          message: 'Invalid route parameters',
          details: error.message,
        },
      }
    }
  }
}

/**
 * Simple validation helpers
 */
export const validators = {
  /**
   * Validates that required fields exist
   * @param {Object} data - Data to validate
   * @param {Array<string>} fields - Required field names
   * @throws {Error} If any required field is missing
   */
  requireFields: (data, fields) => {
    const missingFields = fields.filter(field => !data[field])
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`)
    }
  },

  /**
   * Validates UUID format
   * @param {string} value - Value to validate
   * @param {string} fieldName - Field name for error message
   * @throws {Error} If value is not a valid UUID
   */
  isUUID: (value, fieldName = 'id') => {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(value)) {
      throw new Error(`Invalid UUID format for ${fieldName}`)
    }
  },

  /**
   * Validates number is positive
   * @param {number} value - Value to validate
   * @param {string} fieldName - Field name for error message
   * @throws {Error} If value is not a positive number
   */
  isPositive: (value, fieldName = 'value') => {
    if (typeof value !== 'number' || value < 0) {
      throw new Error(`${fieldName} must be a positive number`)
    }
  },

  /**
   * Validates string is not empty
   * @param {string} value - Value to validate
   * @param {string} fieldName - Field name for error message
   * @throws {Error} If value is empty
   */
  notEmpty: (value, fieldName = 'value') => {
    if (typeof value !== 'string' || value.trim().length === 0) {
      throw new Error(`${fieldName} cannot be empty`)
    }
  },
}
