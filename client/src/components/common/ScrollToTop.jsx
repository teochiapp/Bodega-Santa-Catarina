/* eslint-disable react-refresh/only-export-components */
import { useEffect } from 'react';
import { useLocation, Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowUp } from 'lucide-react';
import { scrollToTop, scrollToElement } from '../../utils/scroll';

export { scrollToTop, scrollToElement };

/**
 * Componente ScrollToTop global para React Router.
 * Se monta dentro del <Router> y escucha los cambios de ruta (pathname y hash).
 * Al cambiar de página, desplaza suavemente la ventana hacia arriba.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Si la navegación incluye un ancla (#seccion), desplazarse suavemente hasta ella
    if (hash) {
      const targetId = hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    // Al cambiar de página, ejecutar el scroll suave a la parte superior
    const frameId = requestAnimationFrame(() => {
      scrollToTop(true);
    });

    return () => cancelAnimationFrame(frameId);
  }, [pathname, hash]);

  return null;
};

/**
 * Enlace con comportamiento de scroll suave garantizado.
 * Si el usuario pulsa un enlace que apunta a la página actual (por ejemplo, desde el Footer),
 * realiza el scroll suave hacia arriba en lugar de no hacer nada.
 */
export const ScrollLink = ({ to, onClick, children, ...props }) => {
  const location = useLocation();

  const handleClick = (e) => {
    if (onClick) onClick(e);

    // Si ya estamos en la misma ruta, React Router no dispara cambio de pathname,
    // por lo que realizamos el scroll al tope manualmente.
    if (location.pathname === to) {
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

    if (location.pathname === to) {
      scrollToTop(true);
    }
  };

  return (
    <NavLink to={to} onClick={handleClick} {...props}>
      {children}
    </NavLink>
  );
};

// ── Botón reutilizable para volver arriba (útil en Footer o flotante) ─────────

const BackToTopBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  color: ${({ theme }) => theme.colors.textMuted || 'rgba(255, 255, 255, 0.7)'};
  border: 1px solid ${({ theme }) => theme.colors.border || 'rgba(255, 255, 255, 0.2)'};
  border-radius: 4px;
  padding: 8px 14px;
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 200ms ease;

  &:hover {
    color: #ffffff;
    border-color: ${({ theme }) => theme.colors.secondary || '#CBA052'};
    background: rgba(203, 160, 82, 0.15);
    transform: translateY(-2px);
  }

  svg {
    transition: transform 200ms ease;
  }

  &:hover svg {
    transform: translateY(-2px);
  }
`;

export const BackToTopButton = ({ label = 'Volver arriba', className, style }) => {
  return (
    <BackToTopBtn
      type="button"
      onClick={() => scrollToTop(true)}
      className={className}
      style={style}
      aria-label="Volver al principio de la página"
    >
      <ArrowUp size={14} strokeWidth={2} />
      <span>{label}</span>
    </BackToTopBtn>
  );
};

export default ScrollToTop;
