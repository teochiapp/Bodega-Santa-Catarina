import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, ShieldCheck, SlidersHorizontal, Check, X } from 'lucide-react';
import { useCookieConsent } from '../../context/CookieContext';

const BannerWrapper = styled(motion.aside)`
  position: fixed;
  bottom: 24px;
  right: 24px;
  max-width: 480px;
  width: calc(100% - 48px);
  z-index: 9995;
  background: rgba(30, 12, 21, 0.95);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(194, 164, 120, 0.38);
  border-radius: 16px;
  padding: 22px 24px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.04) inset;
  color: rgb(242, 236, 228);
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  box-sizing: border-box;

  @media (max-width: 640px) {
    bottom: 16px;
    right: 14px;
    left: 14px;
    width: auto;
    padding: 18px 18px;
    border-radius: 14px;
  }
`;

const BannerHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

const IconBadge = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(194, 164, 120, 0.15);
  border: 1px solid rgba(194, 164, 120, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors?.secondary || '#C2A478'};
  flex-shrink: 0;
`;

const BannerTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', serif"};
  font-size: 1.25rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  letter-spacing: 0.02em;
  line-height: 1.2;
`;

const BannerText = styled.p`
  font-size: 0.82rem;
  line-height: 1.55;
  color: rgba(242, 236, 228, 0.82);
  margin: 0 0 18px 0;

  span.highlight {
    color: ${({ theme }) => theme.colors?.secondary || '#C2A478'};
    font-weight: 500;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MainButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;

const BaseButton = styled.button`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  padding: 10px 14px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  text-decoration: none;
  box-sizing: border-box;

  &:active {
    transform: scale(0.98);
  }
`;

const AcceptAllButton = styled(BaseButton)`
  background: ${({ theme }) => theme.colors?.secondary || '#C2A478'};
  color: #230f19;
  border: 1px solid ${({ theme }) => theme.colors?.secondary || '#C2A478'};

  &:hover {
    background: #d8bc93;
    border-color: #d8bc93;
    box-shadow: 0 4px 12px rgba(194, 164, 120, 0.3);
  }
`;

const RejectButton = styled(BaseButton)`
  background: rgba(255, 255, 255, 0.06);
  color: rgb(242, 236, 228);
  border: 1px solid rgba(255, 255, 255, 0.16);

  &:hover {
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(255, 255, 255, 0.3);
    color: #ffffff;
  }
`;

const CustomizeButton = styled(BaseButton)`
  background: transparent;
  color: ${({ theme }) => theme.colors?.secondary || '#C2A478'};
  border: 1px dashed rgba(194, 164, 120, 0.4);
  font-weight: 500;
  padding: 8px 12px;

  &:hover {
    background: rgba(194, 164, 120, 0.08);
    border-color: ${({ theme }) => theme.colors?.secondary || '#C2A478'};
  }
`;

const FooterNote = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 0.7rem;
  color: rgba(242, 236, 228, 0.55);

  .compliance-tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: rgba(194, 164, 120, 0.85);
  }
`;

const CookieBanner = () => {
  const {
    isBannerVisible,
    acceptAll,
    rejectNonEssential,
    openPreferencesModal,
  } = useCookieConsent();

  return (
    <AnimatePresence>
      {isBannerVisible && (
        <BannerWrapper
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 25, scale: 0.96 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-label="Gestión de cookies"
        >
          <BannerHeader>
            <IconBadge>
              <Cookie size={20} />
            </IconBadge>
            <div>
              <BannerTitle>Gestión de Cookies</BannerTitle>
            </div>
          </BannerHeader>

          <BannerText>
            En <span className="highlight">Bodega Santa Catarina</span> respetamos tu privacidad. 
            Utilizamos cookies técnicas necesarias para el correcto funcionamiento del portal, 
            y cookies analíticas y de preferencias opcionales para ofrecerte una experiencia enológica 
            adaptada a tus intereses bajo las normativas del RGPD en la UE.
          </BannerText>

          <ButtonRow>
            <MainButtons>
              <AcceptAllButton onClick={acceptAll} title="Aceptar todas las cookies">
                <Check size={16} />
                Aceptar todas
              </AcceptAllButton>
              <RejectButton onClick={rejectNonEssential} title="Rechazar cookies opcionales">
                <X size={16} />
                Solo necesarias
              </RejectButton>
            </MainButtons>

            <CustomizeButton onClick={openPreferencesModal} title="Configurar cookies">
              <SlidersHorizontal size={14} />
              Configurar preferencias
            </CustomizeButton>
          </ButtonRow>

          <FooterNote>
            <span className="compliance-tag">
              <ShieldCheck size={13} /> Conforme RGPD / ePrivacy UE
            </span>
            <span>Puedes cambiar tu elección en cualquier momento</span>
          </FooterNote>
        </BannerWrapper>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
