import prismaClient from '../prisma'
import * as yup from 'yup'

class UserValidator {
  async idExist(id: number): Promise<boolean> {
    const user = await prismaClient.user.findFirst({
      where: { id }
    })
    return !!user
  }
  async emailExist(email: string): Promise<boolean> {
    const user = await prismaClient.user.findFirst({
      where: { email }
    })
    return !!user
  }

  createValidator() {
    return yup.object().shape({
      name: yup.string().required('Name is required'),
      email: yup
        .string()
        .email('Fiel to be of type email')
        .required('Email is required'),
      password: yup.string().required('Password is required')
    })
  }

  updateByIdValidator() {
    return yup.object().shape({
      id: yup.number().required('Id is required in params'),
      name: yup.string().optional(),
      email: yup.string().email('Field to be of type email').optional(),
      password: yup.string().optional()
    })
  }

  deleteByIdValidator() {
    return yup.object().shape({
      id: yup.number().required('Id is required in params')
    })
  }

  getByIdValidator() {
    return yup.object().shape({
      id: yup.number().required('Id is required in params')
    })
  }
}

export { UserValidator }
