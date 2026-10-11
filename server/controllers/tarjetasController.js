const {
  obtenerTodasLasTarjetas,
  obtenerTarjetaPorId,
  crearTarjeta: crearTarjetaService,
  editarTarjeta: editarTarjetaService,
  eliminarTarjeta: eliminarTarjetaService,
} = require('../services/tarjetasService');

const getTarjetas = async (req, res) => {
  try {
    const tarjetas = await obtenerTodasLasTarjetas();
    res.json(tarjetas);
  } catch (err) {
    console.error('[tarjetasController] Error al obtener tarjetas:', err.message);
    res.status(500).json({ error: 'Error interno al obtener las tarjetas' });
  }
};

const getTarjetaById = async (req, res) => {
  try {
    const tarjeta = await obtenerTarjetaPorId(req.params.id);
    if (!tarjeta) return res.status(404).json({ error: 'Tarjeta no encontrada' });
    res.json(tarjeta);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar la tarjeta' });
  }
};

const crearTarjeta = async (req, res) => {
  try {
    const { titulo, precio } = req.body;
    if (!titulo || precio === undefined) {
      return res.status(400).json({ error: 'Título y precio son requeridos' });
    }
    const nueva = await crearTarjetaService(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    console.error('[tarjetasController] Error al crear tarjeta:', err.message);
    res.status(500).json({ error: 'Error interno al crear la tarjeta' });
  }
};

const editarTarjeta = async (req, res) => {
  try {
    const { id } = req.params;
    const actualizada = await editarTarjetaService(id, req.body);
    res.json(actualizada);
  } catch (err) {
    console.error('[tarjetasController] Error al editar tarjeta:', err.message);
    res.status(500).json({ error: 'Error interno al editar la tarjeta' });
  }
};

const eliminarTarjeta = async (req, res) => {
  try {
    const { id } = req.params;
    await eliminarTarjetaService(id);
    res.status(204).send();
  } catch (err) {
    console.error('[tarjetasController] Error al eliminar tarjeta:', err.message);
    res.status(500).json({ error: 'Error interno al eliminar la tarjeta' });
  }
};

module.exports = {
  getTarjetas,
  getTarjetaById,
  crearTarjeta,
  editarTarjeta,
  eliminarTarjeta,
};
