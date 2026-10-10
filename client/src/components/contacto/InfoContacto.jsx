import styled from 'styled-components';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.surface};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
`;

const InfoCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: 8px;
  text-align: center;
  
  h3 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const InfoRow = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text};
`;

const Highlight = styled.a`
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  
  &:hover {
    text-decoration: underline;
  }
`;

const InfoContacto = () => {
  return (
    <Section>
      <Grid>
        <InfoCard>
          <h3>Información de contacto</h3>
          <InfoRow>📍 Finca Son Aloy, Ma-3140, km 3</InfoRow>
          <InfoRow>📞 +34 971 XX XX XX (WhatsApp disp.)</InfoRow>
          <InfoRow>✉️ <Highlight href="mailto:info@santacatarina.com">info@santacatarina.com</Highlight></InfoRow>
        </InfoCard>

        <InfoCard>
          <h3>Horarios de visita</h3>
          <InfoRow>Lunes a Viernes: 10:00 - 18:00</InfoRow>
          <InfoRow>Sábados: 10:00 - 15:00</InfoRow>
          <InfoRow>Domingos: Cerrado</InfoRow>
        </InfoCard>

        <InfoCard>
          <h3>Servicios adicionales</h3>
          <InfoRow>Tarjetas de regalo disponibles</InfoRow>
          <InfoRow>Posibilidad de transfer privado</InfoRow>
          <InfoRow>Visitas adaptadas</InfoRow>
        </InfoCard>
      </Grid>
    </Section>
  );
};

export default InfoContacto;
