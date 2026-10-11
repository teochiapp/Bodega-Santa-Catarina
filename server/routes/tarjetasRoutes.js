const express = require('express');
const router = express.Router();
const {
  getTarjetas,
  getTarjetaById,
  crearTarjeta,
  editarTarjeta,
  eliminarTarjeta,
} = require('../controllers/tarjetasController');
const { verificarToken } = require('../middlewares/authMiddleware');

router.get('/', getTarjetas);
router.get('/:id', getTarjetaById);

router.post('/', verificarToken, crearTarjeta);
router.put('/:id', verificarToken, editarTarjeta);
router.delete('/:id', verificarToken, eliminarTarjeta);

module.exports = router;
