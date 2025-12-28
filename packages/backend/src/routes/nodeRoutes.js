import Router from '@koa/router'
import nodeController from '../controllers/nodeController.js'
import { validateBody, validateParams } from '../middlewares/index.js'
import {
  createNodeSchema,
  updateNodeSchema,
  updateNodePositionSchema,
  updateNodeLabelSchema,
  nodeIdSchema,
  nodesByMapSchema,
} from '../validators/node.schema.js'

const router = new Router({
  prefix: '/api/nodes',
})

router.get('/', nodeController.getAllNodes)
// Specific routes MUST come before generic /:id routes
router.get('/map/:mapId', validateParams(nodesByMapSchema), nodeController.getNodesByMap)
router.get('/:id', validateParams(nodeIdSchema), nodeController.getNodeById)
router.post('/', validateBody(createNodeSchema), nodeController.createNode)
router.put('/:id', validateParams(nodeIdSchema), validateBody(updateNodeSchema), nodeController.updateNode)
router.patch('/:id', validateParams(nodeIdSchema), validateBody(updateNodeSchema), nodeController.updateNode)
router.patch('/:id/position', validateParams(nodeIdSchema), validateBody(updateNodePositionSchema), nodeController.updateNodePosition)
router.patch('/:id/label', validateParams(nodeIdSchema), validateBody(updateNodeLabelSchema), nodeController.updateNodeLabel)
router.delete('/:id', validateParams(nodeIdSchema), nodeController.deleteNode)

export default router
