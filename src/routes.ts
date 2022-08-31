import { Router, Request, Response, response } from 'express'
import { UserController } from './controller/UserController'

const userController = new UserController()

const router = Router()

router.get('/', (req: Request, res: Response) => {
  response.json({ message: 'Welcome api-games-colab' })
})

router.post('/users', userController.create)
router.get('/users', userController.getUsers)
router.get('/users/:id', userController.getUserById)
router.delete('/users/:id', userController.delete)
router.put('/users/:id', userController.putUserById)

export { router }
