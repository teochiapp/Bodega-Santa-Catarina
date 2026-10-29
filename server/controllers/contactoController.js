const { procesarFormularioContacto, ContactoError } = require('../services/contactoService');

const postContacto = async (req, res) => {
  try {
    const resultado = await procesarFormularioContacto(req.body);
    res.status(201).json(resultado);
  } catch (err) {
    if (err instanceof ContactoError) {
      return res.status(err.status).json({ error: err.message });
    }
    console.error('[contactoController] Error inesperado:', err);
    res.status(500).json({ error: 'No se pudo enviar tu consulta en este momento.' });
  }
};

module.exports = { postContacto };

