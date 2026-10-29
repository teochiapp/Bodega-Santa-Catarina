import PageHero from '../../components/common/PageHero';
import SostenibilidadBodega from '../../components/bodega/SostenibilidadBodega';

const BodegaSostenibilidadPage = () => {
  return (
    <>
      <PageHero seccion="bodega-sostenibilidad" tag="SON ALOY · MALLORCA" title="La esencia de la tierra en cada botella" image="/images/heros/hero-neustra-historia.webp" objectPosition="center 20%" />
      <SostenibilidadBodega />
    </>
  );
};

export default BodegaSostenibilidadPage;
