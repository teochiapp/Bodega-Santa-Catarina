import PageHero from '../../components/common/PageHero';
import NuestrosEspacios from '../../components/eventos/NuestrosEspacios';

const EventosNuestrosEspaciosPage = () => {
  return (
    <>
      <PageHero
        seccion="eventos-espacios"
        tag="EVENTOS Y BODAS"
        title="Nuestros espacios"
        subtitle="Espacios singulares entre viñedos e historia para eventos inolvidables en Mallorca."
        image="/images/heros/hero-eventos.webp"
      />
      <NuestrosEspacios />
    </>
  );
};

export default EventosNuestrosEspaciosPage;
