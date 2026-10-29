import PageHero from '../../components/common/PageHero';
import NuestraHistoriaStory from '../../components/bodega/NuestraHistoriaStory';

const BodegaHistoriaPage = () => {
  return (
    <>
      <PageHero seccion="bodega-historia" tag="SON ALOY · MALLORCA" title="La esencia de la tierra en cada botella" image="/images/heros/hero-neustra-historia.webp" objectPosition="center 20%" />
      <NuestraHistoriaStory />
    </>
  );
};

export default BodegaHistoriaPage;
