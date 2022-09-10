import { User } from '@prisma/client'
import { hashSync } from 'bcryptjs'
import prismaClient from '../prisma'

interface IUserCreate {
  name: string
  email: string
}

type UserGet = Omit<User, 'password'>

interface IUserPaged {
  total?: number
  page: number
  totalPages: number
  limit: number
  offset: number
  instances: UserGet[]
}

class UserService {
  async create(data: User): Promise<IUserCreate> {
    const user = await prismaClient.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashSync(data.password, 8)
      }
    })
    return {
      name: user.name,
      email: user.email
    }
  }

  async delete(id: number): Promise<void> {
    await prismaClient.user.delete({ where: { id } })
  }

  async getUserById(id: number): Promise<User> {
    const user: User = await prismaClient.user.findFirst({ where: { id } })
    delete user.password
    return user
  }

  async getUser(): Promise<UserGet[]> {
    const users = await prismaClient.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        updated_at: true
      }
    })
    return users
  }

  async getUsersPaged(limit: number, page: number): Promise<IUserPaged> {
    const ITENS_PER_PAGE = 100
    limit = limit > ITENS_PER_PAGE || limit <= 0 ? ITENS_PER_PAGE : limit
    const offset = page <= 0 ? 0 : page * limit

    const usersPaged = await prismaClient.user.findMany({
      orderBy: { created_at: 'asc' },
      skip: offset,
      take: limit,
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        updated_at: true
      }
    })

    const total = await prismaClient.user.count()
    const totalPages = total > limit ? total / limit : 1
    return { total, page, totalPages, limit, offset, instances: usersPaged }
  }

  async putUserById(id: number, data: User): Promise<void> {
    await prismaClient.user.update({
      where: { id: id },
      data: {
        name: data.name,
        email: data.email,
        password: hashSync(data.password || '', 8)
      }
    })
  }
}

export { UserService }
