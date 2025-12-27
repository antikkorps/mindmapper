import Router from '@koa/router'
import userController from '../controllers/userController.js'
import { validateBody, validateParams } from '../middlewares/index.js'
import {
  createUserSchema,
  updateUserSchema,
  userIdSchema,
} from '../validators/user.schema.js'

const router = new Router({
  prefix: '/api/users',
})

router.get('/', userController.getAllUsers)
router.get('/:id', validateParams(userIdSchema), userController.getUserById)
router.get('/:id/maps', validateParams(userIdSchema), userController.getUserWithMaps)
router.post('/', validateBody(createUserSchema), userController.createUser)
router.put('/:id', validateParams(userIdSchema), validateBody(updateUserSchema), userController.updateUser)
router.delete('/:id', validateParams(userIdSchema), userController.deleteUser)

export default router
