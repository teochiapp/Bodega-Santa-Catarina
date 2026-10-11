/**
 * Utilidades para verificación y decodificación de tokens JWT en el frontend.
 */

/**
 * Decodifica de forma segura el payload de un JWT.
 * @param {string} token
 * @returns {object|null}
 */
export const decodeToken = (token) => {
  if (!token || typeof token !== 'string') return null;
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

/**
 * Comprueba si un JWT está expirado, inválido o malformado.
 * Incluye un margen de seguridad de 10 segundos.
 * @param {string} token
 * @returns {boolean} true si está expirado o es inválido
 */
export const isTokenExpired = (token) => {
  const payload = decodeToken(token);
  if (!payload || !payload.exp) return true;
  const nowInSeconds = Math.floor(Date.now() / 1000);
  return payload.exp <= nowInSeconds + 10;
};
