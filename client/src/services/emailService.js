import api from './api';

/**
 * Registra la suscripción al Newsletter en Brevo CRM a través del backend.
 *
 * @param {string} email - Correo del suscriptor
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const sendNewsletterSubscription = async (email) => {
  if (!email || !email.includes('@')) {
    throw new Error('Por favor, ingresa un correo electrónico válido.');
  }

  try {
    const response = await api.post('/newsletter/subscribe', {
      email: email.trim().toLowerCase(),
    });

    return response;
  } catch (error) {
    console.error('[EmailService] Error al suscribir en Brevo CRM:', error);
    throw new Error(error.message || 'No fue posible registrar tu suscripción. Intenta nuevamente.');
  }
};

export default {
  sendNewsletterSubscription,
};
