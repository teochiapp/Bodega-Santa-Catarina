import styled from 'styled-components';
import { motion } from 'framer-motion';

const SectionWrapper = styled.section`
  width: 100%;
  background-color: rgb(244, 242, 235);
  box-sizing: border-box;
  overflow: hidden;
  padding: clamp(3.5rem, 6vw, 5.5rem) clamp(1.5rem, 4vw, 4rem);
`;

const Container = styled.div`
  max-width: 1380px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const SplitRow = styled(motion.article)`
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
    min-height: 260px;
    height: 300px;
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
    transform: scale(1.02);
  }
`;

const CopyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(2.5rem, 4.5vw, 4.5rem) clamp(2rem, 4.5vw, 4rem);
  box-sizing: border-box;
  background-color: rgb(242, 236, 228);

  @media (max-width: 960px) {
    padding: clamp(2rem, 5vw, 3rem) clamp(1.5rem, 4vw, 2.5rem);
  }
`;

const Eyebrow = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.65rem;
  letter-spacing: 0.24em;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
  text-transform: uppercase;
  margin: 0 0 16px 0;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: clamp(2.2rem, 3.2vw, 3.2rem);
  font-weight: 500;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  line-height: 1.15;
  margin: 0 0 24px 0;
`;

const BodyParagraph = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: clamp(0.85rem, 0.9vw, 0.92rem);
  line-height: 1.72;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  opacity: 0.88;
  margin: 0 0 18px 0;

  &:last-of-type {
    margin-bottom: 0;
  }

  strong {
    font-weight: 700;
    color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
    opacity: 1;
  }
`;

const VisionFundador = () => {
  return (
    <SectionWrapper>
      <Container>
        <SplitRow
          className="bodega-content-section bodega-split-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <ImageWrapper className="bodega-content-image bodega-portrait">
            <Image
              alt="Vendimia en Bodega Santa Catarina"
              src="/assets/Santa_Catarina_Vendimia_296-BNFQEO6C.jpg"
              loading="lazy"
            />
          </ImageWrapper>

          <CopyWrapper className="bodega-content-copy">
            <Eyebrow className="bodega-eyebrow">SON ALOY · SENCELLES · MALLORCA</Eyebrow>

            <Title className="bodega-display-title">
              La Visión de
              <br />
              Stellan Lundqvist
            </Title>

            <BodyParagraph className="bodega-body">
              En 1984, Stellan Lundqvist encontró en Mallorca mucho más que una tierra donde elaborar
              vino: encontró un lugar donde hacer realidad su sueño. En Sencelles, construyó una
              bodega nacida de su pasión por el vino, el respeto por la naturaleza y el amor por las
              raíces mallorquinas. Un legado que sigue vivo.
            </BodyParagraph>

            <BodyParagraph className="bodega-body">
              Hoy, su hijo <strong>Oliver Johan Lundqvist</strong> mantiene vivo el sueño de su padre,
              honrando sus raíces y dando nueva vida a Santa Catarina. Con la misma pasión y una
              mirada hacia el futuro, apuesta por las variedades autóctonas y la esencia de Mallorca.
            </BodyParagraph>

            <BodyParagraph className="bodega-body">
              <strong>
                Dos generaciones, un mismo sueño. Un legado que se lleva en el corazón y se
                transmite en cada vino.
              </strong>
            </BodyParagraph>
          </CopyWrapper>
        </SplitRow>
      </Container>
    </SectionWrapper>
  );
};

export default VisionFundador;
