import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import api from '../../services/api';

const DEFAULT_IMAGES = [
  {
    src: '/assets/tienda-fisica-01.jpg',
    alt: 'Mostrador y selección de vinos de la tienda física'
  },
  {
    src: '/assets/tienda-fisica-02.jpg',
    alt: 'Productos artesanales mallorquines'
  },
  {
    src: '/assets/tienda-fisica-03.jpg',
    alt: 'Expositor de productos locales y capazos'
  },
  {
    src: '/assets/tienda-fisica-04.jpg',
    alt: 'Selección de vinos'
  },
  {
    src: '/assets/tienda-fisica-05.jpg',
    alt: 'Capazo artesanal Santa Catarina'
  },
  {
    src: '/assets/tienda-fisica-06.jpg',
    alt: 'Productos gourmet'
  },
  {
    src: '/assets/tienda-fisica-07.jpg',
    alt: 'Interior de la tienda física'
  }
];

const GallerySection = styled.section`
  background-color: #F2ECE4;
  padding: 0 2rem clamp(3.5rem, 6vw, 6rem) 2rem;
  width: 100%;
  box-sizing: border-box;
`;

const GalleryContainer = styled.div`
  max-width: 1320px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  height: clamp(380px, 52vw, 720px);
  overflow: hidden;
  background-color: #2D1420;

  @media (max-width: 800px) {
    height: 440px;
  }
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: saturate(0.78) sepia(0.08) contrast(0.96);
  transition: opacity 0.35s ease-in-out;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: rgba(63, 32, 44, 0.65);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.22);
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
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
    left: 20px;
  }

  &.is-next {
    right: 20px;
  }

  @media (max-width: 600px) {
    width: 38px;
    height: 38px;
    font-size: 1.3rem;

    &.is-previous {
      left: 12px;
    }
    &.is-next {
      right: 12px;
    }
  }
`;

const Counter = styled.span`
  position: absolute;
  bottom: 24px;
  right: 24px;
  background: rgba(48, 24, 34, 0.78);
  backdrop-filter: blur(4px);
  padding: 6px 14px;
  border-radius: 3px;
  font-family: 'Manrope', 'Raleway', sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  color: #FFFFFF;
  z-index: 10;
  border: 1px solid rgba(255, 255, 255, 0.12);

  @media (max-width: 600px) {
    bottom: 16px;
    right: 16px;
    font-size: 0.65rem;
    padding: 4px 10px;
  }
`;

const ThumbnailsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 12px;
  width: 100%;

  @media (max-width: 800px) {
    grid-template-columns: repeat(4, 1fr);
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
    filter: saturate(0.78) sepia(0.08) contrast(0.96);
  }
`;

const TiendaGaleria = () => {
  const [images, setImages] = useState(DEFAULT_IMAGES);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    let activo = true;
    api.get('/tienda-galeria?soloActivas=true')
      .then((data) => {
        if (activo && Array.isArray(data) && data.length > 0) {
          setImages(
            data.map((item) => ({
              src: item.imagen,
              alt: item.alt || '',
            }))
          );
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

  // Keyboard navigation
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
    <GallerySection className="physical-store-gallery" aria-label="Galería de la tienda física">
      <GalleryContainer>
        {/* Carrusel Principal */}
        <CarouselWrapper className="physical-store-carousel">
          <MainImage
            src={currentImg.src}
            alt={currentImg.alt}
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

        {/* Miniaturas */}
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
                onClick={() => setActiveImage(index)}
              >
                <img src={img.src} alt="" />
              </ThumbnailButton>
            );
          })}
        </ThumbnailsContainer>
      </GalleryContainer>
    </GallerySection>
  );
};

export default TiendaGaleria;
