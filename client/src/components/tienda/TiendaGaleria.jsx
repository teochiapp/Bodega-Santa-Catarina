import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import api, { getResolvedImageUrl } from '../../services/api';

const DEFAULT_IMAGES = [
  {
    src: '/assets/tienda-fisica-01-BmXEtn30.webp',
    alt: 'Mostrador y selección de vinos de la tienda física',
    layer: 'Foto 1'
  },
  {
    src: '/assets/tienda-fisica-04-DO3IKreW.webp',
    alt: 'Selección de vinos, cestas y copas en la tienda física de Son Aloy',
    layer: 'Foto 2'
  },
  {
    src: '/assets/tienda-fisica-05-x6fJTkXG.webp',
    alt: 'Capazo artesanal Santa Catarina',
    layer: 'Foto 3'
  }
];

const Section = styled.section`
  background-color: #F2ECE4;
  padding: clamp(3.5rem, 6vw, 6rem) 2rem;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 3rem 1.25rem;
  }
`;

const LayoutContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: clamp(2.5rem, 5vw, 5rem);
  align-items: center;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

/* ─── Columna Izquierda: Galería y Carrusel ─── */
const GalleryColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 11;
  overflow: hidden;
  background-color: #2D1420;
  border-radius: 4px;

  @media (max-width: 600px) {
    aspect-ratio: 4 / 3;
  }
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: opacity 0.35s ease-in-out;
  display: block;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(63, 32, 44, 0.7);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
  z-index: 10;
  user-select: none;
  line-height: 1;
  padding-bottom: 2px;

  &:hover {
    background: rgba(80, 43, 58, 0.95);
    border-color: #CBA052;
    transform: translateY(-50%) scale(1.06);
  }

  &.is-previous {
    left: 14px;
  }

  &.is-next {
    right: 14px;
  }

  @media (max-width: 600px) {
    width: 36px;
    height: 36px;
    font-size: 1.25rem;

    &.is-previous {
      left: 10px;
    }
    &.is-next {
      right: 10px;
    }
  }
`;

const Counter = styled.span`
  position: absolute;
  bottom: 16px;
  right: 16px;
  background: rgba(48, 24, 34, 0.8);
  backdrop-filter: blur(4px);
  padding: 5px 12px;
  border-radius: 2px;
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  color: #FFFFFF;
  z-index: 10;
  border: 1px solid rgba(255, 255, 255, 0.12);

  @media (max-width: 600px) {
    bottom: 12px;
    right: 12px;
    font-size: 0.65rem;
    padding: 4px 10px;
  }
`;

const ThumbnailsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  width: 100%;

  @media (max-width: 600px) {
    gap: 8px;
  }
`;

const ThumbnailButton = styled.button`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  padding: 0;
  border: 2px solid ${({ $isActive }) => ($isActive ? '#CBA052' : 'transparent')};
  background: none;
  cursor: pointer;
  overflow: hidden;
  border-radius: 2px;
  opacity: ${({ $isActive }) => ($isActive ? '1' : '0.55')};
  transition: opacity 0.25s ease, border-color 0.25s ease, transform 0.2s ease;

  &:hover {
    opacity: 0.92;
    transform: translateY(-2px);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

/* ─── Columna Derecha: Copia informativa ─── */
const CopyColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const Eyebrow = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.65rem;
  letter-spacing: 0.24em;
  font-weight: 700;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
  margin: 0 0 16px 0;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: clamp(2.3rem, 3.8vw, 3.6rem);
  font-weight: 400;
  line-height: 1.1;
  color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
  margin: 0 0 1.5rem 0;
  max-width: 480px;
`;

const Description = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.88rem;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
  opacity: 0.9;
  margin: 0 0 2.25rem 0;
  max-width: 540px;
`;

const DefinitionList = styled.dl`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  max-width: 540px;
`;

const DefinitionRow = styled.div`
  border-top: 1px solid rgba(194, 164, 120, 0.45);
  padding: 1.15rem 0;
  display: flex;
  align-items: baseline;
  gap: 2.5rem;

  &:last-child {
    border-bottom: 1px solid rgba(194, 164, 120, 0.45);
  }

  @media (max-width: 580px) {
    flex-direction: column;
    gap: 0.35rem;
    padding: 1rem 0;
  }
