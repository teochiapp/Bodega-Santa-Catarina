import PageHero from '../components/common/PageHero';
import Experiencias from '../components/enoturismo/Experiencias';
import InformacionPractica from '../components/enoturismo/InformacionPractica';
import PreguntasFrecuentes from '../components/enoturismo/PreguntasFrecuentes';

const EnoturismoPage = () => {
  return (
    <>
      <PageHero title="Vive el viñedo" subtitle="Experiencias inolvidables en Bodega Santa Catarina" />
      <Experiencias />
      <InformacionPractica />
      <PreguntasFrecuentes />
    </>
  );
};

export default EnoturismoPage;
