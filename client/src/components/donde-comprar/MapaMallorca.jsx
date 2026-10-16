import { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Section = styled.section`
  width: 100%;
  background-color: #FDF6EB;
  padding: clamp(2.5rem, 4vw, 4.5rem) 0;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
`;

const SectionLayout = styled.div`
  width: 100%;
  max-width: 1800px;
  margin: 0 auto;
  position: relative;
  box-sizing: border-box;

  @media (min-width: 1025px) and (max-width: 1800px) {
    max-width: 100%;
    width: 100%;
  }
`;

const MapWrap = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1600 / 900;
  max-width: 1800px;
  margin: 0 auto;
  overflow: visible;

  @media (min-width: 1025px) and (max-width: 1800px) {
    max-width: 100%;
    width: 100%;
  }

  @media (max-width: 1024px) {
    aspect-ratio: auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const MapStage = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;

  @media (max-width: 1024px) {
    position: relative;
    inset: auto;
    width: 100%;
    aspect-ratio: 1 / 0.95;
    overflow: hidden;
    max-width: 580px;
    margin: 0 auto;
  }
`;

const MapCanvas = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;

  @media (max-width: 1024px) {
    width: 175%;
    aspect-ratio: 1600 / 900;
    height: auto;
    left: -71%;
    top: -7.5%;
  }
`;

const MapImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  pointer-events: none;
  user-select: none;
`;

const MapCopy = styled.div`
  position: absolute;
  left: 4.8%;
  top: 24%;
  width: min(400px, 36%);
  z-index: 10;
  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    position: relative;
    left: auto;
    top: auto;
    width: 100%;
    max-width: 680px;
    padding: 0 0.5rem;
    box-sizing: border-box;
  }
`;

const Eyebrow = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.72rem;
  letter-spacing: 0.24em;
  font-weight: 700;
  text-transform: uppercase;
  color: rgb(194, 164, 120);
  margin: 0 0 12px 0;
`;

const Line = styled.span`
  display: block;
  width: 42px;
  height: 1.5px;
  background-color: rgb(194, 164, 120);
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: clamp(2.3rem, 3.6vw, 3.5rem);
  font-weight: 500;
  color: rgb(80, 43, 58);
  line-height: 1.1;
  margin: 0 0 20px 0;
  max-width: 440px;
`;

const Description = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.9rem;
  line-height: 1.7;
  color: rgba(80, 43, 58, 0.78);
  margin: 0;
  max-width: 390px;
`;

const HotspotButton = styled.button`
  position: absolute;
  width: 48px;
  height: 48px;
  transform: translate(-50%, -50%);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 15;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 600px) {
    width: 38px;
    height: 38px;
  }

  @keyframes mallorcaPulseGlow {
    0% {
      transform: scale(0.95);
      opacity: 0.85;
      box-shadow: 0 0 0 0 rgba(194, 164, 120, 0.6);
    }
    60% {
      transform: scale(1.22);
      opacity: 0.35;
      box-shadow: 0 0 0 8px rgba(194, 164, 120, 0);
    }
    100% {
      transform: scale(0.95);
      opacity: 0.85;
      box-shadow: 0 0 0 0 rgba(194, 164, 120, 0);
    }
  }

  .halo {
    position: absolute;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(194, 164, 120, 0.45) 0%, rgba(194, 164, 120, 0.08) 65%, transparent 100%);
    border: 1.5px solid ${({ $isActive }) => ($isActive ? 'rgb(194, 164, 120)' : 'rgba(194, 164, 120, 0.45)')};
    transition: all 0.25s ease;

    @media (max-width: 600px) {
      width: 20px;
      height: 20px;
    }

    ${({ $isPalma, $isActive }) =>
    ($isPalma || $isActive) &&
    `
      animation: mallorcaPulseGlow 2.6s infinite ease-in-out;
      border-color: rgb(194, 164, 120);
      background: radial-gradient(circle, rgba(194, 164, 120, 0.55) 0%, rgba(194, 164, 120, 0.12) 65%, transparent 100%);
    `}
  }

  &:hover .halo {
    transform: scale(1.25);
    border-color: rgb(80, 43, 58);
    background: radial-gradient(circle, rgba(194, 164, 120, 0.65) 0%, rgba(194, 164, 120, 0.18) 70%, transparent 100%);
    box-shadow: 0 0 12px rgba(194, 164, 120, 0.6);
  }
