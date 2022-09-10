import { Game } from '@prisma/client'
import { Request, Response } from 'express'
import { IGameDTO } from '../dtos/IGameDTO'
import { GameService } from '../services/GameService'
import { ApiError } from '../validators/Exceptions/ApiError'
import { GameValidator } from '../validators/GameValidator'
import { uploadImage } from './UploadController'

export class GameController {
  async createWithUpload(req: Request, res: Response) {
    const data: IGameDTO = req.body
    let newData: IGameDTO
    if (typeof data.idPlatform === 'string') {
      newData = { ...data, idPlatform: JSON.parse(data.idPlatform) }
    }
    const validator = new GameValidator()
    try {
      await validator
        .createValidatorWithUpload()
        .validate(newData, { abortEarly: false })

      if (!req.file)
        throw 'Image is required or invalid extension. It should be only (png, jpg, jpeg, pjpeg, gif, svg)'
    } catch (error) {
      throw new ApiError(400, error.message || error)
    }

    newData.image = (await uploadImage(newData, req)) || ''

    const gameService = new GameService()
    const game = await gameService.create(newData)
    res.status(201).json(game)
  }

  async create(req: Request, res: Response) {
    const data: IGameDTO = req.body
    const validator = new GameValidator()
    try {
      await validator.createValidator().validate(data, { abortEarly: false })
    } catch (error) {
      throw new ApiError(400, error.message || error)
    }

    const gameService = new GameService()
    const game = await gameService.create(data)
    res.status(201).json(game)
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    const validator = new GameValidator()
    try {
      await validator
        .deleteByIdValidator()
        .validate({ id: Number(id) }, { abortEarly: false })
    } catch (error) {
      throw new ApiError(400, error.message || error)
    }
    if (!(await validator.idExist(Number(id)))) {
      throw new ApiError(400, 'Jogo não existe')
    }
    const gameService = new GameService()
    await gameService.delete(Number(id))
    res.status(200).json({ message: 'Jogo deletado com sucesso' })
  }

  async getGamesPlatform(req: Request, res: Response) {
    const gameService = new GameService()
    const allGames = await gameService.getGamesPlatform()
    res.status(200).json(allGames)
  }

  async getGamePlatformById(req: Request, res: Response) {
    const { id } = req.params

    const validator = new GameValidator()
    try {
      await validator
        .getByIdValidator()
        .validate({ id: Number(id) }, { abortEarly: false })
    } catch (error) {
      throw new ApiError(400, error.message || error)
    }

    const gameService = new GameService()
    const game = await gameService.getGamePlatformById(Number(id))
    if (!(await validator.idExist(Number(id)))) {
      throw new ApiError(400, 'Jogo não existe')
    }
    res.status(200).json(game)
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
      throw new ApiError(400, error.message || error)
    }
    if (!(await validator.idExist(Number(id)))) {
      throw new ApiError(400, 'Jogo não existe')
    }
    const gameService = new GameService()
    await gameService.putGameById(Number(id), data)
    res.status(200).json({ message: 'Jogo atualizado com sucesso' })
  }
}
