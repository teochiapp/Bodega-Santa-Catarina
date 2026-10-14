import PageHero from '../../components/common/PageHero';
import CatalogoVinos from '../../components/vinos/CatalogoVinos';

const VinosNguanyPage = () => {
  return (
    <>
      <PageHero
        tag="NUESTRA COLECCIÓN"
        title={
          <>
            <span>Vinos Nobles</span>
            <br />
            <span>con Alma</span>
          </>
        }
        image="/assets/Santa_Catarina_372.jpg"
      />
      <CatalogoVinos filtroColeccion="nguany" />
    </>
  );
};

export default VinosNguanyPage;
