import PageHero from '../../components/common/PageHero';
import CatalogoVinos from '../../components/vinos/CatalogoVinos';

const VinosSurantPage = () => {
  return (
    <>
      <PageHero
        tag="NUESTRA COLECCIÓN · COLECCIÓN SURANT"
        title={
          <>
            <span>Frescura y</span>
            <br />
            <span>Expresión</span>
          </>
        }
        description="Vinos frescos, aromáticos y seductores nacidos bajo el influjo del sol mediterráneo y la brisa de nuestras viñas."
        image="/assets/Santa_Catarina_353-4.jpg"
      />
      <CatalogoVinos filtroColeccion="surant" />
    </>
  );
};

export default VinosSurantPage;
