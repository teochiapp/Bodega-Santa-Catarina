const express = require('express');
const router = express.Router();
const {
  getEventos,
  getEventoById,
  crearEvento,
  editarEvento,
  eliminarEvento,
} = require('../controllers/eventosController');
const { verificarToken } = require('../middlewares/authMiddleware');

// Rutas públicas
router.get('/', getEventos);
router.get('/:id', getEventoById);

// Rutas protegidas para administración
router.post('/', verificarToken, crearEvento);
router.put('/:id', verificarToken, editarEvento);
router.delete('/:id', verificarToken, eliminarEvento);

module.exports = router;
