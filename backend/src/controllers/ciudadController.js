const { PrismaClient, Prisma } = require('@prisma/client')
const prisma = new PrismaClient()

// Busca todas las ciudades
const getAllCiudades = async (req, res) => {
  try {
    const ciudades = await prisma.ciudad.findMany()
    res.json(ciudades)

  } catch (error) {
    res.status(500).json({
      error: "Error al obtener las ciudades"
    })
  }
}

// Busca ciudad según el id
const getCiudad = async (req, res) => {
  const { id } = req.params

  try {
    const ciudad = await prisma.ciudad.findUnique({
      where: {
        id: parseInt(id)
      }
    })

    if(ciudad === null) {
      res.status(404).json({
        error: "Ciudad no encontrada"
      })
      return
    }
    res.json(ciudad)

  } catch (error) {
    res.status(500).json({
      error: "Error al buscar ciudad"
    })
  }
}

const createCiudad = async (req, res) => {
  const { nombre, foto_ciudad, provincia, tamaño, año_fundacion } = req.body

  if (!nombre || !provincia) {
    return res.status(400).json({ error: "Los campos nombre y provincia son requeridos" })
  }

  try {
    const nuevaCiudad = await prisma.ciudad.create({
      data: {
        nombre,
        foto_ciudad: foto_ciudad || "default.jpg", // usa default.jpg si no se especifica
        provincia,
        tamaño: new Prisma.Decimal(tamaño), // Conversión a decimal
        año_fundacion: año_fundacion
      }
    })
    res.status(201).json(nuevaCiudad)

  } catch (error) {
    res.status(500).json({
      error: "Error al crear ciudad"
    })
  }
}

// Solo modifica lo que se ponga en el body, lo demás no
const updateCiudad = async (req, res) => {
  const { id } = req.params
  const { nombre, foto_ciudad, provincia, tamaño, año_fundacion } = req.body

  try {
    const ciudadUpdated = await prisma.ciudad.update({
      where: {
        id: parseInt(id)
      },
      data: {
        nombre,
        foto_ciudad,
        provincia,
        tamaño,
        año_fundacion
      }
    })
    res.json(ciudadUpdated)

  } catch (error) {
    res.status(404).json({
      error: "Ciudad no encontrada"
    })
  }
}

const deleteCiudad = async (req, res) => {
  const { id } = req.params

  try {
    const ciudad_borrada = await prisma.ciudad.delete({
      where: {
        id: parseInt(id)
      }
    })
    res.status(200).json(ciudad_borrada)

  } catch (error) {
    res.status(404).json({
      error: "Ciudad no encontrada"
    })
  }
}

module.exports = {
  getAllCiudades,
  getCiudad,
  createCiudad,
  updateCiudad,
  deleteCiudad
}