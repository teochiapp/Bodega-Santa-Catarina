const express = require('express');
const router = express.Router();
const {
  getConfiguracion,
  actualizarConfiguracion,
  getDiasVacaciones,
  crearDiaVacacion,
  editarDiaVacacion,
  eliminarDiaVacacion,
} = require('../controllers/configuracionController');
const { verificarToken } = require('../middlewares/authMiddleware');

// Configuración general
router.get('/', getConfiguracion);
router.put('/', verificarToken, actualizarConfiguracion);

// Días de vacaciones / bloqueos para calendario de catas
router.get('/vacaciones', getDiasVacaciones);
router.post('/vacaciones', verificarToken, crearDiaVacacion);
router.put('/vacaciones/:id', verificarToken, editarDiaVacacion);
router.delete('/vacaciones/:id', verificarToken, eliminarDiaVacacion);

module.exports = router;
