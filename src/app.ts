import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { router } from './routes'

const app = express()
app.use(cors())

app.use(express.json())
app.use(router)

app.listen(process.env.PORT || 4000, () =>
  console.log(`🚀 Server os running on PORT ${process.env.PORT || 4000}`)
)
