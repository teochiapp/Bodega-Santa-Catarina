const { enviarEmail } = require('./reservaEmailService');
const { escapeHtml } = require('../templates/reservaEmailTemplate');
const prisma = require('./prismaClient');

const html = ({ titulo, intro, pedido }) => {
  const filas = [
    ['Tarjeta regalo', pedido.tarjetaTitulo],
    ['Importe', Number(pedido.importe) > 0 ? `${Number(pedido.importe).toFixed(2)} €` : 'A consultar'],
    ['Para', pedido.destinatario || '—'],
    ['Código de solicitud', pedido.codigo],
  ]
    .map(
      ([k, v]) => `<tr>
        <td style="padding:10px 0;border-top:1px solid #e0ddd5;color:#C2A478;font-size:11px;letter-spacing:.14em;text-transform:uppercase;width:42%">${k}</td>
        <td style="padding:10px 0;border-top:1px solid #e0ddd5;color:#502B3A;font-size:14px">${escapeHtml(v)}</td>
      </tr>`
    )
    .join('');

  return `<!doctype html><html lang="es"><body style="margin:0;background:#F2ECE4;font-family:Arial,Helvetica,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 12px">
    <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#f4f2eb;border:1px solid #e0ddd5">
      <tr><td style="background:#502B3A;color:#F2ECE4;padding:24px 32px;font-size:13px;letter-spacing:.2em">BODEGA SANTA CATARINA</td></tr>
      <tr><td style="padding:32px">
        <h1 style="margin:0 0 12px;font-family:Georgia,serif;font-weight:normal;font-size:28px;color:#502B3A">${escapeHtml(titulo)}</h1>
        <p style="margin:0 0 24px;color:#502B3A;font-size:14px;line-height:1.7">Hola ${escapeHtml(pedido.nombre)}, ${intro}</p>
        <table width="100%" cellpadding="0" cellspacing="0">${filas}</table>
        <p style="margin:28px 0 0;color:#502B3A;font-size:12px;line-height:1.7">
          Finca Son Aloy, Sencelles (Mallorca).<br>
          ¿Dudas? Responde a este correo o escríbenos por WhatsApp al +34 618 672 773.
        </p>
      </td></tr>
    </table>
  </td></tr></table></body></html>`;
};

const notificarBodega = async (asunto, pedido) => {
  try {
    const config = await prisma.configuracionGeneral.findUnique({ where: { id: 1 } });
    const destino = config?.emailReservas || process.env.BREVO_ADMIN_EMAIL;
    if (!destino || !destino.includes('@')) return;
    await enviarEmail({
      to: destino,
      subject: asunto,
      htmlContent: `<p><strong>${escapeHtml(pedido.nombre)}</strong> (${escapeHtml(pedido.email)}, ${escapeHtml(pedido.telefono)})<br>
        ${escapeHtml(pedido.tarjetaTitulo)} · ${Number(pedido.importe).toFixed(2)} €<br>
        Para: ${escapeHtml(pedido.destinatario || '—')}<br>
        Mensaje: ${escapeHtml(pedido.mensaje || '—')}<br>
        Código: ${escapeHtml(pedido.codigo)}</p>`,
    });
  } catch (err) {
    console.warn('[pedidoTarjetaEmail] No se pudo notificar a la bodega:', err.message);
  }
};

const enviarConfirmacionPedidoTarjeta = (pedido) => {
  enviarEmail({
    to: pedido.email,
    subject: `Solicitud de tarjeta regalo recibida · ${pedido.tarjetaTitulo}`,
    htmlContent: html({
      titulo: 'Solicitud recibida',
      intro: 'hemos recibido tu solicitud de tarjeta regalo. Nos pondremos en contacto contigo en breve para completarla y personalizarla.',
      pedido,
    }),
  });
  notificarBodega(`Nueva solicitud de tarjeta regalo ${pedido.codigo}`, pedido);
};

const enviarCambioEstadoPedidoTarjeta = (pedido) => {
  const completado = pedido.estado === 'COMPLETADO';
  enviarEmail({
    to: pedido.email,
    subject: `${completado ? 'Tarjeta regalo lista' : 'Solicitud cancelada'} · ${pedido.tarjetaTitulo}`,
    htmlContent: html({
      titulo: completado ? 'Tu tarjeta regalo está lista' : 'Solicitud cancelada',
      intro: completado
        ? 'tu tarjeta regalo ha sido gestionada. Gracias por regalar una experiencia en Santa Catarina.'
        : 'tu solicitud de tarjeta regalo ha sido cancelada. Si quieres retomarla, estaremos encantados de ayudarte.',
      pedido,
    }),
  });
};

module.exports = { enviarConfirmacionPedidoTarjeta, enviarCambioEstadoPedidoTarjeta };
