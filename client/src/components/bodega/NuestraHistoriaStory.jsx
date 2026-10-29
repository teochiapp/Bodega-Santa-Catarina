import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Section = styled.section`
  width: 100%;
  background-color: rgb(242, 236, 228);
  box-sizing: border-box;
  overflow: hidden;
  padding: clamp(3rem, 5vw, 5rem) clamp(1.5rem, 4vw, 4rem);
`;

const Container = styled.div`
  max-width: 1380px;
  margin: 0 auto;
  box-sizing: border-box;
`;

/* ─── PARTE SUPERIOR: Contenedor Split (#F2ECE4) con Imagen + Texto editorial ─── */
const MainContent = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: stretch;
  background-color: #F2ECE4;
  border: 1px solid rgb(224, 221, 213);
  overflow: hidden;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 480px;
  position: relative;
  overflow: hidden;

  @media (max-width: 960px) {
    min-height: 320px;
    height: 380px;
  }

  @media (max-width: 576px) {
    min-height: 250px;
    height: 290px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: scale(1.025);
  }
`;

const CopyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(2.5rem, 4.5vw, 4.2rem) clamp(2rem, 4.5vw, 3.8rem);
  box-sizing: border-box;
  background-color: #F2ECE4;

  @media (max-width: 960px) {
    padding: clamp(2rem, 5vw, 2.75rem) clamp(1.5rem, 4vw, 2.25rem);
  }
`;

const Eyebrow = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.65rem;
  letter-spacing: 0.24em;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
  text-transform: uppercase;
  margin: 0 0 16px 0;
`;

const DisplayTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: clamp(2.2rem, 3.2vw, 3.2rem);
  font-weight: 500;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  line-height: 1.15;
  margin: 0 0 22px 0;
  letter-spacing: -0.01em;
`;

const BodyParagraph = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: clamp(0.85rem, 0.9vw, 0.92rem);
  line-height: 1.74;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  opacity: 0.88;
  margin: 0 0 16px 0;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

/* ─── PARTE INFERIOR: Cronología interactiva con hover ─── */
const ChronologySection = styled(motion.section)`
  margin-top: clamp(3.5rem, 5.5vw, 5rem);
  width: 100%;
`;

const ChronologyScrollWrapper = styled.div`
  width: 100%;

  @media (max-width: 1024px) {
    overflow-x: auto;
    padding-bottom: 1.25rem;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: rgba(194, 164, 120, 0.4) transparent;

    &::-webkit-scrollbar {
      height: 5px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba(194, 164, 120, 0.4);
      border-radius: 4px;
    }
  }
`;

const ChronologyContent = styled.div`
  width: 100%;

  @media (max-width: 1024px) {
    min-width: 960px;
  }
`;

const TimelineTrackGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: clamp(14px, 1.8vw, 22px);
  position: relative;
`;

const TimelineColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  user-select: none;
`;

const TrackNode = styled.div`
  position: relative;
  width: 100%;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Línea horizontal continua que se extiende a través de los gaps para evitar cortes */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    height: 1.5px;
    background-color: rgba(194, 164, 120, 0.55);
    z-index: 1;
    left: -20px;
    right: -20px;
  }

  &.is-first::before {
    left: 50%;
    right: -20px;
  }

  &.is-last::before {
    left: -20px;
    right: 50%;
  }
`;

const ChronologyDot = styled.div`
  position: relative;
  z-index: 2;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1.5px solid ${({ theme, $isActive }) => ($isActive ? '#8C6836' : 'rgb(194, 164, 120)')};
  background-color: rgb(242, 236, 228);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
  transform: ${({ $isActive }) => ($isActive ? 'scale(1.2)' : 'scale(1)')};

  &::after {
    content: '';
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: #8C6836;
    opacity: ${({ $isActive }) => ($isActive ? 1 : 0)};
    transition: opacity 0.2s ease;
  }

  ${TimelineColumn}:hover & {
    transform: scale(1.2);
    border-color: #8C6836;
    box-shadow: 0 0 0 3px rgba(194, 164, 120, 0.18);

    &::after {
      opacity: 1;
    }
  }
`;

