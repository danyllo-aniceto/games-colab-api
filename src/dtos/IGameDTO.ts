export interface IGameDTO {
  id?: number
  name: string
  developer: string
  summary: string
  genre: string
  image: string
  idPlatform?: number[]
  created_at?: Date
  updated_at?: Date
}
