import logger from '../config/logger.js'

/**
 * Global error handling middleware
 * Catches all errors thrown in the application and returns a consistent error response
 */
const errorHandler = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    // Log the error using Winston
    logger.error('Error occurred', {
      message: err.message,
      stack: err.stack,
      status: err.status || 500,
      url: ctx.url,
      method: ctx.method,
    })

    // Determine error status code
    ctx.status = err.status || err.statusCode || 500

    // Format error response
    ctx.body = {
      success: false,
      error: {
        message: err.message || 'Internal Server Error',
        status: ctx.status,
        ...(process.env.NODE_ENV === 'development' && {
          stack: err.stack,
          details: err.details,
        }),
      },
    }

    // Emit error event for app-level error handling
    ctx.app.emit('error', err, ctx)
  }
}

export default errorHandler
