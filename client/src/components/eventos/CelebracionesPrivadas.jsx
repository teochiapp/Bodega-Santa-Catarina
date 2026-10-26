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

  &.is-compact {
    gap: 1.25rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const FeatureArticle = styled(motion.article)`
  background: #FAF8F5;
  border: 1px solid ${({ theme }) => theme.colors?.border || '#E0DCD3'};
  padding: clamp(1.4rem, 2vw, 1.85rem) clamp(1.5rem, 2.5vw, 2.25rem);
  display: flex;
  align-items: center;
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
    margin: 0;
    line-height: 1.2;
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

const CelebracionesPrivadas = () => {
  const scrollToForm = () => {
    const formElement = document.getElementById('formulario-evento');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <MainWrapper id="eventos-celebraciones" className="event-editorial">
      <EditorialIntro className="event-editorial-introduction">
        <Eyebrow className="event-eyebrow">CELEBRACIONES PRIVADAS</Eyebrow>
        <h2>Momentos que merecen un lugar especial.</h2>
        <Description>
          Cumpleaños, aniversarios, bautizos, comuniones y otras celebraciones familiares en un entorno único.
        </Description>
      </EditorialIntro>

      <ImageContainerPrimary>
        <EditorialImagePrimary
          className="event-editorial-image event-editorial-image-primary"
          alt="Celebraciones privadas entre viñedos en Bodega Santa Catarina"
          src="/assets/Ivan_Pomposo_Photography___Design_-_Bodega_Santa_Catarina_-_0086-BIDckyB8.jpg"
          loading="eager"
        />
      </ImageContainerPrimary>

      <FeatureGrid className="event-feature-grid is-compact">
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
              <path d="M7 15h18v12H7zM5 21h22M10 15v-3h12v3M11 8c0-1.8 2-2.5 2-4 1.5 1.4 1.6 2.9 0 4M19 8c0-1.8 2-2.5 2-4 1.5 1.4 1.6 2.9 0 4M13 12V9M21 12V9" />
            </svg>
          </IconWrapper>
          <FeatureContent>
            <h3>Cumpleaños</h3>
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
              <path d="M16 27S5 20.5 5 12.5C5 8.5 7.8 6 11 6c2.2 0 4 1.2 5 3 1-1.8 2.8-3 5-3 3.2 0 6 2.5 6 6.5 0 8-11 14.5-11 14.5Z" />
            </svg>
          </IconWrapper>
          <FeatureContent>
            <h3>Aniversarios</h3>
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
              <path d="M16 3S8 13 8 20a8 8 0 0 0 16 0c0-7-8-17-8-17Z" />
              <path d="M13 20c.5 2 1.7 3 3.5 3" />
            </svg>
          </IconWrapper>
          <FeatureContent>
            <h3>Bautizos</h3>
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
              <path d="M8 27V10l8-5 8 5v17M12 27v-7h8v7M13 12h6M16 9v6" />
            </svg>
          </IconWrapper>
          <FeatureContent>
            <h3>Comuniones</h3>
          </FeatureContent>
        </FeatureArticle>
      </FeatureGrid>

      <ImageContainerSecondary>
        <EditorialImageSecondary
          className="event-editorial-image event-editorial-image-secondary"
          alt="Enclave mágico para celebraciones en Son Aloy"
          src="/assets/78a30be1-542e-4587-ba08-82b7ab40be39-DTCPa1MG.jpeg"
          loading="lazy"
        />
      </ImageContainerSecondary>

      <CtaContainer>
        <CtaButton
          className="event-editorial-cta"
          type="button"
          onClick={scrollToForm}
        >
          CUÉNTANOS TU CELEBRACIÓN
        </CtaButton>
      </CtaContainer>

      {/* Formulario reutilizable al pie */}
      <FormularioEventos defaultTipoEvento="Celebraciones privadas" />
    </MainWrapper>
  );
};

export default CelebracionesPrivadas;
