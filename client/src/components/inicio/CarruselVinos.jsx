import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ScrollLink } from '../common/ScrollToTop';
import { obtenerVinos } from '../../services/vinosService';
import { getResolvedImageUrl } from '../../services/api';

const Section = styled.section`
  padding: 100px 0;
  background-color: #F2ECE4;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || '768px'}) {
    padding: 60px 0;
  }
`;

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints?.mobile || '576px'}) {
    padding: 0 1.25rem;
  }
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 36px;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontFamily.heading};
  font-size: clamp(2.5rem, 4vw, 4rem);
  font-weight: 600;
  line-height: 1;
  color: ${({ theme }) => theme.colors.primary || 'rgb(80, 43, 58)'};
  margin: 0;
  letter-spacing: -0.01em;
`;

const ViewAllButton = styled(ScrollLink)`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.65rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.primary || 'rgb(80, 43, 58)'};
  background: none;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary || 'rgb(80, 43, 58)'};
  padding: 0 0 3px;
  cursor: pointer;
  text-decoration: none;
  transition: color 0.25s ease, border-color 0.25s ease, opacity 0.25s ease;

  &:hover {
    color: rgb(203, 160, 82);
    border-color: rgb(203, 160, 82);
  }
`;

const CarouselLayout = styled.div`
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr) 48px;
  gap: 22px;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints?.mobile || '576px'}) {
    grid-template-columns: 38px minmax(0, 1fr) 38px;
    gap: 10px;
  }
`;

const ArrowButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid rgba(80, 43, 58, 0.208);
  background: transparent;
  color: ${({ theme }) => theme.colors.primary || 'rgb(80, 43, 58)'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: all 0.25s ease;
  flex-shrink: 0;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary || 'rgb(80, 43, 58)'};
    background: rgba(80, 43, 58, 0.05);
    transform: scale(1.05);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints?.mobile || '576px'}) {
    width: 38px;
    height: 38px;
  }
`;

const WineTrack = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  padding: 4px 0;

  /* Ocultar barra de scroll estándar */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const WineCard = styled(ScrollLink)`
  min-width: 0;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  display: block;
  flex: 0 0 calc((100% - 60px) / 4);
  scroll-snap-align: start;

  @media (max-width: 1200px) {
    flex: 0 0 calc((100% - 40px) / 3);
  }

  @media (max-width: 900px) {
    flex: 0 0 calc((100% - 20px) / 2);
  }

  @media (max-width: 576px) {
    flex: 0 0 85%;
  }
`;

const CardInner = styled.div`
  height: 520px;
  background-color: rgb(242, 236, 228);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
  border-radius: 2px;
  position: relative;
  transition: transform 0.4s ease, box-shadow 0.4s ease;

  ${WineCard}:hover & {
    box-shadow: 0 10px 25px rgba(80, 43, 58, 0.12);
  }

  @media (max-width: 768px) {
    height: 420px;
  }

  @media (max-width: 480px) {
    height: 360px;
  }
`;

const WineImage = styled.img`
  height: 520px;
  width: auto;
  max-width: 100%;
  object-fit: contain;
  display: block;
  transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);

  ${WineCard}:hover & {
    transform: scale(1.04) translateY(-3px);
  }

  @media (max-width: 768px) {
    height: 420px;
  }

  @media (max-width: 480px) {
    height: 360px;
  }
`;

const COLECCIONES_ORDER = {
  'Gama sta': 1,
  'Colección Surant': 2,
  'Colección ‘Nguany': 3,
  'Colección \'Nguany': 3,
};

