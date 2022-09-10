import { Router, Request, Response, response } from 'express'
import { AuthController } from './controller/AuthController'
import { EvaluationController } from './controller/EvaluationController'
import { GameController } from './controller/GameController'
import { PlatformController } from './controller/PlatformController'
import { UserController } from './controller/UserController'
import { ensureAuthenticated } from './middlewares/ensureAuthenticated'
import { UPLOAD_IMAGE } from './middlewares/uploadFile'

const userController = new UserController()
const platformController = new PlatformController()
const gameController = new GameController()
const evaluationController = new EvaluationController()
const authController = new AuthController()

const router = Router()

router.get('/', (req: Request, res: Response) => {
  response.json({ message: 'Welcome api-games-colab' })
})

router.post('/users', ensureAuthenticated, userController.create)
router.get('/users', userController.getUsers)
router.get('/users/paged', userController.getUsersPaged)
router.get('/users/:id', userController.getUserById)
router.delete('/users/:id', ensureAuthenticated, userController.delete)
router.put('/users/:id', ensureAuthenticated, userController.putUserById)

router.post('/platforms', ensureAuthenticated, platformController.create)
router.get('/platforms', platformController.getPlatforms)
router.get('/platforms/:id', platformController.getPlatformById)
router.delete('/platforms/:id', ensureAuthenticated, platformController.delete)
router.put(
  '/platforms/:id',
  ensureAuthenticated,
  platformController.putPlatformById
)

router.post(
  '/games/upload',
  ensureAuthenticated,
  UPLOAD_IMAGE.single('file'),
  gameController.createWithUpload
)
router.post('/games', ensureAuthenticated, gameController.create)
router.get('/games', gameController.getGamesPlatform)
router.get('/games/:id', gameController.getGamePlatformById)
router.delete('/games/:id', ensureAuthenticated, gameController.delete)
router.put('/games/:id', ensureAuthenticated, gameController.putGameById)

router.post('/evaluations', ensureAuthenticated, evaluationController.create)
router.get('/evaluations', evaluationController.getEvaluations)
router.get('/evaluations/:id', evaluationController.getEvaluationById)
router.delete(
  '/evaluations/:id',
  ensureAuthenticated,
  evaluationController.delete
)
router.put(
  '/evaluations/:id',
  ensureAuthenticated,
  evaluationController.putEvaluationById
)

router.post('/signin', authController.handle)

export { router }
