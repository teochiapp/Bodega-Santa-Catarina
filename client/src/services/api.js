/**
 * Cliente HTTP centralizado para todas las llamadas a la API del backend.
 * La baseURL se toma de la variable de entorno VITE_API_URL.
 *
 * Uso:
 *   import api from './services/api';
 *   const data = await api.get('/health');
 *   const data = await api.post('/auth/login', { email, password });
 */

import { isTokenExpired } from '../utils/token';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Redirige al login de admin limpiando la sesión cuando el token caduca o es inválido.
 */
const redirigirPorSesionExpirada = () => {
  localStorage.removeItem('token');
  window.dispatchEvent(new CustomEvent('auth:expired'));
  if (
    typeof window !== 'undefined' &&
    window.location.pathname.startsWith('/admin') &&
    window.location.pathname !== '/admin/login'
  ) {
    window.location.replace('/admin/login?motivo=expirado');
  }
};

/**
 * Hace un fetch a la API con los defaults necesarios.
 * Adjunta automáticamente el JWT del localStorage si existe y no está expirado.
 * @param {string} endpoint - Ruta relativa, ej: '/auth/login'
 * @param {RequestInit} options - Opciones de fetch (method, body, etc.)
 * @returns {Promise<any>} - JSON parseado de la respuesta
 * @throws Error con el mensaje de error de la API
 */
const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');

  // Si existe un token en storage pero ya expiró en el cliente, limpiamos antes de consultar
  if (token && isTokenExpired(token)) {
    redirigirPorSesionExpirada();
    throw new Error('Tu sesión ha expirado. Por favor, vuelve a iniciar sesión.');
  }

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Si es un 204 No Content, devolvemos null o un objeto vacío
  if (response.status === 204) {
    return null;
  }

  // 401: Token no válido o expirado rechazado por el backend
  if (response.status === 401) {
    const errorData = await response.json().catch(() => ({}));
    // Si la llamada no era al propio endpoint de login, limpiar sesión y redirigir
    if (endpoint !== '/auth/login') {
      redirigirPorSesionExpirada();
    }
    throw new Error(errorData?.error || 'Token inválido o expirado');
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error || 'Error en la solicitud');
  }

  return data;
};

const api = {
  get: (endpoint, options = {}) =>
    apiFetch(endpoint, { ...options, method: 'GET' }),

  post: (endpoint, body, options = {}) =>
    apiFetch(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),

  put: (endpoint, body, options = {}) =>
    apiFetch(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),

  delete: (endpoint, options = {}) =>
    apiFetch(endpoint, { ...options, method: 'DELETE' }),
};

export default api;
