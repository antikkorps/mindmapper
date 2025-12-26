import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import helmet from 'koa-helmet'

import config from './config/index.js'
import routes from './routes/index.js'
import { testConnection } from './config/database.js'

const app = new Koa()

app.use(helmet())

app.use(
  cors({
    origin: config.cors.origin,
    credentials: true,
  })
)

app.use(
  bodyParser({
    enableTypes: ['json', 'form'],
    jsonLimit: '10mb',
    formLimit: '10mb',
  })
)

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
  console.error('Server error:', err)
})

const startServer = async () => {
  try {
    await testConnection()
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`)
      console.log(`Environment: ${config.env}`)
      console.log(`API: http://localhost:${config.port}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()

export default app
