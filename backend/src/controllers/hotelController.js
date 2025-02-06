const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient()

// Busca todos los hoteles
const getAllHoteles = async (req, res) => {
  try {
    const hoteles = await prisma.hotel.findMany({
      include: {
        ciudad: true // Trae datos de la ciudad del hotel
      }
    })
    res.json(hoteles)

  } catch (error) {
    res.status(500).json({
      error: "Error al obtener los hoteles"
    })
  }
}

// Busca hotel según el id
const getHotel = async (req, res) => {
  const { id } = req.params

  try {
    const hotel = await prisma.hotel.findUnique({
      where: {
        id: parseInt(id)
      },
      include: {
        ciudad: true // Trae datos de la ciudad del hotel
      }
    })

    if(hotel === null) {
      res.status(404).json({
        error: "Hotel no encontrado"
      })
      return
    }
    res.json(hotel)

  } catch (error) {
    res.status(500).json({
      error: "Error al buscar ciudad"
    })
  }
}

// Busca hotel según la ciudad
const getHotelbyCiudad = async (req, res) => {
  const { name, id } = req.params

  try {
    const hoteles = await prisma.hotel.findMany({
      where: {
        id_ciudad: parseInt(id)
      },
      include: {
        ciudad: true // Trae datos de la ciudad del hotel
      }
    })

    if(hoteles === null) {
      res.status(404).json({
        error: "Hotel no encontrado"
      })
      return
    }
    res.json(hoteles)

  } catch (error) {
    res.status(500).json({
      error: "Error al buscar ciudad"
    })
  }
}

const createHotel = async (req, res) => {
  const { nombre, foto_hotel, id_ciudad, cant_estrellas, cant_habitaciones, precio_noche, calle, num_calle, telefono } = req.body

  if (!nombre || !id_ciudad) {
    return res.status(400).json({ error: "Los campos nombre e ID de ciudad son requeridos" })
  }

  try {
    const ciudadExiste = await prisma.ciudad.findUnique({
      where: {
        id: parseInt(id_ciudad)
      }
    })

    if(!ciudadExiste) {
      return res.status(404).json({
        error: "Ciudad no encontrada"
      })
    }

    const nuevoHotel = await prisma.hotel.create({
      data: {
        nombre,
        foto_hotel: foto_hotel || "default.jpg", // Cambiar a ruta default
        id_ciudad: parseInt(id_ciudad),
        cant_estrellas: parseInt(cant_estrellas), // Conversión a decimal
        cant_habitaciones: parseInt(cant_habitaciones),
        precio_noche: parseInt(precio_noche),
        calle: calle || "Sin dirección", // por default sin dirección
        num_calle: parseInt(num_calle),
        telefono: parseInt(telefono)
      },
      include: {
        ciudad: true // Trae datos de la ciudad del hotel
      }
    })
    res.status(201).json(nuevoHotel)

  } catch (error) {
    res.status(500).json({
      error: "Error al crear hotel"
    })
  }
}

// Solo modifica lo que se ponga en el body, lo demás no
const updateHotel = async (req, res) => {
  const { id } = req.params
  const { nombre, foto_hotel, id_ciudad, calificacion, calle, num_calle, telefono } = req.body

  try {
    const hotelUpdated = await prisma.hotel.update({
      where: {
        id: parseInt(id)
      },
      data: {
        nombre,
        foto_hotel,
        id_ciudad,
        calificacion,
        calle,
        num_calle,
        telefono
      },
      include: {
        ciudad: true // Trae datos de la ciudad del hotel
      }
    })
    res.json(hotelUpdated)

  } catch (error) {
    res.status(404).json({
      error: "Hotel no encontrado"
    })
  }
}

const deleteHotel = async (req, res) => {
  const { id } = req.params

  try {
    await prisma.hotel.delete({
      where: {
        id: parseInt(id)
      }
    })
    res.sendStatus(200)

  } catch (error) {
    res.status(404).json({
      error: "Hotel no encontrado"
    })
  }
}

module.exports = {
    getAllHoteles,
    getHotel,
    getHotelbyCiudad,
    createHotel,
    updateHotel,
    deleteHotel
  }