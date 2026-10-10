import styled from 'styled-components';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  text-align: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const DataItem = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  
  h3 {
    color: ${({ theme }) => theme.colors.secondary};
    font-size: ${({ theme }) => theme.typography.sizes.xxl};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
  
  p {
    font-size: ${({ theme }) => theme.typography.sizes.md};
  }
`;

const FincaSonAloy = () => {
  return (
    <Section>
      <h2 style={{ color: 'white' }}>Finca Son Aloy</h2>
      <Grid>
        <DataItem>
          <h3>85</h3>
          <p>Hectáreas</p>
        </DataItem>
        <DataItem>
          <h3>1984</h3>
          <p>Fundación</p>
        </DataItem>
        <DataItem>
          <h3>100%</h3>
          <p>Ecológico certificado</p>
        </DataItem>
      </Grid>
    </Section>
  );
};

export default FincaSonAloy;
