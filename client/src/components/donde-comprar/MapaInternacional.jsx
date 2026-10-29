import { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useHeroes } from '../../context/HeroesContext';

const VIEWBOX_DESKTOP = '0 0 760 430';
// Móvil: encuadre dedicado exclusivamente a Europa sobre mapamundi-mobile-europa.png (1024x1536).
const VIEWBOX_MOBILE_EUROPE = '12 232 996 1096';

const MALLORCA_DESKTOP = { cx: 266, cy: 219.3, labelY: 244 };
const MALLORCA_MOBILE = { cx: 288, cy: 1178, labelY: 1236 };

const Section = styled.section`
  width: 100%;
  background-color: #502B3A;
  padding: clamp(3.5rem, 5vw, 6rem) clamp(1rem, 3.5vw, 3.5rem);
  box-sizing: border-box;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 2.35rem 1.15rem 3.25rem 1.15rem;
  }
`;

const Layout = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: clamp(2rem, 3.5vw, 4rem);
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 1.75rem;
  }

  @media (max-width: 768px) {
    gap: 1.35rem;
  }
`;

const HeroCopy = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 2;

  @media (max-width: 1024px) {
    max-width: 680px;
  }
`;

const Eyebrow = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.68rem;
  letter-spacing: 0.22em;
  font-weight: 700;
  text-transform: uppercase;
  color: rgb(194, 164, 120);
  margin: 0 0 10px 0;
`;

const Underline = styled.div`
  width: 32px;
  height: 1px;
  background-color: rgb(194, 164, 120);
  margin-bottom: 22px;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: clamp(2.3rem, 4vw, 3.6rem);
  font-weight: 500;
  color: #F2ECE4;
  line-height: 1.05;
  margin: 0 0 18px 0;

  @media (max-width: 768px) {
    font-size: clamp(2rem, 6.5vw, 2.5rem);
    margin-bottom: 12px;
  }
`;

const Description = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.88rem;
  line-height: 1.75;
  color: rgba(242, 236, 228, 0.75);
  margin: 0;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    line-height: 1.6;
  }
`;

const MapShell = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

/* ── Mobile Selector Pills Bar (Europa) ── */
const MobilePillsBar = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 7px;
    padding: 0 2px 10px 2px;
    margin-bottom: 4px;
  }
`;

const MobilePill = styled.button`
  flex: 0 0 auto;
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  padding: 7px 13px;
  min-height: 32px;
  border-radius: 100px;
  border: 1px solid ${({ $isActive }) => ($isActive ? 'rgb(194, 164, 120)' : 'rgba(194, 164, 120, 0.34)')};
  background: ${({ $isActive }) => ($isActive ? 'rgb(194, 164, 120)' : 'rgba(255, 255, 255, 0.05)')};
  color: ${({ $isActive }) => ($isActive ? '#502B3A' : 'rgba(242, 236, 228, 0.9)')};
  box-shadow: ${({ $isActive }) => ($isActive ? '0 4px 14px rgba(0, 0, 0, 0.22)' : 'none')};
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: all 0.2s ease;

  &:active {
    transform: scale(0.96);
  }
`;

const MapStage = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: ${({ $mobile }) => ($mobile ? '996 / 1096' : '760 / 430')};
  max-width: 860px;
  margin: 0 auto;
  overflow: visible;

  @media (max-width: 768px) {
    aspect-ratio: 996 / 1096;
    max-width: 430px;
    overflow: hidden;
    border-radius: 12px;
    background: radial-gradient(
      circle at 42% 72%,
      rgba(194, 164, 120, 0.11) 0%,
      rgba(80, 43, 58, 0) 68%
    );
  }
`;