const DEFAULT_IMAGES = {
  'Manto Negro': '/assets/VINOS-02.png',
  'Callet': '/assets/VINOS-01.png',
  'Prensal': '/assets/VINOS-03.png',
  'Giró Ros': '/assets/VINOS-04.png',
  'Surant Blanco': '/assets/VINOS-06.png',
  'Surant Rosado': '/assets/VINOS-05.png',
  '‘Nguany Tinto': '/assets/wine-nguany-tinto.png',
  '\'Nguany Tinto': '/assets/wine-nguany-tinto.png',
  '‘Nguany Blanco': '/assets/wine-nguany-blanco.png',
  '\'Nguany Blanco': '/assets/wine-nguany-blanco.png',
  '‘Nguany Rosado': '/assets/wine-nguany-rosado.png',
  '\'Nguany Rosado': '/assets/wine-nguany-rosado.png',
};

const resolveCollectionPath = (coleccion) => {
  const c = (coleccion || '').toLowerCase();
  if (c.includes('sta')) return '/vinos#coleccion-sta';
  if (c.includes('surant')) return '/vinos#coleccion-surant';
  if (c.includes('nguany')) return '/vinos#coleccion-nguany';
  return '/vinos';
};

const resolveWineImage = (v) => {
  if (v.portada && v.portada !== '/isologo.png' && v.portada.trim() !== '') {
    return getResolvedImageUrl(v.portada);
  }
  const cleanTitle = (v.titulo || '').replace(/[‘’']/g, "'").trim();
  return (
    DEFAULT_IMAGES[v.titulo] ||
    DEFAULT_IMAGES[cleanTitle] ||
    '/assets/VINOS-01.png'
  );
};

const DEFAULT_VINOS = [
  {
    id: 6,
    nombre: 'Manto Negro · TINTO',
    alt: 'Manto Negro · TINTO',
    imagen: '/assets/VINOS-02.png',
    path: '/vinos#coleccion-sta',
  },
  {
    id: 7,
    nombre: 'Callet · TINTO',
    alt: 'Callet · TINTO',
    imagen: '/assets/VINOS-01.png',
    path: '/vinos#coleccion-sta',
  },
  {
    id: 8,
    nombre: 'Prensal · BLANCO',
    alt: 'Prensal · BLANCO',
    imagen: '/assets/VINOS-03.png',
    path: '/vinos#coleccion-sta',
  },
  {
    id: 9,
    nombre: 'Giró Ros · BLANCO',
    alt: 'Giró Ros · BLANCO',
    imagen: '/assets/VINOS-04.png',
    path: '/vinos#coleccion-sta',
  },
  {
    id: 10,
    nombre: 'Surant Blanco · BLANCO',
    alt: 'Surant Blanco · BLANCO',
    imagen: '/assets/VINOS-06.png',
    path: '/vinos#coleccion-surant',
  },
  {
    id: 11,
    nombre: 'Surant Rosado · ROSADO',
    alt: 'Surant Rosado · ROSADO',
    imagen: '/assets/VINOS-05.png',
    path: '/vinos#coleccion-surant',
  },
  {
    id: 12,
    nombre: '‘Nguany Tinto · TINTO',
    alt: '‘Nguany Tinto · TINTO',
    imagen: '/assets/wine-nguany-tinto.png',
    path: '/vinos#coleccion-nguany',
  },
  {
    id: 13,
    nombre: '‘Nguany Blanco · BLANCO',
    alt: '‘Nguany Blanco · BLANCO',
    imagen: '/assets/wine-nguany-blanco.png',
    path: '/vinos#coleccion-nguany',
  },
  {
    id: 14,
    nombre: '‘Nguany Rosado · ROSADO',
    alt: '‘Nguany Rosado · ROSADO',
    imagen: '/assets/wine-nguany-rosado.png',
    path: '/vinos#coleccion-nguany',
  },
];

const CarruselVinos = () => {
  const [vinos, setVinos] = useState(DEFAULT_VINOS);
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Carga los vinos directamente desde la API del catálogo
  useEffect(() => {
    let isMounted = true;
    obtenerVinos()
      .then((data) => {
        if (!isMounted) return;
        if (Array.isArray(data) && data.length > 0) {
          const activos = data.filter((v) => v.activo !== false);
          const listaUsar = activos.length > 0 ? activos : data;

          const sortedVinos = [...listaUsar].sort((a, b) => {
            const colA = COLECCIONES_ORDER[a.coleccion] || 99;
            const colB = COLECCIONES_ORDER[b.coleccion] || 99;
            if (colA !== colB) return colA - colB;
            const ordenA = Number(a.orden ?? 0);
            const ordenB = Number(b.orden ?? 0);
            if (ordenA !== ordenB) return ordenA - ordenB;
            return (a.id || 0) - (b.id || 0);
          });

          const mapeados = sortedVinos.map((v) => {
            const tipoLabel = v.tipo ? ` · ${v.tipo.toUpperCase()}` : '';
            const nombre = v.titulo || v.variedad || 'Vino Santa Catarina';
            const fullLabel = `${nombre}${tipoLabel}`;

            return {
              id: v.id,
              nombre: fullLabel,
              alt: fullLabel,
              imagen: resolveWineImage(v),
              path: resolveCollectionPath(v.coleccion),
            };
          });

          setVinos(mapeados);
        }
      })
      .catch((err) => {
        console.warn('[CarruselVinos] Error cargando vinos de la API, usando catálogo real por defecto:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Actualiza los estados de las flechas según la posición de scroll
  const updateScrollButtons = () => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener('scroll', updateScrollButtons, { passive: true });
    window.addEventListener('resize', updateScrollButtons);
    return () => {
      el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, [vinos]);

  const handleScroll = (direction) => {
    if (!trackRef.current) return;
    const container = trackRef.current;
    const card = container.querySelector('[data-wine-card]');
    const scrollAmount = card ? card.offsetWidth + 20 : 300;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    const maxScroll = scrollWidth - clientWidth;

    // Ciclo infinito: al llegar al final vuelve al inicio y viceversa
    if (direction === 'next' && scrollLeft >= maxScroll - 10) {
      container.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }
    if (direction === 'prev' && scrollLeft <= 10) {
      container.scrollTo({ left: maxScroll, behavior: 'smooth' });
      return;
    }

    container.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <Section>
      <Container>
        <HeaderRow data-reveal="up">
          <SectionTitle>VINOS CON ALMA</SectionTitle>
          <ViewAllButton to="/vinos">VER TODOS</ViewAllButton>
        </HeaderRow>

        <CarouselLayout data-reveal="up" data-reveal-delay="90">
          <ArrowButton
            type="button"
            aria-label="Vinos anteriores"
            onClick={() => handleScroll('prev')}
          >
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
              <path
                d="M17 7H1M1 7L7 1M1 7L7 13"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </ArrowButton>

          <WineTrack ref={trackRef} className="wine-in">
            {vinos.map((vino) => (
              <WineCard
                key={vino.id}
                to={vino.path || '/vinos'}
                data-wine-card
                aria-label={`Ver ${vino.nombre}`}
              >
                <CardInner>
                  <WineImage
                    src={vino.imagen}
                    alt={vino.alt}
                    loading="lazy"
                    onError={(e) => {
                      const cleanTitle = (vino.alt || '').split(' · ')[0].replace(/[‘’']/g, "'").trim();
                      const fallback = DEFAULT_IMAGES[cleanTitle] || '/assets/VINOS-01.png';
                      if (!e.currentTarget.src.endsWith(fallback)) {
                        e.currentTarget.src = fallback;
                      }
                    }}
                  />
                </CardInner>
              </WineCard>
            ))}
          </WineTrack>

          <ArrowButton
            type="button"
            aria-label="Vinos siguientes"
            onClick={() => handleScroll('next')}
          >
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
              <path
                d="M1 7H17M17 7L11 1M17 7L11 13"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </ArrowButton>
        </CarouselLayout>
      </Container>
    </Section>
  );
};

export default CarruselVinos;
