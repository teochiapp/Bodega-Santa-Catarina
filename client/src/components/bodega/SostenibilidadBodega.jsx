import styled from 'styled-components';
import { motion } from 'framer-motion';

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

const SplitCard = styled(motion.div)`
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
  font-size: clamp(2rem, 3.2vw, 2.85rem);
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  line-height: 1.15;
  margin: 0 0 16px 0;
`;

const Intro = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: 1.08rem;
  font-style: italic;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  opacity: 0.92;
  margin: 0 0 24px 0;
  line-height: 1.5;
`;

const DetailList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;
`;

const DetailMarker = styled.span`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  border: 1.5px solid ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
  background-color: transparent;
  margin-top: 5px;
  flex-shrink: 0;
`;

const ItemTitle = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.86rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.primary || 'rgb(80, 43, 58)'};
  margin: 0 0 3px 0;
`;

const ItemDescription = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.82rem;
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
    <Section id="sostenibilidad" style={{ scrollMarginTop: '110px' }} className="bodega-feature-section">
      <Container>
        <SplitCard
          className="bodega-content-section"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <ImageWrapper className="bodega-content-image bodega-feature-image">
            <Image
              alt="Cultivo sostenible durante la vendimia"
              src="/images/elaboracion/elaboracion-sostenibilidad-hoja.webp"
              loading="lazy"
            />
          </ImageWrapper>

          <CopyContainer className="bodega-content-copy bodega-feature-copy">
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
                  <div>
                    <ItemTitle>{item.title}</ItemTitle>
                    <ItemDescription>{item.description}</ItemDescription>
                  </div>
                </DetailItem>
              ))}
            </DetailList>
          </CopyContainer>
        </SplitCard>
      </Container>
    </Section>
  );
};

export default SostenibilidadBodega;
