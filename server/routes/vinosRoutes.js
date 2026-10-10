const express = require('express');
const router = express.Router();
const vinosController = require('../controllers/vinosController');

// GET /api/vinos
router.get('/', vinosController.getVinos);

// POST /api/vinos
router.post('/', vinosController.crearVino);

// PUT /api/vinos/:id
router.put('/:id', vinosController.editarVino);

// DELETE /api/vinos/:id
router.delete('/:id', vinosController.eliminarVino);

module.exports = router;
