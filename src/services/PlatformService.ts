import { Platform } from '@prisma/client'
import prismaClient from '../prisma'

class PlatformService {
  async create(data: Platform): Promise<Platform> {
    const platform = await prismaClient.platform.create({
      data: {
        id: data.id,
        name: data.name,
        image: data.image
      }
    })
    return platform
  }

  async delete(id: number): Promise<void> {
    await prismaClient.platform.delete({ where: { id } })
  }

  async getPlatformById(id: number): Promise<Platform> {
    const platform: Platform = await prismaClient.platform.findFirst({
      where: { id }
    })
    return platform
  }

  async getPlatforms(): Promise<Platform[]> {
    const platforms = await prismaClient.platform.findMany()
    return platforms
  }

  async putPlatformById(id: number, data: Platform): Promise<void> {
    await prismaClient.platform.update({
      where: { id: id },
      data: {
        name: data.name,
        image: data.image
      }
    })
  }
}

export { PlatformService }
