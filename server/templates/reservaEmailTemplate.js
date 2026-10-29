// Plantilla HTML de los emails transaccionales de reservas de catas.
const escapeHtml = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const formatearFecha = (fecha) =>
  new Date(fecha).toLocaleDateString('es-ES', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  });

const formatearTituloExperiencia = (sesion) => {
  if (sesion?.cata) {
    return sesion.cata.subtitulo
      ? `${sesion.cata.titulo} (${sesion.cata.subtitulo})`
      : sesion.cata.titulo;
  }
  return sesion?.menu?.titulo || 'Experiencia';
};

const generarHtmlReserva = ({ titulo, intro, reserva, detalleExtra = '' }) => {
  const { sesion } = reserva;
  const experienciaTitulo = formatearTituloExperiencia(sesion);
  const filas = [
    ['Experiencia', experienciaTitulo],
    ['Fecha', formatearFecha(sesion.fecha)],
    ['Hora', `${sesion.hora} h`],
    ['Personas', reserva.personas],
    ['Idioma', reserva.idioma],
    ['Código de reserva', reserva.codigo],
  ]
    .map(
      ([k, v]) => `<tr>
        <td style="padding:10px 0;border-top:1px solid #e0ddd5;color:#C2A478;font-size:11px;letter-spacing:.14em;text-transform:uppercase;width:42%">${k}</td>
        <td style="padding:10px 0;border-top:1px solid #e0ddd5;color:#502B3A;font-size:14px">${escapeHtml(v)}</td>
      </tr>`
    )
    .join('');

  return `<!doctype html><html lang="es"><body style="margin:0;background:#F2ECE4;font-family:Arial,Helvetica,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 12px">
    <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#f4f2eb;border:1px solid #e0ddd5">
      <tr><td style="background:#502B3A;color:#F2ECE4;padding:24px 32px;font-size:13px;letter-spacing:.2em">BODEGA SANTA CATARINA</td></tr>
      <tr><td style="padding:32px">
        <h1 style="margin:0 0 12px;font-family:Georgia,serif;font-weight:normal;font-size:28px;color:#502B3A">${escapeHtml(titulo)}</h1>
        <p style="margin:0 0 24px;color:#502B3A;font-size:14px;line-height:1.7">Hola ${escapeHtml(reserva.nombre)}, ${intro}</p>
        <table width="100%" cellpadding="0" cellspacing="0">${filas}</table>
        ${detalleExtra}
        <p style="margin:28px 0 0;color:#502B3A;font-size:12px;line-height:1.7">
          Finca Son Aloy, Sencelles (Mallorca). Parking gratuito en la finca.<br>
          ¿Necesitas cambiar algo? Responde a este correo o escríbenos por WhatsApp al +34 618 672 773.
        </p>
      </td></tr>
    </table>
  </td></tr></table></body></html>`;
};

module.exports = { generarHtmlReserva, formatearFecha, formatearTituloExperiencia, escapeHtml };
