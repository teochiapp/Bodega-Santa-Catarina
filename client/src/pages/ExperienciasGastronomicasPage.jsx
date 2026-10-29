import PageHero from '../components/common/PageHero';
import ExperienciasGastronomicas from '../components/enoturismo/ExperienciasGastronomicas';

const ExperienciasGastronomicasPage = () => {
  return (
    <>
      <PageHero
        seccion="enoturismo-gastronomia"
        title="Vive el viñedo"
        subtitle="Experiencias gastronómicas entre viñas en Mallorca"
        image="/images/heros/hero-enoturismo.webp"
      />
      <ExperienciasGastronomicas />
    </>
  );
};

export default ExperienciasGastronomicasPage;
