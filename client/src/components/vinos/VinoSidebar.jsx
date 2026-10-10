import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 2000;
`;

const SidebarContainer = styled(motion.aside)`
  position: fixed;
  top: 0; right: 0; bottom: 0;
  width: 100%;
  max-width: 500px;
  background-color: ${({ theme }) => theme.colors.surface};
  z-index: 2001;
  padding: ${({ theme }) => theme.spacing.xl};
  overflow-y: auto;
  box-shadow: -4px 0 15px rgba(0,0,0,0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.xl};
  right: ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  color: ${({ theme }) => theme.colors.textLight};
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const WineTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-top: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const WineGama = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  text-transform: uppercase;
  letter-spacing: 1px;
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SectionTitle = styled.h4`
  margin-top: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: ${({ theme }) => theme.spacing.xs};
`;

const DownloadButton = styled.button`
  display: block;
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  border-radius: 4px;
  text-align: center;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const VinoSidebar = ({ vino, onClose }) => {
  return (
    <AnimatePresence>
      {vino && (
        <>
          <Overlay 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <SidebarContainer
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <CloseButton onClick={onClose}>&times;</CloseButton>
            
            <WineTitle>{vino.nombre}</WineTitle>
            <WineGama>{vino.gama}</WineGama>
            
            <img src={vino.imagen || ''} alt={vino.nombre} style={{ width: '100%', height: '300px', backgroundColor: '#eee', objectFit: 'cover' }} />
            
            <SectionTitle>Historia y nota de cata</SectionTitle>
            <p>{vino.descripcion}</p>
            
            <SectionTitle>Maridaje</SectionTitle>
            <p>{vino.maridaje}</p>
            
            <SectionTitle>Ficha Técnica</SectionTitle>
            <p><strong>Variedad:</strong> {vino.variedad}</p>
            <p><strong>Añada:</strong> {vino.añada}</p>
            
            <SectionTitle>Reconocimientos</SectionTitle>
            <p>{vino.reconocimientos}</p>
            
            <DownloadButton>Descargar ficha técnica</DownloadButton>
          </SidebarContainer>
        </>
      )}
    </AnimatePresence>
  );
};

export default VinoSidebar;
