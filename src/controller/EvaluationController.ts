import { Evaluation } from '@prisma/client'
import { Request, Response } from 'express'
import { EvaluationService } from '../services/EvaluationService'
import { EvaluationValidator } from '../validators/EvaluationValidator'

export class EvaluationController {
  async create(req: Request, res: Response) {
    const data: Evaluation = req.body

    const validator = new EvaluationValidator()
    try {
      await validator.createValidator().validate(data, {
        abortEarly: false
      })
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
    try {
      const evaluationService = new EvaluationService()
      const evaluation = await evaluationService.create(data)
      res.status(201).json(evaluation)
    } catch (error) {
      res.status(500).json({ message: `Erro ao cadastrar jogo ${error}` })
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    const validator = new EvaluationValidator()
    try {
      await validator
        .deleteByIdValidator()
        .validate({ id: Number(id) }, { abortEarly: false })
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
    try {
      const evaluationService = new EvaluationService()
      await evaluationService.delete(Number(id))

      res.status(200).json({ message: 'Avaliação deletada com sucesso' })
    } catch (error) {
      res.status(500).json({ message: `Erro ao deletar avaliação ${error}` })
    }
  }

  async getEvaluationById(req: Request, res: Response) {
    const { id } = req.params

    const validator = new EvaluationValidator()
    try {
      await validator
        .getByIdValidator()
        .validate({ id: Number(id) }, { abortEarly: false })
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }

    try {
      const evaluationService = new EvaluationService()
      const evaluation = await evaluationService.getEvaluationById(Number(id))
      if (!evaluation) {
        res.status(200).json({ message: 'Esta avaliação não existe' })
      }
      res.status(200).json(evaluation)
    } catch (error) {
      res.status(500).json({ message: `Erro ao buscar avaliação ${error}` })
    }
  }

  async getEvaluations(req: Request, res: Response) {
    try {
      const evaluationService = new EvaluationService()
      const allEvaluations = await evaluationService.getEvaluations()
      res.status(200).json(allEvaluations)
    } catch (error) {
      res.status(500).json({ message: `Erro ao buscar avaliações ${error}` })
    }
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
      if (!(await validator.idExist(Number(id)))) {
        return res.status(400).json({ message: 'Avaliação não existe' })
      }
    }
    try {
      const evaluationService = new EvaluationService()
      await evaluationService.putEvaluationById(Number(id), data)
      res.status(200).json({ message: 'Avalição atualizada com sucesso' })
    } catch (error) {
      res.status(500).json({ message: `Erro ao atualizar avaliação ${error}` })
    }
  }
}
