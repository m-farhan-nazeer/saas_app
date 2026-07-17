const prisma = require('../config/prisma')

const getUsers = async (req, res) => {
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
}

module.exports = {
  getUsers,
}
