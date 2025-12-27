import Router from '@koa/router'
import { koaSwagger } from 'koa2-swagger-ui'
import { swaggerSpec } from '../config/swagger.js'

const router = new Router()

// Serve Swagger JSON
router.get('/api-docs.json', async (ctx) => {
  ctx.body = swaggerSpec
})

// Serve Swagger UI
router.get(
  '/api-docs',
  koaSwagger({
    routePrefix: false,
    swaggerOptions: {
      url: '/api-docs.json',
    },
  })
)

export default router
