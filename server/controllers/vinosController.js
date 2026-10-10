const { obtenerTodosLosVinos, crearVino: crearVinoService, editarVino: editarVinoService, eliminarVino: eliminarVinoService } = require('../services/vinosService');

/**
 * GET /api/vinos
 * Devuelve todos los vinos como JSON.
 */
const getVinos = async (req, res) => {
  try {
    const vinos = await obtenerTodosLosVinos();
    res.json(vinos);
  } catch (err) {
    console.error('[vinosController] Error al obtener vinos:', err.message);
    res.status(500).json({ error: 'Error interno al obtener los vinos' });
  }
};

/**
 * POST /api/vinos
 * Crea un nuevo vino.
 */
const crearVino = async (req, res) => {
  try {
    const { coleccion, anio, variedad, tipo, descripcion } = req.body;
    
    // Validaciones básicas
    if (!coleccion || !anio || !variedad || !tipo || !descripcion) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const nuevoVino = await crearVinoService(req.body);
    res.status(201).json(nuevoVino);
  } catch (err) {
    console.error('[vinosController] Error al crear vino:', err.message);
    res.status(500).json({ error: 'Error interno al crear el vino' });
  }
};

/**
 * PUT /api/vinos/:id
 * Edita un vino existente.
 */
const editarVino = async (req, res) => {
  try {
    const { id } = req.params;
    const { coleccion, anio, variedad, tipo, descripcion } = req.body;
    
    if (!coleccion || !anio || !variedad || !tipo || !descripcion) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const vinoEditado = await editarVinoService(id, req.body);
    res.json(vinoEditado);
  } catch (err) {
    console.error('[vinosController] Error al editar vino:', err.message);
    res.status(500).json({ error: 'Error interno al editar el vino' });
  }
};

/**
 * DELETE /api/vinos/:id
 * Elimina un vino.
 */
const eliminarVino = async (req, res) => {
  try {
    const { id } = req.params;
    await eliminarVinoService(id);
    res.status(204).send();
  } catch (err) {
    console.error('[vinosController] Error al eliminar vino:', err.message);
    require('fs').appendFileSync('error.log', err.stack + '\n');
    res.status(500).json({ error: 'Error interno al eliminar el vino: ' + err.message });
  }
};

module.exports = { getVinos, crearVino, editarVino, eliminarVino };
