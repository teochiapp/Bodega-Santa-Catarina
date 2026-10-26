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
  max-height: 580px;
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
  gap: 1.25rem;
  box-sizing: border-box;

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

const Bodas = () => {
  const scrollToForm = () => {
    const formElement = document.getElementById('formulario-evento');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <MainWrapper id="eventos-bodas" className="event-editorial">
      <EditorialIntro className="event-editorial-introduction">
        <Eyebrow className="event-eyebrow">BODAS</Eyebrow>
        <h2>Vuestra historia merece un escenario único.</h2>
        <Description>
          Ceremonias, cócteles, banquetes y celebraciones en un entorno lleno de historia, naturaleza y autenticidad.
        </Description>
      </EditorialIntro>

      <ImageContainerPrimary>
        <EditorialImagePrimary
          className="event-editorial-image event-editorial-image-primary"
          alt="Bodas entre viñedos en Bodega Santa Catarina"
          src="/assets/Ivan_Pomposo_Photography___Design_-_Bodega_Santa_Catarina_-_0036-BwbLxc7B.jpg"
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
              <circle cx="12" cy="17" r="7" />
              <circle cx="20" cy="17" r="7" />
              <path d="m7 8-2-3M25 8l2-3M16 6V3" />
            </svg>
          </IconWrapper>
          <FeatureContent>
            <h3>Ceremonia</h3>
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
              <path d="M6 6h20l-8 10v10M12 27h12M10 11h12M23 3l-4 8" />
            </svg>
          </IconWrapper>
          <FeatureContent>
            <h3>Cóctel</h3>
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
              <circle cx="16" cy="16" r="10" />
              <circle cx="16" cy="16" r="6" />
              <path d="M4 6v8M2 6v5c0 2 4 2 4 0V6M4 14v12M28 6v20M25 11c0-3 1-5 3-5" />
            </svg>
          </IconWrapper>
          <FeatureContent>
            <h3>Banquete</h3>
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
              <path d="m16 3 1.8 7.2L25 12l-7.2 1.8L16 21l-1.8-7.2L7 12l7.2-1.8L16 3ZM25 20l.8 3.2L29 24l-3.2.8L25 28l-.8-3.2L21 24l3.2-.8L25 20ZM7 20l.6 2.4L10 23l-2.4.6L7 26l-.6-2.4L4 23l2.4-.6L7 20Z" />
            </svg>
          </IconWrapper>
          <FeatureContent>
            <h3>Celebración</h3>
          </FeatureContent>
        </FeatureArticle>
      </FeatureGrid>

      <ImageContainerSecondary>
        <EditorialImageSecondary
          className="event-editorial-image event-editorial-image-secondary"
          alt="Boda y banquete al aire libre en Bodega Santa Catarina"
          src="/assets/lps-photography-St-Catarina-Wedding-70__1_-jW6AWiRL.jpg"
          loading="lazy"
        />
      </ImageContainerSecondary>

      <CtaContainer>
        <CtaButton
          className="event-editorial-cta"
          type="button"
          onClick={scrollToForm}
        >
          SOLICITAR INFORMACIÓN PARA TU BODA
        </CtaButton>
      </CtaContainer>

      {/* Formulario reutilizable al pie */}
      <FormularioEventos defaultTipoEvento="Bodas" />
    </MainWrapper>
  );
};

export default Bodas;
