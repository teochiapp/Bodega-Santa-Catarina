const {
  PedidoError,
  crearPedido,
  obtenerPedidoPorCodigo,
  listarPedidos,
  cambiarEstado,
} = require('../services/pedidosTarjetasService');
const { generarHtmlBonoRegalo } = require('../templates/pedidoTarjetaEmailTemplate');

const resolveRequestBaseUrl = (req) => {
  const proto = req.headers['x-forwarded-proto']?.split(',')[0]?.trim() || req.protocol || 'http';
  const host = req.headers['x-forwarded-host']?.split(',')[0]?.trim() || req.get('host');
  return host ? `${proto}://${host}` : undefined;
};

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
  const baseUrl = resolveRequestBaseUrl(req);
  const p = await crearPedido(req.body || {}, baseUrl);
  res.status(201).json({
    codigo: p.codigo,
    tarjeta: p.tarjetaTitulo,
    email: p.email,
    urlBono: `/api/pedidos-tarjetas/bono/${encodeURIComponent(p.codigo)}`,
  });
});

const getBonoHtml = manejar('bonoHtml', async (req, res) => {
  const baseUrl = resolveRequestBaseUrl(req);
  const pedido = await obtenerPedidoPorCodigo(req.params.codigo);
  const html = generarHtmlBonoRegalo({
    titulo: `Bono Regalo ${pedido.codigo} · Bodega Santa Catarina`,
    pedido,
    baseUrl,
    modoImpresion: true,
  });
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(html);
});

const getPedidos = manejar('listar', async (req, res) => res.json(await listarPedidos(req.query)));

const putEstado = manejar('estado', async (req, res) => {
  const baseUrl = resolveRequestBaseUrl(req);
  res.json(await cambiarEstado(req.params.id, req.body?.estado, baseUrl));
});

module.exports = { postPedido, getBonoHtml, getPedidos, putEstado };
