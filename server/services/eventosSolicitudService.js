const prisma = require('./prismaClient');
const { enviarEmail } = require('./reservaEmailService');
const {
  generarHtmlConfirmacionEventoCliente,
  generarHtmlAvisoEventoBodega,
} = require('../templates/eventosEmailTemplate');

class EventoSolicitudError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TEL_RE = /^[0-9+() \-]{7,25}$/;

const validarSolicitudEvento = (body = {}) => {
  const nombre = String(body.nombre ?? body.name ?? '').trim();
  const email = String(body.email ?? '').trim().toLowerCase();
  const telefono = String(body.telefono ?? body.phone ?? '').trim();
  const tipoEvento = String(body.tipoEvento ?? body.eventType ?? 'Solicitud de espacio').trim().slice(0, 140);
  const espacio = String(body.espacio ?? body.space ?? '').trim().slice(0, 120);
  const fechaAproximada = String(body.fechaAproximada ?? body.date ?? '').trim().slice(0, 40);
  const invitadosRaw = body.invitados ?? body.guests;
  const invitados = invitadosRaw !== undefined && invitadosRaw !== null && String(invitadosRaw).trim() !== ''
    ? parseInt(invitadosRaw, 10)
    : null;
  const mensaje = String(body.mensaje ?? body.message ?? '').trim().slice(0, 3000);

  if (nombre.length < 2 || nombre.length > 140) {
    throw new EventoSolicitudError('Por favor, indica un nombre válido.');
  }
  if (!EMAIL_RE.test(email) || email.length > 190) {
    throw new EventoSolicitudError('Por favor, indica un correo electrónico válido.');
  }
  if (!TEL_RE.test(telefono)) {
    throw new EventoSolicitudError('Por favor, indica un teléfono de contacto válido.');
  }
  if (!espacio) {
    throw new EventoSolicitudError('Por favor, selecciona un espacio de interés.');
  }
  if (invitados === null || Number.isNaN(invitados) || invitados < 1 || invitados > 2000) {
    throw new EventoSolicitudError('Por favor, indica un número aproximado de invitados válido.');
  }

  return {
    nombre,
    email,
    telefono,
    tipoEvento,
    espacio,
    fechaAproximada,
    invitados,
    mensaje,
  };
};

const procesarSolicitudEvento = async (body) => {
  const datos = validarSolicitudEvento(body);

  let destinoBodega = process.env.BREVO_ADMIN_EMAIL || 'info@bodegasantacatarina.com';
  try {
    const config = await prisma.configuracionGeneral.findUnique({ where: { id: 1 } });
    if (config?.emailEventos && config.emailEventos.includes('@')) {
      destinoBodega = config.emailEventos.trim();
    } else if (config?.emailContacto && config.emailContacto.includes('@')) {
      destinoBodega = config.emailContacto.trim();
    }
  } catch (err) {
    console.warn('[eventosSolicitud] No se pudo leer ConfiguracionGeneral:', err.message);
  }

  const etiquetaAsunto = datos.espacio
    ? `${datos.tipoEvento} · ${datos.espacio}`
    : datos.tipoEvento;

  await Promise.all([
    enviarEmail({
      to: datos.email,
      subject: `Hemos recibido tu solicitud · ${etiquetaAsunto}`,
      htmlContent: generarHtmlConfirmacionEventoCliente(datos),
    }),
    enviarEmail({
      to: destinoBodega,
      subject: `Nueva solicitud de evento · ${etiquetaAsunto} (${datos.nombre})`,
      replyTo: datos.email,
      htmlContent: generarHtmlAvisoEventoBodega(datos),
    }),
  ]);

  return {
    ok: true,
    message: 'Solicitud enviada correctamente.',
  };
};

module.exports = {
  EventoSolicitudError,
  procesarSolicitudEvento,
};

