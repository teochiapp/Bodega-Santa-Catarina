import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Section = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: clamp(2.5rem, 4vw, 4rem) clamp(1rem, 3vw, 1.5rem) 2.5rem;
  box-sizing: border-box;
`;

const Heading = styled.div`
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: clamp(2rem, 4vw, 4rem);
  align-items: end;
  margin-bottom: clamp(2.5rem, 3.5vw, 3.5rem);

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const Eyebrow = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.65rem;
  letter-spacing: 0.24em;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
  text-transform: uppercase;
  margin: 0 0 14px 0;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: clamp(2.4rem, 4.2vw, 4rem);
  font-weight: 400;
  line-height: 1.05;
  color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
  margin: 0;
  letter-spacing: -0.01em;
`;

const Intro = styled.div`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.82rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
  opacity: 0.88;

  p {
    margin: 0;
  }

  p + p {
    margin-top: 12px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(1.25rem, 2vw, 1.75rem);

  @media (max-width: 1040px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article`
  background: #f4f2eb;
  border: 1px solid rgb(224, 221, 213);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 16px rgba(80, 43, 58, 0.04);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 26px rgba(80, 43, 58, 0.08);
  }
`;

const CardImageWrapper = styled.div`
  width: 100%;
  height: 220px;
  position: relative;
  overflow: hidden;
  background-color: #e8e2d8;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  ${Card}:hover & img {
    transform: scale(1.035);
  }
`;

const CardBody = styled.div`
  padding: clamp(1.25rem, 1.8vw, 1.6rem);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  flex: 1;
`;

const CardHeading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: clamp(1.45rem, 1.65vw, 1.7rem);
  font-weight: ${({ theme }) => theme.typography?.weights?.bold || 700};
  line-height: 1.15;
  color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
  margin: 0;
`;

const CardSubtitle = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.76rem;
  line-height: 1.45;
  color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
  opacity: 0.85;
  margin: 6px 0 0 0;
`;

const CardPrice = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: clamp(1.45rem, 1.65vw, 1.7rem);
  font-weight: 400;
  color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
  white-space: nowrap;
  margin: 0;
  line-height: 1.15;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: auto;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.button`
  padding: 10px 18px;
  border: 0;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
  color: #fff;
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors?.primary || '#502B3A'};
    transform: translateY(-1px);
  }
`;

const SecondaryButton = styled.button`
  padding: 9px 16px;
  border: 1px solid rgba(80, 43, 58, 0.35);
  border-radius: 999px;
  background: transparent;
  color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
    background: rgba(80, 43, 58, 0.04);
  }
`;

const InfoBox = styled(motion.div)`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.8rem;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
  opacity: 0.9;
  padding: 12px 14px;
  background: rgba(80, 43, 58, 0.04);
  border-radius: 6px;
  border-left: 2px solid ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
  margin: 2px 0;
`;

const EXPERIENCIAS_DEFINIDAS = [
  {
    id: 1,
    titulo: 'Cata de 3 vinos',
    subtitulo: null,
    precio: 20,
    portada: '/assets/Santa_Catarina_403-DKszSTsA.jpg',
    portadaFallback: '/assets/Santa_Catarina_Vendimia_284.jpg',
    descripcion:
      'Recorrido por la bodega y cata guiada de 3 de nuestros vinos más representativos en Son Aloy para descubrir la tradición y autenticidad de Santa Catarina.',
  },
  {
    id: 2,
    titulo: 'Cata de 5 vinos',
    subtitulo: null,
    precio: 25,
    portada: '/assets/para_video-CuiWMN-P.png',
    portadaFallback: '/assets/card-vinos-CQrSZDMP.jpg',
    descripcion:
      'Una experiencia de degustación profunda con 5 vinos seleccionados de nuestras diferentes colecciones, profundizando en las variedades autóctonas y el terruño mallorquín.',
  },
  {
    id: 3,
    titulo: 'Visita al viñedo',
    subtitulo: 'Bodega + cata de 3 vinos + pa amb oli mallorquín',
    precio: 40,
    portada: '/assets/Santa_Catarina_492-B_Kb9mBD.jpg',
    portadaFallback: '/assets/card-enoturismo-5P0pKmf9.jpg',
    descripcion:
      'Paseo guiado entre los viñedos de Son Aloy, visita completa a la bodega de elaboración y cata de 3 vinos maridados con un auténtico pa amb oli mallorquín tradicional.',
  },
  {
    id: 4,
    titulo: 'Visita al viñedo',
    subtitulo: 'Bodega + cata de 5 vinos + pa amb oli mallorquín',
    precio: 45,
    portada: '/assets/Santa_Catarina_447-1-DsZnvgvD.jpg',
    portadaFallback: '/assets/Santa_Catarina_526-yhzhdQ3t.jpg',
    descripcion:
      'Nuestra vivencia enoturística más completa: paseo entre cepas, recorrido técnico por las instalaciones, cata de 5 vinos de autor y almuerzo con pa amb oli en la finca.',
  },
];

const CatasCatalogo = ({ onReservar }) => {
  const [infoAbierta, setInfoAbierta] = useState(null);

  return (
    <Section id="experiencias-enoturismo" className="enoturismo-experiences-section">
      <Heading className="enoturismo-section-heading">
        <div>
          <Eyebrow className="enoturismo-panel-eyebrow">NUESTRAS EXPERIENCIAS</Eyebrow>
          <Title>Descubre el vino desde su origen</Title>
        </div>
        <Intro className="enoturismo-intro-copy">
          <p>
            Descubre el origen de nuestros vinos recorriendo la historia, los viñedos, la bodega y
            las salas de elaboración y crianza de Bodega Santa Catarina.
          </p>
          <p>
            Una experiencia guiada que combina tradición, innovación, sostenibilidad y pasión por
            Mallorca y sus variedades autóctonas.
          </p>
        </Intro>
      </Heading>

      <Grid className="enoturismo-card-grid is-three-columns">
        {EXPERIENCIAS_DEFINIDAS.map((item) => {
          const isInfoOpen = infoAbierta === item.id;

          return (
            <Card key={item.id} className="enoturismo-experience-card">
              <CardImageWrapper className="enoturismo-card-image">
                <img
                  src={item.portada}
                  alt={item.titulo}
                  loading="lazy"
                  onError={(e) => {
                    if (e.currentTarget.src !== item.portadaFallback) {
                      e.currentTarget.src = item.portadaFallback;
                    }
                  }}
                />
              </CardImageWrapper>

              <CardBody className="enoturismo-card-body">
                <CardHeading className="enoturismo-card-heading">
                  <TitleWrapper className="enoturismo-card-title">
                    <CardTitle>{item.titulo}</CardTitle>
                    {item.subtitulo && <CardSubtitle>{item.subtitulo}</CardSubtitle>}
                  </TitleWrapper>
                  <CardPrice className="enoturismo-card-price">
                    {Number(item.precio).toFixed(0)} €/pax
                  </CardPrice>
                </CardHeading>

                <AnimatePresence>
                  {isInfoOpen && item.descripcion && (
                    <InfoBox
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22, ease: 'easeOut' }}
                    >
                      {item.descripcion}
                    </InfoBox>
                  )}
                </AnimatePresence>

                <Actions className="enoturismo-card-actions">
                  <PrimaryButton
                    type="button"
                    className="is-primary"
                    id={`btn-reservar-${item.id}`}
                    onClick={() => onReservar?.(item.id)}
                  >
                    RESERVAR VISITA →
                  </PrimaryButton>
                  <SecondaryButton
                    type="button"
                    className="is-secondary"
                    aria-expanded={isInfoOpen}
                    onClick={() => setInfoAbierta((prev) => (prev === item.id ? null : item.id))}
                  >
                    {isInfoOpen ? '- INFO ▲' : '+ INFO ▼'}
                  </SecondaryButton>
                </Actions>
              </CardBody>
            </Card>
          );
        })}
      </Grid>
    </Section>
  );
};

export default CatasCatalogo;
