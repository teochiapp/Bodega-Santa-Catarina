import PageHero from '../components/common/PageHero';
import TarjetasRegalo from '../components/tienda/TarjetasRegalo';

const RegalaTuExperienciaPage = () => {
  return (
    <>
      <PageHero
        seccion="enoturismo-regalo"
        title="Vive el viñedo"
        subtitle="Regala momentos inolvidables en Bodega Santa Catarina"
        image="/images/heros/hero-enoturismo.webp"
      />
      <TarjetasRegalo />
    </>
  );
};

export default RegalaTuExperienciaPage;
