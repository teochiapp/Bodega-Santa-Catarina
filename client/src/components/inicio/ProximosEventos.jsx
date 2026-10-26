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
    rgba(34, 14, 24, 0.88),
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
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.62rem;
  letter-spacing: 0.22em;
  font-weight: 600;
  text-transform: uppercase;
  color: rgb(194, 164, 120);
  margin-bottom: 12px;
`;

const TitleLeft = styled.h2`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: clamp(2.2rem, 3.5vw, 3.8rem);
  font-weight: 600;
  color: rgb(255, 255, 255);
  margin: 0 0 18px 0;
  line-height: 1.05;
`;

const EventList = styled.ul`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.88rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.82);
  margin: 0 0 24px 0;
  padding-left: 20px;

  li {
    margin-bottom: 4px;

    strong {
      color: #ffffff;
      font-weight: 700;
    }

    &::marker {
      color: rgb(194, 164, 120);
    }
  }
`;

const OutlineButton = styled(ScrollLink)`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
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
  position: relative;
  min-height: 520px;
  overflow: hidden;
  border-radius: 2px;
  box-shadow: ${({ theme }) => theme.shadows?.sm || '0 2px 4px rgba(0,0,0,0.05)'};

  @media (max-width: 576px) {
    min-height: 460px;
  }
`;

const RightBackgroundImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);

  ${RightBlock}:hover & {
    transform: scale(1.04);
  }
`;

const RightDarkGradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(34, 14, 24, 0.86),
    rgba(34, 14, 24, 0.18) 72%
  );
  pointer-events: none;
`;

const RightContent = styled.div`
  position: absolute;
  inset: 0;
  padding: clamp(2.5rem, 5vw, 5rem);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 2;

  @media (max-width: 576px) {
    padding: 1.75rem;
  }
`;

const TitleRight = styled.h2`
  font-family: ${({ theme }) => theme.typography?.fontFamily?.heading || "'Cormorant Garamond', 'Playfair Display', serif"};
  font-size: clamp(2.4rem, 4vw, 4rem);
  font-weight: 600;
  line-height: 1.02;
  color: rgb(242, 236, 228);
  margin: 0 0 28px 0;
  max-width: 620px;
`;

const RoundedSolidButton = styled(ScrollLink)`
  align-self: flex-start;
  font-family: ${({ theme }) => theme.typography?.fontFamily?.body || "'Manrope', 'Raleway', sans-serif"};
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgb(80, 43, 58);
  background: rgb(203, 160, 82);
  border: 0;
  border-radius: 100px;
  padding: 14px 24px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: all 0.25s ease;

  &:hover {
    background: #d8b788;
    transform: translateY(-2px);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
  }
`;

const DEFAULT_EVENTS = [
  { titulo: 'Mercado de Navidad', fecha: '5 y 6 de diciembre' },
  { titulo: 'Conciertos', fecha: 'Fechas a anunciar a principios de año' },
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
            setEventList(
              activos.slice(0, 4).map((e) => ({
                titulo: e.titulo,
                fecha: e.fecha || e.descripcion || '',
              }))
            );
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
        <Grid className="home-events-grid">
          {/* Bloque Izquierdo: Próximos Eventos */}
          <LeftBlock>
            <BackgroundImage
              src="/inicio/proximos-eventos.webp"
              alt="Eventos en Bodega Santa Catarina"
              loading="lazy"
            />
            <DarkGradient />
            <LeftContent>
              <Kicker>AGENDA DE ELABORACIÓN</Kicker>
              <TitleLeft>Próximos Eventos</TitleLeft>
              <EventList>
                {eventList.map((evento, idx) => (
                  <li key={idx}>
                    <strong>{evento.titulo}:</strong>
                    {evento.fecha ? ` ${evento.fecha}` : ''}
                  </li>
                ))}
              </EventList>
              <OutlineButton to="/eventos">VER CALENDARIO</OutlineButton>
            </LeftContent>
          </LeftBlock>

          {/* Bloque Derecho: Celebra tu evento en Santa Catarina */}
          <RightBlock>
            <RightBackgroundImage
              src="/assets/Santa_Catarina_268-gAddmlwS.jpg"
              alt="Celebración en Bodega Santa Catarina"
              loading="lazy"
            />
            <RightDarkGradient />
            <RightContent>
              <TitleRight>Celebra tu evento en Santa Catarina</TitleRight>
              <RoundedSolidButton to="/contacto">
                SOLICITAR INFORMACIÓN
              </RoundedSolidButton>
            </RightContent>
          </RightBlock>
        </Grid>
      </Container>
    </Section>
  );
};

export default ProximosEventos;
