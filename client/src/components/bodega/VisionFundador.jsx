import styled from 'styled-components';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.background};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

const Content = styled.div`
  flex: 1;
`;

const ImageWrapper = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.border};
  min-height: 400px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.textLight};
`;

const VisionFundador = () => {
  return (
    <Section>
      <Content>
        <h2>La visión de Stellan Lundqvist</h2>
        <p>
          En 1984, Stellan Lundqvist descubrió en Sencelles el terreno ideal 
          para materializar su sueño. Con pasión y dedicación, sentó las bases 
          de lo que hoy es Bodega Santa Catarina, fusionando la tradición mallorquina 
          con técnicas vitivinícolas de precisión.
        </p>
      </Content>
      <ImageWrapper>
        [Imagen de vendimia]
      </ImageWrapper>
    </Section>
  );
};

export default VisionFundador;
