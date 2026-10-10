import PageHero from '../components/common/PageHero';
import VisionFundador from '../components/bodega/VisionFundador';
import Cronologia from '../components/bodega/Cronologia';
import FincaSonAloy from '../components/bodega/FincaSonAloy';
import BodegaPasoAPaso from '../components/bodega/BodegaPasoAPaso';
import CitaFilosofia from '../components/bodega/CitaFilosofia';

const LaBodegaPage = () => {
  return (
    <>
      <PageHero title="El nacimiento de una bodega" />
      <VisionFundador />
      <Cronologia />
      <FincaSonAloy />
      <BodegaPasoAPaso />
      <CitaFilosofia />
    </>
  );
};

export default LaBodegaPage;
