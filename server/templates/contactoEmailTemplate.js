// Plantilla HTML predeterminada para el Formulario de Contacto General (con el Logo de la web).
const { escapeHtml } = require('./reservaEmailTemplate');
const {
  renderLayoutPredeterminado,
  renderFilas,
  renderBloqueMensaje,
} = require('./eventosEmailTemplate');

/**
 * Acuse de recibo para el usuario que envía el formulario de contacto.
 */
const generarHtmlAcuseContactoUsuario = (datos) => {
  const nombreCompleto = [datos.nombre, datos.apellido].filter(Boolean).join(' ').trim();
  const filasHtml = renderFilas([
    ['Nombre', nombreCompleto || datos.nombre],
    ['Email', datos.email],
    ['Asunto', datos.asunto || 'Consulta general'],
  ]);

  return renderLayoutPredeterminado({
    titulo: 'Hemos recibido tu mensaje',
    introHtml: `Hola ${escapeHtml(datos.nombre)}, gracias por ponerte en contacto con Bodega Santa Catarina. Hemos registrado tu consulta y nuestro equipo te responderá a la mayor brevedad posible.`,
    filasHtml,
    bloqueMensajeHtml: renderBloqueMensaje('Tu consulta', datos.mensaje),
    pieHtml:
      'Bodega Santa Catarina · Finca Son Aloy, Carretera Inca – Sencelles, Km 3 · Sencelles (Mallorca).<br>Tel: +34 971 137 113 · info@bodegasantacatarina.com',
  });
};

/**
 * Aviso interno para la bodega (emailContacto) con todos los datos del formulario.
 */
const generarHtmlAvisoContactoBodega = (datos) => {
  const emailEsc = escapeHtml(datos.email);

  const filasHtml = renderFilas([
    ['Nombre', datos.nombre],
    ['Apellido', datos.apellido || '—'],
    ['Email', `<a href="mailto:${emailEsc}" style="color:#502B3A;text-decoration:underline">${emailEsc}</a>`, true],
    ['Asunto', datos.asunto || 'Consulta general'],
  ]);

  return renderLayoutPredeterminado({
    titulo: 'Nueva consulta de contacto',
    introHtml: `Has recibido un nuevo mensaje desde el formulario de Contacto de la web. Puedes pulsar en "Responder" en tu gestor de correo para contestar directamente a <strong>${escapeHtml(datos.nombre)} ${escapeHtml(datos.apellido || '')}</strong>.`,
    filasHtml,
    bloqueMensajeHtml: renderBloqueMensaje('Mensaje', datos.mensaje || 'Sin mensaje adicional.'),
    pieHtml: 'Notificación interna · Bodega Santa Catarina · Formulario de Contacto.',
  });
};

module.exports = {
  generarHtmlAcuseContactoUsuario,
  generarHtmlAvisoContactoBodega,
};

