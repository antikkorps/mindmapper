import logger from '../config/logger.js'

/**
 * Request logging middleware using Winston
 * Logs all incoming requests with timing information
 */
const requestLogger = async (ctx, next) => {
  const start = Date.now()
  const { method, url, ip } = ctx

  try {
    await next()
  } finally {
    const duration = Date.now() - start
    const { status } = ctx

    // Determine log level based on status code
    let level = 'info'
    if (status >= 500) {
      level = 'error'
    } else if (status >= 400) {
      level = 'warn'
    }

    // Log the request
    logger[level](`${method} ${url}`, {
      status,
      duration: `${duration}ms`,
      ip,
      userAgent: ctx.get('user-agent'),
    })
  }
}

export default requestLogger
