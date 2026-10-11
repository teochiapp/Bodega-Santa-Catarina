const express = require('express');
const router = express.Router();
const {
  getMenus,
  getMenuById,
  crearMenu,
  editarMenu,
  eliminarMenu,
} = require('../controllers/menusController');
const { verificarToken } = require('../middlewares/authMiddleware');

router.get('/', getMenus);
router.get('/:id', getMenuById);

router.post('/', verificarToken, crearMenu);
router.put('/:id', verificarToken, editarMenu);
router.delete('/:id', verificarToken, eliminarMenu);

module.exports = router;
