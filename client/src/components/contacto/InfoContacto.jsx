import { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../../services/api';

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
  const [config, setConfig] = useState(null);

  useEffect(() => {
    api.get('/configuracion')
      .then((data) => setConfig(data))
      .catch(() => {});
  }, []);

  const direccion = config?.direccion || 'Finca Son Aloy, Ma-3140, km 3, Mallorca';
  const telefono = config?.telefono || '+34 971 87 20 18';
  const whatsapp = config?.whatsapp || '+34 620 12 34 56';
  const email = config?.emailContacto || 'info@bodegasantacatarina.com';

  return (
    <Section>
      <Grid>
        <InfoCard>
          <h3>Información de contacto</h3>
          <InfoRow>📍 {direccion}</InfoRow>
          <InfoRow>📞 {telefono}</InfoRow>
          <InfoRow>💬 WhatsApp: {whatsapp}</InfoRow>
          <InfoRow>
            ✉️ <Highlight href={`mailto:${email}`}>{email}</Highlight>
          </InfoRow>
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
          <InfoRow>Catas personalizadas en viñedo</InfoRow>
          <InfoRow>Eventos privados y bodas</InfoRow>
        </InfoCard>
      </Grid>
    </Section>
  );
};

export default InfoContacto;
