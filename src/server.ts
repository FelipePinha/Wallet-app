import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('server on')
})

app.listen(3000, () => {
    console.log('server running at http://localhost:3000')
})