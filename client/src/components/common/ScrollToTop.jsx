import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowUp } from 'lucide-react';
import { instantScrollToTop, scrollToTop, smoothScrollTo } from '../../utils/scroll';

/**
 * Componente ScrollToTop global para React Router.
 * Se monta dentro del <Router> antes de <Routes> y gestiona los cambios de ruta:
 * - En cambios de página (SPA), reposiciona la ventana en (0, 0) de forma síncrona
 *   en useLayoutEffect (antes del pintado y antes de que Framer Motion / IntersectionObserver
 *   evalúen la visibilidad de las secciones), replicando el comportamiento exacto de una recarga.
 * - Si la navegación incluye un ancla (#seccion), desplaza suavemente hacia el destino
 *   respetando la altura del header fijo.
 */
const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();
  const prevRouteRef = useRef(`${pathname}${search}`);

  useLayoutEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useLayoutEffect(() => {
    const currentRoute = `${pathname}${search}`;
    const didRouteChange = prevRouteRef.current !== currentRoute;
    prevRouteRef.current = currentRoute;

    // Si la navegación incluye un ancla (#seccion), desplazarse al objetivo respetando el header
    if (hash) {
      if (didRouteChange) {
        instantScrollToTop();
      }

      const rawId = hash.replace(/^#/, '');
      let targetId = rawId;
      try {
        targetId = decodeURIComponent(rawId);
      } catch {
        targetId = rawId;
      }

      const scrollToTarget = () => {
        const element = document.getElementById(targetId);
        if (element) {
          const headerOffset = 110;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          smoothScrollTo(Math.max(0, offsetPosition), 700);
          return true;
        }
        return false;
      };

      if (!scrollToTarget()) {
        const timer1 = window.setTimeout(scrollToTarget, 80);
        const timer2 = window.setTimeout(scrollToTarget, 250);
        const timer3 = window.setTimeout(scrollToTarget, 550);
        return () => {
          window.clearTimeout(timer1);
          window.clearTimeout(timer2);
          window.clearTimeout(timer3);
        };
      }
      return undefined;
    }

    // Cambio de ruta SPA sin hash: reset síncrono a (0, 0) antes del primer pintado
    instantScrollToTop();

    const frameId = window.requestAnimationFrame(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [pathname, search, hash]);

  return null;
};

/**
 * Enlace con comportamiento de scroll suave garantizado.
 * Si el usuario pulsa un enlace con ancla (#seccion) en la ruta actual o un enlace a la misma página,
 * realiza el scroll suave animado hacia el elemento o arriba. En cambio de ruta distinta,
 * delega el posicionamiento instantáneo a ScrollToTop.
 */
export const ScrollLink = ({ to, onClick, children, ...props }) => {
  const location = useLocation();

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (e.defaultPrevented) return;

    if (typeof to === 'string' && to.includes('#')) {
      const [pathPart, hashPart] = to.split('#');
      const isSamePath = !pathPart || location.pathname === pathPart;
      if (isSamePath && hashPart) {
        const el = document.getElementById(hashPart);
        if (el) {
          const headerOffset = 110;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          smoothScrollTo(Math.max(0, offsetPosition), 700);
        }
      }
    } else if (location.pathname === to && !location.hash) {
      scrollToTop(true, 550);
    }
  };

  return (
    <Link to={to} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};

/**
 * NavLink con comportamiento de scroll suave garantizado para menús de navegación.
 */
export const ScrollNavLink = ({ to, onClick, children, ...props }) => {
  const location = useLocation();

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (e.defaultPrevented) return;

    if (typeof to === 'string' && to.includes('#')) {
      const [pathPart, hashPart] = to.split('#');
      const isSamePath = !pathPart || location.pathname === pathPart;
      if (isSamePath && hashPart) {
        const el = document.getElementById(hashPart);
        if (el) {
          const headerOffset = 110;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          smoothScrollTo(Math.max(0, offsetPosition), 700);
        }
      }
    } else if (location.pathname === to && !location.hash) {
      scrollToTop(true, 550);
    }
  };

  return (
    <NavLink to={to} onClick={handleClick} {...props}>
      {children}
    </NavLink>
  );
};

// ── Botón flotante redondo para volver arriba (esquina inferior derecha) ─────

const FloatingBtn = styled.button`
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 999;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary || 'rgb(80, 43, 58)'};
  color: ${({ theme }) => theme.colors.background || 'rgb(242, 236, 228)'};
  border: 1px solid rgba(194, 164, 120, 0.45);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.28);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  transform: ${({ $visible }) => ($visible ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.85)')};
  transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              visibility 0.3s cubic-bezier(0.16, 1, 0.3, 1),
              background 0.25s ease,
              border-color 0.25s ease,
              box-shadow 0.25s ease;

  &:hover {
    background: #643547;
    border-color: rgb(194, 164, 120);
    color: #ffffff;
    transform: ${({ $visible }) => ($visible ? 'translateY(-3px) scale(1.08)' : 'translateY(16px) scale(0.85)')};
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  }

  &:active {
    transform: translateY(0) scale(0.96);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints?.mobile || '576px'}) {
    width: 42px;
    height: 42px;
    bottom: 20px;
    right: 20px;
  }
`;

export const BackToTopButton = ({ className, style }) => {
  const [visible, setVisible] = useState(() =>
    typeof window !== 'undefined' ? window.scrollY > 300 : false
  );

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <FloatingBtn
      type="button"
      $visible={visible}
      onClick={() => scrollToTop(true)}
      className={className}
      style={style}
      aria-label="Subir al inicio"
      title="Subir al inicio"
    >
      <ArrowUp size={20} strokeWidth={2.2} />
    </FloatingBtn>
  );
};

export default ScrollToTop;
