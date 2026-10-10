import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

/**
 * Guarda de rutas para el panel admin.
 * Si el admin no está autenticado, redirige a /admin/login.
 */
const ProtectedRoute = ({ children }) => {
  const { estaAutenticado } = useAuth();

  if (!estaAutenticado) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
