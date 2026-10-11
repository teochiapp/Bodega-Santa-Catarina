/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useCallback, useEffect, useMemo } from 'react';
import { isTokenExpired, decodeToken } from '../utils/token';

export const AuthContext = createContext(null);

/**
 * Provee el estado de autenticación del admin a toda la app.
 * Valida expiración del token y sincroniza con localStorage y respuestas 401.
 */
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    const guardado = localStorage.getItem('token');
    if (guardado) {
      if (isTokenExpired(guardado)) {
        localStorage.removeItem('token');
        return null;
      }
      return guardado;
    }
    return null;
  });

  const login = useCallback((nuevoToken) => {
    if (!nuevoToken || isTokenExpired(nuevoToken)) {
      localStorage.removeItem('token');
      setToken(null);
      return;
    }
    localStorage.setItem('token', nuevoToken);
    setToken(nuevoToken);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
  }, []);

  // Escuchar eventos globales cuando el backend rechaza un token (401)
  useEffect(() => {
    const handleAuthExpired = () => {
      logout();
    };

    window.addEventListener('auth:expired', handleAuthExpired);
    return () => {
      window.removeEventListener('auth:expired', handleAuthExpired);
    };
  }, [logout]);

  // Si hay token pero vence mientras la app está abierta, verificar periódicamente
  useEffect(() => {
    if (!token) return;

    const checkInterval = setInterval(() => {
      if (isTokenExpired(token)) {
        logout();
        if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
          window.location.href = '/admin/login?motivo=expirado';
        }
      }
    }, 30000); // revisar cada 30s

    return () => clearInterval(checkInterval);
  }, [token, logout]);

  const usuario = useMemo(() => decodeToken(token), [token]);
  const estaAutenticado = Boolean(token) && !isTokenExpired(token);

  return (
    <AuthContext.Provider value={{ token, usuario, estaAutenticado, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
