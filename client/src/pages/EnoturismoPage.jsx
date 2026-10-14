import PageHero from '../components/common/PageHero';
import Experiencias from '../components/enoturismo/Experiencias';
import InformacionPractica from '../components/enoturismo/InformacionPractica';
import PreguntasFrecuentes from '../components/enoturismo/PreguntasFrecuentes';
import TarjetasRegalo from '../components/tienda/TarjetasRegalo';

const EnoturismoPage = () => {
  return (
    <>
      <PageHero title="Vive el viñedo" subtitle="Experiencias inolvidables en Bodega Santa Catarina" />
      <Experiencias />
      <div id="regala-tu-experiencia" style={{ scrollMarginTop: '100px' }}>
        <TarjetasRegalo />
      </div>
      <InformacionPractica />
      <PreguntasFrecuentes />
    </>
  );
};

export default EnoturismoPage;
