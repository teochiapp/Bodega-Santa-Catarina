import PageHero from '../../components/common/PageHero';
import CatalogoVinos from '../../components/vinos/CatalogoVinos';

const VinosNguanyPage = () => {
  return (
    <>
      <PageHero
        tag="NUESTRA COLECCIÓN · COLECCIÓN ‘NGUANY"
        title={
          <>
            <span>Vinos de Finca</span>
            <br />
            <span>Son Aloy</span>
          </>
        }
        description="Ediciones limitadas de autor. Complejidad, estructura y el cuidado minucioso de cada añada bajo el clima único de Mallorca."
        image="/assets/Santa_Catarina_Vendimia_284.jpg"
      />
      <CatalogoVinos filtroColeccion="nguany" />
    </>
  );
};

export default VinosNguanyPage;
