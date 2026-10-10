import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.section} ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.surface};
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    flex-direction: column;
  }
`;

const MainContent = styled.article`
  flex: 3;
`;

const ArticleImage = styled.div`
  width: 100%;
  height: 400px;
  background-color: #d9d9d9;
  border-radius: 8px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ContentText = styled.div`
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.8;
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const Sidebar = styled.aside`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Widget = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: 8px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  
  h4 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

const StyledLink = styled(Link)`
  display: inline-block;
  margin-top: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: 4px;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  
  &:hover {
    background-color: #b5952f;
  }
`;

const ArticuloDestacado = () => {
  return (
    <Section>
      <MainContent>
        <ArticleImage />
        <Title>Vendimia 2024: la cosecha del renacimiento</Title>
        <ContentText>
          <p>
            <strong>Introducción:</strong> La temporada de vendimia siempre es un momento de celebración,
            pero este año, la cosecha representa mucho más. Tras meses de cuidado intensivo bajo nuestra
            nueva filosofía 100% ecológica, los viñedos han respondido con una calidad excepcional.
          </p>
          <p>
            El esfuerzo y la dedicación de nuestro equipo en el campo se ven reflejados en cada racimo de
            Manto Negro y Prensal. La tierra de Mallorca nos ha regalado unas condiciones climáticas ideales
            que prometen añadas de guarda extraordinarias para nuestras gamas Surant y 'Nguany.
          </p>
          <p>
            Invitamos a todos nuestros amigos y clientes a brindar por este renacimiento, porque cada copa
            servida es el inicio de una nueva historia que compartimos juntos.
          </p>
        </ContentText>
      </MainContent>
      
      <Sidebar>
        <Widget>
          <h4>Vive la Vendimia</h4>
          <p>Conoce de cerca nuestro proceso de elaboración y cata directamente en bodega.</p>
          <StyledLink to="/enoturismo">Ver experiencias</StyledLink>
        </Widget>
        <Widget>
          <h4>Regala Vino</h4>
          <p>Sorprende a los tuyos con nuestras tarjetas regalo y bonos personalizables.</p>
          <StyledLink to="/tienda">Tarjetas regalo</StyledLink>
        </Widget>
      </Sidebar>
    </Section>
  );
};

export default ArticuloDestacado;
