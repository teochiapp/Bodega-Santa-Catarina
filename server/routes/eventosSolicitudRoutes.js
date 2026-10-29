const express = require('express');
const router = express.Router();
const { postSolicitudEvento } = require('../controllers/eventosSolicitudController');
const rateLimit = require('../middlewares/rateLimit');

const limitarSolicitudesEventos = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: 'Has enviado demasiadas solicitudes desde esta conexión. Inténtalo más tarde.',
});

router.post('/', limitarSolicitudesEventos, postSolicitudEvento);

module.exports = router;

