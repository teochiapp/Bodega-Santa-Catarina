const { suscribirNewsletter } = require('../services/brevoService');

const suscribir = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ error: 'Debes proporcionar un correo electrónico válido' });
    }

    const resultado = await suscribirNewsletter(email, {
      origen: 'Blog Santa Catarina',
    });

    return res.status(200).json(resultado);
  } catch (err) {
    console.error('[newsletterController] Error al procesar suscripción:', err.message);
    return res.status(500).json({
      error: err.message || 'Error interno al procesar la suscripción',
    });
  }
};

module.exports = {
  suscribir,
};
