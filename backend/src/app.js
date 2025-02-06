const express = require('express')
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

// Check si funciona
app.get('/', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() })
})

const ciudadRoutes = require('./routes/ciudadRoutes')
app.use('/api/v1/ciudades', ciudadRoutes)

const hotelRoutes = require('./routes/hotelRoutes')
app.use('/api/v1/hoteles', hotelRoutes)

const reservaRoutes = require('./routes/reservaRoutes')
app.use('/api/v1/reservas', reservaRoutes)

app.listen(port, () => {
  console.log(`Aterrizar app listening on port ${port}`)
})