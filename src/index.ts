import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()
const app = express()
const port = process.env.PORT || 3333

app.use(cors())
app.use(express.json())
app.use(express.raw({ type: 'application/vnd.custom-type' }))
app.use(express.text({ type: 'text/html' }))

app.get('/', async (req, res) => {
  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  })
  res.json(allUsers)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
