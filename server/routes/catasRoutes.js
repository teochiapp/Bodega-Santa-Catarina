const express = require('express');
const router = express.Router();
const {
  getCatas,
  getCataById,
  crearCata,
  editarCata,
  eliminarCata,
} = require('../controllers/catasController');
const { verificarToken } = require('../middlewares/authMiddleware');

router.get('/', getCatas);
router.get('/:id', getCataById);

router.post('/', verificarToken, crearCata);
router.put('/:id', verificarToken, editarCata);
router.delete('/:id', verificarToken, eliminarCata);

module.exports = router;
