import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import api from '../../services/api';

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

const BonoDesc = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;
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
  background: ${({ theme }) => theme.colors.background};
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`;

const PrimaryButton = styled(Link)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: 4px;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  text-decoration: none;
  
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
  text-decoration: none;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const DEFAULT_BONOS = [
  { title: 'Bono Esencial', price: '150 €', desc: 'Experiencia para dos personas.' },
  { title: 'Bono Premium', price: '250 €', desc: 'Experiencia gastronómica y cata para dos.' },
  { title: 'Bono Personalizado', price: 'A medida', desc: 'Diseña la experiencia a tu gusto.' },
];

const TarjetasRegalo = () => {
  const [bonos, setBonos] = useState(DEFAULT_BONOS);

  useEffect(() => {
    api.get('/tarjetas')
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setBonos(data.map((t) => ({
            title: t.titulo,
            price: `${Number(t.precio).toFixed(2)} €`,
            desc: t.descripcion,
          })));
        }
      })
      .catch(() => {});
  }, []);

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
            <BonoDesc>{bono.desc}</BonoDesc>
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
