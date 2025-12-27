import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import helmet from 'koa-helmet'

import config from './config/index.js'
import routes from './routes/index.js'
import { testConnection } from './config/database.js'
import { errorHandler, logger as requestLogger } from './middlewares/index.js'
import { apiRateLimiter } from './middlewares/rateLimiter.js'
import logger from './config/logger.js'

const app = new Koa()

// Error handling middleware (must be first)
app.use(errorHandler)

// Request logging middleware
app.use(requestLogger)

// Global rate limiting (applied to all routes except auth which has its own)
// Exclude auth routes from global rate limiter
app.use(async (ctx, next) => {
  if (ctx.path.startsWith('/api/auth')) {
    // Auth routes have their own strict rate limiter
    await next()
  } else {
    // Apply global rate limiter to other routes
    await apiRateLimiter(ctx, next)
  }
})

// Security middleware
app.use(helmet())

// CORS middleware
app.use(
  cors({
    origin: config.cors.origin,
    credentials: true,
  })
)

// Body parser middleware
app.use(
  bodyParser({
    enableTypes: ['json', 'form'],
    jsonLimit: '10mb',
    formLimit: '10mb',
  })
)

// Routes
app.use(routes.routes())
app.use(routes.allowedMethods())

app.use(async ctx => {
  ctx.status = 404
  ctx.body = {
    success: false,
    error: 'Route not found',
  }
})

app.on('error', err => {
  logger.error('Server error:', err)
})

const startServer = async () => {
  try {
    await testConnection()
    app.listen(config.port, () => {
      logger.info(`Server running on port ${config.port}`)
      logger.info(`Environment: ${config.env}`)
      logger.info(`API: http://localhost:${config.port}`)
    })
  } catch (error) {
    logger.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()

export default app
