import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShieldCheck,
  Check,
  ChevronDown,
  ChevronUp,
  Info,
  Lock,
} from 'lucide-react';
import { useCookieConsent, COOKIE_CATEGORIES } from '../../context/CookieContext';

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(14, 5, 10, 0.78);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
`;

const ModalCard = styled(motion.div)`
  background: #200d17;
  border: 1px solid rgba(194, 164, 120, 0.35);
  border-radius: 20px;
  width: 100%;
  max-width: 680px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.05) inset;
  color: rgb(242, 236, 228);
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  overflow: hidden;
  box-sizing: border-box;

  @media (max-width: 640px) {
    max-height: 95vh;
    border-radius: 16px;
  }
`;

const ModalHeader = styled.div`
  padding: 24px 28px 18px 28px;
  border-bottom: 1px solid rgba(194, 164, 120, 0.18);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  background: rgba(35, 15, 25, 0.5);

  @media (max-width: 640px) {
    padding: 18px 20px 14px 20px;
  }
`;

const HeaderTitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ShieldIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(194, 164, 120, 0.15);
  border: 1px solid rgba(194, 164, 120, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors?.secondary || '#C2A478'};
  flex-shrink: 0;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', serif"};
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 2px 0;
  letter-spacing: 0.02em;

  @media (max-width: 640px) {
    font-size: 1.25rem;
  }
`;

const Subtitle = styled.p`
  font-size: 0.78rem;
  color: rgba(242, 236, 228, 0.65);
  margin: 0;
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgb(242, 236, 228);
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    color: #ffffff;
    transform: rotate(90deg);
  }
`;

const ModalContent = styled.div`
  padding: 22px 28px;
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;

  /* Scrollbar estilizado elegante */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(194, 164, 120, 0.3);
    border-radius: 3px;
  }

  @media (max-width: 640px) {
    padding: 16px 18px;
    gap: 12px;
  }
`;

const IntroBox = styled.div`
  background: rgba(194, 164, 120, 0.08);
  border: 1px solid rgba(194, 164, 120, 0.22);
  border-radius: 12px;
  padding: 14px 16px;
  font-size: 0.8rem;
  line-height: 1.55;
  color: rgba(242, 236, 228, 0.85);

  strong {
    color: ${({ theme }) => theme.colors?.secondary || '#C2A478'};
  }
`;

const CategoryCard = styled.div`
  background: rgba(35, 15, 25, 0.45);
  border: 1px solid ${({ $active }) => ($active ? 'rgba(194, 164, 120, 0.45)' : 'rgba(255, 255, 255, 0.08)')};
  border-radius: 14px;
  padding: 16px 18px;
  transition: all 0.2s ease;

  &:hover {
    border-color: rgba(194, 164, 120, 0.35);
  }
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
`;

const CategoryInfo = styled.div`
  flex: 1;
`;

const CategoryTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`;

const CategoryName = styled.h4`
  font-size: 0.95rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  letter-spacing: 0.01em;
`;

const CategoryBadge = styled.span`
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 3px 8px;
  border-radius: 6px;
  background: ${({ $type }) =>
    $type === 'required' ? 'rgba(56, 142, 60, 0.2)' : 'rgba(194, 164, 120, 0.15)'};
  color: ${({ $type }) => ($type === 'required' ? '#81c784' : '#C2A478')};
  border: 1px solid
    ${({ $type }) => ($type === 'required' ? 'rgba(56, 142, 60, 0.4)' : 'rgba(194, 164, 120, 0.3)')};
  display: inline-flex;
  align-items: center;
  gap: 4px;
`;

const CategoryDescription = styled.p`
  font-size: 0.78rem;
  line-height: 1.5;
  color: rgba(242, 236, 228, 0.75);
  margin: 6px 0 0 0;
`;

/* Toggle Switch RGPD */
const SwitchContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 46px;
  height: 26px;
  flex-shrink: 0;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.75 : 1)};
`;

const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: ${({ theme }) => theme.colors?.secondary || '#C2A478'};
  }

  &:focus + span {
    box-shadow: 0 0 0 2px rgba(194, 164, 120, 0.4);
  }

  &:checked + span:before {
    transform: translateX(20px);
    background-color: #230f19;
  }
