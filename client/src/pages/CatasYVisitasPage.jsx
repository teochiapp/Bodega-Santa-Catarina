import PageHero from '../components/common/PageHero';
import CatasYVisitas from '../components/enoturismo/CatasYVisitas';

const CatasYVisitasPage = () => {
  return (
    <>
      <PageHero
        seccion="enoturismo-catas"
        title="Vive el viñedo"
        subtitle="Catas y visitas guiadas en Bodega Santa Catarina"
        image="/images/heros/hero-enoturismo.webp"
      />
      <CatasYVisitas />
    </>
  );
};

export default CatasYVisitasPage;
