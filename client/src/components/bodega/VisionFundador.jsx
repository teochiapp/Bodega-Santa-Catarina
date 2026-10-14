import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled.section`
  max-width: 1440px;
  margin: 0 auto;
  padding: clamp(4rem, 8vw, 7rem) 2rem;
  box-sizing: border-box;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || '768px'}) {
    padding: clamp(2.5rem, 6vw, 4rem) 1.25rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 480px 1fr;
  gap: clamp(2.5rem, 5vw, 5rem);
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const ImageWrapper = styled(motion.div)`
  height: 600px;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 16px 36px rgba(80, 43, 58, 0.08);

  @media (max-width: 1024px) {
    height: 480px;
  }

  @media (max-width: 576px) {
    height: 360px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: scale(1.025);
  }
`;

const Content = styled(motion.div)`
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
  text-transform: uppercase;
  margin: 0 0 20px 0;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: clamp(2.2rem, 3.5vw, 4.3rem);
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  line-height: 1.1;
  margin: 0 0 28px 0;

  span {
    display: inline-block;
  }
`;

const Paragraph = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 1rem;
  line-height: 1.85;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  margin: 0 0 20px 0;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const VisionFundador = () => {
  return (
    <Section>
      <Grid>
        <ImageWrapper
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/assets/Santa_Catarina_Vendimia_296-BNFQEO6C.jpg"
            alt="Bodega Santa Catarina · Finca Son Aloy"
            loading="lazy"
          />
        </ImageWrapper>

        <Content
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Eyebrow>SON ALOY · SENCELLES · MALLORCA</Eyebrow>

          <Title>
            <span>La Visión de</span>
            <br />
            <span>Stellan Lundqvist</span>
          </Title>

          <Paragraph>
            En 1984, el sueco Stellan Lundqvist llegó a Mallorca con una visión: elaborar vinos
            que reflejaran la verdad del lugar. Eligió Sencelles, en el corazón de la isla,
            porque la tierra hablaba.
          </Paragraph>

          <Paragraph>
            Plantó variedades autóctonas cuando nadie lo hacía. Apostó por la ecología antes
            de que existiera el mercado. Construyó con paciencia, cosecha a cosecha, una bodega
            que hoy es referencia en el Mediterráneo.
          </Paragraph>

          <Paragraph>
            Su legado no son los premios ni los reconocimientos. Es la tierra sana, las cepas
            viejas y una familia que sigue creyendo que el vino es, sobre todo, una forma de
            habitar el mundo.
          </Paragraph>
        </Content>
      </Grid>
    </Section>
  );
};

export default VisionFundador;

