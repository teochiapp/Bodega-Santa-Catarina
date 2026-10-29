// Plantilla HTML dedicada para Tarjeta / Bono Regalo siguiendo fielmente las 2 caras del diseño oficial.
const { escapeHtml } = require('./reservaEmailTemplate');
const { getEmailAssetUrl, resolvePublicBaseUrl } = require('./emailAssets');
const {
  renderLayoutPredeterminado,
  renderFilas,
  renderBloqueMensaje,
} = require('./eventosEmailTemplate');

const calcularValidezBono = (pedido) => {
  const rawDate = pedido?.updatedAt || pedido?.createdAt;
  const base = rawDate ? new Date(rawDate) : new Date();
  const baseValida = Number.isNaN(base.getTime()) ? new Date() : base;
  const vencimiento = new Date(baseValida);
  vencimiento.setFullYear(vencimiento.getFullYear() + 1);

  return vencimiento.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const formatearDisfrutaLineas = (pedido) => {
  const importeNum = Number(pedido?.importe || 0);
  const tituloBase = (pedido?.tarjetaTitulo || 'Experiencia Bodega Santa Catarina').trim();
  const linea1 = importeNum > 0
    ? `${tituloBase} · ${importeNum.toFixed(0)} € (2 personas)`
    : tituloBase;

  const dedicatoria = pedido?.mensaje ? String(pedido.mensaje).trim() : '';
  if (dedicatoria) {
    return {
      linea1,
      linea2: `«${dedicatoria}»`,
      esDedicatoria: true,
    };
  }

  // Si el usuario no escribió dedicatoria, dejamos un subtítulo breve acorde al bono o línea limpia
  const lower = tituloBase.toLowerCase();
  let linea2 = '';
  if (lower.includes('bono regalo 1')) {
    linea2 = 'Visita guiada a bodega y viñedos con cata de 3 vinos y maridaje';
  } else if (lower.includes('bono regalo 2')) {
    linea2 = 'Visita a viñedos, cata de autor y almuerzo maridado en Son Aloy';
  } else if (lower.includes('personalizado')) {
    linea2 = 'Experiencia enoturística personalizada en Finca Son Aloy';
  }

  return {
    linea1,
    linea2,
    esDedicatoria: false,
  };
};

/**
 * Genera el HTML del Bono Regalo (Cara 1 Anverso + Cara 2 Reverso) replicando fielmente
 * las 2 imágenes oficiales con los datos dinámicos insertados por el usuario.
 */
const generarHtmlBonoRegalo = ({
  titulo = 'Solicitud de Bono Regalo recibida',
  intro = '',
  pedido = {},
  baseUrl,
  modoImpresion = false,
}) => {
  const logoOscuro = getEmailAssetUrl('logo-bono-oscuro.png', baseUrl);
  const anversoBg = getEmailAssetUrl('bono-anverso-bg.jpg', baseUrl);
  const botellaFade = getEmailAssetUrl('bono-botella-fade.jpg', baseUrl);
  const qrBono = getEmailAssetUrl('qr-bono.png', baseUrl);
  const iconPhone = getEmailAssetUrl('icon-phone.png', baseUrl);
  const iconSocial = getEmailAssetUrl('icon-social.png', baseUrl);
  const iconMail = getEmailAssetUrl('icon-mail.png', baseUrl);
  const iconPin = getEmailAssetUrl('icon-pin.png', baseUrl);

  const publicBase = resolvePublicBaseUrl(baseUrl);
  const urlVistaBono = pedido.codigo
    ? `${publicBase}/api/pedidos-tarjetas/bono/${encodeURIComponent(pedido.codigo)}`
    : '';

  const paraNombre = (pedido.destinatario && String(pedido.destinatario).trim()) || pedido.nombre || '—';
  const { linea1, linea2, esDedicatoria } = formatearDisfrutaLineas(pedido);
  const validoHasta = calcularValidezBono(pedido);
  const codigoBono = pedido.codigo || '—';

  const cabeceraEmailHtml = modoImpresion
    ? `<table width="680" cellpadding="0" cellspacing="0" border="0" class="no-print" style="width:100%;max-width:680px;margin-bottom:20px">
        <tr>
          <td align="right" style="padding:0 2px">
            <button onclick="window.print()" style="background-color:#4A2533;color:#EEE7DC;border:0;border-radius:100px;padding:10px 22px;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:bold;letter-spacing:0.14em;text-transform:uppercase;cursor:pointer">
              Imprimir / Guardar PDF
            </button>
          </td>
        </tr>
      </table>`
    : `<table width="680" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:680px;margin-bottom:22px">
        <tr>
          <td style="padding:0 4px">
            <p style="margin:0 0 6px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#C59B50;font-weight:bold">
              BODEGA SANTA CATARINA · BONO REGALO
            </p>
            <h1 style="margin:0 0 8px;font-family:Georgia,'Times New Roman',serif;font-weight:normal;font-size:26px;color:#4A2533">
              ${escapeHtml(titulo)}
            </h1>
            <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.65;color:#4A2533">
              Hola <strong>${escapeHtml(pedido.nombre || '')}</strong>, ${escapeHtml(intro)}
            </p>
          </td>
        </tr>
      </table>`;

  const resumenCompradorHtml = modoImpresion
    ? ''
    : `<table width="680" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:680px;margin-top:20px;background-color:#F4F0E8;border:1px solid #DFD5C5">
        <tr>
          <td style="padding:16px 24px;font-family:Arial,Helvetica,sans-serif;font-size:12.5px;line-height:1.65;color:#4A2533">
            <strong style="color:#C59B50;letter-spacing:0.12em;text-transform:uppercase;font-size:11px">Datos de tu solicitud</strong><br>
            <strong>Solicitante:</strong> ${escapeHtml(pedido.nombre || '—')} &nbsp;·&nbsp;
            <strong>Email:</strong> ${escapeHtml(pedido.email || '—')} &nbsp;·&nbsp;
            <strong>Teléfono:</strong> ${escapeHtml(pedido.telefono || '—')} &nbsp;·&nbsp;
            <strong>N° Bono:</strong> ${escapeHtml(codigoBono)}
            ${
              urlVistaBono
                ? `<div style="margin-top:10px">
                    <a href="${escapeHtml(urlVistaBono)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;color:#4A2533;font-weight:bold;text-decoration:underline;font-size:12px">
                      Abrir versión lista para imprimir →
                    </a>
                  </div>`
                : ''
            }
          </td>
        </tr>
      </table>

      <table width="680" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:680px;margin-top:14px">
        <tr>
          <td align="center" style="padding:0 8px;font-family:Arial,Helvetica,sans-serif;font-size:11.5px;line-height:1.6;color:#7D6870">
            Puedes imprimir este Bono Regalo o reenviarlo directamente a la persona destinataria.<br>
            Bodega Santa Catarina · Finca Son Aloy, Carretera Inca - Sencelles, Km 3 · Sencelles (Mallorca).
          </td>
        </tr>
      </table>`;

  return `<!DOCTYPE html>
<html lang="es" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(titulo || 'Bono Regalo · Bodega Santa Catarina')}</title>
  <style>
    body, table, td, p, a {
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
    .bono-mobile-bottle {
      display: none;
    }
    @media only screen and (max-width: 660px) {
      .bono-outer-pad {
        padding: 16px 8px !important;
      }
      .bono-front-card {
        background-image: none !important;
      }
      .bono-front-left,
      .bono-front-spacer,
      .bono-back-left,
      .bono-back-right,
      .bono-head-left,
      .bono-head-right {
        display: block !important;
        width: 100% !important;
        max-width: 100% !important;
        box-sizing: border-box !important;
      }
      .bono-front-left {
        padding: 28px 22px 22px 22px !important;
      }
      .bono-front-spacer {
        display: none !important;
      }
      .bono-mobile-bottle {
        display: block !important;
        width: 100% !important;
        text-align: right !important;
        background-color: #EEE7DC !important;
      }
      .bono-back-pad {
        padding: 28px 22px !important;
      }
      .bono-back-left {
        padding-right: 0 !important;
        padding-bottom: 22px !important;
        border-right: none !important;
        border-bottom: 1px solid #C59B50 !important;
      }
      .bono-back-right {
        padding-left: 0 !important;
        padding-top: 22px !important;
      }
      .bono-head-right {
        text-align: left !important;
        padding-top: 16px !important;
      }
      .bono-big-title {
        font-size: 42px !important;
      }
    }
    @media print {
      body {
        background-color: #FFFFFF !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      .no-print {
        display: none !important;
      }
      .bono-outer-pad {
        padding: 0 !important;
      }
      .bono-card-print {
        box-shadow: none !important;
        page-break-inside: avoid;
      }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#FAF7F2;font-family:Arial,Helvetica,sans-serif;color:#4A2533">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#FAF7F2">
    <tr>
      <td align="center" class="bono-outer-pad" style="padding:32px 12px">
        ${cabeceraEmailHtml}

        <!-- =============================================================== -->
        <!-- IMAGEN 1 · ANVERSO DEL BONO REGALO (CON DATOS DINÁMICOS)        -->
        <!-- =============================================================== -->
        <table width="680" cellpadding="0" cellspacing="0" border="0" class="bono-front-card bono-card-print" background="${anversoBg}" style="width:100%;max-width:680px;background-color:#EEE7DC;background-image:url('${anversoBg}');background-size:cover;background-position:right center;background-repeat:no-repeat;border:1px solid #DFD5C5;box-shadow:0 8px 26px rgba(74,37,51,0.08)">
          <tr>
            <td valign="top" style="padding:0">
              <!--[if gte mso 9]>
              <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:680px;height:486px;">
                <v:fill type="frame" src="${anversoBg}" color="#EEE7DC" />
                <v:textbox inset="0,0,0,0">
              <![endif]-->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <!-- Mitad izquierda: Logo, BONO REGALO y las 4 líneas doradas -->
                  <td class="bono-front-left" width="61%" valign="top" style="width:61%;padding:38px 8px 38px 44px">
                    <img src="${logoOscuro}" alt="Bodega Santa Catarina" width="190" style="display:block;width:190px;max-width:100%;height:auto;border:0;color:#4A2533;font-family:Georgia,serif;font-size:18px" />

                    <div style="height:34px;line-height:34px;font-size:1px">&nbsp;</div>

                    <div class="bono-big-title" style="font-family:Georgia,'Times New Roman',serif;font-size:52px;line-height:1.02;letter-spacing:0.02em;color:#4A2533;font-weight:normal;margin:0">
                      BONO
                    </div>
                    <div class="bono-big-title" style="font-family:Georgia,'Times New Roman',serif;font-size:52px;line-height:1.06;letter-spacing:0.02em;color:#C59B50;font-weight:normal;margin:2px 0 32px 0">
                      REGALO
                    </div>

                    <!-- Fila 1: PARA: ________________________ -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:12px">
                      <tr>
                        <td valign="bottom" style="white-space:nowrap;padding:6px 8px 3px 0;font-family:Arial,Helvetica,sans-serif;font-size:14.5px;letter-spacing:0.03em;color:#3E202D">
                          PARA:
                        </td>
                        <td width="100%" valign="bottom" style="width:100%;padding:6px 4px 3px 4px;border-bottom:1.5px solid #C59B50;font-family:Georgia,'Times New Roman',serif;font-size:17px;line-height:1.25;color:#4A2533">
                          ${escapeHtml(paraNombre)}
                        </td>
                      </tr>
                    </table>

                    <!-- Fila 2: DISFRUTA DE: __________________ -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:10px">
                      <tr>
                        <td valign="bottom" style="white-space:nowrap;padding:8px 8px 3px 0;font-family:Arial,Helvetica,sans-serif;font-size:14.5px;letter-spacing:0.03em;color:#3E202D">
                          DISFRUTA DE:
                        </td>
                        <td width="100%" valign="bottom" style="width:100%;padding:8px 4px 3px 4px;border-bottom:1.5px solid #C59B50;font-family:Georgia,'Times New Roman',serif;font-size:15.5px;line-height:1.25;color:#4A2533">
                          ${escapeHtml(linea1)}
                        </td>
                      </tr>
                    </table>

                    <!-- Fila 3: Segunda línea completa (Dedicatoria o detalle de la experiencia) -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:12px">
                      <tr>
                        <td width="100%" valign="bottom" style="width:100%;min-height:24px;padding:8px 4px 3px 2px;border-bottom:1.5px solid #C59B50;font-family:Georgia,'Times New Roman',serif;${esDedicatoria ? 'font-style:italic;' : ''}font-size:14.5px;line-height:1.3;color:#4A2533">
                          ${linea2 ? escapeHtml(linea2) : '&nbsp;'}
                        </td>
                      </tr>
                    </table>

                    <!-- Fila 4: VÁLIDO HASTA: _________________ -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td valign="bottom" style="white-space:nowrap;padding:8px 8px 3px 0;font-family:Arial,Helvetica,sans-serif;font-size:14px;letter-spacing:0.03em;color:#C59B50">
                          VÁLIDO HASTA:
                        </td>
                        <td width="100%" valign="bottom" style="width:100%;padding:8px 4px 3px 4px;border-bottom:1.5px solid #C59B50;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;line-height:1.25;color:#4A2533">
                          ${escapeHtml(validoHasta)}
                        </td>
                      </tr>
                    </table>
                  </td>

                  <!-- Mitad derecha libre para lucir el girasol, ánfora y botella sta PRENSAL -->
                  <td class="bono-front-spacer" width="39%" valign="bottom" style="width:39%;font-size:1px;line-height:1px">
                    &nbsp;
                  </td>
                </tr>
              </table>

              <!-- Vista móvil de la botella para pantallas estrechas -->
              <div class="bono-mobile-bottle">
                <img src="${botellaFade}" alt="sta Prensal · Bodega Santa Catarina" width="240" style="display:inline-block;width:240px;max-width:75%;height:auto;border:0" />
              </div>
              <!--[if gte mso 9]>
                </v:textbox>
              </v:rect>
              <![endif]-->
            </td>
          </tr>
        </table>

        <div style="height:22px;line-height:22px;font-size:1px">&nbsp;</div>

        <!-- =============================================================== -->
        <!-- IMAGEN 2 · REVERSO DEL BONO REGALO (N° BONO, RESERVA Y QR)      -->
        <!-- =============================================================== -->
        <table width="680" cellpadding="0" cellspacing="0" border="0" class="bono-card-print" style="width:100%;max-width:680px;background-color:#EEE7DC;border:1px solid #DFD5C5;box-shadow:0 8px 26px rgba(74,37,51,0.08)">
          <tr>
            <td class="bono-back-pad" style="padding:38px 44px">
              <!-- Cabecera Reverso: N° BONO: ______ + barra dorada a la izquierda y Logo a la derecha -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:30px">
                <tr>
                  <td class="bono-head-left" width="56%" valign="middle" style="width:56%">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td valign="bottom" style="white-space:nowrap;padding-right:8px;font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:bold;letter-spacing:0.02em;color:#4A2533">
                          N° BONO:
                        </td>
                        <td valign="bottom" style="min-width:140px;padding:0 10px 2px 6px;border-bottom:1.5px solid #4A2533;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:bold;letter-spacing:0.08em;color:#4A2533;text-align:center">
                          ${escapeHtml(codigoBono)}
                        </td>
                      </tr>
                    </table>
                    <div style="width:170px;height:3px;background-color:#C59B50;margin-top:16px;line-height:3px;font-size:1px">&nbsp;</div>
                  </td>

                  <td class="bono-head-right" width="44%" valign="middle" align="right" style="width:44%">
                    <img src="${logoOscuro}" alt="Bodega Santa Catarina" width="190" style="display:inline-block;width:190px;max-width:100%;height:auto;border:0;color:#4A2533;font-family:Georgia,serif;font-size:16px" />
                  </td>
                </tr>
              </table>

              <!-- Cuerpo Reverso: 2 columnas separadas por línea vertical dorada -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <!-- Columna izquierda: TÉRMINOS Y CONDICIONES + RESERVA -->
                  <td class="bono-back-left" width="53%" valign="top" style="width:53%;padding-right:28px;border-right:1.5px solid #C59B50">
                    <h2 style="margin:0 0 12px;font-family:Georgia,'Times New Roman',serif;font-size:17px;font-weight:bold;letter-spacing:0.02em;color:#4A2533;text-transform:uppercase">
                      TÉRMINOS Y CONDICIONES
                    </h2>
                    <p style="margin:0 0 26px;font-family:Arial,Helvetica,sans-serif;font-size:13.5px;line-height:1.55;color:#23181D">
                      Esta tarjeta regalo no es transferible,<br>
                      ni canjeable por dinero en efectivo.
                    </p>

                    <h2 style="margin:0 0 12px;font-family:Georgia,'Times New Roman',serif;font-size:17px;font-weight:bold;letter-spacing:0.02em;color:#C59B50;text-transform:uppercase">
                      RESERVA
                    </h2>
                    <p style="margin:0 0 14px;font-family:Arial,Helvetica,sans-serif;font-size:13.5px;line-height:1.55;color:#23181D">
                      Para garantizar las fechas deseadas para canjear la tarjeta regalo, aconsejamos realicen la reserva con tiempo.
                    </p>
                    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13.5px;line-height:1.55;color:#23181D">
                      Para realizar y confirmar la fecha de la experiencia rogamos se pongan en contacto directamente con la Bodega Santa Catarina.
                    </p>
                  </td>

                  <!-- Columna derecha: Contacto con iconos dorados + Código QR -->
                  <td class="bono-back-right" width="47%" valign="top" style="width:47%;padding-left:28px">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="40" valign="middle" style="padding:2px 8px 16px 0">
                          <img src="${iconPhone}" alt="Tel" width="18" style="display:block;width:18px;height:auto;border:0" />
                        </td>
                        <td valign="middle" style="padding:2px 0 16px 0;font-family:Arial,Helvetica,sans-serif;font-size:12.5px;color:#23181D">
                          <a href="tel:+34971137113" style="color:#23181D;text-decoration:none">+34 971 137 113</a>
                        </td>
                      </tr>
                      <tr>
                        <td width="40" valign="middle" style="padding:0 8px 16px 0">
                          <img src="${iconSocial}" alt="Redes" width="36" style="display:block;width:36px;height:auto;border:0" />
                        </td>
                        <td valign="middle" style="padding:0 0 16px 0;font-family:Arial,Helvetica,sans-serif;font-size:12.5px;color:#23181D">
                          @bodegasantacatarina
                        </td>
                      </tr>
                      <tr>
                        <td width="40" valign="middle" style="padding:0 8px 16px 0">
                          <img src="${iconMail}" alt="Email" width="18" style="display:block;width:18px;height:auto;border:0" />
                        </td>
                        <td valign="middle" style="padding:0 0 16px 0;font-family:Arial,Helvetica,sans-serif;font-size:12.5px;color:#23181D;word-break:break-all">
                          <a href="mailto:enoturismo@bodegasantacatarina.com" style="color:#23181D;text-decoration:none">enoturismo@bodegasantacatarina.com</a>
                        </td>
                      </tr>
                      <tr>
                        <td width="40" valign="top" style="padding:2px 8px 20px 0">
                          <img src="${iconPin}" alt="Dirección" width="14" style="display:block;width:14px;height:auto;border:0" />
                        </td>
                        <td valign="top" style="padding:0 0 20px 0;font-family:Arial,Helvetica,sans-serif;font-size:12.5px;line-height:1.48;color:#23181D">
                          Carretera Inca - Sencelles, Km3<br>
                          Sencelles, Mallorca - España
                        </td>
                      </tr>
                    </table>

                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center" style="padding-top:4px">
                          <img src="${qrBono}" alt="QR Bodega Santa Catarina" width="100" height="100" style="display:block;width:100px;height:100px;border:0" />
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        ${resumenCompradorHtml}
      </td>
    </tr>
  </table>
</body>
</html>`;
};

/**
 * Plantilla limpia predeterminada cuando una solicitud de tarjeta regalo se cancela.
 */
const generarHtmlCancelacionPedidoTarjeta = (pedido) => {
  const importeFmt = Number(pedido.importe) > 0 ? `${Number(pedido.importe).toFixed(2)} €` : 'A consultar';
  const filasHtml = renderFilas([
    ['Tarjeta regalo', pedido.tarjetaTitulo],
    ['Importe', importeFmt],
    ['Para', pedido.destinatario || '—'],
    ['N° Bono / Solicitud', pedido.codigo],
  ]);

  return renderLayoutPredeterminado({
    titulo: 'Solicitud cancelada',
    introHtml: `Hola ${escapeHtml(pedido.nombre)}, tu solicitud de tarjeta regalo ha sido cancelada. Si deseas retomarla o elegir otra experiencia, estaremos encantados de ayudarte.`,
    filasHtml,
    bloqueMensajeHtml: renderBloqueMensaje('Dedicatoria indicada', pedido.mensaje),
    pieHtml:
      'Bodega Santa Catarina · Finca Son Aloy, Carretera Inca – Sencelles, Km 3 · Sencelles (Mallorca).<br>Tel: +34 971 137 113 · enoturismo@bodegasantacatarina.com',
  });
};

/**
 * Ficha interna para avisar a la bodega de una nueva solicitud de Bono Regalo.
 */
const generarHtmlAvisoBodegaTarjeta = (pedido, baseUrl) => {
  const emailEsc = escapeHtml(pedido.email);
  const telEsc = escapeHtml(pedido.telefono);
  const importeFmt = Number(pedido.importe) > 0 ? `${Number(pedido.importe).toFixed(2)} €` : 'A consultar';
  const publicBase = resolvePublicBaseUrl(baseUrl);
  const urlBono = pedido.codigo
    ? `${publicBase}/api/pedidos-tarjetas/bono/${encodeURIComponent(pedido.codigo)}`
    : '';

  const filas = [
    ['N° Bono', pedido.codigo],
    ['Comprador', pedido.nombre],
    ['Email', `<a href="mailto:${emailEsc}" style="color:#502B3A;text-decoration:underline">${emailEsc}</a>`, true],
    ['Teléfono', `<a href="tel:${telEsc}" style="color:#502B3A;text-decoration:none">${telEsc}</a>`, true],
    ['Tarjeta regalo', pedido.tarjetaTitulo],
    ['Importe', importeFmt],
    ['Destinatario (Para)', pedido.destinatario || pedido.nombre],
  ];

  if (urlBono) {
    filas.push([
      'Vista previa Bono',
      `<a href="${escapeHtml(urlBono)}" target="_blank" rel="noopener noreferrer" style="color:#502B3A;font-weight:bold;text-decoration:underline">Ver Bono Regalo personalizado →</a>`,
      true,
    ]);
  }

  return renderLayoutPredeterminado({
    titulo: 'Nueva solicitud de Bono Regalo',
    introHtml: 'Se ha registrado una nueva solicitud de tarjeta regalo en la web. Puedes gestionarla y marcarla como completada desde el panel de administración.',
    filasHtml: renderFilas(filas),
    bloqueMensajeHtml: renderBloqueMensaje('Dedicatoria para el bono', pedido.mensaje || 'Sin dedicatoria adicional.'),
    pieHtml: 'Notificación interna · Bodega Santa Catarina · Tarjetas Regalo.',
  });
};

module.exports = {
  generarHtmlBonoRegalo,
  generarHtmlCancelacionPedidoTarjeta,
  generarHtmlAvisoBodegaTarjeta,
};
