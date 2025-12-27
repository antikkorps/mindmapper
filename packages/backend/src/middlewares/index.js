/**
 * Middleware exports
 * Centralized export point for all middlewares (DRY principle)
 */
import errorHandler from './errorHandler.js'
import logger from './logger.js'
import {
  validateBody,
  validateQuery,
  validateParams,
} from './zodValidator.js'

export { errorHandler, logger, validateBody, validateQuery, validateParams }
