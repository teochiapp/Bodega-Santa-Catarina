import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled.section`
  width: 100%;
  background-color: rgb(244, 242, 235);
  box-sizing: border-box;
  overflow: hidden;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 80vh;
  width: 100%;
  align-items: stretch;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`;

const CopyContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(3rem, 6vw, 6rem) clamp(2rem, 5vw, 5.5rem);
  box-sizing: border-box;

  @media (max-width: 768px) {
    order: 2;
    padding: clamp(2.5rem, 6vw, 4rem) 1.5rem;
  }

  @media (max-width: 600px) {
    padding: 2.5rem 1.5rem;
  }
`;

const ImageWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  min-height: 520px;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    order: 1;
    min-height: 380px;
    height: 420px;
  }

  @media (max-width: 576px) {
    min-height: 280px;
    height: 320px;
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

const Eyebrow = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.68rem;
  letter-spacing: 0.22em;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
  text-transform: uppercase;
  margin: 0 0 18px 0;
`;

const DisplayTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: clamp(2.4rem, 3.8vw, 4.1rem);
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  line-height: 1.15;
  margin: 0 0 20px 0;
`;

const Intro = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: 1.15rem;
  font-style: italic;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  opacity: 0.9;
  margin: 0 0 36px 0;
  line-height: 1.5;
`;

const DetailList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
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

const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemTitle = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.88rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  margin: 0 0 4px 0;
`;

const ItemDescription = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.84rem;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  opacity: 0.88;
  margin: 0;
`;

const SOSTENIBILIDAD_ITEMS = [
  {
    title: 'Riego subterráneo',
    description: 'El agua llega directamente a la raíz, reduciendo la evaporación.',
  },
  {
    title: 'Paneles solares',
    description: 'Avance hacia la autosuficiencia energética parcial.',
  },
  {
    title: 'Pozos propios',
    description: 'Autoabastecimiento hídrico de los viñedos incluso en épocas secas.',
  },
  {
    title: 'Gestión de residuos',
    description: 'Tratamiento de lías y aguas y atención a la economía circular.',
  },
  {
    title: 'Conversión ecológica',
    description: 'Proceso iniciado en 2024 para los viñedos.',
  },
];

const SostenibilidadBodega = () => {
  return (
    <Section className="bodega-feature-section is-reversed">
      <Grid>
        <CopyContainer
          className="bodega-feature-copy"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Eyebrow className="bodega-eyebrow">SOSTENIBILIDAD</Eyebrow>

          <DisplayTitle className="bodega-display-title">
            Compromiso real
          </DisplayTitle>

          <Intro className="bodega-intro">
            <em>Una prioridad en cada decisión. Preservar los recursos para el futuro.</em>
          </Intro>

          <DetailList className="bodega-detail-list">
            {SOSTENIBILIDAD_ITEMS.map((item, idx) => (
              <DetailItem key={idx} className="bodega-detail-item">
                <DetailMarker className="bodega-detail-marker" aria-hidden="true" />
                <ItemContent>
                  <ItemTitle>{item.title}</ItemTitle>
                  <ItemDescription>{item.description}</ItemDescription>
                </ItemContent>
              </DetailItem>
            ))}
          </DetailList>
        </CopyContainer>

        <ImageWrapper
          className="bodega-feature-image"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            alt="Cultivo sostenible durante la vendimia"
            src="/assets/sostenibilidad-vendimia-BtL7A5ZD.jpg"
            loading="lazy"
          />
        </ImageWrapper>
      </Grid>
    </Section>
  );
};

export default SostenibilidadBodega;
