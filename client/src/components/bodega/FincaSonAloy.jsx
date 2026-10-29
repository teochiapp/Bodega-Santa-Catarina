import styled from 'styled-components';
import { motion } from 'framer-motion';

const SectionWrapper = styled.section`
  width: 100%;
  background-color: rgb(244, 242, 235);
  box-sizing: border-box;
  overflow: hidden;
  padding: clamp(3rem, 5vw, 5rem) clamp(1.5rem, 4vw, 4rem);
`;

const Container = styled.div`
  max-width: 1380px;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: clamp(2rem, 3.5vw, 3rem);
`;

const ProcessGrid = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: clamp(2rem, 3.5vw, 3rem);
`;

const SplitCard = styled(motion.article)`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: stretch;
  background-color: rgb(242, 236, 228);
  border: 1px solid rgb(224, 221, 213);
  overflow: hidden;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const SplitImageWrapper = styled.div`
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

const SplitImage = styled.img`
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

const SplitContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(2.5rem, 4.5vw, 4.2rem) clamp(2rem, 4.5vw, 3.8rem);
  box-sizing: border-box;
  background-color: rgb(242, 236, 228);

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
  margin: 0 0 16px 0;
  text-transform: uppercase;
`;

const DisplayTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: clamp(2.2rem, 3.4vw, 3.4rem);
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  line-height: 1.15;
  margin: 0 0 20px 0;
`;

const SectionHeading = styled.h3`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: clamp(2rem, 3.2vw, 2.85rem);
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  line-height: 1.15;
  margin: 0 0 16px 0;
`;

const UnderlinedTitle = styled.h4`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: clamp(1.4rem, 2vw, 1.85rem);
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  line-height: 1.2;
  margin: 0 0 12px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(194, 164, 120, 0.65);
`;

const SoilTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: clamp(1.8rem, 2.6vw, 2.5rem);
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  line-height: 1.2;
  margin: 0 0 14px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(194, 164, 120, 0.65);
`;

const SoilLead = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: 1.08rem;
  font-style: italic;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  opacity: 0.92;
  line-height: 1.5;
  margin: 0 0 14px 0;
`;

const BodyParagraph = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.94rem;
  line-height: 1.78;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  opacity: 0.92;
  margin: 0 0 28px 0;
`;

const LeadParagraph = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.92rem;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  opacity: 0.9;
  margin: 0 0 24px 0;
`;

const SubLeadParagraph = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.86rem;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  opacity: 0.88;
  margin: 0 0 16px 0;
`;

/* Stats */
const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(1rem, 2.5vw, 2rem);
  margin-top: 8px;

  @media (max-width: 576px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.8rem;
  }

  > div {
    display: flex;
    flex-direction: column;
  }

  strong {
    font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
    font-size: clamp(2rem, 3vw, 2.85rem);
    font-weight: 500;
    color: ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
    line-height: 1;
    margin: 0 0 6px 0;
    display: block;
  }

  span {
    font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
    font-size: 0.78rem;
    color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
    line-height: 1.35;
    margin: 0;
    opacity: 0.88;
    display: block;
  }
`;

/* Variedades */
const VarietyColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .bodega-variety-group {
    display: flex;
    flex-direction: column;

    h5 {
      font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', serif"};
      font-size: 1.15rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
      margin: 0 0 8px 0;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    li {
      font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
      font-size: 0.85rem;
      color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
      opacity: 0.85;
      line-height: 1.5;
    }
  }
`;

/* Detalles con marcadores circulares */
const DetailList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 10px;

  .bodega-detail-item {
    display: flex;
    align-items: flex-start;
    gap: 14px;
  }

  .bodega-detail-marker {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    border: 1.5px solid ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
    background-color: transparent;
    margin-top: 5px;
    flex-shrink: 0;
  }
`;

/* Detalles del suelo (borde vertical dorado) */
const SoilDetailsList = styled.dl`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 18px 0 0 0;
  padding: 0;

  > div {
    display: flex;
    flex-direction: column;
    border-left: 1.5px solid ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
    padding-left: 14px;
  }

  dt {
    font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', serif"};
    font-size: 1.12rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
    margin: 0 0 2px 0;
  }

  dd {
    font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
    font-size: 0.83rem;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
    opacity: 0.85;
    margin: 0;
  }
`;

const cardMotionProps = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
};

