import { Request, Response } from 'express'
import { AuthService } from '../services/AuthService'
import { AuthValidator } from '../validators/AuthValidator'
import { ApiError } from '../validators/Exceptions/ApiError'

class AuthController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body

    const authValidator = new AuthValidator()
    try {
      await authValidator
        .authValidation()
        .validate(request.body, { abortEarly: false })
    } catch (error) {
      throw new ApiError(400, error.message || error)
    }

    const authenticateUserService = new AuthService()
    const token = await authenticateUserService.execute({
      email,
      password
    })

    if (token.status === 400) {
      return response.status(200).json({ message: token.message })
    }
    return response.json(token)
  }
}

export { AuthController }
