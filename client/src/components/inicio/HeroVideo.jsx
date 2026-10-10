import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroContainer = styled.section`
  position: relative;
  height: 80vh;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.primary};
`;

const VideoBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000; /* Placeholder for actual video */
  opacity: 0.6;
  
  /* Cuando haya un video real: 
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  */
`;

const Content = styled(motion.div)`
  position: relative;
  z-index: 1;
  text-align: center;
  color: ${({ theme }) => theme.colors.surface};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.sizes.hero};
  color: ${({ theme }) => theme.colors.surface};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const PrimaryButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  border-radius: 4px;
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: #b5952f;
  }
`;

const SecondaryButton = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  border-radius: 4px;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const HeroVideo = () => {
  return (
    <HeroContainer>
      <VideoBackground />
      <Content
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Title>Bodega Santa Catarina</Title>
        <ButtonGroup>
          <PrimaryButton>Reservar experiencia</PrimaryButton>
          <SecondaryButton>Descubrir nuestros vinos</SecondaryButton>
        </ButtonGroup>
      </Content>
    </HeroContainer>
  );
};

export default HeroVideo;
