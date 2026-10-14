/**
 * Parámetros y configuración de la plantilla de EmailJS para el Newsletter.
 *
 * Variables esperadas en la plantilla EmailJS:
 * - {{user_email}}: Dirección de correo del suscriptor
 * - {{to_email}}: Destinatario del correo (normalmente el suscriptor o la bodega)
 * - {{subscription_date}}: Fecha formateada de suscripción (ej: "14 de octubre de 2024")
 * - {{source}}: Página o sección desde donde se suscribió (ej: "Blog Santa Catarina")
 */

export const NEWSLETTER_TEMPLATE_CONFIG = {
  defaultSubject: 'Bienvenido al Newsletter de Bodega Santa Catarina',
  sourceName: 'Blog Santa Catarina',
  
  /**
   * Genera el payload de parámetros listos para enviar mediante emailjs.send
   * @param {string} email - Email del suscriptor
   * @param {object} [extraParams] - Parámetros adicionales
   * @returns {object}
   */
  createTemplateParams: (email, extraParams = {}) => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    return {
      user_email: email,
      to_email: email,
      subscription_date: formattedDate,
      source: 'Blog Santa Catarina',
      site_name: 'Bodega Santa Catarina',
      reply_to: 'info@santacatarina.es',
      ...extraParams,
    };
  },
};

export default NEWSLETTER_TEMPLATE_CONFIG;
