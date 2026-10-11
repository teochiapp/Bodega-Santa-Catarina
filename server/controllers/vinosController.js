const {
  obtenerTodosLosVinos,
  obtenerVinoPorId,
  crearVino: crearVinoService,
  editarVino: editarVinoService,
  eliminarVino: eliminarVinoService,
} = require('../services/vinosService');

const getVinos = async (req, res) => {
  try {
    const vinos = await obtenerTodosLosVinos();
    res.json(vinos);
  } catch (err) {
    console.error('[vinosController] Error al obtener vinos:', err.message);
    res.status(500).json({ error: 'Error interno al obtener los vinos' });
  }
};

const getVinoById = async (req, res) => {
  try {
    const vino = await obtenerVinoPorId(req.params.id);
    if (!vino) return res.status(404).json({ error: 'Vino no encontrado' });
    res.json(vino);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar el vino' });
  }
};

const crearVino = async (req, res) => {
  try {
    const { variedad, coleccion, descripcion, titulo } = req.body;
    if (!variedad && !coleccion && !titulo) {
      return res.status(400).json({ error: 'Título o variedad son requeridos' });
    }

    const nuevoVino = await crearVinoService(req.body);
    res.status(201).json(nuevoVino);
  } catch (err) {
    console.error('[vinosController] Error al crear vino:', err.message);
    res.status(500).json({ error: 'Error interno al crear el vino' });
  }
};

const editarVino = async (req, res) => {
  try {
    const { id } = req.params;
    const vinoActualizado = await editarVinoService(id, req.body);
    res.json(vinoActualizado);
  } catch (err) {
    console.error('[vinosController] Error al editar vino:', err.message);
    res.status(500).json({ error: 'Error interno al editar el vino' });
  }
};

const eliminarVino = async (req, res) => {
  try {
    const { id } = req.params;
    await eliminarVinoService(id);
    res.status(204).send();
  } catch (err) {
    console.error('[vinosController] Error al eliminar vino:', err.message);
    res.status(500).json({ error: 'Error interno al eliminar el vino' });
  }
};

module.exports = { getVinos, getVinoById, crearVino, editarVino, eliminarVino };
