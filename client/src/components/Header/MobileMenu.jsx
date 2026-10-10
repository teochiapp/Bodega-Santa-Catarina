import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: block;
  }
`;

const MobileOverlay = styled(motion.div)`
  position: fixed;
  top: 70px; /* Debajo del header */
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.surface};
  z-index: 999;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.xl};
  overflow-y: auto;
`;

const MobileLink = styled(Link)`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.md} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const SubMenu = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.background};
`;

const SubMenuLink = styled(Link)`
  font-size: ${({ theme }) => theme.typography.sizes.md};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.sm} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [enoturismoOpen, setEnoturismoOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <HamburgerButton onClick={toggleMenu}>
        {isOpen ? '✕' : '☰'}
      </HamburgerButton>

      <AnimatePresence>
        {isOpen && (
          <MobileOverlay
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <MobileLink to="/" onClick={closeMenu}>Inicio</MobileLink>
            <MobileLink to="/la-bodega" onClick={closeMenu}>La Bodega</MobileLink>
            <MobileLink to="/vinos" onClick={closeMenu}>Vinos</MobileLink>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <MobileLink to="/enoturismo" onClick={closeMenu} style={{ borderBottom: 'none' }}>
                Enoturismo
              </MobileLink>
              <button 
                onClick={() => setEnoturismoOpen(!enoturismoOpen)}
                style={{ background: 'none', border: 'none', fontSize: '1.5rem', padding: '1rem' }}
              >
                {enoturismoOpen ? '▴' : '▾'}
              </button>
            </div>
            
            <AnimatePresence>
              {enoturismoOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  style={{ overflow: 'hidden' }}
                >
                  <SubMenu>
                    <SubMenuLink to="/enoturismo" onClick={closeMenu}>Cata y visitas</SubMenuLink>
                    <SubMenuLink to="/enoturismo" onClick={closeMenu}>Experiencias gastronómicas</SubMenuLink>
                  </SubMenu>
                </motion.div>
              )}
            </AnimatePresence>
            <div style={{ borderBottom: `1px solid #E0DCD3` }}></div>

            <MobileLink to="/eventos" onClick={closeMenu}>Eventos y Bodas</MobileLink>
            <MobileLink to="/donde-comprar" onClick={closeMenu}>Dónde Comprar</MobileLink>
            <MobileLink to="/tienda" onClick={closeMenu}>Tienda Online</MobileLink>
            <MobileLink to="/blog" onClick={closeMenu}>Blog</MobileLink>
            <MobileLink to="/contacto" onClick={closeMenu}>Contacto</MobileLink>
          </MobileOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;
