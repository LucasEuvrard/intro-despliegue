const express = require('express');
const router = express.Router();

const {
    getAllCiudades,
    getCiudad,
    createCiudad,
    updateCiudad,
    deleteCiudad
} = require('../controllers/ciudadController')

router.get('/', getAllCiudades)
router.get('/:id', getCiudad)
router.post('/', createCiudad)
router.put('/:id', updateCiudad)
router.delete('/:id', deleteCiudad)

module.exports = router