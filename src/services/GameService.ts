import { Game } from '@prisma/client'
import { IGameDTO } from '../dtos/IGameDTO'
import prismaClient from '../prisma'

class GameService {
  async create(data: IGameDTO): Promise<Game> {
    const game = await prismaClient.game.create({
      data: {
        name: data.name,
        developer: data.developer,
        genre: data.genre,
        image: data.image,
        summary: data.summary,
        PlatformGame: {
          create: data.idPlatform.map(item => {
            return { idPlatform: item }
          })
        }
      },
      include: { PlatformGame: true }
    })
    return game
  }

  async delete(id: number): Promise<void> {
    await prismaClient.game.delete({ where: { id } })
  }

  async getGamePlatformById(id: number): Promise<Game> {
    const game: Game = await prismaClient.game.findFirst({
      where: { id },
      include: { PlatformGame: { include: { Platform: true } } }
    })
    return game
  }

  async getGamesPlatform(): Promise<Game[]> {
    const games = await prismaClient.game.findMany({
      include: { PlatformGame: { include: { Platform: true } } }
    })
    return games
  }

  async getGameEvaluationById(id: number): Promise<Game> {
    const game: Game = await prismaClient.game.findFirst({
      where: { id },
      include: { Evaluation: { include: { User: true } } }
    })
    return game
  }

  async getGamesEvaluation(): Promise<Game[]> {
    const games = await prismaClient.game.findMany({
      include: { Evaluation: { include: { User: true } } }
    })
    return games
  }

  async getGames(): Promise<Game[]> {
    const games = await prismaClient.game.findMany()
    return games
  }

  async getGameById(id: number): Promise<Game> {
    const game: Game = await prismaClient.game.findFirst({
      where: { id }
    })
    return game
  }

  async putGameById(id: number, data: IGameDTO): Promise<void> {
    await prismaClient.game.update({
      where: { id: id },
      data: {
        name: data.name,
        developer: data.developer,
        genre: data.genre,
        image: data.image,
        summary: data.summary,
        PlatformGame: data.idPlatform
          ? {
              create: data.idPlatform.map(item => {
                return { idPlatform: item }
              })
            }
          : undefined
      },
      include: { PlatformGame: true }
    })
  }
}

export { GameService }
