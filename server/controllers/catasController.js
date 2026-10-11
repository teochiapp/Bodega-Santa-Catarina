const {
  obtenerTodasLasCatas,
  obtenerCataPorId,
  crearCata: crearCataService,
  editarCata: editarCataService,
  eliminarCata: eliminarCataService,
} = require('../services/catasService');

const getCatas = async (req, res) => {
  try {
    const catas = await obtenerTodasLasCatas();
    res.json(catas);
  } catch (err) {
    console.error('[catasController] Error al obtener catas:', err.message);
    res.status(500).json({ error: 'Error interno al obtener las catas' });
  }
};

const getCataById = async (req, res) => {
  try {
    const cata = await obtenerCataPorId(req.params.id);
    if (!cata) return res.status(404).json({ error: 'Cata no encontrada' });
    res.json(cata);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar la cata' });
  }
};

const crearCata = async (req, res) => {
  try {
    const { titulo, precio, descripcion } = req.body;
    if (!titulo || precio === undefined) {
      return res.status(400).json({ error: 'Título y precio son requeridos' });
    }
    const nueva = await crearCataService(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    console.error('[catasController] Error al crear cata:', err.message);
    res.status(500).json({ error: 'Error interno al crear la cata' });
  }
};

const editarCata = async (req, res) => {
  try {
    const { id } = req.params;
    const actualizada = await editarCataService(id, req.body);
    res.json(actualizada);
  } catch (err) {
    console.error('[catasController] Error al editar cata:', err.message);
    res.status(500).json({ error: 'Error interno al editar la cata' });
  }
};

const eliminarCata = async (req, res) => {
  try {
    const { id } = req.params;
    await eliminarCataService(id);
    res.status(204).send();
  } catch (err) {
    console.error('[catasController] Error al eliminar cata:', err.message);
    res.status(500).json({ error: 'Error interno al eliminar la cata' });
  }
};

module.exports = {
  getCatas,
  getCataById,
  crearCata,
  editarCata,
  eliminarCata,
};
