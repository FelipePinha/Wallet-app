import express from 'express'
import dotenv from 'dotenv'
import { userRouter } from './routes/userRoutes'

dotenv.config()

const app = express()

app.use(express.json())
app.use(userRouter)

app.listen(3000, () => {
    console.log('server running at http://localhost:3000')
})