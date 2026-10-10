import styled from 'styled-components';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.background};
`;

const FlexContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;
`;

const Column = styled.div`
  flex: 1;
  min-width: 300px;
  
  h3 {
    color: ${({ theme }) => theme.colors.secondary};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    padding-bottom: ${({ theme }) => theme.spacing.sm};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const List = styled.ul`
  li {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    padding-left: ${({ theme }) => theme.spacing.sm};
    border-left: 3px solid ${({ theme }) => theme.colors.primary};
  }
`;

const AgendaEventos = () => {
  return (
    <Section>
      <FlexContainer>
        <Column>
          <h3>Agenda Destacada</h3>
          <List>
            <li>Presentaciones y ferias</li>
            <li>Mercado de Navidad</li>
            <li>Conciertos al atardecer</li>
          </List>
        </Column>
        <Column>
          <h3>Otras Experiencias</h3>
          <List>
            <li>Cenas maridaje</li>
            <li>Tardes de viñedos</li>
            <li>Bonos regalo</li>
          </List>
        </Column>
      </FlexContainer>
    </Section>
  );
};

export default AgendaEventos;
