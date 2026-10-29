/**
 * Resuelve la URL absoluta de los recursos gráficos para correos transaccionales
 * servidos en /email-assets (tanto por Express como por el build público del frontend).
 */
const resolvePublicBaseUrl = (baseUrl) => {
  const rawBase =
    process.env.PUBLIC_SITE_URL ||
    process.env.PUBLIC_API_URL ||
    baseUrl ||
    `http://localhost:${process.env.PORT || 3000}`;

  return String(rawBase)
    .replace(/\/api\/?$/i, '')
    .replace(/\/+$/, '');
};

const getEmailAssetUrl = (filename, baseUrl) => {
  const cleanBase = resolvePublicBaseUrl(baseUrl);
  return `${cleanBase}/email-assets/${filename}`;
};

module.exports = { getEmailAssetUrl, resolvePublicBaseUrl };
