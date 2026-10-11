import { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../../services/api';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.background};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Kicker = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  text-transform: uppercase;
  letter-spacing: 1.5px;
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.sizes.xxl};
`;

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`;

const EventCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  transition: transform ${({ theme }) => theme.transitions.fast}, box-shadow ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const EventImage = styled.div`
  height: 200px;
  background-color: #eaeaea;
  background-image: ${(p) => (p.$bg ? `url(${p.$bg})` : 'none')};
  background-size: cover;
  background-position: center;
  position: relative;
`;

const EventContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const EventTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  margin-bottom: 6px;
`;

const EventSub = styled.h4`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const EventDesc = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  line-height: 1.6;
  flex: 1;
  white-space: pre-line;
`;

const ActionBtn = styled.a`
  display: inline-block;
  margin-top: ${({ theme }) => theme.spacing.md};
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  transition: background-color 150ms ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const DEFAULT_EVENTOS = [
  {
    titulo: 'Bodas en el Viñedo',
    subtitulo: 'Un enlace de ensueño en el corazón de Mallorca',
    descripcion: 'Espacios exteriores entre bancales de viñas, patio empedrado tradicional y sala de tinajas con capacidad para hasta 200 invitados.',
    portada: '/isologo.png',
  },
  {
    titulo: 'Eventos Corporativos y Presentaciones',
    subtitulo: 'Exclusividad y tranquilidad para su equipo',
    descripcion: 'Salas equipadas con luz natural, catas privadas para empresas, actividades de team building y cenas de gala en un entorno enológico inigualable.',
    portada: '/isologo.png',
  },
  {
    titulo: 'Celebraciones Privadas y Aniversarios',
    subtitulo: 'Momentos únicos junto a los tuyos',
    descripcion: 'Espacio íntimo rodeado de barricas de roble y vistas panorámicas para cumpleaños, aniversarios familiares y reuniones exclusivas.',
    portada: '/isologo.png',
  },
];

const AgendaEventos = () => {
  const [eventos, setEventos] = useState(DEFAULT_EVENTOS);

  useEffect(() => {
    api.get('/eventos')
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const activos = data
            .filter((e) => e.activo !== false)
            .sort((a, b) => (a.posicion ?? 0) - (b.posicion ?? 0));
          if (activos.length > 0) {
            setEventos(activos);
          }
        }
      })
      .catch((err) => {
        console.warn('[AgendaEventos] Usando mock por error en API:', err);
      });
  }, []);

  return (
    <Section id="agenda-eventos">
      <Container>
        <SectionHeader>
          <Kicker>Tipos de Acontecimientos</Kicker>
          <SectionTitle>Eventos & Celebraciones</SectionTitle>
        </SectionHeader>

        <EventsGrid>
          {eventos.map((ev, idx) => (
            <EventCard key={ev.id || idx}>
              <EventImage $bg={ev.portada || '/isologo.png'} />
              <EventContent>
                <EventTitle>{ev.titulo}</EventTitle>
                {ev.subtitulo && <EventSub>{ev.subtitulo}</EventSub>}
                <EventDesc>{ev.descripcion}</EventDesc>
                <ActionBtn href="#formulario-contacto-eventos">
                  Solicitar presupuesto
                </ActionBtn>
              </EventContent>
            </EventCard>
          ))}
        </EventsGrid>
      </Container>
    </Section>
  );
};

export default AgendaEventos;