const SvgRoutes = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 8px;
  -webkit-text-size-adjust: none;
  text-size-adjust: none;

  .world-route {
    fill: none;
    stroke: rgba(194, 164, 120, 0.45);
    stroke-width: 1.3;
    transition: all 0.3s ease;

    &.is-dashed {
      stroke-dasharray: 4, 3;
    }

    &.is-active {
      stroke: rgb(242, 236, 228);
      stroke-width: 2.2;
      filter: drop-shadow(0 0 5px rgba(242, 236, 228, 0.6));
    }
  }

  .world-label-guide {
    stroke: rgba(194, 164, 120, 0.65);
    stroke-width: 0.9;
    fill: none;
    transition: stroke 0.25s ease;
  }

  .world-destination-point {
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;

    .world-point-halo {
      fill: transparent;
      transition: all 0.25s ease;
    }

    .world-point-dot {
      fill: rgb(194, 164, 120);
      transition: all 0.25s ease;
    }

    text {
      font-family: 'Manrope', 'Raleway', sans-serif;
      font-size: 8.5px;
      font-weight: 700;
      letter-spacing: 0.14em;
      fill: #F2ECE4;
      text-transform: uppercase;
      transition: all 0.25s ease;
      user-select: none;
      -webkit-text-size-adjust: none;
      text-size-adjust: none;
    }

    &:hover,
    &.is-active {
      .world-point-halo {
        fill: rgba(194, 164, 120, 0.35);
      }
      .world-point-dot {
        fill: #FFFFFF;
        stroke: rgb(194, 164, 120);
        stroke-width: 2;
      }
      .world-label-guide {
        stroke: rgb(242, 236, 228);
        stroke-width: 1.2;
      }
      text {
        fill: rgb(242, 236, 228);
        filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.6));
      }
    }
  }

  @keyframes worldPulseHalo {
    0% {
      transform: scale(0.85);
      opacity: 0.35;
    }
    50% {
      transform: scale(1.35);
      opacity: 0.85;
    }
    100% {
      transform: scale(0.85);
      opacity: 0.35;
    }
  }

  .world-mallorca-halo {
    fill: rgba(194, 164, 120, 0.25);
    stroke: rgba(194, 164, 120, 0.4);
    stroke-width: 0.8;
    transform-box: fill-box;
    transform-origin: center;
    animation: worldPulseHalo 3s infinite ease-in-out;
  }

  .world-mallorca-ring {
    fill: #F2ECE4;
    stroke: rgb(194, 164, 120);
    stroke-width: 1.5;
    filter: drop-shadow(0 0 4px rgba(194, 164, 120, 0.6));
  }

  .world-mallorca-dot {
    fill: rgb(194, 164, 120);
  }

  .world-mallorca-label {
    font-family: 'Manrope', 'Raleway', sans-serif;
    font-size: 8px;
    letter-spacing: 0.18em;
    font-weight: 700;
    fill: rgb(194, 164, 120);
    text-transform: uppercase;
    user-select: none;
  }

  ${({ $mobile }) =>
    $mobile &&
    css`
      .world-route {
        stroke: rgba(194, 164, 120, 0.55);
        stroke-width: 3.3;

        &.is-dashed {
          stroke-dasharray: 11, 8;
        }

        &.is-active {
          stroke: rgb(242, 236, 228);
          stroke-width: 5.2;
          filter: drop-shadow(0 0 10px rgba(242, 236, 228, 0.65));
        }
      }

      .world-label-guide {
        stroke: rgba(194, 164, 120, 0.78);
        stroke-width: 2.6;
      }

      .world-destination-point {
        text {
          font-size: 24px;
          letter-spacing: 0.14em;
          paint-order: stroke fill;
          stroke: #502B3A;
          stroke-width: 6px;
          stroke-linejoin: round;
        }

        &:hover,
        &.is-active {
          .world-point-dot {
            stroke-width: 5;
          }
          .world-label-guide {
            stroke-width: 3.4;
          }
          text {
            fill: #FFFFFF;
            filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.55));
          }
        }
      }

      .world-mallorca-halo {
        stroke-width: 2.2;
      }

      .world-mallorca-ring {
        stroke-width: 4;
        filter: drop-shadow(0 0 8px rgba(194, 164, 120, 0.65));
      }

      .world-mallorca-label {
        font-size: 22px;
        letter-spacing: 0.18em;
        paint-order: stroke fill;
        stroke: #502B3A;
        stroke-width: 6px;
        stroke-linejoin: round;
      }
    `}
