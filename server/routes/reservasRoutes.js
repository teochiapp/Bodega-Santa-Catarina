const express = require('express');
const router = express.Router();
const {
  getDisponibilidad,
  postReserva,
  getReservas,
  getReserva,
  putCancelar,
  putReprogramar,
  putAsistencia,
  getHorarios,
  putHorarios,
  getHorariosMenu,
  putHorariosMenu,
} = require('../controllers/reservasController');
const { verificarToken } = require('../middlewares/authMiddleware');
const rateLimit = require('../middlewares/rateLimit');

const limitarCreacion = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: 'Has realizado demasiadas reservas desde esta conexión. Inténtalo más tarde.',
});

// Público
router.get('/disponibilidad', getDisponibilidad);
router.post('/', limitarCreacion, postReserva);

// Admin
router.get('/', verificarToken, getReservas);
router.get('/catas/:id/horarios', verificarToken, getHorarios);
router.put('/catas/:id/horarios', verificarToken, putHorarios);
router.get('/menus/:id/horarios', verificarToken, getHorariosMenu);
router.put('/menus/:id/horarios', verificarToken, putHorariosMenu);
router.get('/:id', verificarToken, getReserva);
router.put('/:id/cancelar', verificarToken, putCancelar);
router.put('/:id/reprogramar', verificarToken, putReprogramar);
router.put('/:id/asistencia', verificarToken, putAsistencia);

module.exports = router;
