const express = require('express');
const router = express.Router();
const {
  getPosts,
  getPostById,
  crearPost,
  editarPost,
  eliminarPost,
} = require('../controllers/blogController');
const { verificarToken } = require('../middlewares/authMiddleware');

router.get('/', getPosts);
router.get('/:id', getPostById);

router.post('/', verificarToken, crearPost);
router.put('/:id', verificarToken, editarPost);
router.delete('/:id', verificarToken, eliminarPost);

module.exports = router;
