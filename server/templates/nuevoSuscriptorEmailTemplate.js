/**
 * Genera el HTML responsive para la notificación al administrador / propietario
 * de que hay un nuevo suscriptor en el Newsletter de Bodega Santa Catarina.
 *
 * @param {object} params
 * @param {string} params.subscriberEmail - Correo del nuevo suscriptor
 * @param {string} [params.fecha] - Fecha formateada
 * @param {string} [params.origen] - Página de origen (ej: "Blog Santa Catarina")
 * @param {string|number} [params.listId] - ID de lista en Brevo
 * @returns {string} - Código HTML completo
 */
const generarHtmlNuevoSuscriptor = ({ subscriberEmail, fecha, origen, listId }) => {
  const fechaFmt = fecha || new Date().toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const origenFmt = origen || 'Blog Santa Catarina';
  const listaFmt = listId ? `Lista #${listId} (Newsletter Members)` : 'Lista de Suscriptores';

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nuevo suscriptor en Bodega Santa Catarina</title>
  <style>
    body, table, td, p, a, li, blockquote {
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    table, td {
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    img {
      -ms-interpolation-mode: bicubic;
      border: 0;
      outline: none;
      text-decoration: none;
    }
    body {
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
      background-color: #F4F2EB;
      font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #502B3A;
    }
    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #F4F2EB;
      padding: 40px 10px;
    }
    .main-table {
      max-width: 600px;
      margin: 0 auto;
      background-color: #FFFFFF;
      border: 1px solid #E4DFD5;
      border-radius: 8px;
      overflow: hidden;
    }
    .header-bar {
      background-color: #502B3A;
      padding: 28px 24px;
      text-align: center;
    }
    .eyebrow {
      font-size: 11px;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: #CBA052;
      margin: 0 0 6px 0;
      font-weight: 700;
    }
    .brand-title {
      font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
      font-size: 24px;
      font-weight: 500;
      color: #F2ECE4;
      margin: 0;
      letter-spacing: 0.04em;
    }
    .content-body {
      padding: 36px 32px;
      background-color: #FFFFFF;
    }
    .badge {
      display: inline-block;
      background-color: #E8F5E9;
      color: #2E7D32;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      padding: 5px 12px;
      border-radius: 100px;
      margin-bottom: 14px;
    }
    .greeting {
      font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
      font-size: 26px;
      font-weight: 600;
      color: #502B3A;
      margin: 0 0 14px 0;
      line-height: 1.25;
    }
    .paragraph {
      font-size: 15px;
      line-height: 1.7;
      color: #502B3A;
      margin: 0 0 22px 0;
    }
    .info-card {
      background-color: #F8F6F2;
      border: 1px solid #E8E3DA;
      border-left: 4px solid #CBA052;
      border-radius: 6px;
      padding: 20px;
      margin: 20px 0 28px 0;
    }
    .info-row {
      display: flex;
      padding: 8px 0;
      border-bottom: 1px solid #ECE7DE;
      font-size: 14px;
    }
    .info-row:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
    .info-row:first-child {
      padding-top: 0;
    }
    .info-label {
      width: 140px;
      font-weight: 700;
      color: #73505E;
      text-transform: uppercase;
      font-size: 11px;
      letter-spacing: 0.08em;
    }
    .info-value {
      flex: 1;
      color: #502B3A;
      font-weight: 600;
      word-break: break-all;
    }
    .btn-container {
      text-align: center;
      margin: 28px 0 16px 0;
    }
    .cta-button {
      display: inline-block;
      background-color: #502B3A;
      color: #F2ECE4 !important;
      text-decoration: none;
      padding: 13px 26px;
      font-size: 11.5px;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      border-radius: 100px;
    }
    .footer {
      background-color: #FAF8F5;
      padding: 20px 32px;
      text-align: center;
      border-top: 1px solid #EFEBE4;
    }
    .footer-text {
      font-size: 12px;
      line-height: 1.6;
      color: #8C757F;
      margin: 0;
    }
  </style>
</head>
<body>
  <center class="wrapper">
    <table class="main-table" width="100%" cellpadding="0" cellspacing="0" border="0">
      <!-- HEADER -->
      <tr>
        <td class="header-bar">
          <p class="eyebrow">NOTIFICACIÓN DEL SISTEMA · BODEGA SANTA CATARINA</p>
          <h1 class="brand-title">Nuevo Suscriptor al Newsletter</h1>
        </td>
      </tr>

      <!-- BODY -->
      <tr>
        <td class="content-body">
          <span class="badge">● Nuevo Registro</span>
          <h2 class="greeting">¡Tienes un nuevo suscriptor!</h2>
          
          <p class="paragraph">
            Un usuario acaba de registrarse al boletín de noticias a través de la web oficial de Bodega Santa Catarina.
          </p>

          <div class="info-card">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding: 6px 0; font-size: 12px; color: #73505E; font-weight: 700; width: 130px; text-transform: uppercase;">
                  Email:
                </td>
                <td style="padding: 6px 0; font-size: 14.5px; color: #502B3A; font-weight: 700;">
                  <a href="mailto:${subscriberEmail}" style="color: #502B3A; text-decoration: underline;">${subscriberEmail}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-size: 12px; color: #73505E; font-weight: 700; width: 130px; text-transform: uppercase;">
                  Fecha y Hora:
                </td>
                <td style="padding: 6px 0; font-size: 14px; color: #502B3A;">
                  ${fechaFmt}
                </td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-size: 12px; color: #73505E; font-weight: 700; width: 130px; text-transform: uppercase;">
                  Origen:
                </td>
                <td style="padding: 6px 0; font-size: 14px; color: #502B3A;">
                  ${origenFmt}
                </td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-size: 12px; color: #73505E; font-weight: 700; width: 130px; text-transform: uppercase;">
                  Lista CRM:
                </td>
                <td style="padding: 6px 0; font-size: 14px; color: #502B3A;">
                  ${listaFmt}
                </td>
              </tr>
            </table>
          </div>

          <p class="paragraph" style="font-size: 13.5px; color: #73505E; margin-bottom: 0;">
            El contacto ha sido sincronizado automáticamente en tu cuenta de Brevo CRM y añadido a la lista de distribución.
          </p>

          <div class="btn-container">
            <a href="https://app.brevo.com/contact/list" class="cta-button" target="_blank">
              VER EN BREVO CRM
            </a>
          </div>
        </td>
      </tr>

      <!-- FOOTER -->
      <tr>
        <td class="footer">
          <p class="footer-text">
            Este es un correo automático enviado por el servidor web de <strong>Bodega Santa Catarina</strong>.
          </p>
        </td>
      </tr>
    </table>
  </center>
</body>
</html>`;
};

module.exports = {
  generarHtmlNuevoSuscriptor,
};
