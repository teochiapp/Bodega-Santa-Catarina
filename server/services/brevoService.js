const { generarHtmlNewsletter } = require('../templates/newsletterEmailTemplate');
const { generarHtmlNuevoSuscriptor } = require('../templates/nuevoSuscriptorEmailTemplate');

const BREVO_API_URL = 'https://api.brevo.com/v3';

/**
 * Obtiene el email de remitente configurado o el primer remitente activo en Brevo.
 */
let cachedSender = null;
const obtenerRemitente = async (apiKey) => {
  if (process.env.BREVO_SENDER_EMAIL) {
    return {
      email: process.env.BREVO_SENDER_EMAIL.trim(),
      name: process.env.BREVO_SENDER_NAME || 'Bodega Santa Catarina',
    };
  }

  if (cachedSender) return cachedSender;

  try {
    const res = await fetch(`${BREVO_API_URL}/senders`, {
      headers: { 'api-key': apiKey, Accept: 'application/json' },
    });
    if (res.ok) {
      const data = await res.json();
      const activo = data?.senders?.find((s) => s.active) || data?.senders?.[0];
      if (activo) {
        cachedSender = {
          email: activo.email,
          name: process.env.BREVO_SENDER_NAME || activo.name || 'Bodega Santa Catarina',
        };
        return cachedSender;
      }
    }
  } catch (err) {
    console.warn('[BrevoService] No se pudo consultar remitente de Brevo:', err.message);
  }

  // Fallback por defecto verificado
  return {
    email: 'desarrollo@alianzacreativa.es',
    name: process.env.BREVO_SENDER_NAME || 'Bodega Santa Catarina',
  };
};

/**
 * Añade o actualiza un contacto en la lista de suscriptores de Brevo
 * y le envía el email de bienvenida generado desde la plantilla de código.
 *
 * @param {string} email - Correo del suscriptor
 * @param {object} [opciones] - Opciones (origen, nombre, etc.)
 * @returns {Promise<{success: boolean, message: string, simulated?: boolean}>}
 */
const suscribirNewsletter = async (email, opciones = {}) => {
  if (!email || !email.includes('@')) {
    throw new Error('Correo electrónico inválido');
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_NEWSLETTER_LIST_ID;
  const cleanEmail = email.trim().toLowerCase();

  // Si no hay API Key configurada, operamos en modo desarrollo simulado
  if (!apiKey) {
    console.warn(
      '[BrevoService] Advertencia: BREVO_API_KEY no está definida en server/.env.\n' +
      'Simulando suscripción en modo desarrollo para:', cleanEmail
    );
    return {
      success: true,
      simulated: true,
      message: 'Suscripción simulada (configura BREVO_API_KEY en server/.env para envíos reales)',
    };
  }

  // 1. Guardar o actualizar contacto en el CRM de Brevo
  const listIds = listId && !isNaN(parseInt(listId, 10)) ? [parseInt(listId, 10)] : undefined;

  const contactPayload = {
    email: cleanEmail,
    updateEnabled: true,
    ...(listIds && { listIds }),
    attributes: {
      ORIGEN: opciones.origen || 'Blog Santa Catarina',
      FECHA_REGISTRO: new Date().toISOString().split('T')[0],
      ...(opciones.nombre && { NOMBRE: opciones.nombre }),
    },
  };

  const contactRes = await fetch(`${BREVO_API_URL}/contacts`, {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(contactPayload),
  });

  const contactData = await contactRes.json().catch(() => ({}));

  if (!contactRes.ok) {
    if (contactData?.code === 'duplicate_parameter') {
      console.log(`[BrevoService] Contacto ${cleanEmail} ya existente en Brevo. Actualizado.`);
    } else {
      console.error('[BrevoService] Error al registrar contacto en Brevo:', contactData);
      throw new Error(contactData?.message || 'Error al registrar contacto en Brevo CRM');
    }
  }

  // 2. Enviar email de bienvenida usando la plantilla HTML desde el código
  try {
    const sender = await obtenerRemitente(apiKey);
    const fechaFmt = new Date().toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const htmlContent = generarHtmlNewsletter({
      email: cleanEmail,
      fecha: fechaFmt,
      origen: opciones.origen || 'Blog Santa Catarina',
    });

    const emailPayload = {
      sender,
      to: [{ email: cleanEmail }],
      subject: '¡Bienvenido a las historias de Bodega Santa Catarina!',
      htmlContent,
    };

    const emailRes = await fetch(`${BREVO_API_URL}/smtp/email`, {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(emailPayload),
    });

    const emailData = await emailRes.json().catch(() => ({}));

    if (!emailRes.ok) {
      console.warn('[BrevoService] Advertencia al enviar email transaccional:', emailData);
    } else {
      console.log(`[BrevoService] Email de bienvenida enviado con éxito a ${cleanEmail}. MessageId:`, emailData.messageId);
    }

    // 3. Notificación al administrador / propietario si está configurado en .env
    const adminEmail = process.env.BREVO_ADMIN_EMAIL;
    if (adminEmail && adminEmail.includes('@')) {
      try {
        const htmlAdmin = generarHtmlNuevoSuscriptor({
          subscriberEmail: cleanEmail,
          fecha: fechaFmt,
          origen: opciones.origen || 'Blog Santa Catarina',
          listId: listId || '3',
        });

        const adminPayload = {
          sender,
          to: [{ email: adminEmail.trim().toLowerCase() }],
          subject: `🍷 Nuevo suscriptor al Newsletter: ${cleanEmail}`,
          htmlContent: htmlAdmin,
        };

        const adminRes = await fetch(`${BREVO_API_URL}/smtp/email`, {
          method: 'POST',
          headers: {
            'api-key': apiKey,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(adminPayload),
        });

        const adminData = await adminRes.json().catch(() => ({}));
        if (!adminRes.ok) {
          console.warn('[BrevoService] Advertencia al enviar notificación al administrador:', adminData);
        } else {
          console.log(`[BrevoService] Notificación enviada al administrador (${adminEmail}). MessageId:`, adminData.messageId);
        }
      } catch (errAdmin) {
        console.warn('[BrevoService] Excepción al notificar al administrador:', errAdmin.message);
      }
    }
  } catch (err) {
    console.warn('[BrevoService] Excepción al enviar email de bienvenida:', err.message);
  }

  return {
    success: true,
    message: '¡Gracias por suscribirte a nuestra newsletter!',
  };
};

module.exports = {
  suscribirNewsletter,
};
