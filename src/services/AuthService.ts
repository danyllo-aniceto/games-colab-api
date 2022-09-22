import 'dotenv/config'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { IAuthenticateRequest } from '../dtos/IAuthenticateRequest'
import prismaClient from '../prisma'
import { ApiError } from '../validators/Exceptions/ApiError'

class AuthService {
  async execute({ email, password }: IAuthenticateRequest) {
    // Verificar se email existe
    const user = await prismaClient.user.findFirst({ where: { email } })

    if (!user) {
      throw new ApiError(400, 'Credenciais incorretas!')
    }

    // Verificar se a senha está correta
    const isMatchPassword = await compare(password, user.password)

    if (!isMatchPassword) {
      throw new ApiError(400, 'Credenciais incorretas!')
    }

    const token = sign(
      {
        email: user.email,
        name: user.name
      },
      process.env.JWT_SECRET,
      {
        subject: user.id.toString(),
        expiresIn: process.env.TOKEN_EXPIRE || '1d'
      }
    )

    return { token }
  }
}

export { AuthService }
