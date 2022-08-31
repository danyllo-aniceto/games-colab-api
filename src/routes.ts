import { Router, Request, Response, response } from 'express'
import { PlatformController } from './controller/PlatformController'
import { UserController } from './controller/UserController'

const userController = new UserController()
const platformController = new PlatformController()

const router = Router()

router.get('/', (req: Request, res: Response) => {
  response.json({ message: 'Welcome api-games-colab' })
})

router.post('/users', userController.create)
router.get('/users', userController.getUsers)
router.get('/users/:id', userController.getUserById)
router.delete('/users/:id', userController.delete)
router.put('/users/:id', userController.putUserById)

router.post('/platforms', platformController.create)
router.get('/platforms', platformController.getPlatforms)
router.get('/platforms/:id', platformController.getPlatformById)
router.delete('/platforms/:id', platformController.delete)
router.put('/platforms/:id', platformController.putPlatformById)

export { router }
