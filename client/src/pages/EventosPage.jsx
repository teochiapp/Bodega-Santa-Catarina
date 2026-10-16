import { useParams, useNavigate } from 'react-router-dom';
import PageHero from '../components/common/PageHero';
import EspaciosBodega from '../components/eventos/EspaciosBodega';
import Proximamente from '../components/eventos/Proximamente';
import CtaBodas from '../components/eventos/CtaBodas';

// Dedicated single components
import CasaSonAloySingle from '../components/eventos/singles/CasaSonAloySingle';
import SalaBarricasSingle from '../components/eventos/singles/SalaBarricasSingle';
import TerrazasSingle from '../components/eventos/singles/TerrazasSingle';
import ZonaGravillaSingle from '../components/eventos/singles/ZonaGravillaSingle';
import PorcheDelanteroSingle from '../components/eventos/singles/PorcheDelanteroSingle';
import SalaPolivalenteSingle from '../components/eventos/singles/SalaPolivalenteSingle';
import LaClastraSingle from '../components/eventos/singles/LaClastraSingle';

const SINGLES_MAP = {
  'casa-son-aloy': CasaSonAloySingle,
  'sala-de-barricas': SalaBarricasSingle,
  'terrazas': TerrazasSingle,
  'zona-gravilla': ZonaGravillaSingle,
  'porche-delantero': PorcheDelanteroSingle,
  'sala-polivalente': SalaPolivalenteSingle,
  'la-clastra': LaClastraSingle,
};

const EventosPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  // 1. Renderiza el single correspondiente si el slug existe
  if (slug && SINGLES_MAP[slug]) {
    const SingleComponent = SINGLES_MAP[slug];
    return (
      <>
        <SingleComponent onBack={() => navigate('/eventos')} />
        <Proximamente />
        <CtaBodas />
      </>
    );
  }

  // 2. Vista general de la página de eventos (/eventos)
  return (
    <>
      <PageHero
        tag="EVENTOS Y BODAS"
        title={
          <>
            <span>El escenario</span>
            <br />
            <span>perfecto</span>
          </>
        }
        description="Momentos inolvidables en un entorno mágico. Bodas, aniversarios, eventos corporativos y celebraciones privadas bajo el cielo de Mallorca."
        image="/assets/Santa_Cararina_217-1-BZzqf_YD.jpg"
      />
      <EspaciosBodega onSelectEspacio={(id) => navigate(`/eventos/${id}`)} />
      <Proximamente />
      <CtaBodas />
    </>
  );
};

export default EventosPage;
