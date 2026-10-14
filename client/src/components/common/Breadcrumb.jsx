import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ScrollLink } from './ScrollToTop';

const HeroContainer = styled.section`
  position: relative;
  width: 100%;
  height: ${({ $height }) => $height || '400px'};
  min-height: ${({ $minHeight }) => $minHeight || '360px'};
  background-color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
  overflow: hidden;
  display: flex;
  align-items: flex-end;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || '768px'}) {
    height: 350px;
    min-height: 330px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints?.mobile || '576px'}) {
    height: 300px;
    min-height: 290px;
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
    rgba(80, 43, 58, 0.88) 0%,
    rgba(80, 43, 58, 0.55) 55%,
    rgba(80, 43, 58, 0.3) 100%
  );
  z-index: 1;
  pointer-events: none;
`;

const Content = styled(motion.div)`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 2.25rem 2rem;
  box-sizing: border-box;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || '768px'}) {
    padding: 1.75rem 1.25rem;
  }
`;

const BreadcrumbNav = styled.nav`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
`;

const BreadcrumbItemLink = styled(ScrollLink)`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  text-decoration: none;
  transition: color 150ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
  }
`;

const Separator = styled.span`
  color: ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
  font-size: 0.75rem;
  opacity: 0.8;
`;

const CurrentPageText = styled.span`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
  text-transform: uppercase;
`;

const Tag = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.68rem;
  letter-spacing: 0.24em;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
  text-transform: uppercase;
  margin: 0 0 10px 0;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: clamp(2.3rem, 4vw, 3.5rem);
  font-weight: 500;
  color: #FFFFFF;
  line-height: 1.05;
  margin: 0;

  span {
    display: inline-block;
  }
`;

const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  max-width: 650px;
  margin: 10px 0 0 0;
`;

const Breadcrumb = ({
  items = [],
  tag,
  category,
  title,
  subtitle,
  description,
  image = '/assets/Santa_Catarina_372.jpg',
  imageAlt = 'Bodega Santa Catarina · Mallorca',
  height,
  minHeight,
}) => {
  const displayTag = tag || category;
  const displaySub = subtitle || description;

  return (
    <HeroContainer $height={height} $minHeight={minHeight}>
      {image && <BackgroundImage src={image} alt={imageAlt} />}
      <GradientOverlay />
      <Content
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {items && items.length > 0 && (
          <BreadcrumbNav aria-label="Ruta de navegación">
            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              return (
                <span key={index} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  {item.path && !isLast ? (
                    <BreadcrumbItemLink to={item.path}>
                      {item.label}
                    </BreadcrumbItemLink>
                  ) : (
                    <CurrentPageText aria-current="page">{item.label}</CurrentPageText>
                  )}
                  {!isLast && <Separator>/</Separator>}
                </span>
              );
            })}
          </BreadcrumbNav>
        )}

        {displayTag && <Tag>{displayTag}</Tag>}
        {title && <Title>{title}</Title>}
        {displaySub && <Subtitle>{displaySub}</Subtitle>}
      </Content>
    </HeroContainer>
  );
};

export default Breadcrumb;
