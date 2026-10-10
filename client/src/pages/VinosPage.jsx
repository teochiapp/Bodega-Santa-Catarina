import PageHero from '../components/common/PageHero';
import FilosofiaVinos from '../components/vinos/FilosofiaVinos';
import CatalogoVinos from '../components/vinos/CatalogoVinos';

const VinosPage = () => {
  return (
    <>
      <PageHero title="Vinos nobles con alma" />
      <FilosofiaVinos />
      <CatalogoVinos />
    </>
  );
};

export default VinosPage;
