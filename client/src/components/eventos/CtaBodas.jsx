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

const Text = styled.p`
  max-width: 600px;
  margin: 0 auto ${({ theme }) => theme.spacing.xl} auto;
  font-size: ${({ theme }) => theme.typography.sizes.lg};
`;

const ContactButton = styled(Link)`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  border-radius: 4px;
  
  &:hover {
    background-color: #b5952f;
  }
`;

const CtaBodas = () => {
  return (
    <Section>
      <Title>Tu boda entre viñedos</Title>
      <Text>
        Creamos el escenario perfecto para el día más importante de vuestra vida.
        Consúltanos disponibilidad y ven a conocer nuestras instalaciones.
      </Text>
      <ContactButton to="/contacto">Consulta de disponibilidad</ContactButton>
    </Section>
  );
};

export default CtaBodas;