const FincaSonAloy = () => {
  return (
    <SectionWrapper>
      <Container>
        {/* ── CARD 1: LA FINCA / VIÑEDOS Y ELABORACIÓN ── */}
        <SplitCard className="bodega-content-section bodega-vineyard-intro" {...cardMotionProps}>
          <SplitImageWrapper>
            <SplitImage
              src="/images/elaboracion/viñedo-finca.webp"
              alt="Viñedos de Son Aloy en vendimia"
              loading="lazy"
              className="bodega-content-image"
            />
          </SplitImageWrapper>
          <SplitContentWrapper className="bodega-content-copy">
            <Eyebrow className="bodega-eyebrow">LA FINCA</Eyebrow>
            <DisplayTitle className="bodega-display-title">Viñedos y elaboración</DisplayTitle>
            <BodyParagraph className="bodega-body">
              Son Aloy es una finca única en el interior de Mallorca. Sus suelos arcillo-calcáreos,
              la altitud de 200 metros y la influencia de la Tramuntana crean condiciones ideales
              para elaborar vinos de personalidad singular.
            </BodyParagraph>
            <StatsGrid className="bodega-stats">
              <div>
                <strong>85 ha</strong>
                <span>de viñedo en Son Aloy</span>
              </div>
              <div>
                <strong>1984</strong>
                <span>año de fundación</span>
              </div>
              <div>
                <strong>100%</strong>
                <span>identidad mallorquina</span>
              </div>
            </StatsGrid>
          </SplitContentWrapper>
        </SplitCard>

        {/* ── CARD 2 & 3: BODEGA PROCESS GRID ── */}
        <ProcessGrid className="bodega-process-grid">
          {/* Card 2: Los viñedos */}
          <SplitCard as="article" id="vinedos" style={{ scrollMarginTop: '110px' }} {...cardMotionProps}>
            <SplitImageWrapper>
              <SplitImage
                src="/images/elaboracion/elaboracion-hsitoria-viñedos.webp"
                alt="Viñedos de Son Aloy"
                loading="lazy"
                className="bodega-content-image"
              />
            </SplitImageWrapper>
            <SplitContentWrapper className="bodega-content-copy">
              <SectionHeading>Los viñedos</SectionHeading>
              <LeadParagraph>
                En el centro de Mallorca, el clima permite una maduración lenta, equilibrada y llena de carácter.
              </LeadParagraph>
              <section className="bodega-varieties">
                <UnderlinedTitle>Variedades que hablan De Mallorca</UnderlinedTitle>
                <SubLeadParagraph>
                  La identidad de Santa Catarina se construye a partir del territorio y de una selección varietal propia.
                </SubLeadParagraph>
                <VarietyColumns className="bodega-variety-columns">
                  <div className="bodega-variety-group">
                    <h5>Tintas</h5>
                    <ul>
                      <li>Callet</li>
                      <li>Manto Negro</li>
                      <li>Syrah</li>
                      <li>Tempranillo</li>
                    </ul>
                  </div>
                  <div className="bodega-variety-group">
                    <h5>Blancas</h5>
                    <ul>
                      <li>Giró Ros</li>
                      <li>Prensal Blanc</li>
                      <li>Viognier</li>
                      <li>Moscatel grano menudo</li>
                      <li>Malvasía Aromática</li>
                    </ul>
                  </div>
                </VarietyColumns>
              </section>
            </SplitContentWrapper>
          </SplitCard>

          {/* Card 3: La elaboración */}
          <SplitCard as="article" id="elaboracion" style={{ scrollMarginTop: '110px' }} {...cardMotionProps}>
            <SplitImageWrapper>
              <SplitImage
                src="/images/elaboracion/elaboracion-viñedo-uvas.webp"
                alt="Elaboración y vendimia en Santa Catarina"
                loading="lazy"
                className="bodega-content-image"
              />
            </SplitImageWrapper>
            <SplitContentWrapper className="bodega-content-copy">
              <SectionHeading>La elaboración</SectionHeading>
              <LeadParagraph>
                Cada parcela se trabaja por separado para conservar la identidad de la uva y acompañar el vino con precisión.
              </LeadParagraph>
              <DetailList className="bodega-detail-list">
                <div className="bodega-detail-item">
                  <span className="bodega-detail-marker" aria-hidden="true" />
                  <div>
                    <p style={{ fontFamily: "'Manrope', 'Raleway', sans-serif", fontSize: '0.86rem', fontWeight: 700, color: 'rgb(80, 43, 58)', margin: '0px 0px 5px' }}>
                      Vendimia
                    </p>
                    <p style={{ fontFamily: "'Manrope', 'Raleway', sans-serif", fontSize: '0.82rem', lineHeight: 1.65, color: 'rgb(80, 43, 58)', margin: '0px' }}>
                      Selección manual en el momento óptimo.
                    </p>
                  </div>
                </div>
                <div className="bodega-detail-item">
                  <span className="bodega-detail-marker" aria-hidden="true" />
                  <div>
                    <p style={{ fontFamily: "'Manrope', 'Raleway', sans-serif", fontSize: '0.86rem', fontWeight: 700, color: 'rgb(80, 43, 58)', margin: '0px 0px 5px' }}>
                      Vinificación
                    </p>
                    <p style={{ fontFamily: "'Manrope', 'Raleway', sans-serif", fontSize: '0.82rem', lineHeight: 1.65, color: 'rgb(80, 43, 58)', margin: '0px' }}>
                      Lotes pequeños e intervención mínima.
                    </p>
                  </div>
                </div>
                <div className="bodega-detail-item">
                  <span className="bodega-detail-marker" aria-hidden="true" />
                  <div>
                    <p style={{ fontFamily: "'Manrope', 'Raleway', sans-serif", fontSize: '0.86rem', fontWeight: 700, color: 'rgb(80, 43, 58)', margin: '0px 0px 5px' }}>
                      Crianza
                    </p>
                    <p style={{ fontFamily: "'Manrope', 'Raleway', sans-serif", fontSize: '0.82rem', lineHeight: 1.65, color: 'rgb(80, 43, 58)', margin: '0px' }}>
                      Tiempo y barricas elegidas para cada vino.
                    </p>
                  </div>
                </div>
              </DetailList>
            </SplitContentWrapper>
          </SplitCard>
        </ProcessGrid>

        {/* ── CARD 4: LA TIERRA ROJA DE MALLORCA ── */}
        <SplitCard as="section" className="bodega-content-section bodega-soil-section" {...cardMotionProps}>
          <SplitImageWrapper>
            <SplitImage
              src="/images/elaboracion/elaboracion-tierra.webp"
              alt="Tierra roja de la finca Son Aloy"
              loading="lazy"
              className="bodega-content-image"
            />
          </SplitImageWrapper>
          <SplitContentWrapper className="bodega-content-copy bodega-soil-copy">
            <SoilTitle>La tierra roja de Mallorca</SoilTitle>
            <SoilLead className="bodega-soil-lead">
              <em>Un suelo complejo y desafiante que contribuye a la identidad del viñedo.</em>
            </SoilLead>
            <LeadParagraph>
              Se caracteriza por un suelo complejo y desafiante, compuesto por tierras rojas, costras calcáreas y arcillas compactadas.
            </LeadParagraph>
            <SoilDetailsList className="bodega-soil-details">
              <div>
                <dt>Buen drenaje</dt>
                <dd>La estructura del suelo favorece la evacuación del agua.</dd>
              </div>
              <div>
                <dt>Clima árido</dt>
                <dd>Condición adecuada para la producción de uva en la finca.</dd>
              </div>
              <div>
                <dt>125 m s. n. m.</dt>
                <dd>Altitud de Son Aloy.</dd>
              </div>
              <div>
                <dt>Mediterráneo</dt>
                <dd>Luz, paisaje insular y carácter de Mallorca como contexto.</dd>
              </div>
            </SoilDetailsList>
          </SplitContentWrapper>
        </SplitCard>
      </Container>
    </SectionWrapper>
  );
};

export default FincaSonAloy;
