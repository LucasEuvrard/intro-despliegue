const express = require('express');
const router = express.Router();

const {
    getAllReservas,
    getReserva,
    createReserva,
    updateReserva,
    deleteReserva
} = require('../controllers/reservaController')

router.get('/', getAllReservas)
router.get('/:id', getReserva)
router.post('/', createReserva)
router.put('/:id', updateReserva)
router.delete('/:id', deleteReserva)

module.exports = router