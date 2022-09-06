import { Evaluation } from '@prisma/client'
import prismaClient from '../prisma'

class EvaluationService {
  async create(data: Evaluation): Promise<Evaluation> {
    const evaluation = await prismaClient.evaluation.create({
      data: {
        idUser: data.idUser,
        idGame: data.idGame,
        rating: data.rating,
        comment: data.comment
      }
    })
    return evaluation
  }

  async delete(id: number): Promise<void> {
    await prismaClient.evaluation.delete({ where: { id } })
  }

  async getEvaluations(): Promise<Evaluation[]> {
    const evaluations = await prismaClient.evaluation.findMany()
    return evaluations
  }

  async getEvaluationById(id: number): Promise<Evaluation> {
    const evaluation: Evaluation = await prismaClient.evaluation.findFirst({
      where: { id }
    })
    return evaluation
  }

  async putEvaluationById(id: number, data: Evaluation): Promise<void> {
    await prismaClient.evaluation.update({
      where: { id: id },
      data: {
        idGame: data.idGame,
        idUser: data.idUser,
        rating: data.rating,
        comment: data.comment
      }
    })
  }
}

export { EvaluationService }
