import styled from 'styled-components';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.background};
`;

const Title = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
`;

const PointCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border-top: 4px solid ${({ theme }) => theme.colors.secondary};
  
  h3 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
`;

const Location = styled.p`
  color: ${({ theme }) => theme.colors.textLight};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;

const LinkWrapper = styled.a`
  display: inline-block;
  margin-top: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  
  &:hover {
    text-decoration: underline;
  }
`;

const MapaMallorca = () => {
  const puntos = [
    { name: 'Catavinos', loc: 'Palma', dir: 'Carrer de la Industria, 12', tel: '971 12 34 56', url: '#' },
    { name: 'Vinàmica', loc: 'Lloseta', dir: 'Carrer de l\'Artisanat, 5', tel: '971 65 43 21', url: '#' },
    { name: 'SUES', loc: 'Marratxí', dir: 'Polígono Marratxí', tel: '971 00 11 22', url: '#' },
    { name: '5 Caixes y Mitja', loc: 'Felanitx', dir: 'Carrer Major, 45', tel: '971 99 88 77', url: '#' },
    { name: 'Licors Moyà', loc: 'Artà', dir: 'Plaça del Conqueridor, 2', tel: '971 33 22 11', url: '#' },
    { name: 'Can Xisco', loc: 'Sa Cabaneta', dir: 'Carrer de la Iglesia, 10', tel: '971 55 44 33', url: '#' },
  ];

  return (
    <Section>
      <Title>Puntos de venta en Mallorca</Title>
      <Grid>
        {puntos.map((punto, idx) => (
          <PointCard key={idx}>
            <h3>{punto.name}</h3>
            <Location>{punto.loc}</Location>
            <InfoRow>📍 {punto.dir}</InfoRow>
            <InfoRow>📞 {punto.tel}</InfoRow>
            <LinkWrapper href={punto.url}>Ver en web</LinkWrapper>
          </PointCard>
        ))}
      </Grid>
    </Section>
  );
};

export default MapaMallorca;
