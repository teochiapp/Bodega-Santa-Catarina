import PageHero from '../components/common/PageHero';
import EspaciosBodega from '../components/eventos/EspaciosBodega';
import AgendaEventos from '../components/eventos/AgendaEventos';
import FormularioEventos from '../components/eventos/FormularioEventos';
import CtaBodas from '../components/eventos/CtaBodas';

const EventosPage = () => {
  return (
    <>
      <PageHero title="El escenario perfecto" />
      <EspaciosBodega />
      <AgendaEventos />
      <FormularioEventos />
      <CtaBodas />
    </>
  );
};

export default EventosPage;
