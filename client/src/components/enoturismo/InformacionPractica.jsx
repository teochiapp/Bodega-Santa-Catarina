import styled from 'styled-components';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const InfoBox = styled.div`
  h3 {
    color: ${({ theme }) => theme.colors.secondary};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
  p {
    font-size: ${({ theme }) => theme.typography.sizes.md};
    line-height: 1.6;
  }
`;

const InformacionPractica = () => {
  return (
    <Section>
      <h2 style={{ color: 'white', textAlign: 'center' }}>Información práctica</h2>
      <Grid>
        <InfoBox>
          <h3>Horarios</h3>
          <p>Lunes a Viernes: 10:00 - 18:00</p>
          <p>Sábados: 10:00 - 15:00</p>
          <p>Domingos cerrado.</p>
        </InfoBox>
        <InfoBox>
          <h3>Idiomas</h3>
          <p>Las visitas se realizan en Español, Inglés y Alemán.</p>
          <p>Rogamos especificar el idioma al reservar.</p>
        </InfoBox>
        <InfoBox>
          <h3>Cómo llegar</h3>
          <p>Finca Son Aloy, Ma-3140, km 3.</p>
          <p>Sencelles, Mallorca.</p>
        </InfoBox>
        <InfoBox>
          <h3>Parking</h3>
          <p>Disponemos de amplio aparcamiento gratuito para clientes, con plazas para autobuses.</p>
        </InfoBox>
      </Grid>
    </Section>
  );
};

export default InformacionPractica;
