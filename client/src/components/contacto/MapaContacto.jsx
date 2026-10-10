import styled from 'styled-components';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} 0;
  background-color: ${({ theme }) => theme.colors.surface};
  text-align: center;
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 450px;
  background-color: #d9d9d9;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  /* Placeholder para iframe de Google Maps */
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textLight};
`;

const Cierre = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.typography.fontFamily.heading};
  font-size: ${({ theme }) => theme.typography.sizes.xxl};
`;

const MapaContacto = () => {
  return (
    <Section>
      <MapWrapper>
        [Iframe de Google Maps - Ubicación: Finca Son Aloy, Sencelles]
      </MapWrapper>
      <Cierre>Te esperamos en Mallorca</Cierre>
    </Section>
  );
};

export default MapaContacto;
