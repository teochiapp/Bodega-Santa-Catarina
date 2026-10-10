import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.surface};
  text-align: center;
`;

const Content = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  margin-top: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};
  padding-bottom: ${({ theme }) => theme.spacing.xs};
  
  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const Distribuidores = () => {
  return (
    <Section>
      <Content>
        <h2>Nuestros distribuidores</h2>
        <p>
          Encuentra los vinos de Bodega Santa Catarina en los mejores restaurantes y 
          tiendas especializadas de Mallorca y alrededor del mundo.
        </p>
        <StyledLink to="/donde-comprar">Ver red comercial</StyledLink>
      </Content>
    </Section>
  );
};

export default Distribuidores;
