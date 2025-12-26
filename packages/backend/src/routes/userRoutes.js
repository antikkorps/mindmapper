import Router from '@koa/router'
import userController from '../controllers/userController.js'

const router = new Router({
  prefix: '/api/users',
})

router.get('/', userController.getAllUsers)
router.get('/:id', userController.getUserById)
router.get('/:id/maps', userController.getUserWithMaps)
router.post('/', userController.createUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

export default router
