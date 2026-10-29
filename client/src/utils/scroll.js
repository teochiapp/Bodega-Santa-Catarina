/**
 * Utilidades para desplazamiento suave e instantáneo en Single Page Application (SPA).
 */

let activeScrollRafId = null;
let cleanupInterruptionListeners = null;

/**
 * Cancela cualquier desplazamiento programático en curso para no bloquear el scroll manual del usuario.
 */
export const cancelActiveScroll = () => {
  if (activeScrollRafId !== null && typeof window !== 'undefined') {
    window.cancelAnimationFrame(activeScrollRafId);
    activeScrollRafId = null;
  }
  if (cleanupInterruptionListeners) {
    cleanupInterruptionListeners();
    cleanupInterruptionListeners = null;
  }
};

/**
 * Sitúa la ventana en (0, 0) de forma síncrona e instantánea antes del pintado de una nueva ruta,
 * garantizando que IntersectionObserver y Framer Motion whileInView evalúen posiciones reales desde arriba.
 */
export const instantScrollToTop = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  cancelActiveScroll();

  const html = document.documentElement;
  const prevBehavior = html.style.scrollBehavior;
  html.style.scrollBehavior = 'auto';

  window.scrollTo(0, 0);
  html.scrollTop = 0;
  if (document.body) {
    document.body.scrollTop = 0;
  }

  html.style.scrollBehavior = prevBehavior;
};

/**
 * Realiza un scroll suave hacia una posición Y específica con una curva cúbica fluida,
 * cancelándose de inmediato si el usuario mueve la rueda o toca la pantalla.
 * @param {number} targetY - Posición Y destino en píxeles.
 * @param {number} duration - Duración de la animación en milisegundos (por defecto 650ms).
 */
export const smoothScrollTo = (targetY, duration = 650) => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  cancelActiveScroll();

  const startY = window.pageYOffset || window.scrollY || 0;
  const distance = targetY - startY;
  if (Math.abs(distance) < 2) return;

  const html = document.documentElement;
  const prevBehavior = html.style.scrollBehavior;
  html.style.scrollBehavior = 'auto';

  let startTime = null;
  let aborted = false;

  const restoreAndCleanup = () => {
    html.style.scrollBehavior = prevBehavior;
    window.removeEventListener('wheel', abortOnUserInput);
    window.removeEventListener('touchstart', abortOnUserInput);
    window.removeEventListener('keydown', abortOnKeyInput);
  };

  const abortOnUserInput = () => {
    aborted = true;
    cancelActiveScroll();
  };

  const abortOnKeyInput = (e) => {
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(e.key)) {
      abortOnUserInput();
    }
  };

  window.addEventListener('wheel', abortOnUserInput, { passive: true });
  window.addEventListener('touchstart', abortOnUserInput, { passive: true });
  window.addEventListener('keydown', abortOnKeyInput, { passive: true });
  cleanupInterruptionListeners = restoreAndCleanup;

  // Curva cúbica easeInOut para una aceleración y desaceleración orgánica y elegante
  const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const animationStep = (currentTime) => {
    if (aborted) return;
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * ease);

    if (progress < 1) {
      activeScrollRafId = window.requestAnimationFrame(animationStep);
    } else {
      activeScrollRafId = null;
      if (cleanupInterruptionListeners) {
        cleanupInterruptionListeners();
        cleanupInterruptionListeners = null;
      }
    }
  };

  activeScrollRafId = window.requestAnimationFrame(animationStep);
};

/**
 * Realiza un scroll hacia la parte superior de la ventana (0, 0).
 * @param {boolean} smooth - true para animación suave, false para instantáneo.
 * @param {number} duration - Duración en milisegundos si es suave.
 */
export const scrollToTop = (smooth = true, duration = 550) => {
  if (typeof window === 'undefined') return;

  if (!smooth) {
    instantScrollToTop();
    return;
  }
  smoothScrollTo(0, duration);
};

/**
 * Realiza un scroll suave hacia un elemento específico por su id.
 * @param {string} elementId - ID del elemento en el DOM.
 * @param {number} offset - Compensación del header fijo (por defecto 110px).
 * @param {number} duration - Duración de la animación (por defecto 650ms).
 */
export const scrollToElement = (elementId, offset = 110, duration = 650) => {
  if (typeof document === 'undefined' || typeof window === 'undefined') return;
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    smoothScrollTo(Math.max(0, offsetPosition), duration);
  }
};
