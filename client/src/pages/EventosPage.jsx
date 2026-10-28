import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import FormularioEventos from '../components/eventos/FormularioEventos';

const MainWrapper = styled.main`
  background-color: ${({ theme }) => theme.colors?.background || '#F2ECE4'};
  width: 100%;
  box-sizing: border-box;
`;

const IntroSection = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  padding: clamp(3.5rem, 6vw, 5rem) clamp(1.25rem, 4vw, 2.5rem) 2.5rem;
  text-align: center;
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

const Heading = styled.h1`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', serif"};
  font-size: clamp(2.6rem, 5vw, 4rem);
  font-weight: 400;
  color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
  margin: 0 0 16px 0;
  line-height: 1.1;
`;

const Description = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.98rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
  opacity: 0.85;
  margin: 0 auto 26px;
  max-width: 720px;
`;

const HeaderCta = styled.button`
  padding: 13px 32px;
  background-color: ${({ theme }) => theme.colors?.secondary || '#C2A478'};
  color: #FFFFFF;
  border: none;
  border-radius: 25px;
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.74rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 150ms ease, transform 150ms ease, box-shadow 150ms ease;
  box-shadow: 0 2px 8px rgba(194, 164, 120, 0.25);

  &:hover {
    background-color: #B09165;
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(194, 164, 120, 0.35);
  }

  &:active {
    transform: translateY(0);
  }
`;

const CardsContainer = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 clamp(1.25rem, 4vw, 2.5rem) 5rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const CategoryCard = styled(motion.article)`
  background-color: #FAF8F5;
  border: 1px solid ${({ theme }) => theme.colors?.border || '#E0DCD3'};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: box-shadow 250ms ease, transform 250ms ease;

  &:hover {
    box-shadow: 0 10px 28px rgba(80, 43, 58, 0.08);
    transform: translateY(-2px);
  }
`;

const ImageWrap = styled.div`
  width: 100%;
  height: 280px;
  overflow: hidden;
  position: relative;
  background-color: #ECE5DC;

  @media (max-width: 768px) {
    height: 240px;
  }
`;

const CardImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 600ms ease;

  ${CategoryCard}:hover & {
    transform: scale(1.04);
  }
`;

const CardContent = styled.div`
  padding: clamp(1.75rem, 3vw, 2.5rem);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  box-sizing: border-box;
`;

const CardTag = styled.span`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: ${({ theme }) => theme.colors?.secondary || '#C2A478'};
  text-transform: uppercase;
  margin-bottom: 8px;
`;

const CardTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', serif"};
  font-size: clamp(1.75rem, 2.4vw, 2.2rem);
  font-weight: 500;
  color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
  margin: 0 0 12px 0;
  line-height: 1.15;
`;

const CardText = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.88rem;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
  opacity: 0.85;
  margin: 0 0 24px 0;
  flex-grow: 1;
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const ActionLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 22px;
  background-color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
  color: #FFFFFF;
  text-decoration: none;
  border-radius: 20px;
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  transition: background-color 150ms ease, transform 150ms ease;

  &:hover {
    background-color: #3B1F2B;
    transform: translateY(-1px);
  }

  svg {
    width: 14px;
    height: 14px;
    transition: transform 150ms ease;
  }

  &:hover svg {
    transform: translateX(3px);
  }
`;

const SecondaryButton = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  background-color: transparent;
  color: ${({ theme }) => theme.colors?.secondary || '#C2A478'};
  border: 1px solid ${({ theme }) => theme.colors?.secondary || '#C2A478'};
  border-radius: 20px;
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 150ms ease, color 150ms ease, transform 150ms ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors?.secondary || '#C2A478'};
    color: #FFFFFF;
    transform: translateY(-1px);
  }
