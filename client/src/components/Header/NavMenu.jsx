import { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { ScrollNavLink, ScrollLink } from '../common/ScrollToTop';
import { MENU_ITEMS } from './menuData';

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: nowrap;
  height: 100%;

  @media (max-width: 1280px) {
    gap: 2px;
  }

  @media (max-width: 1180px) {
    display: none; /* Se oculta en mobile/tablet, se usa MobileMenu */
  }
`;

const NavItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
`;

const NavLinkStyled = styled(ScrollNavLink)`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.2px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 10px;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.primary};
  opacity: ${({ $isActive }) => ($isActive ? '1' : '0.85')};
  transition: opacity 150ms ease;
  white-space: nowrap;
  text-transform: uppercase;
  text-decoration: none;

  @media (max-width: 1280px) {
    padding: 8px 7px;
    gap: 3px;
  }

  &:hover,
  &:focus-visible {
    opacity: 1;
    outline: none;
  }

  ${({ $isOpen }) =>
    $isOpen &&
    `
    opacity: 1;
  `}

  /* Línea dorada únicamente para la sección activa */
  &::after {
    content: '';
    position: absolute;
    width: ${({ $isActive }) => ($isActive ? '26px' : '0')};
    height: 2px;
    border-radius: 2px;
    background-color: ${({ theme }) => theme.colors.secondary};
    bottom: 2px;
    left: 50%;
    transform: translateX(-50%);
    transition: width 200ms ease-in-out;
  }
`;

const CaretIcon = styled.svg`
  width: 9px;
  height: 9px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
  transition: transform 200ms ease;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  opacity: 0.85;
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: calc(100% - 6px);
  left: 0;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 14px 34px rgba(80, 43, 58, 0.12), 0 4px 10px rgba(0, 0, 0, 0.04);
  min-width: 240px;
  padding: 6px 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

const DropdownLink = styled(ScrollLink)`
  display: block;
  padding: 10px 25px;
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.15px;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  white-space: nowrap;
  transition: background-color 150ms ease, color 150ms ease;

  &:hover,
  &:focus-visible {
    background-color: ${({ theme }) => theme.colors.primary};
    color: #FFFFFF;
    outline: none;
  }
`;

const NavMenu = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const timeoutRef = useRef(null);
  const location = useLocation();

  const handleMouseEnter = (menuName) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpenMenu(menuName);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 150);
  };

  const handleFocus = (menuName) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpenMenu(menuName);
  };

  const handleBlur = (e) => {
    // Si el foco se mueve a otro elemento fuera de este contenedor, cerrar
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setOpenMenu(null);
    }
  };

  const handleKeyDown = (e, item) => {
    if (e.key === 'Escape') {
      setOpenMenu(null);
    } else if (e.key === 'ArrowDown' && item.submenu) {
      e.preventDefault();
      setOpenMenu(item.name);
    }
  };

  const isItemActive = (item) => {
    if (item.exact) {
      return location.pathname === item.path;
    }
    if (item.path === '/la-bodega') {
      return location.pathname.startsWith('/la-bodega');
    }
    if (item.path === '/vinos') {
      return location.pathname.startsWith('/vinos');
    }
    if (item.path === '/enoturismo') {
      return location.pathname.startsWith('/enoturismo');
    }
    if (item.path === '/eventos') {
      return location.pathname.startsWith('/eventos');
    }
    if (item.path === '/tienda') {
      return location.pathname === '/tienda' || location.pathname === '/tienda-fisica';
    }
    if (item.path === '/blog') {
      return location.pathname.startsWith('/blog');
    }
    return location.pathname === item.path;
  };

  return (
    <Nav aria-label="Navegación principal">
      {MENU_ITEMS.map((item) => {
        const hasSubmenu = Array.isArray(item.submenu) && item.submenu.length > 0;
        const isOpen = openMenu === item.name;
        const isActive = isItemActive(item);

        return (
          <NavItem
            key={item.name}
            onMouseEnter={() => (hasSubmenu ? handleMouseEnter(item.name) : setOpenMenu(null))}
            onMouseLeave={hasSubmenu ? handleMouseLeave : undefined}
            onFocus={() => (hasSubmenu ? handleFocus(item.name) : setOpenMenu(null))}
            onBlur={hasSubmenu ? handleBlur : undefined}
            onKeyDown={(e) => handleKeyDown(e, item)}
          >
            <NavLinkStyled
              to={item.path}
              $isActive={isActive}
              $isOpen={isOpen}
              onClick={() => setOpenMenu(null)}
              aria-haspopup={hasSubmenu ? 'true' : undefined}
              aria-expanded={hasSubmenu ? isOpen : undefined}
            >
              <span>{item.name}</span>
              {hasSubmenu && (
                <CaretIcon viewBox="0 0 10 6" $isOpen={isOpen} aria-hidden="true">
                  <path d="M1 1L5 5L9 1" strokeLinecap="round" strokeLinejoin="round" />
                </CaretIcon>
              )}
            </NavLinkStyled>

            {hasSubmenu && (
              <AnimatePresence>
                {isOpen && (
                  <DropdownMenu
                    role="menu"
                    aria-label={`Submenú ${item.name}`}
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                  >
                    {item.submenu.map((sub) => (
                      <DropdownLink
                        key={sub.name}
                        to={sub.path}
                        role="menuitem"
                        onClick={() => setOpenMenu(null)}
                      >
                        {sub.name}
                      </DropdownLink>
                    ))}
                  </DropdownMenu>
                )}
              </AnimatePresence>
            )}
          </NavItem>
        );
      })}
    </Nav>
  );
};

export default NavMenu;
