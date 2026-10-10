import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Hook para consumir el contexto de autenticación del admin.
 * Uso: const { estaAutenticado, login, logout } = useAuth();
 */
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

export default useAuth;
