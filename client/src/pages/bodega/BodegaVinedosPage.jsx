import PageHero from '../../components/common/PageHero';
import FincaSonAloy from '../../components/bodega/FincaSonAloy';

const BodegaVinedosPage = () => {
  return (
    <>
      <PageHero seccion="bodega-vinedos" tag="SON ALOY · MALLORCA" title="La esencia de la tierra en cada botella" image="/images/heros/hero-neustra-historia.webp" objectPosition="center 20%" />
      <FincaSonAloy />
    </>
  );
};

export default BodegaVinedosPage;
