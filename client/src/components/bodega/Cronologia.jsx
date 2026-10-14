import styled from 'styled-components';
import { motion } from 'framer-motion';

const HITOS = [
  {
    year: '1984',
    title: 'La Fundación',
    desc: 'Nace Santa Catarina en la finca Son Aloy, en el corazón de Mallorca.',
  },
  {
    year: '1992',
    title: 'Raíces Autóctonas',
    desc: 'La bodega recupera variedades mallorquinas como Manto Negro, Callet y Prensal.',
  },
  {
    year: '2018',
    title: 'Renovación Generacional',
    desc: 'La nueva generación moderniza la bodega manteniendo su esencia familiar.',
  },
  {
    year: '2026',
    title: 'Certificación Ecológica',
    desc: 'Son Aloy consolida su compromiso con una viticultura ecológica y sostenible.',
  },
];

const Section = styled.section`
  background-color: rgb(244, 242, 235);
  padding: clamp(2.75rem, 5vw, 4rem) 2rem;
  box-sizing: border-box;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || '768px'}) {
    padding: clamp(2.25rem, 5vw, 3.25rem) 1.25rem;
  }
`;

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

const Eyebrow = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.65rem;
  letter-spacing: 0.24em;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
  margin: 0 0 16px 0;
  text-align: center;
  text-transform: uppercase;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: clamp(2rem, 3vw, 3rem);
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  text-align: center;
  margin: 0 0 2rem 0;
  line-height: 1.15;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const Card = styled(motion.div)`
  background: rgb(242, 236, 228);
  border: 1px solid rgb(224, 221, 213);
  border-radius: 8px;
  padding: 18px;
  box-sizing: border-box;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 24px rgba(80, 43, 58, 0.08);
    border-color: rgba(194, 164, 120, 0.6);
  }
`;

const Year = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
  line-height: 1;
  margin: 0 0 10px 0;
`;

const CardTitle = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.88rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  margin: 0 0 8px 0;
`;

const Description = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.78rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  margin: 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;

const Cronologia = () => {
  return (
    <Section>
      <Container>
        <Eyebrow>CUATRO DÉCADAS</Eyebrow>
        <Title>Cuatro Décadas de Compromiso</Title>

        <Grid>
          {HITOS.map((hito, idx) => (
            <Card
              key={hito.year}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Year>{hito.year}</Year>
              <CardTitle>{hito.title}</CardTitle>
              <Description>{hito.desc}</Description>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
};

export default Cronologia;