`;

const PopupCard = styled(motion.article)`
  position: absolute;
  z-index: 25;
  width: clamp(240px, 20vw, 285px);
  background: #FFFFFF;
  border: 1px solid rgba(194, 164, 120, 0.45);
  border-radius: 6px;
  padding: 16px 18px;
  box-shadow: 0 16px 36px rgba(80, 43, 58, 0.14), 0 3px 8px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (max-width: 768px) {
    display: none;
  }

  &.popup-right {
    transform: translate(24px, -50%);
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: -6px;
      transform: translateY(-50%) rotate(45deg);
      width: 11px;
      height: 11px;
      background: #FFFFFF;
      border-left: 1px solid rgba(194, 164, 120, 0.45);
      border-bottom: 1px solid rgba(194, 164, 120, 0.45);
    }
  }

  &.popup-left {
    transform: translate(calc(-100% - 24px), -50%);
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      right: -6px;
      transform: translateY(-50%) rotate(45deg);
      width: 11px;
      height: 11px;
      background: #FFFFFF;
      border-right: 1px solid rgba(194, 164, 120, 0.45);
      border-top: 1px solid rgba(194, 164, 120, 0.45);
    }
  }

  &.popup-bottom {
    transform: translate(-50%, 22px);
    &::before {
      content: '';
      position: absolute;
      top: -6px;
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
      width: 11px;
      height: 11px;
      background: #FFFFFF;
      border-left: 1px solid rgba(194, 164, 120, 0.45);
      border-top: 1px solid rgba(194, 164, 120, 0.45);
    }
  }
`;

const PopupHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2px;
`;

const PopupLocation = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  font-weight: 700;
  color: rgb(194, 164, 120);
  text-transform: uppercase;
  margin: 0;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 0.82rem;
  line-height: 1;
  color: rgba(80, 43, 58, 0.45);
  cursor: pointer;
  padding: 3px 5px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    color: rgb(80, 43, 58);
    background: rgba(194, 164, 120, 0.16);
  }
`;

const PopupTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: 1.22rem;
  font-weight: 600;
  color: rgb(80, 43, 58);
  margin: 4px 0 5px 0;
  line-height: 1.2;
`;

const PopupText = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.77rem;
  line-height: 1.5;
  color: rgb(80, 43, 58);
  opacity: 0.85;
  margin: 0;
`;

const PopupLink = styled.a`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: rgb(80, 43, 58);
  text-decoration: none;
  text-transform: uppercase;
  margin-top: 8px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  transition: color 0.2s ease, transform 0.15s ease;

  &:hover {
    color: rgb(194, 164, 120);
    transform: translateX(3px);
  }
`;

/* ── Mobile Carousel Styles (Scroll-Snap Sincronizado) ── */
const MobileCarouselSection = styled.div`
  display: none;
  margin-top: 1.5rem;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
`;

const MobileCarouselTrack = styled.div`
  display: flex;
  gap: 14px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding: 6px 1rem 14px 1rem;
  margin: 0 -1rem;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MobileCarouselCard = styled.article`
  scroll-snap-align: center;
  flex: 0 0 clamp(260px, 82vw, 310px);
  background: #FFFFFF;
  border: 1.5px solid ${({ $isActive }) => ($isActive ? 'rgb(194, 164, 120)' : 'rgba(194, 164, 120, 0.35)')};
  border-radius: 8px;
  padding: 18px 20px;
  box-shadow: 0 8px 22px rgba(80, 43, 58, 0.1);
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;

  ${({ $isActive }) =>
    $isActive &&
    `
    border-color: rgb(194, 164, 120);
    box-shadow: 0 10px 28px rgba(80, 43, 58, 0.16);
  `}
`;

const MobileCarouselDots = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
  margin-top: 2px;
`;

const CarouselDot = styled.button`
  width: ${({ $isActive }) => ($isActive ? '22px' : '6px')};
  height: 6px;
  border-radius: 100px;
  background: ${({ $isActive }) => ($isActive ? 'rgb(80, 43, 58)' : 'rgba(80, 43, 58, 0.22)')};
  border: none;
  cursor: pointer;
  padding: 0;
  transition: all 0.25s ease;
