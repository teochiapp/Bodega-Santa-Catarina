const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verificarToken } = require('../middlewares/authMiddleware');

// POST /api/auth/login
router.post('/login', authController.login);

// GET /api/auth/me o /api/auth/verify — comprueba la validez del token
router.get('/me', verificarToken, authController.me);
router.get('/verify', verificarToken, authController.me);

module.exports = router;
