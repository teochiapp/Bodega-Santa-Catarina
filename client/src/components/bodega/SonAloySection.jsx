import styled from 'styled-components';
import { motion } from 'framer-motion';

const SectionWrapper = styled.section`
  width: 100%;
  background-color: rgb(242, 236, 228);
  box-sizing: border-box;
  overflow: hidden;
  padding: clamp(3rem, 5vw, 5rem) clamp(1.5rem, 4vw, 4rem) 0;

  &:last-child {
    padding-bottom: clamp(3rem, 5vw, 5rem);
  }
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
  margin: 0 0 20px 0;
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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding-top: 22px;
  border-top: 1px solid rgba(194, 164, 120, 0.35);

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  strong {
    font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', serif"};
    font-size: clamp(1.75rem, 2.2vw, 2.25rem);
    font-weight: 500;
    color: ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
    line-height: 1;
  }

  span {
    font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
    font-size: 0.74rem;
    letter-spacing: 0.05em;
    color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
    opacity: 0.82;
    text-transform: lowercase;
  }
`;

const SonAloySection = () => {
  return (
    <SectionWrapper className="bodega-content-section bodega-son-aloy">
      <Container>
        <SplitCard
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <ImageWrapper className="bodega-content-image">
            <Image
              src="/assets/Santa_Cararina_360-D8zUx32I.jpg"
              alt="Finca Son Aloy, Bodega Santa Catarina"
              loading="lazy"
            />
          </ImageWrapper>

          <ContentWrapper className="bodega-content-copy">
            <Eyebrow className="bodega-eyebrow">LA FINCA</Eyebrow>
            <DisplayTitle className="bodega-display-title">
              Son Aloy, el origen de nuestros vinos
            </DisplayTitle>
            <BodyParagraph className="bodega-body">
              Ubicada en el corazón de Mallorca, la finca Son Aloy reúne las condiciones singulares
              de la isla: tierras rojizas, suelos arcillo-calcáreos y la luminosa influencia del
              Mediterráneo, al resguardo de la Serra de Tramuntana. Aquí, la naturaleza, las
              variedades de uva y el trabajo paciente en la viña se unen para dar vida a vinos
              con autenticidad y carácter propio.
            </BodyParagraph>

            <StatsGrid className="bodega-stats">
              <div>
                <strong>30 ha</strong>
                <span>de viñedo en Son Aloy</span>
              </div>
              <div>
                <strong>1984</strong>
                <span>año de fundación de la bodega</span>
              </div>
              <div>
                <strong>100 %</strong>
                <span>esencia mediterránea</span>
              </div>
            </StatsGrid>
          </ContentWrapper>
        </SplitCard>
      </Container>
    </SectionWrapper>
  );
};

export default SonAloySection;
