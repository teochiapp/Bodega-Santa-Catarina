const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const vinosRoutes = require('./vinosRoutes');
const eventosRoutes = require('./eventosRoutes');
const catasRoutes = require('./catasRoutes');
const menusRoutes = require('./menusRoutes');
const blogRoutes = require('./blogRoutes');
const tarjetasRoutes = require('./tarjetasRoutes');
const configuracionRoutes = require('./configuracionRoutes');
const dashboardRoutes = require('./dashboardRoutes');

// Health check — verificar que la API está viva
router.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API funcionando correctamente' });
});

// Sub-routers por dominio
router.use('/auth', authRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/vinos', vinosRoutes);
router.use('/eventos', eventosRoutes);
router.use('/catas', catasRoutes);
router.use('/menus', menusRoutes);
router.use('/blog', blogRoutes);
router.use('/tarjetas', tarjetasRoutes);
router.use('/configuracion', configuracionRoutes);

module.exports = router;
