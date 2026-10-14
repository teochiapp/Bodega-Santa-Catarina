import PageHero from '../components/common/PageHero';
import TiendaIntro from '../components/tienda/TiendaIntro';
import TiendaGaleria from '../components/tienda/TiendaGaleria';
import TiendaCta from '../components/tienda/TiendaCta';

const TiendaPage = () => {
  return (
    <>
      <PageHero
        tag="SON ALOY · SENCELLES"
        title="Tienda física"
        image="/assets/tienda-fisica-01.jpg"
        objectPosition="center 58%"
        height="500px"
      />
      <TiendaIntro />
      <TiendaGaleria />
      <TiendaCta />
    </>
  );
};

export default TiendaPage;

