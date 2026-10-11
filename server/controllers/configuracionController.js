const {
  obtenerConfiguracion,
  actualizarConfiguracion: actualizarConfiguracionService,
  obtenerDiasVacaciones,
  crearDiaVacacion: crearDiaVacacionService,
  editarDiaVacacion: editarDiaVacacionService,
  eliminarDiaVacacion: eliminarDiaVacacionService,
} = require('../services/configuracionService');

const getConfiguracion = async (req, res) => {
  try {
    const config = await obtenerConfiguracion();
    res.json(config);
  } catch (err) {
    console.error('[configuracionController] Error al obtener config:', err.message);
    res.status(500).json({ error: 'Error interno al obtener la configuración' });
  }
};

const actualizarConfiguracion = async (req, res) => {
  try {
    const actualizada = await actualizarConfiguracionService(req.body);
    res.json(actualizada);
  } catch (err) {
    console.error('[configuracionController] Error al guardar config:', err.message);
    res.status(500).json({ error: 'Error interno al guardar la configuración' });
  }
};

const getDiasVacaciones = async (req, res) => {
  try {
    const vacaciones = await obtenerDiasVacaciones();
    res.json(vacaciones);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener días de vacaciones' });
  }
};

const crearDiaVacacion = async (req, res) => {
  try {
    const { fechaInicio, fechaFin } = req.body;
    if (!fechaInicio || !fechaFin) {
      return res.status(400).json({ error: 'Fecha de inicio y fin son requeridas' });
    }
    const nueva = await crearDiaVacacionService(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    console.error('[configuracionController] Error al crear vacaciones:', err.message);
    res.status(500).json({ error: 'Error al registrar el período de vacaciones' });
  }
};

const editarDiaVacacion = async (req, res) => {
  try {
    const { id } = req.params;
    const actualizada = await editarDiaVacacionService(id, req.body);
    res.json(actualizada);
  } catch (err) {
    res.status(500).json({ error: 'Error al editar el período de vacaciones' });
  }
};

const eliminarDiaVacacion = async (req, res) => {
  try {
    const { id } = req.params;
    await eliminarDiaVacacionService(id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el período de vacaciones' });
  }
};

module.exports = {
  getConfiguracion,
  actualizarConfiguracion,
  getDiasVacaciones,
  crearDiaVacacion,
  editarDiaVacacion,
  eliminarDiaVacacion,
};