`;

const MapCard = styled(motion.article)`
  position: absolute;
  z-index: 20;
  width: clamp(230px, 32%, 285px);
  background: rgba(244, 242, 235, 0.98);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(194, 164, 120, 0.45);
  border-radius: 6px;
  padding: 16px 18px;
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const CardCountryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(194, 164, 120, 0.25);
  padding-bottom: 6px;

  span:first-child {
    font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    color: rgb(194, 164, 120);
    text-transform: uppercase;
  }
`;

const HeaderActions = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

const CountryCode = styled.span`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: rgb(80, 43, 58);
  background: rgba(80, 43, 58, 0.08);
  padding: 2px 6px;
  border-radius: 3px;
`;

const CardCloseBtn = styled.button`
  background: transparent;
  border: 0;
  color: rgba(80, 43, 58, 0.6);
  font-size: 1.05rem;
  line-height: 1;
  padding: 2px 4px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &:hover,
  &:active {
    color: rgb(80, 43, 58);
  }
`;

const DistributorBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;

  h3 {
    font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
    font-size: 1.15rem;
    font-weight: 600;
    color: rgb(80, 43, 58);
    margin: 4px 0 2px 0;
    line-height: 1.2;
  }

  p {
    font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
    font-size: 0.74rem;
    line-height: 1.5;
    color: rgb(80, 43, 58);
    opacity: 0.88;
    margin: 0;
  }

  a.world-card-inline-link {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const CardSeparator = styled.span`
  display: block;
  width: 100%;
  height: 1px;
  background: rgba(194, 164, 120, 0.25);
  margin: 8px 0;
`;

const VisitWebBtn = styled.a`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: rgb(80, 43, 58);
  text-decoration: none;
  text-transform: uppercase;
  margin-top: 6px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: color 0.2s ease, transform 0.15s ease;

  &:hover {
    color: rgb(203, 160, 82);
    transform: translateX(2px);
  }
`;

/* ── Mobile Hint & Carousel Section ── */
const MobileMapHint = styled.p`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin: 0.65rem auto 0;
    padding: 9px 16px;
    border-radius: 100px;
    background: rgba(255, 255, 255, 0.045);
    border: 1px solid rgba(194, 164, 120, 0.22);
    font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
    font-size: 0.72rem;
    letter-spacing: 0.04em;
    color: rgba(242, 236, 228, 0.78);
    text-align: center;

    &::before {
      content: '';
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: rgb(194, 164, 120);
      flex-shrink: 0;
      box-shadow: 0 0 8px rgba(194, 164, 120, 0.8);
    }
  }
`;

const MobileCarouselSection = styled.div`
  display: none;
  margin-top: 0.9rem;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

const MobileCarouselTrack = styled.div`
  position: relative;
  display: flex;
  gap: 14px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding: 6px 1.15rem 12px 1.15rem;
  margin: 0 -1.15rem;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MobileCarouselCard = styled.article`
  scroll-snap-align: center;
  flex: 0 0 clamp(265px, 84vw, 330px);
  background: rgba(244, 242, 235, 0.98);
  border: 1.5px solid ${({ $isActive }) => ($isActive ? 'rgb(194, 164, 120)' : 'rgba(194, 164, 120, 0.35)')};
  border-radius: 10px;
  padding: 16px 18px;
  box-shadow: ${({ $isActive }) => ($isActive ? '0 10px 28px rgba(0, 0, 0, 0.35)' : '0 6px 18px rgba(0, 0, 0, 0.2)')};
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: all 0.25s ease;
  transform: ${({ $isActive }) => ($isActive ? 'scale(1.01)' : 'scale(0.985)')};
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.86)};
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
  background: ${({ $isActive }) => ($isActive ? 'rgb(194, 164, 120)' : 'rgba(242, 236, 228, 0.28)')};
  border: none;
  cursor: pointer;
  padding: 0;
  transition: all 0.25s ease;
