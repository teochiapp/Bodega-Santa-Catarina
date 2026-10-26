const express = require('express');
const router = express.Router();
const {
  getHeroes,
  getHeroById,
  getHeroBySeccion,
  crearHero,
  editarHero,
  eliminarHero,
  resetearHeroes,
} = require('../controllers/heroesController');
const { verificarToken } = require('../middlewares/authMiddleware');

// Rutas públicas (consultadas por el sitio web al renderizar páginas)
router.get('/', getHeroes);
router.get('/seccion/:seccion', getHeroBySeccion);
router.get('/:id', getHeroById);

// Rutas protegidas (panel de administración)
router.post('/', verificarToken, crearHero);
router.post('/reset', verificarToken, resetearHeroes);
router.put('/:id', verificarToken, editarHero);
router.delete('/:id', verificarToken, eliminarHero);

module.exports = router;
