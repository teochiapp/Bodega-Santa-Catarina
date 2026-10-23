import { Navigate, useLocation } from 'react-router-dom';
import PageHero from '../components/common/PageHero';
import CatalogoVinos from '../components/vinos/CatalogoVinos';

const VinosPage = () => {
  const { hash } = useLocation();

  if (hash === '#coleccion-surant' || hash === '#surant') {
    return <Navigate to="/vinos/coleccion-surant" replace />;
  }
  if (hash === '#coleccion-nguany' || hash === '#nguany') {
    return <Navigate to="/vinos/coleccion-nguany" replace />;
  }
  if (hash === '#coleccion-sta' || hash === '#sta') {
    return <Navigate to="/vinos/coleccion-sta" replace />;
  }

  // Si se accede a /vinos sin anclas, redirige a la primera colección
  return <Navigate to="/vinos/coleccion-sta" replace />;
};

export default VinosPage;
