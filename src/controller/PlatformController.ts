import { Platform } from '@prisma/client'
import { Request, Response } from 'express'
import { PlatformService } from '../services/PlatformService'
import { ApiError } from '../validators/Exceptions/ApiError'
import { PlatformValidator } from '../validators/PlatformValidator'

export class PlatformController {
  async create(req: Request, res: Response) {
    const data: Platform = req.body

    const validator = new PlatformValidator()
    try {
      await validator.createValidator().validate(data, { abortEarly: false })
    } catch (error) {
      throw new ApiError(400, error.message || error)
    }

    const platformService = new PlatformService()
    const platform = await platformService.create(data)
    res.status(201).json(platform)
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    const validator = new PlatformValidator()
    try {
      await validator
        .deleteByIdValidator()
        .validate({ id: Number(id) }, { abortEarly: false })
    } catch (error) {
      throw new ApiError(400, error.message || error)
    }

    if (!(await validator.idExist(Number(id)))) {
      throw new ApiError(400, 'Plataforma não existe')
    }

    const platformService = new PlatformService()
    await platformService.delete(Number(id))
    res.status(200).json({ message: 'Plataforma deletada com sucesso' })
  }

  async getPlatformById(req: Request, res: Response) {
    const { id } = req.params

    const validator = new PlatformValidator()
    try {
      await validator
        .getByIdValidator()
        .validate({ id: Number(id) }, { abortEarly: false })
    } catch (error) {
      throw new ApiError(400, error.message || error)
    }
    if (!(await validator.idExist(Number(id)))) {
      throw new ApiError(400, 'Plataforma não existe')
    }
    const platformService = new PlatformService()
    const platform = await platformService.getPlatformById(Number(id))
    res.status(200).json(platform)
  }

  async getPlatforms(req: Request, res: Response) {
    const platformService = new PlatformService()
    const allPlatforms = await platformService.getPlatforms()
    res.status(200).json(allPlatforms)
  }

  async putPlatformById(req: Request, res: Response) {
    const { id } = req.params
    const data: Platform = req.body

    const validator = new PlatformValidator()
    try {
      await validator
        .updateByIdValidator()
        .validate({ id: Number(id), ...data }, { abortEarly: false })
    } catch (error) {
      if (!(await validator.idExist(Number(id)))) {
        return res.status(400).json({ message: 'Plataforma não existe' })
      }
      throw new ApiError(400, error.message || error)
    }
    if (!(await validator.idExist(Number(id)))) {
      throw new ApiError(400, 'Plataforma não existe')
    }
    const platformService = new PlatformService()
    await platformService.putPlatformById(Number(id), data)
    res.status(200).json({ message: 'Plataforma atualizada com sucesso' })
  }
}
