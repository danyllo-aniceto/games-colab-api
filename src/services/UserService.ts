import { User } from '@prisma/client'
import { hashSync } from 'bcryptjs'
import prismaClient from '../prisma'

interface IUserCreate {
  name: string
  email: string
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
    return user
  }

  async getUser(): Promise<User[]> {
    const users = await prismaClient.user.findMany()
    return users
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
