import styled from 'styled-components';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.surface};
  text-align: center;
`;

const Timeline = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 800px;
  margin: ${({ theme }) => theme.spacing.xl} auto 0 auto;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.border};
    z-index: 1;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.lg};
    
    &::before {
      display: none;
    }
  }
`;

const TimeItem = styled.div`
  position: relative;
  z-index: 2;
  background-color: ${({ theme }) => theme.colors.surface};
  padding: 0 ${({ theme }) => theme.spacing.sm};
  
  h3 {
    color: ${({ theme }) => theme.colors.secondary};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
`;

const Cronologia = () => {
  const hitos = [
    { year: '1984', desc: 'Fundación' },
    { year: '1992', desc: 'Raíces autóctonas' },
    { year: '2018', desc: 'Renovación generacional' },
    { year: '2026', desc: 'Certificación ecológica' },
  ];

  return (
    <Section>
      <h2>Nuestra historia en el tiempo</h2>
      <Timeline>
        {hitos.map((hito, idx) => (
          <TimeItem key={idx}>
            <h3>{hito.year}</h3>
            <p>{hito.desc}</p>
          </TimeItem>
        ))}
      </Timeline>
    </Section>
  );
};

export default Cronologia;
