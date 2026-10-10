import { useState } from 'react';
import styled from 'styled-components';
import ReservaModal from './ReservaModal';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.background};
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const TabButton = styled.button`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  color: ${({ active, theme }) => active ? theme.colors.primary : theme.colors.textLight};
  border-bottom: 2px solid ${({ active, theme }) => active ? theme.colors.secondary : 'transparent'};
  padding-bottom: ${({ theme }) => theme.spacing.xs};
  font-weight: ${({ active, theme }) => active ? theme.typography.weights.bold : theme.typography.weights.regular};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  display: flex;
  flex-direction: column;
`;

const ImagePlaceholder = styled.div`
  height: 200px;
  background-color: #d9d9d9;
`;

const Content = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Price = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: block;
`;

const ReserveButton = styled.button`
  margin-top: auto;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: 4px;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const Experiencias = () => {
  const [activeTab, setActiveTab] = useState('catas');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);

  const data = {
    catas: [
      { id: 1, title: 'Cata de 3 vinos', price: '20 € / persona' },
      { id: 2, title: 'Cata de 5 vinos', price: '25 € / persona' },
      { id: 3, title: 'Cata de 3 vinos + Visita', price: '40 € / persona' },
      { id: 4, title: 'Cata de 5 vinos + Visita', price: '45 € / persona' },
    ],
    gastronomicas: [
      { id: 5, title: 'Menú Tapas', price: '65 € / persona' },
      { id: 6, title: 'Menú Paella', price: 'Desde 75 € / persona' },
      { id: 7, title: 'Menú Barbacoa', price: 'Desde 75 € / persona (mín. 15 personas)' },
    ]
  };

  const handleReserve = (exp) => {
    setSelectedExperience(exp);
    setModalOpen(true);
  };

  return (
    <Section>
      <Tabs>
        <TabButton active={activeTab === 'catas'} onClick={() => setActiveTab('catas')}>
          Catas y visitas
        </TabButton>
        <TabButton active={activeTab === 'gastronomicas'} onClick={() => setActiveTab('gastronomicas')}>
          Experiencias gastronómicas
        </TabButton>
      </Tabs>

      <Grid>
        {data[activeTab].map(exp => (
          <Card key={exp.id}>
            <ImagePlaceholder />
            <Content>
              <Title>{exp.title}</Title>
              <Price>{exp.price}</Price>
              <ReserveButton onClick={() => handleReserve(exp)}>Reservar</ReserveButton>
            </Content>
          </Card>
        ))}
      </Grid>

      <ReservaModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        selectedExperience={selectedExperience} 
      />
    </Section>
  );
};

export default Experiencias;