`;

const CATEGORIES_DATA = [
  {
    id: 'nuestros-espacios',
    tag: 'ESPACIOS',
    title: 'Nuestros espacios',
    description:
      'Cuatro espacios versátiles entre la tradición de la casa histórica y la bodega contemporánea: Casa Son Aloy, Bodega, Clastra Exterior y Caseta.',
    image: '/assets/Santa_Cararina_229-CzSpZpJL.jpg',
    path: '/eventos/nuestros-espacios',
    eventType: 'Solicitud de espacio',
    buttonText: 'EXPLORAR ESPACIOS',
  },
  {
    id: 'mice-corporativos',
    tag: 'CORPORATIVO',
    title: 'MICE y eventos corporativos',
    description:
      'Alquiler de salas, jornadas completas, almuerzos de empresa y regalos corporativos en un entorno inspirador rodeado de viñedos mallorquines.',
    image: '/assets/CENAELEGANTE_SALABARRICAS2-BnLV_zoJ.jpeg',
    path: '/eventos/mice-y-eventos-corporativos',
    eventType: 'MICE y eventos corporativos',
    buttonText: 'VER PROPUESTAS',
  },
  {
    id: 'celebraciones-privadas',
    tag: 'CELEBRACIONES',
    title: 'Celebraciones privadas',
    description:
      'Cumpleaños, aniversarios, bautizos y comuniones. Composiciones editoriales personalizadas para que tus momentos familiares sean inolvidables.',
    image: '/assets/Ivan_Pomposo_Photography___Design_-_Bodega_Santa_Catarina_-_0086-BIDckyB8.jpg',
    path: '/eventos/celebraciones-privadas',
    eventType: 'Celebraciones privadas',
    buttonText: 'DESCUBRIR CELEBRACIONES',
  },
  {
    id: 'bodas',
    tag: 'BODAS',
    title: 'Bodas',
    description:
      'Vuestra historia merece un escenario único. Ceremonias civiles, cócteles al atardecer, banquetes al aire libre y celebración bajo las estrellas.',
    image: '/assets/Ivan_Pomposo_Photography___Design_-_Bodega_Santa_Catarina_-_0036-BwbLxc7B.jpg',
    path: '/eventos/bodas',
    eventType: 'Bodas',
    buttonText: 'VER BODAS',
  },
];

const EventosPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalEventType, setModalEventType] = useState('Solicitud de espacio');

  const handleOpenModal = (eventType = 'Solicitud de espacio') => {
    setModalEventType(eventType);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <MainWrapper id="portada-eventos" className="event-cover">
      <IntroSection className="event-page-introduction">
        <Eyebrow className="event-eyebrow">PORTADA EVENTOS Y BODAS</Eyebrow>
        <Heading>El escenario perfecto</Heading>
        <Description>
          Momentos inolvidables en un entorno mágico. Descubre nuestros espacios singulares y propuestas personalizadas
          para eventos corporativos, celebraciones privadas y bodas en Mallorca.
        </Description>
        <HeaderCta
          className="event-inquiry-button"
          type="button"
          onClick={() => handleOpenModal('Solicitud de espacio')}
        >
          SOLICITAR INFORMACIÓN
        </HeaderCta>
      </IntroSection>

      <CardsContainer className="event-categories-grid">
        {CATEGORIES_DATA.map((cat, index) => (
          <CategoryCard
            key={cat.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
          >
            <ImageWrap>
              <CardImg src={cat.image} alt={cat.title} loading="lazy" />
            </ImageWrap>

            <CardContent>
              <CardTag>{cat.tag}</CardTag>
              <CardTitle>{cat.title}</CardTitle>
              <CardText>{cat.description}</CardText>

              <ButtonRow>
                <ActionLink to={cat.path}>
                  <span>{cat.buttonText}</span>
                  <svg viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </ActionLink>

                <SecondaryButton
                  className="event-inquiry-button"
                  type="button"
                  onClick={() => handleOpenModal(cat.eventType)}
                  aria-label={`Solicitar información de ${cat.title}`}
                >
                  SOLICITAR INFO
                </SecondaryButton>
              </ButtonRow>
            </CardContent>
          </CategoryCard>
        ))}
      </CardsContainer>

      {/* Formulario modal reutilizable */}
      <FormularioEventos
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        defaultTipoEvento={modalEventType}
      />
    </MainWrapper>
  );
};

export default EventosPage;
