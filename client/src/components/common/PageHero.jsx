import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroContainer = styled.section`
  position: relative;
  width: 100%;
  height: ${({ $height }) => $height || '500px'};
  min-height: ${({ $minHeight }) => $minHeight || '500px'};
  background-color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
  overflow: hidden;
  display: flex;
  align-items: flex-end; /* Alineado abajo a la izquierda como la maqueta */

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || '768px'}) {
    height: 440px;
    min-height: 440px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints?.mobile || '576px'}) {
    height: 400px;
    min-height: 400px;
  }
`;

const BackgroundImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 0;
`;

const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(80, 43, 58, 0.45) 0%,
    rgba(80, 43, 58, 0.15) 60%
  );
  z-index: 1;
  pointer-events: none;
`;

const Content = styled(motion.div)`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 800px;
  height: auto;
  padding: 1.5rem 3rem;
  box-sizing: border-box;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || '768px'}) {
    padding: 1.5rem 2rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints?.mobile || '576px'}) {
    padding: 1.25rem 1.25rem;
  }
`;

const Tag = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.72rem;
  letter-spacing: 0.24em;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
  text-transform: uppercase;
  margin: 0 0 12px 0;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: clamp(2.6rem, 4vw, 3.5rem);
  font-weight: 400;
  color: ${({ theme }) => theme.colors?.textLight || '#FFFFFF'};
  line-height: 0.95;
  margin: 0;

  span {
    display: inline-block;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints?.mobile || '576px'}) {
    font-size: clamp(2.1rem, 6.5vw, 2.7rem);
    line-height: 1.05;
  }
`;

const Subtitle = styled.h2`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: ${({ theme }) => theme.typography?.sizes?.md || '1rem'};
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 12px;
  margin-bottom: 0;
  line-height: 1.5;
`;

const Description = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: ${({ theme }) => theme.typography?.sizes?.md || '1rem'};
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
  margin-top: 12px;
  margin-bottom: 0;
`;

const PageHero = ({
  tag,
  category,
  badge,
  title,
  subtitle,
  description,
  image = '/assets/Santa_Catarina_372.jpg',
  imageAlt = 'Vinos de Bodega Santa Catarina',
  height,
  minHeight
}) => {
  const displayTag = tag || category || badge;

  return (
    <HeroContainer $height={height} $minHeight={minHeight}>
      {image && <BackgroundImage src={image} alt={imageAlt} />}
      <GradientOverlay />
      <Content
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {displayTag && <Tag>{displayTag}</Tag>}
        {title && (
          <Title>
            {title}
          </Title>
        )}
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
        {description && <Description>{description}</Description>}
      </Content>
    </HeroContainer>
  );
};

export default PageHero;
