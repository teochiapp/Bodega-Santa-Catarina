import PageHero from '../../components/common/PageHero';
import CatalogoVinos from '../../components/vinos/CatalogoVinos';

const VinosStaPage = () => {
  return (
    <>
      <PageHero
        seccion="vinos-sta"
        tag="NUESTRA COLECCIÓN · GAMA STA"
        title={
          <>
            <span>Monovarietales</span>
            <br />
            <span>Autóctonos</span>
          </>
        }
        description="Manto Negro, Callet, Prensal Blanc y Giró Ros. La máxima pureza y nobleza de las variedades autóctonas de Mallorca cultivadas en Finca Son Aloy."
        image="/images/heros/hero-vinos.webp"
      />
      <CatalogoVinos filtroColeccion="sta" />
    </>
  );
};

export default VinosStaPage;
