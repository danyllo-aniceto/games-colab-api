import { User } from '@prisma/client'
import { Request, Response } from 'express'
import { UserService } from '../services/UserService'
import { ApiError } from '../validators/Exceptions/ApiError'
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
      throw new ApiError(400, error.message || error)
    }
    if (await validator.emailExist(data.email))
      throw new ApiError(400, 'User already exists')

    const userService = new UserService()
    const user = await userService.create(data)
    res.status(201).json(user)
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params

    const validator = new UserValidator()
    try {
      await validator
        .deleteByIdValidator()
        .validate({ id: Number(id) }, { abortEarly: false })
    } catch (error) {
      throw new ApiError(400, error.message || error)
    }

    if (!(await validator.idExist(Number(id)))) {
      throw new ApiError(400, 'Usuário não existe')
    }

    const userService = new UserService()
    await userService.delete(Number(id))

    res.status(200).json({ message: 'Usuário deletado com sucesso' })
  }

  async getUserById(req: Request, res: Response) {
    const { id } = req.params

    const validator = new UserValidator()
    try {
      await validator
        .getByIdValidator()
        .validate({ id: Number(id) }, { abortEarly: false })
    } catch (error) {
      throw new ApiError(400, error.message || error)
    }
    if (!(await validator.idExist(Number(id)))) {
      throw new ApiError(400, 'Usuário não existe')
    }
    const userService = new UserService()
    const user = await userService.getUserById(Number(id))
    res.status(200).json(user)
  }

  async getUsers(req: Request, res: Response) {
    const userService = new UserService()
    const allUsers = await userService.getUser()
    res.status(200).json(allUsers)
  }

  async getUsersPaged(req: Request, res: Response) {
    let { limit, page }: any = req.query
    limit = parseInt(limit || 1)
    page = parseInt(page || 1)

    const validator = new UserValidator()
    try {
      await validator
        .getPagedValidor()
        .validate({ limit, page }, { abortEarly: false })
    } catch (error) {
      throw new ApiError(400, error.message || error)
    }

    const userService = new UserService()
    const allUsersPaged = await userService.getUsersPaged(limit, page)
    res.status(200).json(allUsersPaged)
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
      throw new ApiError(400, error.message || error)
    }

    if (!(await validator.idExist(Number(id)))) {
      throw new ApiError(400, 'Este usuário não existe')
    }

    const userService = new UserService()
    await userService.putUserById(Number(id), data)
    res.status(200).json({ message: 'Usuário atualizado com sucesso' })
  }
}
