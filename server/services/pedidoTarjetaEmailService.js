const { enviarEmail } = require('./reservaEmailService');
const {
  generarHtmlBonoRegalo,
  generarHtmlCancelacionPedidoTarjeta,
  generarHtmlAvisoBodegaTarjeta,
} = require('../templates/pedidoTarjetaEmailTemplate');
const prisma = require('./prismaClient');

const notificarBodega = async (asunto, pedido, baseUrl) => {
  try {
    const config = await prisma.configuracionGeneral.findUnique({ where: { id: 1 } });
    const destino = config?.emailReservas || process.env.BREVO_ADMIN_EMAIL;
    if (!destino || !destino.includes('@')) return;
    await enviarEmail({
      to: destino,
      subject: asunto,
      replyTo: pedido.email,
      htmlContent: generarHtmlAvisoBodegaTarjeta(pedido, baseUrl),
    });
  } catch (err) {
    console.warn('[pedidoTarjetaEmail] No se pudo notificar a la bodega:', err.message);
  }
};

const enviarConfirmacionPedidoTarjeta = (pedido, baseUrl) => {
  enviarEmail({
    to: pedido.email,
    subject: `Solicitud de Bono Regalo recibida · ${pedido.tarjetaTitulo}`,
    htmlContent: generarHtmlBonoRegalo({
      titulo: 'Solicitud de Bono Regalo recibida',
      intro: 'hemos recibido tu solicitud de Bono Regalo. A continuación encontrarás tu Bono Regalo personalizado (anverso y reverso) con los datos indicados; nos pondremos en contacto contigo en breve para completar su activación.',
      pedido,
      baseUrl,
    }),
  });
  notificarBodega(`Nueva solicitud de Bono Regalo ${pedido.codigo}`, pedido, baseUrl);
};

const enviarCambioEstadoPedidoTarjeta = (pedido, baseUrl) => {
  const completado = pedido.estado === 'COMPLETADO';
  enviarEmail({
    to: pedido.email,
    subject: `${completado ? 'Tu Bono Regalo está listo' : 'Solicitud cancelada'} · ${pedido.tarjetaTitulo}`,
    htmlContent: completado
      ? generarHtmlBonoRegalo({
          titulo: 'Tu Bono Regalo está listo',
          intro: 'tu Bono Regalo ya ha sido activado. Gracias por regalar una experiencia en Bodega Santa Catarina.',
          pedido,
          baseUrl,
        })
      : generarHtmlCancelacionPedidoTarjeta(pedido),
  });
};

module.exports = { enviarConfirmacionPedidoTarjeta, enviarCambioEstadoPedidoTarjeta };
