import PageHero from '../components/common/PageHero';
import TiendaGaleria from '../components/tienda/TiendaGaleria';
import TiendaCta from '../components/tienda/TiendaCta';

const TiendaPage = () => {
  return (
    <>
      <PageHero
        seccion="tienda-fisica"
        tag="SON ALOY · SENCELLES"
        title="Tienda física"
        image="/images/heros/hero-tienda-fisica.webp"
        objectPosition="center 58%"
        height="500px"
      />
      <TiendaGaleria />
      <TiendaCta />
    </>
  );
};

export default TiendaPage;

