import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.surface};
  text-align: center;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 1000px;
  margin: 0 auto ${({ theme }) => theme.spacing.xl} auto;
`;

const BonoCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  transition: transform ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const BonoTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const BonoPrice = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.typography.sizes.xxl};
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const FeaturesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.textLight};
`;

const FeatureItem = styled.span`
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: 20px;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const PrimaryButton = styled(Link)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: 4px;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const SecondaryButton = styled(Link)`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: 4px;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const TarjetasRegalo = () => {
  const bonos = [
    { title: 'Bono Esencial', price: '150 €', desc: 'Experiencia para dos personas.' },
    { title: 'Bono Premium', price: '250 €', desc: 'Experiencia gastronómica y cata para dos.' },
    { title: 'Bono Personalizado', price: 'A medida', desc: 'Diseña la experiencia a tu gusto.' },
  ];

  const caracteristicas = [
    'Bono digital', 'Envío por email', 'Validez de 12 meses', 'Personalizable', 'Reserva flexible'
  ];

  return (
    <Section>
      <Title>Tarjetas Regalo</Title>
      
      <Grid>
        {bonos.map((bono, idx) => (
          <BonoCard key={idx}>
            <BonoTitle>{bono.title}</BonoTitle>
            <BonoPrice>{bono.price}</BonoPrice>
            <p>{bono.desc}</p>
          </BonoCard>
        ))}
      </Grid>
      
      <FeaturesGrid>
        {caracteristicas.map((f, i) => <FeatureItem key={i}>✓ {f}</FeatureItem>)}
      </FeaturesGrid>
      
      <ButtonGroup>
        <PrimaryButton to="/contacto">Solicitar tarjeta regalo</PrimaryButton>
        <SecondaryButton to="/enoturismo">Ver experiencias</SecondaryButton>
      </ButtonGroup>
    </Section>
  );
};

export default TarjetasRegalo;
