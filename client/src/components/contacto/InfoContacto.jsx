import { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../../services/api';

const Wrapper = styled.section`
  background-color: rgb(242, 236, 228);
  border-bottom: 1px solid rgba(203, 160, 82, 0.19);
  width: 100%;
`;

const Grid = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  padding: 2.5rem 2rem;
  text-align: center;
  border-right: 1px solid rgba(203, 160, 82, 0.19);
  box-sizing: border-box;

  &:last-child {
    border-right: none;
  }

  @media (max-width: 1024px) {
    &:nth-child(2n) {
      border-right: none;
    }
    &:nth-child(1),
    &:nth-child(2) {
      border-bottom: 1px solid rgba(203, 160, 82, 0.19);
    }
  }

  @media (max-width: 600px) {
    border-right: none;
    border-bottom: 1px solid rgba(203, 160, 82, 0.19);
    padding: 2rem 1.5rem;

    &:last-child {
      border-bottom: none;
    }
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 14px;

  svg {
    transition: transform 0.25s ease;
  }

  ${Card}:hover & svg {
    transform: translateY(-2px);
  }
`;

const Label = styled.p`
  font-family: 'Manrope', 'Raleway', sans-serif;
  font-size: 0.64rem;
  letter-spacing: 0.2em;
  font-weight: 700;
  text-transform: uppercase;
  color: rgb(194, 164, 120);
  margin-bottom: 10px;
  margin-top: 0;
`;

const TextLine = styled.p`
  font-family: 'Manrope', 'Raleway', sans-serif;
  font-size: 0.84rem;
  color: rgb(80, 43, 58);
  line-height: 1.7;
  margin: 0;
`;

const InteractiveLink = styled.a`
  font-family: 'Manrope', 'Raleway', sans-serif;
  font-size: 0.84rem;
  color: rgb(80, 43, 58);
  line-height: 1.7;
  margin: 0;
  display: block;
  text-decoration: none;
  transition: color 0.25s ease;

  &:hover {
    color: rgb(203, 160, 82);
  }
`;

const BottomBar = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 1.25rem 2rem;
  border-top: 1px solid rgba(203, 160, 82, 0.133);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  box-sizing: border-box;

  @media (max-width: 860px) {
    flex-direction: column;
    text-align: center;
    gap: 16px;
    padding: 1.5rem 1.5rem;
  }
`;

const DirectionsText = styled.p`
  font-family: 'Manrope', 'Raleway', sans-serif;
  font-size: 0.82rem;
  line-height: 1.7;
  color: rgb(80, 43, 58);
  margin: 0;
`;

const MapButton = styled.a`
  flex-shrink: 0;
  font-family: 'Manrope', 'Raleway', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: rgb(242, 236, 228);
  background: rgb(80, 43, 58);
  padding: 11px 20px;
  text-decoration: none;
  display: inline-block;
  transition: background-color 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease;

  &:hover {
    background: #381a28;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(80, 43, 58, 0.22);
  }
`;

const InfoContacto = () => {
  const [config, setConfig] = useState(null);

  useEffect(() => {
    api.get('/configuracion')
      .then((data) => setConfig(data))
      .catch(() => {});
  }, []);

  const telefono = config?.telefono || '+34 971 137 115';
  const email = config?.emailContacto || 'info@bodegasantacatarina.com';
  const mapsUrl = 'https://maps.google.com/?q=Carretera+Inca+Sencelles+Km3+07140+Sencelles+Mallorca';

  return (
    <Wrapper>
      <Grid>
        {/* DIRECCIÓN */}
        <Card>
          <IconContainer>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CBA052" strokeWidth="1.2" strokeLinecap="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </IconContainer>
          <Label>DIRECCIÓN</Label>
          <TextLine>Carretera Inca–Sencelles, Km 3</TextLine>
          <TextLine>07140 Sencelles (Mallorca)</TextLine>
          <TextLine>España</TextLine>
        </Card>

        {/* TELÉFONO · WHATSAPP */}
        <Card>
          <IconContainer>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CBA052" strokeWidth="1.2" strokeLinecap="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.79 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012.7 3h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 10.91a16 16 0 006.08 6.08l1.07-1.07a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 18.92z" />
            </svg>
          </IconContainer>
          <Label>TELÉFONO · WHATSAPP</Label>
          <InteractiveLink href={`tel:${telefono.replace(/\s+/g, '')}`}>
            {telefono}
          </InteractiveLink>
          <TextLine>Atención también por WhatsApp</TextLine>
        </Card>

        {/* EMAIL */}
        <Card>
          <IconContainer>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CBA052" strokeWidth="1.2" strokeLinecap="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </IconContainer>
          <Label>EMAIL</Label>
          <InteractiveLink href={`mailto:${email}`}>
            {email}
          </InteractiveLink>
        </Card>

        {/* HORARIO */}
        <Card>
          <IconContainer>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#CBA052" strokeWidth="1.2" strokeLinecap="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </IconContainer>
          <Label>HORARIO</Label>
          <TextLine>Lun–Vie: 9:00–18:00</TextLine>
          <TextLine>Sábados: 10:00–15:00</TextLine>
          <TextLine>Dom: cerrado</TextLine>
        </Card>
      </Grid>

      {/* BARRA INFERIOR DE ACCESO Y GOOGLE MAPS */}
      <BottomBar>
        <DirectionsText>
          Desde Palma: MA-13 dirección Inca, salida Sencelles · 30 min &nbsp;|&nbsp; Aeropuerto PMI a 35 km · Transfer privado disponible
        </DirectionsText>
        <MapButton
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          ABRIR EN GOOGLE MAPS
        </MapButton>
      </BottomBar>
    </Wrapper>
  );
};

export default InfoContacto;

