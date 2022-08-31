import { Platform } from '@prisma/client'
import { Request, Response } from 'express'
import { PlatformService } from '../services/PlatformService'
import { PlatformValidator } from '../validators/PlatformValidator'

export class PlatformController {
  async create(req: Request, res: Response) {
    const data: Platform = req.body

    const validator = new PlatformValidator()
    try {
      await validator.createValidator().validate(data, { abortEarly: false })
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
    try {
      const platformService = new PlatformService()
      const platform = await platformService.create(data)
      res.status(201).json(platform)
    } catch (error) {
      res.status(500).json({ message: 'Erro ao cadastrar plataforma' })
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    const validator = new PlatformValidator()
    try {
      await validator
        .deleteByIdValidator()
        .validate(Number(id), { abortEarly: false })
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
    try {
      const platformService = new PlatformService()
      await platformService.delete(Number(id))

      res.status(200).json({ message: 'Plataforma deletada com sucesso' })
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar plataforma' })
    }
  }

  async getPlatformById(req: Request, res: Response) {
    const { id } = req.params

    const validator = new PlatformValidator()
    try {
      await validator
        .getByIdValidator()
        .validate(Number(id), { abortEarly: false })
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }

    try {
      const platformService = new PlatformService()
      const platform = await platformService.getPlatformById(Number(id))
      if (!platform) {
        res.status(200).json({ message: 'Esta plataforma não existe' })
      }
      res.status(200).json(platform)
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar plataforma' })
    }
  }

  async getPlatforms(req: Request, res: Response) {
    try {
      const platformService = new PlatformService()
      const allPlatforms = await platformService.getPlatforms()
      res.status(200).json(allPlatforms)
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar todas plataformas' })
    }
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

      try {
        const platformService = new PlatformService()
        await platformService.putPlatformById(Number(id), data)
        res.status(200).json({ message: 'Plataforma atualizada com sucesso' })
      } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar a plataforma' })
      }
    }
  }
}
