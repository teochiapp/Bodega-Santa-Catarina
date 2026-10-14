import { useState, useEffect } from 'react';
import { useLocation, Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowUp } from 'lucide-react';
import { scrollToTop } from '../../utils/scroll';

/**
 * Componente ScrollToTop global para React Router.
 * Se monta dentro del <Router> y escucha los cambios de ruta (pathname y hash).
 * Al cambiar de página, desplaza suavemente la ventana hacia arriba.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Si la navegación incluye un ancla (#seccion), desplazarse suavemente hasta ella respetando el alto del header
    if (hash) {
      const targetId = hash.replace('#', '');
      const scrollToTarget = () => {
        const element = document.getElementById(targetId);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
          return true;
        }
        return false;
      };

      if (!scrollToTarget()) {
        const timer1 = setTimeout(scrollToTarget, 100);
        const timer2 = setTimeout(scrollToTarget, 300);
        return () => {
          clearTimeout(timer1);
          clearTimeout(timer2);
        };
      }
      return;
    }

    // Al cambiar de página sin hash, ejecutar el scroll suave a la parte superior
    const frameId = requestAnimationFrame(() => {
      scrollToTop(true);
    });

    return () => cancelAnimationFrame(frameId);
  }, [pathname, hash]);

  return null;
};

/**
 * Enlace con comportamiento de scroll suave garantizado.
 * Si el usuario pulsa un enlace con ancla (#seccion) o a la página actual,
 * realiza el scroll suave hacia el elemento o arriba.
 */
export const ScrollLink = ({ to, onClick, children, ...props }) => {
  const location = useLocation();

  const handleClick = (e) => {
    if (onClick) onClick(e);

    if (typeof to === 'string' && to.includes('#')) {
      const [pathPart, hashPart] = to.split('#');
      const isSamePath = !pathPart || location.pathname === pathPart;
      if (isSamePath && hashPart) {
        const el = document.getElementById(hashPart);
        if (el) {
          const headerOffset = 100;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }
    } else if (location.pathname === to) {
      scrollToTop(true);
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

    if (typeof to === 'string' && to.includes('#')) {
      const [pathPart, hashPart] = to.split('#');
      const isSamePath = !pathPart || location.pathname === pathPart;
      if (isSamePath && hashPart) {
        const el = document.getElementById(hashPart);
        if (el) {
          const headerOffset = 100;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }
    } else if (location.pathname === to) {
      scrollToTop(true);
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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

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
