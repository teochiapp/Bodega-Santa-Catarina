const prisma = require('./prismaClient');
const { enviarEmail } = require('./reservaEmailService');
const {
  generarHtmlAcuseContactoUsuario,
  generarHtmlAvisoContactoBodega,
} = require('../templates/contactoEmailTemplate');

class ContactoError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validarContacto = (body = {}) => {
  const nombre = String(body.nombre ?? '').trim();
  const apellido = String(body.apellido ?? '').trim().slice(0, 120);
  const email = String(body.email ?? '').trim().toLowerCase();
  const asunto = String(body.asunto ?? '').trim().slice(0, 180);
  const mensaje = String(body.mensaje ?? '').trim().slice(0, 4000);

  if (nombre.length < 2 || nombre.length > 120) {
    throw new ContactoError('Por favor, indica tu nombre.');
  }
  if (apellido.length < 1) {
    throw new ContactoError('Por favor, indica tu apellido.');
  }
  if (!EMAIL_RE.test(email) || email.length > 190) {
    throw new ContactoError('Por favor, indica un correo electrónico válido.');
  }
  if (mensaje.length < 3) {
    throw new ContactoError('Por favor, escribe tu consulta en el campo de mensaje.');
  }

  return {
    nombre,
    apellido,
    email,
    asunto: asunto || 'Consulta general desde la web',
    mensaje,
  };
};

const procesarFormularioContacto = async (body) => {
  const datos = validarContacto(body);

  let destinoBodega = process.env.BREVO_ADMIN_EMAIL || 'info@bodegasantacatarina.com';
  try {
    const config = await prisma.configuracionGeneral.findUnique({ where: { id: 1 } });
    if (config?.emailContacto && config.emailContacto.includes('@')) {
      destinoBodega = config.emailContacto.trim();
    }
  } catch (err) {
    console.warn('[contactoService] No se pudo leer ConfiguracionGeneral:', err.message);
  }

  await Promise.all([
    enviarEmail({
      to: datos.email,
      subject: `Hemos recibido tu consulta · Bodega Santa Catarina`,
      htmlContent: generarHtmlAcuseContactoUsuario(datos),
    }),
    enviarEmail({
      to: destinoBodega,
      subject: `Contacto web · ${datos.asunto} (${datos.nombre} ${datos.apellido})`,
      replyTo: datos.email,
      htmlContent: generarHtmlAvisoContactoBodega(datos),
    }),
  ]);

  return {
    ok: true,
    message: 'Consulta enviada correctamente.',
  };
};

module.exports = {
  ContactoError,
  procesarFormularioContacto,
};

