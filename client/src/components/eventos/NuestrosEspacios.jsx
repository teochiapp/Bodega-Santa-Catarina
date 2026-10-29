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
  padding: 0 clamp(1.25rem, 4vw, 2.5rem) 6rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  box-sizing: border-box;
`;

const SpaceArticle = styled(motion.article)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: #FAF7F2;
  border: 1px solid #E4DFD7;
  border-radius: 0;
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
  min-height: 320px;
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
    font-size: clamp(2rem, 2.8vw, 2.6rem);
    font-weight: 400;
    color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
    margin: 0 0 16px 0;
    line-height: 1.15;
  }

  .event-space-description {
    p {
      font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
      font-size: 0.85rem;
      line-height: 1.6;
      color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
      opacity: 0.88;
      margin: 0 0 14px 0;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;

const DetailsDl = styled.dl`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  border-top: 1px solid #DDD7CE;
  padding-top: 20px;
  margin: 22px 0 24px 0;

  div {
    display: flex;
    flex-direction: column;
  }

  dt {
    font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #B59B73;
    margin-bottom: 6px;
  }

  dd {
    margin: 0;
    font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
    font-size: 0.82rem;
    color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
    font-weight: 400;
    line-height: 1.45;
    white-space: pre-line;
  }
`;

const RequestButton = styled.button`
  align-self: flex-start;
  padding: 9px 24px;
  background-color: #BFAB82;
  color: #502B3A;
  border: none;
  border-radius: 20px;
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-transform: none;
  cursor: pointer;
  transition: background-color 150ms ease, transform 150ms ease, box-shadow 150ms ease;

  &:hover {
    background-color: #B09B70;
    transform: translateY(-1px);
    box-shadow: 0 3px 8px rgba(80, 43, 58, 0.12);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ESPACIOS_DATA = [
  {
    id: 'casa-son-aloy',
    name: 'Casa Son Aloy',
    image: '/images/espacios/espacios-casa-son-aloy.webp',
    paragraphs: [
      'Diferentes espacios interiores y exteriores, office, patio trasero a disposición para catering, baños, aire acondicionado, climatización, 12 altavoces móviles, pantalla TV 75 pulgadas.',
      'Una sala polivalente para reuniones, banquetes, etc. con porche delantero y 2 terrazas superiores panorámicas.',
    ],
    superficie: '117 m²',
    capacidad: 'Hasta 40 personas en interior',
  },
  {
    id: 'bodega',
    name: 'Bodega',
    image: '/images/espacios/espacios-sala-barricas.webp',
    paragraphs: [
      'Acceso por escalera desde el lobby o ascensor. Sala climatizada y acondicionada, con diferentes juegos de luces y contigua a nuestra sala de conferencias (Wine Lounge).',
    ],
    superficie: '300 m²',
    capacidad: 'Hasta 300 personas (formato teatro).\nHasta 200 personas (formato banquete).',
  },
  {
    id: 'clastra-exterior',
    name: 'Clastra Exterior',
    image: '/images/espacios/espacios-clastra-exterior.webp',
    paragraphs: [
      'Espectacular espacio al aire libre que se encuentra entre la tradición de la casa mallorquina y la innovación de la bodega, rodeado de un idílico paisaje de viñedos y las maravillosas montañas de la Tramuntana.',
      'Acceso directo desde el parking por un camino pavimentado.',
      'Diseñado para adaptarse a distintas necesidades y formatos.',
    ],
    superficie: '600 m²',
    capacidad: '270 personas (formato banquete).',
  },
  {
    id: 'caseta',
    name: 'Caseta',
    image: '/images/eventos/eventos-caseta.webp',
    paragraphs: [
      'Lugar espectacular para acoger a grupos reducidos de personas para una experiencia gastronómica muy privatizada y exclusiva, o para realizar bienvenidas en un lugar idílico rodeado de las mejores vistas a la Tramuntana.',
    ],
    superficie: null,
    capacidad: 'Hasta 15 personas.',
  },
];

const NuestrosEspacios = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState('');

  const handleOpenModal = (spaceName = '') => {
    setSelectedSpace(spaceName);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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

              <div className="event-space-description">
                {space.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <DetailsDl className="event-space-details">
                {space.superficie && (
                  <div>
                    <dt>Superficie</dt>
                    <dd>{space.superficie}</dd>
                  </div>
                )}
                <div>
                  <dt>Capacidad</dt>
                  <dd>{space.capacidad}</dd>
                </div>
              </DetailsDl>

              <RequestButton
                className="event-inquiry-button"
                type="button"
                onClick={() => handleOpenModal(space.name)}
                aria-label={`Solicitar información sobre ${space.name}`}
              >
                Solicitar información
              </RequestButton>
            </SpaceCopy>
          </SpaceArticle>
        ))}
      </BlockList>

      <FormularioEventos
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        defaultTipoEvento="Solicitud de espacio"
        selectedSpace={selectedSpace}
        onSpaceChange={setSelectedSpace}
      />
    </MainWrapper>
  );
};

export default NuestrosEspacios;
