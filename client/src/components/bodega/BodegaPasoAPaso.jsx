import styled from 'styled-components';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.background};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const PasoCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  text-align: center;
  
  h3 {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const BodegaPasoAPaso = () => {
  const pasos = [
    'Nuestra Historia',
    'Los Viñedos',
    'Elaboración',
    'Sala de Barricas',
    'La Clastra',
    'Sostenibilidad'
  ];

  return (
    <Section>
      <h2 style={{ textAlign: 'center' }}>La bodega, paso a paso</h2>
      <Grid>
        {pasos.map((paso, idx) => (
          <PasoCard
            key={idx}
            id={paso === 'Sostenibilidad' ? 'sostenibilidad' : undefined}
            style={{ scrollMarginTop: '110px' }}
          >
            <h3>{paso}</h3>
            <p>Descripción breve de {paso.toLowerCase()} y su importancia para nosotros.</p>
          </PasoCard>
        ))}
      </Grid>
    </Section>
  );
};

export default BodegaPasoAPaso;
