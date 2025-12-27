import Router from '@koa/router'
import docsRoutes from './docsRoutes.js'
import authRoutes from './authRoutes.js'
import userRoutes from './userRoutes.js'
import mapRoutes from './mapRoutes.js'
import nodeRoutes from './nodeRoutes.js'

const router = new Router()

// API Documentation
router.use(docsRoutes.routes())
router.use(docsRoutes.allowedMethods())

// Auth routes (public)
router.use(authRoutes.routes())
router.use(authRoutes.allowedMethods())

// Resource routes
router.use(userRoutes.routes())
router.use(userRoutes.allowedMethods())

router.use(mapRoutes.routes())
router.use(mapRoutes.allowedMethods())

router.use(nodeRoutes.routes())
router.use(nodeRoutes.allowedMethods())

export default router
