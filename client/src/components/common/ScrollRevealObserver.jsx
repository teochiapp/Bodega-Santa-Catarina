import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const EXCLUDED_SELECTOR = [
  '[data-no-scroll-reveal]',
  '[role="dialog"]',
  '[aria-modal="true"]',
  '.mallorca-map-popup',
  '.world-map-popup',
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
    sectionEl.querySelector(
      '.bodega-content-section, .bodega-chronology, .event-space-standard, .event-categories-grid'
    )
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

    const cleanupTimers = new Map();

    const markDone = (el) => {
      const prevTimer = cleanupTimers.get(el);
      if (prevTimer) {
        window.clearTimeout(prevTimer);
        cleanupTimers.delete(el);
      }
      if (el && el.dataset.scReveal && el.dataset.scReveal !== 'done') {
        el.dataset.scReveal = 'done';
        el.style.removeProperty('--sc-reveal-delay');
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          io.unobserve(el);

          if (el.dataset.scReveal !== 'pending') return;
          el.dataset.scReveal = 'visible';

          const handleEnd = (ev) => {
            if (ev.target !== el) return;
            el.removeEventListener('animationend', handleEnd);
            markDone(el);
          };

          el.addEventListener('animationend', handleEnd);

          const delayMs = parseInt(el.dataset.revealDelay || '0', 10) || 0;
          const timerId = window.setTimeout(() => {
            el.removeEventListener('animationend', handleEnd);
            markDone(el);
          }, 980 + delayMs);
          cleanupTimers.set(el, timerId);
        });
      },
      {
        threshold: 0.02,
        rootMargin: '0px 0px -38px 0px',
      }
    );

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
      io.observe(el);
    };

    const scanTargets = () => {
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
        if (sec.dataset.scReveal) return;
        if (isExcludedElement(sec)) return;
        if (hasInnerAnimatedContent(sec)) return;
        registerElement(sec, 0);
      });
    };

    // Escaneo inicial tras el pintado de la ruta
    let rafId = window.requestAnimationFrame(scanTargets);

    // Observar contenido asíncrono (catas, vinos, tarjetas, menús, blog, cambios de pestaña)
    let mutationScheduled = false;
    const mo = new MutationObserver(() => {
      if (mutationScheduled) return;
      mutationScheduled = true;
      rafId = window.requestAnimationFrame(() => {
        mutationScheduled = false;
        scanTargets();
      });
    });

    mo.observe(root, { childList: true, subtree: true });

    return () => {
      window.cancelAnimationFrame(rafId);
      mo.disconnect();
      io.disconnect();
      cleanupTimers.forEach((timerId) => window.clearTimeout(timerId));
      cleanupTimers.clear();
    };
  }, [containerRef, location.pathname, location.search, location.hash]);

  return null;
};

export default ScrollRevealObserver;
