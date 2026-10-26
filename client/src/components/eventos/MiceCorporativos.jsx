import styled from 'styled-components';
import { motion } from 'framer-motion';
import FormularioEventos from './FormularioEventos';

const MainWrapper = styled.main`
  background-color: ${({ theme }) => theme.colors?.background || '#F2ECE4'};
  width: 100%;
  box-sizing: border-box;
`;

const EditorialIntro = styled.div`
  max-width: 900px;
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

const Heading = styled.h2`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', serif"};
  font-size: clamp(2.6rem, 4.5vw, 3.8rem);
  font-weight: 400;
  color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
  margin: 0 0 16px 0;
  line-height: 1.12;
`;

const Description = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.95rem;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
  opacity: 0.85;
  margin: 0 auto;
  max-width: 640px;
`;

const ImageContainerPrimary = styled.div`
  max-width: 1140px;
  margin: 0 auto 3rem;
  padding: 0 clamp(1.25rem, 4vw, 2.5rem);
  box-sizing: border-box;
`;

const EditorialImagePrimary = styled.img`
  width: 100%;
  height: auto;
  max-height: 560px;
  object-fit: cover;
  display: block;
  border-radius: 2px;
  box-shadow: 0 4px 20px rgba(80, 43, 58, 0.06);
`;

const FeatureGrid = styled.div`
  max-width: 1140px;
  margin: 0 auto 3rem;
  padding: 0 clamp(1.25rem, 4vw, 2.5rem);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const FeatureArticle = styled(motion.article)`
  background: #FAF8F5;
  border: 1px solid ${({ theme }) => theme.colors?.border || '#E0DCD3'};
  padding: clamp(1.5rem, 2.5vw, 2.25rem);
  display: flex;
  align-items: flex-start;
  gap: 18px;
  box-sizing: border-box;
  transition: transform 200ms ease, box-shadow 200ms ease;

  &:hover {
    box-shadow: 0 6px 18px rgba(80, 43, 58, 0.05);
  }
`;

const IconWrapper = styled.span`
  color: ${({ theme }) => theme.colors?.secondary || '#C2A478'};
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;

  svg {
    width: 28px;
    height: 28px;
  }
`;

const FeatureContent = styled.div`
  h3 {
    font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', serif"};
    font-size: 1.45rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
    margin: 0 0 6px 0;
    line-height: 1.2;
  }

  p {
    font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
    font-size: 0.85rem;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
    opacity: 0.85;
    margin: 0;
  }
`;

const ImageContainerSecondary = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 clamp(1.25rem, 4vw, 2.5rem);
  box-sizing: border-box;
`;

const EditorialImageSecondary = styled.img`
  width: 100%;
  height: auto;
  max-height: 480px;
  object-fit: cover;
  display: block;
  border-radius: 2px;
  box-shadow: 0 4px 20px rgba(80, 43, 58, 0.06);
`;

const CtaContainer = styled.div`
  max-width: 1140px;
  margin: 2.5rem auto 1.5rem;
  padding: 0 clamp(1.25rem, 4vw, 2.5rem);
  display: flex;
  justify-content: center;
  box-sizing: border-box;
`;

const CtaButton = styled.button`
  padding: 14px 34px;
  background-color: ${({ theme }) => theme.colors?.secondary || '#C2A478'};
  color: #FFFFFF;
  border: none;
  border-radius: 25px;
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.76rem;
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

const MiceCorporativos = () => {
  const scrollToForm = () => {
    const formElement = document.getElementById('formulario-evento');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <MainWrapper id="eventos-mice" className="event-editorial">
      <EditorialIntro className="event-editorial-introduction">
        <Eyebrow className="event-eyebrow">EVENTOS CORPORATIVOS</Eyebrow>
        <h2>Un lugar diferente para encontrarnos.</h2>
        <Description>
          Reuniones, convenciones, presentaciones, jornadas de empresa y experiencias a medida en un entorno inspirador.
        </Description>
      </EditorialIntro>

      <ImageContainerPrimary>
        <EditorialImagePrimary
          className="event-editorial-image event-editorial-image-primary"
          alt="Cena elegante en Sala de Barricas"
          src="/assets/CENAELEGANTE_SALABARRICAS2-BnLV_zoJ.jpeg"
          loading="eager"
        />
      </ImageContainerPrimary>

      <FeatureGrid className="event-feature-grid">
        <FeatureArticle
          className="event-feature"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <IconWrapper className="event-feature-icon">
            <svg
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.35"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 27V10l11-5 11 5v17M10 27v-8h12v8M10 13h3M19 13h3" />
            </svg>
          </IconWrapper>
          <FeatureContent>
            <h3>Alquiler de salas y espacios</h3>
            <p>Distintos espacios adaptados a cada formato de reunión o evento.</p>
          </FeatureContent>
        </FeatureArticle>

        <FeatureArticle
          className="event-feature"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.08 }}
        >
          <IconWrapper className="event-feature-icon">
            <svg
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.35"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="5" y="7" width="22" height="20" />
              <path d="M10 4v6M22 4v6M5 13h22M10 18h4M10 22h8" />
            </svg>
          </IconWrapper>
          <FeatureContent>
            <h3>Jornadas completas</h3>
            <p>Reuniones, team buildings, visitas guiadas, catas y comidas.</p>
          </FeatureContent>
        </FeatureArticle>

        <FeatureArticle
          className="event-feature"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.16 }}
        >
          <IconWrapper className="event-feature-icon">
            <svg
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.35"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="16" cy="17" r="8" />
              <circle cx="16" cy="17" r="4" />
              <path d="M5 5v8M3 5v5c0 2 4 2 4 0V5M5 13v14M26 5v22M23 10c0-3 1-5 3-5" />
            </svg>
          </IconWrapper>
          <FeatureContent>
            <h3>Almuerzos y cenas de empresa</h3>
            <p>Propuestas gastronómicas en un entorno único.</p>
          </FeatureContent>
        </FeatureArticle>

        <FeatureArticle
          className="event-feature"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.24 }}
        >
          <IconWrapper className="event-feature-icon">
            <svg
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.35"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 13h22v14H5zM3 9h26v5H3zM16 9v18M16 9c-5 0-7-2-7-4 0-1.5 1.2-2.5 2.8-2.5C14 2.5 16 5.5 16 9ZM16 9c5 0 7-2 7-4 0-1.5-1.2-2.5-2.8-2.5C18 2.5 16 5.5 16 9Z" />
            </svg>
          </IconWrapper>
          <FeatureContent>
            <h3>Regalos corporativos</h3>
            <p>Nuestros vinos, con condiciones especiales para empresas.</p>
          </FeatureContent>
        </FeatureArticle>
      </FeatureGrid>

      <ImageContainerSecondary>
        <EditorialImageSecondary
          className="event-editorial-image event-editorial-image-secondary"
          alt="Instalaciones para eventos corporativos en Bodega Santa Catarina"
          src="/assets/Santa_Cararina_149-zAvTT5Pv.jpg"
          loading="lazy"
        />
      </ImageContainerSecondary>

      <CtaContainer>
        <CtaButton
          className="event-editorial-cta"
          type="button"
          onClick={scrollToForm}
        >
          SOLICITAR PROPUESTA PARA TU EMPRESA
        </CtaButton>
      </CtaContainer>

      {/* Formulario reutilizable al pie */}
      <FormularioEventos defaultTipoEvento="MICE y eventos corporativos" />
    </MainWrapper>
  );
};

export default MiceCorporativos;