`;

const SwitchSlider = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  border-radius: 34px;

  &:before {
    position: absolute;
    content: '';
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: #ffffff;
    transition: 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    border-radius: 50%;
  }
`;

const DetailsToggle = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors?.secondary || '#C2A478'};
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  padding: 8px 0 0 0;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    text-decoration: underline;
  }
`;

const DetailsBox = styled(motion.div)`
  margin-top: 10px;
  padding: 10px 12px;
  background: rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  font-size: 0.72rem;
  color: rgba(242, 236, 228, 0.7);

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 4px;

    th {
      text-align: left;
      color: ${({ theme }) => theme.colors?.secondary || '#C2A478'};
      padding: 4px 6px;
      font-weight: 600;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    td {
      padding: 6px 6px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    }
  }
`;

const ModalFooter = styled.div`
  padding: 18px 28px;
  border-top: 1px solid rgba(194, 164, 120, 0.18);
  background: rgba(35, 15, 25, 0.65);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    padding: 16px 18px;
    flex-direction: column-reverse;
    gap: 8px;
  }
`;

const FooterButtonsGroup = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  justify-content: flex-end;

  @media (max-width: 640px) {
    flex-direction: column;
    width: 100%;
  }
`;

const ActionButton = styled.button`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', sans-serif"};
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  padding: 10px 16px;
  border-radius: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  box-sizing: border-box;

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 640px) {
    width: 100%;
    padding: 11px 16px;
  }
`;

const PrimaryButton = styled(ActionButton)`
  background: ${({ theme }) => theme.colors?.secondary || '#C2A478'};
  color: #230f19;
  border: 1px solid ${({ theme }) => theme.colors?.secondary || '#C2A478'};

  &:hover {
    background: #d8bc93;
    border-color: #d8bc93;
    box-shadow: 0 4px 12px rgba(194, 164, 120, 0.35);
  }
`;

const SecondaryButton = styled(ActionButton)`
  background: rgba(255, 255, 255, 0.08);
  color: rgb(242, 236, 228);
  border: 1px solid rgba(255, 255, 255, 0.18);

  &:hover {
    background: rgba(255, 255, 255, 0.14);
    color: #ffffff;
  }
`;

const SaveButton = styled(ActionButton)`
  background: transparent;
  color: ${({ theme }) => theme.colors?.secondary || '#C2A478'};
  border: 1px solid rgba(194, 164, 120, 0.5);

  &:hover {
    background: rgba(194, 164, 120, 0.12);
    border-color: ${({ theme }) => theme.colors?.secondary || '#C2A478'};
  }
`;

