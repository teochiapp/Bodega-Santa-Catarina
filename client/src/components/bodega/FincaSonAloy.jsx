import styled from 'styled-components';
import { motion } from 'framer-motion';

const SectionWrapper = styled.section`
  width: 100%;
  background-color: rgb(244, 242, 235);
  box-sizing: border-box;
  overflow: hidden;
`;

/* ─── PARTE 1: Intro Finca Son Aloy ─── */
const IntroContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: clamp(4rem, 7vw, 6.5rem) clamp(1.5rem, 5vw, 4rem);
  box-sizing: border-box;
`;

const IntroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 540px;
  gap: clamp(2.5rem, 5vw, 5rem);
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const IntroContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Eyebrow = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.65rem;
  letter-spacing: 0.24em;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
  margin: 0 0 18px 0;
  text-transform: uppercase;
`;

const MainTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: clamp(2.3rem, 3.6vw, 4.2rem);
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  line-height: 1.1;
  margin: 0 0 32px 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 32px;

  @media (max-width: 576px) {
    gap: 1.25rem;
    margin-bottom: 24px;
  }
`;

const StatItem = styled.div``;

const StatValue = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: clamp(2.4rem, 3.2vw, 3.2rem);
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
  line-height: 1;
  margin: 0 0 8px 0;
`;

const StatLabel = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  line-height: 1.4;
  margin: 0;
`;

const BodyParagraph = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 1rem;
  line-height: 1.85;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  margin: 0;
`;

const IntroImageWrapper = styled(motion.div)`
  height: 440px;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 16px 36px rgba(80, 43, 58, 0.08);

  @media (max-width: 1024px) {
    height: 400px;
  }

  @media (max-width: 576px) {
    height: 280px;
  }
`;

const IntroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: scale(1.025);
  }
`;

/* ─── PARTE 2: Los Viñedos, La Elaboración y La Tierra Roja ─── */
const ProcessContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SplitRow = styled.article`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 520px;
  align-items: stretch;
  border-top: 1px solid rgba(194, 164, 120, 0.3);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`;

const SplitImageWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  min-height: 480px;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    min-height: 280px;
    height: 320px;
    order: 1; /* En mobile la imagen va arriba */
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
    transform: scale(1.02);
  }
`;

const SplitContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ $align }) => ($align === 'right' ? 'flex-start' : 'flex-end')};
  padding: clamp(3rem, 5vw, 5.5rem) clamp(1.75rem, 5vw, 5rem);
  box-sizing: border-box;

  @media (max-width: 768px) {
    justify-content: center;
    padding: clamp(2.5rem, 6vw, 3.5rem) 1.5rem;
    order: 2; /* En mobile el texto va debajo de la imagen */
  }
`;

const SplitInnerContent = styled(motion.div)`
  width: 100%;
  max-width: 540px;
  display: flex;
  flex-direction: column;
`;

const SectionHeading = styled.h3`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: clamp(2.1rem, 3.2vw, 2.85rem);
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  line-height: 1.15;
  margin: 0 0 16px 0;
`;

const UnderlinedTitle = styled.h4`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: clamp(1.75rem, 2.4vw, 2.25rem);
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  line-height: 1.2;
  margin: 0 0 14px 0;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(194, 164, 120, 0.65);
`;

const SoilTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: clamp(2.1rem, 3.2vw, 2.9rem);
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  line-height: 1.15;
  margin: 0 0 14px 0;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(194, 164, 120, 0.65);
`;

const SoilLead = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: 1.15rem;
  font-style: italic;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  opacity: 0.92;
  line-height: 1.5;
  margin: 0 0 14px 0;
`;

const BlockLead = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.94rem;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  opacity: 0.9;
  margin: 0 0 ${({ $mb }) => $mb || '24px'} 0;
`;

/* Variedades */
const VarietiesWrapper = styled.section`
  margin-top: 6px;
`;

const VarietyColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 10px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
`;

const VarietyGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const VarietyCategory = styled.h5`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', serif"};
  font-size: 1.18rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  margin: 0 0 8px 0;
