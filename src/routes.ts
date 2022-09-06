import { Router, Request, Response, response } from 'express'
import { EvaluationController } from './controller/EvaluationController'
import { GameController } from './controller/GameController'
import { PlatformController } from './controller/PlatformController'
import { UserController } from './controller/UserController'

const userController = new UserController()
const platformController = new PlatformController()
const gameController = new GameController()
const evaluationController = new EvaluationController()

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

router.post('/games', gameController.create)
router.get('/games', gameController.getGames)
router.get('/games/:id', gameController.getGameById)
router.delete('/games/:id', gameController.delete)
router.put('/games/:id', gameController.putGameById)

router.post('/evaluations', evaluationController.create)
router.get('/evaluations', evaluationController.getEvaluations)
router.get('/evaluations/:id', evaluationController.getEvaluationById)
router.delete('/evaluations/:id', evaluationController.delete)
router.put('/evaluations/:id', gameController.putGameById)

export { router }
