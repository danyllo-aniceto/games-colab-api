import { Evaluation } from '@prisma/client'
import prismaClient from '../prisma'
import { toJson } from '../utils/helpers'

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
    const evaluations = await prismaClient.evaluation.findMany({
      include: {
        User: {
          select: {
            id: true,
            name: true,
            email: true,
            created_at: true,
            updated_at: true
          }
        }
      }
    })
    return evaluations
  }

  async getEvaluationById(id: number): Promise<Evaluation> {
    const evaluation: Evaluation = await prismaClient.evaluation.findFirst({
      where: { id },
      include: {
        User: {
          select: {
            id: true,
            name: true,
            email: true,
            created_at: true,
            updated_at: true
          }
        }
      }
    })
    return evaluation
  }

  async getEvaluationByIdGame(idGame: number) {
    const evaluation = await prismaClient.evaluation.findMany({
      where: { idGame: idGame }
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

  async getTopThreeGames() {
    const queryTopThreeGames: Array<{
      name: string
      sum: any
      image: string
      id: number
    }> = await prismaClient.$queryRaw`select g.id, g.name, g.image, sum(e.rating)  
    from users u join evaluations e on u.id = e."idUser" join games g on g.id = e."idGame"
    group by g.id
    order by sum(e.rating) desc limit 3`

    let newList: Array<{
      id: number
      name: string
      sum: number
      image: string
    }> = []
    for (const iterator of queryTopThreeGames) {
      newList.push({
        name: iterator.name,
        sum: Number(toJson(iterator.sum)),
        image: iterator.image,
        id: iterator.id
      })
    }

    return newList
  }
}

export { EvaluationService }
