import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroContainer = styled.section`
  height: 50vh;
  min-height: 350px;
  background-color: ${({ theme }) => theme.colors.primary};
  background-image: url(${props => props.$image || ''});
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0, 0, 0, 0.5); /* Overlay para mejorar lectura */
    z-index: 1;
  }
`;

const Content = styled(motion.div)`
  position: relative;
  z-index: 2;
  color: ${({ theme }) => theme.colors.surface};
  max-width: 800px;
  padding: 0 ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.sizes.hero};
  color: ${({ theme }) => theme.colors.surface};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Subtitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.weights.light};
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.md};
  line-height: 1.6;
`;

const PageHero = ({ title, subtitle, description, image }) => {
  return (
    <HeroContainer $image={image}>
      <Content
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {title && <Title>{title}</Title>}
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
        {description && <Description>{description}</Description>}
      </Content>
    </HeroContainer>
  );
};

export default PageHero;
