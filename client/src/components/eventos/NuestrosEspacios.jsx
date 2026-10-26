import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import FormularioEventos from './FormularioEventos';

const MainWrapper = styled.main`
  background-color: ${({ theme }) => theme.colors?.background || '#F2ECE4'};
  width: 100%;
  box-sizing: border-box;
`;

const IntroSection = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  padding: clamp(3.5rem, 6vw, 5rem) clamp(1.25rem, 4vw, 2.5rem) 2.5rem;
  box-sizing: border-box;
`;

const Eyebrow = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.68rem;
  letter-spacing: 0.24em;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.secondary || '#C2A478'};
  text-transform: uppercase;
  margin: 0 0 12px 0;
`;

const Heading = styled.h2`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', serif"};
  font-size: clamp(2.6rem, 4.5vw, 3.8rem);
  font-weight: 400;
  color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
  margin: 0 0 16px 0;
  line-height: 1.1;
`;

const Description = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.95rem;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
  opacity: 0.85;
  margin: 0;
  max-width: 680px;
`;

const BlockList = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 clamp(1.25rem, 4vw, 2.5rem);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  box-sizing: border-box;
`;

const SpaceArticle = styled(motion.article)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: #FAF8F5;
  border: 1px solid ${({ theme }) => theme.colors?.border || '#E0DCD3'};
  overflow: hidden;
  box-sizing: border-box;
  transition: transform 250ms ease, box-shadow 250ms ease;

  &:hover {
    box-shadow: 0 8px 24px rgba(80, 43, 58, 0.06);
  }

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 310px;
  background-color: #ECE5DC;
  position: relative;
  overflow: hidden;

  @media (max-width: 860px) {
    min-height: 260px;
    height: 280px;
  }
`;

const SpaceImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 600ms ease;

  ${SpaceArticle}:hover & {
    transform: scale(1.03);
  }
`;

const SpaceCopy = styled.div`
  padding: clamp(2rem, 3.5vw, 3rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;

  h3 {
    font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', serif"};
    font-size: clamp(1.85rem, 2.6vw, 2.4rem);
    font-weight: 400;
    color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
    margin: 0 0 14px 0;
    line-height: 1.15;
  }

  p {
    font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
    font-size: 0.86rem;
    line-height: 1.65;
    color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
    opacity: 0.85;
    margin: 0 0 22px 0;
  }
`;

const DetailsDl = styled.dl`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors?.border || '#E0DCD3'};
  padding-top: 18px;
  margin: 0 0 24px 0;

  div {
    display: flex;
    flex-direction: column;
  }

  dt {
    font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #8F7B6B;
    margin-bottom: 5px;
  }

  dd {
    margin: 0;
    font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
    font-size: 0.84rem;
    color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
    font-weight: 500;
  }
`;

const RequestButton = styled.button`
  align-self: flex-start;
  padding: 10px 24px;
  background-color: ${({ theme }) => theme.colors?.secondary || '#C2A478'};
  color: #FFFFFF;
  border: none;
  border-radius: 20px;
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 150ms ease, transform 150ms ease;

  &:hover {
    background-color: #B09165;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ESPACIOS_DATA = [
  {
    id: 'casa-son-aloy',
    name: 'Casa Son Aloy',
    image: '/assets/Santa_Cararina_229-CzSpZpJL.jpg',
    description:
      'La casa mallorquina reúne la Sala Polivalente, climatizada y equipada para reuniones y presentaciones, y el Porche Delantero, abierto a los viñedos.',
    superficie: '—',
    capacidad: 'Hasta 40 personas en interior',
  },
  {
    id: 'bodega',
    name: 'Bodega',
    image: '/assets/Santa_Cararina_390-3-RBJCEfHL.jpg',
    description:
      'Un conjunto singular formado por la Sala de Barricas, la Sala de Catas y la terraza rampa, ideal para combinar reuniones, gastronomía y cultura del vino.',
    superficie: '—',
    capacidad: 'Hasta 80 personas en Sala de Barricas',
  },
  {
    id: 'clastra-exterior',
    name: 'Clastra Exterior',
    image: '/assets/la-clastra-CL6xFguL.jpeg',
    description:
      'Un espacio al aire libre entre la tradición de la casa mallorquina y la arquitectura contemporánea de la bodega, idóneo para recepciones y banquetes.',
    superficie: '600 m²',
    capacidad: 'Hasta 270 personas',
  },
  {
    id: 'caseta',
    name: 'Caseta',
    image: '/assets/eventos-caseta-porche-N8X2oZRm.png',
    description:
      'Un rincón recogido con porche para encuentros de grupos reducidos y experiencias gastronómicas privadas en un ambiente exclusivo.',
    superficie: '—',
    capacidad: '—',
  },
];

const NuestrosEspacios = () => {
  const [selectedSpace, setSelectedSpace] = useState('');

  const handleSelectSpace = (spaceName) => {
    setSelectedSpace(spaceName);
    const formElement = document.getElementById('formulario-evento');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <MainWrapper id="eventos-espacios" className="event-content">
      <IntroSection className="event-page-introduction">
        <Eyebrow className="event-eyebrow">EVENTOS Y BODAS</Eyebrow>
        <Heading>Nuestros espacios</Heading>
        <Description>
          Descubre cuatro espacios versátiles entre la casa histórica, la bodega y el paisaje de Son Aloy, preparados
          para adaptarse a cada tipo de evento.
        </Description>
      </IntroSection>

      <BlockList className="event-block-list">
        {ESPACIOS_DATA.map((space, index) => (
          <SpaceArticle
            key={space.id}
            className="event-space-standard"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            <ImageContainer>
              <SpaceImage
                className="event-space-standard-image"
                src={space.image}
                alt={space.name}
                loading="lazy"
              />
            </ImageContainer>

            <SpaceCopy className="event-space-standard-copy">
              <h3>{space.name}</h3>
              <p>{space.description}</p>

              <DetailsDl className="event-space-details">
                <div>
                  <dt>Superficie</dt>
                  <dd>{space.superficie}</dd>
                </div>
                <div>
                  <dt>Capacidad</dt>
                  <dd>{space.capacidad}</dd>
                </div>
              </DetailsDl>

              <RequestButton
                type="button"
                onClick={() => handleSelectSpace(space.name)}
                aria-label={`Solicitar información sobre ${space.name}`}
              >
                SOLICITAR INFORMACIÓN
              </RequestButton>
            </SpaceCopy>
          </SpaceArticle>
        ))}
      </BlockList>

      <FormularioEventos
        defaultTipoEvento="Solicitud de espacio"
        selectedSpace={selectedSpace}
        onSpaceChange={setSelectedSpace}
      />
    </MainWrapper>
  );
};

export default NuestrosEspacios;
