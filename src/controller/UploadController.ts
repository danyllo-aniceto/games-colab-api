import { Request } from 'express'
import { StorageService } from '../firebase'
import fs from 'fs'
import { PlatformService } from '../services/PlatformService'
import { GameService } from '../services/GameService'

const firebaseActive = process.env.firebaseActive === 'true' ? true : false
const name_app = process.env.name_app || 'Games'

export async function uploadImage(data: any, request: Request) {
  const storageService = new StorageService()
  if (firebaseActive) {
    const nomeArquivo = `${name_app}_${Date.now()}`
    data.image_url =
      (await storageService.subirImagen(nomeArquivo, request.file)) || ''
  } else {
    const nomeArquivo = `${Date.now()}_${request.file.originalname}`
    const base64 = request.file.buffer.toString('base64')
    fs.writeFile(
      `./src/uploads/images/${nomeArquivo}`,
      base64,
      'base64',
      err => {
        if (err) console.log('Error upload image repository ->', err.message)
      }
    )
    data.image_url = `src/uploads/images/${nomeArquivo}` || ''
  }
  return data.image_url
}

export async function removeImagePlatform(
  id: number,
  platformService: PlatformService
) {
  const storageService = new StorageService()
  const platformFound = await platformService.getPlatformById(id)
  if (platformFound.image.slice(0, 4) === 'http')
    await storageService.removerImagem(platformFound.image)
  else
    fs.unlink(platformFound.image, err => {
      if (err) console.log('Error deleted image repository ->', err.message)
    })
}
export async function removeImageGame(id: number, gameService: GameService) {
  const storageService = new StorageService()
  const gameFound = await gameService.getGameById(id)
  if (gameFound.image.slice(0, 4) === 'http')
    await storageService.removerImagem(gameFound.image)
  else
    fs.unlink(gameFound.image, err => {
      if (err) console.log('Error deleted image repository ->', err.message)
    })
}
