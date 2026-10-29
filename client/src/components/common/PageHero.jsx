import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { ScrollLink } from './ScrollToTop';
import { useHeroes } from '../../context/HeroesContext';
import { getResolvedImageUrl } from '../../services/api';

import HeroOverlay from '../HeroOverlay';

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
  object-position: ${({ $objectPosition }) => $objectPosition || 'center'};
  filter: brightness(1) contrast(1.02);
  z-index: 0;
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
  line-height: 0.92;
  margin: 0 0 12px 0;

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

const PageHero = ({
  seccion,
  items = [],
  tag,
  category,
  badge,
  title,
  subtitle,
  description,
  image = '/images/heros/hero-vinos.webp',
  imageAlt = 'Bodega Santa Catarina · Mallorca',
  height,
  minHeight,
  objectPosition,
  overlay,
}) => {
  const location = useLocation();
  const { getHero } = useHeroes();

  // Buscar configuración dinámica en el panel de administración (por sección o ruta actual)
  const dbHero = getHero(seccion) || getHero(location?.pathname);

  const displayTag = dbHero ? dbHero.tag : (tag || category || badge);
  const rawTitle = dbHero ? (dbHero.titulo || title) : title;
  const displaySub = dbHero ? dbHero.subtitulo : (subtitle || description);
  const displayImage = dbHero?.imagen ? getResolvedImageUrl(dbHero.imagen) : image;
  const displayAlt = dbHero?.imagenAlt || imageAlt;
  const displayPosition = dbHero?.posicion || objectPosition;

  // Renderizar título soportando saltos de línea tanto de texto como JSX
  const renderTitle = (val) => {
    if (!val) return null;
    if (typeof val === 'string' && val.includes('\n')) {
      const lines = val.split('\n');
      return lines.map((line, idx) => (
        <span key={idx}>
          {line}
          {idx < lines.length - 1 && <br />}
        </span>
      ));
    }
    return val;
  };

  return (
    <HeroContainer data-no-scroll-reveal="true" $height={height} $minHeight={minHeight}>
      {displayImage && (
        <BackgroundImage
          src={displayImage}
          alt={displayAlt}
          $objectPosition={displayPosition}
        />
      )}
      <HeroOverlay style={overlay ? { background: overlay } : undefined} />
      <Content
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
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
        {rawTitle && <Title>{renderTitle(rawTitle)}</Title>}
        {displaySub && <Subtitle>{displaySub}</Subtitle>}
      </Content>
    </HeroContainer>
  );
};

export default PageHero;
export { PageHero as Breadcrumb };
