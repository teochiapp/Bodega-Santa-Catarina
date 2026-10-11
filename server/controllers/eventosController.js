const {
  obtenerTodosLosEventos,
  obtenerEventoPorId,
  crearEvento: crearEventoService,
  editarEvento: editarEventoService,
  eliminarEvento: eliminarEventoService,
} = require('../services/eventosService');

const getEventos = async (req, res) => {
  try {
    const eventos = await obtenerTodosLosEventos();
    res.json(eventos);
  } catch (err) {
    console.error('[eventosController] Error al obtener eventos:', err.message);
    res.status(500).json({ error: 'Error interno al obtener los eventos' });
  }
};

const getEventoById = async (req, res) => {
  try {
    const evento = await obtenerEventoPorId(req.params.id);
    if (!evento) return res.status(404).json({ error: 'Evento no encontrado' });
    res.json(evento);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar el evento' });
  }
};

const crearEvento = async (req, res) => {
  try {
    const { titulo, descripcion } = req.body;
    if (!titulo || !descripcion) {
      return res.status(400).json({ error: 'Título y descripción son requeridos' });
    }
    const nuevo = await crearEventoService(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    console.error('[eventosController] Error al crear evento:', err.message);
    res.status(500).json({ error: 'Error interno al crear el evento' });
  }
};

const editarEvento = async (req, res) => {
  try {
    const { id } = req.params;
    const actualizado = await editarEventoService(id, req.body);
    res.json(actualizado);
  } catch (err) {
    console.error('[eventosController] Error al editar evento:', err.message);
    res.status(500).json({ error: 'Error interno al editar el evento' });
  }
};

const eliminarEvento = async (req, res) => {
  try {
    const { id } = req.params;
    await eliminarEventoService(id);
    res.status(204).send();
  } catch (err) {
    console.error('[eventosController] Error al eliminar evento:', err.message);
    res.status(500).json({ error: 'Error interno al eliminar el evento' });
  }
};

module.exports = {
  getEventos,
  getEventoById,
  crearEvento,
  editarEvento,
  eliminarEvento,
};
