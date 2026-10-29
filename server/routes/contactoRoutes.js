const express = require('express');
const router = express.Router();
const { postContacto } = require('../controllers/contactoController');
const rateLimit = require('../middlewares/rateLimit');

const limitarContacto = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: 'Has enviado demasiados mensajes desde esta conexión. Inténtalo más tarde.',
});

router.post('/', limitarContacto, postContacto);

module.exports = router;

