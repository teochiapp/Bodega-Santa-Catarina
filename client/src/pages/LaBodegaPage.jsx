import { useMemo } from 'react';
import { useParams, useLocation, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import PageHero from '../components/common/PageHero';
import NuestraHistoriaStory from '../components/bodega/NuestraHistoriaStory';
import VinedosSection from '../components/bodega/VinedosSection';
import ElaboracionProcesoSection from '../components/bodega/ElaboracionProcesoSection';
import CitaFilosofia from '../components/bodega/CitaFilosofia';
import SostenibilidadBodega from '../components/bodega/SostenibilidadBodega';

/**
 * Tipos de sección controlados por el menú de Elaboración:
 * @typedef {'historia' | 'bodega' | 'vinedos-elaboracion' | 'filosofia-valores' | 'sostenibilidad'} BodegaSectionKey
 */

const SECTION_ALIASES = {
  // Nuestra historia
  historia: 'historia',
  'nuestra-historia': 'historia',

  // Viñedos
  'vinedos-elaboracion': 'vinedos-elaboracion',
  vinedos: 'vinedos-elaboracion',
  'los-vinedos': 'vinedos-elaboracion',

  // Elaboración en bodega
  bodega: 'bodega',
  elaboracion: 'bodega',
  'la-bodega': 'bodega',

  // Nuestra filosofía
  'filosofia-valores': 'filosofia-valores',
  filosofia: 'filosofia-valores',
  'nuestra-filosofia': 'filosofia-valores',

  // Sostenibilidad
  sostenibilidad: 'sostenibilidad',
};

const PageContainer = styled.div`
  width: 100%;
  background-color: rgb(242, 236, 228);
  min-height: 100vh;
`;

const LaBodegaPage = () => {
  const { section: routeSection } = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Determinar la sección activa según ruta, hash o parámetro de búsqueda
  const activeSection = useMemo(() => {
    // 1. Prioridad: parámetro de ruta (:section)
    if (routeSection && SECTION_ALIASES[routeSection.toLowerCase()]) {
      return SECTION_ALIASES[routeSection.toLowerCase()];
    }

    // 2. Parámetro query (?section=... o ?seccion=...)
    const querySection = searchParams.get('section') || searchParams.get('seccion');
    if (querySection && SECTION_ALIASES[querySection.toLowerCase()]) {
      return SECTION_ALIASES[querySection.toLowerCase()];
    }

    // 3. Hash en la URL (#historia, #vinedos, etc.)
    if (location.hash) {
      const cleanHash = location.hash.replace('#', '').toLowerCase();
      if (SECTION_ALIASES[cleanHash]) {
        return SECTION_ALIASES[cleanHash];
      }
    }

    // 4. Default: Nuestra historia
    return 'historia';
  }, [routeSection, location.hash, searchParams]);

  // En "Viñedos", el título principal se oculta expresamente
  const heroTitle =
    activeSection === 'vinedos-elaboracion'
      ? null
      : 'La esencia de la tierra en cada botella';

  return (
    <PageContainer className="bodega-page">
      {/* ── Hero común para todas las vistas ── */}
      <PageHero
        tag="SON ALOY · MALLORCA"
        title={heroTitle}
        image="/assets/Santa_Catarina_372.jpg"
        imageAlt="Finca Son Aloy, Bodega Santa Catarina"
        objectPosition="center 20%"
        height="500px"
        minHeight="500px"
      />

      {/* ── Renderizado condicional exclusivo de la vista activa ── */}
      {activeSection === 'historia' && <NuestraHistoriaStory />}
      {activeSection === 'vinedos-elaboracion' && <VinedosSection />}
      {activeSection === 'bodega' && <ElaboracionProcesoSection />}
      {activeSection === 'filosofia-valores' && <CitaFilosofia />}
      {activeSection === 'sostenibilidad' && <SostenibilidadBodega />}
    </PageContainer>
  );
};

export default LaBodegaPage;
export { LaBodegaPage as LaBodega };
