import PageHero from '../../components/common/PageHero';
import MiceCorporativos from '../../components/eventos/MiceCorporativos';

const EventosMicePage = () => {
  return (
    <>
      <PageHero
        seccion="eventos-mice"
        tag="MICE Y EVENTOS CORPORATIVOS"
        title="MICE y eventos corporativos"
        subtitle="Reuniones, convenciones y eventos de empresa en un entorno inspirador rodeado de viñedos."
        image="/images/heros/hero-eventos.webp"
      />
      <MiceCorporativos />
    </>
  );
};

export default EventosMicePage;