`;

const DefinitionTerm = styled.dt`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  color: ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
  text-transform: uppercase;
  width: 120px;
  flex-shrink: 0;
  margin: 0;
`;

const DefinitionDesc = styled.dd`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.84rem;
  color: ${({ theme }) => theme.colors?.primary || '#502B3A'};
  line-height: 1.6;
  margin: 0;
`;

const TiendaGaleria = () => {
  const [images, setImages] = useState(DEFAULT_IMAGES);
  const [activeImage, setActiveImage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let activo = true;
    api.get('/tienda-galeria?soloActivas=true')
      .then((data) => {
        if (activo && Array.isArray(data) && data.length > 0) {
          const list = data.slice(0, 3).map((item, index) => ({
            src: getResolvedImageUrl(item.imagen),
            alt: item.alt || '',
            layer: `Foto ${index + 1}`
          }));
          setImages(list.length === 3 ? list : DEFAULT_IMAGES);
        }
      })
      .catch(() => {});
    return () => {
      activo = false;
    };
  }, []);

  const total = images.length;

  const handlePrev = useCallback(() => {
    setActiveImage((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback(() => {
    setActiveImage((prev) => (prev + 1) % total);
  }, [total]);

  // Rotación automática (cada 5 segundos, pausándose al pasar el ratón)
  useEffect(() => {
    if (isPaused || total <= 1) return;
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, total]);

  // Navegación por teclado (flechas)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  const currentImg = images[activeImage] || images[0] || DEFAULT_IMAGES[0];

  return (
    <Section className="physical-store-layout">
      <LayoutContainer>
        {/* Columna Izquierda: Carrusel y Miniaturas */}
        <GalleryColumn
          className="physical-store-gallery"
          aria-label="Galería de la tienda física"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <CarouselWrapper className="physical-store-carousel">
            <MainImage
              src={currentImg.src}
              alt={currentImg.alt}
              data-layer={currentImg.layer || `Foto ${activeImage + 1}`}
              key={currentImg.src}
            />

            <NavButton
              type="button"
              className="is-previous"
              aria-label="Ver imagen anterior"
              onClick={handlePrev}
            >
              ‹
            </NavButton>

            <NavButton
              type="button"
              className="is-next"
              aria-label="Ver imagen siguiente"
              onClick={handleNext}
            >
              ›
            </NavButton>

            <Counter className="physical-store-counter">
              {String(activeImage + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </Counter>
          </CarouselWrapper>

          <ThumbnailsContainer className="physical-store-thumbnails">
            {images.map((img, index) => {
              const isActive = index === activeImage;
              return (
                <ThumbnailButton
                  key={`${img.src}-${index}`}
                  type="button"
                  $isActive={isActive}
                  className={isActive ? 'is-active' : ''}
                  aria-label={`Mostrar imagen ${index + 1}`}
                  aria-current={isActive ? 'true' : undefined}
                  data-layer={`Miniatura ${index + 1}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img
                    alt=""
                    data-layer={img.layer || `Foto ${index + 1}`}
                    src={img.src}
                  />
                </ThumbnailButton>
              );
            })}
          </ThumbnailsContainer>
        </GalleryColumn>

        {/* Columna Derecha: Texto descriptivo y datos de ubicación/visita */}
        <CopyColumn className="physical-store-copy">
          <Eyebrow className="physical-store-eyebrow">BODEGA SANTA CATARINA</Eyebrow>
          <h2>Un rincón de Mallorca para llevarte a casa</h2>
          <p>
            Visita nuestra tienda en la finca Son Aloy y descubre los vinos de Santa Catarina, nuestras cestas y las copas con el logo de la bodega.
          </p>
          <dl>
            <DefinitionRow>
              <DefinitionTerm>Ubicación</DefinitionTerm>
              <DefinitionDesc>Finca Son Aloy, carretera Inca–Sencelles, Km 3</DefinitionDesc>
            </DefinitionRow>
            <DefinitionRow>
              <DefinitionTerm>Visita</DefinitionTerm>
              <DefinitionDesc>Consulta disponibilidad y horarios antes de venir</DefinitionDesc>
            </DefinitionRow>
          </dl>
        </CopyColumn>
      </LayoutContainer>
    </Section>
  );
};

export default TiendaGaleria;
