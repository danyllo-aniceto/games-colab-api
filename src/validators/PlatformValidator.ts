import prismaClient from '../prisma'
import * as yup from 'yup'

class PlatformValidator {
  async idExist(id: number): Promise<boolean> {
    const platform = await prismaClient.platform.findFirst({
      where: { id }
    })
    return !!platform
  }

  createValidator() {
    return yup.object().shape({
      name: yup.string().required('Name is required'),
      Image: yup.string().required('Image is required')
    })
  }

  updateByIdValidator() {
    return yup.object().shape({
      id: yup.number().required('Id is required in params'),
      name: yup.string().optional(),
      image: yup.string().optional()
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

export { PlatformValidator }
