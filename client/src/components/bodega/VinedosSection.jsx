import styled from 'styled-components';
import { motion } from 'framer-motion';
import SonAloySection from './SonAloySection';

const SectionWrapper = styled.section`
  width: 100%;
  background-color: rgb(242, 236, 228);
  box-sizing: border-box;
  overflow: hidden;
  padding: clamp(2rem, 3.5vw, 3.5rem) clamp(1.5rem, 4vw, 4rem) clamp(3rem, 5vw, 5rem);
`;

const Container = styled.div`
  max-width: 1380px;
  margin: 0 auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: clamp(2.5rem, 4vw, 3.5rem);
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

const ContentWrapper = styled.div`
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

const Title = styled.h2`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: clamp(2.1rem, 3.2vw, 3.1rem);
  font-weight: 500;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  line-height: 1.15;
  margin: 0 0 14px 0;
  letter-spacing: -0.01em;
`;

const Entradilla = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: 1.1rem;
  font-style: italic;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  opacity: 0.92;
  margin: 0 0 18px 0;
  line-height: 1.45;
`;

const BodyParagraph = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: clamp(0.85rem, 0.9vw, 0.92rem);
  line-height: 1.74;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  opacity: 0.88;
  margin: 0 0 24px 0;
`;

/* Características del terreno (4 apartados con borde dorado) */
const SoilFeaturesList = styled.dl`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px 24px;
  margin: 8px 0 0 0;
  padding: 0;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  > div {
    display: flex;
    flex-direction: column;
    border-left: 2px solid ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
    padding-left: 14px;
  }

  dt {
    font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', serif"};
    font-size: 1.15rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
    margin: 0 0 4px 0;
  }

  dd {
    font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
    font-size: 0.8rem;
    line-height: 1.55;
    color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
    opacity: 0.84;
    margin: 0;
  }
`;

/* Variedades */
const VarietySection = styled.div`
  margin-top: 18px;
  padding-top: 20px;
  border-top: 1px solid rgba(194, 164, 120, 0.35);

  h4 {
    font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', serif"};
    font-size: 1.25rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
    margin: 0 0 16px 0;
  }
`;

const VarietyColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .variety-group {
    h5 {
      font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
      font-size: 0.72rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      font-weight: 700;
      color: ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
      margin: 0 0 10px 0;
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    li {
      font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
      font-size: 0.84rem;
      color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
      opacity: 0.9;
      display: flex;
      align-items: center;
      gap: 8px;

      &::before {
        content: '';
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
      }
    }
  }
`;

const cardMotionProps = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

const VinedosSection = () => {
  return (
    <>
      {/* ── B & C: Son Aloy, el origen de nuestros vinos + Estadísticas ── */}
      <SonAloySection />

      {/* ── D & E: Call Vermell – La tierra roja de Mallorca + Características del terreno ── */}
      <SectionWrapper>
        <Container>
          <SplitCard className="bodega-content-section bodega-soil-section" {...cardMotionProps}>
            <ImageWrapper className="bodega-content-image">
              <Image
                src="/assets/tierra-CsW18gzK.png"
                alt="Call Vermell – Tierra roja de la finca Son Aloy"
                loading="lazy"
              />
            </ImageWrapper>

            <ContentWrapper className="bodega-content-copy">
              <Title className="bodega-display-title">
                Call Vermell – La tierra roja de Mallorca
              </Title>
              <Entradilla className="bodega-soil-lead">
                El carácter del paisaje, bajo nuestros pies
              </Entradilla>
              <BodyParagraph className="bodega-body">
                Las tierras rojizas de Son Aloy, conocidas tradicionalmente como Call Vermell,
                constituyen el rasgo geológico más distintivo de nuestro viñedo. Ricas en arcillas
                y componentes calcáreos, regulan de forma natural la disponibilidad de agua para la
                vid, aportando a cada variedad una concentración y una mineralidad profundamente
                vinculadas al terruño mallorquín.
              </BodyParagraph>

              <SoilFeaturesList className="bodega-soil-details">
                <div>
                  <dt>Suelos arcillo-calcáreos</dt>
                  <dd>Influyen en la óptima retención hídrica y en el vigor equilibrado de la vid.</dd>
                </div>
                <div>
                  <dt>Paisaje mediterráneo</dt>
                  <dd>Luz intensa, temperatura templada y la suave brisa del entorno insular.</dd>
                </div>
                <div>
                  <dt>Altitud y entorno</dt>
                  <dd>Ubicación privilegiada en Son Aloy con amplitud térmica que favorece una maduración pausada.</dd>
                </div>
                <div>
                  <dt>Raíces mallorquinas</dt>
                  <dd>Conexión directa con la tierra y respeto por la personalidad propia de la isla.</dd>
                </div>
              </SoilFeaturesList>
            </ContentWrapper>
          </SplitCard>

          {/* ── F & G: Los viñedos + Variedades con identidad propia ── */}
          <SplitCard className="bodega-content-section bodega-vineyards-detail" {...cardMotionProps}>
            <ImageWrapper className="bodega-content-image">
              <Image
                src="/assets/Santa_Cararina_134-Cvw_fLHy.jpg"
                alt="Viñedos de Bodega Santa Catarina en Son Aloy"
                loading="lazy"
              />
            </ImageWrapper>

            <ContentWrapper className="bodega-content-copy">
              <Title className="bodega-display-title">Los viñedos</Title>
              <Entradilla>Un paisaje que da carácter al vino</Entradilla>
              <BodyParagraph className="bodega-body">
                En el centro de Mallorca, el clima mediterráneo y la notable amplitud térmica
                permiten que cada parcela madure de forma lenta y equilibrada. Desarrollamos un
                trabajo a medida, respetando el potencial individual de cada hilera para obtener uvas
                de máxima pureza y equilibrio.
              </BodyParagraph>

              <VarietySection className="bodega-varieties">
                <h4>Variedades con identidad propia</h4>
                <VarietyColumns className="bodega-variety-columns">
                  <div className="variety-group">
                    <h5>Tintas</h5>
                    <ul>
                      <li>Callet</li>
                      <li>Manto Negro</li>
                      <li>Syrah</li>
                      <li>Tempranillo</li>
                    </ul>
                  </div>

                  <div className="variety-group">
                    <h5>Blancas</h5>
                    <ul>
                      <li>Giró Ros</li>
                      <li>Prensal Blanc</li>
                      <li>Viognier</li>
                      <li>Moscatel de grano menudo</li>
                      <li>Malvasía aromática</li>
                    </ul>
                  </div>
                </VarietyColumns>
              </VarietySection>
            </ContentWrapper>
          </SplitCard>
        </Container>
      </SectionWrapper>
    </>
  );
};

export default VinedosSection;
