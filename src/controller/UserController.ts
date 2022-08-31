import { Request, Response } from 'express'
import { IUserDTO } from '../dtos/IUserDTO'
import { UserService } from '../services/UserService'
import { UserValidator } from '../validators/UserValidator'

export class UserController {
  async create(req: Request, res: Response) {
    const data: IUserDTO = req.body

    const validator = new UserValidator()
    try {
      await validator.createValidator().validate(data, {
        abortEarly: false
      })
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }

    try {
      const userService = new UserService()
      const user = await userService.create(data)
      res.status(201).json(user)
    } catch (error) {
      res.status(500).json({ message: 'Erro ao cadastrar o usuário' })
    }
  }
}
