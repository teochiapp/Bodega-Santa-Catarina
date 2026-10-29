import PageHero from '../../components/common/PageHero';
import CatalogoVinos from '../../components/vinos/CatalogoVinos';

const VinosSurantPage = () => {
  return (
    <>
      <PageHero
        seccion="vinos-surant"
        tag="NUESTRA COLECCIÓN · COLECCIÓN SURANT"
        title={
          <>
            <span>Frescura y</span>
            <br />
            <span>Expresión</span>
          </>
        }
        description="Vinos frescos, aromáticos y seductores nacidos bajo el influjo del sol mediterráneo y la brisa de nuestras viñas."
        image="/images/heros/hero-vinos.webp"
      />
      <CatalogoVinos filtroColeccion="surant" />
    </>
  );
};

export default VinosSurantPage;
