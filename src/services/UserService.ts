import { getCustomRepository } from 'typeorm'
import { IUserDTO } from '../dtos/IUserDTO'
import { UserRepository } from '../repository/UserRepository'

class UserService {
  async create(data: IUserDTO): Promise<IUserDTO> {
    const concectUser = getCustomRepository(UserRepository)
    const user = concectUser.create(data)
    await concectUser.save(user)
    return user
  }

  async delete(id: string): Promise<void> {
    const conectUser = getCustomRepository(UserRepository)
    await conectUser.delete({ id: Number(id) })
  }

  async getUserById(id: string): Promise<IUserDTO> {
    const conectUser = getCustomRepository(UserRepository)
    const user = await conectUser.findOne(id)
    return user
  }

  async getUser() {
    const conectUser = getCustomRepository(UserRepository)
    const allUsers = await conectUser.find()
    return allUsers
  }

  async putUserById(id: number, data: IUserDTO) {
    const conectUser = getCustomRepository(UserRepository)
    await conectUser.update(id, data)
  }
}

export { UserService }
