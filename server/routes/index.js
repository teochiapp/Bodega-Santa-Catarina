const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const vinosRoutes = require('./vinosRoutes');
const catasRoutes = require('./catasRoutes');
const menusRoutes = require('./menusRoutes');
const blogRoutes = require('./blogRoutes');
const tarjetasRoutes = require('./tarjetasRoutes');
const configuracionRoutes = require('./configuracionRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const uploadRoutes = require('./uploadRoutes');
const tiendaGaleriaRoutes = require('./tiendaGaleriaRoutes');
const newsletterRoutes = require('./newsletterRoutes');
const reservasRoutes = require('./reservasRoutes');
const pedidosTarjetasRoutes = require('./pedidosTarjetasRoutes');
const heroesRoutes = require('./heroesRoutes');

// Health check — verificar que la API está viva
router.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API funcionando correctamente' });
});

// Sub-routers por dominio
router.use('/auth', authRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/vinos', vinosRoutes);
router.use('/catas', catasRoutes);
router.use('/menus', menusRoutes);
router.use('/blog', blogRoutes);
router.use('/tarjetas', tarjetasRoutes);
router.use('/configuracion', configuracionRoutes);
router.use('/upload', uploadRoutes);
router.use('/tienda-galeria', tiendaGaleriaRoutes);
router.use('/newsletter', newsletterRoutes);
router.use('/reservas', reservasRoutes);
router.use('/pedidos-tarjetas', pedidosTarjetasRoutes);
router.use('/heroes', heroesRoutes);

module.exports = router;
