/**
 * Utilidades para desplazamiento suave (smooth scroll) en la aplicación.
 */

/**
 * Realiza un scroll suave hacia la parte superior de la ventana (0, 0).
 * @param {boolean} smooth - true para animación suave, false para instantáneo.
 */
export const scrollToTop = (smooth = true) => {
  if (typeof window === 'undefined') return;

  try {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: smooth ? 'smooth' : 'auto',
    });
  } catch {
    window.scrollTo(0, 0);
  }
};

/**
 * Realiza un scroll suave hacia un elemento específico por su id.
 * @param {string} elementId - ID del elemento en el DOM.
 * @param {boolean} smooth - true para animación suave.
 */
export const scrollToElement = (elementId, smooth = true) => {
  if (typeof document === 'undefined') return;
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
  }
};
