import { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const VIEWBOX_DESKTOP = '0 0 760 434';
const VIEWBOX_MOBILE = '335 150 120 85'; // recorte sobre Europa + Mallorca

const Section = styled.section`
  width: 100%;
  background-color: #5C1120;
  padding: clamp(3.5rem, 5vw, 6rem) clamp(1rem, 3.5vw, 3.5rem);
  box-sizing: border-box;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 3rem 1.25rem 3.5rem 1.25rem;
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
    font-size: clamp(2.1rem, 7vw, 2.6rem);
    margin-bottom: 14px;
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
    line-height: 1.65;
  }
`;

const MapShell = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const MapStage = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: ${({ $mobile }) => ($mobile ? '120 / 85' : '760 / 434')};
  max-width: 860px;
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;

  @media (max-width: 768px) {
    aspect-ratio: 120 / 85;
    max-width: 100%;
  }
`;

const SvgRoutes = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
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
      text {
        fill: rgb(242, 236, 228);
        filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.6));
      }
    }
  }

  @keyframes worldPulseHalo {
    0% { transform: scale(0.9); opacity: 0.4; }
    50% { transform: scale(1.3); opacity: 0.85; }
    100% { transform: scale(0.9); opacity: 0.4; }
  }

  .world-mallorca-halo {
    fill: rgba(194, 164, 120, 0.25);
    transform-origin: 392px 205px;
    animation: worldPulseHalo 3s infinite ease-in-out;
  }

  .world-mallorca-ring {
    fill: none;
    stroke: rgb(194, 164, 120);
    stroke-width: 1.5;
  }

  .world-mallorca-dot {
    fill: #FFFFFF;
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
        stroke-width: 0.6;
        &.is-active {
          stroke-width: 1;
        }
      }
      .world-destination-point text {
        font-size: 3.6px;
        letter-spacing: 0.1em;
      }
      .world-destination-point:hover .world-point-dot,
      .world-destination-point.is-active .world-point-dot {
        stroke-width: 0.8;
      }
      .world-mallorca-label {
        font-size: 3.6px;
      }
      .world-mallorca-ring {
        stroke-width: 0.6;
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
  position: relative;
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
  flex: 0 0 clamp(265px, 82vw, 320px);
  background: rgba(244, 242, 235, 0.98);
  border: 1.5px solid ${({ $isActive }) => ($isActive ? 'rgb(194, 164, 120)' : 'rgba(194, 164, 120, 0.35)')};
  border-radius: 8px;
  padding: 18px 20px;
  box-shadow: ${({ $isActive }) => ($isActive ? '0 10px 28px rgba(0, 0, 0, 0.35)' : '0 6px 18px rgba(0, 0, 0, 0.2)')};
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: all 0.25s ease;
  transform: ${({ $isActive }) => ($isActive ? 'scale(1.02)' : 'scale(1)')};
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
    point: { cx: 226, cy: 162 },
    label: { x: 216, y: 157, anchor: 'end' },
    routeD: 'M392 205 Q300 135 226 162',
    isDashed: true,
    cardPos: { left: '4%', top: '38%' },
    mobile: {
      point: { cx: 342, cy: 178 },
      label: { x: 348, y: 178, anchor: 'start' },
      routeD: 'M392 205 Q350 190 342 178',
    },
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
    point: { cx: 398, cy: 169 },
    label: { x: 393, y: 162, anchor: 'end' },
    routeD: 'M392 205 Q392 185 398 169',
    isDashed: false,
    cardPos: { left: '16%', top: '2%' },
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
    point: { cx: 412, cy: 166 },
    label: { x: 422, y: 166, anchor: 'start' },
    routeD: 'M392 205 Q406 182 412 166',
    isDashed: false,
    cardPos: { left: '48%', top: '1%' },
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
    point: { cx: 406, cy: 182 },
    label: { x: 416, y: 182, anchor: 'start' },
    routeD: 'M392 205 Q400 193 406 182',
    isDashed: false,
    cardPos: { left: '48%', top: '34%' },
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
    point: { cx: 418, cy: 198 },
    label: { x: 428, y: 200, anchor: 'start' },
    routeD: 'M392 205 Q408 205 418 198',
    isDashed: false,
    cardPos: { left: '48%', top: '50%' },
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
    point: { cx: 375, cy: 206 },
    label: { x: 365, y: 209, anchor: 'end' },
    routeD: 'M392 205 Q383 199 375 206',
    isDashed: true,
    cardPos: { left: '8%', top: '52%' },
    items: [
      {
        nombre: 'Mundidrinks',
        desc: 'Distribución para España peninsular',
        web: 'https://www.mundidrinks.com/es',
      },
    ],
  },
};

const COUNTRIES_LIST = Object.keys(DISTRIBUIDORES);

const MapaInternacional = () => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth <= 768;
    }
    return false;
  });

  const [activeCountry, setActiveCountry] = useState(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      return 'CANADÁ';
    }
    return null;
  });

  const closeTimerRef = useRef(null);
  const carouselTrackRef = useRef(null);
  const cardRefs = useRef({});
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setActiveCountry((prev) => prev || 'CANADÁ');
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentData = activeCountry ? DISTRIBUIDORES[activeCountry] : null;

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
    if (isMobile) {
      setActiveCountry(key);
      const cardEl = cardRefs.current[key];
      if (cardEl && carouselTrackRef.current) {
        isScrollingRef.current = true;
        carouselTrackRef.current.scrollTo({
          left: cardEl.offsetLeft - (carouselTrackRef.current.clientWidth - cardEl.clientWidth) / 2,
          behavior: 'smooth',
        });
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 500);
      }
    } else {
      setActiveCountry((prev) => (prev === key ? null : key));
    }
  };

  // Detección de tarjeta activa en el carrusel móvil al deslizar con el dedo
  const handleCarouselScroll = () => {
    if (isScrollingRef.current || !carouselTrackRef.current) return;
    const track = carouselTrackRef.current;
    const trackRect = track.getBoundingClientRect();
    const trackCenter = trackRect.left + trackRect.width / 2;

    let closestCountry = null;
    let minDistance = Infinity;

    COUNTRIES_LIST.forEach((country) => {
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
      setActiveCountry(closestCountry);
    }
  };

  const R = isMobile
    ? { hit: 6, halo: 6, dot: 2.4, mHalo: 6, mRing: 3.6, mDot: 1.5 }
    : { hit: 24, halo: 15, dot: 6, mHalo: 17, mRing: 10, mDot: 4 };

  return (
    <Section className="world-distribution-hero">
      <Layout className="world-distribution-layout">
        {/* ── COLUMNA TEXTO ── */}
        <HeroCopy className="world-hero-copy">
          <Eyebrow className="world-hero-eyebrow">MAPA DE DISTRIBUCIÓN</Eyebrow>
          <Underline className="world-hero-line" />
          <Title>De Mallorca al mundo</Title>
          <Description className="world-hero-description">
            Desde Mallorca llegamos a Alemania, Suiza, Italia, Canadá, Bélgica y la Península
            a través de distribuidores especializados que comparten nuestra pasión por el vino.
          </Description>
        </HeroCopy>

        {/* ── ESCENARIO MAPA ── */}
        <MapShell className="world-map-shell">
          <MapStage className="world-map-stage" $mobile={isMobile}>
            <SvgRoutes
              className="world-routes"
              $mobile={isMobile}
              viewBox={isMobile ? VIEWBOX_MOBILE : VIEWBOX_DESKTOP}
              role="img"
              aria-label="Mapa mundial con conexiones desde Mallorca hacia seis mercados de distribución"
            >
              <image
                href="/common/mapamundi-transparente-3.webp"
                x="0"
                y="0"
                width="760"
                height="434"
                preserveAspectRatio="none"
                opacity={isMobile ? '0.65' : '0.32'}
                style={{ pointerEvents: 'none' }}
              />

              {Object.entries(DISTRIBUIDORES).map(([key, base]) => {
                const info = isMobile && base.mobile ? { ...base, ...base.mobile } : base;
                const effectiveActive = activeCountry || (isMobile ? 'CANADÁ' : null);
                const isActive = effectiveActive === key;
                return (
                  <g key={key}>
                    <path
                      className={`world-route ${info.isDashed ? 'is-dashed' : ''} ${
                        isActive ? 'is-active' : ''
                      }`}
                      d={info.routeD}
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
                      {/* Área táctil e interactiva */}
                      <circle
                        cx={info.point.cx}
                        cy={info.point.cy}
                        r={R.hit}
                        fill="rgba(0, 0, 0, 0.001)"
                        style={{ pointerEvents: 'all' }}
                      />
                      <circle
                        className="world-point-halo"
                        cx={info.point.cx}
                        cy={info.point.cy}
                        r={R.halo}
                        style={{ pointerEvents: 'all' }}
                      />
                      <circle
                        className="world-point-dot"
                        cx={info.point.cx}
                        cy={info.point.cy}
                        r={R.dot}
                        style={{ pointerEvents: 'all' }}
                      />
                      <text
                        x={info.label.x}
                        y={info.label.y}
                        textAnchor={info.label.anchor}
                        style={{ pointerEvents: 'all' }}
                      >
                        {info.pais}
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* Punto Mallorca */}
              <circle className="world-mallorca-halo" cx="392" cy="205" r={R.mHalo} />
              <circle className="world-mallorca-ring" cx="392" cy="205" r={R.mRing} />
              <circle className="world-mallorca-dot" cx="392" cy="205" r={R.mDot} />
              <text className="world-mallorca-label" x="392" y={isMobile ? 212 : 226} textAnchor="middle">
                MALLORCA
              </text>
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

          {/* Carrusel móvil sincronizado (Scroll-Snap horizontal) */}
          <MobileCarouselSection className="world-mobile-carousel">
            <MobileCarouselTrack
              ref={carouselTrackRef}
              onScroll={handleCarouselScroll}
            >
              {COUNTRIES_LIST.map((countryKey) => {
                const dist = DISTRIBUIDORES[countryKey];
                const effectiveActive = activeCountry || (isMobile ? 'CANADÁ' : null);
                const isActive = effectiveActive === countryKey;
                return (
                  <MobileCarouselCard
                    key={dist.pais}
                    ref={(el) => {
                      cardRefs.current[countryKey] = el;
                    }}
                    $isActive={isActive}
                    onClick={() => handleCountrySelect(countryKey)}
                  >
                    <CardCountryHeader className="world-card-country">
                      <span>{dist.pais}</span>
                      <CountryCode className="world-country-code" aria-hidden="true">
                        {dist.codigo}
                      </CountryCode>
                    </CardCountryHeader>

                    {dist.items.map((item, idx) => (
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
                  </MobileCarouselCard>
                );
              })}
            </MobileCarouselTrack>

            <MobileCarouselDots>
              {COUNTRIES_LIST.map((countryKey) => {
                const effectiveActive = activeCountry || (isMobile ? 'CANADÁ' : null);
                return (
                  <CarouselDot
                    key={countryKey}
                    type="button"
                    $isActive={effectiveActive === countryKey}
                    aria-label={`Ver distribuidor de ${countryKey}`}
                    onClick={() => handleCountrySelect(countryKey)}
                  />
                );
              })}
            </MobileCarouselDots>
          </MobileCarouselSection>
        </MapShell>
      </Layout>
    </Section>
  );
};

export default MapaInternacional;
