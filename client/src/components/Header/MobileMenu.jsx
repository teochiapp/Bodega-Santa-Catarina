import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { ScrollLink as Link } from '../common/ScrollToTop';
import { MENU_ITEMS } from './menuData';

const HamburgerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.5rem;
  padding: 8px;
  cursor: pointer;
  border-radius: 4px;
  transition: color 150ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }

  @media (min-width: 1181px) {
    display: none;
  }
`;

const MobileOverlay = styled(motion.div)`
  position: fixed;
  top: 76px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.surface};
  z-index: 999;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1.75rem 3rem;
  overflow-y: auto;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    top: 76px;
    padding: 1.25rem 1.25rem 2.5rem;
  }
`;

const MobileItemContainer = styled.div`
  border-bottom: 1px solid rgba(224, 220, 211, 0.6);
`;

const MobileRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const MobileMainLink = styled(Link)`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.colors.primary};
  padding: 14px 0;
  text-decoration: none;
  text-transform: uppercase;
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
  transition: color 150ms ease;

  ${({ $isActive, theme }) =>
    $isActive &&
    `
    color: ${theme.colors.secondary};
    font-weight: 800;
  `}

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const AccordionToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  padding: 12px 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 200ms ease, color 150ms ease;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const Chevron = styled.svg`
  width: 12px;
  height: 12px;
  stroke: currentColor;
  stroke-width: 2;
  fill: none;
  transition: transform 200ms ease;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const SubMenu = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px 0 12px 16px;
  background-color: rgba(242, 236, 228, 0.35);
  border-left: 2px solid ${({ theme }) => theme.colors.secondary};
  margin-bottom: 8px;
  border-radius: 0 4px 4px 0;
`;

const SubMenuLink = styled(Link)`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.88rem;
  font-weight: ${({ $isActive }) => ($isActive ? '700' : '500')};
  color: ${({ theme, $isActive }) => ($isActive ? theme.colors.secondary : theme.colors.text)};
  background-color: ${({ $isActive }) => ($isActive ? 'rgba(194, 164, 120, 0.12)' : 'transparent')};
  padding: 8px 12px;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 150ms ease, color 150ms ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: #FFFFFF;
  }
`;

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleSection = (name) => {
    setExpandedSections((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const isItemActive = (item) => {
    if (item.exact) {
      return location.pathname === item.path;
    }
    if (item.path === '/elaboracion' || item.path === '/la-bodega') {
      return location.pathname.startsWith('/elaboracion') || location.pathname.startsWith('/la-bodega');
    }
    if (item.path === '/vinos') {
      return location.pathname.startsWith('/vinos');
    }
    if (item.path === '/enoturismo') {
      return location.pathname.startsWith('/enoturismo');
    }
    if (item.path.startsWith('/eventos')) {
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

  const isSubActive = (subPath) => {
    if (subPath.includes('#')) {
      const [pathPart, hashPart] = subPath.split('#');
      return (
        (location.pathname === pathPart && location.hash === `#${hashPart}`) ||
        location.pathname === `${pathPart}/${hashPart}`
      );
    }
    if (subPath === '/elaboracion/historia' && (location.pathname === '/elaboracion' || location.pathname === '/elaboracion/')) {
      return true;
    }
    return location.pathname === subPath;
  };

  return (
    <>
      <HamburgerButton
        onClick={toggleMenu}
        aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={isOpen}
      >
        {isOpen ? '✕' : '☰'}
      </HamburgerButton>

      <AnimatePresence>
        {isOpen && (
          <MobileOverlay
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.28, ease: 'easeInOut' }}
          >
            {MENU_ITEMS.map((item) => {
              const hasSubmenu = Array.isArray(item.submenu) && item.submenu.length > 0;
              const isSectionOpen = !!expandedSections[item.name];
              const isActive = isItemActive(item);

              return (
                <MobileItemContainer key={item.name}>
                  <MobileRow>
                    <MobileMainLink
                      to={item.path}
                      onClick={closeMenu}
                      $isActive={isActive}
                    >
                      {item.name}
                    </MobileMainLink>

                    {hasSubmenu && (
                      <AccordionToggle
                        onClick={() => toggleSection(item.name)}
                        aria-label={`Desplegar opciones de ${item.name}`}
                        aria-expanded={isSectionOpen}
                      >
                        <Chevron viewBox="0 0 10 6" $isOpen={isSectionOpen} aria-hidden="true">
                          <path d="M1 1L5 5L9 1" strokeLinecap="round" strokeLinejoin="round" />
                        </Chevron>
                      </AccordionToggle>
                    )}
                  </MobileRow>

                  {hasSubmenu && (
                    <AnimatePresence>
                      {isSectionOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          style={{ overflow: 'hidden' }}
                        >
                          <SubMenu>
                            {item.submenu.map((sub) => (
                              <SubMenuLink
                                key={sub.name}
                                to={sub.path}
                                $isActive={isSubActive(sub.path)}
                                onClick={closeMenu}
                              >
                                {sub.name}
                              </SubMenuLink>
                            ))}
                          </SubMenu>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </MobileItemContainer>
              );
            })}
          </MobileOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;
