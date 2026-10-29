const crypto = require('crypto');
const prisma = require('./prismaClient');
const { enviarConfirmacionPedidoTarjeta, enviarCambioEstadoPedidoTarjeta } = require('./pedidoTarjetaEmailService');

class PedidoError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}

const ESTADOS = ['PENDIENTE', 'CONTACTADO', 'COMPLETADO', 'CANCELADO'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const generarCodigo = () => `BR-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
const limpiar = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

const crearPedido = async (body = {}, baseUrl) => {
  const nombre = limpiar(body.nombre, 120);
  const email = limpiar(body.email, 160).toLowerCase();
  const telefono = limpiar(body.telefono, 40);
  const destinatario = limpiar(body.destinatario, 120);
  const mensaje = limpiar(body.mensaje, 1000);

  if (nombre.length < 2) throw new PedidoError('Indica tu nombre completo.');
  if (!EMAIL_RE.test(email)) throw new PedidoError('El email no es válido.');
  if (telefono.length < 6) throw new PedidoError('Indica un teléfono de contacto válido.');

  const tarjetaId = parseInt(body.tarjetaId, 10);
  if (!tarjetaId) throw new PedidoError('Selecciona una tarjeta regalo.');
  const tarjeta = await prisma.tarjetaRegalo.findUnique({ where: { id: tarjetaId } });
  if (!tarjeta || !tarjeta.activo) throw new PedidoError('La tarjeta seleccionada no está disponible.', 404);

  const pedido = await prisma.pedidoTarjeta.create({
    data: {
      codigo: generarCodigo(),
      tarjetaId: tarjeta.id,
      tarjetaTitulo: tarjeta.titulo,
      importe: tarjeta.precio,
      nombre,
      email,
      telefono,
      destinatario: destinatario || null,
      mensaje: mensaje || null,
    },
  });

  enviarConfirmacionPedidoTarjeta(pedido, baseUrl);
  return pedido;
};

const obtenerPedidoPorCodigo = async (codigo) => {
  const limpio = limpiar(codigo, 32).toUpperCase();
  if (!limpio) throw new PedidoError('Código de bono no válido.', 400);
  const pedido = await prisma.pedidoTarjeta.findUnique({ where: { codigo: limpio } });
  if (!pedido || pedido.estado === 'CANCELADO') {
    throw new PedidoError('Bono regalo no encontrado.', 404);
  }
  return pedido;
};

const listarPedidos = async ({ estado, q } = {}) => {
  const where = {};
  if (estado && ESTADOS.includes(estado)) where.estado = estado;
  if (q) {
    where.OR = [
      { nombre: { contains: q } },
      { email: { contains: q } },
      { telefono: { contains: q } },
      { codigo: { contains: q } },
      { destinatario: { contains: q } },
      { tarjetaTitulo: { contains: q } },
    ];
  }
  return prisma.pedidoTarjeta.findMany({ where, orderBy: { createdAt: 'desc' } });
};

const cambiarEstado = async (id, estado, baseUrl) => {
  if (!ESTADOS.includes(estado)) throw new PedidoError('Estado no válido.');
  const pedidoId = parseInt(id, 10);
  const actual = await prisma.pedidoTarjeta.findUnique({ where: { id: pedidoId } });
  if (!actual) throw new PedidoError('Pedido no encontrado.', 404);
  if (actual.estado === estado) return actual;

  const pedido = await prisma.pedidoTarjeta.update({
    where: { id: pedidoId },
    data: { estado, canceladoAt: estado === 'CANCELADO' ? new Date() : null },
  });
  if (estado === 'COMPLETADO' || estado === 'CANCELADO') {
    enviarCambioEstadoPedidoTarjeta(pedido, baseUrl);
  }
  return pedido;
};

module.exports = {
  PedidoError,
  crearPedido,
  obtenerPedidoPorCodigo,
  listarPedidos,
  cambiarEstado,
};
