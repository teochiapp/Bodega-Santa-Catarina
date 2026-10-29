import PageHero from '../../components/common/PageHero';
import Bodas from '../../components/eventos/Bodas';

const EventosBodasPage = () => {
  return (
    <>
      <PageHero
        seccion="eventos-bodas"
        tag="BODAS"
        title="Bodas"
        subtitle="Un escenario único entre historia, viñedos y naturaleza para celebrar vuestro gran día."
        image="/images/heros/hero-eventos.webp"
      />
      <Bodas />
    </>
  );
};

export default EventosBodasPage;
