const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient()

// Busca todas las reservas
const getAllReservas = async (req, res) => {
  try {
    const reservas = await prisma.reserva.findMany({
      include: {
        ciudad: true, // Trae datos de la ciudad
        hotel: true // Trae datos del hotel
      }
    })
    res.json(reservas)

  } catch (error) {
    res.status(500).json({
      error: "Error al obtener las reservas"
    })
  }
}

// Busca reserva según el id
const getReserva = async (req, res) => {
  const { id } = req.params

  try {
    const reserva = await prisma.reserva.findUnique({
      where: {
        id: parseInt(id)
      },
      include: {
        ciudad: true, // Trae datos de la ciudad
        hotel: true // Trae datos del hotel
      }
    })

    if(!reserva) {
      res.status(404).json({
        error: "Reserva no encontrada"
      })
      return
    }
    res.json(reserva)

  } catch (error) {
    res.status(500).json({
      error: "Error al buscar la reserva"
    })
  }
}

//Falta verificar q el hotel y la ciudad coincidan
const createReserva = async (req, res) => {
  const { nombre_completo, email, numero_contacto, ciudad, id_ciudad, hotel, id_hotel, cant_personas, cant_habitaciones, fecha_ingreso, fecha_salida } = req.body

  if (!nombre_completo || !id_ciudad || !id_hotel) {
    return res.status(400).json({ error: "Los campos nombre, ID de ciudad e ID de hotel son requeridos" })
  }

  try {
    const ciudadExiste = await prisma.ciudad.findUnique({
      where: {
        id: parseInt(id_ciudad)
      }
    })

    const hotelExiste = await prisma.hotel.findUnique({
      where: {
        id: parseInt(id_hotel)
      }
    })

    if(!ciudadExiste || !hotelExiste) {
      return res.status(404).json({
        error: "Ciudad u hotel no encontrados"
      })
    }

    if (new Date(fecha_salida) < new Date(fecha_ingreso)) {
      return res.status(400).json({
        error: "La fecha de salida debe ser posterior a la de ingreso"
      })
    }

    const nuevaReserva = await prisma.reserva.create({
      data: {
        nombre_completo,
        email,
        numero_contacto,
        id_ciudad: parseInt(id_ciudad),
        id_hotel: parseInt(id_hotel),
        cant_personas: parseInt(cant_personas), 
        cant_habitaciones: parseInt(cant_habitaciones),
        fecha_ingreso: fecha_ingreso,
        fecha_salida: fecha_salida
      },
      include: {
        ciudad: true, // Trae datos de la ciudad
        hotel: true // Trae datos del hotel
      }
    })
    res.status(201).json(nuevaReserva)

  } catch (error) {
    res.status(500).json({
      error: "Error al crear la reserva"
    })
  }
}

// Solo modifica lo que se ponga en el body, lo demás no
const updateReserva = async (req, res) => {
  const { id } = req.params
  const { nombre_completo, email, numero_contacto, ciudad, id_ciudad, hotel, id_hotel, cant_personas, cant_habitaciones, fecha_ingreso, fecha_salida } = req.body

  try {
    const reservaUpdated = await prisma.reserva.update({
      where: {
        id: parseInt(id)
      },
      data: {
        nombre_completo,
        email,
        numero_contacto,
        id_ciudad: parseInt(id_ciudad),
        id_hotel: parseInt(id_hotel),
        cant_personas: parseInt(cant_personas), 
        cant_habitaciones: parseInt(cant_habitaciones),
        fecha_ingreso: fecha_ingreso,
        fecha_salida: fecha_salida
      },
      include: {
        ciudad: true, // Trae datos de la ciudad del hotel
        hotel: true // Trae datos del hotel
      }
    })
    res.json(reservaUpdated)

  } catch (error) {
    res.status(404).json({
      error: "Reserva no encontrada"
    })
  }
}

const deleteReserva = async (req, res) => {
  const { id } = req.params

  try {
    await prisma.reserva.delete({
      where: {
        id: parseInt(id)
      }
    })
    res.sendStatus(200)

  } catch (error) {
    res.status(404).json({
      error: "Reserva no encontrada"
    })
  }
}

module.exports = {
  getAllReservas,
  getReserva,
  createReserva,
  updateReserva,
  deleteReserva
}