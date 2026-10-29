import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import PageHero from '../common/PageHero';
import FormularioEventos from './FormularioEventos';

const PageWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors?.background || '#F2ECE4'};
  width: 100%;
  box-sizing: border-box;
`;

const MainContent = styled.main`
  max-width: 1140px;
  margin: 0 auto;
  padding: clamp(3rem, 5vw, 4.5rem) clamp(1.25rem, 4vw, 2.5rem) 6rem;
  box-sizing: border-box;
`;

const CelebrationsCard = styled(motion.article)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: #FAF7F2;
  border: 1px solid #E4DFD7;
  border-radius: 0;
  overflow: hidden;
  box-sizing: border-box;
  box-shadow: 0 4px 20px rgba(80, 43, 58, 0.04);
  transition: transform 250ms ease, box-shadow 250ms ease;

  &:hover {
    box-shadow: 0 8px 24px rgba(80, 43, 58, 0.08);
  }

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const CardImageContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 440px;
  background-color: #ECE5DC;
  position: relative;
  overflow: hidden;

  @media (max-width: 860px) {
    min-height: 300px;
    height: 320px;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 35%;
  display: block;
  transition: transform 600ms ease;

  ${CelebrationsCard}:hover & {
    transform: scale(1.03);
  }
`;

const CardCopy = styled.div`
  padding: clamp(2rem, 3.5vw, 3.25rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;

  .bodega-eyebrow {
    font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
    font-size: 0.68rem;
    letter-spacing: 0.24em;
    font-weight: 700;
    color: ${({ theme }) => theme.colors?.secondary || '#C2A478'};
    text-transform: uppercase;
    margin: 0 0 12px 0;
  }

  h2.bodega-display-title {
    font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', serif"};
    font-size: clamp(1.8rem, 2.5vw, 2.4rem);
    font-weight: 400;
    color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
    margin: 0 0 14px 0;
    line-height: 1.16;
  }

  p.bodega-body {
    font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
    font-size: 0.88rem;
    line-height: 1.62;
    color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
    opacity: 0.88;
    margin: 0 0 14px 0;
  }

  .event-celebrations-divider {
    border-top: 1px solid #DDD7CE;
    padding-top: 22px;
    margin-top: 8px;

    h2.bodega-display-title {
      font-size: clamp(1.6rem, 2.2vw, 2.1rem);
      margin: 0 0 12px 0;
    }

    p.bodega-body {
      margin-bottom: 24px;
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

const CelebracionesPrivadas = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <PageWrapper className="eventos-page">
      <PageHero
        seccion="eventos-celebraciones"
        tag="CELEBRACIONES PRIVADAS"
        title="Celebraciones privadas"
        subtitle="Celebraciones personales en un entorno mallorquín lleno de historia y naturaleza."
        image="/images/heros/hero-eventos.webp"
      />

      {/* Main content with celebrations editorial card */}
      <MainContent id="eventos-celebraciones">
        <CelebrationsCard
          className="bodega-content-section bodega-vineyard-intro event-celebrations-layout"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          <CardImageContainer>
            <CardImage
              className="bodega-content-image"
              alt="Celebración privada en Bodega Santa Catarina"
              src="/images/eventos/evento-celebraciones-privadas.webp"
              loading="lazy"
            />
          </CardImageContainer>

          <CardCopy className="bodega-content-copy">
            <p className="bodega-eyebrow">CELEBRACIONES PRIVADAS</p>
            <h2 className="bodega-display-title">Momentos especiales, en un lugar único</h2>
            <p className="bodega-body">
              En Bodega Santa Catarina, rodeada de viñedos y en el corazón de Mallorca, encontrarás el entorno ideal para celebrar momentos especiales.
            </p>
            <p className="bodega-body">
              Ponemos a vuestra disposición diferentes espacios y propuestas personalizadas para cumpleaños, aniversarios, reuniones familiares y encuentros privados, adaptándonos a las necesidades de cada ocasión para crear una experiencia única.
            </p>

            <div className="event-celebrations-divider">
              <h2 className="bodega-display-title">Un espacio para cada ocasión</h2>
              <p className="bodega-body">
                Desde una comida íntima hasta un encuentro más amplio, adaptamos el espacio, el formato y la propuesta gastronómica a cada celebración, para que todo fluya con naturalidad.
              </p>
              <RequestButton
                type="button"
                className="event-inquiry-button"
                onClick={handleOpenModal}
              >
                Solicitar información
              </RequestButton>
            </div>
          </CardCopy>
        </CelebrationsCard>
      </MainContent>

      {/* Formulario modal reutilizable preseleccionado con "Celebración privada" */}
      <FormularioEventos
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        defaultTipoEvento="Celebración privada"
      />
    </PageWrapper>
  );
};

export default CelebracionesPrivadas;