const YearButton = styled.button`
  background: none;
  border: none;
  padding: 12px 4px 6px;
  cursor: pointer;
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: clamp(1.4rem, 1.8vw, 1.85rem);
  font-style: normal;
  font-weight: 400;
  color: ${({ theme, $isActive }) => ($isActive ? '#8C6836' : theme.colors?.secondary || 'rgb(194, 164, 120)')};
  line-height: 1.15;
  white-space: nowrap;
  transition: color 0.25s ease, transform 0.25s ease;

  ${TimelineColumn}:hover & {
    color: #8C6836;
    transform: translateY(-1px);
  }
`;

const FloatingCardArea = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: clamp(14px, 1.8vw, 22px);
  margin-top: 18px;
  min-height: 280px;
  align-items: start;
`;

const CardSlot = styled.div`
  width: 100%;
  position: relative;
`;

const ChronologyCard = styled(motion.article)`
  background-color: #F2ECE4;
  border: 1px solid rgb(224, 221, 213);
  padding: clamp(1.3rem, 1.8vw, 1.7rem) clamp(1rem, 1.4vw, 1.4rem);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  box-shadow: 0 4px 16px rgba(80, 43, 58, 0.05);
  border-radius: 1px;
  text-align: left;

  h3 {
    font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
    font-size: clamp(1.1rem, 1.25vw, 1.25rem);
    font-weight: 500;
    color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
    line-height: 1.25;
    margin: 0 0 12px 0;
  }

  p {
    font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
    font-size: clamp(0.78rem, 0.82vw, 0.82rem);
    line-height: 1.62;
    color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
    opacity: 0.88;
    margin: 0;
  }
