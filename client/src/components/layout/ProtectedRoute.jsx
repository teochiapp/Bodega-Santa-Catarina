import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { isTokenExpired } from '../../utils/token';

/**
 * Guarda de rutas para el panel admin.
 * Si el admin no está autenticado o el token expiró, redirige a /admin/login.
 */
const ProtectedRoute = ({ children }) => {
  const { estaAutenticado, token, logout } = useAuth();

  if (!estaAutenticado || isTokenExpired(token)) {
    if (token) {
      logout();
      return <Navigate to="/admin/login?motivo=expirado" replace />;
    }
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
