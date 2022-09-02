import { User } from '@prisma/client'
import { Request, Response } from 'express'
import { UserService } from '../services/UserService'
import { UserValidator } from '../validators/UserValidator'

export class UserController {
  async create(req: Request, res: Response) {
    const data: User = req.body

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
      res.status(500).json({ message: `Erro ao cadastrar usuário - ${error}` })
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    const validator = new UserValidator()
    try {
      await validator
        .deleteByIdValidator()
        .validate({ id: Number(id) }, { abortEarly: false })
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }

    try {
      const userService = new UserService()
      await userService.delete(Number(id))

      res.status(200).json({ message: 'Usuário deletado com sucesso' })
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar usuário' })
    }
  }

  async getUserById(req: Request, res: Response) {
    const { id } = req.params

    const validator = new UserValidator()
    try {
      await validator
        .getByIdValidator()
        .validate({ id: Number(id) }, { abortEarly: false })
    } catch (error) {
      console.log('caiu', error.message)
      return res.status(400).json({ message: error.message })
    }

    try {
      const userService = new UserService()
      const user = await userService.getUserById(Number(id))
      if (!user) {
        res.status(200).json({ message: 'Este usuário não existe' })
      }
      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar usuário' })
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const userService = new UserService()
      const allUsers = await userService.getUser()
      res.status(200).json(allUsers)
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar todos usuários' })
    }
  }

  async putUserById(req: Request, res: Response) {
    const { id } = req.params
    const data: User = req.body

    const validator = new UserValidator()
    try {
      await validator
        .updateByIdValidator()
        .validate({ id: Number(id), ...data }, { abortEarly: false })
    } catch (error) {
      if (!(await validator.idExist(Number(id)))) {
        return res.status(400).json({ message: 'Usuário não existe' })
      }
    }
    try {
      const userService = new UserService()
      await userService.putUserById(Number(id), data)
      res.status(200).json({ message: 'Usuário atualizado com sucesso' })
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar o usuário' })
    }
  }
}
