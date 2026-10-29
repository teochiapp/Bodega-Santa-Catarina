import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';
import { useCookieConsent } from '../../context/CookieContext';

const CircularTriggerButton = styled(motion.button)`
  position: fixed;
  bottom: ${({ $hasScrolled }) => ($hasScrolled ? '92px' : '32px')};
  right: 32px;
  z-index: 998;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary || 'rgb(80, 43, 58)'};
  border: 1px solid rgba(194, 164, 120, 0.45);
  color: ${({ theme }) => theme.colors?.secondary || 'rgb(194, 164, 120)'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.28);
  padding: 0;
  box-sizing: border-box;
  transition: bottom 0.35s cubic-bezier(0.16, 1, 0.3, 1),
              background 0.25s ease,
              border-color 0.25s ease,
              transform 0.25s ease,
              box-shadow 0.25s ease;

  .cookie-icon {
    color: ${({ theme }) => theme.colors?.secondary || '#C2A478'};
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  &:hover {
    background: #643547;
    border-color: rgb(194, 164, 120);
    transform: translateY(-2px) scale(1.08);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);

    .cookie-icon {
      transform: rotate(25deg) scale(1.15);
      color: #ffffff;
    }
  }

  &:active {
    transform: translateY(0) scale(0.96);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints?.mobile || '576px'}) {
    width: 42px;
    height: 42px;
    bottom: ${({ $hasScrolled }) => ($hasScrolled ? '74px' : '20px')};
    right: 20px;
  }
`;

const CookieBadge = () => {
  const { hasConsented, isBannerVisible, isModalOpen, openPreferencesModal } = useCookieConsent();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [scrollState, setScrollState] = useState(() => ({
    hasScrolled: typeof window !== 'undefined' ? window.scrollY > 300 : false,
    isHomeHeroVisible: true,
  }));

  useEffect(() => {
    const updateScrollState = () => {
      const y = window.scrollY;
      const heroEl = document.querySelector('[data-inicio-hero="true"]');
      const heroInView = heroEl
        ? heroEl.getBoundingClientRect().bottom > 140
        : y < 560;

      setScrollState((prev) => {
        const nextHasScrolled = y > 300;
        if (prev.hasScrolled === nextHasScrolled && prev.isHomeHeroVisible === heroInView) {
          return prev;
        }
        return {
          hasScrolled: nextHasScrolled,
          isHomeHeroVisible: heroInView,
        };
      });
    };

    const rafId = requestAnimationFrame(updateScrollState);
    window.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [location.pathname]);

  // En Inicio ocultamos el botón mientras el usuario está en el Hero Video / parte superior de la página
  const hideOnHomeHero = isHome && (!scrollState.hasScrolled || scrollState.isHomeHeroVisible);

  // Solo se muestra si ya se configuraron cookies, el banner/modal no están activos y no estamos sobre el Hero Video de Inicio
  const shouldShow = hasConsented && !isBannerVisible && !isModalOpen && !hideOnHomeHero;

  return (
    <AnimatePresence>
      {shouldShow && (
        <CircularTriggerButton
          $hasScrolled={scrollState.hasScrolled}
          initial={{ opacity: 0, scale: 0.7, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 15 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={openPreferencesModal}
          aria-label="Configuración de cookies"
          title="Configuración de cookies"
        >
          <Cookie size={20} className="cookie-icon" />
        </CircularTriggerButton>
      )}
    </AnimatePresence>
  );
};

export default CookieBadge;
