const {
  ReservaError,
  obtenerDisponibilidadMes,
  crearReserva,
  listarReservas,
  obtenerReserva,
  cancelarReserva,
  reprogramarReserva,
  registrarAsistencia,
  obtenerHorarios,
  reemplazarHorarios,
  obtenerHorariosMenu,
  reemplazarHorariosMenu,
} = require('../services/reservasService');

/** Envuelve un handler traduciendo ReservaError a su status HTTP y ocultando errores internos. */
const manejar = (nombre, fn) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (err) {
    if (err instanceof ReservaError) return res.status(err.status).json({ error: err.message });
    console.error(`[reservasController] ${nombre}:`, err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// ── Público ──
const getDisponibilidad = manejar('disponibilidad', async (req, res) => {
  res.json(await obtenerDisponibilidadMes({
    cataId: req.query.cataId,
    menuId: req.query.menuId,
    mes: req.query.mes,
  }));
});

const postReserva = manejar('crear', async (req, res) => {
  const r = await crearReserva(req.body || {});
  const expTitulo = r.sesion?.cata?.titulo || r.sesion?.menu?.titulo || 'Experiencia';
  res.status(201).json({
    codigo: r.codigo,
    experiencia: expTitulo,
    fecha: r.sesion.fecha.toISOString().slice(0, 10),
    hora: r.sesion.hora,
    personas: r.personas,
    email: r.email,
  });
});

// ── Admin ──
const getReservas = manejar('listar', async (req, res) => res.json(await listarReservas(req.query)));
const getReserva = manejar('obtener', async (req, res) => res.json(await obtenerReserva(req.params.id)));
const putCancelar = manejar('cancelar', async (req, res) => res.json(await cancelarReserva(req.params.id)));
const putReprogramar = manejar('reprogramar', async (req, res) =>
  res.json(await reprogramarReserva(req.params.id, req.body || {})));
const putAsistencia = manejar('asistencia', async (req, res) =>
  res.json(await registrarAsistencia(req.params.id, req.body?.estado)));

const getHorarios = manejar('horarios', async (req, res) => res.json(await obtenerHorarios(req.params.id)));
const putHorarios = manejar('guardar horarios', async (req, res) =>
  res.json(await reemplazarHorarios(req.params.id, req.body?.horarios)));

const getHorariosMenu = manejar('horarios menu', async (req, res) => res.json(await obtenerHorariosMenu(req.params.id)));
const putHorariosMenu = manejar('guardar horarios menu', async (req, res) =>
  res.json(await reemplazarHorariosMenu(req.params.id, req.body?.horarios)));

module.exports = {
  getDisponibilidad,
  postReserva,
  getReservas,
  getReserva,
  putCancelar,
  putReprogramar,
  putAsistencia,
  getHorarios,
  putHorarios,
  getHorariosMenu,
  putHorariosMenu,
};
