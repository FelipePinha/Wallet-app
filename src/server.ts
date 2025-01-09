import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { userRouter } from './routes/userRoutes'
import { transactionsRouter } from './routes/transactionsRoutes'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(userRouter)
app.use(transactionsRouter)

app.listen(3000, () => {
    console.log('server running at http://localhost:3000')
})