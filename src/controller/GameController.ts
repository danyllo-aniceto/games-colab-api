import { Game } from '@prisma/client'
import { Request, Response } from 'express'
import { GameService } from '../services/GameService'
import { GameValidator } from '../validators/GameValidator'

export class GameController {
  async create(req: Request, res: Response) {
    const data: Game = req.body

    const validator = new GameValidator()
    try {
      await validator.createValidator().validate(data, { abortEarly: false })
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
    try {
      const gameService = new GameService()
      const game = await gameService.create(data)
      res.status(201).json(game)
    } catch (error) {
      res.status(500).json({ message: 'Erro ao cadastrar jogo' })
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    const validator = new GameValidator()
    try {
      await validator
        .deleteByIdValidator()
        .validate(Number(id), { abortEarly: false })
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
    try {
      const gameService = new GameService()
      await gameService.delete(Number(id))

      res.status(200).json({ message: 'Jogo deletado com sucesso' })
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar jogo' })
    }
  }

  async getGameById(req: Request, res: Response) {
    const { id } = req.params

    const validator = new GameValidator()
    try {
      await validator
        .getByIdValidator()
        .validate(Number(id), { abortEarly: false })
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }

    try {
      const gameService = new GameService()
      const game = await gameService.getGameById(Number(id))
      if (!game) {
        res.status(200).json({ message: 'Este jogo não existe' })
      }
      res.status(200).json(game)
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar jogo' })
    }
  }

  async getGames(req: Request, res: Response) {
    try {
      const gameService = new GameService()
      const allGames = await gameService.getGames()
      res.status(200).json(allGames)
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar todos jogos' })
    }
  }

  async putGameById(req: Request, res: Response) {
    const { id } = req.params
    const data: Game = req.body

    const validator = new GameValidator()
    try {
      await validator
        .updateByIdValidator()
        .validate({ id: Number(id), ...data }, { abortEarly: false })
    } catch (error) {
      if (!(await validator.idExist(Number(id)))) {
        return res.status(400).json({ message: 'Jogo não existe' })
      }

      try {
        const gameService = new GameService()
        await gameService.putGameById(Number(id), data)
        res.status(200).json({ message: 'Jogo atualizado com sucesso' })
      } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar o jogo' })
      }
    }
  }
}
