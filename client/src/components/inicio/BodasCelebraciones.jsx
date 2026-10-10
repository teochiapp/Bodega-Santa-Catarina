import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Section = styled.section`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  min-height: 400px;
  background-color: #3a1f1f; /* placeholder */
`;

const Content = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.section} ${({ theme }) => theme.spacing.xl};
  
  h2 {
    color: ${({ theme }) => theme.colors.surface};
  }
`;

const StyledLink = styled(Link)`
  display: inline-block;
  margin-top: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const BodasCelebraciones = () => {
  return (
    <Section>
      <ImageWrapper />
      <Content>
        <h2>Bodas y celebraciones</h2>
        <p>
          Descubre nuestros espacios exclusivos para que tu evento sea inolvidable.
          Terraza Panorámica, Sala de Barricas y la mágica Casa Son Aloy te esperan.
        </p>
        <StyledLink to="/eventos">Descubrir espacios</StyledLink>
      </Content>
    </Section>
  );
};

export default BodasCelebraciones;
