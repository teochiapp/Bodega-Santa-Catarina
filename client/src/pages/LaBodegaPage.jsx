import PageHero from '../components/common/PageHero';
import VisionFundador from '../components/bodega/VisionFundador';
import NuestraHistoriaStory from '../components/bodega/NuestraHistoriaStory';
import FincaSonAloy from '../components/bodega/FincaSonAloy';
import BodegaPasoAPaso from '../components/bodega/BodegaPasoAPaso';
import CitaFilosofia from '../components/bodega/CitaFilosofia';

const LaBodegaPage = () => {
  return (
    <>
      <PageHero title="El nacimiento de una bodega" />
      <VisionFundador />
      <NuestraHistoriaStory />
      <FincaSonAloy />
      <BodegaPasoAPaso />
      <CitaFilosofia />
    </>
  );
};

export default LaBodegaPage;
