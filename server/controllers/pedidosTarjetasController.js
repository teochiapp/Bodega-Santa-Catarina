const {
  PedidoError,
  crearPedido,
  listarPedidos,
  cambiarEstado,
} = require('../services/pedidosTarjetasService');

const manejar = (nombre, fn) => async (req, res) => {
  try {
    await fn(req, res);
  } catch (err) {
    if (err instanceof PedidoError) return res.status(err.status).json({ error: err.message });
    console.error(`[pedidosTarjetasController] ${nombre}:`, err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const postPedido = manejar('crear', async (req, res) => {
  const p = await crearPedido(req.body || {});
  res.status(201).json({ codigo: p.codigo, tarjeta: p.tarjetaTitulo, email: p.email });
});

const getPedidos = manejar('listar', async (req, res) => res.json(await listarPedidos(req.query)));

const putEstado = manejar('estado', async (req, res) =>
  res.json(await cambiarEstado(req.params.id, req.body?.estado)));

module.exports = { postPedido, getPedidos, putEstado };
