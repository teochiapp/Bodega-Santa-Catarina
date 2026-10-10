import styled from 'styled-components';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.surface};
`;

const Title = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`;

const EspacioCard = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  display: flex;
  flex-direction: column;
`;

const Imagen = styled.div`
  height: 200px;
  background-color: #d9d9d9;
`;

const Info = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  flex: 1;
  display: flex;
  flex-direction: column;
  
  h3 {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const BookButton = styled.button`
  margin-top: auto;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.secondary};
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: 4px;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.surface};
  }
`;

const EspaciosBodega = () => {
  const espacios = [
    { title: 'Terraza Panorámica', desc: 'Vistas inigualables al viñedo.' },
    { title: 'Sala de Barricas', desc: 'El corazón de nuestra bodega, ideal para cenas.' },
    { title: 'Casa Son Aloy', desc: 'Encanto rústico mallorquín.' },
    { title: 'El Porche Delantero', desc: 'Espacio al aire libre con encanto.' }, // Replaced Sala de Catas
  ];

  const handleBook = (title) => {
    // Aquí se guardaría el estado y haría scroll al formulario
    document.getElementById('formulario-eventos')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Section>
      <Title>Nuestros espacios</Title>
      <Grid>
        {espacios.map((espacio, idx) => (
          <EspacioCard key={idx}>
            <Imagen />
            <Info>
              <h3>{espacio.title}</h3>
              <p>{espacio.desc}</p>
              <BookButton onClick={() => handleBook(espacio.title)}>Resérvalo</BookButton>
            </Info>
          </EspacioCard>
        ))}
      </Grid>
    </Section>
  );
};

export default EspaciosBodega;