`;

const PUNTOS_MALLORCA = [
  {
    id: 1,
    numero: 1,
    isPalma: true,
    location: 'PALMA',
    label: 'Palma',
    name: 'Catavinos',
    address: 'Polígono Can Valero, Carrer Poima, 6, 07011 Palma',
    tel: '971 76 05 85',
    url: 'https://www.google.com/maps/search/?api=1&query=Pol%C3%ADgono%20Can%20Valero%2C%20Carrer%20Poima%2C%206%2C%2007011%20Palma',
    linkText: 'CÓMO LLEGAR →',
    coords: { left: '56.9%', top: '55.6%' },
    popupPlacement: 'right',
  },
  {
    id: 2,
    numero: 2,
    isPalma: false,
    location: 'LLOSETA',
    label: 'Lloseta',
    name: 'Vinàmica',
    address: 'Carretera Ma-2111, km 1,5, 07360 Lloseta',
    tel: '871 91 16 35',
    url: 'http://www.vinamica.es',
    linkText: 'VISITAR WEB →',
    coords: { left: '66.3%', top: '34.1%' },
    popupPlacement: 'right',
  },
  {
    id: 3,
    numero: 3,
    isPalma: false,
    location: 'MARRATXÍ',
    label: 'Marratxí',
    name: 'SUES · Suministros Escala',
    address: 'Camí de Muntanya, 12, 07141 Es Figueral',
    tel: '971 60 42 44',
    url: 'http://www.sues.es',
    linkText: 'VISITAR WEB →',
    coords: { left: '61.1%', top: '44.1%' },
    popupPlacement: 'left',
  },
  {
    id: 4,
    numero: 4,
    isPalma: false,
    location: 'FELANITX',
    label: 'Felanitx',
    name: '5 Caixes y Mitja',
    address: "Carrer d'es Convent, 41, 07200 Felanitx",
    tel: '664 68 69 70',
    url: 'https://www.5caixesimitja.com',
    linkText: 'VISITAR WEB →',
    coords: { left: '80.1%', top: '64.7%' },
    popupPlacement: 'left',
  },
  {
    id: 5,
    numero: 5,
    isPalma: false,
    location: 'ARTÀ',
    label: 'Artà',
    name: 'Licors Moyà',
    address: 'Carrer na Llargueta, 07570 Artà',
    tel: '971 83 60 38',
    url: 'https://moya.es/es/',
    linkText: 'VISITAR WEB →',
    coords: { left: '89.6%', top: '42.2%' },
    popupPlacement: 'left',
  },
  {
    id: 6,
    numero: 6,
    isPalma: false,
    location: 'SA CABANETA (MARRATXÍ)',
    label: 'Sa Cabaneta',
    name: 'Can Xisco',
    address: 'Carrer Licorers, 12, 07141 Sa Cabaneta',
    tel: '971 60 44 88',
    url: 'https://www.canxiscoordinas.com',
    linkText: 'VISITAR WEB →',
    coords: { left: '66.1%', top: '55.7%' },
    popupPlacement: 'bottom',
  },
];

const MapaMallorca = () => {
  const [activeId, setActiveId] = useState(null);
  const closeTimerRef = useRef(null);
  const carouselTrackRef = useRef(null);
  const cardRefs = useRef({});
  const isScrollingRef = useRef(false);

  const activePunto = PUNTOS_MALLORCA.find((p) => p.id === activeId) || null;

  const handleMouseEnter = (id) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setActiveId(id);
  };

  const handleMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setActiveId(null);
    }, 280);
  };

  const handleCardMouseEnter = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  };

  const handlePointSelect = (id) => {
    setActiveId((prev) => (prev === id ? null : id));

    // Si es móvil, centrar la tarjeta correspondiente en el carrusel
    const cardEl = cardRefs.current[id];
    if (cardEl && carouselTrackRef.current) {
      isScrollingRef.current = true;
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 500);
    }
  };

  // Detección de tarjeta activa en el carrusel móvil al deslizar con el dedo
  const handleCarouselScroll = () => {
    if (isScrollingRef.current || !carouselTrackRef.current) return;
    const track = carouselTrackRef.current;
    const trackRect = track.getBoundingClientRect();
    const trackCenter = trackRect.left + trackRect.width / 2;

    let closestId = null;
    let minDistance = Infinity;

    PUNTOS_MALLORCA.forEach((punto) => {
      const cardEl = cardRefs.current[punto.id];
      if (cardEl) {
        const cardRect = cardEl.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(trackCenter - cardCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestId = punto.id;
        }
      }
    });

    if (closestId && minDistance < 120 && closestId !== activeId) {
      setActiveId(closestId);
    }
  };

  return (
    <Section className="mallorca-distributors-section">
      <SectionLayout className="mallorca-section-layout">
        <MapWrap className="mallorca-map-wrap">
          {/* ── COLUMNA TEXTO ── */}
          <MapCopy className="mallorca-map-copy">
            <Eyebrow>MAPA DE DISTRIBUCIÓN</Eyebrow>
            <Line aria-hidden="true" />
            <Title>Encuentra nuestros vinos cerca de ti</Title>
            <Description>
              Descubre los distribuidores de Bodega Santa Catarina en diferentes puntos de Mallorca.
            </Description>
          </MapCopy>

          {/* ── ESCENARIO ILUSTRADO CON PUNTOS ── */}
          <MapStage
            className="mallorca-illustrated-map"
            role="img"
            aria-label="Mapa ilustrado de Mallorca con seis distribuidores"
          >
            <MapCanvas className="mallorca-map-canvas">
              <MapImage
                className="mallorca-map-example"
                src="/common/mapa-mallorca.webp"
                alt="Mapa ilustrado de distribuidores en Mallorca Bodega Santa Catarina"
                loading="lazy"
              />

              {/* Puntos interactivos sobre el mapa */}
              {PUNTOS_MALLORCA.map((punto) => {
                const isActive = activeId === punto.id;
                return (
                  <HotspotButton
                    key={punto.id}
                    type="button"
                    className={`mallorca-local-point ${punto.isPalma ? 'is-palma' : ''} ${isActive ? 'is-active' : ''}`}
                    style={{ left: punto.coords.left, top: punto.coords.top }}
                    $isActive={isActive}
                    $isPalma={punto.isPalma}
                    aria-label={`${punto.numero}. ${punto.label}`}
                    onMouseEnter={() => handleMouseEnter(punto.id)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handlePointSelect(punto.id)}
                  >
                    <span className="halo" />
                  </HotspotButton>
                );
              })}

              {/* Popup flotante en el mapa (Desktop al hacer hover) */}
              <AnimatePresence mode="wait">
                {activePunto && (
                  <PopupCard
                    key={activePunto.id}
                    className={`mallorca-map-popup popup-${activePunto.popupPlacement}`}
                    style={{
                      left: activePunto.coords.left,
                      top: activePunto.coords.top,
                    }}
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    onMouseEnter={handleCardMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <PopupHeader>
                      <PopupLocation className="mallorca-popup-location">
                        {activePunto.location}
                      </PopupLocation>
                      <CloseButton
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveId(null);
                        }}
                        aria-label="Cerrar ficha"
                      >
                        ✕
                      </CloseButton>
                    </PopupHeader>
                    <PopupTitle>{activePunto.name}</PopupTitle>
                    <PopupText>{activePunto.address}</PopupText>
                    <PopupText>{activePunto.tel}</PopupText>
                    <PopupLink
                      href={activePunto.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {activePunto.linkText}
                    </PopupLink>
                  </PopupCard>
                )}
              </AnimatePresence>
            </MapCanvas>
          </MapStage>

          {/* Carrusel móvil sincronizado (Scroll-Snap horizontal) */}
          <MobileCarouselSection className="mallorca-mobile-carousel">
            <MobileCarouselTrack
              ref={carouselTrackRef}
              onScroll={handleCarouselScroll}
            >
              {PUNTOS_MALLORCA.map((punto) => {
                const isActive = (activeId || 1) === punto.id;
                return (
                  <MobileCarouselCard
                    key={punto.id}
                    ref={(el) => {
                      cardRefs.current[punto.id] = el;
                    }}
                    $isActive={isActive}
                    onClick={() => handlePointSelect(punto.id)}
                  >
                    <PopupLocation>{punto.location}</PopupLocation>
                    <PopupTitle>{punto.name}</PopupTitle>
                    <PopupText>{punto.address}</PopupText>
                    <PopupText>{punto.tel}</PopupText>
                    <PopupLink
                      href={punto.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {punto.linkText}
                    </PopupLink>
                  </MobileCarouselCard>
                );
              })}
            </MobileCarouselTrack>

            <MobileCarouselDots>
              {PUNTOS_MALLORCA.map((punto) => (
                <CarouselDot
                  key={punto.id}
                  type="button"
                  $isActive={(activeId || 1) === punto.id}
                  aria-label={`Ver distribuidor de ${punto.label}`}
                  onClick={() => handlePointSelect(punto.id)}
                />
              ))}
            </MobileCarouselDots>
          </MobileCarouselSection>
        </MapWrap>
      </SectionLayout>
    </Section>
  );
};

export default MapaMallorca;
