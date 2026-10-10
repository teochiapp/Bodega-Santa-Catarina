import PageHero from '../components/common/PageHero';
import TarjetasRegalo from '../components/tienda/TarjetasRegalo';
import SantaCatarinaEnCasa from '../components/tienda/SantaCatarinaEnCasa';
import CtaVinos from '../components/tienda/CtaVinos';

const TiendaPage = () => {
  return (
    <>
      <PageHero title="Regala una experiencia única" />
      <TarjetasRegalo />
      <SantaCatarinaEnCasa />
      <CtaVinos />
    </>
  );
};

export default TiendaPage;
