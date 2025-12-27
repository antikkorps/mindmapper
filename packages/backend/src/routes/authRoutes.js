import Router from '@koa/router'
import authController from '../controllers/authController.js'
import { validateBody } from '../middlewares/index.js'
import { createUserSchema, loginSchema } from '../validators/user.schema.js'
import { authenticate } from '../middlewares/auth.js'
import { authRateLimiter } from '../middlewares/rateLimiter.js'

const router = new Router({
  prefix: '/api/auth',
})

// Public routes with strict rate limiting
router.post('/register', authRateLimiter, validateBody(createUserSchema), authController.register)
router.post('/login', authRateLimiter, validateBody(loginSchema), authController.login)
router.post('/refresh', authRateLimiter, authController.refreshToken)

// Protected routes
router.get('/me', authenticate, authController.me)

export default router
