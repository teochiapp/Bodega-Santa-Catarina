import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const EXCLUDED_SELECTOR = [
  'header',
  'nav',
  '[data-no-scroll-reveal]',
  '[role="dialog"]',
  '[aria-modal="true"]',
  '.mallorca-map-popup',
  '.world-map-popup',
].join(', ');

const FRAMER_SECTION_SELECTOR = [
  '.bodega-content-section',
  '.bodega-chronology',
  '.event-space-standard',
  '.event-categories-grid',
].join(', ');

const AUTO_SECTION_SELECTOR = [
  'main section',
  'main .event-page-introduction',
  'main .gama-header-reveal',
  'footer > div',
].join(', ');

function isExcludedElement(el) {
  if (!el || el.nodeType !== 1) return true;
  if (el.closest(EXCLUDED_SELECTOR)) return true;
  if (el.matches(FRAMER_SECTION_SELECTOR)) return true;

  // Respetar animaciones nativas existentes de Framer Motion (initial/whileInView)
  if (el.style?.opacity !== '' || el.style?.transform !== '') return true;

  return false;
}

function hasInnerAnimatedContent(sectionEl) {
  if (!sectionEl) return false;
  if (sectionEl.querySelector('[data-reveal], [data-reveal-group], [data-sc-reveal]')) {
    return true;
  }
  // Evitar animar un contenedor padre cuyos hijos directos ya usan Framer Motion whileInView
  if (
    sectionEl.matches(FRAMER_SECTION_SELECTOR) ||
    sectionEl.querySelector(FRAMER_SECTION_SELECTOR)
  ) {
    return true;
  }
  if (sectionEl.querySelector('[style*="opacity"], [style*="transform"]')) {
    return true;
  }
  return false;
}

