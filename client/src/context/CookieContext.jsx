import { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_KEY = 'bodega_sc_cookie_consent_v1';

export const COOKIE_CATEGORIES = {
  NECESSARY: 'necessary',
  ANALYTICS: 'analytics',
  PREFERENCES: 'preferences',
  MARKETING: 'marketing',
};

const DEFAULT_PREFERENCES = {
  [COOKIE_CATEGORIES.NECESSARY]: true,
  [COOKIE_CATEGORIES.ANALYTICS]: false,
  [COOKIE_CATEGORIES.PREFERENCES]: false,
  [COOKIE_CATEGORIES.MARKETING]: false,
};

const CookieContext = createContext(null);

export const CookieProvider = ({ children }) => {
  const [consent, setConsent] = useState(null);
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Inicializar leyendo consentimiento almacenado
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setConsent(parsed);
        setIsBannerVisible(false);
      } else {
        // Si no hay consentimiento previo, mostrar banner tras un breve retardo para no saturar
        const timer = setTimeout(() => {
          setIsBannerVisible(true);
        }, 800);
        return () => clearTimeout(timer);
      }
    } catch {
      setIsBannerVisible(true);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  const saveConsentToStorage = (newPreferences) => {
    const payload = {
      ...newPreferences,
      necessary: true, // Siempre obligatoria por RGPD
      timestamp: new Date().toISOString(),
      version: '1.0',
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.warn('Error al guardar consentimiento de cookies en localStorage:', e);
    }

    setConsent(payload);
    setIsBannerVisible(false);
    setIsModalOpen(false);

    // Disparar evento personalizado para servicios externos (Google Analytics, Pixel, etc.)
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('santacatarina_cookie_consent_update', {
          detail: payload,
        })
      );
    }
  };

  const acceptAll = () => {
    saveConsentToStorage({
      necessary: true,
      analytics: true,
      preferences: true,
      marketing: true,
    });
  };

  const rejectNonEssential = () => {
    saveConsentToStorage({
      necessary: true,
      analytics: false,
      preferences: false,
      marketing: false,
    });
  };

  const saveCustomPreferences = (customSettings) => {
    saveConsentToStorage({
      necessary: true,
      analytics: Boolean(customSettings.analytics),
      preferences: Boolean(customSettings.preferences),
      marketing: Boolean(customSettings.marketing),
    });
  };

  const openPreferencesModal = () => {
    setIsModalOpen(true);
  };

  const closePreferencesModal = () => {
    setIsModalOpen(false);
  };

  const hasCategoryConsent = (category) => {
    if (category === COOKIE_CATEGORIES.NECESSARY) return true;
    if (!consent) return false;
    return Boolean(consent[category]);
  };

  return (
    <CookieContext.Provider
      value={{
        consent,
        hasConsented: Boolean(consent),
        isBannerVisible,
        isModalOpen,
        isInitialized,
        acceptAll,
        rejectNonEssential,
        saveCustomPreferences,
        openPreferencesModal,
        closePreferencesModal,
        hasCategoryConsent,
        defaultPreferences: DEFAULT_PREFERENCES,
      }}
    >
      {children}
    </CookieContext.Provider>
  );
};

export const useCookieConsent = () => {
  const ctx = useContext(CookieContext);
  if (!ctx) {
    throw new Error('useCookieConsent debe utilizarse dentro de un <CookieProvider>');
  }
  return ctx;
};

export default CookieContext;
