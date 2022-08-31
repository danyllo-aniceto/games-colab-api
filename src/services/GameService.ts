import { Game } from '@prisma/client'
import prismaClient from '../prisma'

class GameService {
  async create(data: Game): Promise<Game> {
    const game = await prismaClient.game.create({
      data: {
        id: data.id,
        name: data.name,
        developer: data.developer,
        genre: data.genre,
        image: data.image,
        summary: data.summary
      }
    })
    return game
  }

  async delete(id: number): Promise<void> {
    await prismaClient.game.delete({ where: { id } })
  }

  async getGameById(id: number): Promise<Game> {
    const game: Game = await prismaClient.game.findFirst({ where: { id } })
    return game
  }

  async getGames(): Promise<Game[]> {
    const games = await prismaClient.game.findMany()
    return games
  }

  async putGameById(id: number, data: Game): Promise<void> {
    await prismaClient.game.update({
      where: { id: id },
      data: {
        name: data.name,
        developer: data.developer,
        genre: data.genre,
        image: data.image,
        summary: data.summary
      }
    })
  }
}

export { GameService }