const ScrollRevealObserver = ({ containerRef }) => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReducedMotion) {
      return undefined;
    }

    const root = containerRef?.current;
    if (!root) return undefined;

    const trackedElements = new Set();
    const cleanupTimers = new Map();
    const endListeners = new Map();

    let scanRafId = null;
    let mutationRafId = null;
    let fallbackRafId = null;

    const clearTransitionCleanup = (el) => {
      const prevTimer = cleanupTimers.get(el);
      if (prevTimer) {
        window.clearTimeout(prevTimer);
        cleanupTimers.delete(el);
      }
      const prevListener = endListeners.get(el);
      if (prevListener && el) {
        el.removeEventListener('transitionend', prevListener);
        endListeners.delete(el);
      }
    };

    const markDone = (el) => {
      clearTransitionCleanup(el);
      if (el && el.dataset.scReveal && el.dataset.scReveal !== 'done') {
        el.dataset.scReveal = 'done';
        el.style.removeProperty('--sc-reveal-delay');
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          revealElement(entry.target);
        });
      },
      {
        threshold: 0,
        rootMargin: '0px 0px -28px 0px',
      }
    );

    const releasePendingElement = (el) => {
      clearTransitionCleanup(el);
      io.unobserve(el);
      trackedElements.delete(el);
      if (el && el.dataset.scReveal === 'pending') {
        delete el.dataset.scReveal;
        el.style.removeProperty('--sc-reveal-delay');
      }
    };

    function revealElement(el) {
      if (!el || el.dataset.scReveal !== 'pending') return;
      io.unobserve(el);
      el.dataset.scReveal = 'visible';

      const handleEnd = (ev) => {
        if (ev.target !== el || ev.propertyName !== 'opacity') return;
        markDone(el);
      };

      el.addEventListener('transitionend', handleEnd);
      endListeners.set(el, handleEnd);

      const delayMs = parseInt(el.dataset.revealDelay || '0', 10) || 0;
      const timerId = window.setTimeout(() => {
        markDone(el);
      }, 860 + delayMs);
      cleanupTimers.set(el, timerId);
    }

    const checkViewportFallback = () => {
      fallbackRafId = null;
      const viewportH = window.innerHeight || document.documentElement.clientHeight || 0;
      if (!viewportH) return;

      trackedElements.forEach((el) => {
        if (!el.isConnected) {
          clearTransitionCleanup(el);
          trackedElements.delete(el);
          return;
        }
        if (el.dataset.scReveal !== 'pending') return;

        const rect = el.getBoundingClientRect();
        if (rect.width === 0 && rect.height === 0) return;

        // Si el elemento ya quedó por encima del scroll actual (p. ej. navegación con #ancla), mostrarlo sin bloqueo
        if (rect.bottom <= 0) {
          io.unobserve(el);
          markDone(el);
          return;
        }

        if (rect.top <= viewportH - 28 && rect.bottom > 0) {
          revealElement(el);
        }
      });
    };

    const scheduleViewportFallback = () => {
      if (fallbackRafId !== null) return;
      fallbackRafId = window.requestAnimationFrame(checkViewportFallback);
    };

    const registerElement = (el, delayMs = 0) => {
      if (!el || el.dataset.scReveal) return;
      if (isExcludedElement(el)) return;

      const explicitDelay = parseInt(el.dataset.revealDelay || '', 10);
      const finalDelay = Number.isFinite(explicitDelay) ? explicitDelay : delayMs;

      if (finalDelay > 0) {
        el.dataset.revealDelay = String(finalDelay);
        el.style.setProperty('--sc-reveal-delay', `${finalDelay}ms`);
      }

      el.dataset.scReveal = 'pending';
      trackedElements.add(el);
      io.observe(el);
    };

    const scanTargets = () => {
      scanRafId = null;

      // 1. Grupos escalonados (tarjetas, columnas, listados dinámicos)
      const groups = root.querySelectorAll('[data-reveal-group]');
      groups.forEach((groupEl) => {
        if (groupEl.closest(EXCLUDED_SELECTOR)) return;
        const stepMs = parseInt(groupEl.dataset.revealGroup || '80', 10) || 80;
        const variant = groupEl.dataset.revealGroupType || 'up';
        const maxCols = parseInt(groupEl.dataset.revealCols || '4', 10) || 4;

        Array.from(groupEl.children).forEach((child, idx) => {
          if (child.nodeType !== 1) return;
          if (child.tagName === 'SPAN' && child.getAttribute('aria-hidden') === 'true') return;
          if (!child.dataset.reveal) {
            child.dataset.reveal = variant;
          }
          const staggerDelay = (idx % maxCols) * stepMs;
          registerElement(child, staggerDelay);
        });
      });

      // 2. Elementos editoriales explícitos ([data-reveal])
      const explicitEls = root.querySelectorAll('[data-reveal]');
      explicitEls.forEach((el) => {
        registerElement(el, 0);
      });

      // 3. Secciones automáticas en todas las páginas que no tengan hijos animados propios
      const autoSections = root.querySelectorAll(AUTO_SECTION_SELECTOR);
      autoSections.forEach((sec) => {
        if (sec.dataset.scReveal === 'pending' && hasInnerAnimatedContent(sec)) {
          releasePendingElement(sec);
          return;
        }
        if (sec.dataset.scReveal) return;
        if (sec.children.length === 0) return;
        if (isExcludedElement(sec)) return;
        if (hasInnerAnimatedContent(sec)) return;
        registerElement(sec, 0);
      });

      // En el siguiente frame tras pintar 'pending', revelar suavemente lo que ya esté en viewport
      scheduleViewportFallback();
    };

    // Escaneo inicial tras el pintado de la ruta
    scanRafId = window.requestAnimationFrame(scanTargets);

    // Observar contenido asíncrono (catas, vinos, tarjetas, menús, blog, cambios de pestaña)
    const mo = new MutationObserver((mutations) => {
      if (mutationRafId !== null) return;
      const hasRelevant = mutations.some((m) => {
        const targetEl = m.target?.nodeType === 1 ? m.target : m.target?.parentElement;
        if (!targetEl) return false;
        return !targetEl.closest(EXCLUDED_SELECTOR);
      });
      if (!hasRelevant) return;

      mutationRafId = window.requestAnimationFrame(() => {
        mutationRafId = null;
        scanTargets();
      });
    });

    mo.observe(root, { childList: true, subtree: true });
    window.addEventListener('scroll', scheduleViewportFallback, { passive: true });
    window.addEventListener('resize', scheduleViewportFallback, { passive: true });

    return () => {
      if (scanRafId !== null) window.cancelAnimationFrame(scanRafId);
      if (mutationRafId !== null) window.cancelAnimationFrame(mutationRafId);
      if (fallbackRafId !== null) window.cancelAnimationFrame(fallbackRafId);
      window.removeEventListener('scroll', scheduleViewportFallback);
      window.removeEventListener('resize', scheduleViewportFallback);
      mo.disconnect();
      io.disconnect();

      cleanupTimers.forEach((timerId) => window.clearTimeout(timerId));
      cleanupTimers.clear();

      endListeners.forEach((listener, el) => {
        el.removeEventListener('transitionend', listener);
      });
      endListeners.clear();

      // Limpiar estados huérfanos en nodos persistentes (Footer, redirects o cambio de #hash)
      trackedElements.forEach((el) => {
        if (!el || !el.dataset) return;
        if (el.dataset.scReveal === 'pending') {
          delete el.dataset.scReveal;
          el.style.removeProperty('--sc-reveal-delay');
        } else if (el.dataset.scReveal === 'visible') {
          el.dataset.scReveal = 'done';
          el.style.removeProperty('--sc-reveal-delay');
        }
      });
      trackedElements.clear();
    };
  }, [containerRef, location.pathname, location.search, location.hash]);

  return null;
};

export default ScrollRevealObserver;
