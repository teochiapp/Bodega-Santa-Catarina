const express = require('express');
const router = express.Router();
const { suscribir } = require('../controllers/newsletterController');

// POST /api/newsletter/subscribe
router.post('/subscribe', suscribir);

module.exports = router;
