const express = require('express');
const router = express.Router();
const { postPedido, getPedidos, putEstado } = require('../controllers/pedidosTarjetasController');
const { verificarToken } = require('../middlewares/authMiddleware');
const rateLimit = require('../middlewares/rateLimit');

const limitarCreacion = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: 'Has enviado demasiadas solicitudes desde esta conexión. Inténtalo más tarde.',
});

// Público
router.post('/', limitarCreacion, postPedido);

// Admin
router.get('/', verificarToken, getPedidos);
router.put('/:id/estado', verificarToken, putEstado);

module.exports = router;