`;

const VarietyList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;

  li {
    font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
    font-size: 0.86rem;
    color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
    opacity: 0.85;
    line-height: 1.5;
  }
`;

/* Lista con marcadores circulares dorados */
const DetailList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
`;

const DetailMarker = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1.5px solid ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
  background-color: transparent;
  margin-top: 6px;
  flex-shrink: 0;
`;

const DetailTitle = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.88rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  margin: 0 0 4px 0;
`;

const DetailDescription = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.83rem;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  opacity: 0.85;
  margin: 0;
`;

/* Detalles del suelo (La tierra roja) */
const SoilDetailsList = styled.dl`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0;
  padding: 0;
`;

const SoilDetailItem = styled.div`
  display: flex;
  flex-direction: column;

  dt {
    font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', serif"};
    font-size: 1.15rem;
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

const FincaSonAloy = () => {
  return (
    <SectionWrapper>
      {/* ── PARTE 1: LA FINCA 'SON ALOY' ── */}
      <IntroContainer className="bodega-vineyard-intro">
        <IntroGrid>
          <IntroContent
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Eyebrow className="bodega-eyebrow">LA FINCA</Eyebrow>
            <MainTitle className="bodega-display-title">La Finca &apos;Son Aloy&apos;</MainTitle>

            <StatsGrid className="bodega-stats">
              <StatItem>
                <StatValue>85ha</StatValue>
                <StatLabel>De viñedo en Son Aloy</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>1984</StatValue>
                <StatLabel>Año de fundación</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>100%</StatValue>
                <StatLabel>Ecológico certificado</StatLabel>
              </StatItem>
            </StatsGrid>

            <BodyParagraph className="bodega-body">
              Son Aloy es una finca única en el interior de Mallorca. Suelos arcillo-calcáreos,
              altitud de 200 metros y la influencia de la Tramuntana crean condiciones ideales
              para elaborar vinos de personalidad singular.
            </BodyParagraph>
          </IntroContent>

          <IntroImageWrapper
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <IntroImage
              src="/assets/finca-son-aloy-CERJ_NRj.jpg"
              alt="Viñedos de Son Aloy en vendimia"
              loading="lazy"
            />
          </IntroImageWrapper>
        </IntroGrid>
      </IntroContainer>

      {/* ── PARTE 2: LOS VIÑEDOS, LA ELABORACIÓN Y LA TIERRA ROJA ── */}
      <ProcessContainer className="bodega-process-grid">
        {/* 1. Los Viñedos (Texto a la izquierda, imagen a la derecha) */}
        <SplitRow className="is-image-right">
          <SplitContentWrapper $align="left">
            <SplitInnerContent
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <SectionHeading>Los viñedos</SectionHeading>
              <BlockLead $mb="28px">
                En el centro de Mallorca, el clima permite una maduración lenta, equilibrada y llena de carácter.
              </BlockLead>

              <VarietiesWrapper className="bodega-varieties">
                <UnderlinedTitle>Variedades que hablan De Mallorca</UnderlinedTitle>
                <BlockLead $mb="20px">
                  La identidad de Santa Catarina se construye a partir del territorio y de una selección varietal propia.
                </BlockLead>

                <VarietyColumns className="bodega-variety-columns">
                  <VarietyGroup className="bodega-variety-group">
                    <VarietyCategory>Tintas</VarietyCategory>
                    <VarietyList>
                      <li>Callet</li>
                      <li>Manto Negro</li>
                      <li>Syrah</li>
                      <li>Tempranillo</li>
                    </VarietyList>
                  </VarietyGroup>

                  <VarietyGroup className="bodega-variety-group">
                    <VarietyCategory>Blancas</VarietyCategory>
                    <VarietyList>
                      <li>Giró Ros</li>
                      <li>Prensal Blanc</li>
                      <li>Viognier</li>
                      <li>Moscatel grano menudo</li>
                      <li>Malvasía Aromática</li>
                    </VarietyList>
                  </VarietyGroup>
                </VarietyColumns>
              </VarietiesWrapper>
            </SplitInnerContent>
          </SplitContentWrapper>

          <SplitImageWrapper
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <SplitImage
              src="/assets/Santa_Cararina_134-Cvw_fLHy.jpg"
              alt="Viñedos de Son Aloy"
              loading="lazy"
            />
          </SplitImageWrapper>
        </SplitRow>

        {/* 2. La Elaboración (Imagen a la izquierda, texto a la derecha) */}
        <SplitRow>
          <SplitImageWrapper
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <SplitImage
              src="/assets/elaboracion-uvas-BofYQazS.jpg"
              alt="Elaboración y vendimia en Santa Catarina"
              loading="lazy"
            />
          </SplitImageWrapper>

          <SplitContentWrapper $align="right">
            <SplitInnerContent
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <SectionHeading>La elaboración</SectionHeading>
              <BlockLead $mb="28px">
                Cada parcela se trabaja por separado para conservar la identidad de la uva y acompañar el vino con precisión.
              </BlockLead>

              <DetailList className="bodega-detail-list">
                <DetailItem className="bodega-detail-item">
                  <DetailMarker className="bodega-detail-marker" aria-hidden="true" />
                  <div>
                    <DetailTitle>Vendimia</DetailTitle>
                    <DetailDescription>Selección manual en el momento óptimo.</DetailDescription>
                  </div>
                </DetailItem>

                <DetailItem className="bodega-detail-item">
                  <DetailMarker className="bodega-detail-marker" aria-hidden="true" />
                  <div>
                    <DetailTitle>Vinificación</DetailTitle>
                    <DetailDescription>Lotes pequeños e intervención mínima.</DetailDescription>
                  </div>
                </DetailItem>

                <DetailItem className="bodega-detail-item">
                  <DetailMarker className="bodega-detail-marker" aria-hidden="true" />
                  <div>
                    <DetailTitle>Crianza</DetailTitle>
                    <DetailDescription>Tiempo y barricas elegidas para cada vino.</DetailDescription>
                  </div>
                </DetailItem>
              </DetailList>
            </SplitInnerContent>
          </SplitContentWrapper>
        </SplitRow>

        {/* 3. La Tierra Roja de Mallorca (Imagen a la izquierda, texto a la derecha) */}
        <SplitRow as="section" className="bodega-soil-section">
          <SplitImageWrapper
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <SplitImage
              src="/assets/la-tierra-roja-mallorca-BYm3eZ-2.jpg"
              alt="Tierra roja de la finca Son Aloy"
              loading="lazy"
            />
          </SplitImageWrapper>

          <SplitContentWrapper $align="right" className="bodega-soil-copy">
            <SplitInnerContent
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <SoilTitle>La tierra roja de Mallorca</SoilTitle>
              <SoilLead className="bodega-soil-lead">
                <em>Un suelo complejo y desafiante que contribuye a la identidad del viñedo.</em>
              </SoilLead>
              <BlockLead $mb="24px">
                Se caracteriza por un suelo complejo y desafiante, compuesto por tierras rojas, costras calcáreas y arcillas compactadas.
              </BlockLead>

              <SoilDetailsList className="bodega-soil-details">
                <SoilDetailItem>
                  <dt>Buen drenaje</dt>
                  <dd>La estructura del suelo favorece la evacuación del agua.</dd>
                </SoilDetailItem>

                <SoilDetailItem>
                  <dt>Clima árido</dt>
                  <dd>Condición adecuada para la producción de uva en la finca.</dd>
                </SoilDetailItem>

                <SoilDetailItem>
                  <dt>125 m s. n. m.</dt>
                  <dd>Altitud de Son Aloy.</dd>
                </SoilDetailItem>

                <SoilDetailItem>
                  <dt>Mediterráneo</dt>
                  <dd>Luz, paisaje insular y carácter de Mallorca como contexto.</dd>
                </SoilDetailItem>
              </SoilDetailsList>
            </SplitInnerContent>
          </SplitContentWrapper>
        </SplitRow>
      </ProcessContainer>
    </SectionWrapper>
  );
};

export default FincaSonAloy;
