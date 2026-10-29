const { procesarSolicitudEvento, EventoSolicitudError } = require('../services/eventosSolicitudService');

const postSolicitudEvento = async (req, res) => {
  try {
    const resultado = await procesarSolicitudEvento(req.body);
    res.status(201).json(resultado);
  } catch (err) {
    if (err instanceof EventoSolicitudError) {
      return res.status(err.status).json({ error: err.message });
    }
    console.error('[eventosSolicitudController] Error inesperado:', err);
    res.status(500).json({ error: 'No se pudo procesar la solicitud en este momento.' });
  }
};

module.exports = { postSolicitudEvento };

