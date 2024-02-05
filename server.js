import express from 'express'
import dotenv from 'dotenv'
import { app as routes } from './routes/index.js'

const PORT = process.env.PORT || 3000
const app = express()

dotenv.config()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

export default app
