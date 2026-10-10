import { useState } from 'react';
import { NavLink as RouterNavLink, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: nowrap;
  height: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: none; /* Se oculta en mobile, se usa MobileMenu */
  }
`;

const NavItem = styled.div`
  position: relative;
`;

const NavLink = styled(RouterNavLink)`
  position: relative;
  display: flex;
  align-items: center;
  gap: 7px;
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.15px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px 12px 12px;
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.72;
  transition: opacity 150ms, color 150ms;
  white-space: nowrap;
  text-transform: uppercase;
  
  &:hover, &.active {
    opacity: 1;
  }

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    border-radius: 2px;
    background-color: ${({ theme }) => theme.colors.secondary};
    bottom: 3px;
    left: 50%;
    transform: translateX(-50%);
    transition: width 200ms ease-in-out;
  }

  &:hover::after, &.active::after {
    width: 22px;
  }
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.md};
  min-width: 200px;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  z-index: 1000;
`;

const DropdownLink = styled(Link)`
  display: block;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const NavMenu = () => {
  const [isEnoturismoHovered, setIsEnoturismoHovered] = useState(false);

  return (
    <Nav>
      <NavLink to="/">Inicio</NavLink>
      <NavLink to="/la-bodega">La Bodega</NavLink>
      <NavLink to="/vinos">Vinos</NavLink>
      
      <NavItem 
        onMouseEnter={() => setIsEnoturismoHovered(true)} 
        onMouseLeave={() => setIsEnoturismoHovered(false)}
      >
        <NavLink to="/enoturismo">Enoturismo ▾</NavLink>
        <AnimatePresence>
          {isEnoturismoHovered && (
            <DropdownMenu
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <DropdownLink to="/enoturismo">Cata y visitas</DropdownLink>
              <DropdownLink to="/enoturismo">Experiencias gastronómicas</DropdownLink>
            </DropdownMenu>
          )}
        </AnimatePresence>
      </NavItem>

      <NavLink to="/eventos">Eventos y Bodas</NavLink>
      <NavLink to="/donde-comprar">Dónde Comprar</NavLink>
      <NavLink to="/blog">Blog</NavLink>
      <NavLink to="/contacto">Contacto</NavLink>
    </Nav>
  );
};

export default NavMenu;
