import { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { ScrollLink } from '../common/ScrollToTop';
import { useHeroes } from '../../context/HeroesContext';
import { getResolvedImageUrl } from '../../services/api';

import HeroOverlay from '../HeroOverlay';

const HeroContainer = styled.section`
  position: relative;
  height: calc(100vh - 96px);
  min-height: 560px;
  overflow: hidden;
  background-color: #230F19;

  @media (max-width: ${({ theme }) => theme.breakpoints?.desktop || '1024px'}) {
    height: calc(100dvh - 80px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints?.mobile || '576px'}) {
    min-height: 520px;
    height: calc(100dvh - 72px);
  }
`;

const BackgroundVideo = styled.video`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: ${({ $objectPosition }) => $objectPosition || 'center 55%'};
  filter: brightness(1) contrast(1.02);
  pointer-events: none;
`;

const BackgroundFallbackImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: ${({ $objectPosition }) => $objectPosition || 'center 55%'};
  filter: brightness(1) contrast(1.02);
  pointer-events: none;
`;

const ContentContainer = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  max-width: 680px;
  height: auto;
  padding: clamp(1.75rem, 4vw, 3rem);
  box-sizing: border-box;
  z-index: 2;
`;

const Eyebrow = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.78rem;
  letter-spacing: 0.28em;
  font-weight: 700;
  color: rgb(194, 164, 120);
  margin-bottom: 22px;
  text-transform: uppercase;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: clamp(3.5rem, 6vw, 5rem);
  font-weight: 400;
  line-height: 0.95;
  color: rgb(255, 255, 255);
  margin-bottom: 22px;
  padding: 0;
  white-space: pre-line;
`;

const Description = styled.p`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 1rem;
  line-height: 1.85;
  color: rgba(255, 255, 255, 0.78);
  margin-bottom: 40px;
  white-space: pre-line;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
`;

const PrimaryLink = styled(ScrollLink)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  font-weight: 600;
  text-transform: uppercase;
  color: rgb(242, 236, 228);
  background: rgb(80, 43, 58);
  border: 1px solid rgba(194, 164, 120, 0.25);
  border-radius: 100px;
  padding: 14px 28px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: #623345;
    border-color: rgba(194, 164, 120, 0.5);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  }
`;

const SecondaryLink = styled(ScrollLink)`
  display: inline-flex;
  align-items: center;
  gap: 14px;
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgb(255, 255, 255);
  background: none;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  padding-bottom: 3px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;

  svg {
    transition: transform 0.25s ease;
  }

  &:hover {
    border-color: #ffffff;
    color: #ffffff;

    svg {
      transform: translateX(4px);
    }
  }
`;

const MuteButton = styled.button`
  position: absolute;
  bottom: clamp(1.75rem, 4vw, 3rem);
  right: clamp(1.75rem, 4vw, 3rem);
  z-index: 10;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(35, 15, 25, 0.65);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);

  &:hover {
    background: rgb(80, 43, 58);
    border-color: rgb(194, 164, 120);
    transform: scale(1.08);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints?.mobile || '576px'}) {
    width: 42px;
    height: 42px;
    bottom: 1.5rem;
    right: 1.5rem;
  }
`;

const DEFAULT_POSTER = '/assets/Santa_Catarina_Vendimia_296-BNFQEO6C.jpg';

const HeroVideo = () => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const { getHero } = useHeroes();

  const dbHero = getHero('inicio') || getHero('/');
  const displayTag = dbHero ? dbHero.tag : 'TRADICIÓN QUE PERDURA';
  const displayTitle = dbHero ? (dbHero.titulo || 'Bodega\nSanta Catarina') : 'Bodega\nSanta Catarina';
  const displaySub = dbHero
    ? dbHero.subtitulo
    : '40 años elaborando vinos únicos\nen el corazón de Mallorca.';
  const displayPosition = dbHero?.posicion || 'center 55%';
  const rawImage = dbHero?.imagen || DEFAULT_POSTER;
  const resolvedPoster = getResolvedImageUrl(rawImage);
  // Si en el admin suben una imagen propia (/uploads/...), se prioriza esa imagen; si no, reproduce el vídeo oficial con su poster
  const usarImagenPersonalizada = Boolean(dbHero?.imagen && dbHero.imagen.startsWith('/uploads/'));

  const toggleSound = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);

      // Si el navegador pausó la reproducción automática, reanudar
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => { });
      }
    }
  };

  return (
    <HeroContainer data-no-scroll-reveal="true" data-inicio-hero="true">
      {usarImagenPersonalizada ? (
        <BackgroundFallbackImage
          src={resolvedPoster}
          alt={dbHero?.imagenAlt || 'Bodega Santa Catarina'}
          $objectPosition={displayPosition}
        />
      ) : (
        <BackgroundVideo
          ref={videoRef}
          src="/inicio/hero-video.mp4"
          poster={resolvedPoster}
          $objectPosition={displayPosition}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      )}

      {/* Overlay compartido con degradado vino suave */}
      <HeroOverlay />

      {/* Contenido en esquina inferior izquierda */}
      <ContentContainer
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {displayTag && <Eyebrow>{displayTag}</Eyebrow>}
        {displayTitle && <Title>{displayTitle}</Title>}
        {displaySub && <Description>{displaySub}</Description>}
        <ButtonGroup>
          <PrimaryLink to="/enoturismo">
            RESERVAR EXPERIENCIAS
          </PrimaryLink>
          <SecondaryLink to="/vinos">
            DESCUBRIR NUESTROS VINOS
            <svg width="20" height="10" viewBox="0 0 20 10" fill="none" aria-hidden="true">
              <path
                d="M1 5H19M19 5L14.5 0.5M19 5L14.5 9.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </SecondaryLink>
        </ButtonGroup>
      </ContentContainer>

      {/* Botón flotante para silenciar / activar audio en la esquina inferior derecha */}
      {!usarImagenPersonalizada && (
        <MuteButton
          type="button"
          onClick={toggleSound}
          aria-label={isMuted ? 'Activar sonido del video' : 'Silenciar video'}
          title={isMuted ? 'Activar sonido' : 'Silenciar'}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </MuteButton>
      )}
    </HeroContainer>
  );
};

export default HeroVideo;
