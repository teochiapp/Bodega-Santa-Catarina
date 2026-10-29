// Plantilla HTML predeterminada para Solicitudes de Eventos y Bodas (con el Logo de la web).
const { escapeHtml } = require('./reservaEmailTemplate');
const { getEmailAssetUrl } = require('./emailAssets');

const formatearFechaOpcional = (fechaStr) => {
  if (!fechaStr || !String(fechaStr).trim()) return 'Por definir';
  const raw = String(fechaStr).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    const d = new Date(`${raw}T00:00:00.000Z`);
    if (!Number.isNaN(d.getTime())) {
      return d.toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
      });
    }
  }
  return raw;
};

const renderFilas = (pares) =>
  pares
    .map(
      ([k, v, esHtml = false]) => `<tr>
        <td style="padding:10px 0;border-top:1px solid #e0ddd5;color:#C2A478;font-size:11px;letter-spacing:.14em;text-transform:uppercase;width:42%;vertical-align:top">${escapeHtml(k)}</td>
        <td style="padding:10px 0;border-top:1px solid #e0ddd5;color:#502B3A;font-size:14px;line-height:1.55">${esHtml ? v : escapeHtml(v)}</td>
      </tr>`
    )
    .join('');

const renderLayoutPredeterminado = ({ titulo, introHtml, filasHtml, bloqueMensajeHtml = '', pieHtml }) => {
  const logoUrl = getEmailAssetUrl('logo-header-claro.png');

  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#F2ECE4;font-family:Arial,Helvetica,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F2ECE4">
    <tr>
      <td align="center" style="padding:32px 12px">
        <table width="560" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:560px;background:#f4f2eb;border:1px solid #e0ddd5">
          <tr>
            <td style="background:#502B3A;color:#F2ECE4;padding:24px 32px">
              <img src="${logoUrl}" alt="BODEGA SANTA CATARINA" width="185" style="display:block;border:0;height:auto;max-width:185px;color:#F2ECE4;font-family:Georgia,serif;font-size:16px;letter-spacing:.12em" />
            </td>
          </tr>
          <tr>
            <td style="padding:32px">
              <h1 style="margin:0 0 12px;font-family:Georgia,serif;font-weight:normal;font-size:28px;color:#502B3A">${escapeHtml(titulo)}</h1>
              <p style="margin:0 0 24px;color:#502B3A;font-size:14px;line-height:1.7">${introHtml}</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">${filasHtml}</table>
              ${bloqueMensajeHtml}
              <p style="margin:28px 0 0;color:#502B3A;font-size:12px;line-height:1.7">
                ${pieHtml}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body></html>`;
};

const renderBloqueMensaje = (etiqueta, texto) => {
  if (!texto || !String(texto).trim()) return '';
  return `<div style="margin:20px 0 0;padding:16px 18px;background:#ECE6DC;border-left:3px solid #C2A478">
    <p style="margin:0 0 6px;color:#C2A478;font-size:11px;letter-spacing:.14em;text-transform:uppercase;font-weight:bold">${escapeHtml(etiqueta)}</p>
    <p style="margin:0;color:#502B3A;font-size:14px;line-height:1.65;white-space:pre-line">${escapeHtml(texto)}</p>
  </div>`;
};

/**
 * Plantilla de confirmación para el cliente que solicita información de Eventos / Bodas.
 */
const generarHtmlConfirmacionEventoCliente = (datos) => {
  const filasHtml = renderFilas([
    ['Tipo de evento', datos.tipoEvento || 'Solicitud de espacio'],
    ['Espacio de interés', datos.espacio || 'Por definir'],
    ['Fecha aproximada', formatearFechaOpcional(datos.fechaAproximada)],
    ['Nº de invitados', datos.invitados ? `${datos.invitados} personas` : 'Por definir'],
  ]);

  return renderLayoutPredeterminado({
    titulo: 'Solicitud recibida',
    introHtml: `Hola ${escapeHtml(datos.nombre)}, hemos recibido tu solicitud de información. Nuestro equipo de eventos estudiará los detalles y se pondrá en contacto contigo muy pronto para preparar una propuesta personalizada.`,
    filasHtml,
    bloqueMensajeHtml: renderBloqueMensaje('Tu mensaje', datos.mensaje),
    pieHtml:
      'Bodega Santa Catarina · Finca Son Aloy, Carretera Inca – Sencelles, Km 3 · Sencelles (Mallorca).<br>¿Deseas añadir algún detalle? Responde directamente a este correo o llámanos al +34 971 137 113.',
  });
};

/**
 * Plantilla de ficha completa de lead para el equipo de eventos de la bodega (emailEventos).
 */
const generarHtmlAvisoEventoBodega = (datos) => {
  const emailEsc = escapeHtml(datos.email);
  const telEsc = escapeHtml(datos.telefono);

  const filasHtml = renderFilas([
    ['Nombre', datos.nombre],
    ['Email', `<a href="mailto:${emailEsc}" style="color:#502B3A;text-decoration:underline">${emailEsc}</a>`, true],
    ['Teléfono', `<a href="tel:${telEsc}" style="color:#502B3A;text-decoration:none">${telEsc}</a>`, true],
    ['Tipo de evento', datos.tipoEvento || 'Solicitud de espacio'],
    ['Espacio de interés', datos.espacio || 'Por definir'],
    ['Fecha aproximada', formatearFechaOpcional(datos.fechaAproximada)],
    ['Nº de invitados', datos.invitados ? `${datos.invitados} personas` : 'Por definir'],
  ]);

  return renderLayoutPredeterminado({
    titulo: 'Nueva solicitud de evento',
    introHtml: `Se ha recibido una nueva solicitud desde el formulario de Eventos y Bodas de la web. Puedes responder directamente a este correo para contactar con <strong>${escapeHtml(datos.nombre)}</strong>.`,
    filasHtml,
    bloqueMensajeHtml: renderBloqueMensaje('Mensaje del cliente', datos.mensaje || 'Sin comentarios adicionales.'),
    pieHtml: 'Notificación interna · Bodega Santa Catarina · Panel de Eventos y Bodas.',
  });
};

module.exports = {
  generarHtmlConfirmacionEventoCliente,
  generarHtmlAvisoEventoBodega,
  renderLayoutPredeterminado,
  renderFilas,
  renderBloqueMensaje,
};

