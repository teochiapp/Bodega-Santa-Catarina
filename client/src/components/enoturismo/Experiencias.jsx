import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ReservaModal from './ReservaModal';
import api from '../../services/api';

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
  background: none;
  border-top: none;
  border-left: none;
  border-right: none;
  cursor: pointer;
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
  background-image: ${(p) => (p.$bg ? `url(${p.$bg})` : 'none')};
  background-size: cover;
  background-position: center;
`;

const Content = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Title = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const MetaText = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textLight || '#777'};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Price = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  font-size: 1.15rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: block;
`;

const Desc = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.5;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  flex: 1;
`;

const ReserveButton = styled.button`
  margin-top: auto;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: 4px;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const Experiencias = () => {
  const location = useLocation();
  const [userSelectedTab, setUserSelectedTab] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);

  const [catasData, setCatasData] = useState([]);
  const [menusData, setMenusData] = useState([]);

  const activeTab =
    userSelectedTab !== null
      ? userSelectedTab
      : location.hash === '#experiencias-gastronomicas'
      ? 'gastronomicas'
      : 'catas';

  useEffect(() => {
    api.get('/catas')
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCatasData(data.map((c) => ({
            id: c.id,
            title: c.titulo,
            price: `${Number(c.precio).toFixed(2)} € / persona`,
            desc: c.descripcion,
            dias: c.diaSemana,
            horario: c.horario,
            duracion: c.duracion,
            portada: c.portada,
          })));
        }
      })
      .catch(() => {});

    api.get('/menus')
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setMenusData(data.map((m) => ({
            id: m.id,
            title: m.titulo,
            price: `${Number(m.precio).toFixed(2)} € / persona`,
            desc: m.descripcion,
            dias: m.diaSemana,
            horario: m.horario,
            duracion: m.duracion,
            portada: m.portada,
          })));
        }
      })
      .catch(() => {});
  }, []);

  const defaultData = {
    catas: [
      { id: 1, title: 'Cata de 3 vinos', price: '20 € / persona', desc: 'Degustación de 3 vinos selectos.', dias: 'Lunes a Sábado' },
      { id: 2, title: 'Cata de 5 vinos', price: '25 € / persona', desc: 'Cata guiada de 5 variedades.', dias: 'Lunes a Sábado' },
      { id: 3, title: 'Cata de 3 vinos + Visita', price: '40 € / persona', desc: 'Paseo por bodega y cata.', dias: 'Miércoles a Domingo' },
      { id: 4, title: 'Cata de 5 vinos + Visita', price: '45 € / persona', desc: 'Experiencia completa con visita a barricas.', dias: 'Miércoles a Domingo' },
    ],
    gastronomicas: [
      { id: 5, title: 'Menú Tapas', price: '65 € / persona', desc: 'Tapas mallorquinas y maridaje.', dias: 'Jueves a Domingo' },
      { id: 6, title: 'Menú Paella', price: 'Desde 75 € / persona', desc: 'Arroz tradicional a la leña.', dias: 'Viernes a Domingo' },
      { id: 7, title: 'Menú Barbacoa', price: 'Desde 75 € / persona (mín. 15 personas)', desc: 'Carne a la brasa entre viñas.', dias: 'Fines de semana' },
    ]
  };

  const currentList = activeTab === 'catas'
    ? (catasData.length > 0 ? catasData : defaultData.catas)
    : (menusData.length > 0 ? menusData : defaultData.gastronomicas);

  const handleReserve = (exp) => {
    setSelectedExperience(exp);
    setModalOpen(true);
  };

  return (
    <Section style={{ scrollMarginTop: '100px' }}>
      <div id="catas-y-visitas" style={{ scrollMarginTop: '110px' }} />
      <div id="experiencias-gastronomicas" style={{ scrollMarginTop: '110px' }} />
      <Tabs>
        <TabButton active={activeTab === 'catas'} onClick={() => setUserSelectedTab('catas')}>
          Catas y visitas
        </TabButton>
        <TabButton active={activeTab === 'gastronomicas'} onClick={() => setUserSelectedTab('gastronomicas')}>
          Experiencias gastronómicas
        </TabButton>
      </Tabs>

      <Grid>
        {currentList.map(exp => (
          <Card key={exp.id}>
            <ImagePlaceholder $bg={exp.portada} />
            <Content>
              <Title>{exp.title}</Title>
              {exp.dias && <MetaText>🗓 {exp.dias} {exp.duracion ? `· ⏱ ${exp.duracion}` : ''}</MetaText>}
              <Price>{exp.price}</Price>
              {exp.desc && <Desc>{exp.desc}</Desc>}
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
