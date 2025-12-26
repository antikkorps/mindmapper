import Router from '@koa/router'
import userRoutes from './userRoutes.js'
import mapRoutes from './mapRoutes.js'
import nodeRoutes from './nodeRoutes.js'

const router = new Router()

router.use(userRoutes.routes())
router.use(userRoutes.allowedMethods())

router.use(mapRoutes.routes())
router.use(mapRoutes.allowedMethods())

router.use(nodeRoutes.routes())
router.use(nodeRoutes.allowedMethods())

export default router
