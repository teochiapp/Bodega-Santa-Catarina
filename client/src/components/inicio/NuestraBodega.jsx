import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.background};
  text-align: center;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.typography.sizes.xxl};
`;

const Description = styled.p`
  max-width: 800px;
  margin: 0 auto ${({ theme }) => theme.spacing.xl} auto;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
`;

const StyledLink = styled(Link)`
  display: inline-block;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};
  padding-bottom: ${({ theme }) => theme.spacing.xs};
  
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const NuestraBodega = () => {
  return (
    <Section>
      <Title>Un legado vivo</Title>
      <Description>
        Desde 1984, cultivamos el arte de hacer vino en el corazón de Mallorca.
        Nuestra filosofía combina el respeto por la tierra, la pasión por las raíces autóctonas 
        y una mirada constante hacia la innovación sostenible.
      </Description>
      <StyledLink to="/la-bodega">Descubre nuestra historia</StyledLink>
    </Section>
  );
};

export default NuestraBodega;
