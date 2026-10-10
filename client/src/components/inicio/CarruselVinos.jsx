import styled from 'styled-components';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.surface};
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const CarouselContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  overflow-x: auto;
  padding-bottom: ${({ theme }) => theme.spacing.lg};
  
  /* Esconde scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const VinoCard = styled.div`
  min-width: 250px;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  img {
    height: 200px;
    width: auto;
    background-color: #eaeaea; /* placeholder */
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const CarruselVinos = () => {
  const vinosMock = [
    { name: 'Manto Negro', gamma: 'Gama sta' },
    { name: 'Surant Blanco', gamma: 'Colección Surant' },
    { name: '\'Nguany Tinto', gamma: 'Colección \'Nguany' },
    { name: 'Giró Ros', gamma: 'Gama sta' },
  ];

  return (
    <Section>
      <Title>Vinos con alma</Title>
      <CarouselContainer>
        {vinosMock.map((vino, idx) => (
          <VinoCard key={idx}>
            <img src="" alt={`Botella de ${vino.name}`} />
            <h3>{vino.name}</h3>
            <p>{vino.gamma}</p>
          </VinoCard>
        ))}
      </CarouselContainer>
    </Section>
  );
};

export default CarruselVinos;
