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
  min-height: 520px;
  position: relative;
  overflow: hidden;

  @media (max-width: 960px) {
    min-height: 340px;
    height: 400px;
  }

  @media (max-width: 576px) {
    min-height: 270px;
    height: 310px;
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
  font-weight: 500;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  line-height: 1.15;
  margin: 0 0 18px 0;
  letter-spacing: -0.01em;
`;

const BodyParagraph = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: clamp(0.85rem, 0.9vw, 0.92rem);
  line-height: 1.74;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  opacity: 0.88;
  margin: 0 0 24px 0;
`;

/* Etapas del proceso */
const ProcessStepsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 6px;
`;

const StepItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
`;

const StepMarker = styled.span`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  border: 1.5px solid ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
  background-color: transparent;
  margin-top: 5px;
  flex-shrink: 0;
`;

const StepTitle = styled.h4`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.88rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  margin: 0 0 3px 0;
`;

const StepDesc = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.82rem;
  line-height: 1.62;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  opacity: 0.88;
  margin: 0;
`;

const PROCESS_STEPS = [
  {
    title: 'Vendimia',
    description: 'Selección manual rigurosa en el viñedo y elección del momento óptimo de maduración para cada variedad.',
  },
  {
    title: 'Vinificación',
    description: 'Elaboración en lotes pequeños con intervención mínima, buscando preservar la identidad pura de la uva.',
  },
  {
    title: 'Crianza',
    description: 'Uso de barricas seleccionadas y depósitos adecuados, con tiempos adaptados a la personalidad de cada vino.',
  },
  {
    title: 'Embotellado',
    description: 'Última fase del proceso, conservando con precisión el carácter y frescura del vino antes de su llegada a la mesa.',
  },
];

const ElaboracionProcesoSection = () => {
  return (
    <>
      {/* ── B: Son Aloy, el origen de nuestros vinos ── */}
      <SonAloySection />

      {/* ── C & D: Del viñedo a la botella + Etapas del proceso ── */}
      <SectionWrapper>
        <Container>
          <SplitCard
            className="bodega-content-section bodega-winemaking-process"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <ImageWrapper className="bodega-content-image">
              <Image
                src="/images/elaboracion/elaboracion-viñedo-uvas.webp"
                alt="Elaboración en bodega y selección de uvas en Santa Catarina"
                loading="lazy"
              />
            </ImageWrapper>

            <ContentWrapper className="bodega-content-copy">
              <Eyebrow className="bodega-eyebrow">LA ELABORACIÓN EN BODEGA</Eyebrow>
              <DisplayTitle className="bodega-display-title">
                Del viñedo a la botella
              </DisplayTitle>
              <BodyParagraph className="bodega-body">
                Cada vino comienza en la viña. Trabajamos cada parcela por separado respetando las
                características de cada variedad. Cada etapa del proceso se acompaña con precisión y
                cuidado, combinando la tradición con el uso de depósitos de madera, cemento y acero
                inoxidable para lograr la máxima expresión mediterránea.
              </BodyParagraph>

              <ProcessStepsList className="bodega-detail-list">
                {PROCESS_STEPS.map((step, idx) => (
                  <StepItem key={idx} className="bodega-detail-item">
                    <StepMarker className="bodega-detail-marker" aria-hidden="true" />
                    <div>
                      <StepTitle>{step.title}</StepTitle>
                      <StepDesc>{step.description}</StepDesc>
                    </div>
                  </StepItem>
                ))}
              </ProcessStepsList>
            </ContentWrapper>
          </SplitCard>
        </Container>
      </SectionWrapper>
    </>
  );
};

export default ElaboracionProcesoSection;
