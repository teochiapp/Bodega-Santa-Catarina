import styled from 'styled-components';
import { ScrollLink } from '../common/ScrollToTop';

const Section = styled.section`
  background-color: ${({ theme }) => theme.colors.background || 'rgb(242, 236, 228)'};
  padding: 100px 0;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || '768px'}) {
    padding: 60px 0;
  }
`;

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 5rem;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints?.desktop || '1024px'}) {
    grid-template-columns: 1fr;
    gap: 3.5rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints?.mobile || '576px'}) {
    padding: 0 1.5rem;
    gap: 2.5rem;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Eyebrow = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.62rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgb(203, 160, 82);
  margin-bottom: 16px;
  font-weight: 600;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontFamily.heading};
  font-size: clamp(3rem, 5vw, 4.8rem);
  font-weight: 700;
  line-height: 1;
  color: ${({ theme }) => theme.colors.primary || 'rgb(80, 43, 58)'};
  margin-bottom: 24px;
  white-space: pre-line;
  letter-spacing: -0.01em;
`;

const Description = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.82rem;
  line-height: 1.85;
  color: ${({ theme }) => theme.colors.primary || 'rgb(80, 43, 58)'};
  margin-bottom: 28px;
  max-width: 480px;
`;

const ArrowIcon = styled.svg`
  width: 16px;
  height: 10px;
  transition: transform 0.25s ease;
  flex-shrink: 0;
`;

const ActionLink = styled(ScrollLink)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary || 'rgb(80, 43, 58)'};
  background: none;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary || 'rgb(80, 43, 58)'};
  padding-bottom: 3px;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.25s ease, border-color 0.25s ease, opacity 0.25s ease;

  &:hover {
    color: rgb(203, 160, 82);
    border-color: rgb(203, 160, 82);

    ${ArrowIcon} {
      transform: translateX(4px);
    }
  }
`;

const ImageContainer = styled.div`
  overflow: hidden;
  border-radius: 2px;
  height: 500px;
  box-shadow: ${({ theme }) => theme.shadows?.md || '0 4px 8px rgba(0,0,0,0.1)'};

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || '768px'}) {
    height: 380px;
    width: 100%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints?.mobile || '576px'}) {
    height: 280px;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: grayscale(100%) contrast(1.05);
  transition: transform 0.7s cubic-bezier(0.25, 1, 0.5, 1), filter 0.5s ease;

  &:hover {
    transform: scale(1.03);
    filter: grayscale(90%) contrast(1.08);
  }
`;

const NuestraBodega = () => {
  return (
    <Section>
      <Container>
        <ContentWrapper>
          <Eyebrow>NUESTRA BODEGA</Eyebrow>
          <Title>{'UN\nLEGADO\nVIVO'}</Title>
          <Description>
            Santa Catarina es más que una bodega, es una historia de familia, de tierra y de
            pasión por el vino. Desde 1984 elaboramos vinos que expresan la esencia de Mallorca,
            respetando la naturaleza y mirando al futuro.
          </Description>
          <ActionLink to="/la-bodega">
            <span>CONOCER NUESTRA HISTORIA</span>
            <ArrowIcon viewBox="0 0 16 10" fill="none" aria-hidden="true">
              <path
                d="M1 5H15M15 5L10.5 0.5M15 5L10.5 9.5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </ArrowIcon>
          </ActionLink>
        </ContentWrapper>

        <ImageContainer>
          <StyledImage
            src="/inicio/about-image-card.webp"
            alt="Vendimia en Bodega Santa Catarina"
            loading="lazy"
          />
        </ImageContainer>
      </Container>
    </Section>
  );
};

export default NuestraBodega;
