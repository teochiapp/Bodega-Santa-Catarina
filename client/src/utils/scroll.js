/**
 * Utilidades para desplazamiento suave (smooth scroll) en la aplicación.
 */

/**
 * Realiza un scroll suave hacia una posición Y específica con una curva cúbica fluida.
 * @param {number} targetY - Posición Y destino en píxeles.
 * @param {number} duration - Duración de la animación en milisegundos (por defecto 700ms).
 */
export const smoothScrollTo = (targetY, duration = 700) => {
  if (typeof window === 'undefined') return;

  const startY = window.pageYOffset || window.scrollY || 0;
  const distance = targetY - startY;
  if (Math.abs(distance) < 2) return;

  let startTime = null;

  // Curva cúbica easeInOut para una aceleración y desaceleración orgánica y elegante
  const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const animationStep = (currentTime) => {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const ease = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * ease);

    if (timeElapsed < duration) {
      window.requestAnimationFrame(animationStep);
    }
  };

  window.requestAnimationFrame(animationStep);
};

/**
 * Realiza un scroll suave hacia la parte superior de la ventana (0, 0).
 * @param {boolean} smooth - true para animación suave, false para instantáneo.
 * @param {number} duration - Duración en milisegundos si es suave.
 */
export const scrollToTop = (smooth = true, duration = 650) => {
  if (typeof window === 'undefined') return;

  if (!smooth) {
    window.scrollTo(0, 0);
    return;
  }
  smoothScrollTo(0, duration);
};

/**
 * Realiza un scroll suave hacia un elemento específico por su id.
 * @param {string} elementId - ID del elemento en el DOM.
 * @param {number} offset - Compensación del header fijo (por defecto 110px).
 * @param {number} duration - Duración de la animación (por defecto 700ms).
 */
export const scrollToElement = (elementId, offset = 110, duration = 700) => {
  if (typeof document === 'undefined') return;
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    smoothScrollTo(offsetPosition, duration);
  }
};