`;

const CHRONOLOGY_DATA = [
  {
    year: '1984',
    title: 'Fundación de Bodega Santa Catarina',
    description:
      'Stellan Lundqvist, viticultor de origen sueco enamorado de Mallorca, funda la bodega y desarrolla sus primeros viñedos en Andratx, Sencelles y Sineu. Fue uno de los primeros en traer de manera masiva a Mallorca variedades de uva francesa como Merlot, Cabernet Sauvignon y Chardonnay.',
  },
  {
    year: 'Años 80 y 90',
    title: 'Una bodega pionera',
    description:
      'Santa Catarina se consolida como una bodega referente en la isla y alcanza un notable reconocimiento en el mercado vitivinícola.',
  },
  {
    year: '2001',
    title: 'Una pausa en el camino',
    description:
      'La bodega cesa la elaboración de vinos propios y comienza una etapa sin producción.',
  },
  {
    year: '2014',
    title: 'El renacer del proyecto familiar',
    description:
      'Oliver Lundqvist, hijo de Stellan Lundqvist, decide rendir homenaje a su padre recuperando su legado. El nuevo proyecto se centraliza en la finca de Sencelles, donde se replantan los viñedos y se implanta un sistema de riego subterráneo único, que sitúa a la bodega a la vanguardia de la viticultura mallorquina. Asimismo, se apuesta por las variedades autóctonas y por una viticultura centrada en la calidad, la sostenibilidad y el respeto por el medioambiente.',
  },
  {
    year: '2020–2022',
    title: 'Una nueva etapa',
    description:
      'En 2020 se inaugura la nueva bodega, concebida para la elaboración de vinos y el desarrollo de actividades de enoturismo y eventos. En 2022, se abre al público la histórica casa Son Aloy tras su restauración para convertirse en el espacio de bienvenida en la atención al visitante y alojar nuestra tienda.',
  },
];

const NuestraHistoriaStory = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <Section id="historia" style={{ scrollMarginTop: '110px' }} className="bodega-story-section">
      <Container>
        {/* ── PARTE SUPERIOR: Imagen + Texto editorial en tarjeta dividida #F2ECE4 ── */}
        <MainContent
          className="bodega-content-section bodega-history-main"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <ImageWrapper className="bodega-content-image bodega-story-image">
            <Image
              alt="Vendimia y selección de uva en Son Aloy"
              src="/images/elaboracion/elaboracion-nuestra-historia.webp"
              loading="lazy"
            />
          </ImageWrapper>

          <CopyContainer className="bodega-content-copy bodega-story-copy bodega-history-main-copy">
            <Eyebrow className="bodega-eyebrow">
              DE UN PROYECTO PIONERO A UNA NUEVA IDENTIDAD
            </Eyebrow>

            <DisplayTitle className="bodega-display-title">
              Una historia que vuelve a empezar
            </DisplayTitle>

            <BodyParagraph className="bodega-body">
              En 1984, Stellan Lundqvist encontró en Mallorca mucho más que una tierra donde elaborar
              vino: encontró el lugar donde hacer realidad su sueño. En Andratx, impulsado por su
              pasión por el vino y su amor por la isla, inició un proyecto que pronto se convertiría
              en parte de la historia vitivinícola de Mallorca. Una bodega pionera, nacida del respeto
              por la tierra y de la búsqueda de la excelencia.
            </BodyParagraph>

            <BodyParagraph className="bodega-body">
              En 2014, su familia decidió recuperar aquel legado y dar una nueva vida a Santa Catarina.
              Hoy, su hijo Oliver Lundqvist continúa el sueño de su padre, manteniendo vivo su espíritu
              y apostando por una viticultura que pone en valor las variedades autóctonas y la
              identidad mediterránea.
            </BodyParagraph>

            <BodyParagraph className="bodega-body">
              Dos generaciones, una misma pasión. Una historia familiar que sigue creciendo,
              arraigada en la tierra y presente en cada vino.
            </BodyParagraph>
          </CopyContainer>
        </MainContent>

        {/* ── PARTE INFERIOR: Cronología interactiva con hover ── */}
        <ChronologySection
          className="bodega-chronology"
          aria-label="Cronología de Bodega Santa Catarina"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <ChronologyScrollWrapper>
            <ChronologyContent>
              {/* Barra superior con línea continua, nodos y años */}
              <TimelineTrackGrid className="bodega-chronology-grid">
                {CHRONOLOGY_DATA.map((item, idx) => {
                  const isHovered = hoveredIndex === idx;
                  const nodeClass = idx === 0 ? 'is-first' : idx === CHRONOLOGY_DATA.length - 1 ? 'is-last' : '';

                  return (
                    <TimelineColumn
                      key={idx}
                      className="bodega-chronology-item"
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onClick={() => setHoveredIndex(hoveredIndex === idx ? null : idx)}
                    >
                      <TrackNode className={nodeClass} aria-hidden="true">
                        <ChronologyDot $isActive={isHovered} />
                      </TrackNode>
                      <YearButton
                        type="button"
                        className="bodega-chronology-year"
                        $isActive={isHovered}
                        aria-expanded={isHovered}
                        aria-controls={`bodega-history-${idx}`}
                      >
                        {item.year}
                      </YearButton>
                    </TimelineColumn>
                  );
                })}
              </TimelineTrackGrid>

              {/* Área inferior: tarjeta flotante en la columna correspondiente al hover */}
              <FloatingCardArea>
                {CHRONOLOGY_DATA.map((item, idx) => (
                  <CardSlot key={idx}>
                    <AnimatePresence>
                      {hoveredIndex === idx && (
                        <ChronologyCard
                          id={`bodega-history-${idx}`}
                          role="region"
                          aria-label={`Detalle de ${item.year}`}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                          onMouseEnter={() => setHoveredIndex(idx)}
                        >
                          <h3>{item.title}</h3>
                          <p>{item.description}</p>
                        </ChronologyCard>
                      )}
                    </AnimatePresence>
                  </CardSlot>
                ))}
              </FloatingCardArea>
            </ChronologyContent>
          </ChronologyScrollWrapper>
        </ChronologySection>
      </Container>
    </Section>
  );
};

export default NuestraHistoriaStory;
