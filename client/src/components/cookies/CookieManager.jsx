import CookieBanner from './CookieBanner';
import CookieModal from './CookieModal';
import CookieBadge from './CookieBadge';

/**
 * CookieManager orquesta la presentación del Banner inicial, el Modal de configuración detallada
 * y el Botón flotante discreto de re-apertura conforme a la normativa RGPD de la UE.
 */
const CookieManager = () => {
  return (
    <>
      <CookieBanner />
      <CookieModal />
      <CookieBadge />
    </>
  );
};

export default CookieManager;