const CookieModal = () => {
  const {
    isModalOpen,
    closePreferencesModal,
    consent,
    acceptAll,
    rejectNonEssential,
    saveCustomPreferences,
  } = useCookieConsent();

  // Estado local para los toggles del modal
  const [preferences, setPreferences] = useState({
    [COOKIE_CATEGORIES.ANALYTICS]: false,
    [COOKIE_CATEGORIES.PREFERENCES]: false,
    [COOKIE_CATEGORIES.MARKETING]: false,
  });

  // Control de detalles desplegables por categoría
  const [openDetails, setOpenDetails] = useState({
    necessary: false,
    analytics: false,
    preferences: false,
    marketing: false,
  });

  // Al abrirse, sincronizar estado local con el consentimiento actual si existe
  useEffect(() => {
    if (consent) {
      setPreferences({
        [COOKIE_CATEGORIES.ANALYTICS]: Boolean(consent[COOKIE_CATEGORIES.ANALYTICS]),
        [COOKIE_CATEGORIES.PREFERENCES]: Boolean(consent[COOKIE_CATEGORIES.PREFERENCES]),
        [COOKIE_CATEGORIES.MARKETING]: Boolean(consent[COOKIE_CATEGORIES.MARKETING]),
      });
    }
  }, [consent, isModalOpen]);

  // Cerrar al pulsar Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closePreferencesModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, closePreferencesModal]);

  // Evitar scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const toggleCategory = (category) => {
    setPreferences((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const toggleDetails = (category) => {
    setOpenDetails((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSavePreferences = () => {
    saveCustomPreferences(preferences);
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={closePreferencesModal}
        >
          <ModalCard
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-modal-title"
          >
            {/* Header */}
            <ModalHeader>
              <HeaderTitleGroup>
                <ShieldIcon>
                  <ShieldCheck size={22} />
                </ShieldIcon>
                <div>
                  <Title id="cookie-modal-title">Preferencias de Cookies</Title>
                  <Subtitle>Bodega Santa Catarina — Mallorca</Subtitle>
                </div>
              </HeaderTitleGroup>
              <CloseButton onClick={closePreferencesModal} aria-label="Cerrar modal">
                <X size={18} />
              </CloseButton>
            </ModalHeader>

            {/* Contenido / Categorías */}
            <ModalContent>
              <IntroBox>
                <strong>Cumplimiento RGPD & ePrivacy UE:</strong> Te ofrecemos control total y transparente sobre las cookies. 
                Puedes activar o desactivar cada categoría opcional de forma individual. Tu decisión quedará guardada de forma segura 
                y podrás modificarla en cualquier momento desde el enlace en el pie de página o el icono inferior.
              </IntroBox>

              {/* 1. Técnicas / Necesarias */}
              <CategoryCard $active={true}>
                <CategoryHeader>
                  <CategoryInfo>
                    <CategoryTitleRow>
                      <CategoryName>Cookies Técnicas y Obligatorias</CategoryName>
                      <CategoryBadge $type="required">
                        <Lock size={10} /> Siempre activas
                      </CategoryBadge>
                    </CategoryTitleRow>
                    <CategoryDescription>
                      Son indispensables para la navegación y el funcionamiento seguro de la tienda y la plataforma (sesiones de usuario, gestión de reservas, protección contra fraudes y recuerdo de tus preferencias de privacidad). No almacenan información de identificación personal para fines publicitarios.
                    </CategoryDescription>
                    <DetailsToggle onClick={() => toggleDetails('necessary')} type="button">
                      <Info size={12} />
                      {openDetails.necessary ? 'Ocultar detalles' : 'Ver cookies técnicas'}
                      {openDetails.necessary ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    </DetailsToggle>
                  </CategoryInfo>

                  <SwitchContainer $disabled={true} title="Las cookies necesarias no pueden desactivarse">
                    <SwitchInput type="checkbox" checked={true} disabled readOnly />
                    <SwitchSlider />
                  </SwitchContainer>
                </CategoryHeader>

                {openDetails.necessary && (
                  <DetailsBox
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <table>
                      <thead>
                        <tr>
                          <th>Cookie</th>
                          <th>Proveedor</th>
                          <th>Propósito</th>
                          <th>Caducidad</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><code>bodega_sc_cookie_consent_v1</code></td>
                          <td>Propia</td>
                          <td>Guarda la configuración de cookies del usuario</td>
                          <td>1 año</td>
                        </tr>
                        <tr>
                          <td><code>token</code></td>
                          <td>Propia</td>
                          <td>Seguridad de autenticación y sesión administrativa</td>
                          <td>Sesión</td>
                        </tr>
                      </tbody>
                    </table>
                  </DetailsBox>
                )}
              </CategoryCard>

              {/* 2. Analíticas */}
              <CategoryCard $active={preferences[COOKIE_CATEGORIES.ANALYTICS]}>
                <CategoryHeader>
                  <CategoryInfo>
                    <CategoryTitleRow>
                      <CategoryName>Cookies Analíticas y Estadísticas</CategoryName>
                      <CategoryBadge $type="optional">Opcional</CategoryBadge>
                    </CategoryTitleRow>
                    <CategoryDescription>
                      Nos permiten cuantificar de forma agregada y anónima el tráfico, las fuentes de visitas y los apartados más visitados de la bodega (como nuestras experiencias de catas y fichas de vinos). Esto nos ayuda a optimizar los tiempos de carga y la experiencia de navegación.
                    </CategoryDescription>
                    <DetailsToggle onClick={() => toggleDetails('analytics')} type="button">
                      <Info size={12} />
                      {openDetails.analytics ? 'Ocultar detalles' : 'Ver cookies analíticas'}
                      {openDetails.analytics ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    </DetailsToggle>
                  </CategoryInfo>

                  <SwitchContainer>
                    <SwitchInput
                      type="checkbox"
                      checked={preferences[COOKIE_CATEGORIES.ANALYTICS]}
                      onChange={() => toggleCategory(COOKIE_CATEGORIES.ANALYTICS)}
                      id="cookie-toggle-analytics"
                    />
                    <SwitchSlider />
                  </SwitchContainer>
                </CategoryHeader>

                {openDetails.analytics && (
                  <DetailsBox
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <table>
                      <thead>
                        <tr>
                          <th>Cookie</th>
                          <th>Proveedor</th>
                          <th>Propósito</th>
                          <th>Caducidad</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><code>_ga</code>, <code>_gid</code></td>
                          <td>Google Analytics (anónimo)</td>
                          <td>Métricas de visitas con IP anonimizada</td>
                          <td>1 a 2 años</td>
                        </tr>
                      </tbody>
                    </table>
                  </DetailsBox>
                )}
              </CategoryCard>

              {/* 3. Preferencias */}
              <CategoryCard $active={preferences[COOKIE_CATEGORIES.PREFERENCES]}>
                <CategoryHeader>
                  <CategoryInfo>
                    <CategoryTitleRow>
                      <CategoryName>Cookies de Preferencias y Funcionalidad</CategoryName>
                      <CategoryBadge $type="optional">Opcional</CategoryBadge>
                    </CategoryTitleRow>
                    <CategoryDescription>
                      Permiten a la web recordar datos que modifican la forma en que el sitio se comporta o se muestra para cada usuario, tales como la selección de idioma, filtros aplicados en el catálogo de vinos o preferencias de visualización.
                    </CategoryDescription>
                  </CategoryInfo>

                  <SwitchContainer>
                    <SwitchInput
                      type="checkbox"
                      checked={preferences[COOKIE_CATEGORIES.PREFERENCES]}
                      onChange={() => toggleCategory(COOKIE_CATEGORIES.PREFERENCES)}
                      id="cookie-toggle-preferences"
                    />
                    <SwitchSlider />
                  </SwitchContainer>
                </CategoryHeader>
              </CategoryCard>

              {/* 4. Publicitarias / Marketing */}
              <CategoryCard $active={preferences[COOKIE_CATEGORIES.MARKETING]}>
                <CategoryHeader>
                  <CategoryInfo>
                    <CategoryTitleRow>
                      <CategoryName>Cookies de Marketing y Publicidad</CategoryName>
                      <CategoryBadge $type="optional">Opcional</CategoryBadge>
                    </CategoryTitleRow>
                    <CategoryDescription>
                      Se utilizan para mostrar contenidos, promociones de eventos y novedades sobre nuestras cosechas que resulten verdaderamente relevantes para el visitante, previniendo publicidad irrelevante o repetitiva.
                    </CategoryDescription>
                  </CategoryInfo>

                  <SwitchContainer>
                    <SwitchInput
                      type="checkbox"
                      checked={preferences[COOKIE_CATEGORIES.MARKETING]}
                      onChange={() => toggleCategory(COOKIE_CATEGORIES.MARKETING)}
                      id="cookie-toggle-marketing"
                    />
                    <SwitchSlider />
                  </SwitchContainer>
                </CategoryHeader>
              </CategoryCard>
            </ModalContent>

            {/* Footer con acciones */}
            <ModalFooter>
              <SaveButton onClick={handleSavePreferences} title="Guardar opciones marcadas">
                Guardar selección
              </SaveButton>

              <FooterButtonsGroup>
                <SecondaryButton onClick={rejectNonEssential} title="Rechazar cookies opcionales">
                  Rechazar no necesarias
                </SecondaryButton>
                <PrimaryButton onClick={acceptAll} title="Aceptar todas las cookies">
                  <Check size={16} />
                  Aceptar todas
                </PrimaryButton>
              </FooterButtonsGroup>
            </ModalFooter>
          </ModalCard>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default CookieModal;
