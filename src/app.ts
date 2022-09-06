import 'dotenv/config'
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import cors from 'cors'
import { router } from './routes'
import { ApiError } from './validators/Exceptions/ApiError'

const app = express()
app.use(cors())

app.use(express.json())
app.use(router)

// eslint-disable-next-line no-unused-vars
app.use(
  (
    err: ApiError | any,
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    if (err instanceof ApiError) {
      if (err.message) {
        return response.status(err.code).json({
          message: err.message
        })
      }

      return response.status(err.code).end()
    }

    return response.status(500).json({
      message: err.message || 'Internal Server Error'
    })
  }
)

app.listen(process.env.PORT || 4000, () =>
  console.log(`🚀 Server os running on PORT ${process.env.PORT || 4000}`)
)
