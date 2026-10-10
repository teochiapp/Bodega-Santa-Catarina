const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const vinosRoutes = require('./vinosRoutes');

// Health check — verificar que la API está viva
router.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API funcionando' });
});

// Sub-routers por dominio
router.use('/auth', authRoutes);
router.use('/vinos', vinosRoutes);

module.exports = router;
