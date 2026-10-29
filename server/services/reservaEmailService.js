const { obtenerRemitente, BREVO_API_URL } = require('./brevoService');
const { generarHtmlReserva, formatearFecha, formatearTituloExperiencia, escapeHtml } = require('../templates/reservaEmailTemplate');
const prisma = require('./prismaClient');

/**
 * Envío transaccional vía Brevo. Nunca lanza: un fallo de email no debe romper la reserva.
 * Sin BREVO_API_KEY opera en modo simulado (log por consola), igual que la newsletter.
 */
const enviarEmail = async ({ to, subject, htmlContent, replyTo }) => {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.warn(`[reservaEmail] BREVO_API_KEY ausente. Email simulado a ${to}: "${subject}"`);
    return { simulated: true };
  }
  try {
    const sender = await obtenerRemitente(apiKey);
    const payload = {
      sender,
      to: [{ email: to }],
      subject,
      htmlContent,
      ...(replyTo && typeof replyTo === 'string' && replyTo.includes('@') ? { replyTo: { email: replyTo } } : {}),
    };
    const res = await fetch(`${BREVO_API_URL}/smtp/email`, {
      method: 'POST',
      headers: { 'api-key': apiKey, 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.warn('[reservaEmail] Brevo rechazó el email:', await res.json().catch(() => ({})));
      return { success: false };
    }
    return { success: true };
  } catch (err) {
    console.warn('[reservaEmail] Error al enviar email:', err.message);
    return { success: false };
  }
};

/** Copia al correo interno de reservas configurado en el panel (si existe). */
const notificarBodega = async (subject, reserva) => {
  try {
    const config = await prisma.configuracionGeneral.findUnique({ where: { id: 1 } });
    const destino = config?.emailReservas || process.env.BREVO_ADMIN_EMAIL;
    if (!destino || !destino.includes('@')) return;
    const { sesion } = reserva;
    const expTitulo = formatearTituloExperiencia(sesion);
    await enviarEmail({
      to: destino,
      subject,
      replyTo: reserva.email,
      htmlContent: `<p><strong>${escapeHtml(reserva.nombre)}</strong> (${escapeHtml(reserva.email)}, ${escapeHtml(reserva.telefono)})<br>
        ${escapeHtml(expTitulo)} · ${formatearFecha(sesion.fecha)} ${sesion.hora} · ${reserva.personas} pax<br>
        Código: ${escapeHtml(reserva.codigo)}</p>`,
    });
  } catch (err) {
    console.warn('[reservaEmail] No se pudo notificar a la bodega:', err.message);
  }
};

const enviarConfirmacionReserva = (reserva) => {
  const expTitulo = formatearTituloExperiencia(reserva.sesion);
  enviarEmail({
    to: reserva.email,
    subject: `Reserva confirmada · ${expTitulo}`,
    htmlContent: generarHtmlReserva({
      titulo: 'Reserva confirmada',
      intro: 'hemos registrado tu reserva. Te esperamos en la bodega.',
      reserva,
    }),
  });
  notificarBodega(`Nueva reserva ${reserva.codigo}`, reserva);
};

const enviarCancelacionReserva = (reserva) => {
  const expTitulo = formatearTituloExperiencia(reserva.sesion);
  enviarEmail({
    to: reserva.email,
    subject: `Reserva cancelada · ${expTitulo}`,
    htmlContent: generarHtmlReserva({
      titulo: 'Reserva cancelada',
      intro: 'tu reserva ha sido cancelada. Si quieres volver a reservar, estaremos encantados de recibirte.',
      reserva,
    }),
  });
  notificarBodega(`Reserva cancelada ${reserva.codigo}`, reserva);
};

const enviarReprogramacionReserva = (reserva, sesionAnterior) => {
  const expTitulo = formatearTituloExperiencia(reserva.sesion);
  enviarEmail({
    to: reserva.email,
    subject: `Reserva reprogramada · ${expTitulo}`,
    htmlContent: generarHtmlReserva({
      titulo: 'Reserva reprogramada',
      intro: 'hemos cambiado la fecha de tu reserva. Estos son los nuevos datos.',
      reserva,
      detalleExtra: `<p style="margin:16px 0 0;color:#502B3A;font-size:12px">Fecha anterior: ${formatearFecha(sesionAnterior.fecha)} · ${sesionAnterior.hora} h</p>`,
    }),
  });
  notificarBodega(`Reserva reprogramada ${reserva.codigo}`, reserva);
};

module.exports = { enviarEmail, enviarConfirmacionReserva, enviarCancelacionReserva, enviarReprogramacionReserva };
