import Router from '@koa/router'
import mapController from '../controllers/mapController.js'
import { validateBody, validateParams } from '../middlewares/index.js'
import {
  createMapSchema,
  updateMapSchema,
  mapIdSchema,
  mapsByUserSchema,
} from '../validators/map.schema.js'

const router = new Router({
  prefix: '/api/maps',
})

router.get('/', mapController.getAllMaps)
// Specific routes MUST come before generic /:id routes
router.get('/user/:userId', validateParams(mapsByUserSchema), mapController.getMapsByUser)
router.get('/:id/nodes', validateParams(mapIdSchema), mapController.getMapWithNodes)
router.get('/:id', validateParams(mapIdSchema), mapController.getMapById)
router.post('/', validateBody(createMapSchema), mapController.createMap)
router.patch('/:id', validateParams(mapIdSchema), validateBody(updateMapSchema), mapController.updateMap)
router.delete('/:id', validateParams(mapIdSchema), mapController.deleteMap)

export default router
