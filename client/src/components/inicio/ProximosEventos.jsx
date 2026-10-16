import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ScrollLink } from '../common/ScrollToTop';
import api from '../../services/api';

const Section = styled.section`
  background-color: ${({ theme }) => theme.colors.background || 'rgb(242, 236, 228)'};
  padding: 96px 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints?.tablet || '768px'}) {
    padding: 60px 1.25rem;
  }
`;

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const LeftBlock = styled.div`
  position: relative;
  min-height: 520px;
  overflow: hidden;
  border-radius: 2px;
  box-shadow: ${({ theme }) => theme.shadows?.sm || '0 2px 4px rgba(0,0,0,0.05)'};

  @media (max-width: 576px) {
    min-height: 460px;
  }
`;

const BackgroundImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);

  ${LeftBlock}:hover & {
    transform: scale(1.04);
  }
`;

const DarkGradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(34, 14, 24, 0.88) 0%,
    rgba(34, 14, 24, 0.45) 45%,
    rgba(34, 14, 24, 0.08) 70%
  );
  pointer-events: none;
`;

const LeftContent = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 2.5rem;
  z-index: 2;

  @media (max-width: 576px) {
    padding: 1.75rem;
  }
`;

const Kicker = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.62rem;
  letter-spacing: 0.22em;
  font-weight: 600;
  text-transform: uppercase;
  color: rgb(194, 164, 120);
  margin-bottom: 12px;
`;

const TitleLeft = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontFamily.heading};
  font-size: clamp(2.2rem, 3.5vw, 3.8rem);
  font-weight: 600;
  color: rgb(255, 255, 255);
  margin: 0 0 18px 0;
  line-height: 1.05;
`;

const EventList = styled.ul`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.88rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.82);
  margin: 0 0 24px 0;
  padding-left: 20px;

  li {
    margin-bottom: 4px;
    &::marker {
      color: rgb(194, 164, 120);
    }
  }
`;

const OutlineButton = styled(ScrollLink)`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgb(242, 236, 228);
  background: transparent;
  border: 1px solid rgb(194, 164, 120);
  padding: 12px 22px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: all 0.25s ease;

  &:hover {
    background: rgb(194, 164, 120);
    color: rgb(80, 43, 58);
  }
`;

const RightBlock = styled.div`
  background-color: ${({ theme }) => theme.colors.primary || 'rgb(80, 43, 58)'};
  min-height: 520px;
  padding: clamp(2.5rem, 5vw, 5rem);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 2px;
  box-shadow: ${({ theme }) => theme.shadows?.sm || '0 2px 4px rgba(0,0,0,0.05)'};
`;

const KickerRight = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.62rem;
  letter-spacing: 0.22em;
  font-weight: 600;
  text-transform: uppercase;
  color: rgb(194, 164, 120);
  margin-bottom: 14px;
`;

const TitleRight = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontFamily.heading};
  font-size: clamp(2.4rem, 4vw, 4.2rem);
  font-weight: 600;
  line-height: 1.02;
  color: rgb(242, 236, 228);
  margin: 0 0 22px 0;
`;

const DescriptionRight = styled.p`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.9rem;
  line-height: 1.8;
  color: rgba(242, 236, 228, 0.72);
  margin: 0 0 30px 0;
  max-width: 520px;
`;

const SolidButton = styled(ScrollLink)`
  align-self: flex-start;
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgb(80, 43, 58);
  background: rgb(194, 164, 120);
  border: none;
  padding: 14px 24px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: all 0.25s ease;

  &:hover {
    background: #d8b788;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const DEFAULT_EVENTS = [
  'Conciertos',
  'Mercado de Navidad',
  'Cenas maridaje',
  'Tardeos',
];

const ProximosEventos = () => {
  const [eventList, setEventList] = useState(DEFAULT_EVENTS);

  useEffect(() => {
    let isMounted = true;
    api.get('/eventos')
      .then((data) => {
        if (!isMounted) return;
        if (Array.isArray(data) && data.length > 0) {
          const activos = data.filter((e) => e.activo !== false);
          if (activos.length > 0) {
            setEventList(activos.map((e) => e.titulo).slice(0, 5));
          }
        }
      })
      .catch((err) => {
        console.warn('[ProximosEventos] Error cargando eventos de la API:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Section>
      <Container>
        <Grid>
          {/* Bloque Izquierdo: Próximos Eventos */}
          <LeftBlock>
            <BackgroundImage
              src="/inicio/proximos-eventos.webp"
              alt="Eventos en Bodega Santa Catarina"
              loading="lazy"
            />
            <DarkGradient />
            <LeftContent>
              <Kicker>AGENDA DE LA BODEGA</Kicker>
              <TitleLeft>Próximos Eventos</TitleLeft>
              <EventList>
                {eventList.map((evento, idx) => (
                  <li key={idx}>{evento}</li>
                ))}
              </EventList>
              <OutlineButton to="/eventos">VER CALENDARIO</OutlineButton>
            </LeftContent>
          </LeftBlock>

          {/* Bloque Derecho: Bodas y Celebraciones */}
          <RightBlock>
            <KickerRight>ESPACIOS Y EXPERIENCIAS</KickerRight>
            <TitleRight>Bodas y Celebraciones</TitleRight>
            <DescriptionRight>
              Presentación de espacios y experiencias para bodas, celebraciones familiares y encuentros privados en Son Aloy.
            </DescriptionRight>
            <SolidButton to="/contacto">SOLICITAR INFORMACIÓN</SolidButton>
          </RightBlock>
        </Grid>
      </Container>
    </Section>
  );
};

export default ProximosEventos;
