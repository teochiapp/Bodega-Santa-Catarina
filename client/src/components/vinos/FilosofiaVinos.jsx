import styled from 'styled-components';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.background};
  text-align: center;
`;

const Content = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Text = styled.p`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.8;
`;

const FilosofiaVinos = () => {
  return (
    <Section>
      <Content>
        <Title>El vino como expresión del territorio</Title>
        <Text>
          Cada botella de Bodega Santa Catarina es un reflejo honesto del clima mediterráneo y de
          la tierra mallorquina. Cultivamos nuestras variedades autóctonas e internacionales con
          un profundo respeto ecológico, permitiendo que la uva se exprese con autenticidad y nobleza.
        </Text>
      </Content>
    </Section>
  );
};

export default FilosofiaVinos;
