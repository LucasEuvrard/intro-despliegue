const express = require('express');
const router = express.Router();

const {
    getAllHoteles,
    getHotel,
    getHotelesbyCiudad,
    createHotel,
    updateHotel,
    deleteHotel
} = require('../controllers/hotelController')

router.get('/', getAllHoteles)
router.get('/:id', getHotel)
router.get('/:ciudad_id/hoteles', getHotelesbyCiudad)
router.post('/', createHotel)
router.put('/:id', updateHotel)
router.delete('/:id', deleteHotel)

module.exports = router