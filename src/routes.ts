import { Router, Request, Response, response } from 'express'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  response.json({ message: 'Welcome api-games-colab' })
})

export { router }
