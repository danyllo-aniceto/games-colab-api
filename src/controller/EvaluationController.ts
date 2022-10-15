import { Evaluation } from '@prisma/client'
import { Request, Response } from 'express'
import { EvaluationService } from '../services/EvaluationService'
import { EvaluationValidator } from '../validators/EvaluationValidator'
import { ApiError } from '../validators/Exceptions/ApiError'

export class EvaluationController {
  async create(req: Request, res: Response) {
    const data: Evaluation = req.body

    const validator = new EvaluationValidator()
    try {
      await validator.createValidator().validate(data, {
        abortEarly: false
      })
    } catch (error) {
      throw new ApiError(400, error.message || error)
    }

    const evaluationService = new EvaluationService()
    const evaluation = await evaluationService.create(data)
    res.status(201).json(evaluation)
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    const validator = new EvaluationValidator()
    try {
      await validator
        .deleteByIdValidator()
        .validate({ id: Number(id) }, { abortEarly: false })
    } catch (error) {
      throw new ApiError(400, error.message || error)
    }
    if (!(await validator.idExist(Number(id)))) {
      throw new ApiError(400, 'Avaliação não existe')
    }
    const evaluationService = new EvaluationService()
    await evaluationService.delete(Number(id))
    res.status(200).json({ message: 'Avaliação deletada com sucesso' })
  }

  async getEvaluationById(req: Request, res: Response) {
    const { id } = req.params

    const validator = new EvaluationValidator()
    try {
      await validator
        .getByIdValidator()
        .validate({ id: Number(id) }, { abortEarly: false })
    } catch (error) {
      throw new ApiError(400, error.message || error)
    }
    if (!(await validator.idExist(Number(id)))) {
      throw new ApiError(400, 'Avaliação não existe')
    }
    const evaluationService = new EvaluationService()
    const evaluation = await evaluationService.getEvaluationById(Number(id))

    res.status(200).json(evaluation)
  }

  async getEvaluationByIdGame(req: Request, res: Response) {
    const { idGame } = req.params
    console.log(idGame)
    const evaluationService = new EvaluationService()
    const consulta = await evaluationService.getEvaluationByIdGame(
      Number(idGame)
    )
    res.status(200).json(consulta)
  }

  async getEvaluations(req: Request, res: Response) {
    const evaluationService = new EvaluationService()
    const allEvaluations = await evaluationService.getEvaluations()
    res.status(200).json(allEvaluations)
  }

  async putEvaluationById(req: Request, res: Response) {
    const { id } = req.params
    const data: Evaluation = req.body

    const validator = new EvaluationValidator()
    try {
      await validator
        .updateByIdValidator()
        .validate({ id: Number(id), ...data }, { abortEarly: false })
    } catch (error) {
      throw new ApiError(400, error.message || error)
    }
    if (!(await validator.idExist(Number(id)))) {
      throw new ApiError(400, 'Avaliação não existe')
    }
    const evaluationService = new EvaluationService()
    await evaluationService.putEvaluationById(Number(id), data)
    res.status(200).json({ message: 'Avalição atualizada com sucesso' })
  }

  async getTopThreeGames(req: Request, res: Response) {
    const evaluationService = new EvaluationService()
    const consulta = await evaluationService.getTopThreeGames()
    res.status(200).json(consulta)
  }
}
