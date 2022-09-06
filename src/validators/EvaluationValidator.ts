import prismaClient from '../prisma'
import * as yup from 'yup'

class EvaluationValidator {
  async idExist(id: number): Promise<boolean> {
    const evaluation = await prismaClient.evaluation.findFirst({
      where: { id }
    })
    return !!evaluation
  }

  createValidator() {
    return yup.object().shape({
      idUser: yup.number().required('idUser is required'),
      idGame: yup.number().required('idGame is required'),
      rating: yup.number().required('rating is required'),
      comment: yup.string().optional()
    })
  }

  updateByIdValidator() {
    return yup.object().shape({
      id: yup.number().required('id is required in params'),
      idUser: yup.number().optional(),
      idGame: yup.number().optional(),
      rating: yup.number().optional(),
      comment: yup.string().optional()
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

export { EvaluationValidator }
