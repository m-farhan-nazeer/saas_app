const express = require('express')
const cors = require('cors')
require('dotenv').config()

const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Backend is running' })
})

app.use('/users', userRoutes)
app.use('/auth', authRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})