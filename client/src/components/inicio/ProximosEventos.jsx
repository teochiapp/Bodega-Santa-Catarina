import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.background};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const EventCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const DateText = styled.p`
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ProximosEventos = () => {
  const eventos = [
    { title: 'Conciertos al atardecer', date: 'Varios días' },
    { title: 'Mercado de Navidad', date: 'Diciembre' },
    { title: 'Cenas maridaje', date: 'Mensual' },
  ];

  return (
    <Section>
      <Header>
        <h2>Próximos eventos</h2>
        <Link to="/eventos" style={{ textDecoration: 'underline' }}>Ver agenda completa</Link>
      </Header>
      <Grid>
        {eventos.map((ev, idx) => (
          <EventCard key={idx}>
            <DateText>{ev.date}</DateText>
            <h3>{ev.title}</h3>
            <p>Descripción breve del evento. Reserva tu plaza con antelación.</p>
          </EventCard>
        ))}
      </Grid>
    </Section>
  );
};

export default ProximosEventos;
