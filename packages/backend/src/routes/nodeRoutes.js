import Router from '@koa/router'
import nodeController from '../controllers/nodeController.js'

const router = new Router({
  prefix: '/api/nodes',
})

router.get('/', nodeController.getAllNodes)
router.get('/:id', nodeController.getNodeById)
router.get('/map/:mapId', nodeController.getNodesByMap)
router.post('/', nodeController.createNode)
router.put('/:id', nodeController.updateNode)
router.patch('/:id/position', nodeController.updateNodePosition)
router.patch('/:id/label', nodeController.updateNodeLabel)
router.delete('/:id', nodeController.deleteNode)

export default router
