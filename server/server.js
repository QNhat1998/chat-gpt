import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/db.js'
import userRoutes from './routes/user.routes.js'
import chatRoutes from './routes/chat.routes.js'
import messageRoutes from './routes/message.route.js'
import creditRoutes from './routes/credit.route.js'

const app = express()

await connectDB()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.get('/', (req, res) => res.send('Server is Live!'))
app.use('/api/users', userRoutes)
app.use('/api/chats', chatRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/credits', creditRoutes)
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`${PORT}`)
})
