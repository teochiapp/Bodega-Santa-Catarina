import { createContext, useState, useCallback } from 'react';

export const AuthContext = createContext(null);

/**
 * Provee el estado de autenticación del admin a toda la app.
 * Persiste el token en localStorage para sobrevivir recargas de página.
 */
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  const login = useCallback((nuevoToken) => {
    localStorage.setItem('token', nuevoToken);
    setToken(nuevoToken);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
  }, []);

  const estaAutenticado = Boolean(token);

  return (
    <AuthContext.Provider value={{ token, estaAutenticado, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
