const express = require('express');
const router = express.Router();
const {
  getImagenes,
  getImagenById,
  crearImagen,
  editarImagen,
  eliminarImagen,
} = require('../controllers/tiendaGaleriaController');
const { verificarToken } = require('../middlewares/authMiddleware');

router.get('/', getImagenes);
router.get('/:id', getImagenById);

router.post('/', verificarToken, crearImagen);
router.put('/:id', verificarToken, editarImagen);
router.delete('/:id', verificarToken, eliminarImagen);

module.exports = router;
