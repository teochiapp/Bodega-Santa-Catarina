import PageHero from '../../components/common/PageHero';
import CitaFilosofia from '../../components/bodega/CitaFilosofia';

const BodegaFilosofiaPage = () => {
  return (
    <>
      <PageHero seccion="bodega-filosofia" tag="SON ALOY · MALLORCA" title="La esencia de la tierra en cada botella" image="/images/heros/hero-neustra-historia.webp" objectPosition="center 20%" />
      <CitaFilosofia />
    </>
  );
};

export default BodegaFilosofiaPage;
