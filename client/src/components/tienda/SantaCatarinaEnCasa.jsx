import styled from 'styled-components';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.background};
  text-align: center;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 1000px;
  margin: 0 auto;
`;

const ItemCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: 8px;
  border-top: 4px solid ${({ theme }) => theme.colors.secondary};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  
  h3 {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

const SantaCatarinaEnCasa = () => {
  return (
    <Section>
      <Title>Santa Catarina en casa</Title>
      <Grid>
        <ItemCard>
          <h3>Vinos</h3>
          <p>Disfruta de nuestras colecciones exclusivas directamente en tu mesa.</p>
        </ItemCard>
        <ItemCard>
          <h3>Tarjetas Regalo</h3>
          <p>El detalle perfecto para los amantes del vino y la gastronomía.</p>
        </ItemCard>
        <ItemCard>
          <h3>Merchandising</h3>
          <p>Accesorios de vino y productos seleccionados de la bodega.</p>
        </ItemCard>
      </Grid>
    </Section>
  );
};

export default SantaCatarinaEnCasa;
