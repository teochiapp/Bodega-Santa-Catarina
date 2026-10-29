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

const WineryPointButton = styled.button`
  position: absolute;
  width: 160px;
  height: 140px;
  transform-origin: 80px 91px;
  transform: translate(-80px, -91px);
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  z-index: 18;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  transition: transform 0.25s ease, filter 0.25s ease;

  .mallorca-winery-number {
    font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
    font-size: 1.42rem;
    font-weight: 600;
    line-height: 1;
    color: #BA7D2C;
    margin-bottom: 1px;
    text-shadow: 0 0 6px rgba(245, 235, 217, 0.95);
    transition: color 0.25s ease, transform 0.25s ease;
  }

  .mallorca-winery-icon {
    width: 96px;
    height: 61px;
    overflow: visible;
    margin-bottom: 2px;
    filter: drop-shadow(0 2px 5px rgba(80, 43, 58, 0.12));
    transition: transform 0.25s ease, filter 0.25s ease;
  }

  .mallorca-winery-ground {
    fill: none;
    stroke: #9C7438;
    stroke-width: 1.8;
    stroke-linecap: round;
  }

  .mallorca-winery-vines {
    fill: none;
    stroke: #B68F4C;
    stroke-width: 1.35;
    stroke-linecap: round;
  }

  .mallorca-winery-building {
    fill: #FAF1E2;
    stroke: #8A5E2B;
    stroke-width: 1.75;
    stroke-linejoin: round;
    transition: fill 0.25s ease, stroke 0.25s ease;
  }

  .mallorca-winery-roof {
    fill: none;
    stroke: #581826;
    stroke-width: 2.4;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .mallorca-winery-door {
    fill: rgba(186, 125, 44, 0.28);
    stroke: #581826;
    stroke-width: 1.65;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .mallorca-winery-detail {
    fill: rgba(194, 164, 120, 0.34);
    stroke: #8A5E2B;
    stroke-width: 1.35;
    stroke-linejoin: round;
  }

  .mallorca-winery-tree {
    fill: rgba(182, 143, 76, 0.22);
    stroke: #7D5A2B;
    stroke-width: 1.5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .mallorca-winery-dot {
    position: relative;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background-color: ${({ $isActive }) => ($isActive ? 'rgb(80, 43, 58)' : '#BA6D18')};
    box-shadow: ${({ $isActive }) =>
      $isActive
        ? '0 0 0 5px rgba(194, 164, 120, 0.55), 0 0 14px rgba(194, 164, 120, 0.7)'
        : '0 0 0 4px rgba(194, 164, 120, 0.34), 0 0 10px rgba(186, 109, 24, 0.4)'};
    flex-shrink: 0;
    transition: all 0.25s ease;
  }

  .mallorca-winery-label {
    margin-top: 4px;
    font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
    font-size: 1.16rem;
    font-weight: 700;
    line-height: 1.05;
    color: #502B3A;
    white-space: nowrap;
    text-shadow:
      0 0 7px rgba(245, 235, 217, 0.98),
      0 1px 2px rgba(245, 235, 217, 0.95);
  }

  .mallorca-winery-location {
    margin-top: 2px;
    font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
    font-size: 0.56rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    line-height: 1.1;
    text-transform: uppercase;
    color: #8C5E2A;
    white-space: nowrap;
    text-shadow: 0 0 6px rgba(245, 235, 217, 0.98);
  }

  &:hover,
  &:focus-visible {
    outline: none;
    transform: translate(-80px, -91px) scale(1.05);

    .mallorca-winery-building {
      fill: #FFF9EF;
      stroke: #502B3A;
    }

    .mallorca-winery-dot {
      transform: scale(1.18);
      background-color: rgb(80, 43, 58);
      box-shadow: 0 0 0 5px rgba(194, 164, 120, 0.55), 0 0 14px rgba(194, 164, 120, 0.75);
    }
  }

  @media (max-width: 1360px) {
    transform: translate(-80px, -91px) scale(0.84);
    &:hover,
    &:focus-visible {
      transform: translate(-80px, -91px) scale(0.88);
    }
  }

  @media (max-width: 1024px) {
    transform: translate(-80px, -91px) scale(0.74);
    &:hover,
    &:focus-visible {
      transform: translate(-80px, -91px) scale(0.78);
    }
  }

  @media (max-width: 600px) {
    transform: translate(-80px, -91px) scale(0.56);
    &:hover,
    &:focus-visible {
      transform: translate(-80px, -91px) scale(0.6);
    }
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

  @media (max-width: 960px) {
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

  &.is-winery.popup-bottom {
    transform: translate(-50%, 38px);
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

  @media (max-width: 960px) {
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

const WINERY_LOCATION = {
  id: 7,
  numero: 7,
  isWinery: true,
  isPalma: false,
  location: 'SENCELLES',
  label: 'Santa Catarina',
  subLabel: 'SENCELLES',
  name: 'Bodega Santa Catarina',
  address: 'Carretera Inca – Sencelles, Km 3 · 07140 Sencelles (Mallorca) · España',
  tel: null,
  url: 'https://maps.google.com/?q=Carretera+Inca+Sencelles+Km3+07140+Sencelles+Mallorca',
  linkText: 'CÓMO LLEGAR →',
  coords: { left: '73.4%', top: '47.5%' },
  popupPlacement: 'bottom',
};

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
  WINERY_LOCATION,
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
          <MapCopy className="mallorca-map-copy" data-reveal="up">
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
            data-reveal="media"
            data-reveal-delay="110"
            role="img"
            aria-label="Mapa ilustrado de Mallorca con seis distribuidores y la Bodega Santa Catarina"
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

                if (punto.isWinery) {
                  return (
                    <WineryPointButton
                      key={punto.id}
                      type="button"
                      className={`mallorca-winery-point ${isActive ? 'is-active' : ''}`}
                      aria-label="Mostrar Bodega Santa Catarina en Sencelles"
                      style={{ left: punto.coords.left, top: punto.coords.top }}
                      $isActive={isActive}
                      onMouseEnter={() => handleMouseEnter(punto.id)}
                      onMouseLeave={handleMouseLeave}
                      onFocus={() => handleMouseEnter(punto.id)}
                      onBlur={handleMouseLeave}
                      onClick={() => handlePointSelect(punto.id)}
                    >
                      <span className="mallorca-winery-number">{punto.numero}</span>
                      <svg
                        className="mallorca-winery-icon"
                        viewBox="0 0 120 76"
                        aria-hidden="true"
                      >
                        <path className="mallorca-winery-ground" d="M8 67H112" />
                        <path
                          className="mallorca-winery-vines"
                          d="M8 72 38 63M23 74l24-11M112 72 82 63M97 74 73 63"
                        />
                        <path
                          className="mallorca-winery-building"
                          d="M35 31 60 15 85 31v34H35Z"
                        />
                        <path
                          className="mallorca-winery-building"
                          d="M18 42 35 31v34H18ZM85 31l17 11v23H85Z"
                        />
                        <path
                          className="mallorca-winery-roof"
                          d="m31 32 29-19 29 19M15 43l20-14M85 29l20 14"
                        />
                        <path
                          className="mallorca-winery-door"
                          d="M54 65V48c0-5 12-5 12 0v17"
                        />
                        <path
                          className="mallorca-winery-detail"
                          d="M44 41h6v7h-6zM70 41h6v7h-6zM57 28h6v7h-6zM24 49h6v7h-6zM90 49h6v7h-6z"
                        />
                        <path
                          className="mallorca-winery-tree"
                          d="M13 62V28M13 28c-7 10-7 21 0 28 7-7 7-18 0-28ZM107 62V34M107 34c-6 8-6 17 0 23 6-6 6-15 0-23Z"
                        />
                      </svg>
                      <span className="mallorca-winery-dot" />
                      <span className="mallorca-winery-label">{punto.label}</span>
                      <span className="mallorca-winery-location">{punto.subLabel}</span>
                    </WineryPointButton>
                  );
                }

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
                    onFocus={() => handleMouseEnter(punto.id)}
                    onBlur={handleMouseLeave}
                    onClick={() => handlePointSelect(punto.id)}
                  >
                    <span className="halo" />
                  </HotspotButton>
                );
              })}

              {/* Popup flotante en el mapa (Desktop al hacer hover/click/focus) */}
              <AnimatePresence mode="wait">
                {activePunto && (
                  <PopupCard
                    key={activePunto.id}
                    className={`mallorca-map-popup ${activePunto.isWinery ? 'is-winery' : ''} popup-${activePunto.popupPlacement} is-active`}
                    style={{
                      left: activePunto.coords.left,
                      top: activePunto.coords.top,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
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
                    {activePunto.tel && <PopupText>{activePunto.tel}</PopupText>}
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
                    {punto.tel && <PopupText>{punto.tel}</PopupText>}
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
                  aria-label={`Ver ${punto.isWinery ? 'Bodega' : 'distribuidor de'} ${punto.label}`}
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