`;

const DISTRIBUIDORES = {
  CANADÁ: {
    pais: 'CANADÁ',
    codigo: 'CA',
    point: { cx: 38, cy: 206.4 },
    label: { x: 50, y: 210, anchor: 'start' },
    routeD: 'M266 219.3 Q175 140 38 206.4',
    isDashed: true,
    cardPos: { left: '4%', top: '35%' },
    items: [
      {
        nombre: 'Sélections V.S.B.A.',
        contacto: 'Contacto: Zsombor Mezey',
        email: 'zsombor.mezey@vsba.ca',
        tel: '+1 418 446 7022',
        web: 'https://www.vsba.ca',
      },
    ],
  },
  BÉLGICA: {
    pais: 'BÉLGICA',
    codigo: 'BE',
    point: { cx: 271, cy: 198.6 },
    guide: 'M267 194 L254 181',
    label: { x: 249, y: 176, anchor: 'end' },
    routeD: 'M266 219.3 Q263 205 271 198.6',
    isDashed: false,
    cardPos: { left: '36%', top: '8%' },
    mobile: {
      point: { cx: 352, cy: 838 },
      guide: 'M347 820 L328 758',
      label: { x: 324, y: 742, anchor: 'middle' },
      routeD: 'M288 1178 Q286 995 352 838',
    },
    items: [
      {
        nombre: 'Mil Amores',
        desc: 'Distribuidor de vinos y productos mediterráneos',
        web: 'https://www.milamores.be/',
      },
    ],
  },
  ALEMANIA: {
    pais: 'ALEMANIA',
    codigo: 'DE',
    point: { cx: 278.6, cy: 198.8 },
    guide: 'M283 195 L301 184',
    label: { x: 306, y: 181, anchor: 'start' },
    routeD: 'M266 219.3 Q271 202 278.6 198.8',
    isDashed: false,
    cardPos: { left: '46%', top: '8%' },
    mobile: {
      point: { cx: 474, cy: 834 },
      guide: 'M492 832 L540 827',
      label: { x: 552, y: 835, anchor: 'start' },
      routeD: 'M288 1178 Q356 965 474 834',
    },
    items: [
      {
        nombre: 'Der Mallorquiner',
        direcciones: ['Johann-Philipp-Reis-Straße 11,', '53332 Bornheim'],
        tel: '+49 2222 9273611',
        web: 'https://www.mallorquiner.com',
      },
      {
        nombre: 'Gourmet Mallorca',
        desc: 'Tienda especializada en productos de Mallorca',
        web: 'https://gourmet-mallorca.com/',
      },
    ],
  },
  SUIZA: {
    pais: 'SUIZA',
    codigo: 'CH',
    point: { cx: 278.9, cy: 206 },
    guide: 'M284 206 L304 206',
    label: { x: 309, y: 208, anchor: 'start' },
    routeD: 'M266 219.3 Q272 207 278.9 206',
    isDashed: false,
    cardPos: { left: '46%', top: '30%' },
    mobile: {
      point: { cx: 422, cy: 954 },
      guide: 'M439 947 L495 928',
      label: { x: 507, y: 936, anchor: 'start' },
      routeD: 'M288 1178 Q345 1055 422 954',
    },
    items: [
      {
        nombre: 'Pamisa',
        direcciones: ['Au Martzé 1, 1772 Grolley'],
        tel: '+41 26 475 43 78',
        web: 'https://pamisa.ch',
      },
    ],
  },
  ITALIA: {
    pais: 'ITALIA',
    codigo: 'IT',
    point: { cx: 291.6, cy: 207.3 },
    guide: 'M296 211 L313 226',
    label: { x: 318, y: 231, anchor: 'start' },
    routeD: 'M266 219.3 Q280 204 291.6 207.3',
    isDashed: false,
    cardPos: { left: '46%', top: '50%' },
    mobile: {
      point: { cx: 522, cy: 1102 },
      guide: 'M509 1116 L464 1164',
      label: { x: 452, y: 1192, anchor: 'middle' },
      routeD: 'M288 1178 Q402 1108 522 1102',
    },
    items: [
      {
        nombre: 'Proposta Vini',
        direcciones: ['Via Artigiani, 16, 38057', 'Pergine Valsugana TN'],
        tel: '+39 0461 534795',
        web: 'https://www.propostavini.com/en/',
      },
    ],
  },
  PENÍNSULA: {
    pais: 'PENÍNSULA',
    codigo: 'ES',
    point: { cx: 245.7, cy: 217.8 },
    label: { x: 233.7, y: 221.8, anchor: 'end' },
    routeD: 'M266 219.3 Q255 211 245.7 217.8',
    isDashed: true,
    cardPos: { left: '6%', top: '52%' },
    mobile: {
      point: { cx: 132, cy: 1142 },
      label: { x: 128, y: 1198, anchor: 'middle' },
      routeD: 'M288 1178 Q212 1126 132 1142',
    },
    items: [
      {
        nombre: 'Mundidrinks',
        desc: 'Distribución para España peninsular',
        web: 'https://www.mundidrinks.com/es',
      },
    ],
  },
};

const DESKTOP_COUNTRIES_LIST = Object.keys(DISTRIBUIDORES);
// En móvil se presenta únicamente la disposición europea adaptada a mapamundi-mobile-europa.png
const MOBILE_EUROPE_COUNTRIES = ['PENÍNSULA', 'BÉLGICA', 'ALEMANIA', 'SUIZA', 'ITALIA'];

const MapaInternacional = () => {
  const { getHero } = useHeroes();
  const dbHero = getHero('donde-comprar') || getHero('/donde-comprar');

  const displayTag = dbHero ? dbHero.tag : 'MAPA DE DISTRIBUCIÓN';
  const displayTitle = dbHero ? (dbHero.titulo || 'De Mallorca al mundo') : 'De Mallorca al mundo';
  const displaySub = dbHero
    ? dbHero.subtitulo
    : 'Desde Mallorca llegamos a Alemania, Suiza, Italia, Canadá, Bélgica y la Península a través de distribuidores especializados que comparten nuestra pasión por el vino.';

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(max-width: 768px)').matches;
    }
    return false;
  });

  // Sin ubicación seleccionada al inicio en todos los dispositivos
  const [activeCountry, setActiveCountry] = useState(null);

  const closeTimerRef = useRef(null);
  const carouselTrackRef = useRef(null);
  const cardRefs = useRef({});
  const isScrollingRef = useRef(false);
  const fromScrollRef = useRef(false);
  const hadMobileSelectionRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mq = window.matchMedia('(max-width: 768px)');
    const handleChange = (e) => {
      const mobileNow = e.matches;
      setIsMobile(mobileNow);
      if (mobileNow) {
        setActiveCountry((prev) => (prev && !MOBILE_EUROPE_COUNTRIES.includes(prev) ? null : prev));
      }
    };
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  // Al seleccionar un país en móvil, centra su tarjeta en el carrusel sin saltos bruscos
  useEffect(() => {
    if (!isMobile || !activeCountry) {
      hadMobileSelectionRef.current = false;
      return;
    }
    if (fromScrollRef.current) {
      fromScrollRef.current = false;
      hadMobileSelectionRef.current = true;
      return;
    }

    const useSmooth = hadMobileSelectionRef.current;
    hadMobileSelectionRef.current = true;

    const rafId = requestAnimationFrame(() => {
      const cardEl = cardRefs.current[activeCountry];
      const track = carouselTrackRef.current;
      if (cardEl && track) {
        isScrollingRef.current = true;
        track.scrollTo({
          left: cardEl.offsetLeft - (track.clientWidth - cardEl.clientWidth) / 2,
          behavior: useSmooth ? 'smooth' : 'auto',
        });
        setTimeout(() => {
          isScrollingRef.current = false;
        }, useSmooth ? 450 : 80);
      }
    });

    return () => cancelAnimationFrame(rafId);
  }, [activeCountry, isMobile]);

  const currentData = activeCountry ? DISTRIBUIDORES[activeCountry] : null;
  const visibleMapCountries = isMobile ? MOBILE_EUROPE_COUNTRIES : DESKTOP_COUNTRIES_LIST;
  const mallorcaCoords = isMobile ? MALLORCA_MOBILE : MALLORCA_DESKTOP;

  const handleMouseEnter = (key) => {
    if (isMobile) return;
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setActiveCountry(key);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    closeTimerRef.current = setTimeout(() => {
      setActiveCountry(null);
    }, 280);
  };

  const handleCardMouseEnter = () => {
    if (isMobile) return;
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  };

  // Selección al hacer tap/click
  const handleCountrySelect = (key) => {
    setActiveCountry((prev) => (prev === key ? null : key));
  };

  // Detección de tarjeta activa en el carrusel móvil al deslizar
  const handleCarouselScroll = () => {
    if (isScrollingRef.current || !carouselTrackRef.current) return;
    const track = carouselTrackRef.current;
    const trackRect = track.getBoundingClientRect();
    const trackCenter = trackRect.left + trackRect.width / 2;

    let closestCountry = null;
    let minDistance = Infinity;

    MOBILE_EUROPE_COUNTRIES.forEach((country) => {
      const cardEl = cardRefs.current[country];
      if (cardEl) {
        const cardRect = cardEl.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = Math.abs(trackCenter - cardCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestCountry = country;
        }
      }
    });

    if (closestCountry && closestCountry !== activeCountry) {
      fromScrollRef.current = true;
      setActiveCountry(closestCountry);
    }
  };

  return (
    <Section className="world-distribution-hero" data-no-scroll-reveal="true">
      <Layout className="world-distribution-layout">
        {/* ── COLUMNA TEXTO ── */}
        <HeroCopy className="world-hero-copy">
          {displayTag && (
            <>
              <Eyebrow className="world-hero-eyebrow">{displayTag}</Eyebrow>
              <Underline className="world-hero-line" />
            </>
          )}
          <Title>
            {displayTitle.split('\n').map((line, idx, arr) => (
              <span key={idx}>
                {line}
                {idx < arr.length - 1 && <br />}
              </span>
            ))}
          </Title>
          {displaySub && (
            <Description className="world-hero-description">
              {displaySub}
            </Description>
          )}
        </HeroCopy>

        {/* ── ESCENARIO MAPA ── */}
        <MapShell className="world-map-shell">
          {/* Barra de países europeos en móvil */}
          <MobilePillsBar aria-label="Seleccionar país en Europa">
            {MOBILE_EUROPE_COUNTRIES.map((countryKey) => {
              const isActive = activeCountry === countryKey;
              return (
                <MobilePill
                  key={countryKey}
                  type="button"
                  $isActive={isActive}
                  aria-pressed={isActive}
                  onClick={() => handleCountrySelect(countryKey)}
                >
                  {countryKey}
                </MobilePill>
              );
            })}
          </MobilePillsBar>

          <MapStage className="world-map-stage" $mobile={isMobile}>
            <SvgRoutes
              className="world-routes"
              $mobile={isMobile}
              viewBox={isMobile ? VIEWBOX_MOBILE_EUROPE : VIEWBOX_DESKTOP}
              role="img"
              aria-label={
                isMobile
                  ? 'Mapa de Europa con conexiones desde Mallorca hacia los mercados europeos de distribución'
                  : 'Mapa mundial con conexiones desde Mallorca hacia seis mercados de distribución'
              }
            >
              {/* Contorno del mapa: Europa dedicado en móvil / Mapamundi en escritorio */}
              {isMobile ? (
                <image
                  href="/common/mapamundi-mobile-europa.png"
                  x="0"
                  y="0"
                  width="1024"
                  height="1536"
                  preserveAspectRatio="none"
                  opacity="0.34"
                  style={{
                    pointerEvents: 'none',
                    filter: 'brightness(0) invert(1)',
                  }}
                />
              ) : (
                <image
                  href="/common/mapamundi-internacional-crop.png"
                  x="0"
                  y="0"
                  width="760"
                  height="430"
                  preserveAspectRatio="none"
                  opacity="0.24"
                  style={{ pointerEvents: 'none' }}
                />
              )}

              {visibleMapCountries.map((key) => {
                const info = DISTRIBUIDORES[key];
                const geo = isMobile && info.mobile ? info.mobile : info;
                const isActive = activeCountry === key;
                return (
                  <g key={key}>
                    <path
                      className={`world-route ${info.isDashed ? 'is-dashed' : ''} ${
                        isActive ? 'is-active' : ''
                      }`}
                      d={geo.routeD}
                      pathLength="1"
                    />

                    <g
                      className={`world-destination-point ${isActive ? 'is-active' : ''}`}
                      role="button"
                      tabIndex="0"
                      style={{ pointerEvents: 'all', cursor: 'pointer' }}
                      aria-label={`Mostrar distribuidores de ${info.pais}`}
                      onMouseEnter={() => handleMouseEnter(key)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleCountrySelect(key)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleCountrySelect(key);
                        }
                      }}
                    >
                      {/* Área táctil amplia e invisible */}
                      <circle
                        cx={geo.point.cx}
                        cy={geo.point.cy}
                        r={isMobile ? 52 : 16}
                        fill="rgba(0, 0, 0, 0.001)"
                        style={{ pointerEvents: 'all' }}
                      />
                      <circle
                        className="world-point-halo"
                        cx={geo.point.cx}
                        cy={geo.point.cy}
                        r={isMobile ? 28 : 10.5}
                        style={{ pointerEvents: 'all' }}
                      />
                      <circle
                        className="world-point-dot"
                        cx={geo.point.cx}
                        cy={geo.point.cy}
                        r={isMobile ? 11 : 4.2}
                        style={{ pointerEvents: 'all' }}
                      />
                      {geo.guide && (
                        <path
                          className="world-label-guide"
                          d={geo.guide}
                        />
                      )}
                      <text
                        x={geo.label.x}
                        y={geo.label.y}
                        textAnchor={geo.label.anchor}
                        style={{ pointerEvents: 'all' }}
                      >
                        {info.pais}
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* Punto Mallorca */}
              <g className="world-mallorca-group" style={{ pointerEvents: 'none' }}>
                <circle
                  className="world-mallorca-halo"
                  cx={mallorcaCoords.cx}
                  cy={mallorcaCoords.cy}
                  r={isMobile ? 30 : 11.7}
                />
                <circle
                  className="world-mallorca-ring"
                  cx={mallorcaCoords.cx}
                  cy={mallorcaCoords.cy}
                  r={isMobile ? 16.5 : 6.9}
                />
                <circle
                  className="world-mallorca-dot"
                  cx={mallorcaCoords.cx}
                  cy={mallorcaCoords.cy}
                  r={isMobile ? 6.8 : 2.8}
                />
                <text
                  className="world-mallorca-label"
                  x={mallorcaCoords.cx}
                  y={mallorcaCoords.labelY}
                  textAnchor="middle"
                >
                  MALLORCA
                </text>
              </g>
            </SvgRoutes>

            {/* Tarjeta flotante en escritorio al hacer hover */}
            <AnimatePresence mode="wait">
              {currentData && (
                <MapCard
                  key={currentData.pais}
                  className={`world-map-card world-card-${currentData.codigo.toLowerCase()}`}
                  style={currentData.cardPos}
                  initial={{ opacity: 0, scale: 0.94, y: 4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 4 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  onMouseEnter={handleCardMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <CardCountryHeader className="world-card-country">
                    <span>{currentData.pais}</span>
                    <CountryCode className="world-country-code" aria-hidden="true">
                      {currentData.codigo}
                    </CountryCode>
                  </CardCountryHeader>

                  {currentData.items.map((item, idx) => (
                    <DistributorBlock key={idx} className="world-card-distributor">
                      {idx > 0 && <CardSeparator className="world-card-separator" />}
                      <h3>{item.nombre}</h3>
                      {item.contacto && <p>{item.contacto}</p>}
                      {item.email && <p>{item.email}</p>}
                      {item.direcciones ? (
                        item.direcciones.map((d, dIdx) => <p key={dIdx}>{d}</p>)
                      ) : item.direccion ? (
                        <p>{item.direccion}</p>
                      ) : null}
                      {item.desc && <p>{item.desc}</p>}
                      {item.tel && <p>{item.tel}</p>}
                      {item.web && (
                        <VisitWebBtn
                          href={item.web}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          VISITAR WEB →
                        </VisitWebBtn>
                      )}
                    </DistributorBlock>
                  ))}
                </MapCard>
              )}
            </AnimatePresence>
          </MapStage>

          {/* Indicación interactiva cuando aún no hay país activo en móvil */}
          {!activeCountry && (
            <MobileMapHint>
              Toca un país en el mapa para consultar su distribuidor
            </MobileMapHint>
          )}

          {/* Carrusel móvil sincronizado (Scroll-Snap horizontal sobre Europa) */}
          <MobileCarouselSection className="world-mobile-carousel">
            {activeCountry && MOBILE_EUROPE_COUNTRIES.includes(activeCountry) && (
              <>
                <MobileCarouselTrack
                  ref={carouselTrackRef}
                  onScroll={handleCarouselScroll}
                >
                  {MOBILE_EUROPE_COUNTRIES.map((countryKey) => {
                    const dist = DISTRIBUIDORES[countryKey];
                    const isActive = activeCountry === countryKey;
                    return (
                      <MobileCarouselCard
                        key={dist.pais}
                        ref={(el) => {
                          cardRefs.current[countryKey] = el;
                        }}
                        $isActive={isActive}
                        onClick={() => setActiveCountry(countryKey)}
                      >
                        <CardCountryHeader className="world-card-country">
                          <span>{dist.pais}</span>
                          <HeaderActions>
                            <CountryCode className="world-country-code" aria-hidden="true">
                              {dist.codigo}
                            </CountryCode>
                            {isActive && (
                              <CardCloseBtn
                                type="button"
                                aria-label="Cerrar ficha de distribuidor"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveCountry(null);
                                }}
                              >
                                ×
                              </CardCloseBtn>
                            )}
                          </HeaderActions>
                        </CardCountryHeader>

                        {dist.items.map((item, idx) => (
                          <DistributorBlock key={idx} className="world-card-distributor">
                            {idx > 0 && <CardSeparator className="world-card-separator" />}
                            <h3>{item.nombre}</h3>
                            {item.contacto && <p>{item.contacto}</p>}
                            {item.email && (
                              <p>
                                <a className="world-card-inline-link" href={`mailto:${item.email}`}>
                                  {item.email}
                                </a>
                              </p>
                            )}
                            {item.direcciones ? (
                              item.direcciones.map((d, dIdx) => <p key={dIdx}>{d}</p>)
                            ) : item.direccion ? (
                              <p>{item.direccion}</p>
                            ) : null}
                            {item.desc && <p>{item.desc}</p>}
                            {item.tel && (
                              <p>
                                <a
                                  className="world-card-inline-link"
                                  href={`tel:${item.tel.replace(/\s+/g, '')}`}
                                >
                                  {item.tel}
                                </a>
                              </p>
                            )}
                            {item.web && (
                              <VisitWebBtn
                                href={item.web}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                VISITAR WEB →
                              </VisitWebBtn>
                            )}
                          </DistributorBlock>
                        ))}
                      </MobileCarouselCard>
                    );
                  })}
                </MobileCarouselTrack>

                <MobileCarouselDots>
                  {MOBILE_EUROPE_COUNTRIES.map((countryKey) => (
                    <CarouselDot
                      key={countryKey}
                      type="button"
                      $isActive={activeCountry === countryKey}
                      aria-label={`Ver distribuidor de ${countryKey}`}
                      onClick={() => setActiveCountry(countryKey)}
                    />
                  ))}
                </MobileCarouselDots>
              </>
            )}
          </MobileCarouselSection>
        </MapShell>
      </Layout>
    </Section>
  );
};

export default MapaInternacional;
