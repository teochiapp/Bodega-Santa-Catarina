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

// Sincronización oficial con Google Consent Mode v2 (RGPD UE / DMA)
const syncGoogleConsentMode = (preferences) => {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }

  if (!window.gtag) {
    window.gtag = gtag;
  }

  window.gtag('consent', 'update', {
    analytics_storage: preferences?.analytics ? 'granted' : 'denied',
    ad_storage: preferences?.marketing ? 'granted' : 'denied',
    ad_user_data: preferences?.marketing ? 'granted' : 'denied',
    ad_personalization: preferences?.marketing ? 'granted' : 'denied',
    functionality_storage: preferences?.preferences ? 'granted' : 'denied',
    personalization_storage: preferences?.preferences ? 'granted' : 'denied',
    security_storage: 'granted',
  });
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
        syncGoogleConsentMode(parsed);
      } else {
        // Enfoque estricto RGPD / Consent Mode v2: denegado por defecto hasta interacción
        syncGoogleConsentMode({
          analytics: false,
          marketing: false,
          preferences: false,
        });

        // Mostrar banner tras un breve retardo para no saturar
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

    // Actualizar señales para Google Analytics / Google Ads (Consent Mode v2)
    syncGoogleConsentMode(payload);

    // Disparar evento personalizado para servicios externos (Pixel, GTM, etc.)
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
