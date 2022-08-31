import prismaClient from '../prisma'
import * as yup from 'yup'

class GameValidator {
  async idExist(id: number): Promise<boolean> {
    const game = await prismaClient.game.findFirst({
      where: { id }
    })
    return !!game
  }

  createValidator() {
    return yup.object().shape({
      name: yup.string().required('Name is required'),
      image: yup.string().required('Image is required'),
      developer: yup.string().required('Developer is required'),
      summary: yup.string().required('Summary is required'),
      genre: yup.string().required('Genre is required')
    })
  }

  updateByIdValidator() {
    return yup.object().shape({
      id: yup.number().required('Id is required in params'),
      name: yup.string().optional(),
      image: yup.string().optional(),
      developer: yup.string().optional(),
      summary: yup.string().optional(),
      genre: yup.string().optional()
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

export { GameValidator }
