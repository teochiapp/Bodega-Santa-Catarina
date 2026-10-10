import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  text-align: center;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.surface};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Button = styled(Link)`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  border-radius: 4px;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.surface};
  }
`;

const CtaVinos = () => {
  return (
    <Section>
      <Title>Nuestros Vinos</Title>
      <p style={{ marginBottom: '2rem', fontSize: '1.2rem' }}>Descubre nuestra colección</p>
      <Button to="/vinos">Ver catálogo</Button>
    </Section>
  );
};

export default CtaVinos;
