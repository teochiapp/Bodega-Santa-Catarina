const express = require('express');
const router = express.Router();
const vinosController = require('../controllers/vinosController');

const { verificarToken } = require('../middlewares/authMiddleware');

// GET /api/vinos
router.get('/', vinosController.getVinos);

// POST /api/vinos
router.post('/', verificarToken, vinosController.crearVino);

// PUT /api/vinos/:id
router.put('/:id', verificarToken, vinosController.editarVino);

// DELETE /api/vinos/:id
router.delete('/:id', verificarToken, vinosController.eliminarVino);

module.exports = router;
