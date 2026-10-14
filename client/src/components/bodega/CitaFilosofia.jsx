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

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const ImageWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  min-height: 520px;
  position: relative;
  overflow: hidden;

  @media (max-width: 960px) {
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
`;

const CopyContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(3rem, 6vw, 6rem) clamp(2rem, 5vw, 5.5rem);
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 2.5rem 1.5rem;
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

const FILOSOFIA_ITEMS = [
  {
    title: 'Tradición',
    description: 'Respeto por el legado y la historia de la bodega.',
  },
  {
    title: 'Autenticidad',
    description: 'Marca conectada con el territorio y con identidad propia.',
  },
  {
    title: 'Excelencia',
    description: 'Búsqueda constante de calidad en producto, imagen y experiencia.',
  },
  {
    title: 'Mediterráneo',
    description: 'La luz, el paisaje y el estilo de vida forman parte de nuestra esencia.',
  },
  {
    title: 'Experiencia',
    description: 'La bodega no solo vende vino: vende emociones y territorio.',
  },
];

const CitaFilosofia = () => {
  return (
    <Section className="bodega-feature-section">
      <Grid>
        <ImageWrapper
          className="bodega-feature-image"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            alt="Selección manual de una uva en Son Aloy"
            src="/assets/nuestra-filosofia-uva-DbAU8HPK.png"
            loading="lazy"
          />
        </ImageWrapper>

        <CopyContainer
          className="bodega-feature-copy"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Eyebrow className="bodega-eyebrow">NUESTRA ESENCIA</Eyebrow>

          <DisplayTitle className="bodega-display-title">
            Una forma de vivir Mallorca
          </DisplayTitle>

          <Intro className="bodega-intro">
            <em>Creemos que una marca que pisa la tierra celebra la historia y proyecta el futuro.</em>
          </Intro>

          <DetailList className="bodega-detail-list">
            {FILOSOFIA_ITEMS.map((item, idx) => (
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
      </Grid>
    </Section>
  );
};

export default CitaFilosofia;
