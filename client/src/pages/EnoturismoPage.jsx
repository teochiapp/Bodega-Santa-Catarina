import { Navigate, useLocation } from 'react-router-dom';

const EnoturismoPage = () => {
  const { hash } = useLocation();

  if (hash === '#experiencias-gastronomicas') {
    return <Navigate to="/enoturismo/experiencias-gastronomicas" replace />;
  }
  if (hash === '#regala-tu-experiencia') {
    return <Navigate to="/enoturismo/regala-tu-experiencia" replace />;
  }
  return <Navigate to="/enoturismo/catas-y-visitas" replace />;
};

export default EnoturismoPage;
