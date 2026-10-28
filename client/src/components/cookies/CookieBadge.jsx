import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie } from 'lucide-react';
import { useCookieConsent } from '../../context/CookieContext';

const TriggerButton = styled(motion.button)`
  position: fixed;
  bottom: ${({ $hasScrolled }) => ($hasScrolled ? '90px' : '28px')};
  right: 28px;
  z-index: 998;
  height: 44px;
  padding: 0 16px 0 12px;
  border-radius: 9999px;
  background: rgba(35, 15, 25, 0.92);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(194, 164, 120, 0.35);
  color: rgb(242, 236, 228);
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  transition: bottom 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              background 0.25s ease,
              border-color 0.25s ease,
              transform 0.25s ease,
              box-shadow 0.25s ease;

  .cookie-icon {
    color: ${({ theme }) => theme.colors?.secondary || '#C2A478'};
    transition: transform 0.3s ease;
  }

  .label-text {
    opacity: 0.85;
    white-space: nowrap;
    transition: opacity 0.2s ease;
  }

  &:hover {
    background: rgba(50, 20, 35, 0.98);
    border-color: ${({ theme }) => theme.colors?.secondary || '#C2A478'};
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.45);

    .cookie-icon {
      transform: rotate(20deg) scale(1.1);
    }

    .label-text {
      opacity: 1;
      color: #ffffff;
    }
  }

  &:active {
    transform: translateY(0) scale(0.97);
  }

  @media (max-width: 640px) {
    bottom: ${({ $hasScrolled }) => ($hasScrolled ? '72px' : '20px')};
    right: 20px;
    width: 42px;
    height: 42px;
    padding: 0;
    justify-content: center;

    .label-text {
      display: none;
    }
  }
`;

const CookieBadge = () => {
  const { hasConsented, isBannerVisible, isModalOpen, openPreferencesModal } = useCookieConsent();
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Solo se muestra si ya se configuraron cookies y el banner/modal no están activos
  const shouldShow = hasConsented && !isBannerVisible && !isModalOpen;

  return (
    <AnimatePresence>
      {shouldShow && (
        <TriggerButton
          $hasScrolled={hasScrolled}
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 15 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={openPreferencesModal}
          aria-label="Abrir configuración de cookies"
          title="Preferencias de privacidad y cookies"
        >
          <Cookie size={18} className="cookie-icon" />
          <span className="label-text">Cookies</span>
        </TriggerButton>
      )}
    </AnimatePresence>
  );
};

export default CookieBadge;
