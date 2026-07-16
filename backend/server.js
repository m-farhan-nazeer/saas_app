const express = require('express')
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')
require('dotenv').config()

const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Backend is running' })
})

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  res.json(users)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})