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
  max-width: 720px;
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
    margin-bottom: 24px;

    p {
      font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
      font-size: 0.88rem;
      line-height: 1.6;
      color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
      opacity: 0.88;
      margin: 0;
    }
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

const MICE_DATA = [
  {
    id: 'alquiler-salas-espacios',
    name: 'Alquiler de salas y espacios',
    image: '/assets/COMIDA_SALAPOLIVALENTE-Dh7a8Yyy.png',
    description: 'Distintos espacios adaptados a cada formato de reunión o evento.',
  },
  {
    id: 'jornadas-completas',
    name: 'Jornadas completas',
    image: '/assets/Santa_Cararina_367-DLf8Imzi.jpg',
    description: 'Reuniones, team buildings, visitas guiadas, catas y comidas.',
  },
  {
    id: 'almuerzos-cenas-empresa',
    name: 'Almuerzos y cenas de empresa',
    image: '/assets/Santa_Catarina_361-DFXuees_.jpg',
    description: 'Propuestas gastronómicas en un entorno único.',
  },
  {
    id: 'regalos-corporativos',
    name: 'Regalos corporativos',
    image: '/assets/Gemini_Generated_Image_pldkkipldkkipldk-Bl4U6DI3.jpeg',
    description: 'Nuestros vinos, con condiciones especiales para empresas y la posibilidad de crear un vino personalizado para vuestra marca.',
  },
];

const MiceCorporativos = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  const handleOpenModal = (itemName) => {
    setSelectedItem(itemName);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <MainWrapper id="eventos-mice" className="event-content">
      <IntroSection className="event-page-introduction">
        <Eyebrow className="event-eyebrow">MICE Y EVENTOS CORPORATIVOS</Eyebrow>
        <Heading>MICE y eventos corporativos</Heading>
        <Description>
          Organizamos reuniones, convenciones, presentaciones de producto, jornadas de empresa y cenas corporativas en espacios versátiles rodeados de viñedos.
        </Description>
      </IntroSection>

      <BlockList className="event-block-list">
        {MICE_DATA.map((item, index) => (
          <SpaceArticle
            key={item.id}
            className="event-space-standard"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            <ImageContainer>
              <SpaceImage
                className="event-space-standard-image"
                src={item.image}
                alt={item.name}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </ImageContainer>

            <SpaceCopy className="event-space-standard-copy">
              <h3>{item.name}</h3>

              <div className="event-space-description">
                <p>{item.description}</p>
              </div>

              <RequestButton
                type="button"
                className="event-inquiry-button"
                onClick={() => handleOpenModal(item.name)}
              >
                Solicitar información
              </RequestButton>
            </SpaceCopy>
          </SpaceArticle>
        ))}
      </BlockList>

      {/* Modal dialog con formulario preseleccionado en MICE y eventos corporativos */}
      <FormularioEventos
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        defaultTipoEvento="MICE y eventos corporativos"
      />
    </MainWrapper>
  );
};

export default MiceCorporativos;
