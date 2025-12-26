import Router from '@koa/router'
import mapController from '../controllers/mapController.js'

const router = new Router({
  prefix: '/api/maps',
})

router.get('/', mapController.getAllMaps)
router.get('/:id', mapController.getMapById)
router.get('/:id/nodes', mapController.getMapWithNodes)
router.get('/user/:userId', mapController.getMapsByUser)
router.post('/', mapController.createMap)
router.put('/:id', mapController.updateMap)
router.delete('/:id', mapController.deleteMap)

export default router
